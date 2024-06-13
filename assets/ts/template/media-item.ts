export const mediaItem = (item, type: string = 'delete') => {
    if(type === 'delete') {
        return `
            <div class="l-media-item">
                <img src="/${item.folder}${item.name}" alt="${item.name}" />
                <div class="l-media-actions">
                     <button class="actionDeleteMedia btn btn-danger btn--remove" data-id="${item.id}"></button>
                </div>
            </div>
        `;
    }

    if(type === 'select') {
        return `
            <div class="l-media-item">
                <img src="/${item.folder}${item.name}" alt="${item.name}" />
                <div class="l-media-actions">
                    <button class="actionSelectMedia btn btn-primary btn--select" data-id="${item.id}"></button>
                </div>
            </div>
        `;
    }

    return `
        <div class="l-media-item">
            <img src="/${item.folder}${item.name}" alt="${item.name}" />
        </div>
    `;
}