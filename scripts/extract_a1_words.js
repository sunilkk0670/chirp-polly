const fs = require('fs');
const path = require('path');

console.log('Extracting all A1 words for overlap prevention...\n');

const a1Modules = [
    'en_a1_m01', 'en_a1_m02', 'en_a1_m03', 'en_a1_m04', 'en_a1_m05',
    'en_a1_m06', 'en_a1_m07', 'en_a1_m08', 'en_a1_m09', 'en_a1_m10'
];

const a1Words = new Set();

a1Modules.forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    data.vocabularyItems.forEach(item => {
        a1Words.add(item.word.toLowerCase());
    });
});

console.log(`✅ Extracted ${a1Words.size} unique A1 words\n`);
console.log('Saving A1 word list for reference...\n');

// Save to file for easy reference
const a1WordList = Array.from(a1Words).sort();
fs.writeFileSync(
    path.join(__dirname, '../firestore_data/a1_word_list.json'),
    JSON.stringify(a1WordList, null, 2)
);

console.log('✅ A1 word list saved to firestore_data/a1_word_list.json');
console.log(`\nSample A1 words: ${a1WordList.slice(0, 20).join(', ')}...`);
