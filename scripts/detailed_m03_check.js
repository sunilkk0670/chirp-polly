import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load A1 words
const a1Words = new Map();
for (let i = 1; i <= 10; i++) {
    const moduleId = `de_a1_m${String(i).padStart(2, '0')}`;
    const data = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', `${moduleId}.json`), 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        const word = item.word.toLowerCase().trim();
        if (!a1Words.has(word)) {
            a1Words.set(word, []);
        }
        a1Words.get(word).push(moduleId);
    });
}

// Load M03
const m03 = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', 'de_a2_m03.json'), 'utf8'));
const liarTraps = new Set(['das gymnasium', 'die kur', 'das präservativ', 'gift', 'after', 'pickel']);
const overlaps = [];

m03.lessons[0].vocabularyItems.forEach((item, idx) => {
    const word = item.word.toLowerCase().trim();
    if (!liarTraps.has(word) && a1Words.has(word)) {
        overlaps.push({ num: idx + 1, word: item.word, a1Module: a1Words.get(word).join(', ') });
    }
});

console.log(`\n✅ M03 Status:`);
console.log(`   Total words: 100`);
console.log(`   Liar Game traps: 6 (intentional review)`);
console.log(`   Genuine A1 overlaps: ${overlaps.length}\n`);

if (overlaps.length > 0) {
    console.log('Remaining A1 Overlaps:\n');
    overlaps.forEach(o => console.log(`${o.num}. ${o.word} (${o.a1Module})`));
    console.log();
}
