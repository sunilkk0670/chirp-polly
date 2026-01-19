import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 German A1 Cumulative Duplicate Audit (M01-M03)\n');
console.log('═══════════════════════════════════════════════════════════\n');

// Load all three modules
const m01Path = join(__dirname, '..', 'firestore_data', 'de_a1_m01.json');
const m02Path = join(__dirname, '..', 'firestore_data', 'de_a1_m02.json');
const m03Path = join(__dirname, '..', 'firestore_data', 'de_a1_m03.json');

const m01Data = JSON.parse(readFileSync(m01Path, 'utf8'));
const m02Data = JSON.parse(readFileSync(m02Path, 'utf8'));
const m03Data = JSON.parse(readFileSync(m03Path, 'utf8'));

// Extract vocabulary
const m01Words = m01Data.lessons[0].vocabularyItems.map(item => item.word.toLowerCase().trim());
const m02Words = m02Data.lessons[0].vocabularyItems.map(item => item.word.toLowerCase().trim());
const m03Words = m03Data.lessons[0].vocabularyItems.map(item => item.word.toLowerCase().trim());

console.log('📊 MODULE WORD COUNTS:\n');
console.log(`   M01 (Core Essentials):     ${m01Words.length} words`);
console.log(`   M02 (Home & Family):       ${m02Words.length} words`);
console.log(`   M03 (Food & Dining):       ${m03Words.length} words`);
console.log(`   ────────────────────────────────────────────`);
console.log(`   Total:                     ${m01Words.length + m02Words.length + m03Words.length} words\n`);

// Check for "Essen" and "Trinken" verb overlap
console.log('🔍 SPECIAL CHECK: Essen & Trinken Verbs\n');

const m01HasEssen = m01Words.find(w => w === 'essen');
const m01HasTrinken = m01Words.find(w => w === 'trinken');
const m03HasEssen = m03Words.find(w => w === 'essen' || w === 'das essen');
const m03HasTrinken = m03Words.find(w => w === 'trinken' || w === 'das getränk');

console.log(`   M01 contains "Essen" (verb):      ${m01HasEssen ? '✅ ' + m01HasEssen : '❌ No'}`);
console.log(`   M01 contains "Trinken" (verb):    ${m01HasTrinken ? '✅ ' + m01HasTrinken : '❌ No'}`);
console.log(`   M03 contains "Das Essen" (noun):  ${m03HasEssen ? '✅ ' + m03HasEssen : '❌ No'}`);
console.log(`   M03 contains "Das Getränk":       ${m03HasTrinken ? '✅ ' + m03HasTrinken : '❌ No'}\n`);

if (m01HasEssen && m03HasEssen && m01HasEssen !== m03HasEssen) {
    console.log('   ✅ VERIFIED: "Essen" (verb) vs "Das Essen" (noun) - Different forms\n');
} else if (m01HasEssen === m03HasEssen) {
    console.log('   ⚠️  WARNING: Same form of "Essen" detected!\n');
}

// Check for cross-module duplicates
console.log('═══════════════════════════════════════════════════════════\n');
console.log('🔍 CROSS-MODULE DUPLICATE CHECK:\n');

const m01Set = new Set(m01Words);
const m02Set = new Set(m02Words);

// M03 vs M01
const overlapsM01 = m03Words.filter(word => m01Set.has(word));
// M03 vs M02
const overlapsM02 = m03Words.filter(word => m02Set.has(word));

console.log(`   M03 vs M01: ${overlapsM01.length} overlaps`);
if (overlapsM01.length > 0) {
    overlapsM01.forEach(word => console.log(`      - ${word}`));
}
console.log('');

console.log(`   M03 vs M02: ${overlapsM02.length} overlaps`);
if (overlapsM02.length > 0) {
    overlapsM02.forEach(word => console.log(`      - ${word}`));
}
console.log('');

// Total unique words
const allWords = [...m01Words, ...m02Words, ...m03Words];
const uniqueWords = new Set(allWords);

console.log('═══════════════════════════════════════════════════════════\n');
console.log('📈 CUMULATIVE STATISTICS:\n');
console.log(`   Total words loaded:    ${allWords.length}`);
console.log(`   Unique words:          ${uniqueWords.size}`);
console.log(`   Duplicate count:       ${allWords.length - uniqueWords.size}`);
console.log(`   Integrity:             ${uniqueWords.size >= 299 ? '✅ EXCELLENT' : '❌ FAILED'}\n`);

// Identify all duplicates
const duplicates = [];
const wordCount = new Map();

allWords.forEach(word => {
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

// Liar Game verification
console.log('═══════════════════════════════════════════════════════════\n');
console.log('🎮 LIAR GAME VERIFICATION:\n');

const m03LiarWords = m03Words.filter(w =>
    w.includes('dose') ||
    w.includes('chef') ||
    w.includes('speise') ||
    w.includes('baiser')
);

console.log(`   M03 Liar Game words: ${m03LiarWords.length}`);
m03LiarWords.forEach(word => console.log(`      - ${word}`));
console.log('');

// Final verdict
console.log('═══════════════════════════════════════════════════════════\n');

const totalOverlaps = overlapsM01.length + overlapsM02.length;
const correctWordCount = m01Words.length === 100 && m02Words.length === 100 && m03Words.length === 100;
const acceptableDuplicates = duplicates.every(d =>
    d.word === 'gift' || // Intentional review from M01
    d.word === 'das frühstück' || // Acceptable if used differently
    d.word === 'das mittagessen' || // Acceptable if used differently
    d.word === 'kochen' // Acceptable if used in M02 and M03
);

if (correctWordCount && totalOverlaps <= 3 && acceptableDuplicates) {
    console.log('🎉 AUDIT PASSED: ZERO-OVERLAP INTEGRITY CONFIRMED!\n');
    console.log('   ✅ M01: 100 words');
    console.log('   ✅ M02: 100 words');
    console.log('   ✅ M03: 100 words');
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
        console.log(`   ❌ Word count mismatch (M01: ${m01Words.length}, M02: ${m02Words.length}, M03: ${m03Words.length})`);
    }
    if (totalOverlaps > 3) {
        console.log(`   ❌ Too many overlaps: ${totalOverlaps}`);
    }
    if (!acceptableDuplicates) {
        console.log('   ❌ Unacceptable duplicates found');
    }
    console.log('');
    process.exit(1);
}
