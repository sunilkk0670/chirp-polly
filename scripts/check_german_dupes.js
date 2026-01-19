import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const m01Path = join(__dirname, '..', 'firestore_data', 'de_a1_m01.json');
const m02Path = join(__dirname, '..', 'firestore_data', 'de_a1_m02.json');

const m01Data = JSON.parse(readFileSync(m01Path, 'utf8'));
const m02Data = JSON.parse(readFileSync(m02Path, 'utf8'));

const m01Words = m01Data.lessons[0].vocabularyItems.map(item => item.word.toLowerCase().trim());
const m02Words = m02Data.lessons[0].vocabularyItems.map(item => item.word.toLowerCase().trim());

const m01Set = new Set(m01Words);
const overlaps = m02Words.filter(word => m01Set.has(word));

console.log(`M01 words: ${m01Words.length}`);
console.log(`M02 words: ${m02Words.length}`);
console.log(`\nOverlapping words: ${overlaps.length}`);

if (overlaps.length > 0) {
    console.log('\nDuplicates found:');
    overlaps.forEach(word => console.log(`  - ${word}`));
}

// Check if Gift is intentional review
const giftInM01 = m01Words.some(w => w === 'gift');
const giftInM02 = m02Words.some(w => w === 'gift');

if (giftInM01 && giftInM02) {
    console.log('\n✅ "Gift" appears in both modules (intentional review trap)');
}

const uniqueTotal = new Set([...m01Words, ...m02Words]).size;
console.log(`\nTotal unique words: ${uniqueTotal}`);
console.log(`Expected: 200`);
console.log(`Difference: ${200 - uniqueTotal}`);
