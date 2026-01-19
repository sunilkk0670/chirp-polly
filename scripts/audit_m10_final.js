import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load A1 modules (1000 words)
const a1Words = new Map();
for (let i = 1; i <= 10; i++) {
    const file = `de_a1_m${String(i).padStart(2, '0')}.json`;
    const data = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', file), 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        const w = item.word.toLowerCase().trim();
        if (!a1Words.has(w)) a1Words.set(w, file);
    });
}

// Load current M10
const m10Data = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', 'de_a2_m10.json'), 'utf8'));
const m10Items = m10Data.lessons[0].vocabularyItems;

// Intentional Review/Liar Game Traps (allowed to overlap or be review)
const allowedTraps = new Set([
    'wer', 'wo', 'wann', 'also', 'art', 'bad', 'das gift', 'der bär', 'after'
]);

const overlaps = [];
m10Items.forEach(item => {
    const w = item.word.toLowerCase().trim();
    if (allowedTraps.has(w)) return; // Skip intentional traps

    if (a1Words.has(w)) {
        overlaps.push(`${item.word} (Overlap with A1: ${a1Words.get(w)})`);
    }
});

console.log(`\n🔍 AUDIT RESULTS FOR German A2 M10:`);
console.log(`   Word Count: ${m10Items.length}`);
if (overlaps.length === 0) {
    console.log(`   ✅ ZERO GENUINE OVERLAPS DETECTED! (Against A1)`);
} else {
    console.log(`   ❌ FOUND ${overlaps.length} GENUINE OVERLAPS:`);
    overlaps.forEach(o => console.log(`      - ${o}`));
}
console.log();
