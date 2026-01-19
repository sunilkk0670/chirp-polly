import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 German A2 Module 01 Zero-Overlap Audit (vs A1 Corpus)\n');
console.log('══════════════════════════════════════════════════════════\n');

// Load A1 modules (M01-M10)
const a1Modules = [];
for (let i = 1; i <= 10; i++) {
    const moduleId = `de_a1_m${String(i).padStart(2, '0')}`;
    const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
    const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));
    a1Modules.push({ id: moduleId, data: moduleData });
}

// Load A2 Module 01
const a2M01Path = join(__dirname, '..', 'firestore_data', 'de_a2_m01.json');
const a2M01Data = JSON.parse(readFileSync(a2M01Path, 'utf8'));

// Extract all A1 words
const a1Words = new Map();
for (const module of a1Modules) {
    const vocabItems = module.data.lessons[0].vocabularyItems;
    for (const item of vocabItems) {
        const normalizedWord = item.word.toLowerCase().trim();
        if (!a1Words.has(normalizedWord)) {
            a1Words.set(normalizedWord, []);
        }
        a1Words.get(normalizedWord).push(module.id);
    }
}

// Extract A2 M01 words
const a2M01Words = new Map();
const vocabItems = a2M01Data.lessons[0].vocabularyItems;
for (const item of vocabItems) {
    const normalizedWord = item.word.toLowerCase().trim();
    a2M01Words.set(normalizedWord, item);
}

// Check for overlaps
const overlaps = [];
for (const [word, item] of a2M01Words) {
    if (a1Words.has(word)) {
        overlaps.push({
            word: item.word,
            a1Modules: a1Words.get(word)
        });
    }
}

// Display results
console.log('📊 WORD COUNTS:\n');
console.log(`   A1 Corpus (M01-M10): ${a1Words.size} unique words`);
console.log(`   A2 Module 01:        ${a2M01Words.size} words\n`);

console.log('══════════════════════════════════════════════════════════\n');

console.log('🔍 OVERLAP CHECK:\n');

if (overlaps.length === 0) {
    console.log('   ✅ ZERO OVERLAPS DETECTED!\n');
    console.log('   All A2 M01 words are unique from A1 corpus.\n');
    console.log('══════════════════════════════════════════════════════════\n');
    console.log('   ✅ INTEGRITY: PASSED\n');
    process.exit(0);
} else {
    console.log(`   ❌ Found ${overlaps.length} overlap(s):\n`);
    for (const overlap of overlaps) {
        console.log(`   - "${overlap.word}": ${overlap.a1Modules.join(', ')}`);
    }
    console.log('\n══════════════════════════════════════════════════════════\n');
    console.log('   ❌ INTEGRITY: FAILED\n');
    console.log(`\n   Overlapping words: ${overlaps.map(o => o.word).join(', ')}\n`);
    process.exit(1);
}
