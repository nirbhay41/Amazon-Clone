import axios from 'axios';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import styles from './Cart.module.scss';
import CartList from './CartList/CartList';
import EmptyCart from './EmptyCart/EmptyCart';
import Loader from '../Loader/Loader';

export const LoadingContext = createContext<Dispatch<SetStateAction<boolean>>>(null);

export default function Cart() {
    const productsFromRedux = useAppSelector(state => state.basket.products);
    const [productsFromDB, setProductsFromDB] = useState<Product[]>([]);
    const [session] = useSession();
    // For re rendering the CartList and Checkout component when something changes in db
    const render = useAppSelector(state => state.render);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();

        async function getProducts() {
            const res = await axios.post('/api/db/getProducts', {
                userEmail: session.user.email,
            }, {
                cancelToken: source.token
            });

            if (res.data.products) {
                setProductsFromDB(res.data.products);
            } else {
                setProductsFromDB([]);
            }
        }

        if (session)
            getProducts();

        return () => {
            source.cancel('GET Request cancelled for getting products')
        }
    }, [session, render]);

    useEffect(() => {
        if(loading){
            document.body.style.overflow = "hidden";
        }else document.body.style.overflow = "";
    }, [loading])

    return (
        <>
            {loading && <div className={styles.loading}>
                <Loader color="#fff"/>
            </div>}
            <div className={styles.cart}>
                <div className={styles.text}>
                    <strong className={styles.top_text}>Pay faster for all your shopping needs <span>with Amazon Pay balance</span></strong>
                    <p className={styles.low_text}>Get Instant refund on cancellations | Zero payment failures</p>
                </div>

                <div className={styles.banner}>
                    <Image src='/basket_banner.webp' width={1024} height={270} />
                </div>

                {(session ? productsFromDB : productsFromRedux).length < 1 &&
                    <div className={styles.emptycart}>
                        <EmptyCart />
                    </div>
                }

                <div className={styles.cartlist}>
                    <LoadingContext.Provider value={setLoading}>
                        <CartList productsFromDB={productsFromDB}
                            productsFromRedux={productsFromRedux}
                        />
                    </LoadingContext.Provider>
                </div>
            </div>
        </>
    )
}
