'use client'

import { FC } from "react";
import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicRichText } from "@/components/PrismicRichText";

type AboutSectionProps = SliceComponentProps<any>;

gsap.registerPlugin(ScrollTrigger);

const AboutSection: FC<AboutSectionProps> = ({ slice }) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subtitleRef = useRef<HTMLHeadingElement | null>(null);
    const descRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !sectionRef.current) return;

        // Small delay to ensure DOM is fully ready after navigation
        const timer = setTimeout(() => {
            // Refresh ScrollTrigger to recalculate positions
            ScrollTrigger.refresh();

            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        refreshPriority: -1, // Lower priority to ensure it refreshes after layout
                    },
                });

                tl.from(titleRef.current, {
                    y: 60,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.out",
                })
                    .from(
                        subtitleRef.current,
                        {
                            y: 60,
                            opacity: 0,
                            duration: 0.6,
                            ease: "power3.out",
                        },
                        "-=0.4"
                    )
                    .from(
                        descRef.current,
                        {
                            y: 60,
                            opacity: 0,
                            duration: 0.6,
                            ease: "power3.out",
                        },
                        "-=0.4"
                    )
                    .from(".feature-box",
                        {
                            y: 60,
                            opacity: 0,
                            duration: 0.6,
                            ease: "power3.out",
                            stagger: 0.15,
                        },
                        "-=0.4"
                    )
                    .from(
                        ".cta-button",
                        {
                            y: 60,
                            opacity: 0,
                            duration: 0.6,
                            ease: "power3.out",
                        },
                        "-=0.4"
                    );
            }, sectionRef);

            return () => {
                ctx.revert();
                clearTimeout(timer);
            };
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={sectionRef} className="relative text-white">
            <div className="bg-brand/95 h-full md:rounded-tr-[150px] md:rounded-br-full xl:w-[1500px] absolute inset-0 top-0 left-0 -z-50"></div>
            <div className="container mx-auto px-6 py-16 lg:py-44">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-start">
                    {/* Left side - Main content */}
                    <div className="space-y-6">
                        {isFilled.keyText(slice.primary.title) && (
                            <h2 ref={titleRef} className="text-2xl tracking-wide md:text-4xl lg:text-5xl font-bold font-playfair leading-tight" style={{ color: "#4A3F35" }}>
                                {slice.primary.title}
                            </h2>
                        )}

                        {isFilled.keyText(slice.primary.subtitle) && (
                            <h3 ref={subtitleRef} className="text-lg tracking-wider text-white md:text-2xl font-semibold font-playfair opacity-90">
                                {slice.primary.subtitle}
                            </h3>
                        )}

                        {isFilled.richText(slice.primary.description) && (
                            <div ref={descRef} className="text-sm md:text-lg font-lato opacity-80 leading-relaxed text-white">
                                <PrismicRichText field={slice.primary.description} />
                            </div>
                        )}
                        <Link href="/events" className="inline-block cta-button">
                            <Button style={{ backgroundColor: "#4A3F35" }} className="bg-transparent tracking-wide transition-all duration-300 px-8 py-6 font-playfair font-bold border-[1px] cursor-pointer border-gray-800 text-white hover:bg-white hover:opacity-85 xl:text-lg">Our Events</Button>
                        </Link>
                    </div>

                    {/* Right side - Feature boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {slice.primary.features?.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="feature-box bg-white text-gray-800 rounded-xl border-[1px] border-gray-200 p-6 shadow-xl "
                            >
                                {/* Icon */}
                                {isFilled.image(item.featureIcon) && (
                                    <div className="mb-4">
                                        <PrismicNextImage
                                            field={item.featureIcon}
                                            className="w-12 h-12 object-contain"
                                            alt=""
                                        />
                                    </div>
                                )}

                                {/* Title */}
                                {isFilled.keyText(item.featureTitle) && (
                                    <h4 className="text-lg lg:text-xl font-semibold mb-3 text-brand font-playfair tracking-wide">
                                        {item.featureTitle}
                                    </h4>
                                )}

                                {/* Description */}
                                {isFilled.richText(item.featureDescription) && (
                                    <div className="text-sm lg:text-base text-gray-600 leading-relaxed font-lato">
                                        <PrismicRichText field={item.featureDescription} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection; 