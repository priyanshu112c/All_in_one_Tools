# Lesson 02: Folder Structure - AutoTools

## Purpose

Yeh lesson aapko project ki folder structure samjhata hai - ki kaun kaun se files/folders hain aur unka kya role hai.

## Why this file exists

Folder structure samajhna bahut zaroori hai. Agar aapko project mein koi change karna ho, toh pehle pata hona chahiye ki kaun sa file kahan hai.

## Complete Folder Structure

```
auto_short/                        ← Root project folder
│
├── index.html                     ← HTML entry point (Vite isko serve karta hai)
├── package.json                   ← Dependencies aur scripts
├── package-lock.json              ← Exact dependency versions
├── vite.config.js                 ← Vite build tool configuration
├── postcss.config.js              ← PostCSS configuration (Tailwind ke liye)
├── tailwind.config.js             ← Tailwind CSS configuration
├── TODO.md                        ← Project TODO notes
├── audit.txt                      ← Audit notes
├── audit2.txt                     ← Audit notes part 2
├── audit3.txt                     ← Audit notes part 3
├── AutoTools.txt                  ← Project notes
├── verify.cjs                     ← Verification script
│
├── auto-tools/                    ← Nested Vite project (separate copy)
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── vite.config.js
│   ├── public/                    ← Static assets
│   └── src/                       ← Source files (nested)
│
└── src/                           ← Main source folder
    ├── main.jsx                   ← React entry point
    ├── App.jsx                    ← Root component (routing)
    ├── index.css                  ← Global styles (Tailwind)
    ├── toolRegistry.js            ← Tool component lazy-loading registry
    ├── toolsData.js               ← All tools data (categories, names, IDs)
    │
    ├── components/                ← Reusable UI components
    │   ├── Layout.jsx             ← Main layout (sidebar + header + content)
    │   └── ToolWrapper.jsx        ← Wrapper for every tool page
    │
    ├── context/                   ← React Context providers
    │   └── ThemeContext.jsx        ← Dark/Light theme context
    │
    ├── pages/                     ← Page components
    │   ├── Home.jsx               ← Homepage (all categories)
    │   ├── CategoryPage.jsx       ← Single category page (tools list)
    │   └── ToolPage.jsx           ← Single tool page (tool component)
    │
    └── tools/                     ← Tool implementation components
        ├── TextTools.jsx          ← 30+ text tools
        ├── DeveloperTools.jsx     ← 30+ developer tools
        ├── CalculatorTools.jsx    ← 24+ calculator tools
        ├── MathTools.jsx          ← 15+ math tools
        ├── ColorTools.jsx         ← 11+ color tools
        ├── ImageTools.jsx         ← 20+ image tools
        ├── PdfTools.jsx           ← 8+ PDF tools
        └── MiscTools.jsx          ← 50+ miscellaneous tools
```

## File Kaunsa Hai, Kya Karta Hai

### Root Level Files

| File | Kya Karta Hai |
|------|---------------|
| `index.html` | Browser mein sabse pehle yeh load hota hai. React root div yahan hota hai |
| `package.json` | Project ki dependencies aur npm scripts define karta hai |
| `vite.config.js` | Vite ko configure karta hai (plugin, port, etc.) |
| `postcss.config.js` | PostCSS plugins define karta hai (Tailwind ke liye zaroori) |
| `tailwind.config.js` | Tailwind CSS ko customize karta hai |
| `verify.cjs` | Ek verification script hai (Node.js CommonJS format) |

### src/ Folder

| File | Kya Karta Hai |
|------|---------------|
| `main.jsx` | React app ko DOM mein mount karta hai |
| `App.jsx` | Routes define karta hai, ThemeProvider wrap karta hai |
| `index.css` | Global styles aur Tailwind directives |
| `toolRegistry.js` | Saare tools ka mapping (tool ID → component) |
| `toolsData.js` | Saare categories aur tools ka data |

### src/components/

| File | Kya Karta Hai |
|------|---------------|
| `Layout.jsx` | Sidebar (navigation), Header (theme toggle, home button), aur Outlet (page content) |
| `ToolWrapper.jsx` | Har tool ke page ka wrapper - title, description, icon, favorite button |

### src/context/

| File | Kya Karta Hai |
|------|---------------|
| `ThemeContext.jsx` | Dark/Light theme state manage karta hai. localStorage se persist hota hai |

### src/pages/

