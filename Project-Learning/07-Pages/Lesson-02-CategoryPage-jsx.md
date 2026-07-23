# Lesson 02: src/pages/CategoryPage.jsx - Category Page

## Purpose

Yeh page ek **specific category** ka tools list dikhata hai. User ko dikhta hai ki us category mein kitne tools hain aur un pe click karke tool pe ja sakte hain.

## Why this file exists

- Ek category ke saare tools ek jagah dikhein
- Har tool pe favorite button ho
- Smooth animations ho

## When this file executes

Jab user `/category/text` ya `/category/developer` type kare. URL se `categoryId` extract hota hai.

## Which files use it

- `App.jsx` - Route: `<Route path="/category/:categoryId" element={<CategoryPage />} />`
- `Layout.jsx` - Outlet ke through render hota hai
- `toolsData.js` - `getCategoryById()` se data

## Dependencies

| Import | From | Purpose |
|--------|------|---------|
| `useParams, Link` | `react-router-dom` | Route params + navigation |
| `motion` | `framer-motion` | Animations |
| `getCategoryById` | `../toolsData` | Category data |
| `Heart` | `lucide-react` | Favorite icon |
| `useOutletContext` | `react-router-dom` | Favorites access |

## Complete source code

```jsx
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
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} ...`}>
                    <category.icon className="w-7 h-7" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold ...">{category.name}</h1>
                    <p className="text-gray-500 ...">{category.tools.length} tools available</p>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.tools.map((tool, i) => (
                    <motion.div key={tool.id} ...>
                        <div className="card group relative ...">
                            <Link to={`/tool/${tool.id}`}>
                                <h3 className="font-semibold ...">{tool.name}</h3>
                                <p className="text-xs ...">{category.name}</p>
                            </Link>
                            <button onClick={(e) => { e.preventDefault(); toggleFavorite(tool.id); }}>
                                <Heart ... />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
```

## Execution Flow

```
User visits /category/text
         │
         ▼
App.jsx: matches "/category/:categoryId"
         │
         ▼
CategoryPage renders
         │
         ├── useParams() → categoryId = "text"
         ├── getCategoryById("text") → category object
         │
         ├── if (!category) → "Category not found" page
         │
         └── else:
             ├── Header: Icon + Name + Tool count
             └── Grid: Tools mapped with animation
                 ├── Tool card with Link to /tool/{id}
                 └── Favorite button with Heart icon
```

## Error Handling Flow

```
getCategoryById(categoryId)
         │
         ├── Found → Render category page
         │
         └── null → Render "Category not found"
                     └── Link to Home
```

## Common Mistakes

1. ❌ `e.preventDefault()` na lagana
   ```jsx
   // GALAT - Link bhi navigate karega aur favorite bhi toggle hoga
   <button onClick={() => toggleFavorite(tool.id)}>...</button>
   
   // SAHI - Sirf favorite toggle, link navigate na kare
   <button onClick={(e) => { e.preventDefault(); toggleFavorite(tool.id); }}>...</button>
   ```

## Best Practices

1. ✅ Null check for invalid category
2. ✅ `useParams()` for route parameters
3. ✅ `useOutletContext()` for favorites access
4. ✅ `e.preventDefault()` for nested click handlers
5. ✅ Responsive grid layout

## Interview Questions

1. **Q: `useParams()` kya hai?**
   A: React Router hook jo URL parameters return karta hai. `/category/:categoryId` mein `categoryId` milega.

2. **Q: `e.preventDefault()` kyun hai?**
   A: Favorite button `<Link>` ke andar hai. Bina preventDefault ke, button click pe Link bhi navigate kar lega.

## Homework

1. CategoryPage kholo aur samjho
2. URL mein category ID change karo aur dekho
3. Invalid category URL try karo
4. Kisi tool ko category page se favorite karo

## Revision Notes

- CategoryPage = Category header + Tools grid
- `useParams()` se URL se categoryId milta hai
- `getCategoryById()` se category data milta hai
- Favorite button with `e.preventDefault()`
- Error handling for invalid categories