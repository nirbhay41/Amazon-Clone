import styles from './EmptyCart.module.scss';

export default function EmptyCart() {
    return (
        <div className={styles.emptycart}>
            <h1 className={styles.heading}>Your Amazon Cart is empty.</h1>
            <p className={styles.text}>Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.
            <br/>Continue shopping on the Amazon.in homepage, learn about today's deals, or visit your Wish List.</p>
        </div>
    )
}
