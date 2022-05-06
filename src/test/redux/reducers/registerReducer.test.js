import '@testing-library/jest-dom'
import { registerReducer } from '../../../redux/reducers/registerReducer';
import { typesRegister } from '../../../redux/types/types';

describe ('Pruebas en registerReducer', ()=>{
    test('Realización de Registro', ()=>{

        const initState ={};
        const action ={
            type: typesRegister.register,
            payload:{
                email:'abc@gmail.com',
                pass: '123456.',
                name: 'AndresO'

            }
        };
        const state = registerReducer(initState, action);
        expect(state).toEqual({
            email:'abc@gmail.com',
            pass: '123456.',
            name: 'AndresO'

        })
    })
})