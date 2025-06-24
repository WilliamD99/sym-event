"use client";

import { FC, useRef, useState, useCallback, useEffect } from "react";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";

import { PrismicRichText } from "@/components/PrismicRichText";
import { Bounded } from "@/components/Bounded";
import AccordionItem from "./AccordionItem";

type StudioAccordionProps = SliceComponentProps<any>;

const StudioAccordion: FC<StudioAccordionProps> = ({ slice }) => {
    // === CONFIGURATION ===
    const INACTIVE_PANEL_WIDTH = 10; // Width percentage for inactive panels
    const MIN_ACTIVE_WIDTH = 40; // Minimum width percentage for active panel
    const EASE = "power1.inOut";
    // ====================

    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const panels = slice.items || [];

    // Calculate widths based on configuration
    const getActiveWidth = () => Math.max(MIN_ACTIVE_WIDTH, 100 - (panels.length - 1) * INACTIVE_PANEL_WIDTH);
    const getInactiveWidth = () => INACTIVE_PANEL_WIDTH;

    // Initialize panels on mount
    useEffect(() => {
        if (!containerRef.current || panels.length === 0) return;

        // Set initial state
        panelsRef.current.forEach((panel, index) => {
            if (!panel) return;

            const content = panel.querySelector('.panel-content');
            const titleElement = panel.querySelector('.panel-title');

            if (index === activeIndex) {
                // Active panel
                gsap.set(panel, {
                    width: `${getActiveWidth()}%`
                });
                if (content) {
                    gsap.set(content, { opacity: 1, y: 0 });
                    // Set initial state for stagger elements in active panel
                    const contentTitle = content.querySelector('p, h3');
                    const contentDescription = content.querySelector('div');
                    if (contentTitle) gsap.set(contentTitle, { opacity: 1, y: 0 });
                    if (contentDescription) gsap.set(contentDescription, { opacity: 1, y: 0 });
                }
                if (titleElement) gsap.set(titleElement, { opacity: 0 }); // Active panel has no vertical title
            } else {
                // Inactive panels
                gsap.set(panel, { width: `${getInactiveWidth()}%` });
                if (content) {
                    gsap.set(content, { opacity: 0, y: 20 });
                    // Set initial state for stagger elements in inactive panels
                    const contentTitle = content.querySelector('p, h3');
                    const contentDescription = content.querySelector('div');
                    if (contentTitle) gsap.set(contentTitle, { opacity: 0, y: 10 });
                    if (contentDescription) gsap.set(contentDescription, { opacity: 0, y: 10 });
                }
            }
        });

        return () => {
            // Cleanup
            if (timelineRef.current) {
                timelineRef.current.kill();
                timelineRef.current = null;
            }
        };
    }, [panels.length, activeIndex]);

    const handlePanelClick = useCallback((index: number) => {
        if (isAnimating || index === activeIndex || !containerRef.current) return;

        setIsAnimating(true);

        // Kill any existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        // Create new timeline
        timelineRef.current = gsap.timeline({
            onComplete: () => {
                setActiveIndex(index);
                setIsAnimating(false);
            }
        });

        const tl = timelineRef.current;

        // Calculate widths
        const activeWidth = getActiveWidth();
        const inactiveWidth = getInactiveWidth();

        panelsRef.current.forEach((panel, i) => {
            if (!panel) return;

            const content = panel.querySelector('.panel-content');
            const titleElement = panel.querySelector('.panel-title');
            const isNewActive = i === index;
            const wasActive = i === activeIndex;

            if (isNewActive) {
                // Panel becoming active
                const backgroundElement = panel.querySelector('.absolute.inset-0');

                tl.to(panel, {
                    width: `${activeWidth}%`,
                    duration: 0.5,
                    ease: EASE
                }, 0);

                // Brighten background as panel expands
                if (backgroundElement) {
                    tl.to(backgroundElement, {
                        filter: "brightness(0.9)",
                        duration: 0.5,
                        ease: EASE
                    }, 0);
                }

                if (titleElement) {
                    tl.to(titleElement, {
                        opacity: 0,
                        duration: 0.2,
                        ease: EASE
                    }, 0); // Fade out vertical title immediately
                }

                if (content) {
                    const contentTitle = content.querySelector('p, h3');
                    const contentDescription = content.querySelector('div');

                    // Fade in container first
                    tl.to(content, {
                        opacity: 1,
                        y: 0,
                        duration: 0.2,
                        ease: EASE
                    }, 0.5); // Start after panel width animation completes

                    // Stagger the content elements
                    if (contentTitle) {
                        tl.fromTo(contentTitle,
                            { opacity: 0, y: 10 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.3,
                                ease: EASE
                            }, 0.5
                        );
                    }

                    if (contentDescription) {
                        tl.fromTo(contentDescription,
                            { opacity: 0, y: 10 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.3,
                                ease: EASE
                            }, 0.6 // 0.15s delay after title
                        );
                    }
                }

            } else {
                // Panel becoming inactive
                const backgroundElement = panel.querySelector('.absolute.inset-0');

                tl.to(panel, {
                    width: `${inactiveWidth}%`,
                    duration: 0.5,
                    ease: EASE
                }, 0);

                // Dim background as panel shrinks
                if (backgroundElement) {
                    tl.to(backgroundElement, {
                        filter: "brightness(0.4)",
                        duration: 0.5,
                        ease: EASE
                    }, 0);
                }

                if (content && wasActive) {
                    tl.to(content, {
                        opacity: 0,
                        y: 20,
                        duration: 0.2,
                        ease: EASE
                    }, 0);
                }

                // Fade in vertical title at the end of animation
                if (titleElement) {
                    tl.to(titleElement, {
                        opacity: 1,
                        duration: 0.25,
                        ease: EASE
                    }, 0); // Start after panel width animation completes
                }

            }
        });
    }, [activeIndex, isAnimating, panels.length]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, []);

    if (!panels.length) return null;

    return (
        <Bounded as="section" className="bg-gray-50">
            <div className="space-y-8">
                {/* Header */}
                <div className="space-y-2">
                    {slice.primary.sectionTitle && (
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                            {slice.primary.sectionTitle}
                        </h2>
                    )}
                    {slice.primary.sectionSubtitle && (
                        <div className="flex items-center gap-2">
                            <span className="text-orange-500 text-2xl">✦</span>
                            <span className="text-lg text-gray-600 italic">
                                {slice.primary.sectionSubtitle}
                            </span>
                        </div>
                    )}
                </div>

                {/* Accordion Panels */}
                <div
                    ref={containerRef}
                    className="flex h-[600px] min-h-[400px] gap-2 rounded-lg overflow-hidden"
                >
                    {panels.map((panel: any, index: number) => (
                        <AccordionItem
                            key={index}
                            panel={panel}
                            index={index}
                            isActive={index === activeIndex}
                            activeWidth={getActiveWidth()}
                            inactiveWidth={getInactiveWidth()}
                            onPanelClick={handlePanelClick}
                            panelRef={(el) => {
                                panelsRef.current[index] = el;
                            }}
                        />
                    ))}
                </div>
            </div>
        </Bounded>
    );
};

export default StudioAccordion; 