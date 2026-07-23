# Lesson 02: src/App.jsx - Root Component & Routing

## Purpose

Yeh file React app ka **root component** hai. Yeh routing setup karta hai - matlab kaun sa URL kaun sa page dikhayega.

## Why this file exists

Bina routing ke sirf ek page dikhega. Yeh file define karti hai ki:
- `/` pe Home page dikhega
- `/category/:categoryId` pe CategoryPage dikhega
- `/tool/:toolId` pe ToolPage dikhega

## When this file executes

`main.jsx` ke baad sabse pehle `App.jsx` render hota hai. Yeh wrapping components (ThemeProvider, BrowserRouter) setup karta hai.

```
main.jsx → App.jsx → ThemeProvider → BrowserRouter → Routes → Layout → Pages
```

## Which files use it

- `main.jsx` - App ko import karta hai
- `Layout.jsx` - App ke routes ke andar render hota hai
- `Home.jsx`, `CategoryPage.jsx`, `ToolPage.jsx` - Routes ke through render hote hain

## Dependencies

| Package | Import | Purpose |
|---------|--------|---------|
| `react-router-dom` | `BrowserRouter, Routes, Route` | Client-side routing |
| `./context/ThemeContext` | `ThemeProvider` | Dark/Light theme |
| `./components/Layout` | `Layout` | Main layout wrapper |
| `./pages/Home` | `Home` | Homepage |
| `./pages/CategoryPage` | `CategoryPage` | Category page |
| `./pages/ToolPage` | `ToolPage` | Tool page |

