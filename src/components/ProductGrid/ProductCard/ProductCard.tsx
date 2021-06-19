import { StarIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { addToBasket } from '../../../app/slices/basketSlice';
import { updateState } from '../../../app/slices/renderSlice';
import Button from '../../Button/Button';
import styles from './ProductCard.module.scss';

const MIN_RATING = 2;
const MAX_RATING = 5;

export default function ProductCard({ product }: { product: Product }) {
    const { id, title, category, description, price, image } = product;
    const [hasPrime] = useState(Math.random() < 0.5);
    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    const dispatch = useAppDispatch();
    const [session] = useSession();

    const addItemToBasket = async () => {
        const productToAdd = {
            id,
            category,
            description,
            image,
            price: ((price as number) * 72).toFixed(2),
            title,
            rating,
            hasPrime,
            quantity: 1,
        }
        // Add to db
        if (session) {
            const res = await axios.post('/api/db/addToCart', {
                product: productToAdd,
                userEmail: session.user.email
            });
            const { data } = res.data;
            console.log(data);
            dispatch(updateState());
        } else dispatch(addToBasket(productToAdd));
    }

    return (
        <div className={styles.productCard}>
            <p className={styles.category}>{category}</p>

            <Image src={image} width={200} height={200} objectFit='contain' alt="Product Image" />

            <h4 className={styles.productName}>{title}</h4>

            <div className={styles.rating}>
                {Array(rating).fill(0).map((_, idx) => (
                    <StarIcon key={idx} height={25} color="rgba(245,158,11,1)" />
                ))}
            </div>

            <div className={styles.description}>{description}</div>

            <div className={styles.price}>₹{((price as number) * 72).toFixed(2)}</div>

            {hasPrime &&
                <div className={styles.prime}>
                    <Image src='/prime-tag.png' width={50} height={40} alt="Prime tag" />
                    <p>Free Next Day Delivery</p>
                </div>
            }

            <Button inline_style={{ marginTop: "auto" }} onClick={addItemToBasket}>Add to Cart</Button>
        </div>
    )
}
