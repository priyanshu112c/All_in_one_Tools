import { useState, useMemo } from 'react';
import ToolWrapper, { OutputBox } from '../components/ToolWrapper';
import { Calculator } from 'lucide-react';
import dayjs from 'dayjs';

export function PercentageCalculator() {
    const [val, setVal] = useState('');
    const [of, setOf] = useState('');
    const result = val && of ? ((+val / +of) * 100).toFixed(2) : '';
    return (
        <ToolWrapper title="Percentage Calculator" icon={Calculator} description="Calculate percentages">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Value</label><input className="input-field" type="number" value={val} onChange={e => setVal(e.target.value)} /></div>
                <div><label className="label">% of</label><input className="input-field" type="number" value={of} onChange={e => setOf(e.target.value)} /></div>
            </div>
            {result && <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{result}%</p><p className="text-sm text-gray-500">{val} is {result}% of {of}</p></div>}
        </ToolWrapper>
    );
}

export function AgeCalculator() {
    const [dob, setDob] = useState('');
    const result = useMemo(() => {
        if (!dob) return null;
        const birth = dayjs(dob);
        const now = dayjs();
        if (!birth.isValid()) return null;
        let years = now.year() - birth.year();
        let months = now.month() - birth.month();
        let days = now.date() - birth.date();
        if (days < 0) { months--; days += dayjs().date(); }
        if (months < 0) { years--; months += 12; }
        return { years, months, days, totalDays: now.diff(birth, 'day') };
    }, [dob]);
    return (
        <ToolWrapper title="Age Calculator" icon={Calculator} description="Calculate your exact age">
            <div><label className="label">Date of Birth</label><input className="input-field" type="date" value={dob} onChange={e => setDob(e.target.value)} /></div>
            {result && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                    <div className="card text-center"><p className="text-2xl font-bold text-royal-500">{result.years}</p><p className="text-xs text-gray-500">Years</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-sky-500">{result.months}</p><p className="text-xs text-gray-500">Months</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-emerald-500">{result.days}</p><p className="text-xs text-gray-500">Days</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-orange-500">{result.totalDays}</p><p className="text-xs text-gray-500">Total Days</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function DateDifferenceCalculator() {
    const [d1, setD1] = useState('');
    const [d2, setD2] = useState('');
    const diff = useMemo(() => {
        if (!d1 || !d2) return null;
        const a = dayjs(d1), b = dayjs(d2);
        const totalDays = Math.abs(b.diff(a, 'day'));
        const months = Math.abs(b.diff(a, 'month'));
        return { totalDays, months, weeks: Math.floor(totalDays / 7) };
    }, [d1, d2]);
    return (
        <ToolWrapper title="Date Difference Calculator" icon={Calculator} description="Find difference between two dates">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Start Date</label><input className="input-field" type="date" value={d1} onChange={e => setD1(e.target.value)} /></div>
                <div><label className="label">End Date</label><input className="input-field" type="date" value={d2} onChange={e => setD2(e.target.value)} /></div>
            </div>
            {diff && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="card text-center"><p className="text-2xl font-bold text-royal-500">{diff.totalDays}</p><p className="text-xs text-gray-500">Days</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-sky-500">{diff.weeks}</p><p className="text-xs text-gray-500">Weeks</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-emerald-500">{diff.months}</p><p className="text-xs text-gray-500">Months</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function TimeCalculator() {
    const [h1, setH1] = useState('09'); const [m1, setM1] = useState('00');
    const [h2, setH2] = useState('17'); const [m2, setM2] = useState('30');
    const [op, setOp] = useState('diff');
    const result = useMemo(() => {
        const total1 = +h1 * 60 + +m1;
        const total2 = +h2 * 60 + +m2;
        if (op === 'diff') {
            const diff = Math.abs(total2 - total1);
            return { hours: Math.floor(diff / 60), minutes: diff % 60 };
        } else {
            const sum = total1 + total2;
            return { hours: Math.floor(sum / 60), minutes: sum % 60 };
        }
    }, [h1, m1, h2, m2, op]);
    return (
        <ToolWrapper title="Time Calculator" icon={Calculator} description="Add or subtract time">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="label">Time 1</label>
                    <div className="flex gap-2"><input className="input-field" type="number" value={h1} onChange={e => setH1(e.target.value)} min={0} max={23} placeholder="HH" /><span className="self-center text-xl">:</span><input className="input-field" type="number" value={m1} onChange={e => setM1(e.target.value)} min={0} max={59} placeholder="MM" /></div>
                </div>
                <div>
                    <label className="label">Time 2</label>
                    <div className="flex gap-2"><input className="input-field" type="number" value={h2} onChange={e => setH2(e.target.value)} min={0} max={23} placeholder="HH" /><span className="self-center text-xl">:</span><input className="input-field" type="number" value={m2} onChange={e => setM2(e.target.value)} min={0} max={59} placeholder="MM" /></div>
                </div>
            </div>
            <div className="flex gap-2 mt-3">
                <button className={`btn-primary text-sm ${op === 'diff' ? '' : 'opacity-50'}`} onClick={() => setOp('diff')}>Difference</button>
                <button className={`btn-primary text-sm ${op === 'add' ? '' : 'opacity-50'}`} onClick={() => setOp('add')}>Add</button>
            </div>
            <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{result.hours}h {result.minutes}m</p></div>
        </ToolWrapper>
    );
}

export function HourCalculator() {
    const [rate, setRate] = useState(''); const [hours, setHours] = useState('');
    const total = rate && hours ? (+rate * +hours).toFixed(2) : '';
    return (
        <ToolWrapper title="Hour Calculator" icon={Calculator} description="Calculate total from hourly rate">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Hourly Rate ($)</label><input className="input-field" type="number" value={rate} onChange={e => setRate(e.target.value)} /></div>
                <div><label className="label">Hours Worked</label><input className="input-field" type="number" value={hours} onChange={e => setHours(e.target.value)} /></div>
            </div>
            {total && <div className="card text-center mt-4"><p className="text-3xl font-bold text-emerald-500">${total}</p><p className="text-sm text-gray-500">Total Earnings</p></div>}
        </ToolWrapper>
    );
}

export function GpaCalculator() {
    const [courses, setCourses] = useState([{ name: '', grade: 'A', credits: '3' }]);
    const addCourse = () => setCourses([...courses, { name: '', grade: 'A', credits: '3' }]);
    const update = (i, k, v) => { const c = [...courses]; c[i][k] = v; setCourses(c); };
    const gradePoints = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0 };
    const gpa = useMemo(() => {
        let totalCredits = 0, totalPoints = 0;
        courses.forEach(c => { const cr = +c.credits || 0; const gp = gradePoints[c.grade] || 0; totalCredits += cr; totalPoints += cr * gp; });
        return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    }, [courses]);
    return (
        <ToolWrapper title="GPA Calculator" icon={Calculator} description="Calculate your GPA">
            {courses.map((c, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 mb-2">
                    <input className="input-field" placeholder="Course" value={c.name} onChange={e => update(i, 'name', e.target.value)} />
                    <select className="input-field" value={c.grade} onChange={e => update(i, 'grade', e.target.value)}>{Object.keys(gradePoints).map(g => <option key={g}>{g}</option>)}</select>
                    <input className="input-field" type="number" placeholder="Credits" value={c.credits} onChange={e => update(i, 'credits', e.target.value)} min={0} />
                    <button className="btn-outline text-sm" onClick={() => setCourses(courses.filter((_, j) => j !== i))}>✕</button>
                </div>
            ))}
            <button className="btn-outline text-sm mt-2" onClick={addCourse}>+ Add Course</button>
            <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{gpa}</p><p className="text-sm text-gray-500">GPA</p></div>
        </ToolWrapper>
    );
}

export function CgpaCalculator() {
    const [semesters, setSemesters] = useState([{ gpa: '', credits: '' }]);
    const add = () => setSemesters([...semesters, { gpa: '', credits: '' }]);
    const update = (i, k, v) => { const s = [...semesters]; s[i][k] = v; setSemesters(s); };
    const cgpa = useMemo(() => {
        let tc = 0, tp = 0;
        semesters.forEach(s => { const c = +s.credits || 0; const g = +s.gpa || 0; tc += c; tp += c * g; });
        return tc > 0 ? (tp / tc).toFixed(2) : '0.00';
    }, [semesters]);
    return (
        <ToolWrapper title="CGPA Calculator" icon={Calculator} description="Calculate cumulative GPA">
            {semesters.map((s, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                    <input className="input-field" type="number" placeholder="Semester GPA" value={s.gpa} onChange={e => update(i, 'gpa', e.target.value)} step={0.01} />
                    <input className="input-field" type="number" placeholder="Total Credits" value={s.credits} onChange={e => update(i, 'credits', e.target.value)} />
                    <button className="btn-outline text-sm" onClick={() => setSemesters(semesters.filter((_, j) => j !== i))}>✕</button>
                </div>
            ))}
            <button className="btn-outline text-sm mt-2" onClick={add}>+ Add Semester</button>
            <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{cgpa}</p><p className="text-sm text-gray-500">CGPA</p></div>
        </ToolWrapper>
    );
}

export function GradeCalculator() {
    const [obtained, setObtained] = useState(''); const [total, setTotal] = useState('100');
    const pct = obtained && total ? ((+obtained / +total) * 100).toFixed(1) : '';
    const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B+' : pct >= 60 ? 'B' : pct >= 50 ? 'C' : pct >= 40 ? 'D' : 'F';
    return (
        <ToolWrapper title="Grade Calculator" icon={Calculator} description="Calculate your grade">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Marks Obtained</label><input className="input-field" type="number" value={obtained} onChange={e => setObtained(e.target.value)} /></div>
                <div><label className="label">Total Marks</label><input className="input-field" type="number" value={total} onChange={e => setTotal(e.target.value)} /></div>
            </div>
            {pct && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="card text-center"><p className="text-3xl font-bold text-royal-500">{pct}%</p><p className="text-sm text-gray-500">Percentage</p></div>
                    <div className="card text-center"><p className="text-3xl font-bold text-emerald-500">{grade}</p><p className="text-sm text-gray-500">Grade</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function MarksPercentageCalculator() {
    const [marks, setMarks] = useState(''); const [total, setTotal] = useState('');
    const pct = marks && total ? ((+marks / +total) * 100).toFixed(2) : '';
    return (
        <ToolWrapper title="Marks Percentage Calculator" icon={Calculator} description="Calculate percentage from marks">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Obtained Marks</label><input className="input-field" type="number" value={marks} onChange={e => setMarks(e.target.value)} /></div>
                <div><label className="label">Total Marks</label><input className="input-field" type="number" value={total} onChange={e => setTotal(e.target.value)} /></div>
            </div>
            {pct && <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{pct}%</p></div>}
        </ToolWrapper>
    );
}

export function AverageCalculator() {
    const [numbers, setNumbers] = useState('');
    const nums = numbers.split(/[,\s]+/).map(Number).filter(n => !isNaN(n) && n !== 0);
    const avg = nums.length > 0 ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2) : '';
    return (
        <ToolWrapper title="Average Calculator" icon={Calculator} description="Calculate the average of numbers">
            <label className="label">Enter numbers (comma or space separated)</label>
            <textarea className="textarea-field" value={numbers} onChange={e => setNumbers(e.target.value)} placeholder="1, 2, 3, 4, 5" rows={4} />
            {avg && <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{avg}</p><p className="text-sm text-gray-500">Average of {nums.length} numbers (Sum: {nums.reduce((a, b) => a + b, 0)})</p></div>}
        </ToolWrapper>
    );
}

export function DiscountCalculator() {
    const [price, setPrice] = useState(''); const [discount, setDiscount] = useState('');
    const result = useMemo(() => {
        if (!price || !discount) return null;
        const save = +price * (+discount / 100);
        return { saved: save.toFixed(2), final: (price - save).toFixed(2) };
    }, [price, discount]);
    return (
        <ToolWrapper title="Discount Calculator" icon={Calculator} description="Calculate discount and final price">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Original Price ($)</label><input className="input-field" type="number" value={price} onChange={e => setPrice(e.target.value)} /></div>
                <div><label className="label">Discount (%)</label><input className="input-field" type="number" value={discount} onChange={e => setDiscount(e.target.value)} /></div>
            </div>
            {result && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="card text-center"><p className="text-2xl font-bold text-emerald-500">${result.final}</p><p className="text-sm text-gray-500">Final Price</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-orange-500">${result.saved}</p><p className="text-sm text-gray-500">You Save</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function GstCalculator() {
    const [amount, setAmount] = useState(''); const [rate, setRate] = useState('18');
    const gst = amount ? (+amount * +rate / 100).toFixed(2) : '';
    const total = amount ? (+amount + +amount * +rate / 100).toFixed(2) : '';
    return (
        <ToolWrapper title="GST Calculator" icon={Calculator} description="Calculate GST amount">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Amount ($)</label><input className="input-field" type="number" value={amount} onChange={e => setAmount(e.target.value)} /></div>
                <div><label className="label">GST Rate (%)</label><input className="input-field" type="number" value={rate} onChange={e => setRate(e.target.value)} /></div>
            </div>
            {gst && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="card text-center"><p className="text-2xl font-bold text-royal-500">${gst}</p><p className="text-sm text-gray-500">GST Amount</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-emerald-500">${total}</p><p className="text-sm text-gray-500">Total Amount</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function VatCalculator() {
    const [amount, setAmount] = useState(''); const [rate, setRate] = useState('20');
    const vat = amount ? (+amount * +rate / 100).toFixed(2) : '';
    const total = amount ? (+amount + +amount * +rate / 100).toFixed(2) : '';
    return (
        <ToolWrapper title="VAT Calculator" icon={Calculator} description="Calculate VAT amount">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Amount ($)</label><input className="input-field" type="number" value={amount} onChange={e => setAmount(e.target.value)} /></div>
                <div><label className="label">VAT Rate (%)</label><input className="input-field" type="number" value={rate} onChange={e => setRate(e.target.value)} /></div>
            </div>
            {vat && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="card text-center"><p className="text-2xl font-bold text-royal-500">${vat}</p><p className="text-sm text-gray-500">VAT Amount</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-emerald-500">${total}</p><p className="text-sm text-gray-500">Total Amount</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function ProfitCalculator() {
    const [cp, setCp] = useState(''); const [sp, setSp] = useState('');
    const result = useMemo(() => {
        if (!cp || !sp) return null;
        const p = +sp - +cp;
        const pct = ((p / +cp) * 100).toFixed(2);
        return { profit: p.toFixed(2), percentage: pct };
    }, [cp, sp]);
    return (
        <ToolWrapper title="Profit Calculator" icon={Calculator} description="Calculate profit and margin">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Cost Price ($)</label><input className="input-field" type="number" value={cp} onChange={e => setCp(e.target.value)} /></div>
                <div><label className="label">Selling Price ($)</label><input className="input-field" type="number" value={sp} onChange={e => setSp(e.target.value)} /></div>
            </div>
            {result && +result.profit > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="card text-center"><p className="text-2xl font-bold text-emerald-500">${result.profit}</p><p className="text-sm text-gray-500">Profit</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-emerald-500">{result.percentage}%</p><p className="text-sm text-gray-500">Margin</p></div>
                </div>
            )}
            {result && +result.profit <= 0 && (
                <div className="card text-center mt-4 bg-red-50 dark:bg-red-900/20"><p className="text-lg font-bold text-red-500">No Profit — Loss of ${Math.abs(result.profit)}</p></div>
            )}
        </ToolWrapper>
    );
}

export function LossCalculator() {
    const [cp, setCp] = useState(''); const [sp, setSp] = useState('');
    const result = useMemo(() => {
        if (!cp || !sp) return null;
        const l = +cp - +sp;
        const pct = ((l / +cp) * 100).toFixed(2);
        return { loss: l.toFixed(2), percentage: pct };
    }, [cp, sp]);
    return (
        <ToolWrapper title="Loss Calculator" icon={Calculator} description="Calculate loss and margin">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Cost Price ($)</label><input className="input-field" type="number" value={cp} onChange={e => setCp(e.target.value)} /></div>
                <div><label className="label">Selling Price ($)</label><input className="input-field" type="number" value={sp} onChange={e => setSp(e.target.value)} /></div>
            </div>
            {result && +result.loss > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="card text-center"><p className="text-2xl font-bold text-red-500">${result.loss}</p><p className="text-sm text-gray-500">Loss</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-red-500">{result.percentage}%</p><p className="text-sm text-gray-500">Margin</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function EmiCalculator() {
    const [principal, setPrincipal] = useState(''); const [rate, setRate] = useState(''); const [tenure, setTenure] = useState('');
    const result = useMemo(() => {
        if (!principal || !rate || !tenure) return null;
        const r = +rate / 12 / 100; const n = +tenure * 12; const p = +principal;
        const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        return { emi: emi.toFixed(2), total: (emi * n).toFixed(2), interest: (emi * n - p).toFixed(2) };
    }, [principal, rate, tenure]);
    return (
        <ToolWrapper title="EMI Calculator" icon={Calculator} description="Calculate monthly EMI">
            <div className="grid grid-cols-3 gap-3">
                <div><label className="label">Principal ($)</label><input className="input-field" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} /></div>
                <div><label className="label">Rate (% p.a.)</label><input className="input-field" type="number" value={rate} onChange={e => setRate(e.target.value)} step={0.1} /></div>
                <div><label className="label">Tenure (Years)</label><input className="input-field" type="number" value={tenure} onChange={e => setTenure(e.target.value)} /></div>
            </div>
            {result && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="card text-center"><p className="text-xl font-bold text-royal-500">${result.emi}</p><p className="text-xs text-gray-500">Monthly EMI</p></div>
                    <div className="card text-center"><p className="text-xl font-bold text-orange-500">${result.interest}</p><p className="text-xs text-gray-500">Total Interest</p></div>
                    <div className="card text-center"><p className="text-xl font-bold text-emerald-500">${result.total}</p><p className="text-xs text-gray-500">Total Payment</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function LoanCalculator() {
    return <EmiCalculator />;
}

export function SipCalculator() {
    const [monthly, setMonthly] = useState(''); const [rate, setRate] = useState(''); const [years, setYears] = useState('');
    const result = useMemo(() => {
        if (!monthly || !rate || !years) return null;
        const r = +rate / 12 / 100; const n = +years * 12; const p = +monthly;
        const fv = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const invested = p * n;
        return { future: fv.toFixed(0), invested: invested.toFixed(0), wealth: (fv - invested).toFixed(0) };
    }, [monthly, rate, years]);
    return (
        <ToolWrapper title="SIP Calculator" icon={Calculator} description="Calculate SIP returns">
            <div className="grid grid-cols-3 gap-3">
                <div><label className="label">Monthly Investment ($)</label><input className="input-field" type="number" value={monthly} onChange={e => setMonthly(e.target.value)} /></div>
                <div><label className="label">Expected Return (% p.a.)</label><input className="input-field" type="number" value={rate} onChange={e => setRate(e.target.value)} step={0.1} /></div>
                <div><label className="label">Time Period (Years)</label><input className="input-field" type="number" value={years} onChange={e => setYears(e.target.value)} /></div>
            </div>
            {result && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="card text-center"><p className="text-xl font-bold text-emerald-500">${result.future}</p><p className="text-xs text-gray-500">Maturity Value</p></div>
                    <div className="card text-center"><p className="text-xl font-bold text-royal-500">${result.invested}</p><p className="text-xs text-gray-500">Amount Invested</p></div>
                    <div className="card text-center"><p className="text-xl font-bold text-orange-500">${result.wealth}</p><p className="text-xs text-gray-500">Wealth Gained</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function FdCalculator() {
    const [principal, setPrincipal] = useState(''); const [rate, setRate] = useState(''); const [years, setYears] = useState('');
    const result = useMemo(() => {
        if (!principal || !rate || !years) return null;
        const maturity = +principal * Math.pow(1 + +rate / 100, +years);
        const interest = maturity - +principal;
        return { maturity: maturity.toFixed(0), interest: interest.toFixed(0) };
    }, [principal, rate, years]);
    return (
        <ToolWrapper title="FD Calculator" icon={Calculator} description="Calculate Fixed Deposit maturity">
            <div className="grid grid-cols-3 gap-3">
                <div><label className="label">Principal ($)</label><input className="input-field" type="number" value={principal} onChange={e => setPrincipal(e.target.value)} /></div>
                <div><label className="label">Rate (% p.a.)</label><input className="input-field" type="number" value={rate} onChange={e => setRate(e.target.value)} step={0.1} /></div>
                <div><label className="label">Time (Years)</label><input className="input-field" type="number" value={years} onChange={e => setYears(e.target.value)} /></div>
            </div>
            {result && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="card text-center"><p className="text-2xl font-bold text-emerald-500">${result.maturity}</p><p className="text-sm text-gray-500">Maturity Amount</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-orange-500">${result.interest}</p><p className="text-sm text-gray-500">Interest Earned</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function CompoundInterestCalculator() {
    const [p, setP] = useState(''); const [r, setR] = useState(''); const [t, setT] = useState(''); const [n, setN] = useState('12');
    const result = useMemo(() => {
        if (!p || !r || !t) return null;
        const a = +p * Math.pow(1 + +r / 100 / +n, +n * +t);
        return { amount: a.toFixed(2), interest: (a - +p).toFixed(2) };
    }, [p, r, t, n]);
    return (
        <ToolWrapper title="Compound Interest Calculator" icon={Calculator} description="Calculate compound interest">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div><label className="label">Principal ($)</label><input className="input-field" type="number" value={p} onChange={e => setP(e.target.value)} /></div>
                <div><label className="label">Rate (% p.a.)</label><input className="input-field" type="number" value={r} onChange={e => setR(e.target.value)} step={0.1} /></div>
                <div><label className="label">Time (Years)</label><input className="input-field" type="number" value={t} onChange={e => setT(e.target.value)} /></div>
                <div><label className="label">Compounding</label><select className="input-field" value={n} onChange={e => setN(e.target.value)}><option value="1">Yearly</option><option value="2">Half-Yearly</option><option value="4">Quarterly</option><option value="12">Monthly</option><option value="365">Daily</option></select></div>
            </div>
            {result && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="card text-center"><p className="text-2xl font-bold text-emerald-500">${result.amount}</p><p className="text-sm text-gray-500">Total Amount</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-orange-500">${result.interest}</p><p className="text-sm text-gray-500">Interest Earned</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function SimpleInterestCalculator() {
    const [p, setP] = useState(''); const [r, setR] = useState(''); const [t, setT] = useState('');
    const result = useMemo(() => {
        if (!p || !r || !t) return null;
        const si = +p * +r * +t / 100;
        return { interest: si.toFixed(2), total: (+p + si).toFixed(2) };
    }, [p, r, t]);
    return (
        <ToolWrapper title="Simple Interest Calculator" icon={Calculator} description="Calculate simple interest">
            <div className="grid grid-cols-3 gap-3">
                <div><label className="label">Principal ($)</label><input className="input-field" type="number" value={p} onChange={e => setP(e.target.value)} /></div>
                <div><label className="label">Rate (% p.a.)</label><input className="input-field" type="number" value={r} onChange={e => setR(e.target.value)} step={0.1} /></div>
                <div><label className="label">Time (Years)</label><input className="input-field" type="number" value={t} onChange={e => setT(e.target.value)} /></div>
            </div>
            {result && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="card text-center"><p className="text-2xl font-bold text-orange-500">${result.interest}</p><p className="text-sm text-gray-500">Simple Interest</p></div>
                    <div className="card text-center"><p className="text-2xl font-bold text-emerald-500">${result.total}</p><p className="text-sm text-gray-500">Total Amount</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function TipCalculator() {
    const [bill, setBill] = useState(''); const [pct, setPct] = useState('15'); const [split, setSplit] = useState('1');
    const result = useMemo(() => {
        if (!bill) return null;
        const tip = +bill * +pct / 100;
        const total = +bill + tip;
        return { tip: tip.toFixed(2), total: total.toFixed(2), perPerson: (total / +split).toFixed(2) };
    }, [bill, pct, split]);
    return (
        <ToolWrapper title="Tip Calculator" icon={Calculator} description="Calculate tip and split bills">
            <div className="grid grid-cols-3 gap-3">
                <div><label className="label">Bill Amount ($)</label><input className="input-field" type="number" value={bill} onChange={e => setBill(e.target.value)} /></div>
                <div><label className="label">Tip (%)</label><input className="input-field" type="number" value={pct} onChange={e => setPct(e.target.value)} /></div>
                <div><label className="label">Split By</label><input className="input-field" type="number" value={split} onChange={e => setSplit(e.target.value)} min={1} /></div>
            </div>
            {result && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="card text-center"><p className="text-xl font-bold text-orange-500">${result.tip}</p><p className="text-xs text-gray-500">Tip</p></div>
                    <div className="card text-center"><p className="text-xl font-bold text-emerald-500">${result.total}</p><p className="text-xs text-gray-500">Total</p></div>
                    <div className="card text-center"><p className="text-xl font-bold text-royal-500">${result.perPerson}</p><p className="text-xs text-gray-500">Per Person</p></div>
                </div>
            )}
        </ToolWrapper>
    );
}

export function SplitBillCalculator() {
    return <TipCalculator />;
}

export function UnitPriceCalculator() {
    const [price, setPrice] = useState(''); const [qty, setQty] = useState('');
    const unit = price && qty ? (+price / +qty).toFixed(2) : '';
    return (
        <ToolWrapper title="Unit Price Calculator" icon={Calculator} description="Calculate price per unit">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Total Price ($)</label><input className="input-field" type="number" value={price} onChange={e => setPrice(e.target.value)} /></div>
                <div><label className="label">Quantity</label><input className="input-field" type="number" value={qty} onChange={e => setQty(e.target.value)} /></div>
            </div>
            {unit && <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">${unit}</p><p className="text-sm text-gray-500">Price Per Unit</p></div>}
        </ToolWrapper>
    );
}