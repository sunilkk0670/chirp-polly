const fs = require('fs');
const path = require('path');

// Load all modules
const m01 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m01.json'), 'utf8'));
const m02 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m02.json'), 'utf8'));
const m03 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m03.json'), 'utf8'));
const m04 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m04.json'), 'utf8'));

// Extract all words
function extractWords(module) {
    const words = [];
    module.lessons.forEach(lesson => {
        lesson.vocabulary.forEach(item => {
            const word = item.word.replace(/^Liar Game: /, '');
            words.push(word);
        });
    });
    return words;
}

const m01Words = extractWords(m01);
const m02Words = extractWords(m02);
const m03Words = extractWords(m03);
const m04Words = extractWords(m04);

console.log('\n📊 Word Counts:');
console.log(`   M01: ${m01Words.length} words`);
console.log(`   M02: ${m02Words.length} words`);
console.log(`   M03: ${m03Words.length} words`);
console.log(`   M04: ${m04Words.length} words`);
console.log(`   Total: ${m01Words.length + m02Words.length + m03Words.length + m04Words.length} words\n`);

// Check for duplicates
const allWords = [...m01Words, ...m02Words, ...m03Words, ...m04Words];
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
        const modules = [];
        if (m01Words.includes(word)) modules.push('M01');
        if (m02Words.includes(word)) modules.push('M02');
        if (m03Words.includes(word)) modules.push('M03');
        if (m04Words.includes(word)) modules.push('M04');
        console.log(`   ${word} (${count}x) - Found in: ${modules.join(', ')}`);
    });
} else {
    console.log('🎉 No duplicates found! All 400 words are unique.\n');
}
