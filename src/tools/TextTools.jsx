import { useState, useCallback } from 'react';
import ToolWrapper, { OutputBox } from '../components/ToolWrapper';
import { Type } from 'lucide-react';

// Word Counter
export function WordCounter() {
    const [text, setText] = useState('');
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return (
        <ToolWrapper title="Word Counter" icon={Type} description="Count words, characters, and sentences">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste text here..." rows={8} />
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="card text-center"><p className="text-3xl font-bold text-royal-500">{words}</p><p className="text-sm text-gray-500">Words</p></div>
                <div className="card text-center"><p className="text-3xl font-bold text-sky-500">{text.length}</p><p className="text-sm text-gray-500">Characters</p></div>
                <div className="card text-center"><p className="text-3xl font-bold text-emerald-500">{text.trim() ? (text.match(/[.!?]+/g) || []).length : 0}</p><p className="text-sm text-gray-500">Sentences</p></div>
            </div>
        </ToolWrapper>
    );
}

// Character Counter
export function CharacterCounter() {
    const [text, setText] = useState('');
    const noSpaces = text.replace(/\s/g, '').length;
    return (
        <ToolWrapper title="Character Counter" icon={Type} description="Count characters with and without spaces">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste text here..." rows={8} />
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="card text-center"><p className="text-3xl font-bold text-royal-500">{text.length}</p><p className="text-sm text-gray-500">With Spaces</p></div>
                <div className="card text-center"><p className="text-3xl font-bold text-sky-500">{noSpaces}</p><p className="text-sm text-gray-500">Without Spaces</p></div>
            </div>
        </ToolWrapper>
    );
}

// Sentence Counter
export function SentenceCounter() {
    const [text, setText] = useState('');
    const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
    return (
        <ToolWrapper title="Sentence Counter" icon={Type} description="Count sentences in your text">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste text here..." rows={8} />
            <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{sentences}</p><p className="text-sm text-gray-500">Sentences</p></div>
        </ToolWrapper>
    );
}

// Paragraph Counter
export function ParagraphCounter() {
    const [text, setText] = useState('');
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    return (
        <ToolWrapper title="Paragraph Counter" icon={Type} description="Count paragraphs in your text">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste text here..." rows={8} />
            <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{paragraphs}</p><p className="text-sm text-gray-500">Paragraphs</p></div>
        </ToolWrapper>
    );
}

// Reading Time Calculator
export function ReadingTimeCalculator() {
    const [text, setText] = useState('');
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const mins = Math.max(1, Math.ceil(words / 200));
    return (
        <ToolWrapper title="Reading Time Calculator" icon={Type} description="Estimate reading time for your text">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Paste your article here..." rows={8} />
            <div className="card text-center mt-4">
                <p className="text-3xl font-bold text-royal-500">{words > 0 ? mins : 0} min</p>
                <p className="text-sm text-gray-500">Estimated reading time ({words} words)</p>
            </div>
        </ToolWrapper>
    );
}

// Case Converter
export function CaseConverter() {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const convert = (fn) => setResult(fn(text));
    return (
        <ToolWrapper title="Case Converter" icon={Type} description="Convert text to various cases">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={6} />
            <div className="flex flex-wrap gap-2 mt-3">
                {[
                    ['UPPERCASE', t => t.toUpperCase()],
                    ['lowercase', t => t.toLowerCase()],
                    ['Title Case', t => t.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())],
                    ['Sentence case', t => t.toLowerCase().replace(/(^\s*\w)/g, c => c.toUpperCase())],
                    ['aLtErNaTiNg CaSe', t => t.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('')],
                ].map(([label, fn]) => (
                    <button key={label} className="btn-outline text-sm" onClick={() => convert(fn)}>{label}</button>
                ))}
            </div>
            {result && <OutputBox value={result} label="Result" />}
        </ToolWrapper>
    );
}

