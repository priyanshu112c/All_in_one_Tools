import { useState, useCallback } from 'react';
import ToolWrapper from '../components/ToolWrapper';
import { FileText, FileSpreadsheet } from 'lucide-react';
import { saveAs } from 'file-saver';

// ==================== SHARED HELPERS ====================

function ConversionUI({ title, icon, description, accept, onConvert, outputLabel }) {
    const [file, setFile] = useState(null);
    const [converting, setConverting] = useState(false);
    const [message, setMessage] = useState('');

    const handleConvert = useCallback(async () => {
        if (!file) return;
        setConverting(true);
        setMessage('');
        try {
            await onConvert(file, setMessage);
        } catch (err) {
            setMessage('Error: ' + err.message);
        } finally {
            setConverting(false);
        }
    }, [file, onConvert]);

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        setFile(f);
        setMessage('');
    };

    return (
        <ToolWrapper title={title} icon={icon} description={description}>
            <div className="space-y-4">
                <div>
                    <label className="label">Select File</label>
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        className="input-field"
                    />
                </div>
                {file && (
                    <div className="card p-3 flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{file.name}</span>
                        <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                )}
                <button
                    className="btn-primary w-full"
                    onClick={handleConvert}
                    disabled={!file || converting}
                >
                    {converting ? 'Converting...' : 'Convert & Download'}
                </button>
                {message && (
                    <div className={`card p-3 text-sm ${message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </div>
                )}
            </div>
        </ToolWrapper>
    );
}

/**
 * Render a PDF page to a canvas at the given scale using pdfjs-dist.
 * Returns { canvas, viewport }.
 */
async function renderPdfPageToCanvas(page, scale = 2) {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    // Fill white background first (for pages with transparent backgrounds)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    return { canvas, viewport };
}

/**
 * Convert a canvas to a PNG Uint8Array.
 */
function canvasToPngBytes(canvas) {
    return new Promise((resolve) => {
        canvas.toBlob(async (blob) => {
            const ab = await blob.arrayBuffer();
            resolve(new Uint8Array(ab));
        }, 'image/png');
    });
}

/**
 * Convert a canvas to a base64 PNG data URL.
 */
function canvasToDataUrl(canvas) {
    return canvas.toDataURL('image/png');
}

// ==================== PDF -> DOCX ====================
// Renders every PDF page to a high-res canvas image, then embeds those
// images into a .docx document via the docx library's ImageRun. This
// preserves ALL visual content — images, tables, fonts, layout, colours.

export function PdfToDocx() {
    const handleConvert = useCallback(async (file, setMessage) => {
        setMessage('Reading PDF...');
        const arrayBuffer = await file.arrayBuffer();

        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
        ).href;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        const { Document, Packer, Paragraph, ImageRun, AlignmentType } = await import('docx');

        setMessage('Rendering pages...');
        const pageImageData = [];
        for (let i = 1; i <= pdf.numPages; i++) {
            setMessage(`Rendering page ${i} of ${pdf.numPages}...`);
            const pdfPage = await pdf.getPage(i);
            const { canvas, viewport } = await renderPdfPageToCanvas(pdfPage, 2);
            const pngBytes = await canvasToPngBytes(canvas);

            // A4 page width in EMU (English Metric Units): 210 mm ≈ 8.27 in = 7 560 000 EMU
            const emuWidth = 7560000;
            const emuHeight = Math.round(emuWidth * (viewport.height / viewport.width));

            pageImageData.push({ pngBytes, emuWidth, emuHeight });
        }

        setMessage('Building DOCX...');
        const children = pageImageData.map((img, idx) => {
            const imageRun = new ImageRun({
                data: img.pngBytes,
                transformation: {
                    width: img.emuWidth,
                    height: img.emuHeight,
                },
            });
            // Add a page break before each page except the first
            return new Paragraph({
                children: [imageRun],
                alignment: AlignmentType.CENTER,
                ...(idx > 0 ? { pageBreakBefore: true } : {}),
            });
        });

        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        size: { width: 11906, height: 16838 }, // A4 in TWIP
                        margin: { top: 0, bottom: 0, left: 0, right: 0 },
                    },
                },
                children,
            }],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, file.name.replace(/\.pdf$/i, '') + '.docx');
        setMessage('Conversion complete! File downloaded.');
    }, []);

    return (
        <ConversionUI
            title="PDF to DOCX"
            icon={FileText}
            description="Convert PDF documents to Word format — preserves layout, images, tables, fonts & styling"
            accept=".pdf"
            onConvert={handleConvert}
            outputLabel="DOCX"
        />
    );
}

// ==================== PDF -> XLSX ====================
// Renders every PDF page to a high-res canvas image, then creates an
// Excel-readable HTML file (.xls) with each page embedded as an image.
// This preserves ALL visual content.

export function PdfToXlsx() {
    const handleConvert = useCallback(async (file, setMessage) => {
        setMessage('Reading PDF...');
        const arrayBuffer = await file.arrayBuffer();

        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
        ).href;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        setMessage('Rendering pages...');
        const pageImages = [];
        for (let i = 1; i <= pdf.numPages; i++) {
            setMessage(`Rendering page ${i} of ${pdf.numPages}...`);
            const pdfPage = await pdf.getPage(i);
            const { canvas, viewport } = await renderPdfPageToCanvas(pdfPage, 2);
            const dataUrl = canvasToDataUrl(canvas);
            pageImages.push({ dataUrl, width: viewport.width, height: viewport.height });
        }

        setMessage('Building XLSX...');

        // Build an HTML document that Excel can open (.xls)
        let bodyHtml = '';
        pageImages.forEach((img, idx) => {
            const aspectRatio = img.height / img.width;
            const displayWidth = 800;
            const displayHeight = Math.round(displayWidth * aspectRatio);
            bodyHtml += `<div style="page-break-after: always; margin: 0; padding: 10px; text-align: center;">
                <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px; color: #333; font-family: Arial, sans-serif;">
                    Page ${idx + 1}
                </div>
                <img src="${img.dataUrl}" width="${displayWidth}" height="${displayHeight}"
                     style="max-width: 100%; height: auto; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
            </div>`;
        });

        const xlsHtml = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!--[if gte mso 9]>
    <xml>
        <x:ExcelWorkbook>
            <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                    <x:Name>PDF Pages</x:Name>
                    <x:WorksheetOptions>
                        <x:DisplayGridlines/>
                    </x:WorksheetOptions>
                </x:ExcelWorksheet>
            </x:ExcelWorksheets>
        </x:ExcelWorkbook>
    </xml>
    <![endif]-->
    <style>
        body { margin: 0; padding: 0; background: #fff; }
        img { -ms-interpolation-mode: bicubic; }
    </style>
</head>
<body>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 10px;">
                ${bodyHtml}
            </td>
        </tr>
    </table>
</body>
</html>`;

        const blob = new Blob([xlsHtml], {
            type: 'application/vnd.ms-excel',
        });
        saveAs(blob, file.name.replace(/\.pdf$/i, '') + '.xls');
        setMessage('Conversion complete! File downloaded.');
    }, []);

    return (
        <ConversionUI
            title="PDF to Excel"
            icon={FileSpreadsheet}
            description="Convert PDF documents to Excel format — preserves layout, images, tables, fonts & styling"
            accept=".pdf"
            onConvert={handleConvert}
            outputLabel="XLSX"
        />
    );
}

// ==================== DOCX -> PDF ====================
// Uses mammoth to extract rich HTML from the DOCX (with images, formatting,
// tables), renders it to a canvas with html2canvas, then creates a
// high-fidelity multi-page PDF via jsPDF — all auto-downloaded.

export function DocxToPdf() {
    const handleConvert = useCallback(async (file, setMessage) => {
        setMessage('Reading DOCX...');
        const arrayBuffer = await file.arrayBuffer();

        const mammoth = await import('mammoth');
        const result = await mammoth.convertToHtml({
            arrayBuffer,
            convertImage: mammoth.images.imgElement((image) => {
                return image.read("base64").then((imageBuffer) => {
                    return {
                        src: `data:${image.contentType};base64,${imageBuffer}`,
                    };
                });
            }),
        });
        const html = result.value;

        if (!html || html.trim().length === 0) {
            throw new Error('No content found in DOCX file');
        }

        setMessage('Generating PDF...');
        const jsPDF = (await import('jspdf')).default;
        const html2canvas = (await import('html2canvas')).default;

        // Build a full HTML document styled for print
        const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #000;
            background: #fff;
            padding: 72pt;
            max-width: 100%;
        }
        h1 { font-size: 24pt; font-weight: bold; margin: 18pt 0 9pt; }
        h2 { font-size: 18pt; font-weight: bold; margin: 14pt 0 8pt; }
        h3 { font-size: 14pt; font-weight: bold; margin: 10pt 0 6pt; }
        h4 { font-size: 12pt; font-weight: bold; margin: 8pt 0 4pt; }
        p { margin: 6pt 0; }
        table { border-collapse: collapse; width: 100%; margin: 10pt 0; }
        td, th { border: 1px solid #000; padding: 5pt 8pt; text-align: left; vertical-align: top; }
        th { background-color: #e8e8e8; font-weight: bold; }
        img { max-width: 100%; height: auto; }
        ul, ol { margin: 6pt 0 6pt 30pt; }
        li { margin: 3pt 0; }
        blockquote { margin: 8pt 24pt; font-style: italic; color: #444; border-left: 3px solid #ccc; padding-left: 12pt; }
        pre, code { font-family: 'Courier New', Courier, monospace; background: #f5f5f5; padding: 1pt 3pt; border-radius: 2pt; }
        pre { padding: 8pt; overflow-x: auto; }
    </style>
</head>
<body>${html}</body>
</html>`;

        // Create a temporary offscreen container for rendering
        const container = document.createElement('div');
        container.innerHTML = fullHtml;
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '794px'; // A4 width at 96dpi
        container.style.background = '#fff';
        document.body.appendChild(container);

        // Wait for images/fonts to fully load
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Capture the full rendered content with html2canvas
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            width: container.scrollWidth,
            height: container.scrollHeight,
            onclone: (clonedDoc) => {
                const imgs = clonedDoc.querySelectorAll('img');
                return Promise.all(
                    Array.from(imgs).map(
                        (img) =>
                            new Promise((res) => {
                                if (img.complete) res();
                                else { img.onload = res; img.onerror = res; }
                            })
                    )
                );
            },
        });

        document.body.removeChild(container);

        // Create PDF with jsPDF — multi-page support
        const PDF_WIDTH = 595.28;
        const PDF_HEIGHT = 841.89;

        const pdf = new jsPDF('p', 'pt', 'a4');

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = PDF_WIDTH / imgWidth;
        const scaledHeight = imgHeight * ratio;

        let heightLeft = scaledHeight;
        let yOffset = 0;

        pdf.addImage(canvas, 'PNG', 0, yOffset, PDF_WIDTH, scaledHeight);
        heightLeft -= PDF_HEIGHT;

        while (heightLeft > 0) {
            yOffset -= PDF_HEIGHT;
            pdf.addPage();
            pdf.addImage(canvas, 'PNG', 0, yOffset, PDF_WIDTH, scaledHeight);
            heightLeft -= PDF_HEIGHT;
        }

        pdf.save(file.name.replace(/\.docx$/i, '') + '.pdf');
        setMessage('Conversion complete! File downloaded.');
    }, []);

    return (
        <ConversionUI
            title="DOCX to PDF"
            icon={FileText}
            description="Convert Word documents to PDF — preserves layout, images, tables, fonts & styling"
            accept=".docx"
            onConvert={handleConvert}
            outputLabel="PDF"
        />
    );
}

// ==================== XLSX -> PDF ====================
// Uses SheetJS to build a styled HTML table from the spreadsheet, renders
// it to canvas via html2canvas, then creates a multi-page PDF via jsPDF.

export function XlsxToPdf() {
    const handleConvert = useCallback(async (file, setMessage) => {
        setMessage('Reading XLSX...');
        const arrayBuffer = await file.arrayBuffer();

        const XLSX = await import('xlsx');
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        setMessage('Generating PDF...');

        // Build a styled HTML representation of all sheets
        let allHtml = '';
        const sheetNames = workbook.SheetNames;

        for (let sIdx = 0; sIdx < sheetNames.length; sIdx++) {
            const sheetName = sheetNames[sIdx];
            const worksheet = workbook.Sheets[sheetName];

            const rawHtml = XLSX.utils.sheet_to_html(worksheet, { editable: false });

            allHtml += `
                <div class="sheet-section" style="page-break-after: ${sIdx < sheetNames.length - 1 ? 'always' : 'avoid'}; margin-bottom: 24pt;">
                    <div style="font-size: 18pt; font-weight: bold; margin-bottom: 12pt; color: #1a1a1a; font-family: 'Segoe UI', Arial, sans-serif; border-bottom: 2px solid #4472C4; padding-bottom: 6pt;">
                        ${sheetName}
                    </div>
                    <div style="overflow-x: auto;">
                        ${rawHtml}
                    </div>
                </div>`;
        }

        if (!allHtml) {
            throw new Error('No data found in XLSX file');
        }

        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        * { box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            font-size: 10pt;
            color: #000;
            background: #fff;
            padding: 36pt;
            margin: 0;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            font-size: 10pt;
            font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
        }
        td, th {
            border: 1px solid #d0d0d0;
            padding: 4pt 8pt;
            text-align: left;
            vertical-align: top;
            white-space: nowrap;
        }
        th {
            background-color: #4472C4;
            color: #fff;
            font-weight: bold;
        }
        tr:nth-child(even) td {
            background-color: #f5f7fa;
        }
        .sheet-section {
            margin-bottom: 24pt;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        td[data-num-fmt] {
            font-variant-numeric: tabular-nums;
        }
    </style>
</head>
<body>${allHtml}</body>
</html>`;

        const jsPDF = (await import('jspdf')).default;
        const html2canvas = (await import('html2canvas')).default;

        // Create offscreen container
        const container = document.createElement('div');
        container.innerHTML = fullHtml;
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '900px';
        container.style.background = '#fff';
        document.body.appendChild(container);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            width: container.scrollWidth,
            height: container.scrollHeight,
        });

        document.body.removeChild(container);

        const PDF_WIDTH = 841.89;
        const PDF_HEIGHT = 595.28;

        const pdf = new jsPDF('l', 'pt', 'a4'); // Landscape

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = PDF_WIDTH / imgWidth;
        const scaledHeight = imgHeight * ratio;

        let heightLeft = scaledHeight;
        let yOffset = 0;

        pdf.addImage(canvas, 'PNG', 0, yOffset, PDF_WIDTH, scaledHeight);
        heightLeft -= PDF_HEIGHT;

        while (heightLeft > 0) {
            yOffset -= PDF_HEIGHT;
            pdf.addPage();
            pdf.addImage(canvas, 'PNG', 0, yOffset, PDF_WIDTH, scaledHeight);
            heightLeft -= PDF_HEIGHT;
        }

        pdf.save(file.name.replace(/\.(xlsx|xls)$/i, '') + '.pdf');
        setMessage('Conversion complete! File downloaded.');
    }, []);

    return (
        <ConversionUI
            title="Excel to PDF"
            icon={FileSpreadsheet}
            description="Convert Excel spreadsheets to PDF — preserves tables, formatting & styling"
            accept=".xlsx,.xls"
            onConvert={handleConvert}
            outputLabel="PDF"
        />
    );
}