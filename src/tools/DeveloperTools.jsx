import { useState } from 'react';
import ToolWrapper, { OutputBox } from '../components/ToolWrapper';
import { Code2 } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { marked } from 'marked';

// JSON Formatter
export function JsonFormatter() {
    const [text, setText] = useState('');
    const [indent, setIndent] = useState(2);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const format = () => {
        try { setResult(JSON.stringify(JSON.parse(text), null, indent)); setError(''); }
        catch (e) { setError(e.message); setResult(''); }
    };
    return (
        <ToolWrapper title="JSON Formatter" icon={Code2} description="Format and beautify JSON data">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder='{"key": "value"}' rows={8} />
            <div className="flex items-end gap-3 mt-3">
                <div><label className="label">Indent</label><select className="input-field" value={indent} onChange={e => setIndent(+e.target.value)}><option value={2}>2 spaces</option><option value={4}>4 spaces</option><option value={1}>1 tab</option></select></div>
                <button className="btn-primary" onClick={format}>Format</button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {result && <OutputBox value={result} label="Formatted JSON" />}
        </ToolWrapper>
    );
}

// JSON Validator
export function JsonValidator() {
    const [text, setText] = useState('');
    const [valid, setValid] = useState(null);
    const [msg, setMsg] = useState('');
    const validate = () => {
        try { JSON.parse(text); setValid(true); setMsg('Valid JSON ✓'); }
        catch (e) { setValid(false); setMsg(e.message); }
    };
    return (
        <ToolWrapper title="JSON Validator" icon={Code2} description="Validate JSON data">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder='{"key": "value"}' rows={8} />
            <button className="btn-primary mt-3" onClick={validate}>Validate</button>
            {valid !== null && (
                <div className={`mt-3 p-4 rounded-lg ${valid ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {msg}
                </div>
            )}
        </ToolWrapper>
    );
}

// JSON Minifier
export function JsonMinifier() {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const minify = () => {
        try { setError(''); return JSON.stringify(JSON.parse(text)); } catch (e) { setError(e.message); return ''; }
    };
    const result = text ? minify() : '';
    return (
        <ToolWrapper title="JSON Minifier" icon={Code2} description="Minify JSON to single line">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="Paste formatted JSON..." rows={8} />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {result && !error && <OutputBox value={result} label="Minified JSON" />}
        </ToolWrapper>
    );
}

// JSON Beautifier (alias for formatter)
export function JsonBeautifier() { return <JsonFormatter />; }

// XML Formatter
export function XmlFormatter() {
    const [text, setText] = useState('');
    const formatXml = (xml) => {
        let formatted = ''; let indent = '';
        const tab = '  ';
        xml.split(/>\s*</).forEach(node => {
            if (node.match(/^\/\w/)) indent = indent.substring(tab.length);
            formatted += indent + '<' + node + '>\n';
            if (node.match(/^<?\w[^>]*[^/]$/) && !node.startsWith('?')) indent += tab;
        });
        return formatted.substring(1, formatted.length - 2);
    };
    return (
        <ToolWrapper title="XML Formatter" icon={Code2} description="Format and beautify XML data">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="<root><item>value</item></root>" rows={8} />
            <OutputBox value={text ? formatXml(text) : ''} label="Formatted XML" />
        </ToolWrapper>
    );
}

// XML Validator
export function XmlValidator() {
    const [text, setText] = useState('');
    const [valid, setValid] = useState(null);
    const [msg, setMsg] = useState('');
    const validate = () => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'application/xml');
            const err = doc.querySelector('parsererror');
            if (err) { setValid(false); setMsg(err.textContent.substring(0, 200)); }
            else { setValid(true); setMsg('Valid XML ✓'); }
        } catch (e) { setValid(false); setMsg(e.message); }
    };
    return (
        <ToolWrapper title="XML Validator" icon={Code2} description="Validate XML data">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="Paste XML..." rows={8} />
            <button className="btn-primary mt-3" onClick={validate}>Validate</button>
            {valid !== null && (
                <div className={`mt-3 p-4 rounded-lg ${valid ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{msg}</div>
            )}
        </ToolWrapper>
    );
}

// HTML Formatter
export function HtmlFormatter() {
    const [text, setText] = useState('');
    const format = (html) => {
        let result = ''; let indent = 0;
        const tab = '  ';
        html.replace(/>\s+</g, '>\n<').split('\n').forEach(line => {
            line = line.trim();
            if (!line) return;
            if (line.match(/^<\/\w/)) indent--;
            result += tab.repeat(Math.max(0, indent)) + line + '\n';
            if (line.match(/^<\w[^>]*[^/]>/) && !line.match(/^<(meta|link|br|hr|img|input)/i)) indent++;
        });
        return result.trim();
    };
    return (
        <ToolWrapper title="HTML Formatter" icon={Code2} description="Format and beautify HTML">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="<div>...</div>" rows={8} />
            <OutputBox value={text ? format(text) : ''} label="Formatted HTML" />
        </ToolWrapper>
    );
}

// CSS Beautifier
export function CssBeautifier() {
    const [text, setText] = useState('');
    const format = (css) => {
        return css.replace(/\{/g, ' {\n  ').replace(/\}/g, '\n}\n').replace(/;(?!\s*$)/g, ';\n  ').replace(/,\s*/g, ', ').replace(/^\s+$/gm, '').trim();
    };
    return (
        <ToolWrapper title="CSS Beautifier" icon={Code2} description="Format and beautify CSS">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="body{margin:0;padding:0}" rows={8} />
            <OutputBox value={text ? format(text) : ''} label="Formatted CSS" />
        </ToolWrapper>
    );
}

// CSS Minifier
export function CssMinifier() {
    const [text, setText] = useState('');
    const minified = text.replace(/\s+/g, ' ').replace(/\s*{\s*/g, '{').replace(/\s*}\s*/g, '}').replace(/\s*;\s*/g, ';').replace(/\s*:\s*/g, ':').trim();
    return (
        <ToolWrapper title="CSS Minifier" icon={Code2} description="Minify CSS code">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="Paste CSS..." rows={8} />
            {text && <OutputBox value={minified} label="Minified CSS" />}
        </ToolWrapper>
    );
}

// JS Beautifier
export function JSBeautifier() {
    const [text, setText] = useState('');
    const format = (js) => {
        let result = ''; let indent = 0;
        js.replace(/\{/g, ' {\n').replace(/\}/g, '\n}\n').replace(/;\s*(?!$)/g, ';\n').split('\n').forEach(line => {
            line = line.trim(); if (!line) return;
            if (line.startsWith('}')) indent = Math.max(0, indent - 1);
            result += '  '.repeat(indent) + line + '\n';
            if (line.endsWith('{')) indent++;
        });
        return result.trim();
    };
    return (
        <ToolWrapper title="JavaScript Beautifier" icon={Code2} description="Format and beautify JavaScript code">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="function hello(){console.log('hi')}" rows={8} />
            {text && <OutputBox value={format(text)} label="Formatted JS" />}
        </ToolWrapper>
    );
}

// JS Minifier
export function JSMinifier() {
    const [text, setText] = useState('');
    const minified = text.replace(/\s+/g, ' ').replace(/\s*([{}();,=+\-<>!&|?:])\s*/g, '$1').trim();
    return (
        <ToolWrapper title="JavaScript Minifier" icon={Code2} description="Minify JavaScript code">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="Paste JavaScript..." rows={8} />
            {text && <OutputBox value={minified} label="Minified JS" />}
        </ToolWrapper>
    );
}

// SQL Formatter
export function SqlFormatter() {
    const [text, setText] = useState('');
    const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX', 'LIMIT', 'OFFSET', 'UNION', 'AS', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'IN', 'NOT', 'NULL', 'IS', 'LIKE', 'BETWEEN', 'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'];
    let result = text;
    keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        result = result.replace(regex, '\n' + kw);
    });
    return (
        <ToolWrapper title="SQL Formatter" icon={Code2} description="Format SQL queries">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="SELECT * FROM users WHERE..." rows={8} />
            {result && <OutputBox value={result.trim()} label="Formatted SQL" />}
        </ToolWrapper>
    );
}

