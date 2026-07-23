import { useState, useRef, useCallback } from 'react';
import ToolWrapper, { OutputBox } from '../components/ToolWrapper';
import { Image } from 'lucide-react';
import imageCompression from 'browser-image-compression';

function ImageUpload({ onImage, preview }) {
    return (
        <div>
            <label className="label">Upload Image</label>
            <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if (f) { const reader = new FileReader(); reader.onload = ev => onImage(ev.target.result, f); reader.readAsDataURL(f); } }} className="input-field" />
            {preview && <img src={preview} alt="Preview" className="mt-3 max-h-64 rounded-lg border" />}
        </div>
    );
}

export function ImageCompressor() {
    const [img, setImg] = useState(null); const [result, setResult] = useState(''); const [loading, setLoading] = useState(false);
    const compress = async () => {
        if (!img) return; setLoading(true);
        try {
            const blob = await imageCompression(img, { maxSizeMB: 0.1, maxWidthOrHeight: 1024 });
            setResult(URL.createObjectURL(blob));
        } catch (e) { setResult('Error: ' + e.message); }
        setLoading(false);
    };
    return (
        <ToolWrapper title="Image Compressor" icon={Image} description="Compress images in browser">
            <ImageUpload onImage={(_, f) => setImg(f)} />
            <button className="btn-primary mt-3" onClick={compress} disabled={loading}>{loading ? 'Compressing...' : 'Compress'}</button>
            {result && typeof result === 'string' && result.startsWith('blob:') && <div className="mt-4"><img src={result} alt="Compressed" className="max-h-64 rounded-lg" /><a href={result} download="compressed.jpg" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

export function ImageResizer() {
    const [img, setImg] = useState(null); const [w, setW] = useState(800); const [h, setH] = useState(600); const [result, setResult] = useState('');
    const resize = () => {
        if (!img) return;
        const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        const image = new window.Image();
        image.onload = () => { ctx.drawImage(image, 0, 0, w, h); setResult(canvas.toDataURL()); };
        image.src = img;
    };
    return (
        <ToolWrapper title="Image Resizer" icon={Image} description="Resize images to custom dimensions">
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <div className="grid grid-cols-2 gap-3 mt-3">
                <div><label className="label">Width (px)</label><input className="input-field" type="number" value={w} onChange={e => setW(+e.target.value)} /></div>
                <div><label className="label">Height (px)</label><input className="input-field" type="number" value={h} onChange={e => setH(+e.target.value)} /></div>
            </div>
            <button className="btn-primary mt-3" onClick={resize}>Resize</button>
            {result && <div className="mt-4"><img src={result} alt="Resized" className="max-h-64 rounded-lg" /><a href={result} download="resized.png" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

export function CropImage() {
    const [img, setImg] = useState(null);
    const [result, setResult] = useState('');
    const [cropX, setCropX] = useState(0);
    const [cropY, setCropY] = useState(0);
    const [cropW, setCropW] = useState(100);
    const [cropH, setCropH] = useState(100);
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [selection, setSelection] = useState(null);
    const imgRef = useRef(null);
    const overlayRef = useRef(null);

    const getRelativePos = (e) => {
        const rect = imgRef.current.getBoundingClientRect();
        return {
            x: Math.max(0, Math.min(e.clientX - rect.left, rect.width)),
            y: Math.max(0, Math.min(e.clientY - rect.top, rect.height)),
        };
    };

    const toPixelCoords = (pos) => {
        const rect = imgRef.current.getBoundingClientRect();
        const img = imgRef.current;
        return {
            x: Math.round((pos.x / rect.width) * img.naturalWidth),
            y: Math.round((pos.y / rect.height) * img.naturalHeight),
        };
    };

    const handleMouseDown = (e) => {
        if (!img) return;
        const pos = getRelativePos(e);
        setDragging(true);
        setStartPos(pos);
        setSelection({ x: pos.x, y: pos.y, w: 0, h: 0 });
        setResult('');
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const pos = getRelativePos(e);
        setSelection({
            x: Math.min(startPos.x, pos.x),
            y: Math.min(startPos.y, pos.y),
            w: Math.abs(pos.x - startPos.x),
            h: Math.abs(pos.y - startPos.y),
        });
    };

    const handleMouseUp = (e) => {
        if (!dragging) return;
        setDragging(false);
        const pos = getRelativePos(e);
        const rect = imgRef.current.getBoundingClientRect();
        const finalX = Math.min(startPos.x, pos.x);
        const finalY = Math.min(startPos.y, pos.y);
        const finalW = Math.abs(pos.x - startPos.x);
        const finalH = Math.abs(pos.y - startPos.y);
        if (finalW < 5 || finalH < 5) {
            setSelection(null);
            return;
        }
        const pixel = {
            x: Math.round((finalX / rect.width) * imgRef.current.naturalWidth),
            y: Math.round((finalY / rect.height) * imgRef.current.naturalHeight),
            w: Math.round((finalW / rect.width) * imgRef.current.naturalWidth),
            h: Math.round((finalH / rect.height) * imgRef.current.naturalHeight),
        };
        setCropX(pixel.x);
        setCropY(pixel.y);
        setCropW(pixel.w);
        setCropH(pixel.h);
    };

    const handleMouseMoveGlobal = (e) => {
        if (dragging && imgRef.current) {
            const pos = getRelativePos(e);
            setSelection({
                x: Math.min(startPos.x, pos.x),
                y: Math.min(startPos.y, pos.y),
                w: Math.abs(pos.x - startPos.x),
                h: Math.abs(pos.y - startPos.y),
            });
        }
    };

    const handleMouseUpGlobal = (e) => {
        if (dragging && imgRef.current) {
            const pos = getRelativePos(e);
            const rect = imgRef.current.getBoundingClientRect();
            const finalX = Math.min(startPos.x, pos.x);
            const finalY = Math.min(startPos.y, pos.y);
            const finalW = Math.abs(pos.x - startPos.x);
            const finalH = Math.abs(pos.y - startPos.y);
            setDragging(false);
            if (finalW < 5 || finalH < 5) {
                setSelection(null);
                return;
            }
            const pixel = {
                x: Math.round((finalX / rect.width) * imgRef.current.naturalWidth),
                y: Math.round((finalY / rect.height) * imgRef.current.naturalHeight),
                w: Math.round((finalW / rect.width) * imgRef.current.naturalWidth),
                h: Math.round((finalH / rect.height) * imgRef.current.naturalHeight),
            };
            setCropX(pixel.x);
            setCropY(pixel.y);
            setCropW(pixel.w);
            setCropH(pixel.h);
        }
    };

    const crop = () => {
        if (!img) return;
        const image = new window.Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = cropW;
            canvas.height = cropH;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
            setResult(canvas.toDataURL('image/png'));
        };
        image.src = img;
    };

    return (
        <ToolWrapper title="Crop Image" icon={Image} description="Crop images visually">
            <ImageUpload onImage={(data) => { setImg(data); setResult(''); setSelection(null); }} preview={img} />
            {img && (
                <div
                    className="mt-3 relative inline-block max-w-full"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMoveGlobal}
                    onMouseUp={handleMouseUpGlobal}
                    onMouseLeave={() => { if (dragging) { setDragging(false); setSelection(null); } }}
                    style={{ userSelect: 'none', cursor: 'crosshair' }}
                >
                    <img
                        ref={imgRef}
                        src={img}
                        alt="To crop"
                        className="max-h-96 rounded-lg border pointer-events-none"
                        onLoad={() => { setSelection(null); setResult(''); }}
                    />
                    {selection && selection.w > 0 && selection.h > 0 && (
                        <>
                            <div
                                className="absolute border-2 border-dashed border-blue-500 pointer-events-none"
                                style={{
                                    left: selection.x + 'px',
                                    top: selection.y + 'px',
                                    width: selection.w + 'px',
                                    height: selection.h + 'px',
                                }}
                            />
                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                <div className="absolute bg-black/40" style={{ top: 0, left: 0, right: 0, height: selection.y + 'px' }} />
                                <div className="absolute bg-black/40" style={{ top: 0, left: 0, width: selection.x + 'px', height: '100%' }} />
                                <div className="absolute bg-black/40" style={{ top: 0, left: (selection.x + selection.w) + 'px', right: 0, height: '100%' }} />
                                <div className="absolute bg-black/40" style={{ top: (selection.y + selection.h) + 'px', left: 0, right: 0, bottom: 0 }} />
                            </div>
                            <div className="absolute text-xs bg-blue-500 text-white px-1 py-0.5 rounded pointer-events-none" style={{ left: selection.x + 'px', top: (selection.y - 22) + 'px' }}>
                                {Math.round(selection.w)} × {Math.round(selection.h)}
                            </div>
                        </>
                    )}
                </div>
            )}
            {img && (
                <div className="mt-3 flex flex-wrap gap-3 items-end">
                    <div className="w-20"><label className="label text-xs">X</label><input className="input-field text-sm" type="number" min="0" value={cropX} onChange={e => setCropX(+e.target.value)} /></div>
                    <div className="w-20"><label className="label text-xs">Y</label><input className="input-field text-sm" type="number" min="0" value={cropY} onChange={e => setCropY(+e.target.value)} /></div>
                    <div className="w-20"><label className="label text-xs">Width</label><input className="input-field text-sm" type="number" min="1" value={cropW} onChange={e => setCropW(+e.target.value)} /></div>
                    <div className="w-20"><label className="label text-xs">Height</label><input className="input-field text-sm" type="number" min="1" value={cropH} onChange={e => setCropH(+e.target.value)} /></div>
                    <button className="btn-primary" onClick={crop}>Crop</button>
                    <button className="btn-secondary" onClick={() => { setSelection(null); setResult(''); }}>Reset</button>
                </div>
            )}
            {result && (
                <div className="mt-4">
                    <p className="label mb-2">Cropped Result ({cropW} × {cropH}px)</p>
                    <img src={result} alt="Cropped" className="max-h-64 rounded-lg border" />
                    <a href={result} download="cropped.png" className="btn-primary inline-block mt-2">Download Cropped</a>
                </div>
            )}
        </ToolWrapper>
    );
}

export function RotateImage() {
    const [img, setImg] = useState(null); const [angle, setAngle] = useState(90); const [result, setResult] = useState('');
    const rotate = () => {
        if (!img) return;
        const canvas = document.createElement('canvas');
        const image = new window.Image();
        image.onload = () => {
            const rad = angle * Math.PI / 180;
            const sin = Math.abs(Math.sin(rad)), cos = Math.abs(Math.cos(rad));
            canvas.width = image.width * cos + image.height * sin;
            canvas.height = image.width * sin + image.height * cos;
            const ctx = canvas.getContext('2d');
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(rad);
            ctx.drawImage(image, -image.width / 2, -image.height / 2);
            setResult(canvas.toDataURL());
        };
        image.src = img;
    };
    return (
        <ToolWrapper title="Rotate Image" icon={Image} description="Rotate images by any angle">
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <div className="flex gap-3 items-end mt-3">
                <div className="flex-1"><label className="label">Angle (degrees)</label><input className="input-field" type="number" value={angle} onChange={e => setAngle(+e.target.value)} /></div>
                <button className="btn-primary" onClick={rotate}>Rotate</button>
            </div>
            {result && <div className="mt-4"><img src={result} alt="Rotated" className="max-h-64 rounded-lg" /><a href={result} download="rotated.png" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

export function FlipImage() {
    const [img, setImg] = useState(null); const [result, setResult] = useState('');
    const flip = (dir) => {
        if (!img) return;
        const canvas = document.createElement('canvas');
        const image = new window.Image();
        image.onload = () => {
            canvas.width = image.width; canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            if (dir === 'h') { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
            else { ctx.translate(0, canvas.height); ctx.scale(1, -1); }
            ctx.drawImage(image, 0, 0); setResult(canvas.toDataURL());
        };
        image.src = img;
    };
    return (
        <ToolWrapper title="Flip Image" icon={Image} description="Flip images horizontally or vertically">
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <div className="flex gap-2 mt-3">
                <button className="btn-primary" onClick={() => flip('h')}>Flip Horizontal</button>
                <button className="btn-primary" onClick={() => flip('v')}>Flip Vertical</button>
            </div>
            {result && <div className="mt-4"><img src={result} alt="Flipped" className="max-h-64 rounded-lg" /><a href={result} download="flipped.png" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

function convertImage(img, fromType, toType) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const image = new window.Image();
        image.onload = () => { canvas.width = image.width; canvas.height = image.height; canvas.getContext('2d').drawImage(image, 0, 0); resolve(canvas.toDataURL(`image/${toType}`)); };
        image.src = img;
    });
}

export function PngToJpg() {
    const [img, setImg] = useState(null); const [result, setResult] = useState('');
    const convert = async () => { if (!img) return; setResult(await convertImage(img, 'png', 'jpeg')); };
    return (
        <ToolWrapper title="PNG to JPG" icon={Image} description="Convert PNG images to JPG format">
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <button className="btn-primary mt-3" onClick={convert}>Convert</button>
            {result && <div className="mt-4"><img src={result} alt="Converted" className="max-h-64 rounded-lg" /><a href={result} download="converted.jpg" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

export function JpgToPng() {
    const [img, setImg] = useState(null); const [result, setResult] = useState('');
    const convert = async () => { if (!img) return; setResult(await convertImage(img, 'jpg', 'png')); };
    return (
        <ToolWrapper title="JPG to PNG" icon={Image} description="Convert JPG images to PNG format">
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <button className="btn-primary mt-3" onClick={convert}>Convert</button>
            {result && <div className="mt-4"><img src={result} alt="Converted" className="max-h-64 rounded-lg" /><a href={result} download="converted.png" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

export function WebpToJpg() {
    const [img, setImg] = useState(null); const [result, setResult] = useState('');
    const convert = async () => { if (!img) return; setResult(await convertImage(img, 'webp', 'jpeg')); };
    return (
        <ToolWrapper title="WEBP to JPG" icon={Image} description="Convert WEBP to JPG format">
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <button className="btn-primary mt-3" onClick={convert}>Convert</button>
            {result && <div className="mt-4"><img src={result} alt="Converted" className="max-h-64 rounded-lg" /><a href={result} download="converted.jpg" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

export function JpgToWebp() {
    const [img, setImg] = useState(null); const [result, setResult] = useState('');
    const convert = async () => { if (!img) return; setResult(await convertImage(img, 'jpg', 'webp')); };
    return (
        <ToolWrapper title="JPG to WEBP" icon={Image} description="Convert JPG to WEBP format">
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <button className="btn-primary mt-3" onClick={convert}>Convert</button>
            {result && <div className="mt-4"><img src={result} alt="Converted" className="max-h-64 rounded-lg" /><a href={result} download="converted.webp" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

export function ImageToBase64() {
    const [result, setResult] = useState('');
    return (
        <ToolWrapper title="Image to Base64" icon={Image} description="Convert image to Base64 string">
            <ImageUpload onImage={(data) => setResult(data)} />
            {result && <OutputBox value={result.substring(0, 200) + '...'} label="Base64 (truncated)" />}
        </ToolWrapper>
    );
}

export function Base64ToImage() {
    const [b64, setB64] = useState('');
    return (
        <ToolWrapper title="Base64 to Image" icon={Image} description="Convert Base64 string to image">
            <textarea className="textarea-field font-mono text-xs" value={b64} onChange={e => setB64(e.target.value)} placeholder="Paste Base64 string..." rows={6} />
            {b64 && <img src={b64} alt="Preview" className="mt-3 max-h-64 rounded-lg" />}
        </ToolWrapper>
    );
}

export function BlurImage() {
    const [img, setImg] = useState(null); const [blur, setBlur] = useState(5); const [result, setResult] = useState('');
    const apply = () => {
        if (!img) return;
        const canvas = document.createElement('canvas');
        const image = new window.Image();
        image.onload = () => { canvas.width = image.width; canvas.height = image.height; const ctx = canvas.getContext('2d'); ctx.filter = `blur(${blur}px)`; ctx.drawImage(image, 0, 0); setResult(canvas.toDataURL()); };
        image.src = img;
    };
    return (
        <ToolWrapper title="Blur Image" icon={Image} description="Apply blur effect to images">
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <div className="flex gap-3 items-end mt-3">
                <div className="flex-1"><label className="label">Blur Radius</label><input className="input-field" type="number" value={blur} onChange={e => setBlur(+e.target.value)} min={0} max={50} /></div>
                <button className="btn-primary" onClick={apply}>Apply</button>
            </div>
            {result && <div className="mt-4"><img src={result} alt="Blurred" className="max-h-64 rounded-lg" /><a href={result} download="blurred.png" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

function FilterImage({ title, filter, icon }) {
    const [img, setImg] = useState(null); const [amount, setAmount] = useState(100); const [result, setResult] = useState('');
    const apply = () => {
        if (!img) return;
        const canvas = document.createElement('canvas');
        const image = new window.Image();
        image.onload = () => { canvas.width = image.width; canvas.height = image.height; const ctx = canvas.getContext('2d'); ctx.filter = filter(amount); ctx.drawImage(image, 0, 0); setResult(canvas.toDataURL()); };
        image.src = img;
    };
    return (
        <ToolWrapper title={title} icon={Image} description={`Adjust ${title.toLowerCase()}`}>
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <div className="flex gap-3 items-end mt-3">
                <div className="flex-1"><label className="label">Amount</label><input className="input-field" type="range" value={amount} onChange={e => setAmount(+e.target.value)} min={0} max={200} /></div>
                <button className="btn-primary" onClick={apply}>Apply</button>
            </div>
            {result && <div className="mt-4"><img src={result} alt="Result" className="max-h-64 rounded-lg" /><a href={result} download="result.png" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

export function BrightnessAdjuster() {
    return <FilterImage title="Brightness" filter={a => `brightness(${a}%)`} icon={Image} />;
}

export function ContrastAdjuster() {
    return <FilterImage title="Contrast" filter={a => `contrast(${a}%)`} icon={Image} />;
}

export function GrayscaleConverter() {
    const [img, setImg] = useState(null); const [result, setResult] = useState('');
    const apply = () => { if (!img) return; const canvas = document.createElement('canvas'); const image = new window.Image(); image.onload = () => { canvas.width = image.width; canvas.height = image.height; const ctx = canvas.getContext('2d'); ctx.filter = 'grayscale(100%)'; ctx.drawImage(image, 0, 0); setResult(canvas.toDataURL()); }; image.src = img; };
    return (
        <ToolWrapper title="Grayscale Converter" icon={Image} description="Convert image to grayscale">
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <button className="btn-primary mt-3" onClick={apply}>Convert</button>
            {result && <div className="mt-4"><img src={result} alt="Grayscale" className="max-h-64 rounded-lg" /><a href={result} download="grayscale.png" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

export function BwConverter() { return <GrayscaleConverter />; }

export function RoundedCornersGenerator() {
    const [img, setImg] = useState(null); const [radius, setRadius] = useState(50); const [result, setResult] = useState('');
    const apply = () => {
        if (!img) return;
        const canvas = document.createElement('canvas');
        const image = new window.Image();
        image.onload = () => {
            canvas.width = image.width; canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.roundRect(0, 0, canvas.width, canvas.height, radius);
            ctx.clip();
            ctx.drawImage(image, 0, 0);
            setResult(canvas.toDataURL());
        };
        image.src = img;
    };
    return (
        <ToolWrapper title="Rounded Corner Generator" icon={Image} description="Add rounded corners to images">
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <div className="flex gap-3 items-end mt-3">
                <div className="flex-1"><label className="label">Radius (px)</label><input className="input-field" type="number" value={radius} onChange={e => setRadius(+e.target.value)} /></div>
                <button className="btn-primary" onClick={apply}>Apply</button>
            </div>
            {result && <div className="mt-4"><img src={result} alt="Rounded" className="max-h-64 rounded-lg" /><a href={result} download="rounded.png" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

export function WatermarkImage() {
    const [img, setImg] = useState(null); const [text, setText] = useState('Watermark'); const [result, setResult] = useState('');
    const apply = () => {
        if (!img) return;
        const canvas = document.createElement('canvas');
        const image = new window.Image();
        image.onload = () => {
            canvas.width = image.width; canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            ctx.font = `${Math.max(24, image.width / 10)}px Arial`;
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.textAlign = 'center';
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
            setResult(canvas.toDataURL());
        };
        image.src = img;
    };
    return (
        <ToolWrapper title="Watermark Image" icon={Image} description="Add text watermark to images">
            <ImageUpload onImage={(data) => setImg(data)} preview={img} />
            <div className="flex gap-3 items-end mt-3">
                <div className="flex-1"><label className="label">Watermark Text</label><input className="input-field" value={text} onChange={e => setText(e.target.value)} /></div>
                <button className="btn-primary" onClick={apply}>Add Watermark</button>
            </div>
            {result && <div className="mt-4"><img src={result} alt="Watermarked" className="max-h-64 rounded-lg" /><a href={result} download="watermarked.png" className="btn-primary inline-block mt-2">Download</a></div>}
        </ToolWrapper>
    );
}

export function ImageMetadataViewer() {
    const [img, setImg] = useState(null); const [info, setInfo] = useState(null);
    const view = (data, file) => {
        setImg(data);
        const image = new window.Image();
        image.onload = () => setInfo({ name: file.name, size: (file.size / 1024).toFixed(2) + ' KB', type: file.type, width: image.width, height: image.height });
        image.src = data;
    };
    return (
        <ToolWrapper title="Image Metadata Viewer" icon={Image} description="View image metadata and properties">
            <ImageUpload onImage={view} preview={img} />
            {info && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                    {Object.entries(info).map(([k, v]) => <div key={k} className="card p-3"><p className="text-xs text-gray-500 capitalize">{k}</p><p className="font-semibold">{v}</p></div>)}
                </div>
            )}
        </ToolWrapper>
    );
}

export function ImageDimensionChecker() { return <ImageMetadataViewer />; }