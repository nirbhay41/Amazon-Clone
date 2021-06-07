import styles from './UserLogin.module.scss';
import { useSession, signIn, signOut } from 'next-auth/client';

export default function UserLogin() {
    const [session] = useSession();

    return (
        <div className={styles.userlogin} onClick={() => session ? signOut() : signIn()}>
            <div>Hello, {session ? session.user.name : "Sign In"}</div>
            <div>Accounts & Lists</div>
        </div>
    )
}