import { CheckCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import Header from "../../components/Header/Header";
import { Order, OrderItem } from "../../types/order";
import styles from '../../styles/Success.module.scss';
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Router from "next/router";
import { useSession } from "next-auth/client";

export default function success() {
    const [order, setOrder] = useState<Order | null>(null);
    const [isBusy, setBusy] = useState(true);
    const [session, loading] = useSession();
    console.log(session);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const session_id = params.get('session_id');
        const getData = async () => {
            const res = await axios.post('/api/success', {
                session_id
            });

            if (res.data.order) {
                setOrder(res.data.order);
                setBusy(false);
            }
        }

        if (session_id)
            getData();
    }, []);

    if (!session && !loading) {
        Router.push('/404');
    }

    return (
        <div className={styles.success}>
            <Header />
            {isBusy ?
                <div className={styles.loader}>
                    <Loader color="#232F3E" />
                </div> : <main className={styles.main}>
                    <div className={styles.topBar}>
                        <CheckCircleIcon className={styles.tick} width={80} height={80} color="#26c27d" />
                        <h1>We've received your order</h1>
                    </div>

                    <div className={styles.midBar}>
                        <div className={styles.delivery}>
                            <h2>Delivery Details</h2>
                            <div className={styles.details}>
                                <div className={styles.deliveryFor}>
                                    <h3>Delivery For</h3>
                                    <p>{order.shipping.name}<br />
                                        <span>Email:</span> {order.email}</p>
                                </div>

                                <div className={styles.address}>
                                    <h3>Address</h3>
                                    <p>{order.shipping.address.line1}<br />{order.shipping.address.line2},{order.shipping.address.city}<br />
                                        {order.shipping.address.state}<br />
                                        India
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.orderSummary}>
                            <h2>Order Summary</h2>
                            <div className={styles.itemsList}>
                                {order.product_details.map((item, idx) => (
                                    <Item key={idx} item={item} />
                                ))}
                            </div>

                            <div className={styles.calc}>
                                <div className={styles.part}>
                                    <p>Sub Total</p>
                                    <span>₹{order.subTotal / 100}</span>
                                </div>

                                <div className={styles.part}>
                                    <p>Standard Delivery</p>
                                    <span>₹{order.amount_shipping / 100}</span>
                                </div>

                                <div className={styles.total}>
                                    <p>Total</p>
                                    <span>₹{order.total / 100}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bottomBar}>
                        <h2>Payment Information</h2>
                        <div className={styles.paymentInfo}>
                            <div className={styles.cardInfo}>
                                <h3>Debit Card</h3>
                                <p>Card No: 42424242424242</p>
                            </div>

                            <div className={styles.billingAddress}>
                                <h3>Billing address: </h3>
                                <p>{order.shipping.address.line1}<br />{order.shipping.address.line2},{order.shipping.address.city}<br />
                                    {order.shipping.address.state}<br />
                                    India
                                </p>
                            </div>
                        </div>
                    </div>
                </main>}
        </div>
    )
}

const Item = ({ item }: { item: OrderItem }) => {
    return (
        <div className={styles.item}>
            <Image src={item.image}
                width={80}
                height={80}
                objectFit="contain"
            />
            <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p><span>Qty:</span> {item.quantity}</p>
                <p><span>Price:</span> ₹{(item.unit_amount / 100)}</p>
            </div>

            <div className={styles.totalPrice}>₹{(item.amount_total / 100)}</div>
        </div>
    )
}