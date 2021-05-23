import Image from "next/image";
import styles from './Header.module.scss';
import { LocationMarkerIcon, ShoppingCartIcon } from '@heroicons/react/outline';
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

                <div className={styles.select_addr}>
                    <div>Hello</div>
                    <div style={{ "display": "flex" }}>
                        <LocationMarkerIcon className={styles.location_icon} />
                        <span>Select your address</span>
                    </div>
                </div>

                <div className={styles.searchBar}>
                    <SearchBar />
                </div>

                <div className={styles.userlogin}>
                    <UserLogin />
                </div>

                <div className={styles.orders}>
                    Orders
                </div>

                <div className={styles.cart}>
                    <ShoppingCartIcon className={styles.carticon} />
                    <span>Cart</span>
                </div>
            </div>

            <div className={styles.lower_nav}>
            </div>
        </header>
    );
}
