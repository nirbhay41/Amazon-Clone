import Image from "next/image";
import styles from './Header.module.scss';
import { ShoppingCartIcon, MenuIcon } from '@heroicons/react/outline';
import SearchBar from './SearchBar/SearchBar';
import UserLogin from './UserLogin/UserLogin';
import SideNav from "./SideNav/SideNav";
import { useEffect, useRef, useState } from "react";

async function getCategories(): Promise<Array<string>> {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await res.json();
    return categories;
}

export default function Header() {
    const [categories, setCategories] = useState<string[]>([]);
    const sideNavRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getCategories().then(res => setCategories(res));
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
                        <SearchBar categories={categories} />
                    </div>

                    <div className={styles.userlogin}>
                        <UserLogin />
                    </div>

                    <div className={styles.orders}>
                        <div>Returns</div>
                        <p>&Orders</p>
                    </div>

                    <div className={styles.cart}>
                        <div className={styles.cart_no} style={{ position: "relative" }}>
                            <span className={styles.order_no}>0</span>
                            <ShoppingCartIcon className={styles.carticon} />
                        </div>
                        <span className={styles.cart_text}>Cart</span>
                    </div>
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
