# Lesson 05: src/tools/ColorTools.jsx - Color Tools (11+ Tools)

## Tools Included

| Tool | Kya karta hai |
|------|---------------|
| ColorPicker | Pick color from wheel |
| ColorPaletteGenerator | Color palettes |
| GradientGenerator | CSS gradients |
| ColorConverter | HEX ↔ RGB ↔ HSL |
| ContrastChecker | WCAG contrast ratio |
| ColorBlindnessSim | Simulate color blindness |
| ColorHarmony | Complementary, analogous colors |

## Common Pattern

```jsx
const [color, setColor] = useState('#3B82F6');
const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });

// Color conversion functions
function hexToRgb(hex) { ... }
function rgbToHex(r, g, b) { ... }
function rgbToHsl(r, g, b) { ... }
```

## Interview Questions

1. **Q: WCAG contrast ratio kya hai?**
   A: Web Content Accessibility Guidelines. Text aur background ke beech ka contrast ratio. Minimum 4.5:1 for normal text.

## Revision Notes

- 11+ color tools
- Pure CSS/JS color manipulation (no library)
- Live preview of color changes