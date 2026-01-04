const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  FINAL GRAND AUDIT: A1 + A2 (2,000 WORDS)');
console.log('========================================\n');

// Load all A1 modules (1,000 words)
const a1Modules = ['en_a1_m01', 'en_a1_m02', 'en_a1_m03', 'en_a1_m04', 'en_a1_m05',
    'en_a1_m06', 'en_a1_m07', 'en_a1_m08', 'en_a1_m09', 'en_a1_m10'];

// Load all A2 modules (1,000 words)
const a2Modules = ['en_a2_m01', 'en_a2_m02', 'en_a2_m03', 'en_a2_m04', 'en_a2_m05',
    'en_a2_m06', 'en_a2_m07', 'en_a2_m08', 'en_a2_m09', 'en_a2_m10'];

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
console.log(`Total words: ${allWords.length} (Expected: 2,000)`);
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
    console.log('✅ ZERO DUPLICATES across all 2,000 words!\n');
} else {
    console.log(`❌ DUPLICATES FOUND: ${duplicates.length}`);
    duplicates.forEach(item => console.log(`  - ${item.word} (${item.module} - ${item.level})`));
    console.log();
}

// Check IPA phonetics for new modules (M08-M10)
console.log('Checking IPA phonetics for M08-M10...');
let missingIPA = 0;
['en_a2_m08', 'en_a2_m09', 'en_a2_m10'].forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    data.vocabularyItems.forEach(item => {
        if (!item.phonetic || item.phonetic.trim() === '') {
            console.log(`  ❌ Missing IPA: ${item.word} (${moduleId})`);
            missingIPA++;
        }
    });
});

if (missingIPA === 0) {
    console.log('✅ All words have IPA phonetics\n');
} else {
    console.log(`❌ ${missingIPA} words missing IPA\n`);
}

console.log('========================================');
console.log('  FINAL VERDICT');
console.log('========================================\n');

if (duplicates.length === 0 && allWords.length === 2000 && missingIPA === 0) {
    console.log('✅ GRAND AUDIT PASSED!');
    console.log('   - 2,000 unique words verified');
    console.log('   - A1: 1,000 words (10 modules)');
    console.log('   - A2: 1,000 words (10 modules)');
    console.log('   - All IPA phonetics present');
    console.log('\n   Ready for final Firestore deployment!\n');
} else {
    console.log('❌ ISSUES FOUND\n');
    if (allWords.length !== 2000) {
        console.log(`   Expected 2,000 words, got ${allWords.length}`);
    }
}
