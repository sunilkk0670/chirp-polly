import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load A1 modules (1000 words)
const a1Words = new Map();
for (let i = 1; i <= 10; i++) {
    const file = `de_a1_m${String(i).padStart(2, '0')}.json`;
    const data = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', file), 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        const w = item.word.toLowerCase().trim();
        if (!a1Words.has(w)) a1Words.set(w, file);
    });
}

// Load previous A2 modules (M01-M04)
const a2PreCorpus = new Map();
for (let i = 1; i <= 4; i++) {
    const file = `de_a2_m${String(i).padStart(2, '0')}.json`;
    const data = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', file), 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        const w = item.word.toLowerCase().trim();
        if (!a2PreCorpus.has(w)) a2PreCorpus.set(w, file);
    });
}

// Load current M05
const m05Data = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', 'de_a2_m05.json'), 'utf8'));
const m05Items = m05Data.lessons[0].vocabularyItems;

// Intentional Review/Liar Game Traps (allowed to overlap)
const allowedTraps = new Set([
    'die medien', 'das ereignis', 'die nachricht', 'der erfolg', 'berühmt',
    'das konzert', 'singen', 'malen', 'das museum', 'die werbung',
    'abonnieren', 'die kündigung', 'streamen', 'die cloud', 'das update',
    'das programm', 'installieren', 'löschen', 'chatten', 'body',
    'der beamer', 'das display', 'mobbing', 'smoking'
]);

const overlaps = [];
m05Items.forEach(item => {
    const w = item.word.toLowerCase().trim();
    if (allowedTraps.has(w)) return; // Skip intentional traps

    if (a1Words.has(w)) {
        overlaps.push(`${item.word} (Overlap with A1: ${a1Words.get(w)})`);
    } else if (a2PreCorpus.has(w)) {
        overlaps.push(`${item.word} (Overlap with A2: ${a2PreCorpus.get(w)})`);
    }
});

console.log(`\n🔍 AUDIT RESULTS FOR German A2 M05:`);
console.log(`   Word Count: ${m05Items.length}`);
if (overlaps.length === 0) {
    console.log(`   ✅ ZERO GENUINE OVERLAPS DETECTED!`);
} else {
    console.log(`   ❌ FOUND ${overlaps.length} GENUINE OVERLAPS:`);
    overlaps.forEach(o => console.log(`      - ${o}`));
}
console.log();
