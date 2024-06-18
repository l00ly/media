import * as basicLightbox from 'basiclightbox';
import {modalUpload} from '../template/modal-upload';
import {_UPLOAD, _API} from "../options/variables";
import {card} from "../template/card";
import * as FilePond from 'filepond';
import FilePondPluginFileMetadata from 'filepond-plugin-file-metadata';
import 'filepond/dist/filepond.min.css';

FilePond.registerPlugin(
    FilePondPluginFileMetadata
);

let modal : basicLightbox.BasicLightbox;
let field: HTMLElement;

/**
 * Open modal delete
 */
export function handlerOpenModalUpload(fieldHandler: HTMLElement) : basicLightbox.BasicLightbox {
    field = fieldHandler;

    modal = basicLightbox.create(modalUpload(), {
        onShow: (instance) => {
            const element = instance.element() as HTMLElement;
            const elFile = element.querySelector('.' + _UPLOAD.file) as HTMLInputElement;

            handlerInitFilePond(elFile);

        },
        onClose: (instance) => { }
    });

    modal.show();
}

function handlerInitFilePond(input: HTMLInputElement) : FilePond.FilePond {
    return FilePond.create(input, {
        allowRevert: false,
        server: {
            process: {
                url: _API.add,
                method: 'POST',
                withCredentials: false,
                onload: (response) => {
                    response = JSON.parse(response);
                    const elItems = field.querySelector('.lm-field__items') as HTMLElement;

                    elItems.insertAdjacentHTML('afterbegin',
                        response.data.map((item) => {
                            return card(item);
                        }).join(''));

                    return 126;
                }
            }
        }
    });
}
