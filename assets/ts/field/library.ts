import {handlerOpenModalDelete} from "../module/delete";
import {_CARD, _LIBRARY} from "../options/variables";
import {handlerList} from "../handler/api/list";
import {card} from "../template/card";

document.addEventListener('click', (event) => {
    const target = event.target as Element;

    const elList = <HTMLElement> target.closest('.' + _LIBRARY.list);
    const elCard = target.closest('.' + _CARD.card) as HTMLElement;
    const btnRemoveCard = target.closest('.' + _CARD.remove);
    const btnLoadMore = target.closest('.' + _LIBRARY.actions.load_more) as HTMLButtonElement;

    if(btnRemoveCard || btnLoadMore) {
        event.preventDefault();
        event.stopPropagation();
    }

    if(btnRemoveCard) {
        handlerOpenModalDelete(elCard);
    }

    if(btnLoadMore) {
        const page =  Number(elList.getAttribute('data-page'));
        const limit = Number(elList.getAttribute('data-limit'));
        const itemsEl = elList.querySelector('.lm-library__items') as HTMLElement;
        btnLoadMore.classList.add('is-loading');

        handlerList(limit, page).then((response) => {
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