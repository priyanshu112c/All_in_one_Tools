# Lesson 02: src/tools/DeveloperTools.jsx - Developer Tools (30+ Tools)

## Purpose

Yeh file **30+ developer utilities** contain karti hai. JSON, Base64, code, regex, aur network tools hain.

## Why this file exists

Developers ko regular tools chahiye. Sab developer tools ek file mein grouped hain.

## Tools Included

### JSON & Data Tools
| Tool | Kya karta hai |
|------|---------------|
| JSONFormatter | JSON beautify + validate |
| JSONMinify | JSON minify karna |
| JSONValidator | Validate JSON |
| JSONToCSV | JSON → CSV convert |
| CSVToJSON | CSV → JSON convert |
| YAMLToJSON | YAML → JSON convert |
| XMLFormatter | XML beautify |
| HTMLFormatter | HTML beautify |
| SQLFormatter | SQL beautify |

### Encoding/Decoding
| Tool | Kya karta hai |
|------|---------------|
| Base64Encoder | Text → Base64 |
| Base64Decoder | Base64 → Text |
| URLEncoder | URL encode |
| URLDecoder | URL decode |
| HTMLEncoder | HTML entities encode |
| HTMLDecoder | HTML entities decode |
| JWTDecoder | JWT token decode + inspect |

### Code Tools
| Tool | Kya karta hai |
|------|---------------|
| RegExTester | Regular expression test |
| ColorConverter | Hex, RGB, HSL conversion |
| Minifiers | JS/CSS minify |
| DiffChecker | Code/files comparison |
| CodeBeautifier | Code formatting |
| UUIDGenerator | UUID v4 generate |
| HashGenerator | MD5, SHA-1, SHA-256, SHA-512 |

## Common Pattern

```jsx
export function JSONFormatter() {
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);

    const formatted = useMemo(() => {
        try {
            const parsed = JSON.parse(input);
            setError(null);
            return JSON.stringify(parsed, null, 2);
        } catch (e) {
            setError(e.message);
            return input;
        }
    }, [input]);

    return (
        <ToolWrapper title="JSON Formatter" description="Format and validate JSON" icon={Braces}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="label">Input JSON</label>
                    <textarea className="textarea-field" ... onChange={e => setInput(e.target.value)} />
                </div>
                <div>
                    {error ? (
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg">{error}</div>
                    ) : (
                        <OutputBox value={formatted} label="Formatted JSON" />
                    )}
                </div>
            </div>
        </ToolWrapper>
    );
}
```

## Key Patterns in Developer Tools

1. **Try-Catch** - Error handling for validation (JSON parse, regex test)
2. **useMemo** - Compute only when input changes
3. **Split-Screen** - Input/Output side by side
4. **Error Display** - Red alert boxes for invalid input

## Interview Questions

1. **Q: `JSON.stringify(parsed, null, 2)` mein `null, 2` kya hai?**
   A: `null` = replacer function (none), `2` = spaces for indentation (pretty print).

2. **Q: Error boundary pattern kyun important hai developer tools mein?**
   A: Kyunki user invalid data input kar sakta hai. Try-catch se crash prevent hota hai.

## Revision Notes

- 30+ developer tools in one file
- Patterns: try-catch, useMemo, split-screen
- Libraries used: crypto-js (hashing), js-yaml
- Real-time validation and formatting