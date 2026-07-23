import { useState, useMemo } from 'react';
import ToolWrapper, { OutputBox } from '../components/ToolWrapper';
import { Palette } from 'lucide-react';

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}
function rgbToHex(r, g, b) { return '#' + [r, g, b].map(x => (+x).toString(16).padStart(2, '0')).join(''); }
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) { r = g = b = l; } else {
        const hue2rgb = (p, q, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}
function rgbToCmyk(r, g, b) {
    if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
    let c = 1 - r / 255, m = 1 - g / 255, y = 1 - b / 255, k = Math.min(c, m, y);
    c = Math.round(((c - k) / (1 - k)) * 100); m = Math.round(((m - k) / (1 - k)) * 100); y = Math.round(((y - k) / (1 - k)) * 100); k = Math.round(k * 100);
    return { c, m, y, k };
}

export function ColorPicker() {
    const [color, setColor] = useState('#2563eb');
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return (
        <ToolWrapper title="Color Picker" icon={Palette} description="Pick and convert colors">
            <div className="flex items-center gap-4">
                <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-24 h-24 rounded-xl cursor-pointer border-2 border-gray-200" />
                <div className="grid grid-cols-2 gap-3 flex-1">
                    <div className="card p-3"><label className="label">HEX</label><input className="input-field" value={color} onChange={e => setColor(e.target.value)} /></div>
                    <div className="card p-3"><label className="label">RGB</label><p className="font-mono text-sm">rgb({rgb.r}, {rgb.g}, {rgb.b})</p></div>
                    <div className="card p-3"><label className="label">HSL</label><p className="font-mono text-sm">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</p></div>
                </div>
            </div>
            <div className="mt-4 h-24 rounded-xl" style={{ background: color }} />
        </ToolWrapper>
    );
}

export function HexToRgb() {
    const [hex, setHex] = useState('#2563eb');
    const rgb = /^#[0-9a-f]{6}$/i.test(hex) ? hexToRgb(hex) : null;
    return (
        <ToolWrapper title="HEX to RGB" icon={Palette} description="Convert HEX color to RGB">
            <div className="flex gap-3 items-end">
                <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-16 h-12 rounded cursor-pointer" />
                <input className="input-field flex-1" value={hex} onChange={e => setHex(e.target.value)} placeholder="#2563eb" />
            </div>
            {rgb && <OutputBox value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} label="RGB" />}
        </ToolWrapper>
    );
}

export function RgbToHex() {
    const [r, setR] = useState(37), [g, setG] = useState(99), [b, setB] = useState(235);
    const hex = rgbToHex(r, g, b);
    return (
        <ToolWrapper title="RGB to HEX" icon={Palette} description="Convert RGB color to HEX">
            <div className="grid grid-cols-3 gap-3">
                <div><label className="label">Red (0-255)</label><input className="input-field" type="number" value={r} onChange={e => setR(+e.target.value)} min={0} max={255} /></div>
                <div><label className="label">Green (0-255)</label><input className="input-field" type="number" value={g} onChange={e => setG(+e.target.value)} min={0} max={255} /></div>
                <div><label className="label">Blue (0-255)</label><input className="input-field" type="number" value={b} onChange={e => setB(+e.target.value)} min={0} max={255} /></div>
            </div>
            <div className="flex items-center gap-3 mt-3">
                <div className="w-16 h-16 rounded-lg border" style={{ background: hex }} />
                <OutputBox value={hex.toUpperCase()} label="HEX" />
            </div>
        </ToolWrapper>
    );
}

export function HexToHsl() {
    const [hex, setHex] = useState('#2563eb');
    const hsl = /^#[0-9a-f]{6}$/i.test(hex) ? (() => { const { r, g, b } = hexToRgb(hex); return rgbToHsl(r, g, b); })() : null;
    return (
        <ToolWrapper title="HEX to HSL" icon={Palette} description="Convert HEX to HSL">
            <div className="flex gap-3 items-end">
                <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-16 h-12 rounded cursor-pointer" />
                <input className="input-field flex-1" value={hex} onChange={e => setHex(e.target.value)} />
            </div>
            {hsl && <OutputBox value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} label="HSL" />}
        </ToolWrapper>
    );
}

export function HslToHex() {
    const [h, setH] = useState(225), [s, setS] = useState(83), [l, setL] = useState(53);
    const { r, g, b } = hslToRgb(h, s, l);
    const hex = rgbToHex(r, g, b);
    return (
        <ToolWrapper title="HSL to HEX" icon={Palette} description="Convert HSL to HEX">
            <div className="grid grid-cols-3 gap-3">
                <div><label className="label">Hue (0-360)</label><input className="input-field" type="number" value={h} onChange={e => setH(+e.target.value)} min={0} max={360} /></div>
                <div><label className="label">Saturation (0-100)</label><input className="input-field" type="number" value={s} onChange={e => setS(+e.target.value)} min={0} max={100} /></div>
                <div><label className="label">Lightness (0-100)</label><input className="input-field" type="number" value={l} onChange={e => setL(+e.target.value)} min={0} max={100} /></div>
            </div>
            <div className="flex items-center gap-3 mt-3">
                <div className="w-16 h-16 rounded-lg border" style={{ background: hex }} />
                <OutputBox value={hex.toUpperCase()} label="HEX" />
            </div>
        </ToolWrapper>
    );
}

