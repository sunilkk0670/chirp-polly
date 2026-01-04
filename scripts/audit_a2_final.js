const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  ENGLISH A2 MODULES 1-4 FINAL AUDIT');
console.log('========================================\n');

// Load A1 words
const a1Words = new Set(JSON.parse(fs.readFileSync(
    path.join(__dirname, '../firestore_data/a1_word_list.json'),
    'utf8'
)));

// Load all A2 modules
const modules = ['en_a2_m01', 'en_a2_m02', 'en_a2_m03', 'en_a2_m04'];
const allWords = [];
const wordSet = new Set();

modules.forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`📚 ${moduleId}: ${data.vocabularyItems.length} words - ${data.theme}`);

    data.vocabularyItems.forEach(item => {
        allWords.push({ word: item.word.toLowerCase(), module: moduleId });
        wordSet.add(item.word.toLowerCase());
    });
});

console.log(`\n========================================`);
console.log(`  AUDIT RESULTS`);
console.log(`========================================`);
console.log(`Total words: ${allWords.length}`);
console.log(`Unique words: ${wordSet.size}`);
console.log(`A1 words to exclude: ${a1Words.size}\n`);

// Check A1 overlap
const a1Overlap = allWords.filter(item => a1Words.has(item.word));
if (a1Overlap.length === 0) {
    console.log('✅ ZERO A1 OVERLAP!');
} else {
    console.log(`❌ A1 OVERLAP: ${a1Overlap.length} words`);
    a1Overlap.forEach(item => console.log(`  - ${item.word} (${item.module})`));
}

// Check duplicates
const duplicates = [];
const seen = new Set();
allWords.forEach(item => {
    if (seen.has(item.word)) {
        duplicates.push(item);
    }
    seen.add(item.word);
});

if (duplicates.length === 0) {
    console.log('✅ NO DUPLICATES\n');
} else {
    console.log(`\n❌ DUPLICATES: ${duplicates.length}`);
    duplicates.forEach(item => console.log(`  - ${item.word} (${item.module})`));
}

console.log('\n========================================');
console.log('  FINAL VERDICT');
console.log('========================================\n');

if (a1Overlap.length === 0 && duplicates.length === 0 && allWords.length === 400) {
    console.log('✅ ALL CHECKS PASSED!');
    console.log('   - 400 words total');
    console.log('   - Zero A1 overlap');
    console.log('   - No duplicates');
    console.log('\n   Ready for verification tables!\n');
} else {
    console.log('❌ ISSUES FOUND\n');
}
