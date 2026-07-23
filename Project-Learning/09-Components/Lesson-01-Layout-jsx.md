# Lesson 01: src/components/Layout.jsx - Main Layout Component

## Purpose

Yeh project ka **main layout component** hai. Ismein hai:
- **Sidebar** - Categories navigation + Search + Favorites
- **Header** - Theme toggle + Home button + Mobile menu
- **Content Area** - Page content via `<Outlet />`

## Why this file exists

Har page pe same layout chahiye (sidebar, header). Is component ko use karke sab pages consistent dikhte hain.

## When this file executes

Jab koi bhi route render hota hai. App.jsx mein `<Route element={<Layout />}>` hai, isliye pehle Layout render hota hai, phir uske andar page content.

## Which files use it

- `App.jsx` - Route ke through
- `Home.jsx`, `CategoryPage.jsx`, `ToolPage.jsx` - `<Outlet />` ke through
- `ToolWrapper.jsx` - `useOutletContext()` se favorites/toggleFavorite

## Dependencies

| Import | From | Purpose |
|--------|------|---------|
| `useState, useEffect, useMemo` | `react` | State management |
| `Link, useLocation, Outlet` | `react-router-dom` | Routing |
| `motion, AnimatePresence` | `framer-motion` | Animations |
| `Search, Sun, Moon, Menu, X, Heart, ChevronLeft, Home` | `lucide-react` | Icons |
| `categories` | `../toolsData` | Categories data |

## Complete source code

```jsx
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
            <aside className={...}>
                {/* Logo */}
                {/* Search */}
                {/* Navigation */}
            </aside>

            {/* Main content */}
            <main className="flex-1 min-h-screen">
                <header className="sticky top-0 z-30 ...">
                    {/* Mobile menu toggle */}
                    {/* Home button */}
                    {/* Theme toggle */}
                </header>

                <div className="p-4 md:p-6 lg:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div key={location.pathname} ...>
                            <Outlet context={{ favorites, toggleFavorite }} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
```

## Key States

### Dark Mode State
```jsx
const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
// Initialize from localStorage
// Jab page load ho, toh localStorage se theme read karo
```

### Sidebar State (Mobile)
```jsx
const [sidebarOpen, setSidebarOpen] = useState(false);
// Mobile pe sidebar toggle karte hain
// Desktop pe hamesha open rahta hai (lg:translate-x-0)
```

### Search State
```jsx
const [search, setSearch] = useState('');
// Sidebar mein search input
// Filtered categories dikhata hai
```

### Favorites State
```jsx
const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
// localStorage se load hota hai
// toggleFavorite se add/remove hota hai
```

## useMemo Explained

### filteredCategories
```jsx
const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;  // No search → sab dikhao
    const q = search.toLowerCase();
    return categories.map(cat => ({
        ...cat,
        tools: cat.tools.filter(t => t.name.toLowerCase().includes(q))
        // Sirf matching tools wali categories
    })).filter(cat => cat.tools.length > 0);
}, [search]); // Sirf tab recalculate jab search change ho
```

### favTools
```jsx
const favTools = useMemo(() => {
    const all = categories.flatMap(c => c.tools.map(t => ({ ...t, category: c })));
    // Saare tools ek array mein
    return favorites.map(id => all.find(t => t.id === id)).filter(Boolean).slice(0, 8);
    // Max 8 favorites dikhao
}, [favorites]);
```

## useEffect Explained

### Dark Mode Effect
```jsx
useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}, [dark]);
// Jab dark state change ho:
// 1. <html> pe class="dark" add/remove karo
// 2. localStorage mein save karo
```

### Route Change Effect
```jsx
useEffect(() => {
    setSidebarOpen(false);
}, [location]);
// Jab bhi route change ho:
// Mobile sidebar band karo
```

## Execution Flow

```
Layout renders
    │
    ├── Initializes state (dark, sidebar, search, favorites)
    ├── useEffect: Dark mode apply
    │
    ├── Renders sidebar
    │   ├── Logo + Brand name (AutoTools)
    │   ├── Search input
    │   ├── Favorites section (if any)
    │   └── Categories list (filtered by search)
    │
    ├── Renders header
    │   ├── Mobile menu button (hamburger)
    │   ├── Home button (if not on home)
    │   └── Theme toggle button
    │
    └── Renders content area
        └── <Outlet> → Page component renders
```

## Data Flow

```
Layout State
    │
    ├── dark (boolean) → ThemeContext (document.documentElement)
    ├── sidebarOpen (boolean) → Sidebar visibility
    ├── search (string) → Filtered categories
    └── favorites (array) → localStorage + Outlet context
                                    │
                                    ▼
                            Page Components (via Outlet context)
                                    │
                                    ├── Use favorites array
                                    └── Use toggleFavorite()
```

## Real-life Analogy

**Layout.jsx** ek **Office Building** ki tarah hai:

- **Sidebar** = Building directory (konsa department kahan hai)
- **Header** = Building entrance/reception
- **Content Area** = Office rooms (different pages)
- **Search** = Security guard jo batata hai kaun kahan hai
- **Favorites** = Favorite rooms list
- **Dark Mode** = Lighting system (light/dark)

## Common Mistakes

1. ❌ Outlet context prop names change karna
   ```jsx
   // Layout mein
   <Outlet context={{ favorites, toggleFavorite }} />
   
   // ToolWrapper mein
   const { favorites, toggleFavorite } = useOutletContext();
   // Prop names match hone chahiye
   ```

2. ❌ localStorage items ko check na karna
   ```jsx
   // GALAT - agar localStorage empty ho toh error
   JSON.parse(localStorage.getItem('favorites'))
   
   // SAHI - fallback
   JSON.parse(localStorage.getItem('favorites') || '[]')
   ```

3. ❌ Sidebar responsive classes miss karna
   ```jsx
   // Desktop: lg:translate-x-0 (always visible)
   // Mobile: translate-x-0 ya -translate-x-full (toggle)
   ```

## Best Practices

1. ✅ useMemo for expensive computations (search filtering)
2. ✅ useEffect for side effects (localStorage, DOM manipulation)
3. ✅ AnimatePresence for exit animations
4. ✅ Outlet context for passing data to child routes
5. ✅ Responsive design classes (lg:, hidden, fixed vs sticky)

## Interview Questions

1. **Q: `<Outlet context>` kyun use kiya?**
   A: Normal React Context bina provider ke kaam nahi karta. Outlet context se child components ko parent ka state pass kar sakte hain bina global context banaye.

2. **Q: `useMemo()` kyun use kiya?**
   A: Performance ke liye. Search filtering expensive ho sakti hai (150+ tools). useMemo recalculate karta hai sirf jab search string change ho.

3. **Q: Favorites localStorage mein kyun save kiye?**
   A: User jab page refresh kare toh favorites persist rahe. Bina localStorage ke, state reset ho jayega.

4. **Q: `AnimatePresence` kya karta hai?**
   A: Framer Motion ka component jo exit animations allow karta hai. Bina iske, component instantly vanish ho jata hai without animation.

## Homework

1. Layout.jsx kholo aur saari states samjho
2. Mobile view mein sidebar toggle karo
3. Search mein tool name type karo
4. Kisi tool ko favorite karo aur localStorage dekho
5. Dark mode toggle karo

## Revision Notes

- Layout = Sidebar + Header + Content (via Outlet)
- States: dark, sidebarOpen, search, favorites
- useMemo for performance (filteredCategories, favTools)
- useEffect for side effects (theme, route change)
- Outlet context for passing props to child routes
- localStorage for persistence (theme, favorites)
- Responsive: Desktop sidebar always visible, Mobile toggle