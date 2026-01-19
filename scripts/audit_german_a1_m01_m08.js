import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'firestore_data');
const modules = [
    'de_a1_m01.json',
    'de_a1_m02.json',
    'de_a1_m03.json',
    'de_a1_m04.json',
    'de_a1_m05.json',
    'de_a1_m06.json',
    'de_a1_m07.json',
    'de_a1_m08.json'
];

console.log('🔍 German A1 Cumulative Duplicate Audit (M01-M08)\n');
console.log('═══════════════════════════════════════════════════════════\n');

let totalWords = 0;
const wordToModules = {};
const moduleCounts = {};
const allData = [];

modules.forEach(filename => {
    const filePath = path.join(dataDir, filename);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filename}`);
        return;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    allData.push({ filename, data });

    const vocab = data.lessons[0].vocabularyItems;
    moduleCounts[filename] = vocab.length;
    totalWords += vocab.length;

    vocab.forEach(item => {
        const word = item.word.toLowerCase().trim();
        if (!wordToModules[word]) {
            wordToModules[word] = [];
        }
        wordToModules[word].push(filename);
    });
});

// 📊 Module Counts
console.log('📊 MODULE WORD COUNTS:\n');
modules.forEach(m => {
    const count = moduleCounts[m] || 0;
    const status = count === 100 ? '✅' : '❌';
    console.log(`   ${m}: ${count} words ${status}`);
});
console.log(`   ────────────────────────────────────────────`);
console.log(`   Total: ${totalWords} words\n`);

// 🔍 Overlap Check
console.log('═══════════════════════════════════════════════════════════\n');
console.log('🔍 CROSS-MODULE DUPLICATE CHECK:\n');

const duplicates = [];
const intentionalDuplicates = ['gift']; // Add intentional duplicates here

Object.keys(wordToModules).forEach(word => {
    if (wordToModules[word].length > 1) {
        if (!intentionalDuplicates.includes(word)) {
            duplicates.push({ word, modules: wordToModules[word] });
        }
    }
});

if (duplicates.length === 0) {
    console.log('   ✅ No unacceptable overlaps found!\n');
} else {
    console.log(`   ❌ Found ${duplicates.length} unacceptable duplicates:\n`);
    duplicates.forEach(d => {
        console.log(`   - "${d.word}": ${d.modules.join(', ')}`);
    });
    console.log('');
}

// Check for M07 vs M08 overlaps specifically
console.log('═══════════════════════════════════════════════════════════\n');
console.log('📉 CUMULATIVE STATISTICS:\n');
console.log(`   Total words loaded:    ${totalWords}`);
console.log(`   Unique words:          ${Object.keys(wordToModules).length}`);
console.log(`   Duplicate count:       ${duplicates.length + (totalWords - Object.keys(wordToModules).length - duplicates.length)}`);

const allModulesCorrectCount = modules.every(m => moduleCounts[m] === 100);
const noDuplicates = duplicates.length === 0;

if (allModulesCorrectCount && noDuplicates) {
    console.log('\n   ✅ INTEGRITY: PASSED\n');
} else {
    console.log('\n   ❌ INTEGRITY: FAILED\n');
    process.exit(1);
}
