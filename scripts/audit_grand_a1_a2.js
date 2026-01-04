const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  GRAND AUDIT: A1 + A2 (1,700 WORDS)');
console.log('========================================\n');

// Load A1 words (1,000)
const a1Modules = ['en_a1_m01', 'en_a1_m02', 'en_a1_m03', 'en_a1_m04', 'en_a1_m05',
    'en_a1_m06', 'en_a1_m07', 'en_a1_m08', 'en_a1_m09', 'en_a1_m10'];

// Load A2 words (700)
const a2Modules = ['en_a2_m01', 'en_a2_m02', 'en_a2_m03', 'en_a2_m04',
    'en_a2_m05', 'en_a2_m06', 'en_a2_m07'];

const allWords = [];
const wordSet = new Set();

console.log('A1 MODULES:');
a1Modules.forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`  📚 ${moduleId}: ${data.vocabularyItems.length} words`);

    data.vocabularyItems.forEach(item => {
        const word = item.word.toLowerCase();
        allWords.push({ word, module: moduleId, level: 'A1' });
        wordSet.add(word);
    });
});

console.log('\nA2 MODULES:');
a2Modules.forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`  📚 ${moduleId}: ${data.vocabularyItems.length} words`);

    data.vocabularyItems.forEach(item => {
        const word = item.word.toLowerCase();
        allWords.push({ word, module: moduleId, level: 'A2' });
        wordSet.add(word);
    });
});

console.log(`\n========================================`);
console.log(`  RESULTS`);
console.log(`========================================`);
console.log(`Total words: ${allWords.length} (Expected: 1,700)`);
console.log(`Unique words: ${wordSet.size}\n`);

// Check for duplicates
const duplicates = [];
const seen = new Set();
allWords.forEach(item => {
    if (seen.has(item.word)) {
        duplicates.push(item);
    }
    seen.add(item.word);
});

if (duplicates.length === 0) {
    console.log('✅ ZERO DUPLICATES across all 1,700 words!\n');
} else {
    console.log(`❌ DUPLICATES FOUND: ${duplicates.length}`);
    duplicates.forEach(item => console.log(`  - ${item.word} (${item.module} - ${item.level})`));
    console.log();
}

console.log('========================================');
console.log('  FINAL VERDICT');
console.log('========================================\n');

if (duplicates.length === 0 && allWords.length === 1700) {
    console.log('✅ GRAND AUDIT PASSED!');
    console.log('   - 1,700 unique words verified');
    console.log('   - A1: 1,000 words');
    console.log('   - A2: 700 words');
    console.log('\n   Ready for Firestore deployment!\n');
} else {
    console.log('❌ ISSUES FOUND\n');
    if (allWords.length !== 1700) {
        console.log(`   Expected 1,700 words, got ${allWords.length}`);
    }
}
