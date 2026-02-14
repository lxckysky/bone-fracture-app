import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
    const hoverStyles = hover ? 'hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer' : '';

    return (
        <div
            className={`bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-xl ${hoverStyles} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-6 border-b border-slate-700/50 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-6 border-t border-slate-700/50 ${className}`}>{children}</div>;
}
