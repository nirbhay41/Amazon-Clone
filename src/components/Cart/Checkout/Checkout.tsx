import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { useAppSelector } from '../../../app/hooks';
import Button from '../../Button/Button';
import styles from './Checkout.module.scss';
const stripePromise = loadStripe(process.env.stripe_public_key);

export default function Checkout() {
    const products = useAppSelector(state => state.basket.products);
    const NO_OF_PRODUCTS = useAppSelector(state => state.basket.quantity);
    const [session] = useSession();

    let total = 0;
    const createCheckOutSession = async () => {
        const stripe = await stripePromise;
        
        const checkOutSession = await axios.post('/api/create-checkout-session',{
            products,
            email: session.user.email,
        })

        const result = await stripe.redirectToCheckout({
            sessionId: checkOutSession.data.id,
        });

        if(result.error)
            alert(result.error.message);
    }

    return (
        <div className={styles.checkout}>
            <h3>Checkout</h3>
            {products.map(p => {
                total += p.price*p.quantity;
                return (
                    <div className={styles.checkOutList} key={p.id}>
                        <div className={styles.name}>
                            <p>{p.title}</p>
                            <span> x {p.quantity}</span>
                        </div>
                        <strong>₹{(p.price*p.quantity).toFixed(2)}</strong>
                    </div>
                )
            })}
            <div className={styles.total}>
                <p>Subtotal({NO_OF_PRODUCTS} item):</p>
                <strong>₹{total.toFixed(2)}</strong>
            </div>

            <Button disabled={!session} role="link" onClick={createCheckOutSession} inline_style={{ marginRight: "10px", marginBottom: "1rem" }}>Proceed to Buy</Button>
        </div>
    )
}
