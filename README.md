# AutoTools - All-in-One Web Toolkit

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)

A modern, feature-rich web application with **150+ tools** across **17 categories** — all running entirely in the browser. No server required, no data leaves your machine.

![AutoTools Screenshot](https://placehold.co/800x450/1a1a2e/e0e0e0?text=AutoTools+Preview)

## Features

- **150+ Tools** — Text manipulation, image editing, PDF operations, unit conversion, calculators, developer utilities, and more
- **Zero Server Dependency** — All processing happens client-side; your data stays private
- **Dark/Light Theme** — Toggle between dark and light mode
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Fast Load Times** — Code-split with lazy loading per tool
- **Smooth Animations** — Powered by Framer Motion

## Tool Categories

| Category | Tools |
|----------|-------|
| **Text Tools** | Word/character/sentence/paragraph counter, case converter, text reverser, sort/shuffle lines, lorem ipsum generator, URL/HTML encoder/decoder, morse code, and more |
| **Developer Tools** | JSON/XML/HTML/CSS/JS/SQL formatter & minifier, regex tester, Base64 encode/decode, JWT decoder, hash generators, UUID generator, cron expression generator |
| **Calculator Tools** | Percentage, age, date difference, GPA/CGPA, EMI/loan/SIP/FD calculators, discount/GST/VAT/profit/loss, tip & split bill calculators |
| **Math Tools** | Scientific calculator, fraction calculator, LCM/HCF, prime checker/generator, number-to-words, roman numeral converter, dice roller, coin flip |
| **Color Tools** | Color picker, HEX/RGB/HSL/CMYK converters, palette generator, gradient generator, contrast checker |
| **Image Tools** | Compressor, resizer, crop, rotate, flip, format converter (PNG/JPG/WEBP), brightness/contrast adjuster, grayscale, watermark, metadata viewer |
| **PDF Tools** | Merge, split, rotate, delete/extract pages, compress, add page numbers, page counter |
| **File Conversion** | PDF ↔ DOCX, PDF ↔ Excel |
| **QR & Barcode** | QR code generator/scanner, WiFi/WhatsApp/Email/SMS/vCard QR, barcode generator |
| **Password & Security** | Password generator, strength checker, PIN/OTP/username generators |
| **Date & Time** | Age calculator, countdown timer, stopwatch, digital clock, timezone converter, calendar generator |
| **SEO Tools** | Meta tag generator, Open Graph generator, robots.txt/sitemap generator, keyword density checker |
| **Social Media** | YouTube title checker/tag formatter, hashtag generator, Instagram caption formatter, tweet character counter |
| **File Tools** | File size converter, ZIP size estimator, file extension & MIME type checker |
| **Unit Converters** | Length, weight, area, volume, temperature, speed, time, currency, storage, energy, pressure |
| **Fun Tools** | Random name picker, team generator, quote generator, spin wheel, decision maker |

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3, PostCSS, Autoprefixer
- **Routing:** React Router v6
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Key Libraries:** jsPDF, pdf-lib, pdfjs-dist, crypto-js, mathjs, dayjs, xlsx, docx, mammoth, jszip, qrcode, jsqr, cropperjs, browser-image-compression, html2canvas, file-saver, marked

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/auto-tools.git
cd auto-tools

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Shared UI components (Layout, ToolWrapper)
├── context/          # React contexts (ThemeContext)
├── pages/            # Route pages (Home, CategoryPage, ToolPage)
├── tools/            # Tool implementations by category
│   ├── TextTools.jsx
│   ├── DeveloperTools.jsx
│   ├── CalculatorTools.jsx
│   ├── MathTools.jsx
│   ├── ColorTools.jsx
│   ├── ImageTools.jsx
│   ├── PdfTools.jsx
│   ├── FileConversionTools.jsx
│   └── MiscTools.jsx
├── App.jsx           # Root component with router setup
├── main.jsx          # Entry point
├── toolsData.js      # Tool definitions and metadata
└── toolRegistry.js   # Lazy-loaded tool registration
```

## License

[MIT](LICENSE)
