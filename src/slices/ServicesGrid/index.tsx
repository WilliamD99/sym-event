'use client'

import { ImageField, LinkField, KeyTextField, PrismicDocument } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ServiceItem } from "./ServiceItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type CategoryDocument = PrismicDocument<{
    name: KeyTextField;
}>;

type ServiceItem = {
    card_size: "vertical" | "horizontal" | "square";
    service_description: KeyTextField;
    background_image: ImageField;
    category: LinkField<"category", string, CategoryDocument>;
};

type ServicesGridSlice = {
    variation: "default";
    version: "initial";
    primary: {
        title: KeyTextField;
        description: KeyTextField;
    };
    items: ServiceItem[];
    slice_type: "services_grid";
    slice_label: null;
    id: string;
};

export type ServicesGridProps = SliceComponentProps<ServicesGridSlice>;

const ServicesGrid = ({ slice }: ServicesGridProps) => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".services-header", {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });

            gsap.from(".service-item", {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-10 lg:py-20">
            <div className="relative container mx-auto px-6 md:px-0">
                {/* Header */}
                <div className="services-header text-center mb-10">
                    <p className="mb-4 text-brand font-bold font-playfair tracking-wide text-2xl md:text-4xl lg:text-5xl">
                        {slice.primary.title}
                    </p>
                    <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto font-lato tracking-wide text-center">
                        {slice.primary.description}
                    </p>
                    <Link href="/events" className="mt-4">
                        <Button className="mt-4 bg-brand text-white font-lato tracking-wide text-base md:text-lg px-8 py-6 cursor-pointer hover:bg-brand/80 transition-all duration-300">View All Events</Button>
                    </Link>
                </div>

                {/* Grid */}
                <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[175px] xl:auto-rows-[360px] grid-flow-dense">
                    {slice.items?.map((item, index) => (
                        <ServiceItem
                            key={index}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid; 