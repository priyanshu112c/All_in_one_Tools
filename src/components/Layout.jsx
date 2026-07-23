import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, Menu, X, Heart, ChevronLeft, Home } from 'lucide-react';
import { categories } from '../toolsData';

export default function Layout() {
    const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
    const location = useLocation();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    useEffect(() => {
        setSidebarOpen(false);
    }, [location]);

    const toggleFavorite = (toolId) => {
        setFavorites(prev => {
            const next = prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId];
            localStorage.setItem('favorites', JSON.stringify(next));
            return next;
        });
    };

    const filteredCategories = useMemo(() => {
        if (!search.trim()) return categories;
        const q = search.toLowerCase();
        return categories.map(cat => ({
            ...cat,
            tools: cat.tools.filter(t => t.name.toLowerCase().includes(q))
        })).filter(cat => cat.tools.length > 0);
    }, [search]);

    const favTools = useMemo(() => {
        const all = categories.flatMap(c => c.tools.map(t => ({ ...t, category: c })));
        return favorites.map(id => all.find(t => t.id === id)).filter(Boolean).slice(0, 8);
    }, [favorites]);

    const isHome = location.pathname === '/';

    return (
        <div className="min-h-screen flex">
            {/* Mobile overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 lg:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-royal-500 to-sky-500 flex items-center justify-center text-white font-bold text-lg">A</div>
                        <div>
                            <h1 className="text-lg font-bold text-navy-500 dark:text-white">AutoTools</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">All-in-One Toolkit</p>
                        </div>
                    </Link>
                </div>

                <div className="p-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tools..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-royal-500 outline-none"
                        />
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
                    {/* Favorites */}
                    {!search && favTools.length > 0 && (
                        <div className="mb-3">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2 flex items-center gap-1">
                                <Heart className="w-3 h-3" /> Favorites
                            </p>
                            {favTools.map(tool => (
                                <Link
                                    key={tool.id}
                                    to={`/tool/${tool.id}`}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                                    {tool.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {filteredCategories.map(cat => (
                        <div key={cat.id}>
                            <Link
                                to={`/category/${cat.id}`}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mt-1"
                            >
                                <cat.icon className="w-4 h-4" />
                                {cat.name}
                                <span className="ml-auto text-xs text-gray-400 bg-gray-100 dark:bg-gray-600 px-1.5 py-0.5 rounded-full">{cat.tools.length}</span>
                            </Link>
                            {search && cat.tools.map(tool => (
                                <Link
                                    key={tool.id}
                                    to={`/tool/${tool.id}`}
                                    className="flex items-center gap-2 px-3 py-1.5 ml-6 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {tool.name}
                                </Link>
                            ))}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-h-screen">
                <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Menu className="w-5 h-5" />
                    </button>
                    {!isHome && (
                        <Link to="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <Home className="w-5 h-5" />
                        </Link>
                    )}
                    <div className="flex-1" />
                    <button
                        onClick={() => setDark(!dark)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
                    </button>
                </header>

                <div className="p-4 md:p-6 lg:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Outlet context={{ favorites, toggleFavorite }} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}