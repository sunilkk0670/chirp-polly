const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./firestore_data/sanskrit_a1_modules_fixed.json', 'utf8'));
const m1 = data.modules[0].vocabularyItems;

console.log('Words 80-100 of Module 1:');
console.log('');
for (let i = 79; i < 100; i++) {
    console.log(`${i + 1}: ${m1[i].word} - ${m1[i].meaning}`);
}
