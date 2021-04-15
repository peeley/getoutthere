import Cookies from 'js-cookie'
import { createContext, useReducer } from 'react'

export const Context = createContext(getInitialStateFromCookies());

function cartReducer(state, action){
    let newState = null;
    switch(action.type){
        case 'ADD_ITEM':
            newState = [...state, action.product];
            break;
        case 'REMOVE_ITEM':
            newState = state.filter((_, idx) => idx !== action.index);
            break;
        default:
            return state;
    }
    Cookies.set('cart', newState);
    return newState
}

export function Store({children}){
  const [state, dispatch] = useReducer(cartReducer, getInitialStateFromCookies());

  return (
      <Context.Provider value={[state, dispatch]}>
        {children}
      </Context.Provider>
  )
}

function getInitialStateFromCookies(){
    const state = Cookies.get('cart');
    return state ? JSON.parse(state) : [];
}
