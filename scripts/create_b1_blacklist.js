const fs = require('fs');

// Load existing data
const a1a2Data = JSON.parse(fs.readFileSync('firestore_data/japanese_a1_a2_word_list.json', 'utf8'));
const b1m01 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m01.json', 'utf8'));
const b1m02 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m02.json', 'utf8'));
const b1m03 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m03.json', 'utf8'));

// Create comprehensive blacklist
const blacklist = new Set([
    ...a1a2Data.a1,
    ...a1a2Data.a2,
    ...b1m01.vocabularyItems.map(i => i.word),
    ...b1m02.vocabularyItems.map(i => i.word),
    ...b1m03.vocabularyItems.map(i => i.word)
]);

const output = {
    totalWords: blacklist.size,
    words: Array.from(blacklist).sort()
};

fs.writeFileSync('firestore_data/japanese_b1_blacklist_2065.json', JSON.stringify(output, null, 2));
console.log(`✅ Blacklist created: ${blacklist.size} words`);

