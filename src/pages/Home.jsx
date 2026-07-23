import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../toolsData';
import { ArrowRight, Zap } from 'lucide-react';

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 bg-royal-50 dark:bg-royal-900/30 text-royal-600 dark:text-royal-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Zap className="w-4 h-4" />
                        150+ Free Online Tools
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-navy-500 dark:text-white mb-4">
                        Your All-in-One{' '}
                        <span className="bg-gradient-to-r from-royal-500 to-sky-500 bg-clip-text text-transparent">
                            Web Toolkit
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Text manipulation, developer utilities, calculators, image processing, and much more — all running directly in your browser.
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {categories.map((cat, i) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                        <Link
                            to={`/category/${cat.id}`}
                            className="card group block hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                                <cat.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{cat.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{cat.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                    {cat.tools.length} tools
                                </span>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-royal-500 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}