// Uppercase/Lowercase/Title/Sentence case converters
export function UppercaseConverter() {
    const [text, setText] = useState('');
    return (
        <ToolWrapper title="Uppercase Converter" icon={Type} description="Convert text to uppercase">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={6} />
            <OutputBox value={text.toUpperCase()} label="Result" />
        </ToolWrapper>
    );
}

export function LowercaseConverter() {
    const [text, setText] = useState('');
    return (
        <ToolWrapper title="Lowercase Converter" icon={Type} description="Convert text to lowercase">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={6} />
            <OutputBox value={text.toLowerCase()} label="Result" />
        </ToolWrapper>
    );
}

export function TitleCaseConverter() {
    const [text, setText] = useState('');
    const result = text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    return (
        <ToolWrapper title="Title Case Converter" icon={Type} description="Convert text to title case">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={6} />
            <OutputBox value={result} label="Result" />
        </ToolWrapper>
    );
}

export function SentenceCaseConverter() {
    const [text, setText] = useState('');
    const result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
    return (
        <ToolWrapper title="Sentence Case Converter" icon={Type} description="Convert text to sentence case">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={6} />
            <OutputBox value={result} label="Result" />
        </ToolWrapper>
    );
}

// Reverse Text
export function ReverseText() {
    const [text, setText] = useState('');
    return (
        <ToolWrapper title="Reverse Text" icon={Type} description="Reverse your text character by character">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={6} />
            <OutputBox value={text.split('').reverse().join('')} label="Reversed" />
        </ToolWrapper>
    );
}

// Remove Extra Spaces
export function RemoveSpaces() {
    const [text, setText] = useState('');
    return (
        <ToolWrapper title="Remove Extra Spaces" icon={Type} description="Remove extra whitespace from text">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={6} />
            <OutputBox value={text.replace(/[ \t]+/g, ' ').replace(/^\s+|\s+$/gm, '')} label="Result" />
        </ToolWrapper>
    );
}

// Remove Duplicate Lines
export function RemoveDuplicates() {
    const [text, setText] = useState('');
    const result = [...new Set(text.split('\n'))].join('\n');
    return (
        <ToolWrapper title="Remove Duplicate Lines" icon={Type} description="Remove duplicate lines from text">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text with duplicate lines..." rows={8} />
            <OutputBox value={result} label="Result (Unique Lines)" />
        </ToolWrapper>
    );
}

// Remove Empty Lines
export function RemoveEmptyLines() {
    const [text, setText] = useState('');
    const result = text.split('\n').filter(l => l.trim() !== '').join('\n');
    return (
        <ToolWrapper title="Remove Empty Lines" icon={Type} description="Remove empty lines from text">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={8} />
            <OutputBox value={result} label="Result" />
        </ToolWrapper>
    );
}

// Sort Lines
export function SortLines() {
    const [text, setText] = useState('');
    const [ascending, setAscending] = useState(true);
    const lines = text.split('\n').sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a)).join('\n');
    return (
        <ToolWrapper title="Sort Lines" icon={Type} description="Sort lines alphabetically">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter one item per line..." rows={8} />
            <div className="flex gap-2 mt-3">
                <button className={`btn-primary text-sm ${!ascending ? 'opacity-50' : ''}`} onClick={() => setAscending(true)}>A → Z</button>
                <button className={`btn-primary text-sm ${ascending ? 'opacity-50' : ''}`} onClick={() => setAscending(false)}>Z → A</button>
            </div>
            <OutputBox value={lines} label="Sorted" />
        </ToolWrapper>
    );
}

// Shuffle Text
export function ShuffleText() {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const shuffle = () => {
        const arr = text.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setResult(arr.join(''));
    };
    return (
        <ToolWrapper title="Shuffle Text" icon={Type} description="Randomly shuffle text characters">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={6} />
            <button className="btn-primary mt-3" onClick={shuffle}>Shuffle</button>
            {result && <OutputBox value={result} label="Shuffled" />}
        </ToolWrapper>
    );
}

