import styles from './UserLogin.module.scss';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useEffect } from 'react';
import axios from 'axios';

export default function UserLogin() {
    const [session] = useSession();

    useEffect(() => {
        if (session) {
            const addUserToDB = async () => {
                const res = await axios.post('/api/db/addUserToDb', {
                    userEmail: session.user.email,
                });
                console.log(res.data);
            }
            addUserToDB();
        }
    }, [session]);

    return (
        <div className={styles.userlogin} onClick={() => session ? signOut() : signIn()}>
            <div>Hello, {session ? session.user.name : "Sign In"}</div>
            <div>Accounts & Lists</div>
        </div>
    )
}