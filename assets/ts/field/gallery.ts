import {_CARD, _GALLERY} from "../options/variables";
import {handlerOpenModalLibrary} from "../module/modal";

document.addEventListener('click', (event) => {
    const target = event.target as Element;
    const btnRemoveCard = target.closest('.' + _CARD.remove);
    const elCard = target.closest('.' + _CARD.card);
    const elList = <HTMLElement> target.closest('.' + _GALLERY.list);
    const btnDeleteSelected = target.closest('.' + _GALLERY.actions.delete) as HTMLButtonElement;
    const btnCancel = target.closest('.' + _GALLERY.actions.cancel) as HTMLButtonElement;
    const btnAdd = target.closest('.' + _GALLERY.actions.add) as HTMLButtonElement;
    const typeGallery = elList?.getAttribute('data-type');

    if(!elList) {
        return;
    }

    if(btnRemoveCard || elCard || btnDeleteSelected || btnCancel || btnAdd) {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Remove card from gallery
     */
    if(btnRemoveCard && elCard) {
        elCard.remove();
        handleMultipleDelete(elList);
    }

    /**
     * Select card from gallery
     */
    if(elCard && !btnRemoveCard) {
        if(!elCard.closest('.' + _GALLERY.list + '[data-type="field"]')) {
            return;
        }

        const checkbox = elCard.querySelector('.' + _CARD.checkbox) as HTMLInputElement;
        if(checkbox) {
            checkbox.checked = !checkbox.checked;
            handleMultipleDelete(elList);
        }
    }

    /**
     * Delete selected cards
     */
    if(btnDeleteSelected) {
        const cards = elList.querySelectorAll('.' + _CARD.card);
        cards.forEach((card) => {
            const checkbox = card.querySelector('.' + _CARD.checkbox) as HTMLInputElement;

            if(!checkbox.checked) {
                card.remove();
            }
        });

        handleMultipleDelete(elList);
    }

    /**
     * Cancel delete selected cards
     */
    if(btnCancel) {
        const checkboxes = elList.querySelectorAll('.' + _CARD.checkbox) as NodeListOf<HTMLInputElement>;
        checkboxes.forEach((checkbox) => {
            checkbox.checked = true;
        });

        handleMultipleDelete(elList);
    }

    /**
     * Open modal library
     */
    if(btnAdd) {
        handlerOpenModalLibrary(elList, getCheckedCards(elList));
    }
});

function checkingUnSelectedCard(wrapper: HTMLElement) : boolean {
    let selected = false;
    const checkboxes = wrapper.querySelectorAll('.' + _CARD.checkbox) as NodeListOf<HTMLInputElement>;

    checkboxes.forEach((checkbox) => {
        if(!checkbox.checked) {
            selected = true;
        }
    });

    return selected;
}

function handleMultipleDelete(wrapper: HTMLElement) : void {
    if(checkingUnSelectedCard(wrapper)) {
        wrapper.classList.add('is-multiple_delete');
    } else {
        wrapper.classList.remove('is-multiple_delete');
    }
}

function getCheckedCards(wrapper: HTMLElement) : number[] {
    let selected: number[] = [];
    const checkboxes = wrapper.querySelectorAll('.' + _CARD.checkbox) as NodeListOf<HTMLInputElement>;

    checkboxes.forEach((checkbox) => {
        selected.push(Number(checkbox.value));
    });

    return selected;
}