// Random Text Generator
export function RandomTextGenerator() {
    const [length, setLength] = useState(100);
    const [result, setResult] = useState('');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    const generate = () => {
        let r = '';
        for (let i = 0; i < length; i++) r += chars[Math.floor(Math.random() * chars.length)];
        setResult(r);
    };
    return (
        <ToolWrapper title="Random Text Generator" icon={Type} description="Generate random text">
            <div className="flex gap-3 items-end">
                <div className="flex-1">
                    <label className="label">Length</label>
                    <input type="number" className="input-field" value={length} onChange={e => setLength(+e.target.value)} min={1} max={10000} />
                </div>
                <button className="btn-primary" onClick={generate}>Generate</button>
            </div>
            {result && <OutputBox value={result} label="Random Text" />}
        </ToolWrapper>
    );
}

// Lorem Ipsum Generator
export function LoremIpsumGenerator() {
    const [paragraphs, setParagraphs] = useState(3);
    const [result, setResult] = useState('');
    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    const generate = () => setResult(Array(paragraphs).fill(0).map(() => lorem).join('\n\n'));
    return (
        <ToolWrapper title="Lorem Ipsum Generator" icon={Type} description="Generate placeholder text">
            <div className="flex gap-3 items-end">
                <div className="flex-1">
                    <label className="label">Paragraphs</label>
                    <input type="number" className="input-field" value={paragraphs} onChange={e => setParagraphs(+e.target.value)} min={1} max={50} />
                </div>
                <button className="btn-primary" onClick={generate}>Generate</button>
            </div>
            {result && <OutputBox value={result} label="Lorem Ipsum" />}
        </ToolWrapper>
    );
}

// Text Repeater
export function TextRepeater() {
    const [text, setText] = useState('');
    const [times, setTimes] = useState(5);
    const [sep, setSep] = useState('\n');
    return (
        <ToolWrapper title="Text Repeater" icon={Type} description="Repeat text multiple times">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text to repeat..." rows={4} />
            <div className="grid grid-cols-2 gap-3 mt-3">
                <div><label className="label">Times</label><input type="number" className="input-field" value={times} onChange={e => setTimes(+e.target.value)} min={1} max={10000} /></div>
                <div><label className="label">Separator</label><input className="input-field" value={sep} onChange={e => setSep(e.target.value)} placeholder="Newline" /></div>
            </div>
            <OutputBox value={text ? Array(times).fill(text).join(sep) : ''} label="Result" />
        </ToolWrapper>
    );
}

// Find and Replace
export function FindAndReplace() {
    const [text, setText] = useState('');
    const [find, setFind] = useState('');
    const [replace, setReplace] = useState('');
    const [regex, setRegex] = useState(false);
    const result = find ? (regex ? text.replace(new RegExp(find, 'g'), replace) : text.split(find).join(replace)) : text;
    return (
        <ToolWrapper title="Find and Replace" icon={Type} description="Find and replace text">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={6} />
            <div className="grid grid-cols-2 gap-3 mt-3">
                <div><label className="label">Find</label><input className="input-field" value={find} onChange={e => setFind(e.target.value)} /></div>
                <div><label className="label">Replace</label><input className="input-field" value={replace} onChange={e => setReplace(e.target.value)} /></div>
            </div>
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" checked={regex} onChange={e => setRegex(e.target.checked)} className="w-4 h-4" />
                <span className="text-sm">Use Regex</span>
            </label>
            <OutputBox value={result} label="Result" />
        </ToolWrapper>
    );
}

// Slug Generator
export function SlugGenerator() {
    const [text, setText] = useState('');
    const slug = text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-');
    return (
        <ToolWrapper title="Slug Generator" icon={Type} description="Generate URL-friendly slugs">
            <input className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter title or text..." />
            <OutputBox value={slug} label="Slug" />
        </ToolWrapper>
    );
}

