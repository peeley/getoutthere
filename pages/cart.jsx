import { useContext } from 'react'
import Link from 'next/link'
import { Context } from '../lib/State'
import Header from '../components/Header'

export default function Cart() {

    const [state, dispatch] = useContext(Context);

    const renderCartItems = (items) =>
        items.map( (product, index) => {
            return(
                <li key={index}>
                    {product.title} - ${product.price.toFixed(2)}
                    <button onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}>X</button>
                </li>
            );
        });

    const cartItems = state.length > 0
    ? <>
        { renderCartItems(state) }
        <div className="flex flex-row justify-end">
            <button className="text-xl font-bold bg-blue-600 text-white rounded-full my-5 p-5" onClick={submitToCheckout}>Checkout</button>
        </div>
      </>
    : <p className="text-2xl font-bold">Your cart is empty. <Link href="/shop"><a className="underline">Start Shopping</a></Link></p>

    return (
        <div>
          <Header />
          <div className="mb-16 mt-20 mx-16">
            <h1 className="text-3xl font-bold mb-10">SHOPPING CART</h1>
            { cartItems }
          </div>
        </div>
    );
}

function submitToCheckout() {
    console.log('going to checkout!');
}

