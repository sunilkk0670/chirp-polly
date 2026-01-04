const fs = require('fs');
const path = require('path');

console.log('Fixing final duplicate "now"...\n');

const m3Path = path.join(__dirname, '../firestore_data/en_a1_m03.json');
const m3Data = JSON.parse(fs.readFileSync(m3Path, 'utf8'));

// Replace "now" at index 27 with a different word
m3Data.vocabularyItems[27] = {
    word: "currently",
    phonetic: "/ˈkɜːrəntli/",
    english: "I am currently working on a project."
};

fs.writeFileSync(m3Path, JSON.stringify(m3Data, null, 4));
console.log('✅ Replaced "now" with "currently" at index 27\n');
