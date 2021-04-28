import { loadStripe } from '@stripe/stripe-js'

export default function handler(req, res){
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

    console.log(req);

    const line_items = req.items.map( item => {
        name: item.title,
        amount: formatAmountForStripe(item.price, "USD"),
        currency: "usd",
        quantity: item.quantity
    });

    const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    }

    const checkoutSession = await stripe.checkout.sessions.create(params);

    console.log('going to checkout!');
}
