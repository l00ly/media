import * as FilePond from 'filepond';
import FilePondPluginFileMetadata from 'filepond-plugin-file-metadata';
import 'filepond/dist/filepond.min.css';
import {mediaItem} from "../template/media-item";

FilePond.registerPlugin(
    FilePondPluginFileMetadata
);

function handlerLoading(show = true) {
    const loading = document.querySelector('.small-loading');
    if(loading) {
        if(show) {
            loading.classList.add('is-active');
        } else {
            loading.classList.remove('is-active');
        }
    }
}

export const handlerInitQuickUploadFields = () => {
    const wrapperList = document.querySelector('.l-media-list-wrapper');
    const uploadMediaInputsFiles = document.querySelectorAll('.l-media-quick_upload');

    if(!wrapperList) {
        return;
    }

    uploadMediaInputsFiles.forEach((input) => {
        if (!input.classList.contains('is-init')) {
            input.classList.add('is-init');

            const fileEl = FilePond.create(input, {
                server: {
                    process: {
                        url: '/bundle/looly/media-bundle/add',
                        method: 'POST',
                        withCredentials: false,
                        ondata: (data) => {
                            handlerLoading();
                            return data;
                        },
                        onload: (response) => {
                            const data = JSON.parse(response).data;

                            if(data) {
                                data.forEach((item) => {
                                    wrapperList.insertAdjacentHTML('afterbegin', mediaItem(item, 'select'));
                                });
                            }

                            handlerLoading(false);
                            return 126;
                        }
                    },
                    revert: '/bundle/looly/media-bundle/remove',
                    restore: './restore/',
                    load: './load/',
                    fetch: './fetch/',
                }
            });
        }
    });
};