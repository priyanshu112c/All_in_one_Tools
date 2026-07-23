# Lesson 04: src/tools/MathTools.jsx - Math Tools (15+ Tools)

## Purpose

Scientific calculations, number theory, aur math utilities.

## Tools Included

| Tool | Kya karta hai |
|------|---------------|
| ScientificCalculator | Full scientific calculator |
| MatrixCalculator | Matrix operations |
| PrimeNumberChecker | Check prime |
| FibonacciGenerator | Fibonacci sequence |
| NumberBaseConverter | Binary, Octal, Hex, Decimal |
| FactorialCalculator | Factorial |
| GCDLCM | GCD and LCM |
| PolynomialSolver | Solve polynomials |
| UnitCircle | Unit circle reference |
| BaseNConverter | Any base conversion |

## Key Libraries

```js
import { create, all } from 'mathjs';
const math = create(all);

// Usage: math.evaluate('sqrt(16)') → 4
// Usage: math.det([[1,2],[3,4]]) → -2
```

## Interview Questions

1. **Q: `mathjs` library kyun use karte hain?**
   A: Built-in JavaScript `Math` sirf basic functions deta hai. `mathjs` se matrix operations, complex numbers, statistics sab mil jaata hai.

## Revision Notes

- 15+ math tools
- Uses `mathjs` library for advanced math
- Pattern: Input fields → computation → display result