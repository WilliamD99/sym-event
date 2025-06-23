import React from 'react'
import { FC } from "react";
import { type Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import { PrismicRichText } from "@/components/PrismicRichText";

type SponsorItemProps = {
    sponsor: Content.SponsorDocument;
};

const SponsorItem: FC<SponsorItemProps> = ({ sponsor }) => {
    // Safety check for sponsor data
    if (!sponsor) {
        return (
            <div className="w-full bg-white rounded-lg shadow-md overflow-hidden p-6">
                <p className="text-gray-500">No sponsor data</p>
            </div>
        );
    }

    // Handle case where content relationship isn't fully resolved
    if (!sponsor.data && sponsor.id) {
        return (
            <div className="w-full bg-white rounded-lg shadow-md overflow-hidden p-6">
                <p className="text-gray-500">Sponsor: {sponsor.id}</p>
                <p className="text-sm text-gray-400">Content relationship not resolved</p>
            </div>
        );
    }

    if (!sponsor.data) {
        return (
            <div className="w-full bg-white rounded-lg shadow-md overflow-hidden p-6">
                <p className="text-gray-500">Loading sponsor data...</p>
            </div>
        );
    }

    const { data } = sponsor;

    return (
        <div className="w-full h-full flex flex-col justify-between bg-white rounded-lg shadow-xs overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            {data.logo && isFilled.image(data.logo) && (
                <div className="h-48 flex items-center justify-center relative">
                    <PrismicNextImage
                        field={data.logo}
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="max-h-full h-48 max-w-full object-cover"
                        alt=""
                    />
                </div>
            )}
            <div className="px-4 md:px-6 py-4 md:py-8">
                {data.title && (
                    <h3 className="text-xl font-semibold font-playfair tracking-wide text-gray-900 mb-3">
                        {data.title}
                    </h3>
                )}
                {data.description && isFilled.richText(data.description) && (
                    <div className="text-gray-600 mb-4 line-clamp-3 font-lato tracking-wide text-sm md:text-base">
                        <PrismicRichText field={data.description} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SponsorItem;