import type { Metadata } from "next";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";

export const metadata: Metadata = {
    title: "Terms & Conditions - SYM Events Media",
    description: "Read the terms and conditions for using SYM Events Media's sports event management services and attending our events.",
};

export default function TermsConditionsPage() {
    return (
        <Bounded as="section" yPadding="lg" className="bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <Heading as="h1" size="xl" className="font-playfair text-gray-900 mb-4">
                        Terms & Conditions
                    </Heading>
                    <p className="text-lg text-gray-600 font-lato">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="prose max-w-none font-lato leading-relaxed text-gray-700">
                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            1. Agreement to Terms
                        </Heading>
                        <p className="mb-4">
                            Welcome to SYM Events Media. By accessing our website, registering for our events, or using our services, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you may not use our services.
                        </p>
                        <p>
                            These Terms apply to all users of our website, event participants, sponsors, and anyone who engages with our sports event management services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            2. About SYM Events Media
                        </Heading>
                        <p>
                            SYM Events Media is a sports event management company specializing in organizing charity events, sports tournaments, and corporate sporting events. We work with various sponsors, venues, and participants to create impactful experiences that unite communities and support meaningful causes.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            3. Event Registration and Participation
                        </Heading>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Registration Requirements</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>You must provide accurate and complete information when registering</li>
                                <li>You are responsible for maintaining the confidentiality of your account</li>
                                <li>You must meet any age, health, or skill requirements for specific events</li>
                                <li>Registration confirmation does not guarantee event participation if capacity limits are reached</li>
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Participant Responsibilities</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Follow all event rules, safety guidelines, and venue policies</li>
                                <li>Behave respectfully toward other participants, staff, and sponsors</li>
                                <li>Arrive punctually and prepared for events</li>
                                <li>Notify us of any medical conditions or accessibility needs</li>
                                <li>Comply with applicable laws and regulations</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            4. Payment and Refund Policy
                        </Heading>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Payment Terms</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>All fees must be paid in full at the time of registration unless otherwise specified</li>
                                <li>Prices are subject to change without notice</li>
                                <li>Additional fees may apply for premium services or late registrations</li>
                                <li>All payments are processed securely through our payment partners</li>
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Refund Policy</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Refunds are available up to 30 days before the event date</li>
                                <li>Refunds requested within 30 days of the event are subject to a 25% processing fee</li>
                                <li>No refunds are available within 7 days of the event</li>
                                <li>Event cancellations by SYM Events Media will result in full refunds</li>
                                <li>Medical emergencies may be considered for refund exceptions on a case-by-case basis</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            5. Event Changes and Cancellations
                        </Heading>
                        <p className="mb-4">
                            SYM Events Media reserves the right to modify, postpone, or cancel events due to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>Weather conditions or natural disasters</li>
                            <li>Venue unavailability or safety concerns</li>
                            <li>Insufficient registrations</li>
                            <li>Government regulations or public health concerns</li>
                            <li>Force majeure events beyond our control</li>
                        </ul>
                        <p>
                            In case of event changes, we will notify participants as soon as possible through the contact information provided during registration.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            6. Safety and Liability
                        </Heading>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Assumption of Risk</h3>
                            <p className="mb-3">
                                Participation in sports events involves inherent risks. By participating, you acknowledge and assume all risks associated with the activity, including but not limited to:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Physical injury or property damage</li>
                                <li>Weather-related hazards</li>
                                <li>Equipment failure or malfunction</li>
                                <li>Actions of other participants</li>
                            </ul>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">Limitation of Liability</h3>
                            <p>
                                To the maximum extent permitted by law, SYM Events Media, its directors, employees, sponsors, and partners shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your participation in our events or use of our services.
                            </p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            7. Media Rights and Photography
                        </Heading>
                        <p className="mb-4">
                            By participating in our events, you grant SYM Events Media the right to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Take photographs and videos during events</li>
                            <li>Use your likeness for promotional purposes</li>
                            <li>Share event highlights on our website and social media</li>
                            <li>Provide media content to sponsors and partners</li>
                        </ul>
                        <p className="mt-4">
                            If you do not wish to be photographed or filmed, please notify our staff at the event.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            8. Intellectual Property
                        </Heading>
                        <p>
                            All content on our website, including text, graphics, logos, images, and software, is the property of SYM Events Media or our licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            9. Code of Conduct
                        </Heading>
                        <p className="mb-4">
                            All participants, sponsors, and attendees are expected to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Treat others with respect and courtesy</li>
                            <li>Refrain from discriminatory, harassing, or inappropriate behavior</li>
                            <li>Follow all venue rules and regulations</li>
                            <li>Not engage in illegal activities or substance abuse</li>
                            <li>Respect the charitable nature and purpose of our events</li>
                        </ul>
                        <p className="mt-4">
                            Violation of this code of conduct may result in removal from the event without refund.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            10. Sponsor Relationships
                        </Heading>
                        <p>
                            Our events are made possible through partnerships with various sponsors. While we carefully select our sponsors, we are not responsible for sponsor products, services, or promotional offers. Any transactions or interactions with sponsors are solely between you and the sponsor.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            11. Privacy and Data Protection
                        </Heading>
                        <p>
                            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our services, you consent to our data practices as described in the Privacy Policy.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            12. Communications
                        </Heading>
                        <p>
                            By registering for our events or services, you consent to receive communications from SYM Events Media, including event updates, safety information, and promotional materials. You may opt-out of marketing communications at any time, but operational communications related to your event participation will continue.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            13. Modifications to Terms
                        </Heading>
                        <p>
                            We reserve the right to modify these Terms at any time. Changes will be posted on our website with an updated date. Your continued use of our services after changes are posted constitutes acceptance of the new Terms.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            14. Governing Law
                        </Heading>
                        <p>
                            These Terms are governed by and construed in accordance with applicable local laws. Any disputes arising from these Terms or your use of our services will be resolved through appropriate legal channels in our jurisdiction.
                        </p>
                    </section>

                    <section className="mb-10">
                        <Heading as="h2" size="md" className="font-playfair text-gray-900 mb-4">
                            15. Contact Information
                        </Heading>
                        <p className="mb-4">
                            If you have any questions about these Terms and Conditions, please contact us:
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <p className="font-semibold text-gray-800 mb-2">SYM Events Media</p>
                            <p className="text-gray-600 mb-1">Email: info@symeventsmedia.com</p>
                            <p className="text-gray-600 mb-1">Phone: [Your phone number]</p>
                            <p className="text-gray-600">Address: [Your business address]</p>
                        </div>
                    </section>

                    <div className="bg-brand/10 p-6 rounded-lg mt-12">
                        <p className="text-sm text-gray-600 text-center">
                            By participating in SYM Events Media events or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                        </p>
                    </div>
                </div>
            </div>
        </Bounded>
    );
} 