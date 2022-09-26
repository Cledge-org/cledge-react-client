import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
    const handleClick = async (event) => {

        const { sessionId } = await fetch('/api/stripe/uwcs-hours/create-purchase-hours', {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({quantity: 1})
    }).then(res => res.json())

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });
    }    
    return (
        <div>
            <h1>Purchase hours for 1:1 guidence with a Counselor</h1>
            <button role = "link" onClick={handleClick}>
                Purchase Hours
            </button>
        </div>
    )
}   
