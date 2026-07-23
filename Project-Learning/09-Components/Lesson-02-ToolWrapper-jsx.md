# Lesson 02: src/components/ToolWrapper.jsx - Tool Page Wrapper

## Purpose

Yeh component har tool ke page ka **wrapper** hai. Ismein title, description, icon, favorite button, aur children (tool content) hota hai.

## Why this file exists

- Har tool ka page consistent dikhe
- Title, description, favorite button ek jagah se manage ho
- Tool developers ko sirf content likhna hai, layout automatic

## When this file executes

`ToolPage.jsx` ke andar, jab koi specific tool render hota hai.

## Which files use it

- `ToolPage.jsx` - Wrap karta hai loaded tool component ko
- `toolRegistry.js` - Jab tool components lazy-load hote hain

## Dependencies

| Import | From | Purpose |
|--------|------|---------|
| `Heart` | `lucide-react` | Favorite icon |
| `useOutletContext` | `react-router-dom` | Outlet context access |

## Complete source code

```jsx
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
```

## Props Explained

| Prop | Type | Purpose | Example |
|------|------|---------|---------|
| `title` | string | Tool ka name | "Word Counter" |
| `description` | string | Short description | "Count words in your text" |
| `icon` | Component | Lucide icon component | `<Type />` |
| `children` | ReactNode | Tool ka actual content | `<input />`, `<button />`, etc. |

## Exported Components

### 1. ToolWrapper (Default Export)

```jsx
<ToolWrapper title="Word Counter" description="Count words" icon={Type}>
    {/* Tool content here */}
    <textarea onChange={handleCount} />
    <p>Word count: {count}</p>
</ToolWrapper>
```

### 2. OutputBox (Named Export)

```jsx
<OutputBox value={result} label="Output" onCopy={handleCopy} />
```

## useOutletContext Explained

```jsx
// Layout.jsx mein
<Outlet context={{ favorites, toggleFavorite }} />

// ToolWrapper.jsx mein
const { favorites, toggleFavorite } = useOutletContext();

// Ab hamare paas favorites array aur toggleFavorite function hai
```

## Function Explanations

### `ToolWrapper()`

```jsx
export default function ToolWrapper({ title, description, icon: Icon, children }) {
    const { favorites, toggleFavorite } = useOutletContext();
    const isFav = favorites.includes(title);
    const toolId = window.location.pathname.split('/tool/')[1];

    // Returns: Header with icon, title, description, favorite button
    //         + children (tool content)
}
```

**Destructuring:**
- `icon: Icon` - prop "icon" ko "Icon" variable mein rename kar rahe hain
- JSX mein capitalize karna hota hai component names (`<Icon />`)

### `OutputBox()`

```jsx
export function OutputBox({ value, label = 'Output', onCopy }) {
    const handleCopy = () => {
        navigator.clipboard.writeText(value || '');
        if (onCopy) onCopy();
    };

    // Returns: Read-only textarea with Copy button
}
```

**Props:**
- `value` - Dikhane wali value
- `label` - "Output" by default
- `onCopy` - Copy karne ke baad callback (optional)

## Execution Flow

```
ToolPage renders WordCounter
         │
         ▼
ToolWrapper wraps it
         │
         ├── Reads favorites from Outlet context
         ├── Extracts toolId from URL
         ├── Renders header (icon + title + favorite)
         └── Renders children (WordCounter's actual UI)
```

## Real-life Analogy

**ToolWrapper** ek **Picture Frame** ki tarah hai:
- **Frame border** = Header (icon, title, favorite button)
- **Picture** = Children (tool content)
- **Label on frame** = Description
- Har picture ko same frame mein rakhne se consistent look aata hai

## Common Mistakes

1. ❌ `icon` prop ko JSX mein directly render karna
   ```jsx
   // GALAT
   <div>{icon}</div>
   
   // SAHI - JSX Capitalization
   <div><Icon /></div>
   ```

2. ❌ `window.location.pathname` se toolId na nikalna
   ```jsx
   // Alternative: useLocation() hook se better hai
   const location = useLocation();
   const toolId = location.pathname.split('/tool/')[1];
   ```

## Best Practices

1. ✅ Wrapper pattern for consistent layout
2. ✅ `children` prop for flexible content
3. ✅ Default prop values (label = 'Output')
4. ✅ Optional props with conditional rendering
5. ✅ Export both default and named components

## Interview Questions

1. **Q: `icon: Icon` destructuring kyun hai?**
   A: JSX mein component names capitalize hone chahiye. Prop name lowercase hai (`icon`), lekin render karna hai `<Icon />`.

2. **Q: `children` prop kya hai?**
   A: React ka special prop jo component ke andar render hone wale content ko represent karta hai.

3. **Q: `OutputBox` ko named export kyun kiya?**
   A: Kyunki default export already ToolWrapper hai. Named export se koi bhi specific component import kar sake.

4. **Q: `navigator.clipboard.writeText()` kya hai?**
   A: Browser API jo text ko clipboard mein copy karti hai. Async method hai.

## Homework

1. ToolWrapper.jsx kholo aur props samjho
2. Kisi tool pe jaake favorite button dekho
3. OutputBox ka Copy button test karo
4. DevTools mein ToolWrapper ki rendering dekho

## Revision Notes

- ToolWrapper = Tool page ka layout wrapper
- Props: title, description, icon, children
- OutputBox = Reusable output display component
- useOutletContext() se favorites access hote hain
- `icon: Icon` destructuring for JSX rendering
- children prop for flexible tool content