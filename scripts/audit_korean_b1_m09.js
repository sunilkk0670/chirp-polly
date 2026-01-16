import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../firestore_data');

// Load A1
const a1Data = JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_a1_full.json'), 'utf8'));
const a1Words = [];
a1Data.modules.forEach(m => m.vocabularyItems.forEach(i => i.word && a1Words.push(i.word)));

// Load A2
const a2Data = JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_a2_full.json'), 'utf8'));
const a2Words = [];
a2Data.modules.forEach(m => m.vocabularyItems.forEach(i => i.word && a2Words.push(i.word)));

// Load B1 M01-M08
const b1Words = [];
for (let i = 1; i <= 8; i++) {
    const file = `korean_b1_m${String(i).padStart(2, '0')}.json`;
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    data.lessons.forEach(l => b1Words.push(l.targetText || l.word));
}

// Load M09
const m09Data = JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_b1_m09.json'), 'utf8'));
const m09Words = m09Data.lessons.map(l => l.targetText);

console.log('--- 🧪 KOREAN B1 MODULE 09 AUDIT ---');

// 1. Internal Duplicates
const internalDups = m09Words.filter((w, i) => m09Words.indexOf(w) !== i);
if (internalDups.length > 0) {
    console.log('❌ Internal Duplicates:', internalDups);
} else {
    console.log('✅ No Internal Duplicates.');
}

// 2. Word Count
console.log(`✅ Word Count: ${m09Words.length}`);

// 3. Cumulative Overlaps
const masterSet = new Set([...a1Words, ...a2Words, ...b1Words]);
const overlaps = m09Words.filter(w => masterSet.has(w));

if (overlaps.length > 0) {
    console.log(`❌ Overlaps Found (${overlaps.length}):`, overlaps);
} else {
    console.log('✅ ZERO Cumulative Overlaps. Module 09 is 100% unique.');
}
