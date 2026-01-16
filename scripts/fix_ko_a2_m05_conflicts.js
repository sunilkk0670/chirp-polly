const fs = require('fs');

const filePath = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m05.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const words = data.lessons[0].vocabularyItems;

// Replacement map for 29 A1 conflicts
const replacements = {
    '머리': { word: '정수리', reading: 'Jeongsuri', meaning: 'Crown of the head', example_sentence: '정수리에 햇볕이 직접 닿아요. (The sunlight hits the crown of my head directly.)' },
    '어깨': { word: '날개뼈', reading: 'Nalgaeppyeo', meaning: 'Shoulder blade', example_sentence: '날개뼈 부근이 뻐근해요. (The area near the shoulder blade is stiff.)' },
    '무릎': { word: '무릎관절', reading: 'Mureupgwanjeol', meaning: 'Knee joint', example_sentence: '무릎관절을 보호해야 해요. (You need to protect your knee joints.)' },
    '발': { word: '발뒤꿈치', reading: 'Baldwikkumchi', meaning: 'Heel', example_sentence: '신발 때문에 발뒤꿈치가 아파요. (My heel hurts because of the shoes.)' },
    '약국': { word: '약방', reading: 'Yakbang', meaning: 'Traditional pharmacy / Medicine shop', example_sentence: '오래된 약방에서 약을 샀어요. (I bought medicine at an old traditional pharmacy.)' },
    '아프다': { word: '통증', reading: 'Tongjeung', meaning: 'Pain / Ache', example_sentence: '허리에 심한 통증이 있어요. (I have severe pain in my back.)' },
    '감기': { word: '독감', reading: 'Dokgam', meaning: 'Flu / Influenza', example_sentence: '독감 예방 주사를 맞으세요. (Please get a flu shot.)' },
    '두통': { word: '지끈거리다', reading: 'Jigeungeoerida', meaning: 'To be throbbing (headache)', example_sentence: '머리가 지끈거려서 누워 있어요. (I\'m lying down because my head is throbbing.)' },
    '복통': { word: '속쓰림', reading: 'Sok sseurim', meaning: 'Heartburn / Sour stomach', example_sentence: '매운 음식을 먹고 속쓰림이 생겼어요. (I got heartburn after eating spicy food.)' },
    '치통': { word: '잇몸', reading: 'Inmom', meaning: 'Gums', example_sentence: '잇몸이 부어서 치과에 가요. (I\'m going to the dentist because my gums are swollen.)' },
    '알레르기': { word: '과민반응', reading: 'Gwaminbaneung', meaning: 'Hypersensitivity / Overreaction', example_sentence: '피부 과민반응이 일어났어요. (A skin hypersensitivity reaction occurred.)' },
    '피': { word: '혈액', reading: 'Hyeoraek', meaning: 'Blood (formal/anatomical)', example_sentence: '혈액 순환이 잘 안 돼요. (Blood circulation is not good.)' },
    '붕대': { word: '압박붕대', reading: 'Appakbungdae', meaning: 'Elastic bandage / Compression bandage', example_sentence: '발목에 압박붕대를 감았어요. (I wrapped an elastic bandage on my ankle.)' },
    '반창고': { word: '습윤밴드', reading: 'Seubyunbaendeu', meaning: 'Hydrocolloid bandage', example_sentence: '상처에 습윤밴드를 붙였어요. (I put a hydrocolloid bandage on the wound.)' },
    '주사': { word: '예방주사', reading: 'Yebangjusa', meaning: 'Vaccination shot / Inoculation', example_sentence: '오늘 예방주사를 맞으러 가요. (I\'m going to get a vaccination shot today.)' },
    '수술': { word: '시술', reading: 'Sisul', meaning: 'Procedure / Minor surgery', example_sentence: '간단한 레이저 시술을 받았어요. (I had a simple laser procedure.)' },
    '진료': { word: '검진', reading: 'Geomjin', meaning: 'Medical examination / Checkup', example_sentence: '정기 검진을 받는 것이 좋아요. (It\'s good to have regular checkups.)' },
    '약': { word: '의약품', reading: 'Uiyakpum', meaning: 'Pharmaceuticals / Medicine', example_sentence: '의약품을 안전하게 보관하세요. (Store pharmaceuticals safely.)' },
    '연고': { word: '크림', reading: 'Keurim', meaning: 'Cream / Ointment', example_sentence: '피부에 보습 크림을 발랐어요. (I applied moisturizing cream to my skin.)' },
    '진통제': { word: '진정제', reading: 'Jinjeongje', meaning: 'Sedative / Calming agent', example_sentence: '진정제를 먹고 안정을 취하세요. (Take a sedative and rest.)' },
    '비타민': { word: '멀티비타민', reading: 'Meoltibitamin', meaning: 'Multivitamin', example_sentence: '멀티비타민을 챙겨 먹어요. (I make sure to take multivitamins.)' },
    '영양제': { word: '보충제', reading: 'Bochungje', meaning: 'Supplement', example_sentence: '단백질 보충제를 마셔요. (I drink protein supplements.)' },
    '건강검진': { word: '종합검진', reading: 'Jonghapgeomjin', meaning: 'Comprehensive checkup', example_sentence: '내일 종합검진 예약이 있어요. (I have a comprehensive checkup appointment tomorrow.)' },
    '혈압': { word: '혈압계', reading: 'Hyeorapgye', meaning: 'Blood pressure monitor', example_sentence: '혈압계로 혈압을 쟀어요. (I measured my blood pressure with a monitor.)' },
    '응급실': { word: '권역응급센터', reading: 'Gwonyeokeunggeub sjeonteo', meaning: 'Regional emergency center', example_sentence: '권역응급센터로 이송되었어요. (Patient was moved to the regional emergency center.)' },
    '구급차': { word: '구급대원', reading: 'Gugeupdaeweon', meaning: 'Paramedic / First responder', example_sentence: '구급대원이 응급처치를 했어요. (The paramedic gave first aid.)' },
    '마스크': { word: '방역마스크', reading: 'Bangyeogmaseukeu', meaning: 'Quarantine mask', example_sentence: '방역마스크를 착용해 주세요. (Please wear a quarantine mask.)' },
    '건강': { word: '컨디션', reading: 'Keondisyeon', meaning: 'Physical condition', example_sentence: '오늘 컨디션이 아주 좋아요. (My physical condition is very good today.)' },
    '운동': { word: '체육', reading: 'Cheyuk', meaning: 'Physical education / Athletics', example_sentence: '체육관에서 농구를 했어요. (I played basketball in the gym.)' }
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

// Add 1 more word to reach 100
words.push({ word: '스트레칭', reading: 'Seuteureching', meaning: 'Stretching', example_sentence: '운동 전 스트레칭을 꼭 하세요. (Be sure to stretch before exercising.)' });

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log(`\n✅ Replaced ${replacedCount} conflicting words`);
console.log(`✅ Added 1 new word`);
console.log(`Total words in module: ${words.length}`);
