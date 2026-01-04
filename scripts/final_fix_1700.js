const fs = require('fs');
const path = require('path');

console.log('Final fix...\n');

// M06: Remove duplicate "timetable" and add 2 unique words
const m06Path = path.join(__dirname, '../firestore_data/en_a2_m06.json');
const m06 = JSON.parse(fs.readFileSync(m06Path, 'utf8'));
m06.vocabularyItems = m06.vocabularyItems.filter(item => item.word !== 'timetable');
m06.vocabularyItems.push(
    { word: "emigrant", phonetic: "/ˈemɪɡrənt/", english: "Emigrants leave their home country to live elsewhere permanently." },
    { word: "immigrant", phonetic: "/ˈɪmɪɡrənt/", english: "Immigrants bring diverse cultures to their new countries always." }
);
fs.writeFileSync(m06Path, JSON.stringify(m06, null, 2));
console.log(`✅ M06: ${m06.vocabularyItems.length} words`);

// M07: Add 2 words
const m07Path = path.join(__dirname, '../firestore_data/en_a2_m07.json');
const m07 = JSON.parse(fs.readFileSync(m07Path, 'utf8'));
m07.vocabularyItems.push(
    { word: "reconciliation", phonetic: "/ˌrekənsɪliˈeɪʃən/", english: "The reconciliation between the two countries took many years." },
    { word: "resolution", phonetic: "/ˌrezəˈluːʃən/", english: "We need to find a peaceful resolution to conflict." }
);
fs.writeFileSync(m07Path, JSON.stringify(m07, null, 2));
console.log(`✅ M07: ${m07.vocabularyItems.length} words`);

console.log('\n✅ All modules complete!');
