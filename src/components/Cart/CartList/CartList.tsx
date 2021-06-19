import { StarIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { removeFromBasket, updateBasket } from '../../../app/slices/basketSlice';
import { updateState } from '../../../app/slices/renderSlice';
import Button from '../../Button/Button';
import Checkout from '../Checkout/Checkout';
import styles from './CartList.module.scss';

type CartListProps = {
    productsFromDB: Product[];
    productsFromRedux: Product[];
}

export default function CartList(props: CartListProps) {
    const {productsFromDB,productsFromRedux} = props;
    const [session] = useSession();

    return (
        <div className={styles.cartList}>
            <div className={styles.product}>
                <h1 className={styles.heading}>Your Items</h1>
                <ul className={styles.list}>
                    {
                        (session ? productsFromDB : productsFromRedux).map(p => (
                            <li key={p.id}><CartItem product={p} /></li>
                        ))
                    }
                </ul>
            </div>

            {(session ? productsFromDB : productsFromRedux).length > 0 && <Checkout products={(session ? productsFromDB : productsFromRedux)} />}
        </div>
    )
}

function CartItem({ product }: {product: Product}) {
    const [session] = useSession();
    const { id, image, title, rating, description, price, hasPrime, quantity } = product;
    const dispatch = useAppDispatch();

    const removeFromCart = async () => {
        if(session){
            const res = await axios.post('/api/db/removeProduct',{
                userEmail: session.user.email,
                product
            });

            dispatch(updateState());
            console.log(res.data);
        }else dispatch(removeFromBasket(id));
    }

    const updateQty = async (newQty: number) => {
        if(session){
            const res = await axios.post('/api/db/updateProductQty',{
                userEmail: session.user.email,
                newQty,
                product
            });

            dispatch(updateState());
            console.log(res.data);
        }else dispatch(updateBasket({ id, qty: newQty }))
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
                    <strong className={styles.price}>₹{price}</strong>
                </div>

                <div className={styles.removeBtn}>
                    <Button onClick={removeFromCart}>Remove From Basket</Button>
                </div>
            </div>
        </div>
    );
}
