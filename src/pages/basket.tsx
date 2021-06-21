import Head from 'next/head';
import Cart from '../components/Cart/Cart';
import Header from '../components/Header/Header';

export default function basket() {
    return (
        <>
        <Head>
            <title>
                Amazon | Basket
            </title>
        </Head>
            <Header />
            <Cart />
        </>
    )
}
