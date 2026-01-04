const fs = require('fs');
const path = require('path');

console.log('Fixing final duplicate "exchange"...\n');

const m6Path = path.join(__dirname, '../firestore_data/en_a1_m06.json');
const m6Data = JSON.parse(fs.readFileSync(m6Path, 'utf8'));

// Replace "exchange" at index 44 with a different word
m6Data.vocabularyItems[44] = {
    word: "swap",
    phonetic: "/swɑːp/",
    english: "Can I swap this for a different color?"
};

fs.writeFileSync(m6Path, JSON.stringify(m6Data, null, 4));
console.log('✅ Replaced "exchange" with "swap" at index 44\n');
