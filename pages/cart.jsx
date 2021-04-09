import { parse } from 'cookie'
import Header from '../components/Header'

export default function Cart({ cartItems }) {
    const cartListElements = Object.values(cartItems).map( props => {
        const product = JSON.parse(props);
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

export async function getServerSideProps(context){
    const cookie = context.req.headers.cookie;
    const cookieObject = parse(cookie);

    return { props: {
        cartItems: cookieObject
    }};
}

export function addItemToCart(props){
    Cookies.set(props.sku, props)
    console.log(Cookies.get());
}
