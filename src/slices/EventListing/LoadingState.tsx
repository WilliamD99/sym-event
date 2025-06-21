const LoadingState = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Loading Title */}
                <div className="mb-8">
                    <div className="h-12 bg-gray-200 rounded w-64 animate-pulse"></div>
                </div>

                {/* Loading Filters */}
                <div className="mb-8 flex flex-row items-center justify-between">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>

                    {/* Loading Filters */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                        <div className="h-9 bg-gray-200 rounded-full w-[180px] animate-pulse"></div>
                    </div>

                    {/* Loading Status Tabs */}
                    <div className="gap-1 bg-white rounded-lg p-1 inline-flex">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-8 bg-gray-200 rounded-md w-20 animate-pulse"></div>
                        ))}
                    </div>
                </div>

                {/* Loading Event Cards */}
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center">
                                {/* Loading Image */}
                                <div className="flex-shrink-0 w-32 h-20 mr-6 bg-gray-200 rounded-lg animate-pulse"></div>

                                {/* Loading Content */}
                                <div className="flex-grow">
                                    <div className="h-3 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                                    <div className="h-6 bg-gray-200 rounded w-64 mb-3 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-96 mb-2 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                                </div>

                                {/* Loading Date */}
                                <div className="flex-shrink-0 ml-6">
                                    <div className="h-8 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading Text */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 animate-pulse">Loading events...</p>
                </div>
            </div>
        </section>
    );
};

export default LoadingState; 