// URL Encoder/Decoder
export function URLEncoder() {
    const [text, setText] = useState('');
    return (
        <ToolWrapper title="URL Encoder" icon={Type} description="Encode text for URLs">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter URL or text..." rows={4} />
            <OutputBox value={encodeURIComponent(text)} label="Encoded" />
        </ToolWrapper>
    );
}

export function URLDecoder() {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    let result = '';
    try { result = decodeURIComponent(text); setError(''); } catch { setError('Invalid encoded string'); }
    return (
        <ToolWrapper title="URL Decoder" icon={Type} description="Decode URL-encoded text">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter encoded URL..." rows={4} />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <OutputBox value={result} label="Decoded" />
        </ToolWrapper>
    );
}

// HTML Encoder/Decoder
export function HTMLEncoder() {
    const [text, setText] = useState('');
    const result = text.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, '&#039;');
    return (
        <ToolWrapper title="HTML Encoder" icon={Type} description="Encode HTML special characters">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter HTML text..." rows={4} />
            <OutputBox value={result} label="Encoded" />
        </ToolWrapper>
    );
}

export function HTMLDecoder() {
    const [text, setText] = useState('');
    const el = document.createElement('textarea');
    el.innerHTML = text;
    const result = el.value;
    return (
        <ToolWrapper title="HTML Decoder" icon={Type} description="Decode HTML entities">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter encoded HTML..." rows={4} />
            <OutputBox value={result} label="Decoded" />
        </ToolWrapper>
    );
}

// Unicode Converter
export function UnicodeConverter() {
    const [text, setText] = useState('');
    const result = text.split('').map(c => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`).join('');
    return (
        <ToolWrapper title="Unicode Converter" icon={Type} description="Convert text to Unicode escape sequences">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={4} />
            <OutputBox value={result} label="Unicode" />
        </ToolWrapper>
    );
}

// ASCII Converter
export function ASCIIConverter() {
    const [text, setText] = useState('');
    const result = text.split('').map(c => c.charCodeAt(0)).join(' ');
    return (
        <ToolWrapper title="ASCII Converter" icon={Type} description="Convert text to ASCII values">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={4} />
            <OutputBox value={result} label="ASCII Values" />
        </ToolWrapper>
    );
}

// Binary Converter
export function BinaryConverter() {
    const [text, setText] = useState('');
    const result = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    return (
        <ToolWrapper title="Binary Converter" icon={Type} description="Convert text to binary">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={4} />
            <OutputBox value={result} label="Binary" />
        </ToolWrapper>
    );
}

// Hex Converter
export function HexConverter() {
    const [text, setText] = useState('');
    const result = text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
    return (
        <ToolWrapper title="Hex Converter" icon={Type} description="Convert text to hexadecimal">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={4} />
            <OutputBox value={result.toUpperCase()} label="Hex" />
        </ToolWrapper>
    );
}

// Morse Code
const MORSE = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', ' ': '/' };
const MORSE_REV = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

export function MorseEncoder() {
    const [text, setText] = useState('');
    const result = text.toUpperCase().split('').map(c => MORSE[c] || c).join(' ');
    return (
        <ToolWrapper title="Morse Code Generator" icon={Type} description="Convert text to Morse code">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={4} />
            <OutputBox value={result} label="Morse Code" />
        </ToolWrapper>
    );
}

export function MorseDecoder() {
    const [text, setText] = useState('');
    const result = text.split(' ').map(c => MORSE_REV[c] || c).join('');
    return (
        <ToolWrapper title="Morse Code Decoder" icon={Type} description="Decode Morse code to text">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter Morse code (space-separated)..." rows={4} />
            <OutputBox value={result} label="Decoded Text" />
        </ToolWrapper>
    );
}

// Re-exports for toolRegistry compatibility
export { RemoveSpaces as RemoveExtraSpaces };
export { RemoveDuplicates as RemoveDuplicateLines };
export { MorseEncoder as MorseCodeGenerator };
export { MorseDecoder as MorseCodeDecoder };
