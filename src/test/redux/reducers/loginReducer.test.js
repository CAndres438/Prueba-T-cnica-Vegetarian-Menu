import '@testing-library/jest-dom'
import { loginReducer } from "../../../redux/reducers/loginReducer";
import { typesLogin } from "../../../redux/types/types";

describe ('Pruebas en LoginReducer', ()=>{
    test('Realización de Login', ()=>{

        const initState ={};
        const action ={
            type: typesLogin.login,
            payload:{
                email:'abc@gmail.com',
                password: '123456.'
            }
        };
        const state = loginReducer(initState, action);
        expect(state).toEqual({
            id:'abc@gmail.com',
            name: '123456.'
        })
    })

    test('Cerrar sesión Logout', ()=>{
        const initState = {
            id:'abc@gmail.com',
            name: '123456.'
        };

        const action = {
            type: typesLogin.logout,
        };

        const state = loginReducer( initState, action);
        expect(state).toEqual({})
    })
})