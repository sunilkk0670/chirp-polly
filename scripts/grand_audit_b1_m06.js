import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../firestore_data');

// Load A1
const a1Data = JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_a1_full.json'), 'utf8'));
const a1Words = [];
a1Data.modules.forEach(m => {
    m.vocabularyItems.forEach(item => {
        if (item.word) a1Words.push(item.word);
    });
});

// Load A2
const a2Data = JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_a2_full.json'), 'utf8'));
const a2Words = [];
a2Data.modules.forEach(m => {
    m.vocabularyItems.forEach(item => {
        if (item.word) a2Words.push(item.word);
    });
});

// Load B1 M1-M5
const b1Words = [];
for (let i = 1; i <= 5; i++) {
    const file = `korean_b1_m01.json`.replace('01', i.toString().padStart(2, '0'));
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    data.lessons.forEach(l => b1Words.push(l.targetText));
}

// Load current M06
const m06Data = JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_b1_m06.json'), 'utf8'));
const m06Words = m06Data.lessons.map(l => l.targetText);

const masterSet = new Set([...a1Words, ...a2Words, ...b1Words]);

console.log(`--- 🧪 KOREAN GRAND AUDIT (A1 + A2 + B1 M1-M5) vs B1 M06 ---`);
console.log(`Master set size: ${masterSet.size} unique words`);

const overlaps = m06Words.filter(w => masterSet.has(w));

if (overlaps.length > 0) {
    console.log(`❌ Overlaps Found (${overlaps.length}):`);
    console.log(overlaps);
} else {
    console.log(`✅ ZERO Overlaps! Module 06 is 100% unique against the 2,500-word corpus.`);
}
