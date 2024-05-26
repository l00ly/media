import {variables} from "../options/variables";

export const listMediaHandler = async (limit = 10, offset = 0) => {
    const response = await fetch(`${variables.path}/fetch-list`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                limit: limit,
                offset: offset
            })
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
    ;

    return await response;
};

export const removeMediaHandler = async (id) => {
    const response = await fetch(`${variables.path}/remove`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
    ;

    return await response;
};

export const getOneMediaHandler = async (id = 0) => {
    const response = await fetch(`${variables.path}/get_one`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
    ;

    return await response;
};

export const handlerUpdateForm = (card: HTMLElement): void => {
    setTimeout(() => {
        const divForm = <HTMLElement> card.parentElement;
        const divDivForm = <HTMLElement> divForm.parentElement;
        divDivForm.dispatchEvent(new Event('change'));
    }, 300);
};