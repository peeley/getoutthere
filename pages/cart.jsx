import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Context } from '../lib/State'
import { loadStripe } from '@stripe/stripe-js'

export default function Cart() {

  const [state, dispatch] = useContext(Context);

  const renderCartItems = (items) =>
    items.map((product, index) => {
      // FIXME table might not be best for mobile view
      return (
        <div className="border-t col-span-5 grid grid-cols-5" key={index}>
          <div className="col-span-3 md:col-span-2 flex flex-row justify-start md:ml-5 items-center">
            <button className="hover:text-gray-900 hover:bg-gray-300 rounded text-gray-500 bg-gray-200 md:py-2 px-2 md:px-4 md:mx-5 my-10 align-middle" onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}>&times;</button>
            <div className="hidden md:block">
              <Image src={product.imagePath} layout="fixed" width="100" height="100" />
            </div>
            <span className="ml-3 md:ml-5 font-bold text-lg md:text-2xl flex-grow content-center">{product.title}</span>
          </div>
          <div className="md:col-span-2 text-center self-center">
            <input className="border w-1/2 md:w-1/6" min="1" type="number" value={product.quantity}
              onChange={(e) => dispatch({ type: 'CHANGE_QUANTITY', index, newQuantity: parseInt(e.target.value) })} />
          </div>
          <div className="font-bold text-lg md:text-2xl text-center md:text-left self-center">${product.price.toFixed(2) * product.quantity}</div>
        </div>
      );
    });

  let subtotal = state.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const submitToCheckout = async (event) => {
    event.preventDefault();

    const checkoutResponse = await fetch(
      '/api/checkout_sessions',
      {
        method: 'POST',
        body: JSON.stringify({
          items: state,
        })
      }
    );

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    const checkoutSession = await checkoutResponse.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSession.id
    });

    alert(error.message);
  }

  const cartItems = state.length > 0
    ? <>
      <div className="grid grid-cols-5 w-full">
        <span className="col-span-2 text-center font-bold">Item</span>
        <span className="col-span-2 text-right md:text-center font-bold">Quantity</span>
        <div className="font-bold text-center md:text-left">Price</div>
        {renderCartItems(state)}
      </div>
      <div className="my-10 text-right">
        <span className="block font-bold text-xl md:text-2xl">Subtotal: ${subtotal.toFixed(2)}</span>
        <button className="text-lg md:text-xl font-bold bg-blue-600 text-white rounded-full my-5 p-3 md:p-5" onClick={submitToCheckout}>Checkout</button>
      </div>
    </>
    : <p className="text-2xl font-bold">Your cart is empty. <Link href="/shop"><a className="underline">Start Shopping</a></Link></p>

  return (
    <div>
      <div className="mb-16 mt-20 mx-4 md:mx-16">
        <h1 className="text-xl md:text-3xl font-bold mb-10">Shopping Cart</h1>
        {cartItems}
      </div>
    </div>
  );
}
