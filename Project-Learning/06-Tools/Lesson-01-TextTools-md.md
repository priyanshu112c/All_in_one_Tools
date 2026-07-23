# Lesson 01: src/tools/TextTools.jsx - Text Tools (30+ Tools)

## Purpose

Yeh file **30+ text manipulation tools** ka implementation contain karti hai. Text analysis, transformation, aur utility tools hain.

## Why this file exists

Text processing sabse common use case hai. Sab text tools ek file mein grouped hain for code splitting efficiency.

## When this file executes

Jab user koi text tool use kare (word counter, case converter, etc.). `toolRegistry.js` se lazy-load hota hai.

## Tools Included

### Analysis Tools
| Tool | Function | Kya karta hai |
|------|----------|---------------|
| WordCounter | Word Counter | Text mein words ginta hai |
| CharacterCounter | Character Counter | Characters count karta hai |
| SentenceCounter | Sentence Counter | Sentences count karta hai |
| ParagraphCounter | Paragraph Counter | Paragraphs count karta hai |
| ReadingTime | Reading Time | Padhne ka estimated time |
| TextStatistics | Text Statistics | Avg words/sentence, reading level |
| CharacterFrequency | Character Frequency | Har character kitni baar aaya |
| WordFrequency | Word Frequency | Har word kitni baar aaya |

### Transformation Tools
| Tool | Kya karta hai |
|------|---------------|
| CaseConverter | UpperCase, LowerCase, TitleCase, etc. |
| TextDiff | Do texts ka comparison |
| FindAndReplace | Text mein find aur replace |
| LoremGenerator | Lorem ipsum text generate |
| TextReverser | Text ulta karta hai |
| DuplicateRemover | Duplicate lines hata deta hai |
| LineSorter | Lines sort karta hai |
| WhitespaceRemoder | Extra spaces hata deta hai |

### Formatting Tools
| Tool | Kya karta hai |
|------|---------------|
| MarkdownPreview | Markdown → HTML preview |
| TextCaseConverter | Case change |
| LetterCounter | Letters by type (vowels, consonants) |
| TextTransformer | Multiple transformations |
| CaseChanger | Quick case toggle |
| Uppercase/Lowercase Converter | Direct conversion |

### Encoding Tools
| Tool | Kya karta hai |
|------|---------------|
| AsciiConverter | Text → ASCII values |
| TextEncoder | Encode/decode text |
| UnicodeConverter | Unicode code points |
| MorseCode | Text → Morse code |
| PigLatinConverter | Pig Latin translation |
| ReverseString | String reverse |

## Pattern Used

```jsx
export function WordCounter() {
    const [input, setInput] = useState('');

    const wordCount = input.trim().split(/\s+/).filter(Boolean).length;

    return (
        <ToolWrapper title="Word Counter" description="Count words" icon={Type}>
            <div>
                <label className="label">Enter Text</label>
                <textarea
                    className="textarea-field"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type or paste text..."
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {/* Stats cards */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-royal-500">{wordCount}</p>
                    <p className="text-sm">Words</p>
                </div>
            </div>
        </ToolWrapper>
    );
}
```

## Data Flow (Common Pattern)

```
User Input (textarea/input)
       │
       ▼
useState stores input
       │
       ▼
Compute results (useMemo or inline)
       │
       ▼
Display in stats/results section
       │
       ▼
Copy/Download action
```

## Real-life Analogy

**TextTools** ek **Swiss Army Knife** ka text blade hai:
- **Analysis** = Knife se material check karna
- **Transformation** = Material ko mold karna
- **Formatting** = Material ko polish karna
- **Encoding** = Material ko secret code mein convert karna

## Best Practices

1. ✅ Har tool `ToolWrapper` se wrapped hai
2. ✅ `useState` for input management
3. ✅ Stats displayed in grid layout
4. ✅ Real-time computation as user types
5. ✅ Copy functionality for results

## Interview Questions

1. **Q: 30+ tools ek file mein - bundle size bada nahi hoga?**
   A: Lazy loading hai. Sab ek saath load nahi hota. Sirf jo tool use ho raha hai woh chunk load hota hai.

2. **Q: `input.trim().split(/\s+/).filter(Boolean)` kya karta hai?**
   A: 3 steps: (1) Leading/trailing spaces hatao, (2) Spaces pe split karo into array, (3) Empty strings filter karo. Result: clean words array.

3. **Q: `useMemo` kyun use hota hai expensive computations mein?**
   A: Sirf jab input change ho tab recalculate. Har render pe na ho.

## Revision Notes

- 30+ text tools in one file
- Lazy-loaded via toolRegistry
- Pattern: ToolWrapper + useState + compute + display
- Common imports: useState, useMemo, ToolWrapper, OutputBox
- Real-time computation as user types