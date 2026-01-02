const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  ENGLISH A1 MODULE 1 INTEGRITY AUDIT');
console.log('========================================\n');

const filePath = path.join(__dirname, '../firestore_data/en_a1_m01.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const items = data.vocabularyItems;

// Check total count
console.log(`Total words: ${items.length} (Expected: 100)`);

// Check for duplicates
const wordSet = new Set();
const duplicates = [];
items.forEach((item, index) => {
    if (wordSet.has(item.word)) {
        duplicates.push(`Word "${item.word}" at index ${index}`);
    }
    wordSet.add(item.word);
});

console.log(`Unique words: ${wordSet.size}`);
console.log(`Duplicates: ${duplicates.length}\n`);

if (duplicates.length > 0) {
    console.log('❌ DUPLICATES FOUND:');
    duplicates.forEach(d => console.log(`  - ${d}`));
} else {
    console.log('✅ No duplicates found!');
}

// Check phonetic completeness
const missingPhonetics = items.filter(item => !item.phonetic || item.phonetic.trim() === '');
console.log(`\nMissing phonetics: ${missingPhonetics.length}`);
if (missingPhonetics.length > 0) {
    console.log('❌ Items without phonetics:');
    missingPhonetics.forEach(item => console.log(`  - ${item.word}`));
} else {
    console.log('✅ All items have phonetics!');
}

// Check usage completeness
const missingUsage = items.filter(item => !item.usage || item.usage.trim() === '');
console.log(`\nMissing usage examples: ${missingUsage.length}`);
if (missingUsage.length > 0) {
    console.log('❌ Items without usage:');
    missingUsage.forEach(item => console.log(`  - ${item.word}`));
} else {
    console.log('✅ All items have usage examples!');
}

// Proof Tables
console.log('\n========================================');
console.log('  PROOF TABLE 1: Words 1-20');
console.log('========================================\n');
console.log('| # | Word | Phonetic | Usage Preview |');
console.log('|---|------|----------|---------------|');
for (let i = 0; i < 20; i++) {
    const item = items[i];
    const preview = item.usage.substring(0, 40) + (item.usage.length > 40 ? '...' : '');
    console.log(`| ${i + 1} | ${item.word} | ${item.phonetic} | ${preview} |`);
}

console.log('\n========================================');
console.log('  PROOF TABLE 2: Words 80-100');
console.log('========================================\n');
console.log('| # | Word | Phonetic | Usage Preview |');
console.log('|---|------|----------|---------------|');
for (let i = 79; i < Math.min(100, items.length); i++) {
    const item = items[i];
    if (item) {
        const preview = item.usage.substring(0, 40) + (item.usage.length > 40 ? '...' : '');
        console.log(`| ${i + 1} | ${item.word} | ${item.phonetic} | ${preview} |`);
    }
}

console.log('\n========================================');
console.log('  LIAR GAME TRAPS (To be added in M02-M04)');
console.log('========================================\n');
console.log('Trap 1 (M02): "actual" vs French "actuel"');
console.log('Trap 2 (M04): Indian-English "revert back"');
console.log('Trap 3 (M06): "eventually" vs Spanish "eventualmente"');

console.log('\n========================================');
console.log('  FINAL VERDICT');
console.log('========================================');
if (items.length === 100 && duplicates.length === 0 && missingPhonetics.length === 0 && missingUsage.length === 0) {
    console.log('✅ MODULE 1 PASSED ALL QUALITY CHECKS!');
} else {
    console.log('❌ MODULE 1 HAS ISSUES - PLEASE REVIEW');
}
console.log('========================================\n');
