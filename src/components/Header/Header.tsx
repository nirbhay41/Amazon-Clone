import Image from "next/image";
import styles from './Header.module.scss';
import { ShoppingCartIcon, MenuIcon } from '@heroicons/react/outline';
import SearchBar from './SearchBar/SearchBar';
import UserLogin from './UserLogin/UserLogin';
import SideNav from "./SideNav/SideNav";
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { useAppSelector } from "../../app/hooks";

export default function Header() {
    const [categories, setCategories] = useState<string[]>([]);
    const sideNavRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLDivElement>(null);
    const NO_OF_PRODUCTS_IN_BASKET = useAppSelector(state => state.basket.quantity);

    useEffect(() => {
        const abortController = new AbortController();

        fetch('https://fakestoreapi.com/products/categories',{signal: abortController.signal})
        .then(res => res.json())
        .then(data => setCategories(data))
        .catch(err => console.log('Error when fetching products category: \n'+err));

        return () => {
            console.log("Aborted....");
            abortController.abort();
        }
    }, []);

    const openSideNav = () => {
        sideNavRef.current.style.width = "370px";
        overlayRef.current.style.display = "block";
        closeBtnRef.current.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    return (
        <>
            <SideNav categories={categories}
                sideNavRef={sideNavRef}
                overlayRef={overlayRef}
                closeBtnRef={closeBtnRef}
            />
            <header className={styles.header}>
                <div className={styles.top_nav}>
                    <Link href='/'>
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
                    </Link>
                    <div className={styles.searchBar}>
                        <SearchBar categories={categories} />
                    </div>

                    <div className={styles.userlogin}>
                        <UserLogin />
                    </div>

                    <div className={styles.orders}>
                        <div>Returns</div>
                        <p>&Orders</p>
                    </div>

                    <Link href='/basket'>
                        <div className={styles.cart}>
                            <div className={styles.cart_no} style={{ position: "relative" }}>
                                <span className={styles.order_no}>{NO_OF_PRODUCTS_IN_BASKET}</span>
                                <ShoppingCartIcon className={styles.carticon} />
                            </div>
                            <span className={styles.cart_text}>Cart</span>
                        </div>
                    </Link>
                </div>

                <div className={styles.lower_nav}>
                    <div className={styles.all_menu} onClick={openSideNav}>
                        <MenuIcon className={styles.menu_icon} />
                        <span>All</span>
                    </div>

                    <p className={styles.text}>Prime Video</p>
                    <p className={styles.text}>Amazon Business</p>
                    <p className={styles.text}>Today's Deals</p>
                    <div className={styles.extra}>
                        <p className={styles.text}>Electronics</p>
                        <p className={styles.text}>Food & Grocery</p>
                        <p className={styles.text}>Prime</p>
                        <p className={styles.text}>Buy Again</p>
                        <p className={styles.text}>Shopper Toolkit</p>
                        <div className={styles.banner}>
                            <Image src="/amazon_music_banner.webp" height={40}
                                width={390} />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