// Markdown Preview
export function MarkdownPreview() {
    const [text, setText] = useState('# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n\n```js\nconsole.log("hello");\n```');
    return (
        <ToolWrapper title="Markdown Preview" icon={Code2} description="Preview Markdown in real-time">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="label">Markdown Input</label>
                    <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} rows={12} />
                </div>
                <div>
                    <label className="label">Preview</label>
                    <div className="textarea-field min-h-[300px] prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: marked(text || '') }} />
                </div>
            </div>
        </ToolWrapper>
    );
}

// Markdown to HTML
export function MarkdownToHtml() {
    const [text, setText] = useState('');
    return (
        <ToolWrapper title="Markdown to HTML" icon={Code2} description="Convert Markdown to HTML">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="# Heading\n\n**Bold** text" rows={8} />
            {text && <OutputBox value={marked(text)} label="HTML Output" />}
        </ToolWrapper>
    );
}

// HTML to Markdown (simple)
export function HtmlToMarkdown() {
    const [text, setText] = useState('');
    const convert = (html) => {
        let md = html;
        md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n');
        md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n');
        md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n');
        md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
        md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
        md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
        md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
        md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
        md = md.replace(/<br\s*\/?>/gi, '\n');
        md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
        md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
        md = md.replace(/<[^>]+>/g, '');
        md = md.replace(/\n{3,}/g, '\n\n');
        return md.trim();
    };
    return (
        <ToolWrapper title="HTML to Markdown" icon={Code2} description="Convert HTML to Markdown">
            <textarea className="textarea-field font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="<h1>Hello</h1>" rows={8} />
            {text && <OutputBox value={convert(text)} label="Markdown Output" />}
        </ToolWrapper>
    );
}

