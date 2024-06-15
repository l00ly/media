export const modalLibrary = () => {
    return `
        <div class="lm-modal lm-modal-library">
            <div class="lm-modal__body">  
                <div class="lm-gallery" data-type="multiple" data-page="1" data-limit="24">  
                    <div class="lm-gallery__wrapper">
                        <div class="lm-gallery__panel">
                            <h6 class="lm-gallery__title">Media Library</h6>
                            <div class="lm-gallery__actions">
                                <button type="button" class="btn btn-primary lm-gallery__action lm-gallery__action--select">Select</button>
                                <button type="button" class="btn btn-primary lm-gallery__action lm-gallery__action--add"><i class="fa-solid fa-plus"></i></button>
                                <button type="button" class="btn lm-gallery__action lm-gallery__action--cancel">Cancel</button>
                                <button type="button" class="btn btn-danger lm-gallery__action lm-gallery__action--delete_selected">Delete selected</button>
                            </div>
                        </div>
                        <div class="lm-gallery__items"></div>
                        <div class="lm-gallery__footer">    
                            <button type="button" class="btn lm-gallery__action lm-gallery__action--load_more">Load more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}