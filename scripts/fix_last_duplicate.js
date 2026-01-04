const fs = require('fs');
const path = require('path');

const m01Path = path.join(__dirname, '../firestore_data/en_a2_m01.json');
const m01 = JSON.parse(fs.readFileSync(m01Path, 'utf8'));

// Find and remove the last duplicate
const wordCounts = {};
m01.vocabularyItems.forEach((item, idx) => {
    const word = item.word.toLowerCase();
    if (!wordCounts[word]) {
        wordCounts[word] = [];
    }
    wordCounts[word].push(idx);
});

// Find duplicate
for (const [word, indices] of Object.entries(wordCounts)) {
    if (indices.length > 1) {
        console.log(`Duplicate found: "${word}" at indices ${indices.join(', ')}`);
        // Remove the last occurrence
        m01.vocabularyItems.splice(indices[indices.length - 1], 1);
        console.log(`Removed duplicate at index ${indices[indices.length - 1]}`);
    }
}

// Add replacement word
m01.vocabularyItems.push({
    word: 'slung',
    phonetic: '/slʌŋ/',
    english: 'He slung his heavy backpack over his shoulder this morning.'
});

console.log(`\n✅ M01 now has ${m01.vocabularyItems.length} words`);

fs.writeFileSync(m01Path, JSON.stringify(m01, null, 2));
