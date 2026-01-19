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

// Load A2 M01
const a2M01 = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', 'de_a2_m01.json'), 'utf8'));
const a2M01Words = new Set();
a2M01.lessons[0].vocabularyItems.forEach(item => {
    a2M01Words.add(item.word.toLowerCase().trim());
});

// Load A2 M02
const m02 = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', 'de_a2_m02.json'), 'utf8'));
const m02Overlaps = [];
m02.lessons[0].vocabularyItems.forEach(item => {
    const word = item.word.toLowerCase().trim();
    if (a1Words.has(word)) {
        m02Overlaps.push(`${item.word} (A1)`);
    } else if (a2M01Words.has(word)) {
        m02Overlaps.push(`${item.word} (A2 M01)`);
    }
});

console.log('M02 Overlaps:', m02Overlaps.length);
if (m02Overlaps.length > 0) {
    console.log(m02Overlaps.join('\n'));
}
