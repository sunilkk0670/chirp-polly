const fs = require('fs');
const data = JSON.parse(fs.readFileSync('firestore_data/ita_b1_m01.json', 'utf8'));

console.log('TECHNICAL PROOF: Words 1-20 (A2/B1 Bridge)');
const allWords = data.lessons.flatMap(l => l.vocabularyItems);
console.log('| # | Word | Phonetic | Translation |');
console.log('|---|---|---|---|');
allWords.slice(0, 20).forEach((w, i) => {
    console.log(`| ${i + 1} | ${w.word} | ${w.reading} | ${w.meaning} |`);
});

console.log('\nTECHNICAL PROOF: Words 85-100 (Final narrative & Liar Game)');
console.log('| # | Word | Phonetic | Translation |');
console.log('|---|---|---|---|');
allWords.slice(84, 100).forEach((w, i) => {
    console.log(`| ${i + 85} | ${w.word} | ${w.reading} | ${w.meaning} |`);
});
