const fs = require('fs');
const filePath = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m07.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const words = data.lessons[0].vocabularyItems;

// Replace word 61 (특기) with 솜씨
words[60] = { word: '솜씨', reading: 'Somssi', meaning: 'Skill / Dexterity / Workmanship', example_sentence: '요리 솜씨가 정말 대단해요. (Your cooking skills are truly amazing.)' };

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('✅ Replaced word 61 with 솜씨');
