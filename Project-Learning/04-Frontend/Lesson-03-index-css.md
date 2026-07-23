# Lesson 03: src/index.css - Global Styles

## Purpose

Yeh file project ki **global CSS styles** define karti hai. Tailwind CSS directives aur reusable component classes yahan hoti hain.

## Why this file exists

- Tailwind CSS ko initialize karna hai
- Reusable CSS classes banana hai (buttons, cards, inputs)
- Custom scrollbar styling
- Dark mode base styles

## When this file executes

`main.jsx` mein `import './index.css'` se yeh file load hoti hai. Browser mein yeh CSS rules apply hoti hain.

## Which files use it

- `main.jsx` - Isko import karta hai as side-effect

## Complete source code

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    body {
        @apply bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300;
    }
}

@layer components {
    .btn-primary {
        @apply bg-royal-500 hover:bg-royal-600 text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98];
    }

    .btn-secondary {
        @apply bg-sky-500 hover:bg-sky-600 text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98];
    }

    .btn-outline {
        @apply border-2 border-royal-500 text-royal-500 hover:bg-royal-500 hover:text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200;
    }

    .card {
        @apply bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700;
    }

    .input-field {
        @apply w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-royal-500 focus:border-transparent outline-none transition-all duration-200;
    }

    .textarea-field {
        @apply w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-royal-500 focus:border-transparent outline-none transition-all duration-200 resize-y min-h-[120px];
    }

    .label {
        @apply block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5;
    }

    .tool-title {
        @apply text-2xl font-bold text-navy-500 dark:text-sky-300 mb-4;
    }

    .section-title {
        @apply text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2;
    }
}

/* Scrollbar styling */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
    @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-400 dark:bg-gray-500;
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}
```

## Line-by-line explanation

### Lines 1-3: Tailwind Directives

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

| Directive | Kya Karta Hai |
|-----------|---------------|
| `@tailwind base` | Base styles (reset CSS, default typography) |
| `@tailwind components` | Component classes (hamare custom classes) |
| `@tailwind utilities` | Utility classes (flex, p-4, text-lg, etc.) |

### Lines 5-9: Base Layer

```css
@layer base {
    body {
        @apply bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300;
    }
}
```

- **`@layer base`** - Lowest priority layer, Tailwind ke base se merge
- **body styles** - Default background aur text color
- **`dark:` prefix** - Dark mode ke liye alternate styles
- **`transition-colors`** - Theme change smooth ho

### Lines 11-47: Component Layer

```css
@layer components {
    .btn-primary { ... }
    .btn-secondary { ... }
    .btn-outline { ... }
    .card { ... }
    .input-field { ... }
    .textarea-field { ... }
    .label { ... }
    .tool-title { ... }
    .section-title { ... }
}
```

### Reusable Component Classes

#### `.btn-primary`
```css
.btn-primary {
    @apply bg-royal-500           /* Background: royal blue */
           hover:bg-royal-600      /* Darker on hover */
           text-white              /* White text */
           font-medium             /* Medium weight */
           px-5 py-2.5             /* Padding */
           rounded-lg              /* Rounded corners */
           transition-all          /* Smooth transitions */
           duration-200            /* 200ms transition */
           shadow-md               /* Medium shadow */
           hover:shadow-lg         /* Larger shadow on hover */
           active:scale-[0.98];    /* Slight shrink on click */
}
```

#### `.card`
```css
.card {
    @apply bg-white dark:bg-gray-800    /* White/Dark background */
           rounded-xl                    /* Extra rounded */
           shadow-md hover:shadow-xl     /* Shadow effect */
           transition-all duration-300   /* Smooth transition */
           p-6                           /* Padding */
           border border-gray-100 dark:border-gray-700; /* Border */
}
```

#### `.input-field`
```css
.input-field {
    @apply w-full                      /* Full width */
           px-4 py-3                   /* Padding */
           rounded-lg                  /* Rounded corners */
           border border-gray-300 dark:border-gray-600  /* Border */
           bg-white dark:bg-gray-700   /* Background */
           text-gray-900 dark:text-gray-100  /* Text color */
           focus:ring-2 focus:ring-royal-500  /* Focus ring */
           focus:border-transparent     /* No border on focus */
           outline-none                 /* Remove default outline */
           transition-all duration-200; /* Smooth transition */
}
```

### Lines 49-65: Custom Scrollbar

```css
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
    @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-400 dark:bg-gray-500;
}
```

- **Webkit scrollbar** - Chrome/Safari/Edge ke liye custom scrollbar
- **Track** - Scrollbar ka background
- **Thumb** - Scrollbar ka handle (jo move hota hai)

### Lines 67-69: Smooth Scrolling

```css
html {
    scroll-behavior: smooth;
}
```

- Anchor links pe click karne pe smooth scroll hota hai
- JavaScript scroll animation ki zaroorat nahi

## Syntax Explanations

### `@apply` Directive

```css
/* Tailwind ki utility classes ko CSS mein use karna */
.btn-primary {
    @apply bg-royal-500 text-white px-5;
}

