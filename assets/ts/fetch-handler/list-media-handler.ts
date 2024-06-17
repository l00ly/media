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