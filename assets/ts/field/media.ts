import {_CARD, _GALLERY, _MEDIA} from "../options/variables";
import {handlerOpenModalLibrary} from "../module/modal";

document.addEventListener('click', (event) => {
    const target = event.target as Element;

    const btnSelect = target.closest('.' + _MEDIA.actions.select) as HTMLButtonElement;
    const btnDelete = target.closest('.' + _MEDIA.actions.delete) as HTMLButtonElement;
    const elField = target.closest('.' + _MEDIA.field) as HTMLElement;

    if(!elField) {
        return;
    }

    const elInput = elField.querySelector('.' + _MEDIA.value) as HTMLInputElement;
    const elPreview = elField.querySelector('.' + _MEDIA.preview) as HTMLElement;

    /**
     * Open modal library
     */
    if(btnSelect) {
        handlerOpenModalLibrary(elField, [Number(elInput.value)]);
    }

    /**
     * Delete selected media
     */
    if(btnDelete) {
        elField.classList.remove('is-active');
        elInput.value = '';

        const elPreviewImage = elPreview.querySelector('.' + _MEDIA.image);

        if(elPreviewImage) {
            elPreviewImage.remove();
        }
    }
});