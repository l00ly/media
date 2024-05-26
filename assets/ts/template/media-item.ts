export const mediaItem = (item, type: string = 'delete') => {
    if(type === 'delete') {
        return `
            <div class="l-media-item">
                <img src="/${item.folder}${item.name}" alt="${item.name}" />
                <div class="l-media-actions">
                     <button class="actionDeleteMedia btn btn-danger" data-id="${item.id}">Delete</button>
                </div>
            </div>
        `;
    }

    if(type === 'select') {
        return `
            <div class="l-media-item">
                <img src="/${item.folder}${item.name}" alt="${item.name}" />
                <div class="l-media-actions">
                    <button class="actionSelectMedia btn btn-primary" data-id="${item.id}">Select</button>
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