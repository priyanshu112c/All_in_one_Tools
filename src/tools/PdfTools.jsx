import { useState } from 'react';
import ToolWrapper, { OutputBox } from '../components/ToolWrapper';
import { FileText } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

async function loadPdf(file) {
    const buf = await file.arrayBuffer();
    return PDFDocument.load(buf);
}

export function MergePdf() {
    const [files, setFiles] = useState([]);
    const [result, setResult] = useState(null);
    const merge = async () => {
        if (files.length < 2) return;
        const merged = await PDFDocument.create();
        for (const f of files) { const pdf = await loadPdf(f); const pages = await merged.copyPages(pdf, pdf.getPageIndices()); pages.forEach(p => merged.addPage(p)); }
        setResult(await merged.save());
    };
    return (
        <ToolWrapper title="Merge PDF" icon={FileText} description="Merge multiple PDF files into one">
            <label className="label">Select PDF Files (2 or more)</label>
            <input type="file" accept=".pdf" multiple onChange={e => setFiles([...e.target.files])} className="input-field" />
            <p className="text-sm text-gray-500 mt-1">{files.length} file(s) selected</p>
            <button className="btn-primary mt-3" onClick={merge} disabled={files.length < 2}>Merge PDFs</button>
            {result && <a href={URL.createObjectURL(new Blob([result], { type: 'application/pdf' }))} download="merged.pdf" className="btn-primary inline-block mt-3">Download Merged PDF</a>}
        </ToolWrapper>
    );
}

export function SplitPdf() {
    const [file, setFile] = useState(null); const [ranges, setRanges] = useState('1-3'); const [results, setResults] = useState([]);
    const split = async () => {
        if (!file) return;
        const pdf = await loadPdf(file);
        const total = pdf.getPageCount();
        const splitDocs = [];
        for (const range of ranges.split(',')) {
            const [start, end] = range.trim().split('-').map(Number);
            const newPdf = await PDFDocument.create();
            const pageIndices = [];
            for (let i = (start || 1) - 1; i < Math.min(end || start || 1, total); i++) pageIndices.push(i);
            const pages = await newPdf.copyPages(pdf, pageIndices);
            pages.forEach(p => newPdf.addPage(p));
            const bytes = await newPdf.save();
            splitDocs.push({ name: `pages_${range.trim()}.pdf`, blob: new Blob([bytes], { type: 'application/pdf' }) });
        }
        setResults(splitDocs);
    };
    return (
        <ToolWrapper title="Split PDF" icon={FileText} description="Split PDF into multiple files">
            <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="input-field" />
            <div className="mt-3"><label className="label">Page Ranges (e.g., 1-3, 4-6)</label><input className="input-field" value={ranges} onChange={e => setRanges(e.target.value)} placeholder="1-3, 4-6" /></div>
            <button className="btn-primary mt-3" onClick={split}>Split PDF</button>
            {results.map((r, i) => <a key={i} href={URL.createObjectURL(r.blob)} download={r.name} className="btn-outline inline-block mt-2 mr-2">Download {r.name}</a>)}
        </ToolWrapper>
    );
}

export function RotatePdf() {
    const [file, setFile] = useState(null); const [angle, setAngle] = useState(90); const [result, setResult] = useState(null);
    const rotate = async () => {
        if (!file) return;
        const pdf = await loadPdf(file);
        const rotated = await PDFDocument.create();
        const pages = await rotated.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(p => { p.setRotation(angle); rotated.addPage(p); });
        setResult(await rotated.save());
    };
    return (
        <ToolWrapper title="Rotate PDF" icon={FileText} description="Rotate all pages in a PDF">
            <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="input-field" />
            <div className="mt-3"><label className="label">Rotation Angle</label><select className="input-field" value={angle} onChange={e => setAngle(+e.target.value)}><option value={90}>90°</option><option value={180}>180°</option><option value={270}>270°</option></select></div>
            <button className="btn-primary mt-3" onClick={rotate}>Rotate</button>
            {result && <a href={URL.createObjectURL(new Blob([result], { type: 'application/pdf' }))} download="rotated.pdf" className="btn-primary inline-block mt-3">Download</a>}
        </ToolWrapper>
    );
}

