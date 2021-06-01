import { CSSProperties, ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
    children: ReactNode
    onClick?: () => void;
    inline_style?: CSSProperties;
}

export default function Button({children,onClick,inline_style}:ButtonProps) {
    return (
        <button className={styles.btn} style={inline_style} onClick={onClick}>{children}</button>
    )
}
