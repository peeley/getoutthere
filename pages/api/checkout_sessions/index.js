import { Stripe } from 'stripe'

export default async function handler(req, res){
    const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY, {
        apiVersion: '2020-03-02',
    });

    const line_items = JSON.parse(req.body).items.map( item => { return {
        name: item.title,
        amount: formatAmountForStripe(item.price, "USD"),
        currency: "usd",
        quantity: item.quantity
    }});

    const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    }

    const checkoutSession = await stripe.checkout.sessions.create(params);
}

function formatAmountForStripe(amount, currency) {
    let numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    })

    const parts = numberFormat.formatToParts(amount)
    let zeroDecimalCurrency = true
    for (let part of parts) {
        if (part.type === 'decimal') {
        zeroDecimalCurrency = false
        }
    }
    return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}
