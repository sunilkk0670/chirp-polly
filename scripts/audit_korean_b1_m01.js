import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n📊 KOREAN B1 MODULE 01 - PROOF GENERATION\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Load B1 Module 01
const b1m01 = JSON.parse(
    readFileSync(join(__dirname, '../firestore_data/korean_b1_m01.json'), 'utf8')
);

console.log(`✅ Module ID: ${b1m01.moduleId}`);
console.log(`✅ Theme: ${b1m01.theme}`);
console.log(`✅ Total Words: ${b1m01.lessons.length}\n`);

// PROOF TABLE 1: Words 1-20
console.log('📋 PROOF TABLE 1: WORDS 1-20');
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('| # | Korean | Romanization | English | Notes |');
console.log('|---|--------|--------------|---------|-------|');

for (let i = 0; i < 20; i++) {
    const word = b1m01.lessons[i];
    const num = (i + 1).toString().padStart(2, '0');
    const notes = word.notes.length > 35 ? word.notes.substring(0, 35) + '...' : word.notes;
    console.log(`| ${num} | ${word.targetText} | ${word.phoneticTranscription} | ${word.english} | ${notes} |`);
}

console.log('\n');

// PROOF TABLE 2: Words 85-100
console.log('📋 PROOF TABLE 2: WORDS 85-100');
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('| # | Korean | Romanization | English | Notes |');
console.log('|---|--------|--------------|---------|-------|');

for (let i = 84; i < 100; i++) {
    const word = b1m01.lessons[i];
    const num = (i + 1).toString().padStart(2, '0');
    const notes = word.notes.length > 35 ? word.notes.substring(0, 35) + '...' : word.notes;
    console.log(`| ${num} | ${word.targetText} | ${word.phoneticTranscription} | ${word.english} | ${notes} |`);
}

console.log('\n');

// LIAR GAME VERIFICATION
console.log('🎭 LIAR GAME DATA VERIFICATION');
console.log('═══════════════════════════════════════════════════════════════\n');
console.log(`Cultural Trap: ${b1m01.liarGameData.trap}\n`);
console.log(`Correct Version: ${b1m01.liarGameData.correctVersion}\n`);
console.log(`Explanation: ${b1m01.liarGameData.explanation}\n`);

// DUPLICATE CHECK WITHIN MODULE
console.log('🔍 INTERNAL DUPLICATE CHECK');
console.log('═══════════════════════════════════════════════════════════════\n');

const wordSet = new Set();
const duplicates = [];

b1m01.lessons.forEach((lesson, idx) => {
    if (wordSet.has(lesson.targetText)) {
        duplicates.push({ word: lesson.targetText, position: idx + 1 });
    } else {
        wordSet.add(lesson.targetText);
    }
});

if (duplicates.length > 0) {
    console.log(`⚠️  Found ${duplicates.length} internal duplicates:`);
    duplicates.forEach(d => {
        console.log(`   Position ${d.position}: ${d.word}`);
    });
} else {
    console.log(`✅ No internal duplicates found!`);
    console.log(`✅ All ${wordSet.size} words are unique within the module`);
}

console.log('\n');
console.log('═══════════════════════════════════════════════════════════════');
console.log('✅ PROOF GENERATION COMPLETE');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('📝 NOTE: Full duplicate audit against A1/A2 master set will be');
console.log('   performed after all 10 B1 modules are generated.\n');
