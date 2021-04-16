import { useContext } from 'react'
import { Context } from '../lib/State'
import Header from '../components/Header'

export default function Cart() {

    const [state, dispatch] = useContext(Context);

    const cartItems = state.map( (product, index) => {
        console.log('listing item at index', index)
        return(
            <li key={index}>
                {product.title} - ${product.price.toFixed(2)}
                <button onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}>X</button>
            </li>
        );
    })

    return (
        <div>
          <Header />
          { cartItems.length < 1
            ? <p>Your cart is empty.</p>
            : <ul> {cartItems} </ul>
          }
        </div>
    );
}