export function RgbToCmyk() {
    const [r, setR] = useState(37), [g, setG] = useState(99), [b, setB] = useState(235);
    const cmyk = rgbToCmyk(r, g, b);
    return (
        <ToolWrapper title="RGB to CMYK" icon={Palette} description="Convert RGB to CMYK">
            <div className="grid grid-cols-3 gap-3">
                <div><label className="label">Red</label><input className="input-field" type="number" value={r} onChange={e => setR(+e.target.value)} min={0} max={255} /></div>
                <div><label className="label">Green</label><input className="input-field" type="number" value={g} onChange={e => setG(+e.target.value)} min={0} max={255} /></div>
                <div><label className="label">Blue</label><input className="input-field" type="number" value={b} onChange={e => setB(+e.target.value)} min={0} max={255} /></div>
            </div>
            <OutputBox value={`C:${cmyk.c}% M:${cmyk.m}% Y:${cmyk.y}% K:${cmyk.k}%`} label="CMYK" />
        </ToolWrapper>
    );
}

export function ColorPaletteGenerator() {
    const [base, setBase] = useState('#2563eb');
    const [count, setCount] = useState(5);
    const palette = useMemo(() => {
        const { h, s, l } = rgbToHsl(...Object.values(hexToRgb(base)));
        return Array(count).fill(0).map((_, i) => {
            const newH = (h + (360 / count) * i) % 360;
            return rgbToHex(...Object.values(hslToRgb(newH, s, l)));
        });
    }, [base, count]);
    return (
        <ToolWrapper title="Color Palette Generator" icon={Palette} description="Generate color palettes">
            <div className="flex gap-3 items-end">
                <div><label className="label">Base Color</label><input type="color" value={base} onChange={e => setBase(e.target.value)} className="w-16 h-10 rounded cursor-pointer" /></div>
                <div className="flex-1"><label className="label">Count</label><input className="input-field" type="number" value={count} onChange={e => setCount(+e.target.value)} min={2} max={12} /></div>
            </div>
            <div className="flex gap-2 mt-4 rounded-xl overflow-hidden">
                {palette.map((c, i) => <div key={i} className="flex-1 h-20" style={{ background: c }} title={c} />)}
            </div>
            <OutputBox value={palette.join('\n')} label="Colors" />
        </ToolWrapper>
    );
}

export function GradientGenerator() {
    const [c1, setC1] = useState('#2563eb');
    const [c2, setC2] = useState('#7c3aed');
    const [angle, setAngle] = useState(135);
    const gradient = `linear-gradient(${angle}deg, ${c1}, ${c2})`;
    return (
        <ToolWrapper title="Gradient Generator" icon={Palette} description="Create beautiful gradients">
            <div className="grid grid-cols-3 gap-3">
                <div><label className="label">Color 1</label><input type="color" value={c1} onChange={e => setC1(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
                <div><label className="label">Color 2</label><input type="color" value={c2} onChange={e => setC2(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
                <div><label className="label">Angle</label><input className="input-field" type="number" value={angle} onChange={e => setAngle(+e.target.value)} min={0} max={360} /></div>
            </div>
            <div className="mt-4 h-40 rounded-xl" style={{ background: gradient }} />
            <OutputBox value={`background: ${gradient};`} label="CSS" />
        </ToolWrapper>
    );
}

export function CssGradientGenerator() { return <GradientGenerator />; }

export function ContrastChecker() {
    const [c1, setC1] = useState('#ffffff');
    const [c2, setC2] = useState('#1e3a5f');
    const luminance = (hex) => { const { r, g, b } = hexToRgb(hex); const [rs, gs, bs] = [r, g, b].map(c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }); return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs; };
    const ratio = useMemo(() => { const l1 = luminance(c1), l2 = luminance(c2); return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2); }, [c1, c2]);
    const level = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'Fail';
    return (
        <ToolWrapper title="Contrast Checker" icon={Palette} description="Check WCAG contrast ratio">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Color 1</label><input type="color" value={c1} onChange={e => setC1(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
                <div><label className="label">Color 2</label><input type="color" value={c2} onChange={e => setC2(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
            </div>
            <div className="mt-4 p-6 rounded-xl text-center" style={{ background: c1, color: c2 }}>
                <p className="text-2xl font-bold">Sample Text</p>
                <p className="text-sm">Preview text for contrast check</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="card text-center"><p className="text-2xl font-bold text-royal-500">{ratio}:1</p><p className="text-sm text-gray-500">Contrast Ratio</p></div>
                <div className={`card text-center ${level === 'Fail' ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}><p className={`text-2xl font-bold ${level === 'Fail' ? 'text-red-500' : 'text-green-500'}`}>{level}</p><p className="text-sm text-gray-500">WCAG Level</p></div>
            </div>
        </ToolWrapper>
    );
}

export function RandomColorGenerator() {
    const [colors, setColors] = useState([]);
    const generate = () => {
        setColors(Array(8).fill(0).map(() => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')));
    };
    return (
        <ToolWrapper title="Random Color Generator" icon={Palette} description="Generate random colors">
            <button className="btn-primary" onClick={generate}>Generate Colors</button>
            {colors.length > 0 && (
                <div className="mt-4 space-y-2">
                    {colors.map((c, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg border" style={{ background: c }} />
                            <span className="font-mono text-sm">{c.toUpperCase()}</span>
                            <button className="btn-outline text-xs ml-auto" onClick={() => navigator.clipboard.writeText(c.toUpperCase())}>Copy</button>
                        </div>
                    ))}
                </div>
            )}
        </ToolWrapper>
    );
}