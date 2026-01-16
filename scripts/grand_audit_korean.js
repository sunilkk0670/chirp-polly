import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../firestore_data');

console.log('--- 🏆 KOREAN GRAND CURRICULUM AUDIT (3,000 WORDS) ---');

// Load A1
const a1Data = JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_a1_full.json'), 'utf8'));
const a1Words = [];
a1Data.modules.forEach(m => m.vocabularyItems.forEach(i => i.word && a1Words.push(i.word)));

// Load A2
const a2Data = JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_a2_full.json'), 'utf8'));
const a2Words = [];
a2Data.modules.forEach(m => m.vocabularyItems.forEach(i => i.word && a2Words.push(i.word)));

// Load B1
const b1Words = [];
for (let i = 1; i <= 10; i++) {
    const file = `korean_b1_m${String(i).padStart(2, '0')}.json`;
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    data.lessons.forEach(l => b1Words.push(l.targetText || l.word));
}

const allWords = [...a1Words, ...a2Words, ...b1Words];
const uniqueWords = new Set(allWords);

console.log(`📊 Total Words Loaded: ${allWords.length}`);
console.log(`🎯 Unique Words Count: ${uniqueWords.size}`);

if (allWords.length === uniqueWords.size) {
    console.log('✅ ALL WORDS ARE UNIQUE! 100% Corpus Integrity.');
} else {
    console.log(`❌ DUPLICATES DETECTED: ${allWords.length - uniqueWords.size}`);
    const counts = {};
    allWords.forEach(w => counts[w] = (counts[w] || 0) + 1);
    const dups = Object.keys(counts).filter(w => counts[w] > 1);
    console.log('Duplicate Words:', dups);
}

// Level Breakdown
console.log('\n📈 Level Breakdown:');
console.log(`   - A1: ${a1Words.length} words`);
console.log(`   - A2: ${a2Words.length} words`);
console.log(`   - B1: ${b1Words.length} words`);

if (a1Words.length === 1000 && a2Words.length === 1000 && b1Words.length === 1000) {
    console.log('🏆 Target Reached: 1,000 words per level.');
} else {
    console.log('⚠️ Target Missing: Check level word counts.');
}
