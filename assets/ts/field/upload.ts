import {_UPLOAD} from "../options/variables";
import {handlerOpenModalUpload} from "../module/upload";

document.addEventListener('click', (event) => {
    const target = event.target as Element;
    const elUpload = <HTMLElement> target.closest('.' + _UPLOAD.actions.modal_upload);
    const elField = <HTMLElement> target.closest('.lm-field');

    if(elUpload) {
        handlerOpenModalUpload(elField);
    }
});