/* Equivalent Tailwind classes: */
/* class="bg-royal-500 text-white px-5" */
```

### `@layer` Directive

```css
/* CSS specificity control karta hai */
@layer base { ... }      /* Lowest priority */
@layer components { ... } /* Medium priority */
@layer utilities { ... }  /* Highest priority */
```

### `dark:` Prefix

```css
/* Dark mode ke liye styles */
bg-white dark:bg-gray-800

/* Jab dark mode on hoga, toh gray-800 background use hoga */
```

### Custom Color: `royal`

```css
/* Tailwind config mein define hota hai */
bg-royal-500    /* Custom royal blue color */
```

## Data Flow

```
index.css
    │
    ├── @tailwind base    → Reset CSS + Base styles
    ├── @tailwind components → Our custom classes (.btn-primary, .card, etc.)
    └── @tailwind utilities → Tailwind utility classes
                                │
                                ▼
                    Used in all .jsx files
                    as className="btn-primary card"
```

## Real-life Analogy

**index.css** ek **Style Guide Book** ki tarah hai:
- **@tailwind base** = Basic rules (font, color defaults)
- **@tailwind components** = Pre-defined outfits (btn, card, input)
- **@tailwind utilities** = Accessories (padding, margin, colors)
- **Custom scrollbar** = Custom shoes style

## Common Mistakes

1. ❌ `@layer` na use karna
   ```css
   /* GALAT - specificity issues hongi */
   .btn-primary { @apply bg-royal-500; }
   
   /* SAHI */
   @layer components {
       .btn-primary { @apply bg-royal-500; }
   }
   ```

2. ❌ Tailwind directives ka order change karna
   ```css
   /* GALAT */
   @tailwind utilities;
   @tailwind base;
   @tailwind components;
   
   /* SAHI - order important hai */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. ❌ Custom scrollbar CSS mein `dark:` use karna
   ```css
   /* GALAT - pseudo-elements mein @apply nahi chalta directly */
   ::-webkit-scrollbar-track {
       dark:bg-gray-800;
   }
   
   /* SAHI - @apply use karo */
   ::-webkit-scrollbar-track {
       @apply bg-gray-100 dark:bg-gray-800;
   }
   ```

## Best Practices

1. ✅ Component classes `@layer components` mein rakho
2. ✅ Reusable styles CSS classes mein, inline Tailwind na likho
3. ✅ Dark mode variants hamesha `dark:` se add karo
4. ✅ Custom scrollbar styling project consistent rakhta hai
5. ✅ Smooth transitions for better UX

## Alternative Approaches

### CSS Modules
```css
/* Button.module.css */
.btnPrimary { ... }
/* Used as: import styles from './Button.module.css' */
```

### Styled Components
```jsx
// JS mein CSS likhna
const Button = styled.button`
    background: ${props => props.primary ? 'royal-500' : 'white'};
`;
```

### Tailwind Inline (No CSS file needed)
```jsx
// Sab classes directly JSX mein
<button className="bg-royal-500 text-white px-5 py-2.5 rounded-lg">
```

## Interview Questions

1. **Q: `@layer` kyun use karte hain?**
   A: CSS specificity control karne ke liye. Bina `@layer` ke hamare custom styles Tailwind utilities ko override nahi kar payenge.

2. **Q: Tailwind `dark:` mode kaise kaam karta hai?**
   A: `html` element pe `class="dark"` add hota hai. Phir `dark:` prefix wale styles apply hote hain.

3. **Q: Custom CSS classes vs inline Tailwind - kya better hai?**
   A: Reusable components ke liye custom CSS classes better hain. Unique one-time styles ke liye inline Tailwind.

4. **Q: `@apply` directive kyun use karte hain?**
   A: Tailwind utilities ko CSS mein use karne ke liye. Jab ek saath bahut saari utilities hoti hain toh CSS class banana cleaner hota hai.

## Coding Exercise

1. `index.css` mein ek naya custom class banao: `.btn-danger`
2. Usme red color, white text, aur hover effects add karo
3. Kisi button pe apply karo
4. Dark mode toggle karo aur dekho

## Homework

1. `index.css` ko kholo aur saari classes samjho
2. Browser DevTools mein custom classes dekho
3. Dark mode toggle karo aur CSS changes dekho
4. Custom scrollbar dekho

## Revision Notes

- `index.css` = Global styles + Tailwind directives
- 3 Tailwind layers: base, components, utilities
- Reusable classes: btn-primary, card, input-field, etc.
- `dark:` prefix for dark mode
- Custom scrollbar styling included
- `@apply` directive for using Tailwind in CSS