import * as FilePond from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileMetadata from 'filepond-plugin-file-metadata';
import 'filepond/dist/filepond.min.css';

FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileMetadata
);

const handlerUpdateForm = (card: HTMLElement) => {
    setTimeout(() => {
        const divForm = <HTMLElement> card.parentElement;
        const divDivForm = <HTMLElement> divForm.parentElement;
        divDivForm.dispatchEvent(new Event('change'));
    }, 300);
};

const handlerInitFileFields = () => {
    const uploadMediaInputsFiles = document.querySelectorAll('.l-media-field-input-file');
    uploadMediaInputsFiles.forEach((input) => {
        if (!input.classList.contains('is-init')) {
            input.classList.add('is-init');

            const card = <HTMLElement> input.closest('.card');

            const fileEl = FilePond.create(input, {
                server: {
                    process: {
                        url: '/bundle/oosaulenko/media-bundle/add',
                        method: 'POST',
                        withCredentials: false,
                        onload: (response) => {
                            return 126;
                        }
                    },
                    revert: '/bundle/oosaulenko/media-bundle/remove',
                    restore: './restore/',
                    load: './load/',
                    fetch: './fetch/',
                }
            });

            if(card) {
                fileEl.on('processfile', () => {
                    handlerUpdateForm(card);
                });
            }
        }
    });
};

const handlerInitFilesFields = () => {
    const uploadMediaInputsFiles = document.querySelectorAll('.l-media-field-input-files');
    uploadMediaInputsFiles.forEach((input) => {
        if (!input.classList.contains('is-init')) {
            input.classList.add('is-init');

            FilePond.create(input, {
                server: {
                    process: {
                        url: '/bundle/oosaulenko/media-bundle/add',
                        method: 'POST',
                        withCredentials: false,
                        onload: (response) => {
                            return 126;
                        }
                    },
                    revert: '/bundle/oosaulenko/media-bundle/remove',
                    restore: './restore/',
                    load: './load/',
                    fetch: './fetch/',
                }
            });
        }
    });
};

window.addEventListener("DOMContentLoaded", handlerInitFileFields);
window.addEventListener("DOMContentLoaded", handlerInitFilesFields);
document.addEventListener("ea.collection.item-added", handlerInitFileFields);