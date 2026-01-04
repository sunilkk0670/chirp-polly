const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  A2 MODULE 1 OVERLAP DETECTION');
console.log('========================================\n');

// Load A1 words
const a1WordList = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../firestore_data/a1_word_list.json'),
    'utf8'
));
const a1Words = new Set(a1WordList);

// Load A2 M01 words
const a2M01 = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../firestore_data/en_a2_m01.json'),
    'utf8'
));

const a2Words = a2M01.vocabularyItems.map(item => item.word.toLowerCase());
const a2WordSet = new Set(a2Words);

console.log(`A1 words: ${a1Words.size}`);
console.log(`A2 M01 words: ${a2Words.length}`);
console.log(`A2 M01 unique: ${a2WordSet.size}\n`);

// Check for overlap
const overlap = a2Words.filter(word => a1Words.has(word));

console.log('========================================');
console.log('  OVERLAP RESULTS');
console.log('========================================\n');

if (overlap.length === 0) {
    console.log('✅ ZERO OVERLAP DETECTED!');
    console.log('   All A2 words are unique from A1\n');
} else {
    console.log(`❌ OVERLAP FOUND: ${overlap.length} words`);
    overlap.forEach(word => console.log(`  - ${word}`));
    console.log();
}

// Check for duplicates within A2 M01
const duplicates = a2Words.filter((word, index) => a2Words.indexOf(word) !== index);

if (duplicates.length === 0) {
    console.log('✅ NO DUPLICATES within A2 M01\n');
} else {
    console.log(`❌ DUPLICATES FOUND: ${duplicates.length}`);
    duplicates.forEach(word => console.log(`  - ${word}`));
    console.log();
}

console.log('========================================');
console.log('  FINAL VERDICT');
console.log('========================================\n');

if (overlap.length === 0 && duplicates.length === 0) {
    console.log('✅ A2 MODULE 1 PASSED ALL CHECKS!');
    console.log('   Ready for verification tables\n');
} else {
    console.log('❌ ISSUES FOUND - PLEASE REVIEW\n');
}
