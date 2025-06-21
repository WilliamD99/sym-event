"use client";

import { FC, useRef, useState, useCallback, useMemo, useEffect } from "react";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";

import { PrismicRichText } from "@/components/PrismicRichText";
import CTAButton from "@/components/CTAButton";

type GsapSliderProps = SliceComponentProps<any>;

const GsapSlider: FC<GsapSliderProps> = ({ slice }) => {
    // === AUTOPLAY CONFIGURATION ===
    const AUTOPLAY_ENABLED = false; // Set to false to disable autoplay
    const AUTOPLAY_DURATION = 5000; // Duration in milliseconds (5 seconds)
    // ==============================

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
    const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
    const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

    const slides = useMemo(() => slice.items || [], [slice.items]);

    const navigateToSlide = useCallback(async (index: number) => {
        if (isAnimating || index === currentSlide || !slidesRef.current[index]) return;

        setIsAnimating(true);
        const direction = index > currentSlide ? 'right' : 'left';
        const previousSlide = currentSlide;

        const currentSlideEl = slidesRef.current[previousSlide];
        const newSlideEl = slidesRef.current[index];

        if (!currentSlideEl || !newSlideEl) return;

        // Prepare new slide without making it visible yet
        newSlideEl.style.zIndex = '11';
        newSlideEl.style.opacity = '0'; // Keep it hidden initially

        // Hide current slide
        const hideCurrentSlide = () => {
            return new Promise<void>((resolve) => {
                const currentImgWrapper = currentSlideEl.querySelector('.img-wrapper > div') as HTMLElement;
                const currentTitle = currentSlideEl.querySelector('.inner-wrapper') as HTMLElement;

                if (!currentImgWrapper || !currentTitle) {
                    resolve();
                    return;
                }

                // Set transform origin for hide (opposite of show direction)
                gsap.set(currentImgWrapper, {
                    transformOrigin: direction === 'right' ? '100% 50%' : '0% 50%'
                });

                const tl = gsap.timeline({
                    onComplete: () => {
                        currentSlideEl.style.opacity = '0';
                        currentSlideEl.style.zIndex = '0';
                        resolve();
                    }
                });

                tl.to(currentTitle, {
                    duration: 1,
                    filter: "blur(30px)",
                    opacity: 0.2,
                    ease: "expo.inOut"
                }, 0)
                    .to(currentImgWrapper, {
                        duration: 1,
                        x: '0%',
                        scale: 1.1,
                        ease: "expo.inOut"
                    }, 0);
            });
        };

        // Show new slide
        const showNewSlide = () => {
            return new Promise<void>((resolve) => {
                const newWrapper = newSlideEl.querySelector('.slide-wrapper') as HTMLElement;
                const newTitleWrap = newSlideEl.querySelector('.title-wrapper') as HTMLElement;
                const newTitle = newSlideEl.querySelector('.inner-wrapper') as HTMLElement;
                const newImgWrapper = newSlideEl.querySelector('.img-wrapper > div') as HTMLElement;

                if (!newWrapper || !newTitleWrap || !newTitle) {
                    resolve();
                    return;
                }

                // Set transform origin for show (opposite of hide direction)
                if (newImgWrapper) {
                    gsap.set(newImgWrapper, {
                        transformOrigin: direction === 'right' ? '0% 50%' : '100% 50%'
                    });
                }

                const tl = gsap.timeline({
                    onStart: () => {
                        newSlideEl.style.opacity = '1';
                        // Update current slide state when animation starts
                        setCurrentSlide(index);
                    },
                    onComplete: () => {
                        newSlideEl.style.zIndex = '10';
                        resolve();
                    }
                });

                // Animate all elements simultaneously
                tl.fromTo(newWrapper,
                    { x: direction === 'right' ? '100%' : '-100%' },
                    { duration: 1, x: '0%', ease: "expo.inOut" }, 0
                )
                    .fromTo(newTitleWrap,
                        { x: direction === 'right' ? '-100%' : '100%' },
                        { duration: 1, x: '0%', ease: "expo.inOut" }, 0
                    )
                    .fromTo(newTitle,
                        { filter: "blur(30px)", opacity: 0.2 },
                        { duration: 1, filter: "blur(0px)", opacity: 1, ease: "expo.inOut" }, 0
                    );

                if (newImgWrapper) {
                    tl.fromTo(newImgWrapper,
                        { x: direction === 'right' ? '-100%' : '100%', scale: 1.1 },
                        { duration: 1, x: '0%', scale: 1, ease: "expo.inOut" }, 0
                    );
                }
            });
        };

        // Run both animations simultaneously
        try {
            await Promise.all([hideCurrentSlide(), showNewSlide()]);
        } catch (error) {
            console.error('Animation error:', error);
        } finally {
            setIsAnimating(false);
        }
    }, [isAnimating, currentSlide]);

    // Touch/swipe handlers for mobile
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        const touch = e.touches[0];
        touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now()
        };
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        if (!touchStartRef.current || isAnimating) return;

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;
        const deltaTime = Date.now() - touchStartRef.current.time;

        // Check if it's a horizontal swipe (not vertical scroll)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50 && deltaTime < 300) {
            e.preventDefault();

            if (deltaX > 0 && currentSlide > 0) {
                // Swipe right - go to previous slide
                handleUserInteraction();
                navigateToSlide(currentSlide - 1);
            } else if (deltaX < 0 && currentSlide < slides.length - 1) {
                // Swipe left - go to next slide
                handleUserInteraction();
                navigateToSlide(currentSlide + 1);
            }
        }

        touchStartRef.current = null;
    }, [isAnimating, currentSlide, slides.length, navigateToSlide]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (isAnimating) return;

        switch (e.key) {
            case 'ArrowLeft':
                if (currentSlide > 0) {
                    handleUserInteraction();
                    navigateToSlide(currentSlide - 1);
                }
                break;
            case 'ArrowRight':
                if (currentSlide < slides.length - 1) {
                    handleUserInteraction();
                    navigateToSlide(currentSlide + 1);
                }
                break;
        }
    }, [isAnimating, currentSlide, slides.length, navigateToSlide]);

    // Add keyboard event listener
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Initialize slides on mount
    useEffect(() => {
        // Set initial state for all slides
        slidesRef.current.forEach((slide, index) => {
            if (slide) {
                const slideWrapper = slide.querySelector('.slide-wrapper') as HTMLElement;
                const titleWrapper = slide.querySelector('.title-wrapper') as HTMLElement;
                const innerWrapper = slide.querySelector('.inner-wrapper') as HTMLElement;
                const imgWrapper = slide.querySelector('.img-wrapper > div') as HTMLElement;

                if (index === 0) {
                    // First slide should be visible and in default position
                    slide.style.opacity = '1';
                    slide.style.zIndex = '10';

                    // Set initial transforms to default positions
                    if (slideWrapper) gsap.set(slideWrapper, { x: '0%' });
                    if (titleWrapper) gsap.set(titleWrapper, { x: '0%' });
                    if (innerWrapper) gsap.set(innerWrapper, { filter: "blur(0px)", opacity: 1 });
                    if (imgWrapper) gsap.set(imgWrapper, { x: '0%', scale: 1 });
                } else {
                    // All other slides should be hidden and positioned off-screen
                    slide.style.opacity = '0';
                    slide.style.zIndex = '0';

                    // Set initial transforms to prevent flickering on first animation
                    if (slideWrapper) gsap.set(slideWrapper, { x: '100%' });
                    if (titleWrapper) gsap.set(titleWrapper, { x: '-100%' });
                    if (innerWrapper) gsap.set(innerWrapper, { filter: "blur(30px)", opacity: 0.2 });
                    if (imgWrapper) gsap.set(imgWrapper, { x: '-100%', scale: 1.1 });
                }
            }
        });
    }, [slides.length]);

    // Autoplay functionality
    const startAutoplay = useCallback(() => {
        if (!AUTOPLAY_ENABLED || slides.length <= 1) return;

        // Ensure slides are properly initialized
        if (!slidesRef.current[currentSlide]) return;

        if (autoplayTimerRef.current) {
            clearTimeout(autoplayTimerRef.current);
        }

        autoplayTimerRef.current = setTimeout(() => {
            if (!isPaused && !isAnimating) {
                const nextSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;

                // Double-check that the next slide exists before navigating
                if (slidesRef.current[nextSlide]) {
                    navigateToSlide(nextSlide);
                }
            }
        }, AUTOPLAY_DURATION);
    }, [AUTOPLAY_ENABLED, AUTOPLAY_DURATION, slides.length, currentSlide, isPaused, isAnimating, navigateToSlide]);

    const pauseAutoplay = useCallback(() => {
        setIsPaused(true);
        if (autoplayTimerRef.current) {
            clearTimeout(autoplayTimerRef.current);
            autoplayTimerRef.current = null;
        }
    }, []);

    const resumeAutoplay = useCallback(() => {
        setIsPaused(false);
        startAutoplay();
    }, [startAutoplay]);

    // Start autoplay on mount and when slide changes
    useEffect(() => {
        if (AUTOPLAY_ENABLED && !isPaused && !isAnimating && slides.length > 1) {
            // Add a delay for the initial autoplay to ensure component is fully initialized
            const initialDelay = currentSlide === 0 ? 1000 : 0;

            setTimeout(() => {
                startAutoplay();
            }, initialDelay);
        }

        return () => {
            if (autoplayTimerRef.current) {
                clearTimeout(autoplayTimerRef.current);
            }
        };
    }, [currentSlide, startAutoplay, AUTOPLAY_ENABLED, isPaused, isAnimating, slides.length]);

    // Pause autoplay on user interaction, resume after delay
    const handleUserInteraction = useCallback(() => {
        pauseAutoplay();

        // Resume autoplay after 3 seconds of no interaction
        setTimeout(() => {
            resumeAutoplay();
        }, 3000);
    }, [pauseAutoplay, resumeAutoplay]);

    return (
        <section
            className="relative w-full h-[500px] lg:h-screen xl:h-[1000px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="w-full h-full relative">
                {slides.map((slide: any, index: number) => (
                    <div
                        key={index}
                        ref={(el) => {
                            if (el) slidesRef.current[index] = el;
                        }}
                        className={`absolute top-0 left-0 w-full h-full ${index === currentSlide ? 'pointer-events-auto opacity-100 z-10' : 'pointer-events-none opacity-0 z-0'
                            }`}
                    >
                        <div className="slide-wrapper w-full h-full relative overflow-hidden">
                            <div className="img-wrapper brightness-95 z-10 w-full h-full relative overflow-hidden">
                                {isFilled.image(slide.backgroundImage) && (
                                    <div className="absolute inset-0 scale-105">
                                        <PrismicNextImage
                                            field={slide.backgroundImage}
                                            alt=""
                                            fill
                                            priority
                                            className="object-cover mix-blend-luminosity"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-blue-900/30 to-transparent" />
                            </div>

                            <div className="title-wrapper z-50 pointer-events-none absolute top-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent">
                                <div className="inner-wrapper pointer-events-auto backdrop-blur-xl p-10 border-l-4 border-brand absolute bottom-42 left-20 text-white w-auto max-w-[1000px]">
                                    {slide.title && (
                                        <h2 className="slide-title font-playfair text-4xl font-black uppercase tracking-wide mb-4 whitespace-nowrap">
                                            {slide.title}
                                        </h2>
                                    )}
                                    {isFilled.richText(slide.description) && (
                                        <div className="slide-subtitle font-lato text-lg mb-8 leading-relaxed">
                                            <PrismicRichText field={slide.description} />
                                        </div>
                                    )}
                                    {isFilled.link(slide.ctaLink) && slide.ctaText && (
                                        <CTAButton
                                            title={slide.ctaText}
                                            url={slide.ctaLink.url}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation */}
                {slides.length > 1 && (
                    <nav className="pointer-events-none absolute bottom-0 z-20 w-full h-12 flex justify-center items-center gap-4">
                        {slides.map((_: any, index: number) => (
                            <div
                                key={index}
                                className={`pointer-events-auto w-16 h-1 bg-white cursor-pointer rounded-lg ${index === currentSlide ? 'opacity-100' : 'opacity-20 hover:opacity-50'
                                    }`}
                                onClick={() => {
                                    handleUserInteraction();
                                    navigateToSlide(index);
                                }}
                            />
                        ))}
                    </nav>
                )}
            </div>

            <style jsx>{`
         /* Touch optimizations */
         section {
           touch-action: pan-y;
           -webkit-user-select: none;
           -moz-user-select: none;
           -ms-user-select: none;
           user-select: none;
         }
         
         @media (max-width: 768px) {
           .slide-title {
             font-size: 3rem !important;
           }
           .slide-subtitle {
             font-size: 1.25rem !important;
           }
           .inner-wrapper {
             left: 2rem !important;
             bottom: 5rem !important;
             max-width: 90% !important;
           }
         }
         
         @media (max-width: 500px) {
           .inner-wrapper {
             left: 0 !important;
             width: 100% !important;
             max-width: initial !important;
             padding: 0 1rem;
             text-align: center;
           }
           .slide-title {
             font-size: 3rem !important;
           }
           .slide-subtitle {
             display: none !important;
           }
         }
         
         @media (max-width: 450px) {
           .slide-title {
             font-size: 2.5rem !important;
           }
         }
       `}</style>
        </section>
    );
};

export default GsapSlider; 