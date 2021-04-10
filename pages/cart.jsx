import { useContext } from 'react'
import { Context } from '../lib/State'
import Header from '../components/Header'

export default function Cart() {

    const [state, dispatch] = useContext(Context);

    const cartListElements = Object.values(state).map( product => {
        return (
            <li>
                {product.title} - ${product.price.toFixed(2)}
            </li>
        );
    });

    return (
        <div>
          <Header />
          <ul>
            {cartListElements}
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
