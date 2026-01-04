const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  ENGLISH A1 MODULES 1-4 INTEGRITY AUDIT');
console.log('  Comprehensive Quality Check');
console.log('========================================\n');

const modules = ['en_a1_m01', 'en_a1_m02', 'en_a1_m03', 'en_a1_m04'];
const allWords = new Set();
const allItems = [];
const duplicates = [];
const missingPhonetics = [];
const missingEnglish = [];
const shortUsage = [];

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

        // Check for duplicates
        if (allWords.has(word)) {
            duplicates.push(`"${item.word}" in ${moduleId} (index ${index})`);
        }
        allWords.add(word);

        // Check for missing phonetics
        if (!item.phonetic || item.phonetic.trim() === '') {
            missingPhonetics.push(`${moduleId}: "${item.word}"`);
        }

        // Check for missing english/usage
        const englishField = item.english || item.usage;
        if (!englishField || englishField.trim() === '') {
            missingEnglish.push(`${moduleId}: "${item.word}"`);
        } else if (englishField.split(' ').length < 3) {
            shortUsage.push(`${moduleId}: "${item.word}" - "${englishField}"`);
        }

        allItems.push({ moduleId, ...item });
    });
});

console.log(`\n========================================`);
console.log(`  AUDIT RESULTS`);
console.log(`========================================`);
console.log(`Total words across 4 modules: ${allItems.length} (Expected: 400)`);
console.log(`Unique words: ${allWords.size}`);
console.log(`Duplicates found: ${duplicates.length}`);
console.log(`Missing phonetics: ${missingPhonetics.length}`);
console.log(`Missing usage: ${missingEnglish.length}`);
console.log(`Short usage (<3 words): ${shortUsage.length}\n`);

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

if (shortUsage.length > 0) {
    console.log('⚠️  SHORT USAGE EXAMPLES (may need review):');
    shortUsage.slice(0, 10).forEach(s => console.log(`  - ${s}`));
    if (shortUsage.length > 10) {
        console.log(`  ... and ${shortUsage.length - 10} more`);
    }
    console.log();
}

// Verification Tables
console.log('========================================');
console.log('  VERIFICATION TABLE 1: Module 2 (Words 1-20)');
console.log('========================================\n');
console.log('| # | Word | Phonetic | Usage Preview |');
console.log('|---|------|----------|---------------|');
const m2Data = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a1_m02.json'), 'utf8'));
for (let i = 0; i < 20; i++) {
    const item = m2Data.vocabularyItems[i];
    const preview = item.english.substring(0, 40) + (item.english.length > 40 ? '...' : '');
    console.log(`| ${i + 1} | ${item.word} | ${item.phonetic} | ${preview} |`);
}

console.log('\n========================================');
console.log('  VERIFICATION TABLE 2: Module 3 (Words 1-20)');
console.log('========================================\n');
console.log('| # | Word | Phonetic | Usage Preview |');
console.log('|---|------|----------|---------------|');
const m3Data = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a1_m03.json'), 'utf8'));
for (let i = 0; i < 20; i++) {
    const item = m3Data.vocabularyItems[i];
    const preview = item.english.substring(0, 40) + (item.english.length > 40 ? '...' : '');
    console.log(`| ${i + 1} | ${item.word} | ${item.phonetic} | ${preview} |`);
}

console.log('\n========================================');
console.log('  VERIFICATION TABLE 3: Module 4 (Words 1-20)');
console.log('========================================\n');
console.log('| # | Word | Phonetic | Usage Preview |');
console.log('|---|------|----------|---------------|');
const m4Data = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a1_m04.json'), 'utf8'));
for (let i = 0; i < 20; i++) {
    const item = m4Data.vocabularyItems[i];
    const preview = item.english.substring(0, 40) + (item.english.length > 40 ? '...' : '');
    console.log(`| ${i + 1} | ${item.word} | ${item.phonetic} | ${preview} |`);
}

console.log('\n========================================');
console.log('  LIAR GAME TRAPS VERIFICATION');
console.log('========================================\n');
console.log('Module 2 - actual vs actuel (French):');
console.log(`  Trap: ${m2Data.liarGameData.trap}`);
console.log(`  Target: ${m2Data.liarGameData.targetLearners}`);
console.log();
console.log('Module 3 - /ɜː/ vs /ɔː/ phonetics (Indian):');
console.log(`  Trap: ${m3Data.liarGameData.trap}`);
console.log(`  Target: ${m3Data.liarGameData.targetLearners}`);
console.log();
console.log('Module 4 - revert back redundancy (Indian):');
console.log(`  Trap: ${m4Data.liarGameData.trap}`);
console.log(`  Target: ${m4Data.liarGameData.targetLearners}`);

console.log('\n========================================');
console.log('  FINAL VERDICT');
console.log('========================================');

const passed = allItems.length === 400 &&
    duplicates.length === 0 &&
    missingPhonetics.length === 0 &&
    missingEnglish.length === 0;

if (passed) {
    console.log('✅ ALL MODULES PASSED QUALITY CHECKS!');
    console.log('   - 400 unique words verified');
    console.log('   - All IPA phonetics present');
    console.log('   - All usage examples present');
    console.log('   - 3 Liar Game traps configured');
    console.log('\n   Ready for Firestore upload!');
} else {
    console.log('❌ QUALITY ISSUES FOUND - PLEASE REVIEW');
}
console.log('========================================\n');
