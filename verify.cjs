const fs = require('fs');

const reg = fs.readFileSync('src/toolRegistry.js', 'utf8');

// Parse registry: extract file -> exported names
const needed = {};
const regex = /import\('\.\/tools\/(\w+)'\)\.then\(m => \(\{ default: m\.(\w+) \}\)\)/g;
let match;
while ((match = regex.exec(reg)) !== null) {
    const file = match[1];
    const exp = match[2];
    if (!needed[file]) needed[file] = new Set();
    needed[file].add(exp);
}

console.log("Registry expects these exports per file:");
for (const [file, exps] of Object.entries(needed)) {
    console.log(`  ${file}: ${exps.size} exports`);
}

// Now check each file
const result = {};
let totalMissing = 0;
for (const [file, exps] of Object.entries(needed)) {
    const src = fs.readFileSync(`src/tools/${file}.jsx`, 'utf8');
    const exports = new Set([...src.matchAll(/export\s+(?:const|function|let|var)\s+(\w+)/g)].map(x => x[1]));
    const missing = [...exps].filter(e => !exports.has(e));
    result[file] = { total: exps.size, found: exps.size - missing.length, missing };
    totalMissing += missing.length;

    if (missing.length > 0) {
        console.log(`\nMISSING in ${file} (${missing.length}):`);
        missing.forEach(m => console.log(`  - ${m}`));
    } else {
        console.log(`  ${file}: ALL OK`);
    }
}

console.log(`\nTotal missing: ${totalMissing}`);
fs.writeFileSync('audit3.txt', JSON.stringify(result, null, 2));
console.log("Full report written to audit3.txt");