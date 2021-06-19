import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.stripe_public_key);
    }
    return stripePromise
}

export default getStripe;