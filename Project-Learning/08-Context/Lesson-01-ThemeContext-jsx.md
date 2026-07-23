# Lesson 01: src/context/ThemeContext.jsx - Theme Context

## Purpose

Yeh file **Dark/Light theme state** manage karti hai using React Context API. Yeh global theme state provide karti hai jo kisi bhi component mein access ho sakti hai.

## Why this file exists

- Dark/Light mode toggle karna hai
- Theme state ko sab components mein share karna hai
- localStorage se theme persist karni hai

## When this file executes

App.jsx mein `<ThemeProvider>` wrap karta hai. Jab app load hota hai, theme localStorage se read hoti hai.

## Which files use it

- `App.jsx` - `<ThemeProvider>` wrap karta hai
- Any component jo `useTheme()` use kare

## Dependencies

| Import | From | Purpose |
|--------|------|---------|
| `createContext` | `react` | Context object banana |
| `useContext` | `react` | Context consume karna |
| `useState` | `react` | Theme state |
| `useEffect` | `react` | Side effects (DOM + localStorage) |

## Complete source code

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    return (
        <ThemeContext.Provider value={{ dark, setDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
```

## Line-by-line explanation

### Line 1: Import

```jsx
import { createContext, useContext, useState, useEffect } from 'react';
```

### Line 3: Create Context

```jsx
const ThemeContext = createContext();
```

- **`createContext()`** - Ek blank context object banata hai
- Initially `undefined` value hoti hai (default value set nahi kiya)
- Provider ke through value set hoti hai

### Line 5: ThemeProvider Component

```jsx
export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
```

- **`children` prop** - App component ka content (wrapped components)
- **`useState` with function** - Lazy initialization (localStorage se)
- **Condition:** Agar localStorage mein 'dark' hai toh `true`, warna `false`

### Lines 7-10: useEffect

```jsx
useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}, [dark]);
```

- **`document.documentElement`** = `<html>` element
- **`classList.toggle('dark', dark)`** - Agar dark=true toh 'dark' class add, warna remove
- **localStorage** - Theme save karta hai

### Lines 12-14: Provider

```jsx
return (
    <ThemeContext.Provider value={{ dark, setDark }}>
        {children}
    </ThemeContext.Provider>
);
```

- **`value`** - Object jo sab consumers ko milega
- **`dark`** - Boolean (current theme)
- **`setDark`** - Function (theme toggle karne ke liye)

### Lines 17-19: Custom Hook

```jsx
export function useTheme() {
    return useContext(ThemeContext);
}
```

- **Custom hook** - `useTheme()` se any component mein theme access
- Wrapper around `useContext(ThemeContext)`

## Context API Flow

```
App.jsx
    │
    ├── <ThemeProvider>        ← PROVIDER
    │   │
    │   │  value = { dark, setDark }
    │   │
    │   ├── Layout.jsx         ← CONSUMER (via useTheme)
    │   │   ├── dark === true/false
    │   │   └── setDark(true/false) to toggle
    │   │
    │   ├── Any other component
    │   │   └── Also can use useTheme()
```

## Execution Flow

```
App renders ThemeProvider
         │
         ▼
ThemeProvider: useState (read localStorage)
         │
         ▼
ThemeProvider: useEffect (apply theme to <html>)
         │
         ▼
ThemeProvider: Context.Provider value={dark, setDark}
         │
         ▼
Child components can use useTheme()
         │
         ├── Layout.jsx: const { dark, setDark } = useTheme()
         │   └── Theme toggle button
         │
         └── Any other component
```

## Real-life Analogy

**ThemeContext** ek **AC Remote** ki tarah hai:
- **ThemeProvider** = AC unit (temperature maintain karta hai)
- **useTheme()** = Remote control (temperature read/set kar sakte hain)
- **dark state** = Current temperature setting
- **localStorage** = AC ka memory (restart ke baad bhi setting yaad)

## Common Mistakes

1. ❌ Provider ke bina useTheme() use karna
   ```jsx
   // GALAT - Provider nahi hai
   function MyComponent() {
       const { dark } = useTheme();  // undefined!
   }
   
   // SAHI - Provider hona chahiye
   // App.jsx mein ThemeProvider wrap ho
   ```

2. ❌ ThemeProvider ke andar nahi banana
   ```jsx
   // GALAT
   <ThemeProvider />
   <BrowserRouter>...</BrowserRouter>
   
   // SAHI - children ko wrap karo
   <ThemeProvider>
       <BrowserRouter>...</BrowserRouter>
   </ThemeProvider>
   ```

## Best Practices

1. ✅ Custom hook (`useTheme`) banao context access ke liye
2. ✅ localStorage for persistence
3. ✅ Lazy initialization for performance
4. ✅ Minimal value object in Provider

## Interview Questions

1. **Q: `createContext()` aur `useContext()` mein kya fark hai?**
   A: `createContext()` context object banata hai. `useContext()` kisi bhi component mein us context ki value access karta hai.

2. **Q: useState mein function kyun hai?**
   A: Lazy initialization. Sirf pehli render pe localStorage call hoti hai, har render pe nahi.

3. **Q: `document.documentElement.classList.toggle('dark', dark)` kya karta hai?**
   A: `<html>` element pe `class="dark"` add ya remove karta hai. Tailwind CSS isko detect karta hai aur dark mode apply karta hai.

## Homework

1. ThemeContext.jsx kholo aur samjho
2. `useTheme()` hook use karke kisi naye component mein theme toggle karo
3. localStorage mein key-value dekho (Application tab)

## Revision Notes

- ThemeContext = Global theme state
- `createContext()` → Provider + Consumer
- `useTheme()` = Custom hook for consuming
- `dark` state + `setDark` function provided
- localStorage se theme persist hoti hai
- Tailwind `dark:` mode via `class="dark"` on `<html>`