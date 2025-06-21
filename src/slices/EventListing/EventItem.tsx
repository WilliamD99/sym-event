import Link from "next/link";
import { PrismicRichText } from "@/components/PrismicRichText";

interface EventItemProps {
    event: any;
    index: number;
}

const EventItem = ({ event, index }: EventItemProps) => {
    const formatDateRange = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleDateString("en-US", { month: "short" });
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    };

    const dateInfo = formatDateRange(event.data.date);
    const isPastEvent = new Date(event.data.date) < new Date();

    return (
        <Link href={`/event/${event.uid}`} key={event.id}>
            <div
                key={event.id}
                className={`${index !== 0 ? "border-t border-gray-200" : ""} rounded-lg hover:bg-white hover:shadow-2xl transition duration-300`}
            >
                <div className="flex items-center p-6 space-x-12">
                    {/* Event Image */}
                    <div className="flex-shrink-0 w-56 h-32">
                        {event.data.cover_image?.url ? (
                            <img
                                src={event.data.cover_image.url}
                                alt={event.data.cover_image.alt || event.data.title}
                                className="w-full h-full object-cover rounded-lg"
                                style={{
                                    clipPath: 'url(#ticket-shape)'
                                }}
                            />
                        ) : (
                            <div
                                className="w-full h-full bg-gray-200 flex items-center justify-center"
                                style={{
                                    clipPath: 'url(#ticket-shape)'
                                }}
                            >
                                <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                        )}
                        <svg width="0" height="0">
                            <defs>
                                <clipPath id="ticket-shape" clipPathUnits="objectBoundingBox">
                                    <path d="M 0,0 L 1,0 L 1,0.4 A 0.05,0.1 0 0,0 1,0.6 L 1,1 L 0,1 L 0,0.6 A 0.05,0.1 0 0,0 0,0.4 Z" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    {/* Event Content */}
                    <div className="flex-grow min-w-0">
                        {/* Category */}
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            {event.data.category?.data?.name || "Uncategorized"}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            <p className="hover:text-red-600 transition-colors">
                                {event.data.title}
                            </p>
                        </h3>

                        {/* Description */}
                        {event.data.description && (
                            <div className="text-gray-600 text-sm mb-3">
                                <PrismicRichText field={event.data.description} />
                            </div>
                        )}

                        {/* Location */}
                        {event.data.location && (
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                <span className="mr-2">🇨🇦</span>
                                {event.data.location}
                            </div>
                        )}

                        {/* Additional Actions */}
                        {isPastEvent && (
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">📺</span>
                                Watch the Replay
                            </div>
                        )}
                    </div>

                    {/* Date */}
                    <div className="flex-shrink-0 text-right">
                        <div className="text-2xl font-bold text-gray-900">
                            {dateInfo}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventItem; 