## Complete source code

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ToolPage from './pages/ToolPage';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/category/:categoryId" element={<CategoryPage />} />
                        <Route path="/tool/:toolId" element={<ToolPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
```

## Line-by-line explanation

### Lines 1-6: Imports

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ToolPage from './pages/ToolPage';
```

- **BrowserRouter** - URL handling ke liye (browser history API wrap karta hai)
- **Routes** - Route definitions ka container
- **Route** - Ek specific URL mapping
- **ThemeProvider** - Theme context provide karta hai
- **Layout** - Layout wrapper (sidebar + header + content area)
- **Home, CategoryPage, ToolPage** - Page components

### Line 8: Function Component

```jsx
function App() {
```

- Yeh ek **function component** hai
- React components functions hote hain jo JSX return karte hain

### Lines 10-18: JSX Return (Nesting)

```jsx
return (
    <ThemeProvider>                    ← Step 1: Theme wrap
        <BrowserRouter>                ← Step 2: Routing wrap
            <Routes>                   ← Step 3: Routes container
                <Route element={<Layout />}>  ← Step 4: Layout wrapper
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                    <Route path="/tool/:toolId" element={<ToolPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
);
```

### Lines 23-24: Export

```jsx
export default App;
```

- **Default export** - `main.jsx` isko `import App from './App'` se import karta hai

## Syntax Explanations

### Nested Routes (Layout Routes)

```jsx
<Route element={<Layout />}>
    <Route path="/" element={<Home />} />
</Route>

// Yeh matlab hai ki Layout wrapper hoga
// aur uske andar pages render honge via <Outlet />
```

### Dynamic Route Parameters

```jsx
<Route path="/category/:categoryId" element={<CategoryPage />} />
<Route path="/tool/:toolId" element={<ToolPage />} />

// :categoryId aur :toolId dynamic hain
// /category/text → categoryId = "text"
// /tool/word-counter → toolId = "word-counter"
```

### Provider Pattern (Wrapping)

```jsx
<ThemeProvider>        ← Sabse bahar (global)
    <BrowserRouter>    ← Andar (routing)
        <Routes>       ← Sabse andar (pages)
```

## Function Explanations

### `App()`

```jsx
function App() {
    return ( /* JSX */ );
}

// Yeh React component hai jo:
// 1. ThemeProvider wrap karta hai (global theme)
// 2. BrowserRouter wrap karta hai (routing)
// 3. Routes define karta hai (URL → Page mapping)
// 4. Layout wrapper use karta hai (consistent layout)
}
```

## Execution Flow

```
App() Render
    │
    ├── ThemeProvider renders
    │   └── BrowserRouter renders
    │       └── Routes renders
    │           └── Route (Layout) renders
    │               ├── Layout component renders
    │               │   ├── Sidebar (from Layout.jsx)
    │               │   ├── Header (from Layout.jsx)
    │               │   └── <Outlet /> (page content)
    │               │       │
    │               │       ├── URL="/" → Home renders
    │               │       ├── URL="/category/:id" → CategoryPage renders
    │               │       └── URL="/tool/:id" → ToolPage renders
```

## Request Flow (URL Navigation)

```
User clicks link
       │
       ▼
BrowserRouter intercepts
       │
       ▼
URL changes (e.g., /tool/word-counter)
       │
       ▼
Routes matches pattern "/tool/:toolId"
       │
       ▼
toolId = "word-counter" extracted
       │
       ▼
<ToolPage toolId="word-counter" /> renders
       │
       ▼
ToolPage loads WordCounter component via toolRegistry
```

## Real-life Analogy

**App.jsx** ek **Mall** ki tarah hai:
- **ThemeProvider** = Mall ka AC system (sab ke liye same temperature)
- **BrowserRouter** = Mall ka directory board (konsi floor pe kya hai)
- **Routes** = Floor map
- **Layout** = Mall ka structure (entrance, corridors, shops)
- **Home** = Ground floor (sab categories)
- **CategoryPage** = Floor (ek category ke tools)
- **ToolPage** = Shop (ek specific tool)

## Common Mistakes

1. ❌ Routes ko Layout ke bahar rakhna
   ```jsx
   // GALAT - Layout wrapper nahi hoga
   <Routes>
       <Route path="/" element={<Home />} />
   </Routes>
   
   // SAHI
   <Routes>
       <Route element={<Layout />}>
           <Route path="/" element={<Home />} />
       </Route>
   </Routes>
   ```

2. ❌ BrowserRouter ko Routes ke andar rakhna
   ```jsx
   // GALAT
   <Routes>
       <BrowserRouter>...</BrowserRouter>
   </Routes>
   
   // SAHI - BrowserRouter Routes ke bahar hona chahiye
   <BrowserRouter>
       <Routes>...</Routes>
   </BrowserRouter>
   ```

3. ❌ Path mein leading slash na dena
   ```jsx
   // GALAT (for nested routes without base path)
   <Route path="category" element={<CategoryPage />} />
   
   // SAHI
   <Route path="/category/:categoryId" element={<CategoryPage />} />
   ```

## Best Practices

1. ✅ Layout route use karo consistent layout ke liye
2. ✅ Dynamic parameters `:` se define karo
3. ✅ Providers ko proper order mein wrap karo (outer to inner)
4. ✅ Route components ko top-level mein import karo (not lazy, since they're small)

## Alternative Approaches

### File-based Routing (Next.js style)
```
pages/
  index.jsx        → /
  category/[id].jsx → /category/:id
  tool/[id].jsx     → /tool/:id
```

### Manual Route Configuration
```jsx
const routes = [
    { path: '/', element: <Home /> },
    { path: '/category/:categoryId', element: <CategoryPage /> },
    { path: '/tool/:toolId', element: <ToolPage /> },
];

// Then map over routes
```

## Interview Questions

1. **Q: `BrowserRouter` aur `HashRouter` mein kya fark hai?**
   A: `BrowserRouter` clean URLs use karta hai (`/tool/word-counter`). `HashRouter` hash-based URLs use karta hai (`/#/tool/word-counter`). Production mein `BrowserRouter` better hai.

2. **Q: Layout route kya hai?**
   A: Parent route jo layout render karta hai bina path ke. Children routes `<Outlet />` ke through render hote hain.

3. **Q: Dynamic params kaise access karte hain?**
   A: `useParams()` hook se. Jaise `const { toolId } = useParams()`.

4. **Q: Provider nesting order kyun matter karta hai?**
   A: Andar wale providers bahar wale ke context use kar sakte hain. Isliye order important hai.

## Coding Exercise

1. App.jsx mein ek naya route add karo: `/about`
2. About.jsx page banao
3. Layout mein About ka link add karo
4. URL change karo aur dekho page switch hota hai

## Homework

1. App.jsx ko kholo aur routing samjho
2. Browser mein manually URL change karo aur dekho kya hota hai
3. React DevTools mein route changes dekho
4. Ek naya route add karo practice ke liye

## Revision Notes

- `App.jsx` = Root component + Routing setup
- 3 routes hain: `/`, `/category/:id`, `/tool/:id`
- `Layout` wrapper hai sab routes ke liye
- `ThemeProvider` sabse bahar hai (global theme)
- `BrowserRouter` URL handling ke liye
- Dynamic params `:` se define hote hain