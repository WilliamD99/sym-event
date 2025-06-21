"use client";

import { createClient } from "@/prismicio";
import { PrismicRichText } from "@/components/PrismicRichText";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDownIcon } from "lucide-react";
import EventItem from "./EventItem";

/**
 * Props for `EventListing`.
 */
export type EventListingProps = {
    slice: {
        slice_type: string;
        variation: string;
        primary: {
            title?: any;
        };
    };
};

/**
 * Component for "EventListing" Slices.
 */
const EventListing = ({ slice }: EventListingProps) => {
    const [events, setEvents] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialize filters from URL params
    useEffect(() => {
        const categoryParam = searchParams.get("categories");
        const statusParam = searchParams.get("status") || "all";
        if (categoryParam) {
            setSelectedCategories(categoryParam.split(","));
        } else {
            setSelectedCategories([]);
        }
        setSelectedStatus(statusParam);
    }, [searchParams]);

    // Fetch events and categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const client = createClient();

                // Fetch all events with linked category data
                const eventsResponse = await client.getAllByType("event", {
                    fetchLinks: ["category.name", "category.uid", "sponsor.title", "sponsor.logo"],
                    orderings: [
                        { field: "my.event.date", direction: "desc" }
                    ]
                });

                // Fetch all categories
                const categoriesResponse = await client.getAllByType("category");

                setEvents(eventsResponse);
                setCategories(categoriesResponse);
                setError(null);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load events. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Filter events based on selected filters
    const filteredEvents = events.filter((event) => {
        const now = new Date();
        const eventDate = new Date(event.data.date);

        // Category filter
        if (selectedCategories.length > 0) {
            const eventCategoryUid = event.data.category?.uid;
            if (!eventCategoryUid || !selectedCategories.includes(eventCategoryUid)) {
                return false;
            }
        }

        // Status filter
        if (selectedStatus === "upcoming") {
            return eventDate > now;
        } else if (selectedStatus === "past") {
            return eventDate < now;
        }
        // "all" and "live" show all events for now

        return true;
    });

    // Update URL when filters change
    const updateFilters = (categories: string[], status: string) => {
        const params = new URLSearchParams();
        if (categories.length > 0) params.set("categories", categories.join(","));
        if (status !== "all") params.set("status", status);

        const queryString = params.toString();
        const newUrl = queryString ? `?${queryString}` : window.location.pathname;
        router.push(newUrl, { scroll: false });
    };

    const handleCategoryChange = (categoryUid: string, checked: boolean) => {
        let updatedCategories: string[];
        if (checked) {
            updatedCategories = [...selectedCategories, categoryUid];
        } else {
            updatedCategories = selectedCategories.filter(uid => uid !== categoryUid);
        }
        setSelectedCategories(updatedCategories);
        updateFilters(updatedCategories, selectedStatus);
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        updateFilters(selectedCategories, status);
    };



    if (loading) {
        return <LoadingState />;
    }

    const handleRetry = () => {
        setError(null);
        setLoading(true);
        // Retry fetching data
        const fetchData = async () => {
            try {
                const client = createClient();
                const eventsResponse = await client.getAllByType("event", {
                    fetchLinks: ["category.name", "category.uid", "sponsor.title", "sponsor.logo"],
                    orderings: [{ field: "my.event.date", direction: "desc" }]
                });
                const categoriesResponse = await client.getAllByType("category");
                setEvents(eventsResponse);
                setCategories(categoriesResponse);
                setError(null);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load events. Please try again later.");
                setLoading(false);
            }
        };
        fetchData();
    };

    if (error) {
        return <ErrorState error={error} onRetry={handleRetry} />;
    }

    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="py-12 bg-gray-50"
        >
            <div className="container mx-auto px-4">
                {/* Title */}
                {slice.primary.title && (
                    <div className="mb-8">
                        <PrismicRichText field={slice.primary.title} />
                    </div>
                )}

                {/* Filters */}
                <div className="mb-5 flex flex-row items-center justify-between">
                    <div className="flex flex-wrap items-center gap-4 ">
                        <span className="text-xs font-medium text-gray-600">FILTER BY</span>

                        {/* Category Filter */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center justify-between w-[180px] px-3 py-2 bg-white border border-input rounded-full text-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-0"
                            >
                                <span className="text-muted-foreground">
                                    {selectedCategories.length === 0
                                        ? "All disciplines"
                                        : selectedCategories.length === 1
                                            ? categories.find(cat => cat.uid === selectedCategories[0])?.data.name || "All disciplines"
                                            : `${selectedCategories.length} selected`
                                    }
                                </span>
                                <ChevronDownIcon className="h-4 w-4 opacity-50" />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute top-full mt-1 w-[250px] bg-white border-1 border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto focus-visible:outline-none outline-none">
                                    <div className="py-4">
                                        {categories.map((category) => (
                                            <div key={category.id} className="flex px-5 py-4 items-center space-x-2 hover:bg-gray-100">
                                                <Checkbox
                                                    id={category.uid}
                                                    checked={selectedCategories.includes(category.uid)}
                                                    onCheckedChange={(checked) => {
                                                        handleCategoryChange(category.uid, checked as boolean);
                                                    }}
                                                    className="cursor-pointer"
                                                />
                                                <label
                                                    htmlFor={category.uid}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                >
                                                    {category.data.name}
                                                </label>
                                            </div>
                                        ))}

                                        {selectedCategories.length > 0 && (
                                            <div className=" border-t border-border px-4 py-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedCategories([]);
                                                        updateFilters([], selectedStatus);
                                                    }}
                                                    className="text-xs text-muted-foreground hover:text-foreground bg-gray-100 cursor-pointer hover:bg-gray-300 rounded-md px-4 py-2"
                                                >
                                                    Clear all
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status Filter Tabs */}
                    <div className="flex gap-1 bg-white rounded-lg">
                        {[
                            { key: "all", label: "All" },
                            { key: "upcoming", label: "Upcoming" },
                            { key: "past", label: "Past" },
                        ].map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => handleStatusChange(key)}
                                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer hover:bg-black hover:text-white ${selectedStatus === key
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Events List */}
                <div className="">
                    {filteredEvents.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No events found matching your filters.</p>
                        </div>
                    ) : (
                        filteredEvents.map((event, index) => (
                            <EventItem
                                key={event.id}
                                event={event}
                                index={index}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default EventListing; 