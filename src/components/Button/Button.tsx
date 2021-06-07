import { Attributes, CSSProperties, ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
    children: ReactNode
    onClick?: () => void;
    inline_style?: CSSProperties;
    role?: string;
    disabled?: boolean;
}

export default function Button({disabled,role,children,onClick,inline_style}:ButtonProps) {
    return (
        <button disabled={disabled} role={role} className={styles.btn} style={inline_style} onClick={onClick}>{children}</button>
    )
}
