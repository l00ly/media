import * as basicLightbox from 'basiclightbox';
import {modalDelete} from '../template/modal-delete';
import {_CARD, _MODAL_DELETE} from "../options/variables";
import {handlerRemove} from '../handler/api/remove';

let modal : basicLightbox.BasicLightbox;
let field: HTMLElement;

/**
 * Open modal delete
 */
export function handlerOpenModalDelete(fieldHandler: HTMLElement) : basicLightbox.BasicLightbox {
    field = fieldHandler;

    modal = basicLightbox.create(modalDelete(), {
        onShow: (instance) => { },
        onClose: (instance) => { }
    });

    modal.show();
}

document.addEventListener('click', (event) => {
    const target = event.target as Element;

    const btnCancel = target.closest('.' + _MODAL_DELETE.actions.cancel);
    const btnDelete = target.closest('.' + _MODAL_DELETE.actions.delete);

    /**
     * Close modal without delete
     */
    if(btnCancel) {
        modal.close();
    }

    /**
     * Delete media from library
     */
    if(btnDelete) {
        const input = field.querySelector('.' + _CARD.checkbox) as HTMLInputElement;

        if(!input) {
            return;
        }

        handlerRemove(input.value).then(r => {
            field.remove();
            modal.close();
        });
    }
});