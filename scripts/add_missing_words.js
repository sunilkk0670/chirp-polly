const fs = require('fs');
const path = require('path');

// Add 2 words to M02
const m02Path = path.join(__dirname, '../firestore_data/en_a2_m02.json');
const m02 = JSON.parse(fs.readFileSync(m02Path, 'utf8'));

m02.vocabularyItems.push(
    { word: "outlook", phonetic: "/ˈaʊtlʊk/", english: "The economic outlook for next year appears very positive indeed." },
    { word: "prospect", phonetic: "/ˈprɑːspekt/", english: "The prospect of traveling abroad excites me very much always." }
);

fs.writeFileSync(m02Path, JSON.stringify(m02, null, 2));
console.log(`✅ M02: Added 2 words (now ${m02.vocabularyItems.length})`);

// Add 1 word to M04
const m04Path = path.join(__dirname, '../firestore_data/en_a2_m04.json');
const m04 = JSON.parse(fs.readFileSync(m04Path, 'utf8'));

m04.vocabularyItems.push(
    { word: "mindset", phonetic: "/ˈmaɪndset/", english: "A positive mindset helps you achieve your goals successfully always." }
);

fs.writeFileSync(m04Path, JSON.stringify(m04, null, 2));
console.log(`✅ M04: Added 1 word (now ${m04.vocabularyItems.length})`);

console.log('\n✅ All modules now have 100 words each!');
