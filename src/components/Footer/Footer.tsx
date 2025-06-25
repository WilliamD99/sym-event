import React from 'react'
import { PrismicRichText } from '@/components/PrismicRichText'
import { PrismicNextLink } from '@prismicio/next'
import { createClient } from '@/prismicio';
import { PrismicText } from '@prismicio/react';
import Image from 'next/image';
import { PrismicNextImage } from '@prismicio/next';
import { SiFacebook, SiX, SiInstagram, SiYoutube, SiGithub } from '@icons-pack/react-simple-icons'

import SubscibeForm from './SubscibeForm';

const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    const iconProps = { size: 24, className: "text-brand hover:scale-110 transition-all duration-300" };

    switch (platformLower) {
        case 'facebook':
            return <SiFacebook {...iconProps} />;
        case 'twitter':
        case 'x':
            return <SiX {...iconProps} />;
        case 'instagram':
            return <SiInstagram {...iconProps} />;

        case 'youtube':
            return <SiYoutube {...iconProps} />;
        case 'github':
            return <SiGithub {...iconProps} />;

    }
};

export default async function Footer() {
    const client = createClient();
    const footer = await client.getSingle("footer");
    const settings = await client.getSingle("settings");

    // Type assertion for the new backgroundImage field until types are regenerated
    const footerData = footer.data as any;

    return (
        <>
            {/* Subscribe CTA */}
            <div className={`hidden md:block relative container mx-auto px-6 md:px-0 my-5 md:my-10 rounded-3xl overflow-hidden text-white h-[400px] ${!footerData.backgroundImage?.url ? 'bg-brand' : 'bg-gray-900'}`}>
                {footerData.backgroundImage?.url && (
                    <PrismicNextImage
                        field={footerData.backgroundImage}
                        fill
                        className="object-cover z-0 brightness-60"
                        alt=""
                        priority
                    />
                )}
                <div className='container shadow-lg mx-auto px-6 md:px-0 relative z-20 flex items-center h-full'>
                    <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full px-20'>
                        {/* Title and Description Section */}
                        <div className='flex-1 text-center lg:text-left'>
                            <h2 className='text-3xl md:text-4xl xl:text-5xl font-bold mb-4 text-white font-playfair tracking-wide'>Stay in the Game</h2>
                            <p className='text-white/80 text-sm font-lato tracking-wide italic'>Join thousands of sports enthusiasts</p>
                        </div>

                        {/* Subscribe Form Section */}
                        <div className='flex-1 flex justify-center items-start'>

                            <div className='flex flex-col gap-4'>
                                <p className='text-lg md:text-xl text-white/90 leading-relaxed font-lato tracking-wide'>
                                    Subscribe to our newsletter and never miss out on upcoming events, exclusive updates, and behind-the-scenes content from your favorite sports experiences.
                                </p>
                                <SubscibeForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="border-t border-gray-200">
                <div className="container mx-auto px-6 md:px-0">
                    {/* Main Footer Content */}
                    <div className="lg:max-w-6xl xl:max-w-10xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 py-6 lg:py-12 xl:py-16">
                        {/* Company Info Column */}
                        <div className="col-span-2 lg:col-span-2 md:pr-20">
                            <div className="flex items-center mb-8">
                                <div className='relative w-36 h-16'>
                                    <Image
                                        src="/logo.png"
                                        alt="Logo"
                                        fill
                                        className="mr-3 "
                                    />
                                </div>
                            </div>
                            <div className="text-gray-600 mb-4 leading-relaxed font-lato tracking-wide">
                                <PrismicRichText field={footer.data.description} />
                            </div>
                            <div className="text-gray-600 text-sm font-lato tracking-wide">
                                <PrismicRichText field={footer.data.address} />
                            </div>
                        </div>

                        {/* About Us Column */}
                        <div className='col-span-1'>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">About us</h3>
                            <ul className="space-y-2">
                                {footer.data.aboutUsLinks.map((link, index) => (
                                    <li key={index}>
                                        <PrismicNextLink
                                            field={link.linkUrl}
                                            className="text-gray-600 font-lato tracking-wide font-medium hover:text-brand transition-colors duration-200"
                                        >
                                            {link.linkText}
                                        </PrismicNextLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Get in Touch Column */}
                        <div className='col-span-1'>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Get in touch</h3>
                            <ul className="space-y-2">
                                {footer.data.getInTouchLinks.map((link, index) => (
                                    <li key={index}>
                                        <PrismicNextLink
                                            field={link.linkUrl}
                                            className="text-gray-600 font-lato tracking-wide font-medium hover:text-brand transition-colors duration-200"
                                        >
                                            {link.linkText}
                                        </PrismicNextLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Links Column */}
                        <div className='col-span-1'>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow us</h3>
                            <div className="flex flex-col justify-end items-start md:items-start space-y-3">
                                {footer.data.socialLinks.map((link, index) => (
                                    <PrismicNextLink
                                        key={index}
                                        field={link.linkUrl}
                                        className="flex items-center space-x-3 group"
                                    >
                                        {getSocialIcon(link.platform || '')}
                                    </PrismicNextLink>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                </div>
                <div className='bg-gray-50'>
                    <div className='container mx-auto'>
                        <div className='py-4'>
                            <div className="lg:max-w-6xl xl:max-w-10xl mx-auto">
                                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                                    <p className='font-lato tracking-wide'>All rights reserved © <PrismicText field={settings.data.siteTitle} /> {new Date().getFullYear()}</p>
                                    <p className="mt-2 md:mt-0">Built and Developed by <a href="https://github.com/WilliamD99" target="_blank" rel="noopener noreferrer" className="text-brand font-playfair tracking-wide font-semibold">Will Doan</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