// HTML Escape
export function HtmlEscape() {
    const [text, setText] = useState('');
    const result = text.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"').replace(/'/g, '&#039;');
    return (
        <ToolWrapper title="HTML Escape" icon={Code2} description="Escape HTML special characters">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text to escape..." rows={4} />
            <OutputBox value={result} label="Escaped" />
        </ToolWrapper>
    );
}

// Regex Tester
export function RegexTester() {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [test, setTest] = useState('');
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState('');
    const testRegex = () => {
        try {
            const regex = new RegExp(pattern, flags);
            const m = [...test.matchAll(regex)];
            setMatches(m.map((match, i) => ({ index: match.index, match: match[0], groups: match.slice(1) })));
            setError('');
        } catch (e) { setError(e.message); setMatches([]); }
    };
    return (
        <ToolWrapper title="Regex Tester" icon={Code2} description="Test regular expressions in real-time">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Pattern</label><input className="input-field font-mono" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="[a-z]+" /></div>
                <div><label className="label">Flags</label><input className="input-field" value={flags} onChange={e => setFlags(e.target.value)} placeholder="g" /></div>
            </div>
            <div className="mt-3"><label className="label">Test String</label><textarea className="textarea-field" value={test} onChange={e => setTest(e.target.value)} placeholder="Enter text to test against..." rows={4} /></div>
            <button className="btn-primary mt-3" onClick={testRegex}>Test</button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {matches.length > 0 && (
                <div className="mt-4 space-y-2">
                    <p className="label">Found {matches.length} match(es)</p>
                    {matches.map((m, i) => (
                        <div key={i} className="card p-3 text-sm">
                            <span className="font-mono bg-royal-100 dark:bg-royal-900/50 px-2 py-1 rounded text-royal-700 dark:text-royal-300">"{m.match}"</span>
                            <span className="text-gray-500 ml-2">at index {m.index}</span>
                            {m.groups.length > 0 && <span className="text-gray-400 ml-2">Groups: {m.groups.join(', ')}</span>}
                        </div>
                    ))}
                </div>
            )}
        </ToolWrapper>
    );
}

