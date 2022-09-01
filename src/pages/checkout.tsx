import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
export default function Checkout() {
    const handleClick = async (event) => {
        // Creates a new Checkout session. 
        const { sessionId } = await fetch('/api/checkout/session', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ quantity: 1 })
    }).then(res => res.json())

    // Redirects customers to the checkout, when they click on the button.
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });

    }
    return (
        <div>
            <h1>Checkout</h1>
            <button role="link" onClick={handleClick}>
                Checkout
            </button>
        </div>

    )
}