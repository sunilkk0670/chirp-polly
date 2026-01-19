import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 German A1 Cumulative Duplicate Audit\n');
console.log('═══════════════════════════════════════════════════════════\n');

// Load modules
const m01Path = join(__dirname, '..', 'firestore_data', 'de_a1_m01.json');
const m02Path = join(__dirname, '..', 'firestore_data', 'de_a1_m02.json');

const m01Data = JSON.parse(readFileSync(m01Path, 'utf8'));
const m02Data = JSON.parse(readFileSync(m02Path, 'utf8'));

// Extract vocabulary
const m01Words = m01Data.lessons[0].vocabularyItems.map(item => item.word.toLowerCase().trim());
const m02Words = m02Data.lessons[0].vocabularyItems.map(item => item.word.toLowerCase().trim());

console.log('📊 MODULE WORD COUNTS:\n');
console.log(`   M01 (Core Essentials): ${m01Words.length} words`);
console.log(`   M02 (Home & Family):   ${m02Words.length} words`);
console.log(`   ────────────────────────────────────`);
console.log(`   Total:                 ${m01Words.length + m02Words.length} words\n`);

// Check for duplicates within each module
function findDuplicatesInArray(arr, moduleName) {
    const seen = new Set();
    const duplicates = [];

    arr.forEach(word => {
        if (seen.has(word)) {
            duplicates.push(word);
        } else {
            seen.add(word);
        }
    });

    if (duplicates.length > 0) {
        console.log(`❌ INTERNAL DUPLICATES in ${moduleName}:`);
        duplicates.forEach(word => console.log(`   - ${word}`));
        console.log('');
    } else {
        console.log(`✅ ${moduleName}: No internal duplicates\n`);
    }

    return duplicates;
}

const m01InternalDupes = findDuplicatesInArray(m01Words, 'M01');
const m02InternalDupes = findDuplicatesInArray(m02Words, 'M02');

// Check for cross-module duplicates
console.log('🔍 CROSS-MODULE DUPLICATE CHECK:\n');

const m01Set = new Set(m01Words);
const overlaps = m02Words.filter(word => m01Set.has(word));

if (overlaps.length > 0) {
    console.log(`❌ FOUND ${overlaps.length} OVERLAPPING WORDS between M01 and M02:\n`);
    overlaps.forEach((word, index) => {
        console.log(`   ${index + 1}. ${word}`);
    });
    console.log('');
} else {
    console.log('✅ ZERO OVERLAP: All words are unique across M01 and M02!\n');
}

// Calculate unique word count
const allWords = [...m01Words, ...m02Words];
const uniqueWords = new Set(allWords);

console.log('═══════════════════════════════════════════════════════════\n');
console.log('📈 CUMULATIVE STATISTICS:\n');
console.log(`   Total words loaded:    ${allWords.length}`);
console.log(`   Unique words:          ${uniqueWords.size}`);
console.log(`   Duplicate count:       ${allWords.length - uniqueWords.size}`);
console.log(`   Integrity:             ${uniqueWords.size === allWords.length ? '✅ PERFECT' : '❌ FAILED'}\n`);

// Verify Liar Game entries
console.log('═══════════════════════════════════════════════════════════\n');
console.log('🎮 LIAR GAME VERIFICATION:\n');

const m01LiarWords = m01Words.filter(w => w.includes('bekommen') || w.includes('gift') || w.includes('eventuell'));
const m02LiarWords = m02Words.filter(w => w.includes('enkel') || w.includes('gift') || w.includes('hut') || w.includes('brav'));

console.log(`   M01 Liar Game words: ${m01LiarWords.length}`);
m01LiarWords.forEach(word => console.log(`      - ${word}`));
console.log('');

console.log(`   M02 Liar Game words: ${m02LiarWords.length}`);
m02LiarWords.forEach(word => console.log(`      - ${word}`));
console.log('');

// Final verdict
console.log('═══════════════════════════════════════════════════════════\n');

const hasInternalDupes = m01InternalDupes.length > 0 || m02InternalDupes.length > 0;
const hasCrossModuleDupes = overlaps.length > 0;
const correctWordCount = m01Words.length === 100 && m02Words.length === 100;

if (!hasInternalDupes && !hasCrossModuleDupes && correctWordCount) {
    console.log('🎉 AUDIT PASSED: ZERO-OVERLAP INTEGRITY CONFIRMED!\n');
    console.log('   ✅ M01: 100 unique words');
    console.log('   ✅ M02: 100 unique words');
    console.log('   ✅ Total: 200 unique words');
    console.log('   ✅ Zero duplicates across modules\n');
    process.exit(0);
} else {
    console.log('❌ AUDIT FAILED: Issues detected\n');
    if (!correctWordCount) {
        console.log(`   ❌ Word count mismatch (M01: ${m01Words.length}, M02: ${m02Words.length})`);
    }
    if (hasInternalDupes) {
        console.log('   ❌ Internal duplicates found');
    }
    if (hasCrossModuleDupes) {
        console.log('   ❌ Cross-module duplicates found');
    }
    console.log('');
    process.exit(1);
}
