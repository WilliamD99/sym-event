import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";

type Params = { uid: string };

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { uid } = await params;
    const client = createClient();

    try {
        const event = await client.getByUID("event", uid);

        return {
            title: event.data.meta_title || event.data.title || "Event",
            description: event.data.meta_description || undefined,
            openGraph: {
                title: event.data.meta_title || event.data.title || "Event",
                description: event.data.meta_description || undefined,
                images: event.data.meta_image.url ? [{ url: event.data.meta_image.url }] : undefined,
            },
        };
    } catch (error) {
        return {
            title: "Event Not Found",
        };
    }
}

export default async function EventPage({ params }: { params: Promise<Params> }) {
    const { uid } = await params;
    const client = createClient();

    try {
        const event = await client.getByUID("event", uid);

        return (
            <div className="container mx-auto px-4 py-8">
                {/* Event Header */}
                <div className="mb-8">
                    {event.data.cover_image.url && (
                        <div className="mb-6">
                            <PrismicNextImage
                                field={event.data.cover_image}
                                className="w-full h-64 md:h-96 object-cover rounded-lg"
                            />
                        </div>
                    )}

                    <h1 className="text-4xl font-bold mb-4">
                        {event.data.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                        {event.data.date && (
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Date:</span>
                                <time dateTime={event.data.date}>
                                    {new Date(event.data.date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit'
                                    })}
                                </time>
                            </div>
                        )}

                        {event.data.location && (
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Location:</span>
                                <span>{event.data.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Event Description */}
                {event.data.description && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                        <div className="prose max-w-none">
                            <PrismicRichText field={event.data.description} />
                        </div>
                    </div>
                )}

                {/* Sponsors */}
                {event.data.sponsors && event.data.sponsors.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Sponsors</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {event.data.sponsors.map((item, index) => (
                                <div key={index} className="text-center">
                                    {/* You can expand this to show sponsor details */}
                                    <div className="bg-gray-100 p-4 rounded-lg">
                                        Sponsor {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tags */}
                {event.data.tags && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {event.data.tags.split(',').map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                >
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Error fetching event:', error);
        notFound();
    }
}

export async function generateStaticParams() {
    const client = createClient();

    try {
        const events = await client.getAllByType("event");

        return events.map((event) => ({
            uid: event.uid,
        }));
    } catch (error) {
        console.error('Error generating static params for events:', error);
        return [];
    }
}
