const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  ENGLISH A1 COMPLETE CURRICULUM AUDIT');
console.log('  Final 1,000-Word Quality Check');
console.log('========================================\n');

const modules = [
    'en_a1_m01', 'en_a1_m02', 'en_a1_m03', 'en_a1_m04', 'en_a1_m05',
    'en_a1_m06', 'en_a1_m07', 'en_a1_m08', 'en_a1_m09', 'en_a1_m10'
];

const allWords = new Set();
const allItems = [];
const duplicates = [];
const missingPhonetics = [];
const missingEnglish = [];
const liarGameTraps = [];

modules.forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);

    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${moduleId}.json`);
        return;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const items = data.vocabularyItems;

    console.log(`📚 ${moduleId}: ${items.length} words - ${data.theme}`);

    // Collect Liar Game trap info
    if (data.liarGameData) {
        liarGameTraps.push({
            module: moduleId,
            trap: data.liarGameData.trap,
            target: data.liarGameData.targetLearners
        });
    }

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
console.log(`Total words across 10 modules: ${allItems.length} (Expected: 1,000)`);
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

liarGameTraps.forEach(trap => {
    console.log(`${trap.module}: ${trap.trap}`);
    console.log(`  Target: ${trap.target}\n`);
});

console.log('========================================');
console.log('  FINAL VERDICT');
console.log('========================================');

const passed = allItems.length === 1000 &&
    duplicates.length === 0 &&
    missingPhonetics.length === 0 &&
    missingEnglish.length === 0;

if (passed) {
    console.log('✅ COMPLETE CURRICULUM PASSED ALL CHECKS!');
    console.log('   - 1,000 unique words verified');
    console.log('   - All IPA phonetics present');
    console.log('   - All usage examples present');
    console.log(`   - ${liarGameTraps.length} Liar Game traps configured`);
    console.log('\n   🎉 READY FOR FINAL FIRESTORE DEPLOYMENT!');
} else {
    console.log('❌ QUALITY ISSUES FOUND - PLEASE REVIEW');
}
console.log('========================================\n');
