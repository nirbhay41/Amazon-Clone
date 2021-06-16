import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import Banner from '../components/Banner/Banner';
import Header from '../components/Header/Header';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import styles from '../styles/Home.module.css';

export const setClickedContext = createContext(null);

export default function Home({ products }: { products: Product[] }) {
  const [clicked, setClicked] = useState(false);
  const value = {clicked,setClicked};
  return (
    <>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header clicked={clicked} />
      <main className={styles.main}>
        <Banner />
        <setClickedContext.Provider value={value}>
          <ProductGrid products={products} />
        </setClickedContext.Provider>
      </main>
      {/* Footer */}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return {
    props: {
      products
    }
  }
}
