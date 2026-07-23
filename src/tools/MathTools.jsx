import { useState, useMemo } from 'react';
import ToolWrapper, { OutputBox } from '../components/ToolWrapper';
import { Binary, Dice5 } from 'lucide-react';
import * as math from 'mathjs';

export function ScientificCalculator() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const buttons = [
        ['sin', 'cos', 'tan', 'π'],
        ['asin', 'acos', 'atan', 'e'],
        ['sqrt', 'cbrt', 'log', 'ln'],
        ['7', '8', '9', '÷'],
        ['4', '5', '6', '×'],
        ['1', '2', '3', '-'],
        ['0', '.', '(', ')'],
        ['^', '%', '+', '='],
    ];
    const handleBtn = (b) => {
        if (b === '=') {
            try { setResult(math.evaluate(expression).toString()); } catch { setResult('Error'); }
        } else if (b === 'π') setExpression(e => e + 'pi');
        else if (b === 'e') setExpression(e => e + 'e');
        else if (b === '÷') setExpression(e => e + '/');
        else if (b === '×') setExpression(e => e + '*');
        else if (b === '^') setExpression(e => e + '^');
        else setExpression(e => e + b);
    };
    return (
        <ToolWrapper title="Scientific Calculator" icon={Binary} description="Perform scientific calculations">
            <input className="input-field font-mono text-xl mb-3" value={expression} onChange={e => setExpression(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { try { setResult(math.evaluate(expression).toString()); } catch { setResult('Error'); } } }} placeholder="Enter expression..." />
            <div className="grid grid-cols-4 gap-2">
                {buttons.flat().map((b, i) => (
                    <button key={i} onClick={() => handleBtn(b)} className={`p-3 rounded-lg font-semibold text-sm transition-all ${b === '=' ? 'bg-royal-500 text-white hover:bg-royal-600' : ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'cbrt', 'log', 'ln'].includes(b) ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 hover:bg-sky-200' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>{b}</button>
                ))}
            </div>
            {result && <div className="mt-3 p-4 bg-royal-50 dark:bg-royal-900/20 rounded-lg"><p className="text-2xl font-bold text-royal-500 font-mono">{result}</p></div>}
        </ToolWrapper>
    );
}

export function FractionCalculator() {
    const [n1, setN1] = useState(''); const [d1, setD1] = useState('1');
    const [op, setOp] = useState('+');
    const [n2, setN2] = useState(''); const [d2, setD2] = useState('1');
    const result = useMemo(() => {
        const a = +n1, b = +d1 || 1, c = +n2, dd = +d2 || 1;
        let rn, rd;
        if (op === '+') { rn = a * dd + c * b; rd = b * dd; }
        else if (op === '-') { rn = a * dd - c * b; rd = b * dd; }
        else if (op === '×') { rn = a * c; rd = b * dd; }
        else { rn = a * dd; rd = b * c; }
        const g = math.gcd(Math.abs(rn), Math.abs(rd));
        return `${rn / g}/${rd / g}`;
    }, [n1, d1, n2, d2, op]);
    return (
        <ToolWrapper title="Fraction Calculator" icon={Binary} description="Calculate with fractions">
            <div className="flex items-center gap-3 flex-wrap">
                <div className="text-center"><input className="input-field w-20 text-center" type="number" value={n1} onChange={e => setN1(e.target.value)} placeholder="0" /><div className="border-t-2 border-gray-400 my-1" /><input className="input-field w-20 text-center" type="number" value={d1} onChange={e => setD1(e.target.value)} placeholder="1" /></div>
                <select className="input-field w-16 text-center" value={op} onChange={e => setOp(e.target.value)}><option>+</option><option>-</option><option>×</option><option>÷</option></select>
                <div className="text-center"><input className="input-field w-20 text-center" type="number" value={n2} onChange={e => setN2(e.target.value)} placeholder="0" /><div className="border-t-2 border-gray-400 my-1" /><input className="input-field w-20 text-center" type="number" value={d2} onChange={e => setD2(e.target.value)} placeholder="1" /></div>
                <span className="text-2xl font-bold">=</span>
                <div className="card text-center px-6 py-3"><p className="text-xl font-bold text-royal-500">{result}</p></div>
            </div>
        </ToolWrapper>
    );
}

export function PctIncrease() {
    const [from, setFrom] = useState(''); const [to, setTo] = useState('');
    const result = from && to && +from ? (((+to - +from) / Math.abs(+from)) * 100).toFixed(2) : '';
    return (
        <ToolWrapper title="Percentage Increase" icon={Binary} description="Calculate percentage increase">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">From</label><input className="input-field" type="number" value={from} onChange={e => setFrom(e.target.value)} /></div>
                <div><label className="label">To</label><input className="input-field" type="number" value={to} onChange={e => setTo(e.target.value)} /></div>
            </div>
            {result && <div className="card text-center mt-4"><p className="text-3xl font-bold text-emerald-500">{result}%</p></div>}
        </ToolWrapper>
    );
}

export function PctDecrease() {
    const [from, setFrom] = useState(''); const [to, setTo] = useState('');
    const result = from && to && +from ? (((+from - +to) / Math.abs(+from)) * 100).toFixed(2) : '';
    return (
        <ToolWrapper title="Percentage Decrease" icon={Binary} description="Calculate percentage decrease">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">From</label><input className="input-field" type="number" value={from} onChange={e => setFrom(e.target.value)} /></div>
                <div><label className="label">To</label><input className="input-field" type="number" value={to} onChange={e => setTo(e.target.value)} /></div>
            </div>
            {result && <div className="card text-center mt-4"><p className="text-3xl font-bold text-red-500">{result}%</p></div>}
        </ToolWrapper>
    );
}

export function RatioCalculator() {
    const [a, setA] = useState(''); const [b, setB] = useState('');
    const gcd = math.gcd(+a || 1, +b || 1);
    const result = a && b ? `${+a / gcd} : ${+b / gcd}` : '';
    return (
        <ToolWrapper title="Ratio Calculator" icon={Binary} description="Simplify ratios">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Value A</label><input className="input-field" type="number" value={a} onChange={e => setA(e.target.value)} /></div>
                <div><label className="label">Value B</label><input className="input-field" type="number" value={b} onChange={e => setB(e.target.value)} /></div>
            </div>
            {result && <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{result}</p></div>}
        </ToolWrapper>
    );
}

export function LcmCalculator() {
    const [nums, setNums] = useState('');
    const result = useMemo(() => {
        const arr = nums.split(/[,\s]+/).map(Number).filter(n => !isNaN(n) && n > 0);
        if (arr.length < 2) return '';
        return math.lcm(...arr).toString();
    }, [nums]);
    return (
        <ToolWrapper title="LCM Calculator" icon={Binary} description="Find Least Common Multiple">
            <label className="label">Enter numbers (comma separated)</label>
            <input className="input-field" value={nums} onChange={e => setNums(e.target.value)} placeholder="12, 15, 20" />
            {result && <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{result}</p><p className="text-sm text-gray-500">LCM</p></div>}
        </ToolWrapper>
    );
}

export function HcfCalculator() {
    const [nums, setNums] = useState('');
    const result = useMemo(() => {
        const arr = nums.split(/[,\s]+/).map(Number).filter(n => !isNaN(n) && n > 0);
        if (arr.length < 2) return '';
        return math.gcd(...arr).toString();
    }, [nums]);
    return (
        <ToolWrapper title="HCF Calculator" icon={Binary} description="Find Highest Common Factor">
            <label className="label">Enter numbers (comma separated)</label>
            <input className="input-field" value={nums} onChange={e => setNums(e.target.value)} placeholder="12, 15, 20" />
            {result && <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{result}</p><p className="text-sm text-gray-500">HCF</p></div>}
        </ToolWrapper>
    );
}

export function PrimeNumberChecker() {
    const [num, setNum] = useState('');
    const isPrime = useMemo(() => {
        const n = +num;
        if (!n || n < 2) return null;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(n); i += 2) { if (n % i === 0) return false; }
        return true;
    }, [num]);
    return (
        <ToolWrapper title="Prime Number Checker" icon={Binary} description="Check if a number is prime">
            <input className="input-field" type="number" value={num} onChange={e => setNum(e.target.value)} placeholder="Enter a number..." />
            {isPrime !== null && (
                <div className={`mt-4 p-4 rounded-lg text-center ${isPrime ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                    <p className="text-xl font-bold">{isPrime ? `${num} is Prime ✓` : `${num} is NOT Prime ✕`}</p>
                </div>
            )}
        </ToolWrapper>
    );
}

export function PrimeNumberGenerator() {
    const [count, setCount] = useState(10);
    const [primes, setPrimes] = useState([]);
    const generate = () => {
        const p = []; let n = 2;
        while (p.length < count) {
            let isP = true;
            for (let i = 2; i <= Math.sqrt(n); i++) { if (n % i === 0) { isP = false; break; } }
            if (isP) p.push(n);
            n++;
        }
        setPrimes(p);
    };
    return (
        <ToolWrapper title="Prime Number Generator" icon={Binary} description="Generate prime numbers">
            <div className="flex gap-3 items-end">
                <div className="flex-1"><label className="label">How many primes?</label><input className="input-field" type="number" value={count} onChange={e => setCount(+e.target.value)} min={1} max={1000} /></div>
                <button className="btn-primary" onClick={generate}>Generate</button>
            </div>
            {primes.length > 0 && <OutputBox value={primes.join(', ')} label="Prime Numbers" />}
        </ToolWrapper>
    );
}

export function EvenOddChecker() {
    const [num, setNum] = useState('');
    const result = num ? (+num % 2 === 0 ? 'Even' : 'Odd') : '';
    return (
        <ToolWrapper title="Even/Odd Checker" icon={Binary} description="Check if a number is even or odd">
            <input className="input-field" type="number" value={num} onChange={e => setNum(e.target.value)} placeholder="Enter a number..." />
            {result && <div className={`mt-4 p-4 rounded-lg text-center ${result === 'Even' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'}`}><p className="text-xl font-bold">{num} is {result}</p></div>}
        </ToolWrapper>
    );
}

export function RandomNumberGenerator() {
    const [min, setMin] = useState('1'); const [max, setMax] = useState('100'); const [count, setCount] = useState('1');
    const [results, setResults] = useState([]);
    const generate = () => {
        const r = [];
        for (let i = 0; i < +count; i++) r.push(Math.floor(Math.random() * (+max - +min + 1)) + +min);
        setResults(r);
    };
    return (
        <ToolWrapper title="Random Number Generator" icon={Binary} description="Generate random numbers">
            <div className="grid grid-cols-3 gap-3">
                <div><label className="label">Min</label><input className="input-field" type="number" value={min} onChange={e => setMin(e.target.value)} /></div>
                <div><label className="label">Max</label><input className="input-field" type="number" value={max} onChange={e => setMax(e.target.value)} /></div>
                <div><label className="label">Count</label><input className="input-field" type="number" value={count} onChange={e => setCount(e.target.value)} min={1} max={100} /></div>
            </div>
            <button className="btn-primary mt-3" onClick={generate}>Generate</button>
            {results.length > 0 && <OutputBox value={results.join(', ')} label="Random Numbers" />}
        </ToolWrapper>
    );
}

export function DiceRoller() {
    const [count, setCount] = useState(1);
    const [dice, setDice] = useState([]);
    const roll = () => setDice(Array(count).fill(0).map(() => Math.floor(Math.random() * 6) + 1));
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return (
        <ToolWrapper title="Dice Roller" icon={Dice5} description="Roll virtual dice">
            <div className="flex gap-3 items-end">
                <div className="flex-1"><label className="label">Number of Dice</label><input className="input-field" type="number" value={count} onChange={e => setCount(+e.target.value)} min={1} max={10} /></div>
                <button className="btn-primary" onClick={roll}>Roll</button>
            </div>
            {dice.length > 0 && (
                <div className="flex gap-4 mt-4 justify-center">
                    {dice.map((d, i) => <div key={i} className="text-6xl">{faces[d - 1]}</div>)}
                </div>
            )}
            {dice.length > 0 && <p className="text-center mt-2 text-gray-500">Total: {dice.reduce((a, b) => a + b, 0)}</p>}
        </ToolWrapper>
    );
}

export function CoinFlip() {
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const flip = () => { const r = Math.random() < 0.5 ? 'Heads' : 'Tails'; setResult(r); setHistory([...history, r]); };
    return (
        <ToolWrapper title="Coin Flip" icon={Binary} description="Flip a virtual coin">
            <button className="btn-primary text-lg px-8 py-4" onClick={flip}>Flip Coin</button>
            {result && <div className="mt-4 text-center"><p className="text-5xl mb-2">{result === 'Heads' ? '🪙' : '🪙'}</p><p className="text-2xl font-bold text-royal-500">{result}</p></div>}
            {history.length > 0 && <p className="text-sm text-gray-500 mt-2 text-center">History: {history.slice(-10).join(', ')} ({history.filter(h => h === 'Heads').length}H / {history.filter(h => h === 'Tails').length}T)</p>}
        </ToolWrapper>
    );
}

export function NumberToWords() {
    const [num, setNum] = useState('');
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const convert = (n) => {
        if (n === 0) return 'Zero';
        if (n < 0) return 'Negative ' + convert(-n);
        let r = '';
        if (n >= 1e9) { r += convert(Math.floor(n / 1e9)) + ' Billion '; n %= 1e9; }
        if (n >= 1e6) { r += convert(Math.floor(n / 1e6)) + ' Million '; n %= 1e6; }
        if (n >= 1e3) { r += convert(Math.floor(n / 1e3)) + ' Thousand '; n %= 1e3; }
        if (n >= 100) { r += ones[Math.floor(n / 100)] + ' Hundred '; n %= 100; }
        if (n >= 20) { r += tens[Math.floor(n / 10)] + ' '; n %= 10; }
        if (n > 0) r += ones[n] + ' ';
        return r.trim();
    };
    return (
        <ToolWrapper title="Number to Words" icon={Binary} description="Convert numbers to English words">
            <input className="input-field" type="number" value={num} onChange={e => setNum(e.target.value)} placeholder="Enter a number..." />
            {num && <OutputBox value={convert(+num)} label="In Words" />}
        </ToolWrapper>
    );
}

export function RomanNumberConverter() {
    const [num, setNum] = useState('');
    const toRoman = (n) => {
        if (n <= 0 || n > 3999) return 'Enter 1-3999';
        const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
        let result = '';
        for (let i = 0; i < vals.length; i++) { while (n >= vals[i]) { result += syms[i]; n -= vals[i]; } }
        return result;
    };
    return (
        <ToolWrapper title="Roman Number Converter" icon={Binary} description="Convert numbers to Roman numerals">
            <input className="input-field" type="number" value={num} onChange={e => setNum(e.target.value)} placeholder="Enter 1-3999" min={1} max={3999} />
            {num && <OutputBox value={toRoman(+num)} label="Roman Numeral" />}
        </ToolWrapper>
    );
}