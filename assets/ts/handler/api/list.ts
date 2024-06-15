import {_API} from "../../options/variables";
import axios from "axios";

export const handlerList = async (limit = 10, page = 1, ids: number[] = []) => {
    try {
        const response = await axios.get(_API.list, {
            params: {
                limit: limit,
                page: page,
                ids: ids
            }
        });

        return response.data;
    } catch (error) {
        return error;
    }
};
