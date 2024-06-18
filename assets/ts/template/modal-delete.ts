export const modalDelete = () => {
    return `
        <div class="lm-modal lm-modal-delete">
            <div class="lm-modal__body">  
                <h5 class="lm-modal__title">Do you want to delete this media?</h5>
                
                <div class="lm-modal__actions">
                    <button class="btn lm-modal-delete--cancel">Cancel</button>
                    <button class="btn btn-danger lm-modal-delete--delete">Delete</button>
                </div>
            </div>
        </div>
    `;
}