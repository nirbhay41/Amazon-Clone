import Image from "next/image";
import styles from './Header.module.scss';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import SearchBar from './SearchBar/SearchBar';
import UserLogin from './UserLogin/UserLogin';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.top_nav}>
                <div className={styles.nav_logo}>
                    <Image
                        className={styles.logo}
                        src="/amazon_logo_primary.png"
                        width={110}
                        height={110}
                        objectFit="contain"
                    />
                    <span>.in</span>
                </div>

                <div className={styles.searchBar}>
                    <SearchBar />
                </div>

                <div className={styles.userlogin}>
                    <UserLogin />
                </div>

                <div className={styles.orders}>
                    <div>Returns</div>
                    <p>&Orders</p>
                </div>

                <div className={styles.cart}>
                    <div className={styles.cart_no} style={{position: "relative"}}>
                        <span className={styles.order_no}>0</span>
                        <ShoppingCartIcon className={styles.carticon} />
                    </div>
                    <span className={styles.cart_text}>Cart</span>
                </div>
            </div>

            <div className={styles.lower_nav}>
            </div>
        </header>
    );
}
