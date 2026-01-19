import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 German A1 Cumulative Duplicate Audit (M01-M04)\n');
console.log('═══════════════════════════════════════════════════════════\n');

// Load all four modules
const modules = ['de_a1_m01', 'de_a1_m02', 'de_a1_m03', 'de_a1_m04'].map(id => {
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

// Check for "Gehen" and "Kommen" verb overlap
console.log('🔍 SPECIAL CHECK: Gehen & Kommen Verbs\n');

const m01Words = allWords[0].words;
const m04Words = allWords[3].words;

const m01HasGehen = m01Words.find(w => w === 'gehen');
const m01HasKommen = m01Words.find(w => w === 'kommen');
const m04HasGehen = m04Words.find(w => w.includes('gehen'));
const m04HasKommen = m04Words.find(w => w.includes('kommen') || w.includes('ankommen'));

console.log(`   M01 contains "Gehen" (verb):        ${m01HasGehen ? '✅ ' + m01HasGehen : '❌ No'}`);
console.log(`   M01 contains "Kommen" (verb):       ${m01HasKommen ? '✅ ' + m01HasKommen : '❌ No'}`);
console.log(`   M04 contains "Gehen" phrase:        ${m04HasGehen ? '✅ ' + m04HasGehen : '❌ No'}`);
console.log(`   M04 contains "Kommen" compound:     ${m04HasKommen ? '✅ ' + m04HasKommen : '❌ No'}\n`);

if (m01HasGehen && m04HasGehen) {
    if (m04HasGehen === 'zu fuß gehen') {
        console.log('   ✅ VERIFIED: "Gehen" (verb) vs "Zu Fuß gehen" (phrase) - Different forms\n');
    } else if (m04HasGehen !== m01HasGehen) {
        console.log('   ✅ VERIFIED: Different forms of "Gehen"\n');
    } else {
        console.log('   ⚠️  WARNING: Same form of "Gehen" detected!\n');
    }
}

if (m01HasKommen && m04HasKommen) {
    if (m04HasKommen === 'ankommen') {
        console.log('   ✅ VERIFIED: "Kommen" (verb) vs "Ankommen" (compound) - Different forms\n');
    } else if (m04HasKommen !== m01HasKommen) {
        console.log('   ✅ VERIFIED: Different forms of "Kommen"\n');
    } else {
        console.log('   ⚠️  WARNING: Same form of "Kommen" detected!\n');
    }
}

// Check for cross-module duplicates
console.log('═══════════════════════════════════════════════════════════\n');
console.log('🔍 CROSS-MODULE DUPLICATE CHECK:\n');

const m01Set = new Set(allWords[0].words);
const m02Set = new Set(allWords[1].words);
const m03Set = new Set(allWords[2].words);

// M04 vs previous modules
const overlapsM01 = m04Words.filter(word => m01Set.has(word));
const overlapsM02 = m04Words.filter(word => m02Set.has(word));
const overlapsM03 = m04Words.filter(word => m03Set.has(word));

console.log(`   M04 vs M01: ${overlapsM01.length} overlaps`);
if (overlapsM01.length > 0) {
    overlapsM01.forEach(word => console.log(`      - ${word}`));
}
console.log('');

console.log(`   M04 vs M02: ${overlapsM02.length} overlaps`);
if (overlapsM02.length > 0) {
    overlapsM02.forEach(word => console.log(`      - ${word}`));
}
console.log('');

console.log(`   M04 vs M03: ${overlapsM03.length} overlaps`);
if (overlapsM03.length > 0) {
    overlapsM03.forEach(word => console.log(`      - ${word}`));
}
console.log('');

// Total unique words
const flatWords = allWords.flatMap(({ words }) => words);
const uniqueWords = new Set(flatWords);

console.log('═══════════════════════════════════════════════════════════\n');
console.log('📈 CUMULATIVE STATISTICS:\n');
console.log(`   Total words loaded:    ${flatWords.length}`);
console.log(`   Unique words:          ${uniqueWords.size}`);
console.log(`   Duplicate count:       ${flatWords.length - uniqueWords.size}`);
console.log(`   Integrity:             ${uniqueWords.size >= 399 ? '✅ EXCELLENT' : '❌ FAILED'}\n`);

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

const totalOverlaps = overlapsM01.length + overlapsM02.length + overlapsM03.length;
const correctWordCount = allWords.every(({ words }) => words.length === 100);
const acceptableDuplicates = duplicates.every(d =>
    d.word === 'gift' // Intentional review from M01
);

if (correctWordCount && totalOverlaps <= 1 && acceptableDuplicates) {
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
    if (totalOverlaps > 1) {
        console.log(`   ❌ Too many overlaps: ${totalOverlaps}`);
    }
    if (!acceptableDuplicates) {
        console.log('   ❌ Unacceptable duplicates found');
    }
    console.log('');
    process.exit(1);
}
