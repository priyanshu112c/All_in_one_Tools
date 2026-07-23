# Lesson 01: src/pages/Home.jsx - Homepage

## Purpose

Yeh project ka **homepage** hai. Yeh saare **15 categories** cards mein dikhata hai with animations.

## Why this file exists

- User ko sab categories ek jagah se dikh jayein
- Categories pe click karke tools dekh sakein
- Smooth animations ho

## When this file executes

Jab user root URL (`/`) pe aata hai.

## Which files use it

- `App.jsx` - Route: `<Route path="/" element={<Home />} />`
- `Layout.jsx` - Outlet ke through render hota hai
- `toolsData.js` - Categories data import hota hai

## Dependencies

| Import | From | Purpose |
|--------|------|---------|
| `Link` | `react-router-dom` | Category links |
| `motion` | `framer-motion` | Animations |
| `categories` | `../toolsData` | Categories data |
| `ArrowRight, Zap` | `lucide-react` | Icons |

## Complete source code

```jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../toolsData';
import { ArrowRight, Zap } from 'lucide-react';

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="inline-flex items-center gap-2 bg-royal-50 ...">
                        <Zap className="w-4 h-4" />
                        150+ Free Online Tools
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold ...">
                        Your All-in-One <span className="...">Web Toolkit</span>
                    </h1>
                    <p className="text-lg ...">
                        Text manipulation, developer utilities, calculators, image processing...
                    </p>
                </motion.div>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {categories.map((cat, i) => (
                    <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                        <Link to={`/category/${cat.id}`} className="card group block hover:scale-[1.02] ...">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} ...`}>
                                <cat.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold ...">{cat.name}</h3>
                            <p className="text-sm ...">{cat.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs ...">{cat.tools.length} tools</span>
                                <ArrowRight className="w-4 h-4 ..." />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
```

## Execution Flow

```
User visits /
         │
         ▼
Layout renders → <Outlet> → Home renders
         │
         ▼
Hero section: motion.div (fade in + slide up)
         │
         ▼
Categories grid: map over categories
         │
         ├── For each category:
         │   ├── motion.div (staggered animation)
         │   ├── Link to /category/{cat.id}
         │   ├── Icon + Name + Description
         │   └── Tool count badge
         │
         └── All 15 categories rendered
```

## Animation Flow

```
Hero: opacity 0→1, y 30→0, 0.5s duration
       │
       ▼
Cards: opacity 0→1, y 20→0, 0.3s duration each
       │
       ▼
Stagger: delay = i * 0.05 (each card 50ms after previous)
       │
       ▼
Hover: scale-[1.02] (slight zoom)
```

## Real-life Analogy

**Home.jsx** ek **Shopping Mall Entrance** ki tarah hai:
- **Hero** = Mall ka name board aur tagline
- **Category cards** = Different floors ke signs (Ground floor = Food, 1st = Fashion, etc.)
- **ArrowRight** = Arrow jo batata hai "Andar jao!"

## Common Mistakes

1. ❌ `cat.icon` ko capitalize karna
   ```jsx
   // GALAT - <Cat.icon> nahi chalta
   <Cat.icon />
   
   // SAHI - Dynamic component name
   <cat.icon />
   ```

2. ❌ `categories.map` mein `key` na dena
   ```jsx
   // GALAT
   {categories.map((cat, i) => (
       <div>...</div>  // Warning: missing key
   ))}
   
   // SAHI
   <div key={cat.id}>...</div>
   ```

## Best Practices

1. ✅ `motion.div` for smooth entry animations
2. ✅ Staggered delays for sequential appearance
3. ✅ Responsive grid (1→2→3→4 columns)
4. ✅ Gradient icons for visual appeal
5. ✅ Hover effects for interactivity

## Interview Questions

1. **Q: `motion.div` kya hai?**
   A: Framer Motion ka wrapper component jo animation capabilities add karta hai HTML `<div>` mein.

2. **Q: `delay: i * 0.05` kyun hai?**
   A: Staggered animation. Har card thoda delay ke baad aata hai. 15 cards hain toh last card 0.75s delay se aayega.

3. **Q: `max-w-7xl mx-auto` kya karta hai?**
   A: Content ka maximum width set karta hai aur center mein rakhta hai.

## Homework

1. Home.jsx kholo aur animations samjho
2. Browser mein homepage dekho - entry animations observe karo
3. Ek category card pe hover karo - zoom effect dekho
4. Mobile pe grid 1 column mein dikhega - check karo

## Revision Notes

- Home = Hero + Category Grid
- 15 categories rendered as cards
- Framer Motion for entry animations
- Staggered delays for sequential appearance
- Responsive grid layout
- Link to /category/{id} for navigation