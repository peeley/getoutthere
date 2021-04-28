import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Context } from '../lib/State'
import Header from '../components/Header'
import { loadStripe } from '@stripe/stripe-js'

export default function Cart() {

    const [state, dispatch] = useContext(Context);

    const renderCartItems = (items) =>
        items.map( (product, index) => {
            // FIXME table might not be best for mobile view
            return(
                <tr className="border-t" key={index}>
                    <td className="flex flex-row justify-start ml-5 items-center">
                        <button className="hover:text-gray-900 hover:bg-gray-300 rounded text-gray-500 bg-gray-200 py-2 px-4 mx-5 my-10 align-middle" onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}>X</button>
                      <Image src={product.imagePath} width="100" height="100"/>
                      <span className="ml-5 font-bold text-2xl flex-grow content-center">{product.title}</span>
                    </td>
                    <td className="text-right">
                      <input className="border w-1/6 text-center" min="1" type="number" value={product.quantity}
                             onChange={(e) => dispatch({ type: 'CHANGE_QUANTITY', index, newQuantity: parseInt(e.target.value) })} />
                    </td>
                    <td className="font-bold text-2xl text-center">${product.price.toFixed(2) * product.quantity}</td>
                </tr>
            );
        });

    let subtotal = state.reduce( (sum, item) => sum + (item.price * item.quantity), 0 );

    const submitToCheckout = async (event) => {
        event.preventDefault();

        const checkoutSession = await fetch(
            '/api/checkout_sessions',
            { method: 'POST',
              body: JSON.stringify({ items: state}) }
        );

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

        const { error } = await stripe.redirectToCheckout({
            sessionId: checkoutSession.id
        });

        alert(error.message);
    }

    const cartItems = state.length > 0
    ? <>
        <table className="table-fixed w-full">
          <thead>
            <tr>
                <th className="text-center pl-16">Item</th>
                <th className="text-right">Quantity</th>
                <th>Price</th>
            </tr>
          </thead>
          <tbody>
            { renderCartItems(state) }
          </tbody>
        </table>
        <div className="my-10 text-right">
          <span className="block font-bold text-2xl">Subtotal: ${subtotal.toFixed(2)}</span>
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
