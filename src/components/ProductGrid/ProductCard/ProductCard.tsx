import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './ProductCard.module.scss';

const MIN_RATING = 2;
const MAX_RATING = 5;

export default function ProductCard({product}:{product:Product}) {
    const {title,category,description,price,image} = product;
    const [hasPrime] = useState(Math.random() < 0.5);
    const [rating] = useState(
        Math.floor(Math.random()*(MAX_RATING-MIN_RATING+1)) + MIN_RATING
    );
    const [exchangeRate,setExchangeRate] = useState(0);

    const getExchangeRate = async () => {
        const res = await fetch('/api/exchangeRate')
        const rate:{USD_INR:number} = await res.json();
        setExchangeRate(rate.USD_INR);
    }

    useEffect(() => {
        getExchangeRate();
    },[]);

    return (
        <div className={styles.productCard}>
            <p className={styles.category}>{category}</p>

            <Image src={image} width={200} height={200} objectFit='contain' alt="Product Image"/>

            <h4 className={styles.productName}>{title}</h4>

            <div className={styles.rating}>
                {Array(rating).fill(0).map((_,idx) => (
                    <StarIcon key={idx} height={25} color="rgba(245,158,11,1)"/>
                ))}
            </div>

            <div className={styles.description}>{description}</div>

            <div className={styles.price}>₹{(price*exchangeRate).toFixed(2)}</div>
            
            {hasPrime && 
                <div className={styles.prime}>
                    <Image src='/prime-tag.png' width={50} height={40} alt="Prime tag"/>
                    <p>Free Next Day Delivery</p>
                </div>
            }

            <button className={styles.addToCart}>Add to Cart</button>
        </div>
    )
}
