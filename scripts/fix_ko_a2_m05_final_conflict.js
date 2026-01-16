const fs = require('fs');
const filePath = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m05.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const words = data.lessons[0].vocabularyItems;

// Replace word 100 (스트레칭) with 유산소운동
words[99] = { word: '유산소운동', reading: 'Yusanso-undong', meaning: 'Aerobic exercise', example_sentence: '유산소운동은 심장에 좋아요. (Aerobic exercise is good for the heart.)' };

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('✅ Replaced word 100 with 유산소운동');