| File | Kya Karta Hai |
|------|---------------|
| `Home.jsx` | Homepage - saare categories cards mein dikhata hai |
| `CategoryPage.jsx` | Ek category ka page - usmein saare tools dikhata hai |
| `ToolPage.jsx` | Ek tool ka page - tool component ko lazy-load karta hai |

### src/tools/

| File | Kya Karta Hai |
|------|---------------|
| `TextTools.jsx` | Text manipulation tools (word counter, case converter, etc.) |
| `DeveloperTools.jsx` | Developer tools (JSON formatter, Base64, regex tester, etc.) |
| `CalculatorTools.jsx` | Calculator tools (percentage, EMI, SIP, etc.) |
| `MathTools.jsx` | Math tools (scientific calculator, prime checker, etc.) |
| `ColorTools.jsx` | Color tools (color picker, gradient generator, etc.) |
| `ImageTools.jsx` | Image tools (compress, resize, crop, etc.) |
| `PdfTools.jsx` | PDF tools (merge, split, rotate, etc.) |
| `MiscTools.jsx` | Miscellaneous tools (QR code, password, unit converter, etc.) |

## Data Flow Between Folders

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  toolsData.js│────→│  Layout.jsx  │────→│  Sidebar UI  │
│  (data)      │     │  (sidebar)   │     │  (navigation)│
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  App.jsx     │────→│  Routes      │────→│  Pages       │
│  (routing)   │     │  (navigation)│     │  (content)   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                    │
                                                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  ToolPage.jsx│────→│toolRegistry.js│───→│  tools/*.jsx │
│  (tool page) │     │  (lazy map)  │     │  (tool impl) │
└──────────────┘     └──────────────┘     └──────────────┘
```

## Syntax Explanations

### JSX Files (.jsx)
JSX = JavaScript XML. Yeh React ka special syntax hai jo HTML jaisa dikhta hai lekin JavaScript hai.

```jsx
// Yeh JSX hai
<div className="container">
    <h1>Hello World</h1>
</div>
```

### JS Files (.js)
Regular JavaScript files. Yahan React components nahi hote, sirf data ya utility functions hote hain.

```js
// toolsData.js mein data hai
export const categories = [...];
export function getToolById(toolId) { ... }
```

## Keyword Explanations

| Keyword | Matlab |
|---------|--------|
| **Root** | Sabse upar ka folder |
| **Component** | Reusable UI piece |
| **Context** | Global state jo kai components mein use ho |
| **Page** | Route ke hisaab se dikhne wala full page |
| **Tool** | Ek specific utility (jaise word counter) |
| **Registry** | Mapping - kis ID se kaunsa component load hoga |
| **Lazy** | Sirf jab zaroori ho tab load hona |

## Best Practices

1. **Separation of Concerns** - Data alag (`toolsData.js`), Components alag (`components/`), Pages alag (`pages/`)
2. **Feature-based Organization** - Tools apne folder mein hain
3. **Consistent Naming** - Sab files `.jsx` ya `.js` hain based on content
4. **Barrel Exports** - `toolRegistry.js` sab tools ka single point of access hai

## Common Mistakes

1. ❌ Tools ko `pages/` folder mein daalna
2. ❌ Data ko `components/` mein rakhna
3. ❌ Har tool ke liye alag file banana (jabki group mein rakha hai)
4. ❌ `toolsData.js` aur `toolRegistry.js` ko confuse karna

## Interview Questions

1. **Q: Components aur Pages mein kya fark hai?**
   A: Components reusable hain (Layout, ToolWrapper). Pages route-specific hain (Home, CategoryPage, ToolPage).

2. **Q: Tools ko alag files mein kyun nahi rakha?**
   A: Performance ke liye. Agar 150+ files hoti toh bundler ko bahut saare chunks banane padte. 8 files mein group karke management easy hai.

3. **Q: `toolRegistry.js` aur `toolsData.js` mein kya fark hai?**
   A: `toolsData.js` mein data hai (names, IDs, categories). `toolRegistry.js` mein component mappings hain (tool ID → React component).

## Homework

1. Saare folders open karo aur dekho
2. Ek tool ka ID find karo `toolsData.js` mein
3. Us tool ka component find karo `toolRegistry.js` mein
4. Dekho kaun si file se component import hota hai

## Revision Notes

- Root level pe config files hain
- `src/` mein actual code hai
- `components/` = reusable UI
- `pages/` = route-specific pages
- `tools/` = tool implementations (8 files, 150+ tools)
- `context/` = global state
- Data flow: toolsData.js → Layout → Pages → toolRegistry.js → tools/*.jsx