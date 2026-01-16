const fs = require('fs');

const filePath = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m04.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const words = data.lessons[0].vocabularyItems;

// Replacement map for 14 A1 conflicts
const replacements = {
    '층': { word: '층수', reading: 'Cheungsu', meaning: 'Number of floors', example_sentence: '이 건물은 층수가 20층이에요. (This building has 20 floors.)' },
    '엘리베이터': { word: '승강기', reading: 'Seungganggi', meaning: 'Elevator (formal)', example_sentence: '승강기를 이용하세요. (Please use the elevator.)' },
    '계단': { word: '계단실', reading: 'Gyedansil', meaning: 'Stairwell', example_sentence: '계단실로 대피하세요. (Evacuate via the stairwell.)' },
    '화장실': { word: '욕조', reading: 'Yokjo', meaning: 'Bathtub', example_sentence: '욕조에서 목욕했어요. (I bathed in the bathtub.)' },
    '식탁': { word: '식탁보', reading: 'Siktakbo', meaning: 'Tablecloth', example_sentence: '식탁보를 깔았어요. (I laid out the tablecloth.)' },
    '보일러': { word: '난방기', reading: 'Nanbanggi', meaning: 'Heater', example_sentence: '난방기를 틀었어요. (I turned on the heater.)' },
    '수도': { word: '수도관', reading: 'Sudogwan', meaning: 'Water pipe', example_sentence: '수도관이 얼었어요. (The water pipe froze.)' },
    '이웃': { word: '이웃집', reading: 'Iutjip', meaning: 'Neighbor\'s house', example_sentence: '이웃집에서 소음이 나요. (Noise is coming from the neighbor\'s house.)' },
    '주차장': { word: '주차공간', reading: 'Juchagonggan', meaning: 'Parking space', example_sentence: '주차공간이 부족해요. (Parking space is insufficient.)' },
    '편의점': { word: '슈퍼', reading: 'Syupeo', meaning: 'Supermarket / Corner store', example_sentence: '슈퍼에서 우유를 샀어요. (I bought milk at the supermarket.)' },
    '마트': { word: '대형마트', reading: 'Daehyeongmateu', meaning: 'Large supermarket / Hypermarket', example_sentence: '대형마트에서 장을 봐요. (I shop at the hypermarket.)' },
    '학교': { word: '초등학교', reading: 'Chodeunghakgyo', meaning: 'Elementary school', example_sentence: '초등학교가 가까워요. (The elementary school is close.)' },
    '병원': { word: '종합병원', reading: 'Jonghapbyeongwon', meaning: 'General hospital', example_sentence: '종합병원에 갔어요. (I went to the general hospital.)' },
    '지하철역': { word: '역세권', reading: 'Yeoksegwon', meaning: 'Area near subway station', example_sentence: '역세권이라서 교통이 편리해요. (It\'s convenient because it\'s near the station.)' }
};

// Replace conflicting words
let replacedCount = 0;
words.forEach((item, index) => {
    if (replacements[item.word]) {
        console.log(`Replacing word ${index + 1}: ${item.word} -> ${replacements[item.word].word}`);
        words[index] = replacements[item.word];
        replacedCount++;
    }
});

// Add 3 more words to reach 100
const additionalWords = [
    { word: '평수', reading: 'Pyeongsu', meaning: 'Square footage (in pyeong)', example_sentence: '평수가 30평이에요. (The square footage is 30 pyeong.)' },
    { word: '방범', reading: 'Bangbeom', meaning: 'Crime prevention', example_sentence: '방범 시스템이 있어요. (There\'s a crime prevention system.)' },
    { word: '공동현관', reading: 'Gongdonghyeongwan', meaning: 'Common entrance', example_sentence: '공동현관에 비밀번호가 있어요. (The common entrance has a password.)' }
];

words.push(...additionalWords);

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log(`\n✅ Replaced ${replacedCount} conflicting words`);
console.log(`✅ Added ${additionalWords.length} new words`);
console.log(`Total words in module: ${words.length}`);
