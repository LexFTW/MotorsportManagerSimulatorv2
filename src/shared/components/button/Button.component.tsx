import type {
    ButtonHTMLAttributes,
    PropsWithChildren,
} from 'react';

import styles from './Button.module.css';

type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'ghost'
    | 'link';

type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps
    extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    outlined?: boolean;
    square?: boolean;
    fullWidth?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    outlined = false,
    square = false,
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) => {
    const classes = [
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        outlined && styles['button--outlined'],
        square && styles['button--square'],
        fullWidth && styles['button--full'],
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            {...props}
            className={classes}
        >
            {children}
        </button>
    );
};