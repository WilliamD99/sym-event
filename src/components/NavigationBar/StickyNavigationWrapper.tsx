'use client';

import React, { useEffect, useState, useRef, createContext, useContext } from 'react';

interface MobileMenuContextType {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

export const useMobileMenu = () => {
    const context = useContext(MobileMenuContext);
    if (!context) {
        throw new Error('useMobileMenu must be used within a StickyNavigationWrapper');
    }
    return context;
};

interface StickyNavigationWrapperProps {
    children: React.ReactNode;
}

export function StickyNavigationWrapper({ children }: StickyNavigationWrapperProps) {
    const [isSticky, setIsSticky] = useState(false);
    const [navHeight, setNavHeight] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (navRef.current) {
                const navTop = navRef.current.offsetTop;
                const scrollY = window.scrollY;

                if (scrollY > navTop) {
                    if (!isSticky) {
                        setNavHeight(navRef.current.offsetHeight);
                        setIsSticky(true);
                    }
                } else {
                    setIsSticky(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSticky]);

    // Close mobile menu when window is resized to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const contextValue: MobileMenuContextType = {
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu
    };

    return (
        <MobileMenuContext.Provider value={contextValue}>
            {/* Placeholder div to prevent layout shift when sticky */}
            {isSticky && <div style={{ height: navHeight }} />}

            <div
                ref={navRef}
                className={`${isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm' : ' '} border-none shadow-lg`}
            >
                {children}
            </div>
        </MobileMenuContext.Provider>
    );
} 