import React from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText } from '@/components/PrismicRichText'
import { PrismicNextLink } from '@prismicio/next'
import { createClient } from '@/prismicio';
import { PrismicText } from '@prismicio/react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github, Globe } from 'lucide-react';
import Image from 'next/image';

const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    const iconProps = { size: 20, className: "text-gray-600 hover:text-gray-800 transition-colors duration-200" };

    switch (platformLower) {
        case 'facebook':
            return <Facebook {...iconProps} />;
        case 'twitter':
        case 'x':
            return <Twitter {...iconProps} />;
        case 'instagram':
            return <Instagram {...iconProps} />;
        case 'linkedin':
            return <Linkedin {...iconProps} />;
        case 'youtube':
            return <Youtube {...iconProps} />;
        case 'github':
            return <Github {...iconProps} />;
        default:
            return <Globe {...iconProps} />;
    }
};

export default async function Footer() {
    const client = createClient();
    const footer = await client.getSingle("footer");
    const settings = await client.getSingle("settings");

    return (
        <footer className="border-t border-gray-200">
            <div className="container mx-auto px-6 md:px-0">
                {/* Main Footer Content */}
                <div className="lg:max-w-6xl xl:max-w-10xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 py-6 lg:py-12 xl:py-16">
                    {/* Company Info Column */}
                    <div className="col-span-2 lg:col-span-1">
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
                        <div className="text-gray-600 mb-4 leading-relaxed">
                            <PrismicRichText field={footer.data.description} />
                        </div>
                        <div className="text-gray-600 text-sm">
                            <PrismicRichText field={footer.data.address} />
                        </div>
                    </div>

                    {/* About Us Column */}
                    <div className='md:text-right'>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">About us</h3>
                        <ul className="space-y-2">
                            {footer.data.aboutUsLinks.map((link, index) => (
                                <li key={index}>
                                    <PrismicNextLink
                                        field={link.linkUrl}
                                        className="text-gray-600 hover:text-brand transition-colors duration-200"
                                    >
                                        {link.linkText}
                                    </PrismicNextLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get in Touch Column */}
                    <div className='md:text-right'>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Get in touch</h3>
                        <ul className="space-y-2">
                            {footer.data.getInTouchLinks.map((link, index) => (
                                <li key={index}>
                                    <PrismicNextLink
                                        field={link.linkUrl}
                                        className="text-gray-600 hover:text-brand transition-colors duration-200"
                                    >
                                        {link.linkText}
                                    </PrismicNextLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links Column */}
                    <div className='md:text-right'>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow us</h3>
                        <div className="flex flex-col justify-end items-start md:items-end space-y-3">
                            {footer.data.socialLinks.map((link, index) => (
                                <PrismicNextLink
                                    key={index}
                                    field={link.linkUrl}
                                    className="flex items-center space-x-3 group bg-brand p-2 rounded-full"
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
                    <div className='border-t border-gray-200 py-4'>
                        <div className="lg:max-w-6xl xl:max-w-10xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                                <p>© <PrismicText field={settings.data.siteTitle} /> {new Date().getFullYear()}</p>
                                <p className="mt-2 md:mt-0">Built and Developed by <a href="https://github.com/WilliamD99" target="_blank" rel="noopener noreferrer" className="text-brand">Will Doan</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
