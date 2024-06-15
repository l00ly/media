import {_CARD, _GALLERY} from "../options/variables";
import {handlerOpenModalLibrary} from "../module/modal";
import {handlerList} from "../handler/api/list";
import {card} from "../template/card";

let modalLibrary;
let fieldGallery;
let excludeIds : number[] = [];

document.addEventListener('click', (event) => {
    const target = event.target as Element;
    const btnRemoveCard = target.closest('.' + _CARD.remove);
    const elCard = target.closest('.' + _CARD.card);
    const elList = <HTMLElement> target.closest('.' + _GALLERY.list);
    const btnDeleteSelected = target.closest('.' + _GALLERY.actions.delete) as HTMLButtonElement;
    const btnCancel = target.closest('.' + _GALLERY.actions.cancel) as HTMLButtonElement;
    const btnAdd = target.closest('.' + _GALLERY.actions.add) as HTMLButtonElement;
    const btnSelect = target.closest('.' + _GALLERY.actions.select) as HTMLButtonElement;
    const btnLoadMore = target.closest('.' + _GALLERY.actions.load_more) as HTMLButtonElement;
    const typeGallery = elList?.getAttribute('data-type');

    if(!elList) {
        return;
    }

    if(btnRemoveCard || elCard || btnDeleteSelected || btnCancel || btnAdd || btnLoadMore) {
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
        const checkbox = elCard.querySelector('.' + _CARD.checkbox) as HTMLInputElement;
        if(checkbox) {
            checkbox.checked = !checkbox.checked;

            if(typeGallery == 'field') {
                handleMultipleDelete(elList);
            }

            if(typeGallery == 'multiple') {
                handleMultipleSelect(elList);
            }
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
        fieldGallery = elList;
        excludeIds = getCheckedCards(elList);
        modalLibrary = handlerOpenModalLibrary(excludeIds);
    }

    /**
     * Load more cards
     */
    if(btnLoadMore) {
        const page =  Number(elList.getAttribute('data-page'));
        const limit = Number(elList.getAttribute('data-limit'));
        const itemsEl = elList.querySelector('.lm-gallery__items') as HTMLElement;

        console.log(excludeIds);

        handlerList(limit, page, excludeIds).then((response) => {
            itemsEl.insertAdjacentHTML('beforeend',
                response.data.map((item) => {
                return card(item);
            }).join(''));

            if(response.data.length < limit) {
                btnLoadMore.style.display = 'none';
            }

            elList.setAttribute('data-page', (page + 1).toString());
        }).catch((error) => {});
    }

    /**
     * Select cards
     */
    if(btnSelect) {
        const selected = getSelectedCards(elList);

        selected.forEach((item) => {
            const checkbox = item.querySelector('.' + _CARD.checkbox) as HTMLInputElement;
            checkbox.checked = true;
            checkbox.setAttribute('name', fieldGallery.getAttribute('data-name-field'));

            fieldGallery.querySelector('.lm-gallery__items').insertAdjacentElement('afterbegin', item);
        });

        modalLibrary.close();
    }

});

function checkingSelectedCard(wrapper: HTMLElement) : boolean {
    let selected = false;
    const checkboxes = wrapper.querySelectorAll('.' + _CARD.checkbox) as NodeListOf<HTMLInputElement>;

    checkboxes.forEach((checkbox) => {
        if(checkbox.checked) {
            selected = true;
        }
    });

    return selected;
}

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

function handleMultipleSelect(wrapper: HTMLElement) : void {
    if(checkingSelectedCard(wrapper)) {
        wrapper.classList.add('is-multiple_select');
    } else {
        wrapper.classList.remove('is-multiple_select');
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

function getSelectedCards(wrapper: HTMLElement) : HTMLElement[] {
    let selected: HTMLElement[] = [];
    const checkboxes = wrapper.querySelectorAll('.' + _CARD.checkbox + ':checked') as NodeListOf<HTMLInputElement>;

    checkboxes.forEach((checkbox) => {
        const card = checkbox.closest('.' + _CARD.card) as HTMLElement;
        selected.push(card);
    });

    return selected;
}