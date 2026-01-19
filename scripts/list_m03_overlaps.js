import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load A1 words
const a1Words = new Set();
for (let i = 1; i <= 10; i++) {
    const moduleId = `de_a1_m${String(i).padStart(2, '0')}`;
    const data = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', `${moduleId}.json`), 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        a1Words.add(item.word.toLowerCase().trim());
    });
}

// Load M03
const m03 = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', 'de_a2_m03.json'), 'utf8'));
const liarTraps = new Set(['das gymnasium', 'die kur', 'das präservativ', 'gift', 'after', 'pickel']);
const overlaps = [];

m03.lessons[0].vocabularyItems.forEach((item, idx) => {
    const word = item.word.toLowerCase().trim();
    if (!liarTraps.has(word) && a1Words.has(word)) {
        overlaps.push({ num: idx + 1, word: item.word });
    }
});

console.log(`\nM03 Genuine A1 Overlaps: ${overlaps.length}\n`);
console.log('(Excluding 6 Liar Game traps: Das Gymnasium, Die Kur, Das Präservativ, Gift, After, Pickel)\n');
overlaps.forEach(o => console.log(`${o.num}. ${o.word}`));
console.log();
