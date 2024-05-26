import * as basicLightbox from 'basiclightbox'
import {listMediaHandler, handlerUpdateForm, getOneMediaHandler} from "../fetch-handler/list-media-handler";
import {mediaItem} from "../template/media-item";
import {mediaChoiceInterfaceEl} from "../template/media-choice-type";

const handleInitChoiceFile = () => {
    const fieldChoiceEls = document.querySelectorAll('.l-media-field-choice-file');

    if(fieldChoiceEls) {
        fieldChoiceEls.forEach((fieldChoiceElement) => {
            if (!fieldChoiceElement.classList.contains('is-init')) {
                const fieldChoiceEl = <HTMLFormElement> fieldChoiceElement;

                fieldChoiceEl.classList.add('is-init');
                fieldChoiceEl.insertAdjacentHTML('afterend', mediaChoiceInterfaceEl);

                const interfaceElement = <HTMLElement> fieldChoiceEl.nextElementSibling;
                const interfaceInnerEl = interfaceElement.querySelector('.l-media-field-choice-file-interface');
                const buttonChoiceEl = <HTMLElement> interfaceElement.querySelector('.actionShowPopupChoiceMedia');
                const card = <HTMLElement> fieldChoiceEl.closest('.card');

                if(fieldChoiceEl.value) {
                    getOneMediaHandler(fieldChoiceEl.value)
                        .catch((error) => {})
                        .then((data) => {
                            const imagePreviewEl = `
                                <div class="l-media-preview">
                                    <img src="/${data.body.folder}${data.body.name}" alt="${data.body.name}">
                                    <button class="actionRemoveMedia fa-solid fa-circle-xmark" data-id="${fieldChoiceEl.id}"></button>
                                </div>
                            `;

                            if(interfaceInnerEl) {
                                interfaceInnerEl.insertAdjacentHTML('afterbegin', imagePreviewEl);
                            }
                        });
                }

                fieldChoiceEl.addEventListener('change', (e) => {
                    getOneMediaHandler(fieldChoiceEl.value)
                        .catch((error) => {})
                        .then((data) => {
                            if(interfaceInnerEl) {
                                const imagePreviewEl = interfaceInnerEl.querySelector('.l-media-preview');

                                if(imagePreviewEl) {
                                    imagePreviewEl.innerHTML = `<img src="/${data.body.folder}${data.body.name}" alt="${data.body.name}">`;
                                } else {
                                    interfaceInnerEl.insertAdjacentHTML('afterbegin', `
                                        <div class="l-media-preview">
                                            <img src="/${data.body.folder}${data.body.name}" alt="${data.body.name}">
                                            <button class="actionRemoveMedia fa-solid fa-circle-xmark" data-id="${fieldChoiceEl.id}"></button>
                                        </div>
                                    `);
                                }
                            }
                        });
                });

                buttonChoiceEl.addEventListener('click', (e) => {
                    e.preventDefault();

                    const modalChoiceMedia = basicLightbox.create(`<div class="l-media-modal"></div>`, {
                        onShow: (instance) => {
                            instance.element().querySelector('.l-media-modal').innerHTML = `<div class="l-media-list is-load"><div class="l-media-list-wrapper"></div></div>`;

                            listMediaHandler()
                                .catch((error) => {

                                })
                                .then((data) => {
                                    const mediaList = <HTMLElement> instance.element().querySelector('.l-media-list');
                                    const wrapperList = <HTMLElement> mediaList.querySelector('.l-media-list-wrapper');

                                    wrapperList.innerHTML = data.body.map((item) => {
                                        return mediaItem(item, 'select');
                                    }).join('');

                                    mediaList.setAttribute('data-total', data.meta.total);
                                    mediaList.setAttribute('data-limit', '10');
                                    mediaList.setAttribute('data-showed', data.meta.offset);

                                    if (data.meta.total > 10) {
                                        mediaList.insertAdjacentHTML('beforeend', `
                                            <div class="l-media-list-pagination">
                                                <button class="actionShowMoreMedia btn btn">Show more</button>
                                            </div>
                                        `);
                                    }

                                    mediaList.insertAdjacentHTML('beforeend', `
                                        <div class="l-media-list-total">
                                            1 of ${data.meta.offset} - ${data.meta.total} media files
                                        </div>
                                    `);

                                    mediaList.classList.remove('is-load');


                                    mediaList.addEventListener('click', (event) => {
                                        const target = event.target as HTMLElement;
                                        const action = target.classList.contains('actionSelectMedia');
                                        const showMore = target.classList.contains('actionShowMoreMedia');

                                        if (action) {
                                            const id = target.getAttribute('data-id');
                                            fieldChoiceEl.value = id;
                                            fieldChoiceEl.dispatchEvent(new Event('change'));

                                            handlerUpdateForm(card);
                                            instance.close();
                                        }

                                        if (showMore) {
                                            if(mediaList.getAttribute('data-limit') && mediaList.getAttribute('data-showed')) {
                                                const limit = Number(mediaList.getAttribute('data-limit'));
                                                const showed = Number(mediaList.getAttribute('data-showed'));

                                                listMediaHandler(limit, showed)
                                                    .catch((error) => {
                                                        console.error(error);
                                                    })
                                                    .then((data) => {
                                                        mediaList.setAttribute('data-total', data.meta.total);
                                                        mediaList.setAttribute('data-limit', '10');
                                                        mediaList.setAttribute('data-showed', data.meta.offset);

                                                        const wrapperList = mediaList.querySelector('.l-media-list-wrapper');
                                                        const totalEl = mediaList.querySelector('.l-media-list-total');

                                                        if (wrapperList) {
                                                            wrapperList.insertAdjacentHTML('beforeend', data.body.map((item) => {
                                                                return mediaItem(item, 'select');
                                                            }).join(''));
                                                        }

                                                        if (data.meta.total <= data.meta.offset) {
                                                            target.remove();
                                                        }

                                                        if(totalEl) {
                                                            const dataMax = (data.meta.total > data.meta.offset) ? data.meta.offset : data.meta.total;
                                                            totalEl.innerHTML = `1 of ${dataMax} - ${data.meta.total} media files`;
                                                        }
                                                    });
                                            }
                                        }
                                    });
                                });
                        },
                        onClose: (instance) => { }
                    }).show();
                });
            }
        });
    }
};

document.addEventListener('click', (e) => {
    const target = e.target as Element;
    if(target && target.classList.contains('actionRemoveMedia')) {
        if(target.closest('.l-media-preview')) {
            const lMediaPreviewEl = <HTMLElement> target.closest('.l-media-preview');
            lMediaPreviewEl.remove();
        }

        if(target.getAttribute('data-id')) {
            const dataId = <string> target.getAttribute('data-id');
            const lMediaInputEl = <HTMLInputElement> document.getElementById(dataId);
            lMediaInputEl.value = '';

            const card = <HTMLElement> lMediaInputEl.closest('.card');
            handlerUpdateForm(card);
        }

        // console.log(target.closest('.l-media-field-choice-file'));

        // if(target.closest('.l-media-field-choice-file')) {
        //     const lMediaInputEl = <HTMLInputElement> target.closest('.l-media-field-choice-file');
        //     lMediaInputEl.value = '';
        // }
        // if(target.parentElement('.l-media-preview')) {
        //     target.parentElement('.l-media-preview').remove();
        // }
        // target.parentNode('.l-media-preview')
    }
});

document.addEventListener("DOMContentLoaded", handleInitChoiceFile);
document.addEventListener("ea.collection.item-added", handleInitChoiceFile);
