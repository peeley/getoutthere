import Cookies from 'js-cookie'
import { createContext, useReducer } from 'react'

export const Context = createContext(getInitialStateFromCookies());

function cartReducer(state, action){
    let newState = null;
    switch(action.type){
        case 'ADD_ITEM':
            // edge case: user already has same item in cart
            // in this case, just increase quantity of that item by one
            for(let idx = 0; idx < state.length; idx++) {
                if (state[idx].sku === action.product.sku) {
                    newState = [...state];
                    newState[idx].quantity += 1;
                    Cookies.set('cart', newState);
                    return newState;
                }
            }
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
