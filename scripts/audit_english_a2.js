const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  ENGLISH A2 MODULES 1-4 AUDIT');
console.log('  Comprehensive Quality Check');
console.log('========================================\n');

// Load A1 words
const a1WordList = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../firestore_data/a1_word_list.json'),
    'utf8'
));
const a1Words = new Set(a1WordList);

// Load A2 modules
const a2Modules = ['en_a2_m01', 'en_a2_m02', 'en_a2_m03', 'en_a2_m04'];
const allA2Words = [];
const a2WordSet = new Set();

a2Modules.forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`📚 ${moduleId}: ${data.vocabularyItems.length} words - ${data.theme}`);

    data.vocabularyItems.forEach(item => {
        allA2Words.push({ word: item.word.toLowerCase(), module: moduleId });
        a2WordSet.add(item.word.toLowerCase());
    });
});

console.log(`\n========================================`);
console.log(`  AUDIT RESULTS`);
console.log(`========================================`);
console.log(`A1 words: ${a1Words.size}`);
console.log(`A2 total words: ${allA2Words.length}`);
console.log(`A2 unique words: ${a2WordSet.size}\n`);

// Check for A1 overlap
const a1Overlap = allA2Words.filter(item => a1Words.has(item.word));

if (a1Overlap.length === 0) {
    console.log('✅ ZERO A1 OVERLAP!');
    console.log('   All A2 words are unique from A1\n');
} else {
    console.log(`❌ A1 OVERLAP FOUND: ${a1Overlap.length} words`);
    a1Overlap.forEach(item => console.log(`  - ${item.word} (${item.module})`));
    console.log();
}

// Check for duplicates within A2
const duplicates = [];
const seen = new Set();
allA2Words.forEach(item => {
    if (seen.has(item.word)) {
        duplicates.push(item);
    }
    seen.add(item.word);
});

if (duplicates.length === 0) {
    console.log('✅ NO DUPLICATES within A2 modules\n');
} else {
    console.log(`❌ DUPLICATES FOUND: ${duplicates.length}`);
    duplicates.forEach(item => console.log(`  - ${item.word} (${item.module})`));
    console.log();
}

console.log('========================================');
console.log('  FINAL VERDICT');
console.log('========================================\n');

if (a1Overlap.length === 0 && duplicates.length === 0 && allA2Words.length === 400) {
    console.log('✅ A2 MODULES 1-4 PASSED ALL CHECKS!');
    console.log('   - 400 words generated');
    console.log('   - Zero A1 overlap');
    console.log('   - No duplicates');
    console.log('\n   Ready for verification tables\n');
} else {
    console.log('❌ ISSUES FOUND - PLEASE REVIEW\n');
}
