import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Banner from '../components/Banner/Banner';
import Header from '../components/Header/Header';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import styles from '../styles/Home.module.css';

export default function Home({ products }: { products: Product[] }) {
  return (
    <>
      <Head>
        <title>Amazon</title>
      </Head>

      <Header />
      <main className={styles.main}>
        <Banner />
        <ProductGrid products={products} />
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