export function DeletePdfPages() {
    const [file, setFile] = useState(null); const [pages, setPages] = useState(''); const [result, setResult] = useState(null);
    const del = async () => {
        if (!file) return;
        const pdf = await loadPdf(file);
        const delIndices = pages.split(',').map(p => parseInt(p.trim()) - 1).filter(i => i >= 0 && i < pdf.getPageCount());
        const newPdf = await PDFDocument.create();
        const keep = pdf.getPageIndices().filter(i => !delIndices.includes(i));
        const copiedPages = await newPdf.copyPages(pdf, keep);
        copiedPages.forEach(p => newPdf.addPage(p));
        setResult(await newPdf.save());
    };
    return (
        <ToolWrapper title="Delete PDF Pages" icon={FileText} description="Remove specific pages from a PDF">
            <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="input-field" />
            <div className="mt-3"><label className="label">Pages to Delete (comma separated, e.g., 1,3,5)</label><input className="input-field" value={pages} onChange={e => setPages(e.target.value)} placeholder="1,3,5" /></div>
            <button className="btn-primary mt-3" onClick={del}>Delete Pages</button>
            {result && <a href={URL.createObjectURL(new Blob([result], { type: 'application/pdf' }))} download="deleted.pdf" className="btn-primary inline-block mt-3">Download</a>}
        </ToolWrapper>
    );
}

export function ExtractPdfPages() {
    const [file, setFile] = useState(null); const [pages, setPages] = useState(''); const [result, setResult] = useState(null);
    const extract = async () => {
        if (!file) return;
        const pdf = await loadPdf(file);
        const indices = pages.split(',').map(p => parseInt(p.trim()) - 1).filter(i => i >= 0 && i < pdf.getPageCount());
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdf, indices);
        copiedPages.forEach(p => newPdf.addPage(p));
        setResult(await newPdf.save());
    };
    return (
        <ToolWrapper title="Extract PDF Pages" icon={FileText} description="Extract specific pages from a PDF">
            <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="input-field" />
            <div className="mt-3"><label className="label">Pages to Extract (comma separated)</label><input className="input-field" value={pages} onChange={e => setPages(e.target.value)} placeholder="1,3,5" /></div>
            <button className="btn-primary mt-3" onClick={extract}>Extract Pages</button>
            {result && <a href={URL.createObjectURL(new Blob([result], { type: 'application/pdf' }))} download="extracted.pdf" className="btn-primary inline-block mt-3">Download</a>}
        </ToolWrapper>
    );
}

export function CompressPdf() {
    const [file, setFile] = useState(null); const [result, setResult] = useState(null);
    const compress = async () => {
        if (!file) return;
        const pdf = await loadPdf(file);
        setResult(await pdf.save({ useObjectStreams: true }));
    };
    return (
        <ToolWrapper title="Compress PDF" icon={FileText} description="Compress PDF file size">
            <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="input-field" />
            {file && <p className="text-sm text-gray-500 mt-1">Original: {(file.size / 1024).toFixed(1)} KB</p>}
            <button className="btn-primary mt-3" onClick={compress}>Compress</button>
            {result && <p className="text-sm text-green-600 mt-2">Compressed: {(result.byteLength / 1024).toFixed(1)} KB — <a href={URL.createObjectURL(new Blob([result], { type: 'application/pdf' }))} download="compressed.pdf" className="underline">Download</a></p>}
        </ToolWrapper>
    );
}

export function AddPageNumbers() {
    const [file, setFile] = useState(null); const [result, setResult] = useState(null);
    const addNumbers = async () => {
        if (!file) return;
        const pdf = await loadPdf(file);
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page, i) => {
            const p = newPdf.addPage(page);
            p.drawText(`${i + 1}`, { x: p.getWidth() / 2 - 5, y: 30, size: 12 });
        });
        setResult(await newPdf.save());
    };
    return (
        <ToolWrapper title="Add Page Numbers" icon={FileText} description="Add page numbers to PDF">
            <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="input-field" />
            <button className="btn-primary mt-3" onClick={addNumbers}>Add Page Numbers</button>
            {result && <a href={URL.createObjectURL(new Blob([result], { type: 'application/pdf' }))} download="numbered.pdf" className="btn-primary inline-block mt-3">Download</a>}
        </ToolWrapper>
    );
}

export function PdfPageCounter() {
    const [file, setFile] = useState(null); const [count, setCount] = useState(null);
    const countPages = async () => {
        if (!file) return;
        const pdf = await loadPdf(file);
        setCount(pdf.getPageCount());
    };
    return (
        <ToolWrapper title="PDF Page Counter" icon={FileText} description="Count pages in a PDF">
            <input type="file" accept=".pdf" onChange={e => { setFile(e.target.files[0]); setCount(null); }} className="input-field" />
            <button className="btn-primary mt-3" onClick={countPages}>Count Pages</button>
            {count !== null && <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{count}</p><p className="text-sm text-gray-500">Pages</p></div>}
        </ToolWrapper>
    );
}