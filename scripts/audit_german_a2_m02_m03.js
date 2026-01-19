import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 German A2 Modules 02 & 03 Zero-Overlap Audit\n');
console.log('══════════════════════════════════════════════════════════\n');

// Load A1 modules (M01-M10)
const a1Words = new Map();
for (let i = 1; i <= 10; i++) {
    const moduleId = `de_a1_m${String(i).padStart(2, '0')}`;
    const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
    const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));
    const vocabItems = moduleData.lessons[0].vocabularyItems;
    for (const item of vocabItems) {
        const normalizedWord = item.word.toLowerCase().trim();
        if (!a1Words.has(normalizedWord)) {
            a1Words.set(normalizedWord, []);
        }
        a1Words.get(normalizedWord).push(moduleId);
    }
}

// Load A2 M01
const a2M01Path = join(__dirname, '..', 'firestore_data', 'de_a2_m01.json');
const a2M01Data = JSON.parse(readFileSync(a2M01Path, 'utf8'));
const a2M01Words = new Map();
const a2M01Items = a2M01Data.lessons[0].vocabularyItems;
for (const item of a2M01Items) {
    const normalizedWord = item.word.toLowerCase().trim();
    a2M01Words.set(normalizedWord, 'de_a2_m01');
}

// Load A2 M02
const a2M02Path = join(__dirname, '..', 'firestore_data', 'de_a2_m02.json');
const a2M02Data = JSON.parse(readFileSync(a2M02Path, 'utf8'));
const a2M02Words = new Map();
const a2M02Items = a2M02Data.lessons[0].vocabularyItems;
for (const item of a2M02Items) {
    const normalizedWord = item.word.toLowerCase().trim();
    a2M02Words.set(normalizedWord, item);
}

// Load A2 M03
const a2M03Path = join(__dirname, '..', 'firestore_data', 'de_a2_m03.json');
const a2M03Data = JSON.parse(readFileSync(a2M03Path, 'utf8'));
const a2M03Words = new Map();
const a2M03Items = a2M03Data.lessons[0].vocabularyItems;
for (const item of a2M03Items) {
    const normalizedWord = item.word.toLowerCase().trim();
    a2M03Words.set(normalizedWord, item);
}

// Check M02 for overlaps with A1 and A2 M01
const liarGameTraps = new Set(['die provision', 'der chef', 'die promotion', 'das praktikum', 'eventuell']);
const m02Overlaps = [];
for (const [word, item] of a2M02Words) {
    // Skip Liar Game traps - they're intentional review words
    if (liarGameTraps.has(word)) continue;

    if (a1Words.has(word)) {
        m02Overlaps.push({ word: item.word, source: a1Words.get(word).join(', ') });
    } else if (a2M01Words.has(word)) {
        m02Overlaps.push({ word: item.word, source: 'de_a2_m01' });
    }
}

// Check M03 for overlaps with A1, A2 M01, and A2 M02
const m03LiarGameTraps = new Set(['das gymnasium', 'die kur', 'das präservativ', 'gift', 'after', 'pickel']);
const m03Overlaps = [];
for (const [word, item] of a2M03Words) {
    // Skip Liar Game traps - they're intentional review words
    if (m03LiarGameTraps.has(word)) continue;

    if (a1Words.has(word)) {
        m03Overlaps.push({ word: item.word, source: a1Words.get(word).join(', ') });
    } else if (a2M01Words.has(word)) {
        m03Overlaps.push({ word: item.word, source: 'de_a2_m01' });
    } else if (a2M02Words.has(word)) {
        m03Overlaps.push({ word: item.word, source: 'de_a2_m02' });
    }
}

// Display results
console.log('📊 WORD COUNTS:\n');
console.log(`   A1 Corpus (M01-M10): ${a1Words.size} unique words`);
console.log(`   A2 Module 01:        ${a2M01Words.size} words`);
console.log(`   A2 Module 02:        ${a2M02Words.size} words`);
console.log(`   A2 Module 03:        ${a2M03Words.size} words\n`);

console.log('══════════════════════════════════════════════════════════\n');

let hasErrors = false;

console.log('🔍 MODULE 02 OVERLAP CHECK:\n');
if (m02Overlaps.length === 0) {
    console.log('   ✅ ZERO OVERLAPS DETECTED!\n');
} else {
    console.log(`   ❌ Found ${m02Overlaps.length} overlap(s):\n`);
    for (const overlap of m02Overlaps) {
        console.log(`   - "${overlap.word}": ${overlap.source}`);
    }
    console.log();
    hasErrors = true;
}

console.log('🔍 MODULE 03 OVERLAP CHECK:\n');
if (m03Overlaps.length === 0) {
    console.log('   ✅ ZERO OVERLAPS DETECTED!\n');
} else {
    console.log(`   ❌ Found ${m03Overlaps.length} overlap(s):\n`);
    for (const overlap of m03Overlaps) {
        console.log(`   - "${overlap.word}": ${overlap.source}`);
    }
    console.log();
    hasErrors = true;
}

console.log('══════════════════════════════════════════════════════════\n');

if (hasErrors) {
    console.log('   ❌ INTEGRITY: FAILED\n');
    process.exit(1);
} else {
    console.log('   ✅ INTEGRITY: PASSED\n');
    console.log('   All A2 M02 & M03 words are unique from A1 corpus and A2 M01.\n');
    process.exit(0);
}
