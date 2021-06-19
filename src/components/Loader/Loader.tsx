import styles from './Loader.module.scss';

export default function Loader({color}:{color:string}) {
    return (
        <div className={styles.loader}>
            <div style={{borderTopColor: color}}></div>
            <div style={{borderTopColor: color}}></div>
            <div style={{borderTopColor: color}}></div>
            <div style={{borderTopColor: color}}></div>
        </div>
    )
}
