'use client'

import { ImageField, LinkField, KeyTextField, PrismicDocument, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

type CategoryDocument = PrismicDocument<{
    name: KeyTextField;
}>;

type ServiceItemData = {
    card_size: "vertical" | "horizontal" | "square";
    service_description: KeyTextField;
    background_image: ImageField;
    category: LinkField<"category", string, CategoryDocument>;
};

interface ServiceItemProps {
    item: ServiceItemData;
    index: number;
}

// Function to get card dimensions based on selected size
const getCardLayout = (item: ServiceItemData) => {
    const cardSize = item.card_size || 'square';

    switch (cardSize) {
        case 'vertical':
            return {
                className: 'lg:col-span-1 lg:row-span-2',
                containerClass: 'aspect-[3/4]' // Tall aspect ratio
            };
        case 'horizontal':
            return {
                className: 'lg:col-span-2 lg:row-span-1',
                containerClass: 'aspect-[16/9]' // Wide aspect ratio for better horizontal display
            };
        case 'square':
        default:
            return {
                className: 'lg:col-span-1 lg:row-span-1',
                containerClass: 'aspect-[4/3]' // Slightly rectangular for better content display
            };
    }
};

export const ServiceItem = ({ item, index }: ServiceItemProps) => {
    if (!item) return null;

    const layout = getCardLayout(item);

    return (
        <div
            className={`service-item group ${layout.className}`}
        >
            <div className={`relative overflow-hidden rounded-3xl bg-gray-800 shadow-lg transition-transform duration-300 hover:-translate-y-2 w-full h-full`}>
                {/* Background Image */}
                {item.background_image && (
                    <div className="relative w-full h-full">
                        <PrismicNextImage
                            field={item.background_image}
                            fill
                            className="object-cover transition-all duration-300 group-hover:scale-105 brightness-80 group-hover:brightness-100"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
                    </div>
                )}

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    {/* Title */}
                    <div>
                        {isFilled.link(item.category) && (item.category as any).data ? (
                            <h3 className="text-xl lg:text-2xl font-bold leading-tight font-playfair tracking-wide">
                                {(item.category as any).data.name || `Event ${index + 1}`}
                            </h3>
                        ) : (
                            <h3 className="text-xl lg:text-2xl font-bold leading-tight font-playfair tracking-wide">
                                Event {index + 1}
                            </h3>
                        )}
                    </div>

                    {/* Description - Collapses to zero height when hidden, expands when shown */}
                    {item.service_description && (
                        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-3">
                            <p className="text-gray-300 text-sm lg:text-base line-clamp-3 font-lato tracking-wide">
                                {item.service_description}
                            </p>
                        </div>
                    )}

                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                </div>
            </div>
        </div>
    );
}; 