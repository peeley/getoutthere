import { useContext } from 'react'
import Link from 'next/link'
import { Context } from '../lib/State'
import Header from '../components/Header'

export default function Cart() {

    const [state, dispatch] = useContext(Context);

    const renderCartItems = (items) =>
        items.map( (product, index) => {
            return(
                <tr key={index}>
                    <td>{product.title}</td>
                    <td>
                      <input className="border" min="1" type="number" value={product.quantity}
                             onChange={(e) => dispatch({ type: 'CHANGE_QUANTITY', index, newQuantity: parseInt(e.target.value) })} />
                    </td>
                    <td>${product.price.toFixed(2) * product.quantity}</td>
                    <td>
                        <button className="bg-red-500 p-3" onClick={() => dispatch({ type: 'REMOVE_ITEM', index })}>X</button>
                    </td>
                </tr>
            );
        });

    const cartItems = state.length > 0
    ? <>
        <table className="border border-collapse table-fixed w-full">
          <thead>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
            { renderCartItems(state) }
          </tbody>
        </table>
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

