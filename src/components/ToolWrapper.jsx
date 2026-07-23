import { Heart } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export default function ToolWrapper({ title, description, icon: Icon, children }) {
    const { favorites, toggleFavorite } = useOutletContext();
    const isFav = favorites.includes(title);
    const toolId = window.location.pathname.split('/tool/')[1];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
                {Icon && (
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-royal-500 to-sky-500 flex items-center justify-center text-white">
                        <Icon className="w-6 h-6" />
                    </div>
                )}
                <div className="flex-1">
                    <h1 className="tool-title mb-0">{title}</h1>
                    {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
                </div>
                {toolId && (
                    <button
                        onClick={() => toggleFavorite(toolId)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Toggle favorite"
                    >
                        <Heart className={`w-5 h-5 ${favorites.includes(toolId) ? 'text-pink-500 fill-pink-500' : 'text-gray-400'}`} />
                    </button>
                )}
            </div>
            <div className="mt-6">{children}</div>
        </div>
    );
}

export function OutputBox({ value, label = 'Output', onCopy }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(value || '');
        if (onCopy) onCopy();
    };

    return (
        <div className="relative">
            {label && <label className="label">{label}</label>}
            <div className="relative">
                <textarea
                    readOnly
                    value={value || ''}
                    className="textarea-field pr-20"
                    rows={6}
                />
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-2 btn-primary text-xs px-3 py-1.5"
                >
                    Copy
                </button>
            </div>
        </div>
    );
}