import { ReactElement, RefObject } from 'react';
import styles from './SideNav.module.scss';
import { UserCircleIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { signin, signout, useSession } from 'next-auth/client';

type SideNavProps = {
    sideNavRef: RefObject<HTMLDivElement>;
    overlayRef: RefObject<HTMLDivElement>;
    closeBtnRef: RefObject<HTMLDivElement>;
    categories: string[];
}

export default function SideNav({ categories, sideNavRef, overlayRef, closeBtnRef }: SideNavProps) {
    const [session] = useSession();

    const closeSideNav = () => {
        closeBtnRef.current.style.display = "none";
        sideNavRef.current.style.width = "0";
        overlayRef.current.style.display = "none";
        document.body.style.overflow = "";
    }

    return (
        <>
            <div className={styles.sidenav} ref={sideNavRef}>
                <div className={styles.sidenav_bar}>
                    <div className={styles.user} onClick={() => !session ? signin() : null}>
                        <UserCircleIcon className={styles.userIcon} />
                        <span className={styles.text}>Hello, {session ? session.user.name : 'Sign In'}</span>
                    </div>

                    <div className={styles.menu_item}>
                        <div className={styles.title}>Shop By Department</div>
                        <div className={styles.options}>
                            <ul>
                                {categories.map((e, idx) => (
                                    <li key={idx}><MenuOption name={e} /></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.menu_item}>
                        <div className={styles.title}>Digital Content And Devices</div>
                        <div className={styles.options}>
                            <ul>
                                <li key="Echo & Alexa"><MenuOption name="Echo & Alexa"/></li>
                                <li key="Fire TV"><MenuOption name="Fire TV"/></li>
                                <li key="Kindle E-Readers & eBooks"><MenuOption name="Kindle E-Readers & eBooks"/></li>
                                <li key="Amazon Prime Video"><MenuOption name="Amazon Prime Video"/></li>
                                <li key="Amazon Prime Music"><MenuOption name="Amazon Prime Music"/></li>
                                <li key="Audible AudioBooks"><MenuOption name="Audible AudioBooks"/></li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.menu_item}>
                        <div className={styles.title}>Help & Settings</div>
                        <div className={styles.options}>
                            <ul>
                                <li key={1}><MenuOption name="Your Account"/></li>
                                <li key={2}><MenuOption name="Customer Service"/></li>
                                {session && <li key={3} ><MenuOption name="Sign Out" onClick={signout}/></li>}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.closebtn} onClick={closeSideNav} ref={closeBtnRef}>&times;</div>
            </div>
            <div className={styles.overlay} onClick={closeSideNav} ref={overlayRef}></div>
        </>
    )
}

function MenuOption({ name,onClick }: { name: string,onClick?: () => void }): ReactElement {
    return (
        <div className={styles.menu_option} onClick={onClick}>
            <div className={styles.menu_name}>{name}</div>
            <ChevronRightIcon className={styles.chevron_right} />
        </div>
    );
}
