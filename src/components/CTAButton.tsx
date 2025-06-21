import Link from 'next/link';
import { FC } from 'react';

interface CTAButtonProps {
    title: string;
    url: string;
    className?: string;
}

const CTAButton: FC<CTAButtonProps> = ({ title, url, className = '' }) => {
    return (
        <Link
            href={url}
            className={`group relative inline-block overflow-hidden ${className}`}
        >
            <span className="relative font-playfair z-10 block px-8 py-4 font-bold uppercase tracking-wider text-white border-2 border-brand transition-colors duration-500 ease-out group-hover:text-black">
                {title}
            </span>
            <div className="absolute bottom-0 left-0 w-full h-0 bg-linear-to-t from-white to-brand transition-all duration-500 ease-out group-hover:h-full"></div>
        </Link>
    );
};

export default CTAButton; 