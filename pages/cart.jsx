import Cookies from 'js-cookie'
import Header from '../components/Header'

export default function Cart() {
    const cartItems = getCartItems().map( item =>
        <li>
            {item.title} - ${item.price.toFixed(2)}
        </li>
    );
    return (
        <div>
          <Header />
          <ul>
            {cartItems}
          </ul>
        </div>
    );
}

function getCartItems(){
    return Cookies.get();
}

export function addItemToCart(props){
    Cookies.set(props.sku, props)
    console.log(Cookies.get());
}
