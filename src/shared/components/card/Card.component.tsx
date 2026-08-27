import React from 'react';
import styles from './Card.module.css';

type CardProps = React.PropsWithChildren<
    React.ComponentProps<'div'>
>;

const Card = ({ children, className, ...props }: CardProps) => {
    return (
        <div {...props} className={`${styles.card} ${className ?? ''}`}>
            {children}
        </div>
    );
};

const CardHeader = ({
    children,
    className,
    ...props
}: React.PropsWithChildren<React.ComponentProps<'div'>>) => {
    return (
        <div
            {...props}
            className={`${styles['card-header']} ${className ?? ''}`}
        >
            {children}
        </div>
    );
};

const CardBody = ({
    children,
    className,
    ...props
}: React.PropsWithChildren<React.ComponentProps<'div'>>) => {
    return (
        <div
            {...props}
            className={`${styles['card-body']} ${className ?? ''}`}
        >
            {children}
        </div>
    );
};

const CardFooter = ({
    children,
    className,
    ...props
}: React.PropsWithChildren<React.ComponentProps<'div'>>) => {
    return (
        <div
            {...props}
            className={`${styles['card-footer']} ${className ?? ''}`} 
        >
            {children}
        </div>
    );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;


export { Card };