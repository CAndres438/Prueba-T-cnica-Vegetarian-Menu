import '@testing-library/jest-dom'
import { loginSincronico, logoutSync } from '../../../redux/actions/actionLogin';
import { typesLogin } from '../../../redux/types/types';


describe('Verificación de acciones Login', () =>{

    test('Validar Login Sincrono', ()=>{
        const email = 'abc@gmail.com';
        const password = '123456.';

        const loginAction = loginSincronico( email, password);

        expect(loginAction).toEqual({
            type: typesLogin.login,
            payload: {
                email,
                password
            }
        });

    })

    test('Cerrar sesión', ()=>{
        
        const logoutAction = logoutSync();

        expect(logoutAction).toEqual({
            type: typesLogin.logout,
        });
    })
})