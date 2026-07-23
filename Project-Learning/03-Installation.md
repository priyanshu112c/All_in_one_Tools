# Lesson 03: Installation & Setup Guide

## Purpose

Yeh lesson aapko step-by-step batata hai ki project ko kaise install aur run karte hain.

## Why this file exists

Koi bhi naya developer jab project clone kare, toh usse pata hona chahiye ki kaise setup karna hai. Yeh lesson wohi guide karta hai.

## Prerequisites

Pehle yeh cheezein install honi chahiye:

| Tool | Version | Kaise Check Karein |
|------|---------|-------------------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | Any | `git --version` |

## Installation Steps

### Step 1: Project Clone/Download

```bash
# Agar Git se clone karna ho
git clone <repository-url>
cd auto_short

# Ya manually folder download karke
cd auto_short
```

### Step 2: Dependencies Install

```bash
npm install
```

Yeh command `package.json` ke `dependencies` aur `devDependencies` ko install karta hai. Bahut saare packages hain toh thoda time lagega.

### Step 3: Dev Server Start

```bash
npm run dev
```

Yeh Vite dev server start karta hai. Default port **5173** hota hai.

Browser mein kholo: `http://localhost:5173`

### Step 4: Build for Production

```bash
npm run build
```

Yeh optimized build banata hai `dist/` folder mein. Production ke liye use hota hai.

### Step 5: Preview Production Build

```bash
npm run preview
```

Build ke baad locally preview karne ke liye.

## npm Scripts Explained

```json
{
    "scripts": {
        "dev": "vite",           // Development server start
        "build": "vite build",   // Production build
        "preview": "vite preview" // Build preview
    }
}
```

| Script | Kya Karta Hai |
|--------|---------------|
| `npm run dev` | Hot reload dev server start karta hai. Changes instantly dikhenge |
| `npm run build` | Optimized production build banata hai |
| `npm run preview` | Production build ko locally serve karta hai |

## Package.json Dependencies

### Production Dependencies (dependencies)

| Package | Kya Karta Hai |
|---------|---------------|
| `react` | UI library |
| `react-dom` | React ko DOM mein render karta hai |
| `react-router-dom` | Client-side routing |
| `framer-motion` | Smooth animations |
| `lucide-react` | Beautiful icons |
| `tailwindcss` | Utility-first CSS |
| `pdf-lib` | PDF manipulation (merge, split, etc.) |
| `mathjs` | Scientific calculations |
| `crypto-js` | Encryption & hashing |
| `marked` | Markdown to HTML conversion |
| `html2canvas` | Screenshot functionality |
| `jszip` | ZIP file creation |
| `qrcode` | QR code generation |
| `jsqr` | QR code scanning |
| `browser-image-compression` | Client-side image compression |
| `cropperjs` | Image cropping |
| `file-saver` | File download |
| `dayjs` | Date/time manipulation |

### Development Dependencies (devDependencies)

| Package | Kya Karta Hai |
|---------|---------------|
| `vite` | Build tool & dev server |
| `@vitejs/plugin-react` | React support for Vite |
| `autoprefixer` | CSS vendor prefixes |
| `postcss` | CSS transformations |
| `@types/react` | TypeScript types (for IDE support) |
| `@types/react-dom` | TypeScript types for react-dom |

## Execution Flow

```
npm run dev
      │
      ▼
Vite Dev Server Start
      │
      ▼
index.html Serve (port 5173)
      │
      ▼
main.jsx Load
      │
      ▼
React App Mount (StrictMode)
      │
      ▼
App.jsx → Routes → Layout → Pages → Tools
```

## Common Issues & Solutions

### Issue 1: `npm install` bahut slow hai

```bash
# Mirror use karo
npm config set registry https://registry.npmmirror.com
npm install
```

### Issue 2: Port 5173 already in use

```bash
# Vite config mein port change karo
# vite.config.js
export default defineConfig({
    server: { port: 3000 }
})
```

### Issue 3: `node_modules` delete karke fresh install

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue 4: Tailwind CSS kaam nahi kar raha

```bash
# PostCSS aur Tailwind check karo
# postcss.config.js mein Tailwind plugin hona chahiye
# tailwind.config.js mein content paths sahi hone chahiye
```

## Keyword Explanations

| Keyword | Matlab |
|---------|--------|
| **npm** | Node Package Manager - packages install karne ke liye |
| **node_modules** | Installed packages ka folder |
| **Hot Reload** | Code change karte hi browser mein automatically update |
| **Build** | Production-ready code banana (minified, optimized) |
| **Dev Server** | Development ke liye local server |
| **Port** | Network connection number (default 5173) |

## Real-life Analogy

Installation ek **restaurant setup** ki tarah hai:
1. `npm install` = Saaman mangwana (ingredients)
2. `npm run dev` = Kitchen start karna (server start)
3. Browser = Restaurant ka dining area (user interface)
4. `npm run build` = Ready-to-serve food (production build)

## Best Practices

1. **Fresh Install** - Naye project mein hamesha `npm install` se start karo
2. **Lock File** - `package-lock.json` commit karo (consistent installs)
3. **Node Version** - `.nvmrc` file se Node version lock karo
4. **No Global Installs** - Local dependencies prefer karo

## Interview Questions

1. **Q: `npm install` aur `npm ci` mein kya fark hai?**
   A: `npm install` flexible hai, `npm ci` strict hai aur `package-lock.json` exact follow karta hai. CI/CD mein `npm ci` use karte hain.

2. **Q: `node_modules` ko Git mein commit kyun nahi karte?**
   A: Bahut bada hota hai (100MB+). `package.json` aur `package-lock.json` se dobara install ho sakta hai.

3. **Q: Vite vs Webpack mein kya fark hai?**
   A: Vite faster hai kyunki woh ESM-based dev server use karta hai. Webpack bundling karta hai development mein bhi.

## Homework

1. Project install karo aur dev server run karo
2. Browser mein kholo aur dekho
3. Ek file change karo aur dekho hot reload kaam karta hai ya nahi
4. `npm run build` karo aur `dist/` folder dekho

## Revision Notes

- `npm install` se dependencies install hoti hain
- `npm run dev` se dev server start hota hai (port 5173)
- `npm run build` se production build banti hai
- `package.json` mein saari dependencies hain
- Vite fast build tool hai