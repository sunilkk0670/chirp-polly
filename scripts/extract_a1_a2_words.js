const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../firestore_data');

const A1_FILES = [
    'ja_a1_m1.json', 'ja_a1_m2.json', 'ja_a1_m3.json', 'ja_a1_m4.json', 'ja_a1_m5.json',
    'ja_a1_m6.json', 'ja_a1_m7.json', 'ja_a1_m8.json', 'ja_a1_m9.json', 'ja_a1_m10.json'
];

const A2_FILES = [
    'ja_a2_m11.json', 'ja_a2_m12.json', 'ja_a2_m13.json', 'ja_a2_m14.json', 'ja_a2_m15.json',
    'ja_a2_m16.json', 'ja_a2_m17.json', 'ja_a2_m18.json', 'ja_a2_m19.json', 'ja_a2_m20.json'
];

function extractWords(files) {
    const words = new Set();

    files.forEach(file => {
        const filePath = path.join(DATA_DIR, file);
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${file}`);
            return;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const items = data.vocabularyItems || [];

        items.forEach(item => {
            words.add(item.word);
        });
    });

    return Array.from(words).sort();
}

console.log('Extracting all A1 and A2 words...\n');

const a1Words = extractWords(A1_FILES);
const a2Words = extractWords(A2_FILES);
const combinedWords = [...new Set([...a1Words, ...a2Words])].sort();

console.log(`A1 Words: ${a1Words.length}`);
console.log(`A2 Words: ${a2Words.length}`);
console.log(`Combined Unique: ${combinedWords.length}`);
console.log(`\nNote: If combined < (A1 + A2), there are duplicates between levels\n`);

// Save to file for reference
const output = {
    a1: a1Words,
    a2: a2Words,
    combined: combinedWords,
    stats: {
        a1Count: a1Words.length,
        a2Count: a2Words.length,
        combinedCount: combinedWords.length,
        crossLevelDuplicates: (a1Words.length + a2Words.length) - combinedWords.length
    }
};

const outputPath = path.join(DATA_DIR, 'japanese_a1_a2_word_list.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
console.log(`Word list saved to: ${outputPath}`);
