const fs = require('fs');
const path = require('path');

const filePath = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m03.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const words = data.lessons[0].vocabularyItems;

// Replacement map for 19 A1 conflicts
const replacements = {
    '할인': { word: '감면', reading: 'Gammyeon', meaning: 'Reduction / Exemption', example_sentence: '학생은 요금 감면을 받아요. (Students receive a fare reduction.)' },
    '노인': { word: '어르신', reading: 'Eoreusin', meaning: 'Elderly person (respectful)', example_sentence: '어르신께 자리를 드렸어요. (I gave my seat to the elderly person.)' },
    '양보': { word: '배려석', reading: 'Baeryeoseok', meaning: 'Courtesy seat', example_sentence: '배려석에 앉지 마세요. (Please don\'t sit in courtesy seats.)' },
    '여권': { word: '신분증', reading: 'Sinbunjeung', meaning: 'ID card / Identification', example_sentence: '신분증을 지참하세요. (Please bring your ID.)' },
    '출입국': { word: '입국', reading: 'Ipguk', meaning: 'Entry / Immigration', example_sentence: '입국 심사대로 가세요. (Go to the immigration counter.)' },
    '예약': { word: '사전예매', reading: 'Sajeonyemae', meaning: 'Advance booking', example_sentence: '사전예매하면 저렴해요. (It\'s cheaper with advance booking.)' },
    '박물관': { word: '전시관', reading: 'Jeonsigwan', meaning: 'Exhibition hall', example_sentence: '전시관을 관람했어요. (I toured the exhibition hall.)' },
    '미술관': { word: '갤러리', reading: 'Gaelleori', meaning: 'Gallery', example_sentence: '현대 갤러리에 갔어요. (I went to a modern gallery.)' },
    '일정': { word: '여정', reading: 'Yeojeong', meaning: 'Journey / Itinerary', example_sentence: '여정을 계획했어요. (I planned the journey.)' },
    '지도': { word: '안내도', reading: 'Annaedo', meaning: 'Guide map', example_sentence: '안내도를 받았어요. (I received a guide map.)' },
    '내비게이션': { word: 'GPS', reading: 'GPS', meaning: 'GPS navigation', example_sentence: 'GPS를 사용했어요. (I used GPS.)' },
    '방향': { word: '진행방향', reading: 'Jinhaengbanghyang', meaning: 'Direction of travel', example_sentence: '진행방향을 확인하세요. (Check the direction of travel.)' },
    '왼쪽': { word: '좌측', reading: 'Jwacheuk', meaning: 'Left side (formal)', example_sentence: '좌측으로 도세요. (Turn to the left.)' },
    '오른쪽': { word: '우측', reading: 'Ucheuk', meaning: 'Right side (formal)', example_sentence: '우측 차선으로 가세요. (Go to the right lane.)' },
    '직진': { word: '전방', reading: 'Jeonbang', meaning: 'Forward / Ahead', example_sentence: '전방 주시하세요. (Watch ahead.)' },
    '신호등': { word: '교통신호', reading: 'Gyotongsinho', meaning: 'Traffic signal', example_sentence: '교통신호를 지키세요. (Obey traffic signals.)' },
    '횡단보도': { word: '건널목', reading: 'Geonnolmok', meaning: 'Crossing / Pedestrian crossing', example_sentence: '건널목에서 건너세요. (Cross at the crossing.)' },
    '육교': { word: '보행육교', reading: 'Bohaengyukgyo', meaning: 'Pedestrian bridge', example_sentence: '보행육교를 이용하세요. (Use the pedestrian bridge.)' },
    '지하도': { word: '지하통로', reading: 'Jihatongno', meaning: 'Underground passage', example_sentence: '지하통로로 가세요. (Go through the underground passage.)' }
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
    { word: '통행료', reading: 'Tonghaengnyo', meaning: 'Toll fee', example_sentence: '고속도로 통행료를 냈어요. (I paid the highway toll.)' },
    { word: '휴게소', reading: 'Hyugeso', meaning: 'Rest area / Service area', example_sentence: '휴게소에서 쉬었어요. (I rested at the rest area.)' },
    { word: '안전벨트', reading: 'Anjeonbelteu', meaning: 'Seatbelt / Safety belt', example_sentence: '안전벨트를 매세요. (Fasten your seatbelt.)' }
];

words.push(...additionalWords);

// Save the updated file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log(`\n✅ Replaced ${replacedCount} conflicting words`);
console.log(`✅ Added ${additionalWords.length} new words`);
console.log(`Total words in module: ${words.length}`);
