import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "../reducers/loginReducer";

import { guardarLocalStorage, obtenerLocalStorage } from "../../utils/LocalStorage";
import { registerReducer } from "../reducers/registerReducer";
import { productsReducer } from "../reducers/productsReducer";
import { toppingsNReducer } from "../reducers/toppingNReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const storageState = obtenerLocalStorage();

const reducersEnviar = combineReducers({
    login: loginReducer,
    register: registerReducer,
    products: productsReducer,
    toppingsN: toppingsNReducer, 
})

export const store = createStore(
    reducersEnviar,
    storageState,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

store.subscribe(() => {
    guardarLocalStorage(
        {
           modal: store.getState().modal
        }
   )
})