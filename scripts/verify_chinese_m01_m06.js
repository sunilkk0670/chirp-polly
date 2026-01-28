const fs = require('fs');
const path = require('path');

// Load all modules
const modules = [
    JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m01.json'), 'utf8')),
    JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m02.json'), 'utf8')),
    JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m03.json'), 'utf8')),
    JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m04.json'), 'utf8')),
    JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m05.json'), 'utf8')),
    JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m06.json'), 'utf8'))
];

// Extract all words from each module
const moduleWords = modules.map((module, idx) => {
    const words = [];
    module.lessons.forEach(lesson => {
        lesson.vocabulary.forEach(item => {
            const word = item.word.replace(/^Liar Game: /, '');
            words.push(word);
        });
    });
    return { id: `M0${idx + 1}`, words, count: words.length };
});

console.log('\n📊 Word Counts per Module:');
moduleWords.forEach(m => {
    console.log(`   ${m.id}: ${m.count} words`);
});

const totalWords = moduleWords.reduce((sum, m) => sum + m.count, 0);
console.log(`   Total: ${totalWords} words\n`);

// Check for duplicates across all modules
const allWords = [];
moduleWords.forEach(m => allWords.push(...m.words));
const uniqueWords = new Set(allWords);

console.log(`✅ Unique words: ${uniqueWords.size}`);
console.log(`❌ Duplicate count: ${allWords.length - uniqueWords.size}\n`);

if (allWords.length !== uniqueWords.size) {
    console.log('🔍 Finding duplicates...\n');
    const wordCounts = {};
    allWords.forEach(word => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    const duplicates = Object.entries(wordCounts)
        .filter(([word, count]) => count > 1)
        .sort((a, b) => b[1] - a[1]);

    duplicates.forEach(([word, count]) => {
        const foundIn = [];
        moduleWords.forEach(m => {
            if (m.words.includes(word)) foundIn.push(m.id);
        });
        console.log(`   ${word} (${count}x) - Found in: ${foundIn.join(', ')}`);
    });
} else {
    console.log('🎉 No duplicates found! All words are unique across all 6 modules.\n');
}
