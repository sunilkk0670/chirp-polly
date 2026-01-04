const fs = require('fs');
const path = require('path');

console.log('Fixing final duplicate "luggage"...\n');

const m10Path = path.join(__dirname, '../firestore_data/en_a1_m10.json');
const m10Data = JSON.parse(fs.readFileSync(m10Path, 'utf8'));

m10Data.vocabularyItems[69] = { word: "belongings", phonetic: "/bɪˈlɔːŋɪŋz/", english: "Pack your belongings for the trip." };
console.log('✅ Replaced "luggage" with "belongings"');

fs.writeFileSync(m10Path, JSON.stringify(m10Data, null, 4));
