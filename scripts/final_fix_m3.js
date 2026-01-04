const fs = require('fs');
const path = require('path');

console.log('Final fix for Module 3...\n');

const m3Path = path.join(__dirname, '../firestore_data/en_a1_m03.json');
const m3Data = JSON.parse(fs.readFileSync(m3Path, 'utf8'));

// Find all occurrences of "today"
const todayIndices = [];
m3Data.vocabularyItems.forEach((item, index) => {
    if (item.word.toLowerCase() === 'today') {
        todayIndices.push(index);
        console.log(`  Found "today" at index ${index}: "${item.english}"`);
    }
});

// Remove the second occurrence (keep the first)
if (todayIndices.length > 1) {
    console.log(`\n  Removing duplicate at index ${todayIndices[1]}`);
    m3Data.vocabularyItems.splice(todayIndices[1], 1);
}

fs.writeFileSync(m3Path, JSON.stringify(m3Data, null, 4));
console.log(`\n✅ Module 3 fixed: ${m3Data.vocabularyItems.length} words`);
