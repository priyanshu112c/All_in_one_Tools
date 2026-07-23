# Lesson 08: src/tools/MiscTools.jsx - Miscellaneous Tools (50+ Tools)

## Purpose

Yeh file **50+ miscellaneous tools** ka largest collection contain karti hai. QR, password, datetime, SEO, social, file, unit converter, fun tools sab yahan hain.

## Why this file exists

Baaki categories se bache hue tools miscellaneous mein aate hain. Code reusability ke liye ek file mein grouped hai.

## Tool Categories Within

### QR & Barcode
| Tool | Kya karta hai |
|------|---------------|
| QRCodeGenerator | Text/URL → QR code |
| QRCodeScanner | Scan QR from camera |
| BarcodeGenerator | EAN, UPC, Code128 |
| WiFiQRGenerator | WiFi → QR code |
| VCardQR | Contact → QR |

### Password & Security
| Tool | Kya karta hai |
|------|---------------|
| PasswordGenerator | Random strong passwords |
| PasswordStrength | Check password strength |
| RandomPassword | Customizable passwords |
| HashGenerator | MD5, SHA-1, SHA-256 |

### Date & Time
| Tool | Kya karta hai |
|------|---------------|
| DateConverter | Date format converter |
| TimezoneConverter | Timezone conversion |
| AgeCalculator | Age from DOB |
| CountdownTimer | Event countdown |
| CalendarGenerator | Month/year calendar |
| DateDifference | Days between dates |
| WorldClock | Multiple timezones |

### SEO Tools
| Tool | Kya karta hai |
|------|---------------|
| KeywordGenerator | Related keywords |
| SERPSimulator | Google SERP preview |
| MetaTagGenerator | Meta tags for HTML |
| HeadlineAnalyzer | Headline score |
| WebsiteReview | Basic SEO audit |

### Social Media
| Tool | Kya karta hai |
|------|---------------|
| HashtagGenerator | Trending hashtags |
| YouTubeTagGenerator | Video tags |
| BioGenerator | Social media bios |
| CaptionGenerator | Photo captions |

### File Tools
| Tool | Kya karta hai |
|------|---------------|
| FileConverter | Basic file conversion |
| FileSizeCalculator | Size in B/KB/MB/GB |
| ChecksumCalculator | File integrity check |
| MIMETypeDetector | File MIME type |

### Unit Converters (11 tools)
| Tool | From → To |
|------|-----------|
| LengthConverter | km, m, cm, mm, mi, ft, in |
| WeightConverter | kg, g, lb, oz, ton |
| TemperatureConverter | C, F, K |
| VolumeConverter | L, mL, gal, oz |
| AreaConverter | m², km², acre, hectare |
| SpeedConverter | km/h, mph, m/s, knot |
| TimeConverter | s, min, h, day, week |
| PressureConverter | Pa, bar, psi, atm |
| EnergyConverter | J, cal, kWh |
| DataConverter | B, KB, MB, GB, TB |
| CurrencyConverter | USD, EUR, INR, GBP, etc. |

### Fun Tools
| Tool | Kya karta hai |
|------|---------------|
| RandomPassword | Funny password |
| DiceRoller | Roll dice |
| CoinFlip | Heads/Tails |
| ColorPick | Fun color game |
| RandomName | Random person name |
| NumberFacts | Interesting number facts |
| TriviaGenerator | Random trivia |
| WordScramble | Jumble words game |

## Key Libraries

```js
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import dayjs from 'dayjs';
```

## Common Patterns

### QR Code Generation
```jsx
QRCode.toDataURL(text, { width: 300 })
    .then(url => setQrUrl(url));
```

### Password Generator
```jsx
function generatePassword(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++)
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    return password;
}
```

### Unit Conversion
```jsx
function convert(value, fromUnit, toUnit, conversionRates) {
    const base = value * conversionRates[fromUnit];
    return base / conversionRates[toUnit];
}
```

## Interview Questions

1. **Q: `dayjs` vs `moment.js` - kya better hai?**
   A: `dayjs` - sirf 2KB ka, `moment.js` - 300KB+. Modern projects mein `dayjs` prefer karte hain.

2. **Q: Currency conversion mein fixed rates kyun?**
   A: Client-side app hai, live API nahi hai. Production mein live exchange rates API integrate karoge.

3. **Q: QR code generation browser mein kaise hota hai?**
   A: `qrcode` library Canvas API use karti hai. QR matrix calculate karke usko draw karti hai.

## Revision Notes

- 50+ tools in one file
- 8 categories within: QR, password, datetime, SEO, social, file, unit, fun
- Libraries: qrcode, jsQR, dayjs
- Unit converters use conversion rate tables
- Largest file in the project