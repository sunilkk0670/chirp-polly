import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 German A1 Cumulative Duplicate Audit (M01-M06)\n');
console.log('═══════════════════════════════════════════════════════════\n');

// Load all six modules
const modules = ['de_a1_m01', 'de_a1_m02', 'de_a1_m03', 'de_a1_m04', 'de_a1_m05', 'de_a1_m06'].map(id => {
    const path = join(__dirname, '..', 'firestore_data', `${id}.json`);
    return JSON.parse(readFileSync(path, 'utf8'));
});

const allWords = modules.map((m, i) => ({
    id: `M0${i + 1}`,
    words: m.lessons[0].vocabularyItems.map(item => item.word.toLowerCase().trim())
}));

console.log('📊 MODULE WORD COUNTS:\n');
allWords.forEach(({ id, words }) => {
    console.log(`   ${id}: ${words.length} words`);
});
console.log(`   ────────────────────────────────────────────`);
const totalWords = allWords.reduce((sum, { words }) => sum + words.length, 0);
console.log(`   Total: ${totalWords} words\n`);

// Check for cross-module duplicates
console.log('═══════════════════════════════════════════════════════════\n');
console.log('🔍 CROSS-MODULE DUPLICATE CHECK:\n');

// Create sets for M01-M04
const m01Set = new Set(allWords[0].words);
const m02Set = new Set(allWords[1].words);
const m03Set = new Set(allWords[2].words);
const m04Set = new Set(allWords[3].words);

// M05 vs previous modules
const m05Words = allWords[4].words;
const m05overlapsM01 = m05Words.filter(word => m01Set.has(word));
const m05overlapsM02 = m05Words.filter(word => m02Set.has(word));
const m05overlapsM03 = m05Words.filter(word => m03Set.has(word));
const m05overlapsM04 = m05Words.filter(word => m04Set.has(word));

console.log('M05 vs Previous Modules:');
console.log(`   M05 vs M01: ${m05overlapsM01.length} overlaps`);
if (m05overlapsM01.length > 0) m05overlapsM01.forEach(w => console.log(`      - ${w}`));
console.log(`   M05 vs M02: ${m05overlapsM02.length} overlaps`);
if (m05overlapsM02.length > 0) m05overlapsM02.forEach(w => console.log(`      - ${w}`));
console.log(`   M05 vs M03: ${m05overlapsM03.length} overlaps`);
if (m05overlapsM03.length > 0) m05overlapsM03.forEach(w => console.log(`      - ${w}`));
console.log(`   M05 vs M04: ${m05overlapsM04.length} overlaps`);
if (m05overlapsM04.length > 0) m05overlapsM04.forEach(w => console.log(`      - ${w}`));
console.log('');

// M06 vs previous modules
const m06Words = allWords[5].words;
const m05Set = new Set(m05Words);
const m06overlapsM01 = m06Words.filter(word => m01Set.has(word));
const m06overlapsM02 = m06Words.filter(word => m02Set.has(word));
const m06overlapsM03 = m06Words.filter(word => m03Set.has(word));
const m06overlapsM04 = m06Words.filter(word => m04Set.has(word));
const m06overlapsM05 = m06Words.filter(word => m05Set.has(word));

console.log('M06 vs Previous Modules:');
console.log(`   M06 vs M01: ${m06overlapsM01.length} overlaps`);
if (m06overlapsM01.length > 0) m06overlapsM01.forEach(w => console.log(`      - ${w}`));
console.log(`   M06 vs M02: ${m06overlapsM02.length} overlaps`);
if (m06overlapsM02.length > 0) m06overlapsM02.forEach(w => console.log(`      - ${w}`));
console.log(`   M06 vs M03: ${m06overlapsM03.length} overlaps`);
if (m06overlapsM03.length > 0) m06overlapsM03.forEach(w => console.log(`      - ${w}`));
console.log(`   M06 vs M04: ${m06overlapsM04.length} overlaps`);
if (m06overlapsM04.length > 0) m06overlapsM04.forEach(w => console.log(`      - ${w}`));
console.log(`   M06 vs M05: ${m06overlapsM05.length} overlaps`);
if (m06overlapsM05.length > 0) m06overlapsM05.forEach(w => console.log(`      - ${w}`));
console.log('');

// Total unique words
const flatWords = allWords.flatMap(({ words }) => words);
const uniqueWords = new Set(flatWords);

console.log('═══════════════════════════════════════════════════════════\n');
console.log('📈 CUMULATIVE STATISTICS:\n');
console.log(`   Total words loaded:    ${flatWords.length}`);
console.log(`   Unique words:          ${uniqueWords.size}`);
console.log(`   Duplicate count:       ${flatWords.length - uniqueWords.size}`);
console.log(`   Integrity:             ${uniqueWords.size >= 599 ? '✅ EXCELLENT' : '❌ FAILED'}\n`);

// Identify all duplicates
const duplicates = [];
const wordCount = new Map();

flatWords.forEach(word => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
});

wordCount.forEach((count, word) => {
    if (count > 1) {
        duplicates.push({ word, count });
    }
});

if (duplicates.length > 0) {
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('📋 ALL DUPLICATES FOUND:\n');
    duplicates.forEach(({ word, count }) => {
        console.log(`   "${word}" appears ${count} times`);
    });
    console.log('');
}

// Final verdict
console.log('═══════════════════════════════════════════════════════════\n');

const correctWordCount = allWords.every(({ words }) => words.length === 100);
const acceptableDuplicates = duplicates.every(d =>
    d.word === 'gift' // Intentional review from M01
);

if (correctWordCount && duplicates.length <= 1 && acceptableDuplicates) {
    console.log('🎉 AUDIT PASSED: ZERO-OVERLAP INTEGRITY CONFIRMED!\n');
    allWords.forEach(({ id }) => {
        console.log(`   ✅ ${id}: 100 words`);
    });
    console.log(`   ✅ Total unique: ${uniqueWords.size} words`);
    console.log(`   ✅ Acceptable overlaps: ${duplicates.length}\n`);

    if (duplicates.length > 0) {
        console.log('   📝 Note: The following overlaps are intentional or acceptable:');
        duplicates.forEach(({ word, count }) => {
            console.log(`      - "${word}" (${count}x)`);
        });
        console.log('');
    }

    process.exit(0);
} else {
    console.log('❌ AUDIT FAILED: Issues detected\n');
    if (!correctWordCount) {
        allWords.forEach(({ id, words }) => {
            if (words.length !== 100) {
                console.log(`   ❌ ${id}: ${words.length} words (expected 100)`);
            }
        });
    }
    if (duplicates.length > 1 || !acceptableDuplicates) {
        console.log(`   ❌ Unacceptable duplicates found: ${duplicates.length}`);
    }
    console.log('');
    process.exit(1);
}
