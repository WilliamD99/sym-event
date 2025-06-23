'use client';

import React from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { asText } from "@prismicio/client";
import { useMobileMenu } from './StickyNavigationWrapper';
import { MobileMenu } from './MobileMenu';
import { Button } from '../ui/button';

interface NavigationContentProps {
    settings: any;
    navigation: any;
}

export function NavigationContent({ settings, navigation }: NavigationContentProps) {
    const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();
    const pathname = usePathname();

    return (
        <div className='xl:px-20 mx-auto'>
            <div className="flex items-center justify-between leading-none">
                {/* Site Logo - Always visible */}
                <PrismicNextLink
                    href="/"
                    className="flex items-center"
                >
                    <Image
                        src="/logo.png"
                        alt="Site Logo"
                        width={120}
                        height={40}
                        className="h-12 md:h-16 w-auto"
                    />
                </PrismicNextLink>

                {/* Desktop Navigation - Hidden on mobile */}
                <nav className="hidden md:block">
                    <ul className="flex flex-wrap gap-6 md:gap-10 xl:gap-16">
                        {navigation.data?.links.map((item: any) => {
                            const isActive = pathname === item.link.url;
                            return (
                                <li
                                    key={asText(item.label)}
                                    className={`font-semibold xl:text-xl font-playfair font-semibold tracking-wide hover:text-brand duration-200 ${isActive ? 'text-brand' : 'text-slate-800'
                                        }`}
                                >
                                    <PrismicNextLink field={item.link}>
                                        <PrismicText field={item.label} />
                                    </PrismicNextLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className='hidden md:block'>
                    <Button className="bg-brand text-white hover:bg-brand/90 cursor-pointer px-8 py-6 lg:text-xl font-playfair tracking-wide font-semibold">Contact Us</Button>
                </div>
                {/* Mobile Menu Button - Only visible on mobile */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
                navigation={navigation}
                settings={settings}
            />
        </div>
    );
} 