// Regex Generator
export function RegexGenerator() {
    const [options, setOptions] = useState({ email: false, phone: false, url: false, ip: false, date: false, alphanumeric: false });
    const patterns = {
        email: { label: 'Email', regex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
        phone: { label: 'Phone', regex: '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}' },
        url: { label: 'URL', regex: 'https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\w\\-.,@?^=%&:/~+#]*' },
        ip: { label: 'IPv4', regex: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' },
        date: { label: 'Date (YYYY-MM-DD)', regex: '\\d{4}[-\\/]\\d{2}[-\\/]\\d{2}' },
        alphanumeric: { label: 'Alphanumeric', regex: '[a-zA-Z0-9]+' },
    };
    const result = Object.entries(options).filter(([, v]) => v).map(([k]) => patterns[k].regex).join('|');
    return (
        <ToolWrapper title="Regex Generator" icon={Code2} description="Generate common regex patterns">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(patterns).map(([key, { label }]) => (
                    <label key={key} className="card flex items-center gap-2 cursor-pointer p-3">
                        <input type="checkbox" checked={options[key]} onChange={e => setOptions({ ...options, [key]: e.target.checked })} className="w-4 h-4" />
                        <span className="text-sm">{label}</span>
                    </label>
                ))}
            </div>
            {result && <OutputBox value={result} label="Generated Regex" />}
        </ToolWrapper>
    );
}

// Base64 Encode
export function Base64Encode() {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    let result = '';
    try { result = btoa(unescape(encodeURIComponent(text))); setError(''); } catch { setError('Encoding error'); }
    return (
        <ToolWrapper title="Base64 Encode" icon={Code2} description="Encode text to Base64">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text to encode..." rows={4} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {result && <OutputBox value={result} label="Base64 Encoded" />}
        </ToolWrapper>
    );
}

// Base64 Decode
export function Base64Decode() {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    let result = '';
    try { result = decodeURIComponent(escape(atob(text))); setError(''); } catch { setError('Invalid Base64 string'); }
    return (
        <ToolWrapper title="Base64 Decode" icon={Code2} description="Decode Base64 to text">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter Base64 to decode..." rows={4} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {result && !error && <OutputBox value={result} label="Decoded" />}
        </ToolWrapper>
    );
}

// JWT Decoder
export function JwtDecoder() {
    const [token, setToken] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const decode = () => {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) throw new Error('Invalid JWT format');
            const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            setResult({ header, payload, signature: parts[2] });
            setError('');
        } catch (e) { setError(e.message); setResult(null); }
    };
    return (
        <ToolWrapper title="JWT Decoder" icon={Code2} description="Decode and inspect JWT tokens">
            <textarea className="textarea-field font-mono text-xs" value={token} onChange={e => setToken(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiJ9.eyJ..." rows={4} />
            <button className="btn-primary mt-3" onClick={decode}>Decode</button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {result && (
                <div className="mt-4 space-y-3">
                    <div><label className="label">Header</label><OutputBox value={JSON.stringify(result.header, null, 2)} onCopy={() => navigator.clipboard.writeText(JSON.stringify(result.header, null, 2))} /></div>
                    <div><label className="label">Payload</label><OutputBox value={JSON.stringify(result.payload, null, 2)} onCopy={() => navigator.clipboard.writeText(JSON.stringify(result.payload, null, 2))} /></div>
                    <div><label className="label">Signature</label><div className="p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-xs break-all">{result.signature}</div></div>
                </div>
            )}
        </ToolWrapper>
    );
}

// JWT Parser (same as decoder but with extra info)
export function JwtParser() {
    const [token, setToken] = useState('');
    const parts = token.split('.');
    let header = null, payload = null;
    try { if (parts[0]) header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'))); } catch { }
    try { if (parts[1]) payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))); } catch { }
    return (
        <ToolWrapper title="JWT Parser" icon={Code2} description="Parse JWT token structure">
            <textarea className="textarea-field font-mono text-xs" value={token} onChange={e => setToken(e.target.value)} placeholder="Paste JWT token..." rows={4} />
            {header && <div className="mt-4"><label className="label">Algorithm: {header.alg}</label><label className="label">Type: {header.typ}</label></div>}
            {payload && <div className="mt-3"><label className="label">Payload</label><OutputBox value={JSON.stringify(payload, null, 2)} /></div>}
            {payload && payload.exp && <p className="text-sm text-gray-500 mt-2">Expires: {new Date(payload.exp * 1000).toLocaleString()}</p>}
        </ToolWrapper>
    );
}

