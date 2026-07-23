import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ToolWrapper, { OutputBox } from '../components/ToolWrapper';
import { QrCode, Shield, Clock, Globe, Users, Folder, Ruler, Gamepad2 } from 'lucide-react';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';

// ==================== QR & BARCODE ====================
export function QrCodeGenerator() {
    const [text, setText] = useState('https://example.com');
    const [url, setUrl] = useState('');
    const generate = () => QRCode.toDataURL(text, { width: 256 }).then(setUrl);
    return (
        <ToolWrapper title="QR Code Generator" icon={QrCode} description="Generate QR codes from text or URLs">
            <input className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text or URL..." />
            <button className="btn-primary mt-3" onClick={generate}>Generate QR</button>
            {url && <div className="mt-4 text-center"><img src={url} alt="QR Code" className="inline-block rounded-lg" /><br /><a href={url} download="qrcode.png" className="btn-outline mt-2 inline-block">Download PNG</a></div>}
        </ToolWrapper>
    );
}

export function QrCodeScanner() {
    const [imgData, setImgData] = useState(null); const [result, setResult] = useState('');
    const scan = () => {
        if (!imgData) return;
        const img = new window.Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width; canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(data.data, data.width, data.height);
            setResult(code ? code.data : 'No QR code found');
        };
        img.src = imgData;
    };
    return (
        <ToolWrapper title="QR Code Scanner" icon={QrCode} description="Scan QR codes from images">
            <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if (f) { const r = new FileReader(); r.onload = ev => setImgData(ev.target.result); r.readAsDataURL(f); } }} className="input-field" />
            {imgData && <img src={imgData} alt="QR" className="mt-2 max-h-48 rounded" />}
            <button className="btn-primary mt-3" onClick={scan}>Scan QR</button>
            {result && <OutputBox value={result} label="Scanned Content" />}
        </ToolWrapper>
    );
}

export function WifiQrGenerator() {
    const [ssid, setSsid] = useState(''); const [pass, setPass] = useState(''); const [enc, setEnc] = useState('WPA'); const [url, setUrl] = useState('');
    const generate = () => {
        const wifi = `WIFI:T:${enc};S:${ssid};P:${pass};;`;
        QRCode.toDataURL(wifi, { width: 256 }).then(setUrl);
    };
    return (
        <ToolWrapper title="WiFi QR Generator" icon={QrCode} description="Generate QR code for WiFi networks">
            <input className="input-field mb-2" value={ssid} onChange={e => setSsid(e.target.value)} placeholder="WiFi Name (SSID)" />
            <input className="input-field mb-2" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" />
            <select className="input-field mb-3" value={enc} onChange={e => setEnc(e.target.value)}><option>WPA</option><option>WEP</option><option>nopass</option></select>
            <button className="btn-primary" onClick={generate}>Generate</button>
            {url && <div className="mt-4 text-center"><img src={url} alt="WiFi QR" className="inline-block rounded-lg" /></div>}
        </ToolWrapper>
    );
}

export function WhatsAppQr() {
    const [phone, setPhone] = useState(''); const [msg, setMsg] = useState(''); const [url, setUrl] = useState('');
    const generate = () => QRCode.toDataURL(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, { width: 256 }).then(setUrl);
    return (
        <ToolWrapper title="WhatsApp QR" icon={QrCode} description="Generate WhatsApp chat QR code">
            <input className="input-field mb-2" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number with country code" />
            <input className="input-field mb-3" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Default message (optional)" />
            <button className="btn-primary" onClick={generate}>Generate</button>
            {url && <div className="mt-4 text-center"><img src={url} alt="WhatsApp QR" className="inline-block rounded-lg" /></div>}
        </ToolWrapper>
    );
}

export function EmailQr() {
    const [email, setEmail] = useState(''); const [subj, setSubj] = useState(''); const [url, setUrl] = useState('');
    const generate = () => QRCode.toDataURL(`mailto:${email}?subject=${encodeURIComponent(subj)}`, { width: 256 }).then(setUrl);
    return (
        <ToolWrapper title="Email QR" icon={QrCode} description="Generate email QR code">
            <input className="input-field mb-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
            <input className="input-field mb-3" value={subj} onChange={e => setSubj(e.target.value)} placeholder="Subject" />
            <button className="btn-primary" onClick={generate}>Generate</button>
            {url && <div className="mt-4 text-center"><img src={url} alt="Email QR" className="inline-block rounded-lg" /></div>}
        </ToolWrapper>
    );
}

export function SmsQr() {
    const [phone, setPhone] = useState(''); const [msg, setMsg] = useState(''); const [url, setUrl] = useState('');
    const generate = () => QRCode.toDataURL(`sms:${phone}?body=${encodeURIComponent(msg)}`, { width: 256 }).then(setUrl);
    return (
        <ToolWrapper title="SMS QR" icon={QrCode} description="Generate SMS QR code">
            <input className="input-field mb-2" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" />
            <input className="input-field mb-3" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Message" />
            <button className="btn-primary" onClick={generate}>Generate</button>
            {url && <div className="mt-4 text-center"><img src={url} alt="SMS QR" className="inline-block rounded-lg" /></div>}
        </ToolWrapper>
    );
}

export function VCardQr() {
    const [name, setName] = useState(''); const [phone, setPhone] = useState(''); const [email, setEmail] = useState(''); const [url, setUrl] = useState('');
    const generate = () => {
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
        QRCode.toDataURL(vcard, { width: 256 }).then(setUrl);
    };
    return (
        <ToolWrapper title="vCard QR" icon={QrCode} description="Generate vCard contact QR code">
            <input className="input-field mb-2" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
            <input className="input-field mb-2" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
            <input className="input-field mb-3" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <button className="btn-primary" onClick={generate}>Generate</button>
            {url && <div className="mt-4 text-center"><img src={url} alt="vCard QR" className="inline-block rounded-lg" /></div>}
        </ToolWrapper>
    );
}

export function BarcodeGenerator() {
    const [text, setText] = useState('123456789');
    return (
        <ToolWrapper title="Barcode Generator" icon={QrCode} description="Generate simple barcodes">
            <input className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter numbers..." />
            {text && <div className="mt-4 flex justify-center"><svg viewBox={`0 0 ${text.length * 12 + 20} 80`} className="h-24">{text.split('').map((c, i) => <rect key={i} x={i * 12 + 10} y={10} width={c.charCodeAt(0) % 2 === 0 ? 6 : 4} height={60} fill="black" />)}</svg></div>}
        </ToolWrapper>
    );
}

