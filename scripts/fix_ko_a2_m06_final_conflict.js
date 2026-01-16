const fs = require('fs');
const filePath = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m06.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const words = data.lessons[0].vocabularyItems;

// Replace word 59 (배낭) with 등산가방
words[58] = { word: '등산가방', reading: 'Deungsangabang', meaning: 'Hiking bag / Trekking backpack', example_sentence: '산에 갈 때 등산가방을 챙겨요. (I pack a hiking bag when going to the mountains.)' };

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('✅ Replaced word 59 with 등산가방');