// UUID Generator
export function UuidGenerator() {
    const [count, setCount] = useState(1);
    const [version, setVersion] = useState('v4');
    const [results, setResults] = useState([]);
    const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); });
    const uuidv1 = () => 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); });
    const generate = () => {
        const fn = version === 'v4' ? uuidv4 : uuidv1;
        setResults(Array(count).fill(0).map(() => fn()));
    };
    return (
        <ToolWrapper title="UUID Generator" icon={Code2} description="Generate unique UUIDs">
            <div className="flex gap-3 items-end">
                <div className="flex-1"><label className="label">Count</label><input type="number" className="input-field" value={count} onChange={e => setCount(+e.target.value)} min={1} max={100} /></div>
                <div className="flex-1"><label className="label">Version</label><select className="input-field" value={version} onChange={e => setVersion(e.target.value)}><option value="v4">UUID v4</option><option value="v1">UUID v1</option></select></div>
                <button className="btn-primary" onClick={generate}>Generate</button>
            </div>
            {results.length > 0 && <OutputBox value={results.join('\n')} label="Generated UUIDs" />}
        </ToolWrapper>
    );
}

// Hash Generator
export function HashGenerator() {
    const [text, setText] = useState('');
    const [algo, setAlgo] = useState('SHA256');
    const algos = ['MD5', 'SHA1', 'SHA256', 'SHA512'];
    const hash = (a) => {
        if (!text) return '';
        const fn = { MD5: CryptoJS.MD5, SHA1: CryptoJS.SHA1, SHA256: CryptoJS.SHA256, SHA512: CryptoJS.SHA512 }[a];
        return fn ? fn(text).toString() : '';
    };
    return (
        <ToolWrapper title="Hash Generator" icon={Code2} description="Generate hashes using various algorithms">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text to hash..." rows={4} />
            {text && (
                <div className="mt-4 space-y-3">
                    {algos.map(a => (
                        <div key={a}><label className="label">{a}</label><OutputBox value={hash(a)} /></div>
                    ))}
                </div>
            )}
        </ToolWrapper>
    );
}

// SHA256 Generator
export function Sha256Generator() {
    const [text, setText] = useState('');
    return (
        <ToolWrapper title="SHA256 Generator" icon={Code2} description="Generate SHA-256 hash">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={4} />
            {text && <OutputBox value={CryptoJS.SHA256(text).toString()} label="SHA-256 Hash" />}
        </ToolWrapper>
    );
}

// MD5 Generator
export function Md5Generator() {
    const [text, setText] = useState('');
    return (
        <ToolWrapper title="MD5 Generator" icon={Code2} description="Generate MD5 hash">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." rows={4} />
            {text && <OutputBox value={CryptoJS.MD5(text).toString()} label="MD5 Hash" />}
        </ToolWrapper>
    );
}

