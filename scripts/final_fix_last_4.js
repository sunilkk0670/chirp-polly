const fs = require('fs');
const path = require('path');

console.log('Fixing final 4 duplicates...\n');

// Module 9: Replace "leisure" and "relax"
const m9Path = path.join(__dirname, '../firestore_data/en_a1_m09.json');
const m9Data = JSON.parse(fs.readFileSync(m9Path, 'utf8'));

m9Data.vocabularyItems[99] = { word: "unwind", phonetic: "/ʌnˈwaɪnd/", english: "I unwind by listening to music." };
m9Data.vocabularyItems[98] = { word: "pastime", phonetic: "/ˈpæstaɪm/", english: "Reading is my favorite pastime." };
console.log('  M9: Replaced "leisure" and "relax"');

fs.writeFileSync(m9Path, JSON.stringify(m9Data, null, 4));

// Module 10: Replace "bag" and "assist"
const m10Path = path.join(__dirname, '../firestore_data/en_a1_m10.json');
const m10Data = JSON.parse(fs.readFileSync(m10Path, 'utf8'));

m10Data.vocabularyItems[85] = { word: "aid", phonetic: "/eɪd/", english: "Can you aid me with this task?" };
m10Data.vocabularyItems[69] = { word: "luggage", phonetic: "/ˈlʌɡɪdʒ/", english: "Pack your luggage for the trip." };
console.log('  M10: Replaced "assist" and "bag"');

fs.writeFileSync(m10Path, JSON.stringify(m10Data, null, 4));

console.log('\n✅ All duplicates fixed!');
