import ProductCard from './ProductCard/ProductCard';
import styles from './ProductGrid.module.scss';

export default function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className={styles.productGrid}>
            {products.slice(0, 4).map(item => (
                <ProductCard product={item} key={item.id} />
            ))}

            <img loading='lazy' src='/grid_banner_1.jpeg' className={styles.banner} />

            {products.slice(4, 13).map(item => (
                <ProductCard product={item} key={item.id} />
            ))}

            <div className={styles.span2}>
                {products.slice(13, 14).map(item => (
                    <ProductCard product={item} key={item.id} />
                ))}
            </div>

            <img loading='lazy' src='/grid_banner_2.jpg' className={styles.banner} />

            {products.slice(14).map(item => (
                <ProductCard product={item} key={item.id} />
            ))}

            <img loading='lazy' src='/grid_banner_3.jpg' className={styles.banner} />
        </div>
    )
}
