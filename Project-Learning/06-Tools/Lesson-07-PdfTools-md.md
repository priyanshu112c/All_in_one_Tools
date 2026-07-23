# Lesson 07: src/tools/PdfTools.jsx - PDF Tools (8+ Tools)

## Tools Included

| Tool | Kya karta hai |
|------|---------------|
| PDFMerger | Merge multiple PDFs |
| PDFSplitter | Split PDF into pages |
| PDFRotator | Rotate PDF pages |
| PDFPageRemover | Remove specific pages |
| PDFMetadataEditor | Edit title, author |
| PDFPreview | Preview PDF pages |
| PDFToImages | PDF pages → images |
| ImageToPDF | Images → PDF |

## Key Library

```js
import { PDFDocument } from 'pdf-lib';

// Usage:
const pdfDoc = await PDFDocument.create();
const page = pdfDoc.addPage([595, 842]); // A4 size
```

## Common Pattern

```jsx
export function PDFMerger() {
    const [files, setFiles] = useState([]);
    const [mergedUrl, setMergedUrl] = useState(null);

    const handleMerge = async () => {
        const mergedPdf = await PDFDocument.create();
        for (const file of files) {
            const pdfBytes = await file.arrayBuffer();
            const pdf = await PDFDocument.load(pdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach(page => mergedPdf.addPage(page));
        }
        const mergedBytes = await mergedPdf.save();
        const blob = new Blob([mergedBytes], { type: 'application/pdf' });
        setMergedUrl(URL.createObjectURL(blob));
    };

    return ( /* UI */ );
}
```

## Interview Questions

1. **Q: `pdf-lib` browser mein kaise kaam karta hai?**
   A: Pure JavaScript library hai. Canvas ya server ki zaroorat nahi. File reader se ArrayBuffer mein convert karte hain aur pdf-lib manipulate karta hai.

## Revision Notes

- 8+ PDF tools using pdf-lib
- All client-side processing
- Pattern: File input → ArrayBuffer → PDFDocument → Manipulate → Save