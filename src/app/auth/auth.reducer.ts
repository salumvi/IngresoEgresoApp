import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser } from './auth.actions';
import { Usuario } from '../modelos/usuario.model';

export interface State {
    usuario: Usuario; 
}

export const initialState: State = {
   usuario: null,
}

const _authReducer = createReducer(initialState,

    on(setUser, (state, { user }) => ({ ...state, user:{...user} })),
    on( unSetUser, state => ({ ...state, user: null }))

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}