import '@testing-library/jest-dom'
import { registerSync } from '../../../redux/actions/actionRegister';
import { typesRegister } from '../../../redux/types/types';

describe('Pruebas actionRegister', () =>{

    test('Validar register Sync', ()=>{
        const email='abc@gmail.com';
        const pass='123456.';
        const name='AndresO';

        const registerAction= registerSync( email, pass, name);

        expect ( registerAction).toEqual({
            type:typesRegister.register,
            payload:{
                email,
                pass,
                name
            }
        })

    })
})