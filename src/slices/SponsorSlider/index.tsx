"use client";

import { FC, useState, useEffect, useRef } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicText, type SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PrismicRichText } from "@/components/PrismicRichText";
import { createClient } from "@/prismicio";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import SponsorItem from "./CarouselItem";


type SponsorSliderProps = SliceComponentProps<any>;

const SponsorSlider: FC<SponsorSliderProps> = ({ slice }) => {
    const [api, setApi] = useState<CarouselApi>();
    const [sponsors, setSponsors] = useState<Content.SponsorDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const headerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLParagraphElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Process sponsor documents
    useEffect(() => {
        const processSponsors = async () => {
            try {
                if (!slice.items || slice.items.length === 0) {
                    setSponsors([]);
                    setIsLoading(false);
                    return;
                }

                // Get sponsor items with valid content relationships
                const sponsorItems = slice.items.filter((item: any) => {
                    return item.sponsor && isFilled.contentRelationship(item.sponsor);
                });

                // Check if sponsors already have data resolved
                const resolvedSponsors = sponsorItems
                    .map((item: any) => item.sponsor)
                    .filter((sponsor: any) => sponsor && sponsor.data);

                if (resolvedSponsors.length === sponsorItems.length) {
                    // All sponsors already resolved
                    setSponsors(resolvedSponsors as Content.SponsorDocument[]);
                    setIsLoading(false);
                    return;
                }

                // Need to fetch sponsor data client-side
                const client = createClient();

                const fetchedSponsors = await Promise.all(
                    sponsorItems.map(async (item: any) => {
                        try {
                            if (item.sponsor.data) {
                                return item.sponsor;
                            }

                            const sponsor = await client.getByID(item.sponsor.id);
                            return sponsor;
                        } catch (error) {
                            console.error('Error fetching sponsor:', item.sponsor.id, error);
                            return null;
                        }
                    })
                );

                const validFetchedSponsors = fetchedSponsors.filter(Boolean) as Content.SponsorDocument[];
                setSponsors(validFetchedSponsors);
            } catch (error) {
                console.error('Error processing sponsors:', error);
            } finally {
                setIsLoading(false);
            }
        };

        processSponsors();
    }, [slice.items]);



    // Auto-play functionality with infinite loop
    useEffect(() => {
        if (!api || sponsors.length <= 1) return;

        const interval = setInterval(() => {
            if (api.canScrollNext()) {
                api.scrollNext();
            } else {
                // At the end, scroll to the beginning for infinite loop
                api.scrollTo(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [api, sponsors.length]);

    // GSAP ScrollTrigger stagger animation
    useEffect(() => {
        // Don't run animation until loading is complete
        if (isLoading) return;

        const ctx = gsap.context(() => {
            const elements = [titleRef.current, descriptionRef.current, buttonRef.current, carouselRef.current].filter(Boolean);

            if (elements.length > 0) {
                gsap.from(elements, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                    },
                });
            }
        }, headerRef);

        return () => ctx.revert();
    }, [isLoading]); // Add isLoading as dependency

    if (isLoading) {
        return (
            <div className="bg-gray-50 container mx-auto px-6 md:px-0">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading sponsors...</p>
                </div>
            </div>
        );
    }

    if (sponsors.length === 0) {
        return (
            <div className="bg-gray-50 container mx-auto px-6 md:px-0">
                <div className="text-center py-12">
                    <p className="text-gray-600">No sponsors available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-6 md:px-0 py-10 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 xl:gap-20">
                    {/* Header Section */}
                    <div ref={headerRef} className="max-w-3xl mx-auto col-span-2">
                        {isFilled.richText(slice.primary.title) && (
                            <p ref={titleRef} className="mb-4 text-brand font-bold font-playfair tracking-wide text-2xl md:text-4xl lg:text-5xl">
                                <PrismicText field={slice.primary.title} />
                            </p>
                        )}
                        {isFilled.richText(slice.primary.description) && (
                            <div ref={descriptionRef} className="text-base md:text-lg text-gray-900 font-lato tracking-wide mt-4 md:mt-8">
                                <PrismicRichText field={slice.primary.description} />
                            </div>
                        )}
                        {/* CTA Button */}
                        {isFilled.link(slice.primary.buttonLink) && (
                            <div ref={buttonRef} className="pt-6">
                                <PrismicNextLink
                                    field={slice.primary.buttonLink}
                                    className="inline-block text-base px-6 py-2 md:px-8 md:py-4 bg-brand text-white font-semibold rounded-md md:rounded-lg hover:bg-brand/80 transition-colors duration-300"
                                >
                                    {slice.primary.buttonText || "View All Sponsors"}
                                </PrismicNextLink>
                            </div>
                        )}
                    </div>

                    {/* Carousel */}
                    <div ref={carouselRef} className="relative col-span-3 md:px-6">
                        <Carousel
                            setApi={setApi}
                            className="w-full"
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                        >
                            <CarouselContent>
                                {sponsors.map((sponsor, index) => (
                                    <CarouselItem key={`sponsor-${sponsor.id}-${index}`} className="basis-3/4 md:basis-1/2 lg:basis-2/5">
                                        <div className="p-1 h-full w-full">
                                            <SponsorItem sponsor={sponsor} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 hidden md:flex justify-between">
                                <CarouselPrevious className="hidden md:flex h-10 w-16 border-2 border-brand text-brand cursor-pointer hover:bg-brand hover:text-white transition-all duration-300" />
                                <div className="h-[1px] w-42 xl:w-72 bg-brand mx-8"></div>
                                <CarouselNext className="hidden md:flex h-10 w-16 border-2 border-brand text-brand cursor-pointer hover:bg-brand hover:text-white transition-all duration-300" />
                            </div>
                        </Carousel>

                    </div>


                </div>
            </div>
        </div>
    );
};

export default SponsorSlider; 