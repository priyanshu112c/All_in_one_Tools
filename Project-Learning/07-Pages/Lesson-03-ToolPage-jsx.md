# Lesson 03: src/pages/ToolPage.jsx - Tool Page

## Purpose

Yeh page ek **specific tool** ka component lazy-load karke dikhata hai. URL se `toolId` extract hota hai aur `toolRegistry` se component milta hai.

## Why this file exists

- Har tool ka page automatically load ho
- Lazy loading se performance achi rahe
- Loading spinner dikhe jab tool load ho raha ho

## When this file executes

Jab user `/tool/word-counter` type kare.

## Which files use it

- `App.jsx` - Route: `<Route path="/tool/:toolId" element={<ToolPage />} />`
- `toolRegistry.js` - Component lazy-load hota hai
- `toolsData.js` - Tool data milta hai

## Dependencies

| Import | From | Purpose |
|--------|------|---------|
| `Suspense` | `react` | Lazy component wrapper |
| `useParams, Link` | `react-router-dom` | Route params + navigation |
| `ArrowLeft, Loader2` | `lucide-react` | Icons |
| `toolComponents` | `../toolRegistry` | Lazy-loaded components |
| `getToolById` | `../toolsData` | Tool data |

## Complete source code

```jsx
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
                    <Link to={`/category/${toolData.category.id}`} className="text-sm text-royal-500 ...">
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
```

## Execution Flow

```
User visits /tool/word-counter
         │
         ▼
ToolPage renders
         │
         ├── useParams() → toolId = "word-counter"
         ├── toolComponents['word-counter'] → lazy component
         ├── getToolById('word-counter') → tool data
         │
         ├── if (!ToolComponent) → "Tool Not Found"
         │
         └── else:
             ├── Breadcrumb: ← Back to Text Tools
             ├── <Suspense fallback={LoadingSpinner}>
             └── <ToolComponent /> (lazy loaded!)
                     │
                     └── Shows LoadingFallback while loading
                         Then renders the tool
```

## Suspense + Lazy Loading

```
<Suspense fallback={<LoadingFallback />}>
    <ToolComponent />
</Suspense>

// Kya hota hai:
// 1. React ToolComponent render karne jaata hai
// 2. Detects lazy component → import() call hota hai
// 3. File load hone tak → LoadingFallback dikhta hai
// 4. File load ho gayi → ToolComponent render hota hai
```

## Breadcrumb Flow

```
toolData = getToolById('word-counter')
    │
    ├── toolData.category = { id: 'text', name: 'Text Tools', ... }
    │
    └── Breadcrumb link: /category/text
        Label: "← Text Tools"
```

## Real-life Analogy

**ToolPage** ek **Vending Machine** ki tarah hai:
- **toolId** = Button number press kiya
- **toolComponents[toolId]** = Machine mein item dhundhna
- **Suspense** = "Please wait" screen jab item aa raha ho
- **LoadingFallback** = Loading animation
- **ToolComponent** = Item finally mil gaya

## Common Mistakes

1. ❌ `<Suspense>` na lagana
   ```jsx
   // GALAT - Error: lazy component without Suspense
   <ToolComponent />
   
   // SAHI
   <Suspense fallback={<Loading />}>
       <ToolComponent />
   </Suspense>
   ```

2. ❌ ToolId undefined check na karna
   ```jsx
   // SAHI - if tool not in registry
   if (!ToolComponent) { return <NotFound />; }
   ```

## Interview Questions

1. **Q: `Suspense` kya hai?**
   A: React component jo lazy-loaded components ke loading state handle karta hai. Fallback UI dikhata hai jab tak component load ho raha ho.

2. **Q: Lazy loading se performance kaise improve hoti hai?**
   A: Initial bundle mein sirf main code hota hai. Tool ka code sirf tab load hota hai jab user us tool pe jaaye. Bundle size 80% tak chhota ho sakta hai.

3. **Q: `toolComponents[toolId]` undefined ho toh?**
   A: `if (!ToolComponent)` check hai - "Tool Not Found" page dikhata hai.

## Revision Notes

- ToolPage = Lazy-loaded tool component
- `useParams()` se toolId milta hai
- `toolRegistry` se component milta hai (lazy)
- `<Suspense>` required hai lazy components ke liye
- Breadcrumb link back to category
- Error handling for invalid tools