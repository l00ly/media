import * as basicLightbox from 'basiclightbox';
import {modalLibrary} from '../template/modal-library';
import {card} from "../template/card";
import {handlerList} from "../handler/api/list";

export function handlerOpenModalLibrary(ids : number[] = []) : basicLightbox.BasicLightbox {
    const bodyEl = document.querySelector('body') as HTMLBodyElement;

    const modal = basicLightbox.create(modalLibrary(), {
        onShow: (instance) => {
            bodyEl.classList.add('is-scroll');

            const element = instance.element() as HTMLElement;
            const itemsEl = element.querySelector('.lm-gallery__items') as HTMLElement;
            const elList = element.querySelector('.lm-gallery') as HTMLElement;

            const page =  Number(elList.getAttribute('data-page'));
            const limit = Number(elList.getAttribute('data-limit'));

            handlerList(limit, page, ids).then((response) => {
                itemsEl.innerHTML = response.data.map((item) => {
                    return card(item);
                }).join('');

                elList.setAttribute('data-page', (page + 1).toString());
            }).catch((error) => {});
        },
        onClose: (instance) => {
            bodyEl.classList.remove('is-scroll');
        }
    });

    modal.show();

    return modal;
}

function handlerCloseModalLibrary(modal : basicLightbox.BasicLightbox) {
    modal.close();
}