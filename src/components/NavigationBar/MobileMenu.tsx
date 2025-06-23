'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { PrismicNextLink } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { asText } from "@prismicio/client";
import { gsap } from 'gsap';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navigation: any;
    settings: any;
}

export function MobileMenu({ isOpen, onClose, navigation, settings }: MobileMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!menuRef.current || !overlayRef.current) return;

        if (isOpen) {
            // Show overlay and menu
            gsap.set([overlayRef.current, menuRef.current], { display: 'block' });

            // Animate overlay fade in
            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );

            // Animate menu slide in from right
            gsap.fromTo(menuRef.current,
                { x: '100%' },
                { x: '0%', duration: 0.4, ease: 'power3.out' }
            );
        } else {
            // Animate menu slide out to right
            gsap.to(menuRef.current, {
                x: '100%',
                duration: 0.3,
                ease: 'power2.in'
            });

            // Animate overlay fade out
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set([overlayRef.current, menuRef.current], { display: 'none' });
                }
            });
        }
    }, [isOpen]);

    // Close menu when clicking outside
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 h-screen w-screen bg-black/50 z-50 hidden"
                onClick={handleOverlayClick}
            />

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white shadow-xl z-50 hidden"
            >

                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-200">
                        <h2 className="text-lg font-semibold">
                            <PrismicText field={settings.data.siteTitle} />
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 p-6">
                        <ul className="space-y-4">
                            {navigation?.data?.links.map((item: any) => {
                                const isActive = pathname === item.link.url;
                                return (
                                    <li key={asText(item.label)}>
                                        <PrismicNextLink
                                            field={item.link}
                                            className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${isActive
                                                ? 'text-brand bg-brand/10'
                                                : 'text-slate-800 hover:bg-slate-50'
                                                }`}
                                            onClick={onClose}
                                        >
                                            <PrismicText field={item.label} />
                                        </PrismicNextLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
} 