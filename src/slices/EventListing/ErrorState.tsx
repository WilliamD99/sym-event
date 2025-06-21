import { createClient } from "@/prismicio";

interface ErrorStateProps {
    error: string;
    onRetry: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center py-12">
                    <div className="text-red-600 text-lg mb-4">⚠️ {error}</div>
                    <button
                        onClick={onRetry}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ErrorState; 