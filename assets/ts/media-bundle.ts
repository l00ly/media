import '../css/manager.css';
import {mediaItem} from "./template/media-item";

import {listMediaHandler, removeMediaHandler} from "./fetch-handler/list-media-handler";
import './field/input-file';
import './field/gallery';
import './field/media';

const list = document.querySelector('.l-media-list');

if (list) {
    listMediaHandler()
        .catch((error) => {
            console.error(error);
        })
        .then((data) => {
            if (data.length === 0) {
                list.innerHTML = "<p>Media not found</p>";
            } else {
                const wrapperList = document.createElement('div');
                wrapperList.classList.add('l-media-list-wrapper');

                wrapperList.innerHTML = data.body.map((item) => {
                    return mediaItem(item);
                }).join('');

                list.appendChild(wrapperList);
                list.setAttribute('data-total', data.meta.total);
                list.setAttribute('data-limit', '10');
                list.setAttribute('data-showed', data.meta.offset);

                if (data.meta.total > 10) {
                    list.insertAdjacentHTML('beforeend', `
                        <div class="l-media-list-pagination">
                            <button class="actionShowMoreMedia btn btn">Show more</button>
                        </div>
                    `);
                }

                list.insertAdjacentHTML('beforeend', `
                    <div class="l-media-list-total">
                        1 of ${data.meta.offset} - ${data.meta.total} media files
                    </div>
                `);
            }

            list.classList.remove('is-load');
        });

    list.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const action = target.classList.contains('actionDeleteMedia');
        const showMore = target.classList.contains('actionShowMoreMedia');

        if (action) {
            const id = target.getAttribute('data-id');

            removeMediaHandler(id).then((data) => {
                if (data.status === 'success') {
                    const item = target.closest('.l-media-item');

                    if (item) {
                        item.remove();
                    }
                }
            });
        }

        if (showMore) {
            if(list.getAttribute('data-limit') && list.getAttribute('data-showed')) {
                const limit = Number(list.getAttribute('data-limit'));
                const showed = Number(list.getAttribute('data-showed'));

                listMediaHandler(limit, showed)
                    .catch((error) => {
                        console.error(error);
                    })
                    .then((data) => {
                        list.setAttribute('data-total', data.meta.total);
                        list.setAttribute('data-limit', '10');
                        list.setAttribute('data-showed', data.meta.offset);

                        const wrapperList = list.querySelector('.l-media-list-wrapper');
                        const totalEl = list.querySelector('.l-media-list-total');

                        if (wrapperList) {
                            wrapperList.insertAdjacentHTML('beforeend', data.body.map((item) => {
                                return mediaItem(item);
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
}
