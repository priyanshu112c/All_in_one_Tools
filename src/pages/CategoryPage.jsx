import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCategoryById } from '../toolsData';
import { Heart } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export default function CategoryPage() {
    const { categoryId } = useParams();
    const { favorites, toggleFavorite } = useOutletContext();
    const category = getCategoryById(categoryId);

    if (!category) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Category not found</h2>
                <Link to="/" className="btn-primary mt-4 inline-block">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}>
                    <category.icon className="w-7 h-7" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-navy-500 dark:text-white">{category.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400">{category.tools.length} tools available</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.tools.map((tool, i) => (
                    <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.03 }}
                    >
                        <div className="card group relative hover:scale-[1.02] transition-all duration-300">
                            <Link to={`/tool/${tool.id}`} className="block">
                                <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-royal-500 dark:group-hover:text-sky-400 transition-colors">
                                    {tool.name}
                                </h3>
                                <p className="text-xs text-gray-400 mt-1">{category.name}</p>
                            </Link>
                            <button
                                onClick={(e) => { e.preventDefault(); toggleFavorite(tool.id); }}
                                className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                            >
                                <Heart className={`w-4 h-4 ${favorites.includes(tool.id) ? 'text-pink-500 fill-pink-500' : 'text-gray-300 dark:text-gray-600'}`} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}