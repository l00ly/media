import {_API} from "../../options/variables";
import axios from "axios";

export const handlerRemove = async (id) => {
    try {
        const response = await axios.get(_API.remove, {
            params: {
                id: id
            }
        });

        return response.data;
    } catch (error) {
        return error;
    }
};
