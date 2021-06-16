import getStripe from '../../../utils/getStripe';
import axios from 'axios';
import Button from '../../Button/Button';
import styles from './Checkout.module.scss';
import { useSession } from 'next-auth/client';

export default function Checkout({products}:{products: Product[]}) {
    const [session] = useSession();
    let total = 0,NO_OF_PRODUCTS = 0;

    const createCheckOutSession = async () => {
        const stripe = await getStripe();
        
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
                total += parseInt((p.price as string))*p.quantity;
                NO_OF_PRODUCTS++;
                return (
                    <div className={styles.checkOutList} key={p.id}>
                        <div className={styles.name}>
                            <p>{p.title}</p>
                            <span> x {p.quantity}</span>
                        </div>
                        <strong>₹{(parseInt((p.price as string))*p.quantity).toFixed(2)}</strong>
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
