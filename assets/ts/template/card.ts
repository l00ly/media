
interface Data {
    fullPath?: string;
    slug?: string;
    [key: string]: any;
}

export const card = (data: Data) => {
    if(!data.fullPath || !data.slug) return;

    return `
        <div class="lm-card-media">
            <input class="lm-card-media__checkbox" type="checkbox" id="${data.slug}" name="__" value="${data.id}">
            <label for="${data.slug}" class="lm-card-media__label">
                 <button class="lm-card-media__remove"></button>
                 <img src="${data.thumbnail}" class="lm-item__image">
            </label>
        </div>
    `;
};