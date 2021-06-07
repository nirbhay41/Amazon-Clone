import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { removeFromBasket, updateBasket } from '../../../app/slices/basketSlice';
import Button from '../../Button/Button';
import Checkout from '../Checkout/Checkout';
import styles from './CartList.module.scss';

export default function CartList() {
    const products = useAppSelector(state => state.basket.products);

    return (
        <div className={styles.cartList}>
            <div className={styles.product}>
                <h1 className={styles.heading}>Your Items</h1>
                <ul className={styles.list}>
                    {products.map(p => (
                        <li key={p.id}><CartItem product={p} /></li>
                    ))}
                </ul>
            </div>

            {products.length > 0 && <Checkout />}
        </div>
    )
}


function CartItem({ product }: { product: Product }) {
    const { id, image, title, rating, description, price, hasPrime, quantity } = product;
    const dispatch = useAppDispatch();

    const removeFromCart = () => {
        dispatch(removeFromBasket(id));
    }

    const updateQty = (newQty: number) => {
        dispatch(updateBasket({ id, qty: newQty }))
    }


    return (
        <div className={styles.cartItem}>
            <Image src={image} width={200} height={200} objectFit='contain' />

            <div className={styles.details}>
                <div className={styles.title}>{title}</div>
                <div className={styles.rating}>
                    {Array(rating).fill(0).map((_, idx) => (
                        <StarIcon key={idx} height={25} color="rgba(245,158,11,1)" />
                    ))}
                </div>
                <div className={styles.description}>{description}</div>
                {hasPrime &&
                    <div className={styles.prime}>
                        <Image src='/prime-tag.png' width={50} height={40} alt="Prime tag" />
                        <p>Free Next Day Delivery</p>
                    </div>
                }
            </div>

            <div className={styles.cartOptions}>
                <div className={styles.qty}>
                    <p>Qty: </p>
                    <select defaultValue={quantity} onChange={(e) => updateQty(parseInt(e.target.value))}>
                        {Array<number>(10).fill(0).map((_, idx) => (
                            <option value={idx + 1} key={idx}>{idx + 1}</option>
                        ))}
                    </select>
                    <strong className={styles.price}>₹{price.toFixed(2)}</strong>
                </div>

                <div className={styles.removeBtn}>
                <Button onClick={removeFromCart}>Remove From Basket</Button>
                </div>
            </div>
        </div>
    );
}
