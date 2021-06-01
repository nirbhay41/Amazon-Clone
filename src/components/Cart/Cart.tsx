import Image from 'next/image';
import { useAppSelector } from '../../app/hooks';
import styles from './Cart.module.scss';
import CartList from './CartList/CartList';
import EmptyCart from './EmptyCart/EmptyCart';

export default function Cart() {
    const NO_OF_PRODUCTS_IN_BASKET = useAppSelector(state => state.basket.products.length);

    return (
        <div className={styles.cart}>
            <div className={styles.text}>
                <strong className={styles.top_text}>Pay faster for all your shopping needs <span>with Amazon Pay balance</span></strong>
                <p className={styles.low_text}>Get Instant refund on cancellations | Zero payment failures</p>
            </div>

            <div className={styles.banner}>
                <Image src='/basket_banner.webp' width={1024} height={270} />
            </div>
            
            {NO_OF_PRODUCTS_IN_BASKET < 1 && 
                <div className={styles.emptycart}>
                    <EmptyCart />
                </div>
            }

            <div className={styles.cartlist}>
                <CartList />
            </div>
        </div>
    )
}
