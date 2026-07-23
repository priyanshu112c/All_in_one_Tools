import { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import toolComponents from '../toolRegistry';
import { getToolById } from '../toolsData';

function LoadingFallback() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-royal-500 mb-4" />
            <p className="text-gray-500">Loading tool...</p>
        </div>
    );
}

export default function ToolPage() {
    const { toolId } = useParams();
    const ToolComponent = toolComponents[toolId];
    const toolData = getToolById(toolId);

    if (!ToolComponent) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tool Not Found</h2>
                <p className="text-gray-500 mb-4">The tool "{toolId}" doesn't exist.</p>
                <Link to="/" className="btn-primary inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div>
            {toolData && (
                <div className="mb-4">
                    <Link to={`/category/${toolData.category.id}`} className="text-sm text-royal-500 hover:text-royal-600 flex items-center gap-1">
                        <ArrowLeft className="w-3 h-3" /> {toolData.category.name}
                    </Link>
                </div>
            )}
            <Suspense fallback={<LoadingFallback />}>
                <ToolComponent />
            </Suspense>
        </div>
    );
}
