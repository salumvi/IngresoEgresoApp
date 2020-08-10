import { createReducer, on } from '@ngrx/store';
import * as actions from './ingreso-egreso.actions';
import { IngresoEgreso } from '../modelos/ingreso-egreso';

export interface State {
    items: IngresoEgreso[]; 
}

export const initialState: State = {
   items: [],
}

const _IngresoEgresoReducer = createReducer(initialState,

    on(actions.setItems, (state , {items}) => ({ ...state, items: [...items]})),
    on(actions.unSetItems, (state ) => ({ ...state, items: []})),

);

export function IngresoEgresoReducer(state, action) {
    return _IngresoEgresoReducer(state, action);
}