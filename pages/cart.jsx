import { useContext } from 'react'
import { Context } from '../lib/State'
import Header from '../components/Header'

export default function Cart() {

    const [state, dispatch] = useContext(Context);

    return (
        <div>
          <Header />
          <ul>
            { state.map( (product, index) => {
                    console.log('listing item at index', index)
                    return(
                        <li key={index}>
                            {product.title} - ${product.price.toFixed(2)}
                            <button onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}>X</button>
                        </li>
                    );
              }) }
          </ul>
        </div>
    );
}

export function addItemToCart(props, loadingCallback){
    Cookies.set(props.sku, props);
}

export function removeItemFromCart(itemSku){
    Cookies.remove(itemSku);
}
