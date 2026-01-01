const fs = require('fs');
const path = require('path');

// Load existing data
const a1a2Data = JSON.parse(fs.readFileSync('firestore_data/japanese_a1_a2_word_list.json', 'utf8'));
const b1Modules = ['ja_b1_m01.json', 'ja_b1_m02.json', 'ja_b1_m03.json', 'ja_b1_m04.json', 'ja_b1_m05.json', 'ja_b1_m06.json'];

// Create comprehensive blacklist
const blacklist = new Set([
    ...a1a2Data.a1,
    ...a1a2Data.a2
]);

// Add all B1-M01 through M06 words
b1Modules.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join('firestore_data', file), 'utf8'));
    data.vocabularyItems.forEach(item => blacklist.add(item.word));
});

const output = {
    totalWords: blacklist.size,
    words: Array.from(blacklist).sort()
};

fs.writeFileSync('firestore_data/japanese_b1_m07_blacklist.json', JSON.stringify(output, null, 2));
console.log(`✅ Blacklist created: ${blacklist.size} words (A1+A2+B1-M01-06)`);
