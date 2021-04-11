import { createContext, useReducer } from 'react'

const initialState = [];

function cartReducer(state = initialState, action){
    switch(action.type){
        case 'ADD_ITEM':
            console.log('adding item:', action.product);
            return [...state, action.product];
        case 'REMOVE_ITEM':
            console.log('removing item at idx:', action.index);
            return state.filter((_, idx) => idx !== action.index);
        default:
            console.log('weird type');
            return state;
  }
}

export const Context = createContext(initialState);

export function Store({children}){
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
      <Context.Provider value={[state, dispatch]}>
        {children}
      </Context.Provider>
  )
}
