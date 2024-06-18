export const modalUpload = () => {
    return `
        <div class="lm-modal lm-modal-upload">
            <div class="lm-modal__header">
                <h6 class="lm-modal__title">Upload file</h6>
            </div>
            <div class="lm-modal__body"> 
                <input class="lm-file_upload" type="file" multiple>
            </div>
        </div>
    `;
}