// ==================== PASSWORD & SECURITY ====================
export function PasswordGenerator() {
    const [len, setLen] = useState(16); const [opts, setOpts] = useState({ upper: true, lower: true, nums: true, syms: true });
    const [pwd, setPwd] = useState('');
    const generate = () => {
        let chars = '';
        if (opts.upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (opts.lower) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (opts.nums) chars += '0123456789';
        if (opts.syms) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        setPwd(Array(len).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
    };
    return (
        <ToolWrapper title="Password Generator" icon={Shield} description="Generate secure random passwords">
            <div className="flex gap-3 items-end mb-3">
                <div className="flex-1"><label className="label">Length: {len}</label><input className="w-full" type="range" value={len} onChange={e => setLen(+e.target.value)} min={4} max={64} /></div>
                <button className="btn-primary" onClick={generate}>Generate</button>
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
                {Object.entries({ upper: 'Uppercase', lower: 'Lowercase', nums: 'Numbers', syms: 'Symbols' }).map(([k, l]) => (
                    <label key={k} className="flex items-center gap-1 text-sm cursor-pointer"><input type="checkbox" checked={opts[k]} onChange={e => setOpts({ ...opts, [k]: e.target.checked })} className="w-4 h-4" />{l}</label>
                ))}
            </div>
            {pwd && <OutputBox value={pwd} label="Generated Password" />}
        </ToolWrapper>
    );
}

export function PasswordStrengthChecker() {
    const [pwd, setPwd] = useState('');
    const strength = useMemo(() => {
        if (!pwd) return { score: 0, label: '', color: '' };
        let s = 0;
        if (pwd.length >= 8) s++;
        if (pwd.length >= 12) s++;
        if (/[A-Z]/.test(pwd)) s++;
        if (/[a-z]/.test(pwd)) s++;
        if (/[0-9]/.test(pwd)) s++;
        if (/[^A-Za-z0-9]/.test(pwd)) s++;
        const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500', 'bg-emerald-500'];
        const idx = Math.min(s - 1, 5);
        return { score: s, label: labels[Math.max(0, idx)], color: colors[Math.max(0, idx)], percent: (s / 6) * 100 };
    }, [pwd]);
    return (
        <ToolWrapper title="Password Strength Checker" icon={Shield} description="Check password strength">
            <input className="input-field" type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="Enter password to check..." />
            {pwd && (
                <div className="mt-4">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div className={`h-full ${strength.color} transition-all`} style={{ width: `${strength.percent}%` }} /></div>
                    <p className="text-sm font-semibold mt-2">{strength.label} (Score: {strength.score}/6)</p>
                </div>
            )}
        </ToolWrapper>
    );
}

export function PinGenerator() {
    const [len, setLen] = useState(4); const [pins, setPins] = useState([]);
    const generate = () => setPins(Array(5).fill(0).map(() => Array(len).fill(0).map(() => Math.floor(Math.random() * 10)).join('')));
    return (
        <ToolWrapper title="PIN Generator" icon={Shield} description="Generate random PIN codes">
            <div className="flex gap-3 items-end">
                <div className="flex-1"><label className="label">Length</label><select className="input-field" value={len} onChange={e => setLen(+e.target.value)}><option value={4}>4 digits</option><option value={6}>6 digits</option></select></div>
                <button className="btn-primary" onClick={generate}>Generate</button>
            </div>
            {pins.length > 0 && <OutputBox value={pins.join('\n')} label="PIN Codes" />}
        </ToolWrapper>
    );
}

export function RandomStringGenerator() {
    const [len, setLen] = useState(32); const [result, setResult] = useState('');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const generate = () => setResult(Array(len).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
    return (
        <ToolWrapper title="Random String Generator" icon={Shield} description="Generate random strings">
            <div className="flex gap-3 items-end">
                <div className="flex-1"><label className="label">Length</label><input className="input-field" type="number" value={len} onChange={e => setLen(+e.target.value)} min={1} max={256} /></div>
                <button className="btn-primary" onClick={generate}>Generate</button>
            </div>
            {result && <OutputBox value={result} label="Random String" />}
        </ToolWrapper>
    );
}

export function RandomUsernameGenerator() {
    const adjs = ['Happy', 'Swift', 'Lucky', 'Cool', 'Brave', 'Dark', 'Wild', 'Bright'];
    const nouns = ['Wolf', 'Storm', 'Fire', 'Blade', 'Shadow', 'Phoenix', 'Tiger', 'Eagle'];
    const [usernames, setUsernames] = useState([]);
    const generate = () => setUsernames(Array(8).fill(0).map(() => `${adjs[Math.floor(Math.random() * adjs.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${Math.floor(Math.random() * 999)}`));
    return (
        <ToolWrapper title="Random Username Generator" icon={Shield} description="Generate random usernames">
            <button className="btn-primary" onClick={generate}>Generate</button>
            {usernames.length > 0 && <OutputBox value={usernames.join('\n')} label="Usernames" />}
        </ToolWrapper>
    );
}

export function RandomOtpGenerator() {
    const [len, setLen] = useState(6); const [otp, setOtp] = useState('');
    const generate = () => setOtp(Array(len).fill(0).map(() => Math.floor(Math.random() * 10)).join(''));
    return (
        <ToolWrapper title="Random OTP Generator" icon={Shield} description="Generate one-time passwords">
            <div className="flex gap-3 items-end">
                <div className="flex-1"><label className="label">Digits</label><input className="input-field" type="number" value={len} onChange={e => setLen(+e.target.value)} min={4} max={10} /></div>
                <button className="btn-primary" onClick={generate}>Generate</button>
            </div>
            {otp && <div className="mt-4 text-center"><p className="text-4xl font-mono font-bold tracking-[0.5em] text-royal-500">{otp}</p></div>}
        </ToolWrapper>
    );
}

// ==================== DATE & TIME ====================
export function BirthdayCountdown() {
    const [dob, setDob] = useState('');
    const [next, setNext] = useState(null);
    useEffect(() => {
        if (!dob) { setNext(null); return; }
        const check = () => {
            const birth = dayjs(dob);
            let nextBday = dayjs().set('month', birth.month()).set('date', birth.date());
            if (nextBday.isBefore(dayjs(), 'day')) nextBday = nextBday.add(1, 'year');
            const diff = nextBday.diff(dayjs(), 'day');
            setNext({ days: diff, date: nextBday.format('MMMM D, YYYY') });
        };
        check();
    }, [dob]);
    return (
        <ToolWrapper title="Birthday Countdown" icon={Clock} description="Countdown to your next birthday">
            <div><label className="label">Date of Birth</label><input className="input-field" type="date" value={dob} onChange={e => setDob(e.target.value)} /></div>
            {next && <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">{next.days} days</p><p className="text-sm text-gray-500">Until {next.date}</p></div>}
        </ToolWrapper>
    );
}

export function LeapYearChecker() {
    const [year, setYear] = useState(new Date().getFullYear());
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return (
        <ToolWrapper title="Leap Year Checker" icon={Clock} description="Check if a year is a leap year">
            <input className="input-field" type="number" value={year} onChange={e => setYear(+e.target.value)} />
            <div className={`mt-4 p-4 rounded-lg text-center ${isLeap ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}><p className="text-xl font-bold">{year} is {isLeap ? '' : 'NOT'} a Leap Year</p></div>
        </ToolWrapper>
    );
}

export function TimeZoneConverter() {
    const zones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Asia/Kolkata', 'Asia/Dubai', 'Australia/Sydney', 'America/Los_Angeles'];
    const [from, setFrom] = useState('UTC');
    const [to, setTo] = useState('Asia/Kolkata');
    const [time, setTime] = useState(dayjs().format('HH:mm'));
    const convert = () => {
        const [h, m] = time.split(':').map(Number);
        const dt = dayjs().utc().hour(h).minute(m).utcOffset(from === 'UTC' ? 0 : dayjs().tz(from).utcOffset());
        return dt.tz(to).format('HH:mm');
    };
    return (
        <ToolWrapper title="Time Zone Converter" icon={Clock} description="Convert between time zones">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">From</label><select className="input-field" value={from} onChange={e => setFrom(e.target.value)}>{zones.map(z => <option key={z}>{z}</option>)}</select></div>
                <div><label className="label">To</label><select className="input-field" value={to} onChange={e => setTo(e.target.value)}>{zones.map(z => <option key={z}>{z}</option>)}</select></div>
            </div>
            <div className="mt-3"><label className="label">Time</label><input className="input-field" type="time" value={time} onChange={e => setTime(e.target.value)} /></div>
            <div className="card text-center mt-4"><p className="text-2xl font-bold text-royal-500">{convert()}</p><p className="text-sm text-gray-500">Converted Time</p></div>
        </ToolWrapper>
    );
}

export function CountdownTimer() {
    const [target, setTarget] = useState('');
    const [remaining, setRemaining] = useState('');
    useEffect(() => {
        if (!target) return;
        const interval = setInterval(() => {
            const diff = dayjs(target).diff(dayjs(), 'second');
            if (diff <= 0) { setRemaining('Time\'s up!'); clearInterval(interval); return; }
            const d = Math.floor(diff / 86400); const h = Math.floor((diff % 86400) / 3600); const m = Math.floor((diff % 3600) / 60); const s = diff % 60;
            setRemaining(`${d}d ${h}h ${m}m ${s}s`);
        }, 1000);
        return () => clearInterval(interval);
    }, [target]);
    return (
        <ToolWrapper title="Countdown Timer" icon={Clock} description="Countdown to a specific date and time">
            <input className="input-field" type="datetime-local" value={target} onChange={e => setTarget(e.target.value)} />
            {remaining && <div className="mt-4 text-center"><p className="text-4xl font-mono font-bold text-royal-500">{remaining}</p></div>}
        </ToolWrapper>
    );
}

export function Stopwatch() {
    const [time, setTime] = useState(0); const [running, setRunning] = useState(false); const intervalRef = useRef(null);
    useEffect(() => {
        if (running) { intervalRef.current = setInterval(() => setTime(t => t + 10), 10); }
        else clearInterval(intervalRef.current);
        return () => clearInterval(intervalRef.current);
    }, [running]);
    const fmt = (ms) => `${String(Math.floor(ms / 60000)).padStart(2, '0')}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')}.${String(Math.floor((ms % 1000) / 10)).padStart(2, '0')}`;
    return (
        <ToolWrapper title="Stopwatch" icon={Clock} description="Precise stopwatch with lap times">
            <div className="text-center"><p className="text-5xl font-mono font-bold text-royal-500 mb-4">{fmt(time)}</p>
                <div className="flex gap-2 justify-center">
                    <button className="btn-primary" onClick={() => setRunning(!running)}>{running ? 'Pause' : 'Start'}</button>
                    <button className="btn-outline" onClick={() => { setRunning(false); setTime(0); }}>Reset</button>
                </div>
            </div>
        </ToolWrapper>
    );
}

export function DigitalClock() {
    const [now, setNow] = useState(dayjs());
    useEffect(() => { const i = setInterval(() => setNow(dayjs()), 1000); return () => clearInterval(i); }, []);
    return (
        <ToolWrapper title="Digital Clock" icon={Clock} description="Live digital clock with date">
            <div className="text-center">
                <p className="text-6xl font-mono font-bold text-royal-500">{now.format('HH:mm:ss')}</p>
                <p className="text-xl text-gray-500 mt-2">{now.format('dddd, MMMM D, YYYY')}</p>
            </div>
        </ToolWrapper>
    );
}

export function CalendarGenerator() {
    const [month, setMonth] = useState(dayjs().month()); const [year, setYear] = useState(dayjs().year());
    const firstDay = dayjs().year(year).month(month).startOf('month').day();
    const daysInMonth = dayjs().year(year).month(month).daysInMonth();
    const days = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
    const monthName = dayjs().month(month).format('MMMM');
    return (
        <ToolWrapper title="Calendar Generator" icon={Clock} description="Generate monthly calendars">
            <div className="flex gap-3 items-end mb-4">
                <div className="flex-1"><label className="label">Month</label><select className="input-field" value={month} onChange={e => setMonth(+e.target.value)}>{Array(12).fill(0).map((_, i) => <option key={i} value={i}>{dayjs().month(i).format('MMMM')}</option>)}</select></div>
                <div className="flex-1"><label className="label">Year</label><input className="input-field" type="number" value={year} onChange={e => setYear(+e.target.value)} /></div>
            </div>
            <p className="text-center font-bold text-lg mb-2">{monthName} {year}</p>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="font-bold p-2 text-royal-500">{d}</div>)}
                {days.map((d, i) => <div key={i} className={`p-2 rounded ${d === dayjs().date() && month === dayjs().month() && year === dayjs().year() ? 'bg-royal-500 text-white' : d ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}`}>{d || ''}</div>)}
            </div>
        </ToolWrapper>
    );
}

export function WeekNumberCalculator() {
    const [date, setDate] = useState('');
    const weekNum = date ? dayjs(date).isoWeek() : null;
    return (
        <ToolWrapper title="Week Number Calculator" icon={Clock} description="Find the week number of any date">
            <input className="input-field" type="date" value={date} onChange={e => setDate(e.target.value)} />
            {weekNum && <div className="card text-center mt-4"><p className="text-3xl font-bold text-royal-500">Week {weekNum}</p><p className="text-sm text-gray-500">{dayjs(date).format('MMMM D, YYYY')}</p></div>}
        </ToolWrapper>
    );
}

// ==================== SEO TOOLS ====================
export function MetaTagGenerator() {
    const [title, setTitle] = useState(''); const [desc, setDesc] = useState(''); const [url, setUrl] = useState(''); const [img, setImg] = useState('');
    const result = `<title>${title}</title>\n<meta name="description" content="${desc}" />\n<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${desc}" />\n<meta property="og:url" content="${url}" />\n<meta property="og:image" content="${img}" />`;
    return (
        <ToolWrapper title="Meta Tag Generator" icon={Globe} description="Generate meta tags for SEO">
            <input className="input-field mb-2" value={title} onChange={e => setTitle(e.target.value)} placeholder="Page Title" />
            <textarea className="textarea-field mb-2" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" rows={3} />
            <input className="input-field mb-2" value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" />
            <input className="input-field mb-3" value={img} onChange={e => setImg(e.target.value)} placeholder="Image URL" />
            {title && <OutputBox value={result} label="Meta Tags" />}
        </ToolWrapper>
    );
}

export function OpenGraphGenerator() { return <MetaTagGenerator />; }

export function RobotsTxtGenerator() {
    const [rules, setRules] = useState([{ agent: '*', allow: true, path: '/' }]);
    const add = () => setRules([...rules, { agent: '*', allow: true, path: '/' }]);
    const result = rules.map(r => `User-agent: ${r.agent}\n${r.allow ? 'Allow' : 'Disallow'}: ${r.path}`).join('\n\n');
    return (
        <ToolWrapper title="Robots.txt Generator" icon={Globe} description="Generate robots.txt directives">
            {rules.map((r, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                    <input className="input-field" value={r.agent} onChange={e => { const n = [...rules]; n[i].agent = e.target.value; setRules(n); }} placeholder="User-agent" />
                    <select className="input-field" value={r.allow ? '1' : '0'} onChange={e => { const n = [...rules]; n[i].allow = e.target.value === '1'; setRules(n); }}><option value="1">Allow</option><option value="0">Disallow</option></select>
                    <input className="input-field" value={r.path} onChange={e => { const n = [...rules]; n[i].path = e.target.value; setRules(n); }} placeholder="Path" />
                </div>
            ))}
            <button className="btn-outline text-sm mt-1" onClick={add}>+ Add Rule</button>
            <OutputBox value={result} label="robots.txt" />
        </ToolWrapper>
    );
}

export function SitemapGenerator() {
    const [urls, setUrls] = useState('');
    const result = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.split('\n').filter(u => u.trim()).map(u => `  <url>\n    <loc>${u.trim()}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`).join('\n')}\n</urlset>`;
    return (
        <ToolWrapper title="Sitemap Generator" icon={Globe} description="Generate XML sitemaps">
            <textarea className="textarea-field" value={urls} onChange={e => setUrls(e.target.value)} placeholder="Enter one URL per line..." rows={8} />
            {urls.trim() && <OutputBox value={result} label="Sitemap XML" />}
        </ToolWrapper>
    );
}

export function KeywordDensityChecker() {
    const [text, setText] = useState('');
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const freq = {}; words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 20);
    return (
        <ToolWrapper title="Keyword Density Checker" icon={Globe} description="Check keyword density in text">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Paste your text..." rows={8} />
            {sorted.length > 0 && (
                <div className="mt-4 space-y-1 max-h-64 overflow-y-auto">
                    {sorted.map(([word, count]) => (
                        <div key={word} className="flex items-center gap-3">
                            <span className="text-sm font-medium w-24 truncate">{word}</span>
                            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-royal-500 rounded-full" style={{ width: `${(count / words.length) * 100 * 20}%` }} /></div>
                            <span className="text-xs text-gray-500 w-16 text-right">{count} ({((count / words.length) * 100).toFixed(1)}%)</span>
                        </div>
                    ))}
                </div>
            )}
        </ToolWrapper>
    );
}

export function UrlSlugGeneratorText() {
    const [text, setText] = useState('');
    const slug = text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-');
    return (
        <ToolWrapper title="URL Slug Generator" icon={Globe} description="Generate URL-friendly slugs">
            <input className="input-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter title..." />
            {slug && <OutputBox value={slug} label="Slug" />}
        </ToolWrapper>
    );
}

// ==================== SOCIAL MEDIA TOOLS ====================
export function YoutubeTitleChecker() {
    const [title, setTitle] = useState('');
    const len = title.length;
    const status = len <= 60 ? 'Perfect' : len <= 70 ? 'OK but truncated in search' : 'Too long';
    const color = len <= 60 ? 'text-green-500' : len <= 70 ? 'text-yellow-500' : 'text-red-500';
    return (
        <ToolWrapper title="YouTube Title Length Checker" icon={Globe} description="Check YouTube title length">
            <textarea className="textarea-field" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter YouTube title..." rows={3} />
            {title && <div className="mt-3"><div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div className={`h-full ${len <= 60 ? 'bg-green-500' : len <= 70 ? 'bg-yellow-500' : 'bg-red-500'} transition-all`} style={{ width: `${Math.min(len / 100 * 100, 100)}%` }} /></div><p className="text-sm mt-1">{len}/60 characters — <span className={`font-semibold ${color}`}>{status}</span></p></div>}
        </ToolWrapper>
    );
}

export function YoutubeTagFormatter() {
    const [tags, setTags] = useState('');
    const formatted = tags.split(/[,\n]+/).map(t => t.trim()).filter(Boolean).join(', ');
    return (
        <ToolWrapper title="YouTube Tag Formatter" icon={Globe} description="Format YouTube tags for copy-paste">
            <textarea className="textarea-field" value={tags} onChange={e => setTags(e.target.value)} placeholder="Enter tags (comma or newline separated)..." rows={6} />
            {tags && <OutputBox value={formatted} label="Formatted Tags" />}
        </ToolWrapper>
    );
}

export function HashtagGenerator() {
    const [topic, setTopic] = useState('');
    const [tags, setTags] = useState([]);
    const generate = () => {
        const base = topic.replace(/[^a-zA-Z0-9]/g, '');
        setTags([`#${base}`, `#${base}Daily`, `#${base}Lovers`, `#${base}Community`, `#${base}OfTheDay`, `#Insta${base}`, `#${base}Vibes`, `#${base}Photography`, `#${base}Life`, `#${base}Mood`]);
    };
    return (
        <ToolWrapper title="Hashtag Generator" icon={Globe} description="Generate hashtags for social media">
            <input className="input-field" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter topic..." />
            <button className="btn-primary mt-3" onClick={generate}>Generate</button>
            {tags.length > 0 && <OutputBox value={tags.join('\n')} label="Hashtags" />}
        </ToolWrapper>
    );
}

export function InstagramCaptionFormatter() {
    const [text, setText] = useState('');
    return (
        <ToolWrapper title="Instagram Caption Formatter" icon={Globe} description="Format captions with line breaks">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Enter caption..." rows={8} />
            {text && <OutputBox value={text.replace(/\n/g, '\n')} label="Preview" />}
        </ToolWrapper>
    );
}

export function TweetCharacterCounter() {
    const [text, setText] = useState('');
    const len = text.length;
    const color = len <= 280 ? 'text-green-500' : 'text-red-500';
    return (
        <ToolWrapper title="Tweet Character Counter" icon={Globe} description="Count tweet characters">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="What's happening?" rows={4} />
            {text && <p className="text-sm mt-2"><span className={`font-bold ${color}`}>{len}</span>/280 characters {len > 280 && `(${len - 280} over limit!)`}</p>}
        </ToolWrapper>
    );
}

// ==================== FILE TOOLS ====================
export function FileSizeConverter() {
    const [size, setSize] = useState(''); const [unit, setUnit] = useState('bytes');
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    const idx = units.indexOf(unit);
    const val = parseFloat(size) || 0;
    return (
        <ToolWrapper title="File Size Converter" icon={Folder} description="Convert between file size units">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Size</label><input className="input-field" type="number" value={size} onChange={e => setSize(e.target.value)} /></div>
                <div><label className="label">Unit</label><select className="input-field" value={unit} onChange={e => setUnit(e.target.value)}>{units.map(u => <option key={u}>{u}</option>)}</select></div>
            </div>
            {size && <div className="grid grid-cols-1 gap-2 mt-4">{units.map((u, i) => <div key={u} className="card flex justify-between items-center p-3"><span className="text-sm text-gray-500">{u}</span><span className="font-mono font-semibold">{(val * Math.pow(1024, idx - i)).toFixed(4)}</span></div>)}</div>}
        </ToolWrapper>
    );
}

export function ZipSizeEstimator() {
    const [text, setText] = useState(''); const [ratio, setRatio] = useState(70);
    const bytes = new TextEncoder().encode(text).length;
    const estimated = Math.round(bytes * ratio / 100);
    return (
        <ToolWrapper title="ZIP Size Estimator" icon={Folder} description="Estimate compressed file size">
            <textarea className="textarea-field" value={text} onChange={e => setText(e.target.value)} placeholder="Paste content to estimate..." rows={6} />
            <div className="mt-3"><label className="label">Estimated compression ratio: {ratio}%</label><input className="w-full" type="range" value={ratio} onChange={e => setRatio(+e.target.value)} min={10} max={90} /></div>
            {text && <div className="grid grid-cols-2 gap-3 mt-3"><div className="card text-center"><p className="text-xl font-bold">{bytes.toLocaleString()}</p><p className="text-xs text-gray-500">Original (bytes)</p></div><div className="card text-center"><p className="text-xl font-bold text-royal-500">{estimated.toLocaleString()}</p><p className="text-xs text-gray-500">Estimated ZIP (bytes)</p></div></div>}
        </ToolWrapper>
    );
}

export function FileExtensionChecker() {
    const [name, setFileName] = useState('');
    const ext = name.includes('.') ? name.split('.').pop().toLowerCase() : '';
    const mimeTypes = { pdf: 'application/pdf', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', svg: 'image/svg+xml', webp: 'image/webp', mp3: 'audio/mpeg', mp4: 'video/mp4', zip: 'application/zip', json: 'application/json', html: 'text/html', css: 'text/css', js: 'application/javascript', txt: 'text/plain', doc: 'application/msword', xls: 'application/vnd.ms-excel', ppt: 'application/vnd.ms-powerpoint' };
    return (
        <ToolWrapper title="File Extension Checker" icon={Folder} description="Check file extension and MIME type">
            <input className="input-field" value={name} onChange={e => setFileName(e.target.value)} placeholder="Enter filename (e.g., document.pdf)" />
            {ext && <div className="mt-4"><div className="card p-4"><p><span className="text-gray-500">Extension:</span> <span className="font-bold">.{ext}</span></p><p><span className="text-gray-500">MIME Type:</span> <span className="font-mono">{mimeTypes[ext] || 'Unknown'}</span></p></div></div>}
        </ToolWrapper>
    );
}

export function MimeTypeChecker() {
    const [file, setFile] = useState(null);
    return (
        <ToolWrapper title="MIME Type Checker" icon={Folder} description="Detect MIME type of uploaded files">
            <input type="file" onChange={e => setFile(e.target.files[0])} className="input-field" />
            {file && <div className="card p-4 mt-3"><p><span className="text-gray-500">Name:</span> {file.name}</p><p><span className="text-gray-500">Type:</span> <span className="font-mono">{file.type || 'Unknown'}</span></p><p><span className="text-gray-500">Size:</span> {(file.size / 1024).toFixed(2)} KB</p></div>}
        </ToolWrapper>
    );
}

// ==================== UNIT CONVERTERS ====================
function UnitConverter({ title, categories }) {
    const [cat, setCat] = useState(Object.keys(categories)[0]);
    const [from, setFrom] = useState(categories[Object.keys(categories)[0]][0].key);
    const [to, setTo] = useState(categories[Object.keys(categories)[0]][1]?.key || categories[Object.keys(categories)[0]][0].key);
    const [val, setVal] = useState('');
    const units = categories[cat] || [];
    const convert = () => {
        const f = units.find(u => u.key === from);
        const t = units.find(u => u.key === to);
        if (!f || !t || !val) return '';
        const base = +val * f.factor;
        return (base / t.factor).toFixed(6);
    };
    return (
        <ToolWrapper title={title} icon={Ruler} description={`Convert between ${title.toLowerCase().replace(' converter', '')} units`}>
            <div className="mb-3"><label className="label">Category</label><select className="input-field" value={cat} onChange={e => { setCat(e.target.value); setFrom(categories[e.target.value][0].key); setTo(categories[e.target.value][1]?.key || categories[e.target.value][0].key); }}>{Object.keys(categories).map(k => <option key={k}>{k}</option>)}</select></div>
            <div className="grid grid-cols-2 gap-3 items-end">
                <div><label className="label">From</label><select className="input-field" value={from} onChange={e => setFrom(e.target.value)}>{units.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}</select></div>
                <div><label className="label">To</label><select className="input-field" value={to} onChange={e => setTo(e.target.value)}>{units.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}</select></div>
            </div>
            <div className="mt-3"><label className="label">Value</label><input className="input-field" type="number" value={val} onChange={e => setVal(e.target.value)} placeholder="Enter value..." /></div>
            {val && <div className="card text-center mt-4"><p className="text-2xl font-bold text-royal-500">{convert()} {units.find(u => u.key === to)?.label}</p></div>}
        </ToolWrapper>
    );
}

const lengthUnits = [{ key: 'm', label: 'Meters', factor: 1 }, { key: 'km', label: 'Kilometers', factor: 1000 }, { key: 'cm', label: 'Centimeters', factor: 0.01 }, { key: 'mm', label: 'Millimeters', factor: 0.001 }, { key: 'mi', label: 'Miles', factor: 1609.344 }, { key: 'yd', label: 'Yards', factor: 0.9144 }, { key: 'ft', label: 'Feet', factor: 0.3048 }, { key: 'in', label: 'Inches', factor: 0.0254 }];
const weightUnits = [{ key: 'kg', label: 'Kilograms', factor: 1 }, { key: 'g', label: 'Grams', factor: 0.001 }, { key: 'mg', label: 'Milligrams', factor: 0.000001 }, { key: 'lb', label: 'Pounds', factor: 0.453592 }, { key: 'oz', label: 'Ounces', factor: 0.0283495 }, { key: 't', label: 'Metric Tons', factor: 1000 }];
const areaUnits = [{ key: 'sqm', label: 'Sq Meters', factor: 1 }, { key: 'sqkm', label: 'Sq Kilometers', factor: 1e6 }, { key: 'sqft', label: 'Sq Feet', factor: 0.092903 }, { key: 'sqyd', label: 'Sq Yards', factor: 0.836127 }, { key: 'acre', label: 'Acres', factor: 4046.86 }, { key: 'ha', label: 'Hectares', factor: 10000 }];
const volumeUnits = [{ key: 'l', label: 'Liters', factor: 1 }, { key: 'ml', label: 'Milliliters', factor: 0.001 }, { key: 'gal', label: 'Gallons (US)', factor: 3.78541 }, { key: 'qt', label: 'Quarts', factor: 0.946353 }, { key: 'pt', label: 'Pints', factor: 0.473176 }, { key: 'cup', label: 'Cups', factor: 0.236588 }, { key: 'floz', label: 'Fl Oz', factor: 0.0295735 }, { key: 'cbm', label: 'Cubic Meters', factor: 1000 }];
const tempUnits = [{ key: 'c', label: 'Celsius', factor: 1 }, { key: 'f', label: 'Fahrenheit', factor: 1 }, { key: 'k', label: 'Kelvin', factor: 1 }];
const speedUnits = [{ key: 'ms', label: 'm/s', factor: 1 }, { key: 'kmh', label: 'km/h', factor: 0.277778 }, { key: 'mph', label: 'mph', factor: 0.44704 }, { key: 'kn', label: 'Knots', factor: 0.514444 }, { key: 'fts', label: 'ft/s', factor: 0.3048 }];
const timeUnits = [{ key: 's', label: 'Seconds', factor: 1 }, { key: 'ms', label: 'Milliseconds', factor: 0.001 }, { key: 'min', label: 'Minutes', factor: 60 }, { key: 'hr', label: 'Hours', factor: 3600 }, { key: 'day', label: 'Days', factor: 86400 }, { key: 'wk', label: 'Weeks', factor: 604800 }, { key: 'yr', label: 'Years', factor: 31536000 }];
const storageUnits = [{ key: 'b', label: 'Bytes', factor: 1 }, { key: 'kb', label: 'Kilobytes', factor: 1024 }, { key: 'mb', label: 'Megabytes', factor: 1048576 }, { key: 'gb', label: 'Gigabytes', factor: 1073741824 }, { key: 'tb', label: 'Terabytes', factor: 1099511627776 }];
const energyUnits = [{ key: 'j', label: 'Joules', factor: 1 }, { key: 'kj', label: 'Kilojoules', factor: 1000 }, { key: 'cal', label: 'Calories', factor: 4.184 }, { key: 'kcal', label: 'Kilocalories', factor: 4184 }, { key: 'wh', label: 'Watt-hours', factor: 3600 }, { key: 'kwh', label: 'Kilowatt-hours', factor: 3600000 }];
const pressureUnits = [{ key: 'pa', label: 'Pascals', factor: 1 }, { key: 'kpa', label: 'Kilopascals', factor: 1000 }, { key: 'bar', label: 'Bar', factor: 100000 }, { key: 'atm', label: 'Atmospheres', factor: 101325 }, { key: 'psi', label: 'PSI', factor: 6894.76 }, { key: 'torr', label: 'Torr', factor: 133.322 }];

export function LengthConverter() { return <UnitConverter title="Length Converter" categories={{ 'Length': lengthUnits }} />; }
export function WeightConverter() { return <UnitConverter title="Weight Converter" categories={{ 'Weight': weightUnits }} />; }
export function AreaConverter() { return <UnitConverter title="Area Converter" categories={{ 'Area': areaUnits }} />; }
export function VolumeConverter() { return <UnitConverter title="Volume Converter" categories={{ 'Volume': volumeUnits }} />; }

export function TemperatureConverter() {
    const [from, setFrom] = useState('c'); const [to, setTo] = useState('f'); const [val, setVal] = useState('');
    const convert = (v, f, t) => {
        let celsius = f === 'c' ? v : f === 'f' ? (v - 32) * 5 / 9 : v - 273.15;
        return t === 'c' ? celsius : t === 'f' ? celsius * 9 / 5 + 32 : celsius + 273.15;
    };
    return (
        <ToolWrapper title="Temperature Converter" icon={Ruler} description="Convert between temperature units">
            <div className="grid grid-cols-2 gap-3 items-end">
                <div><label className="label">From</label><select className="input-field" value={from} onChange={e => setFrom(e.target.value)}><option value="c">Celsius</option><option value="f">Fahrenheit</option><option value="k">Kelvin</option></select></div>
                <div><label className="label">To</label><select className="input-field" value={to} onChange={e => setTo(e.target.value)}><option value="c">Celsius</option><option value="f">Fahrenheit</option><option value="k">Kelvin</option></select></div>
            </div>
            <input className="input-field mt-3" type="number" value={val} onChange={e => setVal(e.target.value)} placeholder="Enter value..." />
            {val && <div className="card text-center mt-4"><p className="text-2xl font-bold text-royal-500">{convert(+val, from, to).toFixed(2)} °{to.toUpperCase()}</p></div>}
        </ToolWrapper>
    );
}

export function SpeedConverter() { return <UnitConverter title="Speed Converter" categories={{ 'Speed': speedUnits }} />; }
export function TimeUnitConverter() { return <UnitConverter title="Time Converter" categories={{ 'Time': timeUnits }} />; }
export function StorageConverter() { return <UnitConverter title="Storage Converter" categories={{ 'Digital Storage': storageUnits }} />; }
export function EnergyConverter() { return <UnitConverter title="Energy Converter" categories={{ 'Energy': energyUnits }} />; }
export function PressureConverter() { return <UnitConverter title="Pressure Converter" categories={{ 'Pressure': pressureUnits }} />; }

export function CurrencyConverter() {
    const rates = { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, JPY: 149.5, AUD: 1.53, CAD: 1.36, CNY: 7.24, KRW: 1328.5, BRL: 4.97 };
    const [from, setFrom] = useState('USD'); const [to, setTo] = useState('EUR'); const [val, setVal] = useState('1');
    const result = val ? ((+val / rates[from]) * rates[to]).toFixed(4) : '';
    return (
        <ToolWrapper title="Currency Converter" icon={Ruler} description="Convert between currencies (offline rates)">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">From</label><select className="input-field" value={from} onChange={e => setFrom(e.target.value)}>{Object.keys(rates).map(r => <option key={r}>{r}</option>)}</select></div>
                <div><label className="label">To</label><select className="input-field" value={to} onChange={e => setTo(e.target.value)}>{Object.keys(rates).map(r => <option key={r}>{r}</option>)}</select></div>
            </div>
            <input className="input-field mt-3" type="number" value={val} onChange={e => setVal(e.target.value)} />
            {result && <div className="card text-center mt-4"><p className="text-2xl font-bold text-royal-500">{result} {to}</p><p className="text-xs text-gray-500">Offline rates (approximate)</p></div>}
        </ToolWrapper>
    );
}

// ==================== FUN TOOLS ====================
export function RandomNamePicker() {
    const [names, setNames] = useState(''); const [winner, setWinner] = useState('');
    const pick = () => { const arr = names.split(/[,\n]+/).filter(n => n.trim()); if (arr.length) setWinner(arr[Math.floor(Math.random() * arr.length)].trim()); };
    return (
        <ToolWrapper title="Random Name Picker" icon={Gamepad2} description="Pick a random name from a list">
            <textarea className="textarea-field" value={names} onChange={e => setNames(e.target.value)} placeholder="Enter names (one per line or comma separated)..." rows={6} />
            <button className="btn-primary mt-3" onClick={pick}>Pick Random</button>
            {winner && <div className="card text-center mt-4 bg-royal-50 dark:bg-royal-900/20"><p className="text-3xl font-bold text-royal-500">{winner}</p></div>}
        </ToolWrapper>
    );
}

export function RandomTeamGenerator() {
    const [names, setNames] = useState(''); const [count, setCount] = useState(2); const [teams, setTeams] = useState([]);
    const generate = () => {
        const arr = names.split(/[,\n]+/).filter(n => n.trim()).map(n => n.trim());
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        const t = Array(count).fill(0).map(() => []);
        shuffled.forEach((n, i) => t[i % count].push(n));
        setTeams(t);
    };
    return (
        <ToolWrapper title="Random Team Generator" icon={Gamepad2} description="Split names into random teams">
            <textarea className="textarea-field mb-2" value={names} onChange={e => setNames(e.target.value)} placeholder="Enter names..." rows={4} />
            <div className="flex gap-3 items-end">
                <div className="flex-1"><label className="label">Teams</label><input className="input-field" type="number" value={count} onChange={e => setCount(+e.target.value)} min={2} max={10} /></div>
                <button className="btn-primary" onClick={generate}>Generate</button>
            </div>
            {teams.length > 0 && <div className="grid grid-cols-2 gap-3 mt-4">{teams.map((t, i) => <div key={i} className="card p-3"><p className="font-bold text-royal-500 mb-1">Team {i + 1}</p><p className="text-sm">{t.join(', ')}</p></div>)}</div>}
        </ToolWrapper>
    );
}

export function RandomQuoteGenerator() {
    const quotes = [
        { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
        { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
        { text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
        { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
        { text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
        { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
        { text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' },
        { text: 'Your time is limited, don\'t waste it living someone else\'s life.', author: 'Steve Jobs' },
    ];
    const [quote, setQuote] = useState(quotes[0]);
    const pick = () => setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    return (
        <ToolWrapper title="Random Quote Generator" icon={Gamepad2} description="Get inspired with random quotes">
            <button className="btn-primary" onClick={pick}>New Quote</button>
            <div className="card mt-4 p-6 text-center">
                <p className="text-xl italic text-gray-700 dark:text-gray-300 mb-3">"{quote.text}"</p>
                <p className="text-sm text-gray-500">— {quote.author}</p>
            </div>
        </ToolWrapper>
    );
}

export function LuckyNumberGenerator() {
    const [min, setMin] = useState(1); const [max, setMax] = useState(100); const [result, setResult] = useState('');
    const generate = () => setResult(Math.floor(Math.random() * (+max - +min + 1)) + +min);
    return (
        <ToolWrapper title="Lucky Number Generator" icon={Gamepad2} description="Generate your lucky number">
            <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Min</label><input className="input-field" type="number" value={min} onChange={e => setMin(+e.target.value)} /></div>
                <div><label className="label">Max</label><input className="input-field" type="number" value={max} onChange={e => setMax(+e.target.value)} /></div>
            </div>
            <button className="btn-primary mt-3" onClick={generate}>Generate Lucky Number</button>
            {result && <div className="card text-center mt-4 bg-gradient-to-r from-royal-50 to-sky-50 dark:from-royal-900/20 dark:to-sky-900/20"><p className="text-5xl font-bold bg-gradient-to-r from-royal-500 to-sky-500 bg-clip-text text-transparent">{result}</p><p className="text-sm text-gray-500 mt-1">Your Lucky Number</p></div>}
        </ToolWrapper>
    );
}

export function SpinWheel() {
    const [items, setItems] = useState('Option 1\nOption 2\nOption 3\nOption 4');
    const [spinning, setSpinning] = useState(false);
    const [selected, setSelected] = useState('');
    const [rotation, setRotation] = useState(0);
    const [winnerIdx, setWinnerIdx] = useState(-1);
    const list = items.split('\n').filter(i => i.trim());
    const colors = ['#2563eb', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316'];
    const segmentAngle = list.length > 0 ? 360 / list.length : 360;

    const buildConicGradient = () => {
        const stops = list.map((_, i) => {
            const start = (segmentAngle * i);
            const end = (segmentAngle * (i + 1));
            return `${colors[i % colors.length]} ${start}deg ${end}deg`;
        });
        return `conic-gradient(${stops.join(', ')})`;
    };

    const spin = () => {
        if (list.length < 2) return;
        setSpinning(true);
        setSelected('');
        setWinnerIdx(-1);
        const idx = Math.floor(Math.random() * list.length);
        // Pointer is at top (0 deg / 360 deg). We rotate the wheel so the winning segment's center aligns with the pointer.
        // Segment i spans from (segmentAngle * i) to (segmentAngle * (i+1)) in the gradient starting at 0deg.
        // After rotation, segment i's start becomes (segmentAngle * i + rotation) mod 360.
        // We want the CENTER of segment i to align with the pointer at 0 deg (top).
        // Center of segment i = segmentAngle * i + segmentAngle / 2
        // We need: (segmentAngle * i + segmentAngle / 2 + rotation) % 360 = 0
        // So: rotation = -(segmentAngle * i + segmentAngle / 2) mod 360
        // But we add full rotations for the spinning effect.
        const segmentCenter = segmentAngle * idx + segmentAngle / 2;
        const fullSpins = 360 * (5 + Math.floor(Math.random() * 3));
        const newRot = fullSpins + (360 - (segmentCenter % 360));
        setRotation(prev => prev + newRot);
        setTimeout(() => {
            setSelected(list[idx]);
            setWinnerIdx(idx);
            setSpinning(false);
        }, 3200);
    };

    return (
        <ToolWrapper title="Spin Wheel" icon={Gamepad2} description="Spin the wheel to pick randomly">
            <textarea className="textarea-field mb-3" value={items} onChange={e => setItems(e.target.value)} placeholder="One option per line..." rows={4} />
            <div className="flex justify-center mb-4">
                <div className="relative select-none">
                    {/* Pointer */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 w-0 h-0" style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '14px solid #e11d48' }} />
                    {/* Wheel */}
                    <div
                        className="w-56 h-56 rounded-full border-4 border-gray-300 dark:border-gray-600"
                        style={{
                            background: list.length >= 2 ? buildConicGradient() : '#e5e7eb',
                            transform: `rotate(${rotation}deg)`,
                            transition: spinning ? 'transform 3.2s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                        }}
                    >
                        {/* Segment labels */}
                        {list.map((item, i) => {
                            const midAngle = segmentAngle * i + segmentAngle / 2;
                            return (
                                <div
                                    key={i}
                                    className="absolute"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        width: '0',
                                        height: '0',
                                        transform: `rotate(${midAngle}deg) translateY(-60px)`,
                                        transformOrigin: '0 0',
                                    }}
                                >
                                    <span
                                        className="absolute text-white text-[10px] font-bold leading-tight"
                                        style={{
                                            transform: `rotate(-${midAngle + rotation}deg)`,
                                            whiteSpace: 'nowrap',
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                                            left: '-24px',
                                            top: '-7px',
                                        }}
                                    >
                                        {item.length > 10 ? item.substring(0, 10) + '…' : item}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <button className="btn-primary w-full text-lg font-bold" onClick={spin} disabled={spinning}>
                {spinning ? '⏳ Spinning...' : '🎯 SPIN!'}
            </button>
            {selected && (
                <div className="card text-center mt-4 bg-royal-50 dark:bg-royal-900/20 border-2 border-royal-300 dark:border-royal-700 animate-bounce">
                    <p className="text-xl font-bold text-royal-600 dark:text-royal-400">🎉 Winner!</p>
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2">{selected}</p>
                </div>
            )}
            <div className="mt-3 flex flex-wrap gap-1 justify-center">
                {list.map((item, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: colors[i % colors.length] }}>
                        {i + 1 === winnerIdx + 1 && selected ? '🏆 ' : ''}{item.length > 12 ? item.substring(0, 12) + '…' : item}
                    </span>
                ))}
            </div>
        </ToolWrapper>
    );
}

export function DecisionMaker() {
    const [options, setOptions] = useState('Yes\nNo\nMaybe');
    const [result, setResult] = useState('');
    const decide = () => { const arr = options.split('\n').filter(o => o.trim()); if (arr.length) setResult(arr[Math.floor(Math.random() * arr.length)].trim()); };
    return (
        <ToolWrapper title="Decision Maker" icon={Gamepad2} description="Make random decisions">
            <textarea className="textarea-field" value={options} onChange={e => setOptions(e.target.value)} placeholder="One option per line..." rows={4} />
            <button className="btn-primary mt-3" onClick={decide}>Decide!</button>
            {result && <div className="card text-center mt-4 bg-royal-50 dark:bg-royal-900/20"><p className="text-3xl font-bold text-royal-500">{result}</p></div>}
        </ToolWrapper>
    );
}

export function YesNoGenerator() {
    const [result, setResult] = useState('');
    const generate = () => setResult(Math.random() < 0.5 ? 'Yes ✓' : 'No ✕');
    return (
        <ToolWrapper title="Yes/No Generator" icon={Gamepad2} description="Get a random yes or no answer">
            <button className="btn-primary text-lg px-8 py-4" onClick={generate}>Ask the Magic Ball</button>
            {result && <div className="card text-center mt-4"><p className="text-4xl font-bold text-royal-500">{result}</p></div>}
        </ToolWrapper>
    );
}

// ==================== EXPORTS ====================
// QR & Barcode
export { QrCodeGenerator as QrCodeGeneratorTool };
export { QrCodeScanner as QrCodeScannerTool };
export { WifiQrGenerator as WifiQrGeneratorTool };

// Password & Security
export { PasswordGenerator as PasswordGeneratorTool };
export { PasswordStrengthChecker as PasswordStrengthCheckerTool };
export { PinGenerator as PinGeneratorTool };
export { RandomStringGenerator as RandomStringGeneratorTool };
export { RandomUsernameGenerator as RandomUsernameGeneratorTool };
export { RandomOtpGenerator as RandomOtpGeneratorTool };

// Date & Time
export { BirthdayCountdown as BirthdayCountdownTool };
export { LeapYearChecker as LeapYearCheckerTool };
export { TimeZoneConverter as TimeZoneConverterTool };
export { CountdownTimer as CountdownTimerTool };
export { Stopwatch as StopwatchTool };
export { DigitalClock as DigitalClockTool };
export { CalendarGenerator as CalendarGeneratorTool };
export { WeekNumberCalculator as WeekNumberCalculatorTool };

// SEO
export { MetaTagGenerator as MetaTagGeneratorTool };
export { OpenGraphGenerator as OpenGraphGeneratorTool };
export { RobotsTxtGenerator as RobotsTxtGeneratorTool };
export { SitemapGenerator as SitemapGeneratorTool };
export { KeywordDensityChecker as KeywordDensityCheckerTool };
export { UrlSlugGeneratorText as UrlSlugGeneratorTextTool };

// Social Media
export { YoutubeTitleChecker as YoutubeTitleCheckerTool };
export { YoutubeTagFormatter as YoutubeTagFormatterTool };
export { HashtagGenerator as HashtagGeneratorTool };
export { InstagramCaptionFormatter as InstagramCaptionFormatterTool };
export { TweetCharacterCounter as TweetCharacterCounterTool };

// File
export { FileSizeConverter as FileSizeConverterTool };
export { ZipSizeEstimator as ZipSizeEstimatorTool };
export { FileExtensionChecker as FileExtensionCheckerTool };
export { MimeTypeChecker as MimeTypeCheckerTool };

// Unit Converters (already exported at declaration)

// Fun Tools (already exported at declaration)

