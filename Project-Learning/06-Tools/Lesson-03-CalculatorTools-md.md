# Lesson 03: src/tools/CalculatorTools.jsx - Calculator Tools (24+ Tools)

## Purpose

Yeh file **24+ calculator tools** contain karti hai. Finance, education, health calculators hain.

## Tools Included

| Tool | Kya karta hai |
|------|---------------|
| PercentageCalculator | Percentage calculations |
| BMICalculator | Body Mass Index |
| CalorieCalculator | Daily calorie needs |
| EMI Calculator | Loan EMI calculate |
| SIPCalculator | SIP investment returns |
| PPFCalculator | PPF maturity |
| GPCACalculator | GPA calculator |
| TipCalculator | Bill tip split |
| DiscountCalculator | Discount % and price |
| CompoundInterest | Compound interest |
| SimpleInterest | Simple interest |
| SalaryCalculator | Take-home salary |
| AgeCalculator | Age from DOB |
| FuelEfficiency | Mileage calculator |

## Common Pattern

```jsx
export function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    const bmi = useMemo(() => {
        if (!weight || !height) return null;
        const w = parseFloat(weight);
        const h = parseFloat(height) / 100; // cm to m
        return (w / (h * h)).toFixed(1);
    }, [weight, height]);

    return (
        <ToolWrapper title="BMI Calculator" description="Calculate your BMI" icon={Calculator}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="label">Weight (kg)</label>
                    <input type="number" className="input-field" value={weight} onChange={e => setWeight(e.target.value)} />
                    <label className="label mt-4">Height (cm)</label>
                    <input type="number" className="input-field" value={height} onChange={e => setHeight(e.target.value)} />
                </div>
                <div>
                    {bmi && (
                        <div className="p-6 bg-gray-50 rounded-xl text-center">
                            <p className="text-4xl font-bold text-royal-500">{bmi}</p>
                            <p className="mt-2">BMI Value</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Category: {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </ToolWrapper>
    );
}
```

## Interview Questions

1. **Q: Finance calculations mein precision kaise maintain karte ho?**
   A: `.toFixed(2)` for 2 decimal places. Production mein `decimal.js` library better hai for exact calculations.

## Revision Notes

- 24+ calculators: finance, health, education
- Pattern: 2 inputs → useMemo → computed result
- Results in styled card with color coding