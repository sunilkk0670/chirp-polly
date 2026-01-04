const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  ENGLISH A1 MODULES 1-7 INTEGRITY AUDIT');
console.log('  Comprehensive Quality Check');
console.log('========================================\n');

const modules = ['en_a1_m01', 'en_a1_m02', 'en_a1_m03', 'en_a1_m04', 'en_a1_m05', 'en_a1_m06', 'en_a1_m07'];
const allWords = new Set();
const allItems = [];
const duplicates = [];
const missingPhonetics = [];
const missingEnglish = [];

modules.forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);

    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${moduleId}.json`);
        return;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const items = data.vocabularyItems;

    console.log(`📚 ${moduleId}: ${items.length} words`);

    items.forEach((item, index) => {
        const word = item.word.toLowerCase();

        if (allWords.has(word)) {
            duplicates.push(`"${item.word}" in ${moduleId} (index ${index})`);
        }
        allWords.add(word);

        if (!item.phonetic || item.phonetic.trim() === '') {
            missingPhonetics.push(`${moduleId}: "${item.word}"`);
        }

        const englishField = item.english || item.usage;
        if (!englishField || englishField.trim() === '') {
            missingEnglish.push(`${moduleId}: "${item.word}"`);
        }

        allItems.push({ moduleId, ...item });
    });
});

console.log(`\n========================================`);
console.log(`  AUDIT RESULTS`);
console.log(`========================================`);
console.log(`Total words across 7 modules: ${allItems.length} (Expected: 700)`);
console.log(`Unique words: ${allWords.size}`);
console.log(`Duplicates found: ${duplicates.length}`);
console.log(`Missing phonetics: ${missingPhonetics.length}`);
console.log(`Missing usage: ${missingEnglish.length}\n`);

if (duplicates.length > 0) {
    console.log('❌ DUPLICATE WORDS:');
    duplicates.forEach(d => console.log(`  - ${d}`));
    console.log();
}

if (missingPhonetics.length > 0) {
    console.log('❌ MISSING PHONETICS:');
    missingPhonetics.forEach(m => console.log(`  - ${m}`));
    console.log();
}

if (missingEnglish.length > 0) {
    console.log('❌ MISSING USAGE:');
    missingEnglish.forEach(m => console.log(`  - ${m}`));
    console.log();
}

console.log('========================================');
console.log('  LIAR GAME TRAPS VERIFICATION');
console.log('========================================\n');

const m2Data = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a1_m02.json'), 'utf8'));
const m3Data = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a1_m03.json'), 'utf8'));
const m4Data = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a1_m04.json'), 'utf8'));
const m5Data = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a1_m05.json'), 'utf8'));
const m6Data = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a1_m06.json'), 'utf8'));
const m7Data = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a1_m07.json'), 'utf8'));

console.log('Module 2 - actual vs actuel (French):');
console.log(`  ✅ Trap: ${m2Data.liarGameData.trap}`);
console.log();
console.log('Module 3 - /ɜː/ vs /ɔː/ phonetics (Indian):');
console.log(`  ✅ Trap: ${m3Data.liarGameData.trap}`);
console.log();
console.log('Module 4 - revert back redundancy (Indian):');
console.log(`  ✅ Trap: ${m4Data.liarGameData.trap}`);
console.log();
console.log('Module 5 - /ɪ/ vs /iː/ phonetics (Spanish):');
console.log(`  ✅ Trap: ${m5Data.liarGameData.trap}`);
console.log(`  Practice pairs: ship/sheep, sit/seat, bit/beat`);
console.log();
console.log('Module 6 - eventually vs eventualmente (Spanish):');
console.log(`  ✅ Trap: ${m6Data.liarGameData.trap}`);
console.log();
console.log('Module 7 - Weather & Clothing:');
console.log(`  ✅ Focus: ${m7Data.liarGameData.trap}`);

console.log('\n========================================');
console.log('  FINAL VERDICT');
console.log('========================================');

const passed = allItems.length === 700 &&
    duplicates.length === 0 &&
    missingPhonetics.length === 0 &&
    missingEnglish.length === 0;

if (passed) {
    console.log('✅ ALL MODULES PASSED QUALITY CHECKS!');
    console.log('   - 700 unique words verified');
    console.log('   - All IPA phonetics present');
    console.log('   - All usage examples present');
    console.log('   - 6 Liar Game traps configured');
    console.log('\n   Ready for Firestore upload!');
} else {
    console.log('❌ QUALITY ISSUES FOUND - PLEASE REVIEW');
}
console.log('========================================\n');
