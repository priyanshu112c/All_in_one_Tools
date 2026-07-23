# Exercises - AutoTools Project

## Beginner Exercises

### 1. Naya Calculator Add Karo
**Task:** Temperature Calculator banao jo Celsius ↔ Fahrenheit convert kare.

**Steps:**
1. `CalculatorTools.jsx` mein naya component banao
2. Two input fields: Celsius aur Fahrenheit
3. Real-time conversion as user types
4. `toolRegistry.js` mein add karo
5. `toolsData.js` mein tool info add karo

**Expected Output:**
- User Celsius type kare toh Fahrenheit auto-update ho
- User Fahrenheit type kare toh Celsius auto-update ho
- Responsive design

### 2. Theme Toggle Improve Karo
**Task:** Theme toggle mein transition animation add karo.

**Steps:**
1. `Layout.jsx` mein theme toggle button dhundho
2. CSS transition add karo for background color change
3. Har element ka color smoothly change ho

**Expected Output:**
- Theme change pe smooth 300ms transition
- No jarring color jumps

### 3. Favorite System Improve Karo
**Task:** Favorites ko sort aur filter karo.

**Steps:**
1. Home page pe favorites section add karo (jo tools favorite hain woh dikhao)
2. Alphabetical order mein sort karo
3. Category filter add karo

**Expected Output:**
- Home page pe favorite tools dikhein
- Sort by name button
- Filter by category dropdown

## Intermediate Exercises

### 4. New Tool Category Add Karo
**Task:** "Audio Tools" nayi category add karo.

**Steps:**
1. `toolsData.js` mein naya category object banao:
   ```js
   { id: 'audio', name: 'Audio Tools', icon: Music, color: 'from-pink-500 to-purple-500', tools: [...] }
   ```
2. 3 audio tools banao (audio converter, audio trimmer, audio visualizer)
3. `AudioTools.jsx` file banao
4. `toolRegistry.js` mein components add karo
5. Category page test karo

**Expected Output:**
- Home page pe Audio Tools category dikhe
- Audio Tools page pe 3 tools dikhein
- Har tool kaam kare

### 5. Search Functionality Add Karo
**Task:** Search bar add karo jo tools dhundhe.

**Steps:**
1. `Layout.jsx` mein search bar add karo
2. Search state manage karo
3. `toolsData.js` se filter karo based on search term
4. Results dropdown mein dikhao
5. Click pe tool pe navigate karo

**Expected Output:**
- Search bar header mein dikhe
- Type karne pe tools filter ho
- Results mein tool name aur category dikhe
- Click pe tool page pe jaaye

### 6. User Authentication System
**Task:** Simple login system banao.

**Steps:**
1. Login page banao (`/login`)
2. Form with email and password
3. LocalStorage mein user store karo
4. Protected routes - bina login ke tool access na ho
5. Logout functionality

**Expected Output:**
- Login page with form
- Logout button in header
- Protected tool pages

## Advanced Exercises

### 7. Backend Integration
**Task:** Image compression tool mein backend add karo.

**Steps:**
1. Express.js server banao
2. Multer se file upload handle karo
3. Sharp library se image compress karo
4. Compressed image return karo
5. Frontend se API call karo

**Expected Output:**
- Image compress hone pe "Compressing..." loading dikhe
- Compressed image download ho
- File size comparison dikhe

### 8. Real-time Collaboration
**Task:** Text diff tool mein real-time collaboration add karo.

**Steps:**
1. Socket.io server setup karo
2. Multiple users same text pe kaam kar sakein
3. Real-time updates dikhein
4. User cursors dikhao

**Expected Output:**
- Do browser windows mein same text dikhe
- Ek window mein change karo toh dusre mein turant dikhe
- User cursors alag colors mein dikhein

### 9. Performance Optimization
**Task:** App ki performance optimize karo.

**Steps:**
1. React Profiler use karke slow components dhundho
2. useMemo aur useCallback lagao
3. Image lazy loading add karo
4. Service worker add karo for offline support

**Expected Output:**
- Lighthouse score 90+
- Initial load time < 2 seconds
- Smooth 60fps animations

### 10. Testing Suite
**Task:** Test cases likho.

**Steps:**
1. Jest setup karo
2. Utility functions ke unit tests
3. Component tests with React Testing Library
4. Integration tests for tool functionality

**Expected Output:**
- Test coverage > 80%
- All tests pass
- CI/CD pipeline setup

## Daily Practice Plan

### Week 1: Basics
- **Day 1:** Calculator tools banao
- **Day 2:** Theme system improve karo
- **Day 3:** Favorites system banao
- **Day 4:** Search functionality
- **Day 5:** Code review aur cleanup

### Week 2: Intermediate
- **Day 6:** New category add karo
- **Day 7:** Authentication system
- **Day 8:** Backend integration
- **Day 9:** Testing basics
- **Day 10:** Documentation update

### Week 3: Advanced
- **Day 11:** Performance optimization
- **Day 12:** Real-time features
- **Day 13:** Offline support
- **Day 14:** Deployment preparation
- **Day 15:** Final project review

## Project Ideas Based on This Project

1. **Developer Portfolio:** Same architecture se portfolio website banao
2. **Educational Platform:** E-learning tools add karo
3. **Business Tools:** Invoice generator, receipt scanner
4. **Social Media Tools:** Post scheduler, analytics dashboard

## How to Submit

1. Code GitHub pe push karo
2. Live demo ka link do
3. Documentation likho
4. README.md update karo
5. Code review ke liye share karo

## Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [JavaScript.info](https://javascript.info/)