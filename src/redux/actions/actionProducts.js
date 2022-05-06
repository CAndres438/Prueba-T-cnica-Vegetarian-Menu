import axios from "axios";
import { url } from "../../utils/url";
import { typesProductos } from "../types/types";

//---------------listar----------------//
export const listAsync = () => {
    return async (dispatch) => {
        const collectionTraer = await axios.get(url);
        const productos = [];
        productos.push(collectionTraer.data.ingredients) 
        dispatch(listSync(productos[0]));
    }
}

export const listSync = (productos) => {
    return {
        type: typesProductos.list,
        payload: productos
    }
}