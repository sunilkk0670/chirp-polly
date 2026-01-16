const fs = require('fs');

// Fix Module 8
const m8Path = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m08.json';
const m8Data = JSON.parse(fs.readFileSync(m8Path, 'utf8'));
const m8Words = m8Data.lessons[0].vocabularyItems;
const m8Fixes = {
    '강풍': { word: '태풍경보', reading: 'Taepung-gyeongbo', meaning: 'Typhoon warning', example_sentence: '태풍경보가 발령되었으니 주의하세요. (Please be careful as a typhoon warning has been issued.)' },
    '환기': { word: '공기질', reading: 'Gonggijil', meaning: 'Air quality', example_sentence: '실내 공기질을 개선해야 해요. (Indoor air quality needs to be improved.)' },
    '일교차': { word: '기온변화', reading: 'Gion-byeonhwa', meaning: 'Temperature change', example_sentence: '급격한 기온 변화에 대비하세요. (Prepare for sudden temperature changes.)' },
    '불쾌지수': { word: '열지수', reading: 'Yeoljisu', meaning: 'Heat index', example_sentence: '여름철에는 열지수가 매우 높아요. (The heat index is very high in summer.)' },
    '여정': { word: '답사', reading: 'Dapsa', meaning: 'Field trip / Exploration', example_sentence: '유적지 답사를 다녀왔어요. (I went on a field trip to a historical site.)' },
    '환절기': { word: '계절변화', reading: 'Gyejeol-byeonhwa', meaning: 'Seasonal change', example_sentence: '계절 변화에 몸이 적응해요. (The body adapts to seasonal changes.)' },
    '소나기': { word: '진눈깨비', reading: 'Jinnunkkaebi', meaning: 'Sleet', example_sentence: '비와 눈이 섞인 진눈깨비가 내려요. (Sleet, a mix of rain and snow, is falling.)' },
    '함박눈': { word: '가루눈', reading: 'Garunun', meaning: 'Powder snow', example_sentence: '가루눈이 내려서 길이 미끄러워요. (Powder snow is falling, so the road is slippery.)' }
};
m8Words.forEach((item, index) => {
    if (m8Fixes[item.word]) m8Words[index] = m8Fixes[item.word];
});
fs.writeFileSync(m8Path, JSON.stringify(m8Data, null, 2));

// Fix Module 10
const m10Path = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m10.json';
const m10Data = JSON.parse(fs.readFileSync(m10Path, 'utf8'));
const m10Words = m10Data.lessons[0].vocabularyItems;
const m10Fixes = {
    '식단': { word: '전통차', reading: 'Jeontongcha', meaning: 'Traditional tea', example_sentence: '인사동에서 전통차를 마셨어요. (I drank traditional tea in Insadong.)' },
    '미술관': { word: '예술전당', reading: 'Yesul-jeondang', meaning: 'Arts center / Hall of arts', example_sentence: '예술전당에서 공연을 관람해요. (Watch a performance at the Arts Center.)' }
};
m10Words.forEach((item, index) => {
    if (m10Fixes[item.word]) m10Words[index] = m10Fixes[item.word];
});
fs.writeFileSync(m10Path, JSON.stringify(m10Data, null, 2));

console.log('✅ Final fixes applied to Modules 8 and 10');
