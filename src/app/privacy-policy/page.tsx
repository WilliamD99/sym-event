import type { Metadata } from "next";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";

export const metadata: Metadata = {
    title: "Privacy Policy - SYM Events Media",
    description: "Learn how SYM Events Media collects, uses, and protects your personal information when you use our sports event management services.",
};

export default function PrivacyPolicyPage() {
    return (
        <Bounded as="section" yPadding="lg" className="bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <Heading as="h1" size="xl" className="font-playfair text-gray-900 mb-4">
                        Privacy Policy
                    </Heading>
                    <p className="text-lg text-gray-600 font-lato">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="prose max-w-none font-lato leading-relaxed text-gray-700">
                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            1. Introduction
                        </Heading>
                        <p className="mb-4">
                            Welcome to SYM Events Media ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, attend our events, or use our sports event management services.
                        </p>
                        <p>
                            By using our services, you consent to the data practices described in this policy.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            2. Information We Collect
                        </Heading>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Personal Information</h3>
                            <p className="mb-3">We may collect personal information that you provide to us, including:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Name, email address, and phone number</li>
                                <li>Event registration and ticket purchase information</li>
                                <li>Payment and billing information</li>
                                <li>Emergency contact details for event participation</li>
                                <li>Dietary restrictions and accessibility requirements</li>
                                <li>Communication preferences</li>
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Event-Related Information</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Photos and videos taken at events</li>
                                <li>Participation records and performance data</li>
                                <li>Feedback and survey responses</li>
                                <li>Sponsor interaction data</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Technical Information</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>IP address, browser type, and device information</li>
                                <li>Website usage data and analytics</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            3. How We Use Your Information
                        </Heading>
                        <p className="mb-3">We use your information to:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Process event registrations and ticket sales</li>
                            <li>Communicate event details, updates, and changes</li>
                            <li>Provide customer support and respond to inquiries</li>
                            <li>Improve our events and services</li>
                            <li>Send marketing communications (with your consent)</li>
                            <li>Comply with legal obligations and safety requirements</li>
                            <li>Share success stories and event highlights (with appropriate permissions)</li>
                            <li>Connect sponsors with relevant audiences</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            4. Information Sharing and Disclosure
                        </Heading>
                        <p className="mb-4">We may share your information with:</p>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Event Partners and Sponsors</h3>
                            <p>We may share aggregated, non-identifying information with our event sponsors and partners to help them understand audience engagement and event success.</p>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Service Providers</h3>
                            <p>We work with third-party service providers who help us deliver our services, including payment processors, venue partners, catering services, and technology providers.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Legal Requirements</h3>
                            <p>We may disclose your information when required by law, court order, or governmental authority, or to protect the rights, property, or safety of SYM Events Media, our users, or others.</p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            5. Data Security
                        </Heading>
                        <p>
                            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet-based system is completely secure, and we cannot guarantee the absolute security of your information.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            6. Your Rights and Choices
                        </Heading>
                        <p className="mb-3">You have the right to:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Access, update, or delete your personal information</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Request a copy of your data</li>
                            <li>Object to certain uses of your information</li>
                            <li>Withdraw consent where applicable</li>
                        </ul>
                        <p className="mt-4">
                            To exercise these rights, please contact us using the information provided below.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            7. Cookies and Tracking Technologies
                        </Heading>
                        <p>
                            Our website uses cookies and similar technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser preferences, though disabling cookies may affect website functionality.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            8. Third-Party Links
                        </Heading>
                        <p>
                            Our website may contain links to third-party websites, including sponsor websites and social media platforms. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            9. Children's Privacy
                        </Heading>
                        <p>
                            Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            10. Changes to This Privacy Policy
                        </Heading>
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last modified" date. We encourage you to review this policy periodically to stay informed about how we protect your information.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            11. Contact Us
                        </Heading>
                        <p className="mb-4">
                            If you have any questions about this Privacy Policy or our data practices, please contact us:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="font-semibold text-gray-800 mb-2">SYM Events Media</p>
                            <p className="text-gray-600 mb-1">Email: privacy@symeventsmedia.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </Bounded>
    );
} 