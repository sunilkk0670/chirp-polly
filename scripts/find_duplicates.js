const fs = require('fs');
const path = require('path');

const modules = ['en_a1_m01', 'en_a1_m02', 'en_a1_m03', 'en_a1_m04'];
const wordMap = new Map(); // word -> [{moduleId, index}]

modules.forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    data.vocabularyItems.forEach((item, index) => {
        const word = item.word.toLowerCase();
        if (!wordMap.has(word)) {
            wordMap.set(word, []);
        }
        wordMap.set(word, [...wordMap.get(word), { moduleId, index, original: item.word }]);
    });
});

console.log('DUPLICATE WORDS ACROSS MODULES:\n');
const duplicates = [];
wordMap.forEach((locations, word) => {
    if (locations.length > 1) {
        console.log(`"${word}" appears ${locations.length} times:`);
        locations.forEach(loc => {
            console.log(`  - ${loc.moduleId} at index ${loc.index}`);
        });
        duplicates.push({ word, locations });
        console.log();
    }
});

console.log(`\nTotal duplicates: ${duplicates.length}`);
