import * as basicLightbox from 'basiclightbox';
import {modalLibrary} from '../template/modal-library';
import {card} from "../template/card";
import {handlerList} from "../handler/api/list";
import {_CARD, _GALLERY, _MODAL_LIBRARY, _MEDIA} from "../options/variables";

let excludeIds : number[] = [];
let field: HTMLElement;
let modal : basicLightbox.BasicLightbox;
let library : HTMLElement;

export function handlerOpenModalLibrary(fieldHandler: HTMLElement, ids : number[] = []) : basicLightbox.BasicLightbox {
    const bodyEl = document.querySelector('body') as HTMLBodyElement;
    excludeIds = ids;
    field = fieldHandler;

    const modalHandler = basicLightbox.create(modalLibrary(), {
        onShow: (instance) => {
            bodyEl.classList.add('is-scroll');

            const element = instance.element() as HTMLElement;
            const elModal = element.querySelector('.lm-modal') as HTMLElement;
            const itemsEl = element.querySelector('.lm-gallery__items') as HTMLElement;
            const elList = element.querySelector('.lm-gallery') as HTMLElement;

            const page =  Number(elList.getAttribute('data-page'));
            const limit = Number(elList.getAttribute('data-limit'));

            library = elList;

            handlerList(limit, page, ids).then((response) => {
                itemsEl.innerHTML = response.data.map((item) => {
                    return card(item);
                }).join('');

                elList.setAttribute('data-page', (page + 1).toString());
                elModal.classList.remove('is-loading');
            }).catch((error) => {});
        },
        onClose: (instance) => {
            bodyEl.classList.remove('is-scroll');
        }
    });

    modal = modalHandler;

    modalHandler.show();

    return modalHandler;
}

document.addEventListener('click', (event) => {
    const target = event.target as Element;

    const elList = <HTMLElement> target.closest('.' + _MODAL_LIBRARY.list);
    const btnSelect = target.closest('.' + _MODAL_LIBRARY.actions.select) as HTMLButtonElement;
    const btnLoadMore = target.closest('.' + _MODAL_LIBRARY.actions.load_more) as HTMLButtonElement;
    const elCard = target.closest('.' + _CARD.card);

    if(!elList) {
        return;
    }

    if(btnSelect || btnLoadMore) {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Choice card from library
     */
    if(elCard) {
        if(!elCard.closest('.' + _GALLERY.list + '[data-type="library"]')) {
            return;
        }

        const multiple = field.getAttribute('data-multiple');

        const checkbox = elCard.querySelector('.' + _CARD.checkbox) as HTMLInputElement;

        if(checkbox) {
            if(multiple && multiple == "true") {
                checkbox.checked = !checkbox.checked;
                handleMultipleSelect(elList);
            } else {
                handleSingleSelect(elList);
                checkbox.checked = !checkbox.checked;
            }
        }
    }

    /**
     * Select media from library
     */
    if(btnSelect) {
        const fieldItems = field.querySelector('.lm-gallery__items');
        const nameField = field.getAttribute('data-name-field');

        if(fieldItems && nameField) {
            getSelectedCards().forEach((item) => {
                const checkbox = item.querySelector('.' + _CARD.checkbox) as HTMLInputElement;
                checkbox.checked = true;
                checkbox.setAttribute('name', nameField);

                fieldItems.insertAdjacentElement('afterbegin', item);
            });
        } else {
            const preview = field.querySelector('.lm-media__preview') as HTMLElement;
            const fieldInput = field.querySelector('.' + _MEDIA.value) as HTMLInputElement;

            if(preview) {
                preview.innerHTML = getSelectedCards().map((item) => {
                    const img = item.querySelector('img');
                    if(!img || !img.getAttribute('src')) return;
                    return '<img src="' + img.getAttribute('src') + '" class="lm-media__image">';
                }).join('');
                field.classList.add('is-active');
            }

            if(fieldInput) {
                fieldInput.value = getSelectedCards().map((item) => {
                    const input = item.querySelector('input');
                    if(!input || !input.value) return;
                    return input.value;
                }).join('');
                handlerUpdateCard(fieldInput);
            }
        }

        modal.close();
    }

    /**
     * Load more media from library
     */
    if(btnLoadMore) {
        const page =  Number(elList.getAttribute('data-page'));
        const limit = Number(elList.getAttribute('data-limit'));
        const itemsEl = elList.querySelector('.lm-gallery__items') as HTMLElement;
        btnLoadMore.classList.add('is-loading');

        handlerList(limit, page, excludeIds).then((response) => {
            itemsEl.insertAdjacentHTML('beforeend',
                response.data.map((item) => {
                    return card(item);
                }).join(''));

            if(response.data.length < limit) {
                btnLoadMore.style.display = 'none';
            }

            elList.setAttribute('data-page', (page + 1).toString());
            btnLoadMore.classList.remove('is-loading');
        }).catch((error) => {});
    }
});

function getSelectedCards() : HTMLElement[] {
    let selected: HTMLElement[] = [];
    const checkboxes = library.querySelectorAll('.' + _CARD.checkbox + ':checked') as NodeListOf<HTMLInputElement>;

    checkboxes.forEach((checkbox) => {
        const card = checkbox.closest('.' + _CARD.card) as HTMLElement;
        selected.push(card);
    });

    return selected;
}

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

function handleMultipleSelect(wrapper: HTMLElement) : void {
    if(checkingSelectedCard(wrapper)) {
        wrapper.classList.add('is-multiple_select');
    } else {
        wrapper.classList.remove('is-multiple_select');
    }
}

function handleSingleSelect(wrapper: HTMLElement) : void {
    const list = wrapper.querySelectorAll('.' + _CARD.card);

    list.forEach((card) => {
        const checkbox = card.querySelector('.' + _CARD.checkbox) as HTMLInputElement;
        checkbox.checked = false;
    });

    wrapper.classList.add('is-multiple_select');
}

function handlerUpdateCard(input: HTMLInputElement): void {
    setTimeout(() => {
        const card = <HTMLElement> input.closest('.card');

        if(!card) {
            return;
        }

        const divForm = <HTMLElement> card.parentElement;
        const divDivForm = <HTMLElement> divForm.parentElement;

        if(divDivForm) {
            divDivForm.dispatchEvent(new Event('change'));
        }
    }, 300);
}