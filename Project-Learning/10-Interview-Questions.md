# Interview Questions - AutoTools Project

## React Basics

1. **Q: React kya hai?**
   A: Facebook ka UI library. Components banate hain jo reusable hote hain.

2. **Q: JSX kya hai?**
   A: JavaScript XML. HTML jaisa syntax jo React mein use hota hai. `const element = <h1>Hello</h1>` - yeh actually `React.createElement('h1', null, 'Hello')` hai.

3. **Q: `useState` kya hai?**
   A: React hook jo function components mein state manage karta hai. `const [count, setCount] = useState(0)` - initial value 0 hai.

4. **Q: `useEffect` kab use karte hain?**
   A: Side effects ke liye - API calls, DOM manipulation, localStorage, subscriptions. Dependency array se control hota hai kab run hoga.

5. **Q: `useMemo` aur `useCallback` mein kya fark hai?**
   A: `useMemo` value cache karta hai. `useCallback` function cache karta hai. Performance optimization ke liye dono.

6. **Q: `useRef` kya hai?**
   A: Mutable reference object jo render persist hota hai. DOM access aur value store karne ke liye bina re-render ke.

## React Architecture

7. **Q: Context API kya hai?**
   A: Prop drilling avoid karne ka tarika. Global state (theme, auth) ko kisi bhi deeply nested component mein access kar sakte hain.

8. **Q: Prop drilling kya hai?**
   A: Jab props ko 3+ levels deep pass karna padta hai. Context API ya state management se solve hota hai.

9. **Q: Controlled vs Uncontrolled components?**
   A: Controlled = React state handle karta hai form data. Uncontrolled = DOM handle karta hai (ref use karke).

10. **Q: Virtual DOM kya hai?**
    A: Real DOM ka lightweight copy. React pehle virtual DOM update karta hai, phir minimal actual DOM changes karta hai (diffing).

## Performance

11. **Q: Lazy loading kya hai?**
    A: `React.lazy()` + `dynamic import()` se code sirf jab zaroori ho tab load hota hai. Bundle size chhota hota hai.

12. **Q: `Suspense` kya hai?**
    A: Lazy components ke loading state handle karta hai. Fallback UI dikhata hai jab tak code load ho raha ho.

13. **Q: Bundle splitting kaise karte ho?**
    A: `React.lazy()` se. Har route ya feature ka alag chunk banta hai. Vite automatically code splitting karta hai.

14. **Q: `useMemo` kab use karo?**
    A: Expensive computations ke liye (sorting, filtering, calculation). Har render pe na ho, sirf dependency change pe ho.

15. **Q: Re-rendering kaise rokein?**
    A: `useMemo`, `useCallback`, `React.memo()`, Context splitting, state colocation.

## Routing

16. **Q: Client-side routing kya hai?**
    A: JavaScript se URL change hota hai bina page reload ke. React Router use hota hai.

17. **Q: `useParams` kya hai?**
    A: Route parameters extract karta hai. `/tool/:toolId` mein `const { toolId } = useParams()`.

18. **Q: Layout routes kya hote hain?**
    A: Parent routes jo common layout render karte hain bina path ke. `<Outlet>` se children render hote hain.

## CSS & Styling

19. **Q: Tailwind CSS kya hai?**
    A: Utility-first CSS framework. `className="bg-blue-500 text-white p-4"` jaise utility classes directly JSX mein likhte hain.

20. **Q: CSS specificity kya hai?**
    A: CSS rules ki priority. Inline > ID > Class > Tag. `!important` sabse zyada priority deta hai.

21. **Q: `@layer` directive kyun use karte hain?**
    A: Tailwind mein custom styles aur utilities ke beech specificity control karne ke liye.

22. **Q: Dark mode kaise implement karte ho?**
    A: Tailwind `dark:` prefix + `class="dark"` on `<html>`. Toggle se class add/remove hoti hai.

## Hooks

23. **Q: Custom hook kya hai?**
    A: `useXyz` naam ka function jo React hooks use kare. Logic reuse karne ka tarika.

24. **Q: Hook rules kya hain?**
    A: (1) Sirf top-level pe call karo (loops, conditions mein nahi). (2) Sirf React functions mein use karo.

25. **Q: `useOutletContext` kya hai?**
    A: React Router ka hook. Parent route (Layout) se child route (ToolPage) ko data pass karne ka tarika bina global context banaye.

## Project Specific

26. **Q: AutoTools kaise kaam karta hai?**
    A: React + Vite + Tailwind. Client-side app hai. 150+ tools 8 files mein grouped. Lazy loading se performance achi hai.

27. **Q: `toolRegistry.js` aur `toolsData.js` mein kya fark hai?**
    A: `toolsData.js` = Data (names, IDs, categories). `toolRegistry.js` = Component mapping (ID → React component).

28. **Q: Naya tool kaise add karoge?**
    A: (1) `toolsData.js` mein category mein tool add karo. (2) Tool file mein component export karo. (3) `toolRegistry.js` mein mapping add karo.

29. **Q: localStorage kyun use kiya hai?**
    A: User preferences (theme, favorites) persist karne ke liye. Bina localStorage ke har refresh pe reset hota.

30. **Q: `framer-motion` kya hai?**
    A: React animation library. `motion.div` se declarative animations hoti hain. `AnimatePresence` se exit animations allow hote hain.

## System Design

31. **Q: 150 tools hain toh architecture kaise design karoge?**
    A: Code splitting + lazy loading. Tool registry pattern. Grouped tool files (not 150 individual files).

32. **Q: Agar backend add karna ho toh kya change hoga?**
    A: API calls for image processing, PDF operations. Authentication. Database for user data. Server-side rendering.

33. **Q: Testing kaise karoge?**
    A: Jest + React Testing Library. Unit tests for utility functions. Component tests for UI. E2E tests with Cypress/Playwright.

## JavaScript

34. **Q: Promise vs Async/Await?**
    A: `async/await` syntactic sugar hai Promises ka. Code synchronous jaisa dikhta hai lekin asynchronous hai.

35. **Q: Spread operator (`...`) kya hai?**
    A: Array/Object ko expand karta hai. `[...arr1, arr2]` ya `{...obj1, key: value}`.

36. **Q: Destructuring kya hai?**
    A: Array/Object se directly values extract karna. `const [a, b] = [1, 2]` ya `const { name, age } = person`.

## Homework

1. In 36 questions ke answers ek baar likhke practice karo
2. Code examples ke saath samjho
3. Real project se examples nikaalo