// HMAC Generator
export function HmacGenerator() {
    const [text, setText] = useState('');
    const [secret, setSecret] = useState('');
    const [algo, setAlgo] = useState('SHA256');
    const algos = ['MD5', 'SHA1', 'SHA256', 'SHA512'];
    const gen = () => {
        if (!text || !secret) return '';
        const fn = { MD5: CryptoJS.HmacMD5, SHA1: CryptoJS.HmacSHA1, SHA256: CryptoJS.HmacSHA256, SHA512: CryptoJS.HmacSHA512 }[algo];
        return fn ? fn(text, secret).toString() : '';
    };
    return (
        <ToolWrapper title="HMAC Generator" icon={Code2} description="Generate HMAC with shared secret">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Message..." rows={3} />
            <div className="grid grid-cols-2 gap-3 mt-3">
                <div><label className="label">Secret Key</label><input className="input-field" value={secret} onChange={e => setSecret(e.target.value)} /></div>
                <div><label className="label">Algorithm</label><select className="input-field" value={algo} onChange={e => setAlgo(e.target.value)}>{algos.map(a => <option key={a}>{a}</option>)}</select></div>
            </div>
            {text && secret && <OutputBox value={gen()} label="HMAC" />}
        </ToolWrapper>
    );
}

// Unix Timestamp Converter
export function UnixTimestamp() {
    const [input, setInput] = useState('');
    const result = isNaN(input) ? '' : new Date(+input * 1000).toISOString();
    return (
        <ToolWrapper title="Unix Timestamp Converter" icon={Code2} description="Convert Unix timestamp to readable date">
            <input className="input-field" type="number" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter Unix timestamp..." />
            {result && <OutputBox value={result} label="Date/Time" />}
        </ToolWrapper>
    );
}

// Timestamp to Date
export function TimestampToDate() {
    const [input, setInput] = useState('');
    let result = '';
    try { result = new Date(input).toLocaleString(); } catch { }
    return (
        <ToolWrapper title="Timestamp to Date" icon={Code2} description="Convert timestamp or date string to readable format">
            <input className="input-field" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter date string or timestamp..." />
            {result && !isNaN(new Date(input).getTime()) && <OutputBox value={result} label="Converted Date" />}
        </ToolWrapper>
    );
}

// Re-exports for toolRegistry compatibility
export { JSBeautifier as JsBeautifier };
export { JSMinifier as JsMinifier };
export { UnixTimestamp as UnixTimestampConverter };
export { CronGenerator as CronExpressionGenerator };

export function CronGenerator() {
    const [min, setMin] = useState('*');
    const [hour, setHour] = useState('*');
    const [day, setDay] = useState('*');
    const [month, setMonth] = useState('*');
    const [dow, setDow] = useState('*');
    const cron = `${min} ${hour} ${day} ${month} ${dow}`;
    const descriptions = {
        '*': 'every',
    };
    return (
        <ToolWrapper title="Cron Expression Generator" icon={Code2} description="Build cron expressions visually">
            <div className="grid grid-cols-5 gap-3">
                {[['Minute', min, setMin, '0-59'], ['Hour', hour, setHour, '0-23'], ['Day', day, setDay, '1-31'], ['Month', month, setMonth, '1-12'], ['Weekday', dow, setDow, '0-6']].map(([label, val, set, hint]) => (
                    <div key={label}><label className="label">{label}</label><input className="input-field" value={val} onChange={e => set(e.target.value)} placeholder={hint} /></div>
                ))}
            </div>
            <OutputBox value={cron} label="Cron Expression" />
            <div className="mt-3">
                <label className="label">Common Patterns</label>
                <div className="flex flex-wrap gap-2">
                    {[['Every min', '* * * * *'], ['Every hour', '0 * * * *'], ['Daily 9am', '0 9 * * *'], ['Weekly Mon', '0 9 * * 1'], ['Monthly 1st', '0 9 1 * *']].map(([name, val]) => (
                        <button key={val} className="btn-outline text-xs" onClick={() => { const p = val.split(' '); setMin(p[0]); setHour(p[1]); setDay(p[2]); setMonth(p[3]); setDow(p[4]); }}>{name}</button>
                    ))}
                </div>
            </div>
        </ToolWrapper>
    );
}