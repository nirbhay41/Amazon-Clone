import { useAppSelector } from '../../../app/hooks';
import Button from '../../Button/Button';
import styles from './Checkout.module.scss';

export default function Checkout() {
    const products = useAppSelector(state => state.basket.products);
    const NO_OF_PRODUCTS = useAppSelector(state => state.basket.quantity);
    let total = 0;

    return (
        <div className={styles.checkout}>
            <h3>Checkout</h3>
            {products.map(p => {
                total += p.price * 72 * p.quantity;
                return (
                    <div className={styles.checkOutList} key={p.id}>
                        <div className={styles.name}>
                            <p>{p.title}</p>
                            <span> x {p.quantity}</span>
                        </div>
                        <strong>₹{(p.price * 72 * p.quantity).toFixed(2)}</strong>
                    </div>
                )
            })}
            <div className={styles.total}>
                <p>Subtotal({NO_OF_PRODUCTS} item):</p>
                <strong>₹{total.toFixed(2)}</strong>
            </div>

            <Button inline_style={{ marginRight: "10px", marginBottom: "1rem" }}>Proceed to Buy</Button>
        </div>
    )
}
