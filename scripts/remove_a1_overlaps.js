const fs = require('fs');
const path = require('path');

// Load A1 words
const a1Words = new Set(JSON.parse(fs.readFileSync(
    path.join(__dirname, '../firestore_data/a1_word_list.json'),
    'utf8'
)));

console.log('Removing A1 overlaps from M05-M07...\n');

// Process each module
['en_a2_m05', 'en_a2_m06', 'en_a2_m07'].forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const before = data.vocabularyItems.length;
    data.vocabularyItems = data.vocabularyItems.filter(item => {
        const word = item.word.toLowerCase();
        if (a1Words.has(word)) {
            console.log(`  ${moduleId}: Removing "${item.word}" (A1 overlap)`);
            return false;
        }
        return true;
    });

    const removed = before - data.vocabularyItems.length;
    console.log(`  ${moduleId}: ${before} -> ${data.vocabularyItems.length} (removed ${removed})\n`);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('✅ A1 overlaps removed!');
