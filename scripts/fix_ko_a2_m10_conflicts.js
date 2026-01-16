const fs = require('fs');

const m10Path = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m10.json';
const m10Data = JSON.parse(fs.readFileSync(m10Path, 'utf8'));
const m10Words = m10Data.lessons[0].vocabularyItems;

const m10Replacements = {
    '명절': { word: '대명절', reading: 'Daemyeongjeol', meaning: 'Great holiday / Major festive day', example_sentence: '설날은 민족의 대명절이에요. (Seollal is the nation\'s great holiday.)' },
    '예절': { word: '식사예절', reading: 'Siksa-yejeol', meaning: 'Table manners', example_sentence: '식사 예절을 지키는 것은 중요해요. (Keeping table manners is important.)' },
    '존댓말': { word: '극존칭', reading: 'Geukjonching', meaning: 'Superlative honorific / Highest form', example_sentence: '왕에게는 극존칭을 써요. (Highest honorifics are used for royalty.)' },
    '반말': { word: '평어', reading: 'Pyeong-eo', meaning: 'Standard/neutral speech (between equals)', example_sentence: '친구 사이에는 평어를 써요. (Use standard speech between friends.)' },
    '인사': { word: '상견례', reading: 'Sanggyeollye', meaning: 'Formal meeting (especially between families)', example_sentence: '내일 양가 상견례를 해요. (Doing a formal family meeting tomorrow.)' },
    '선물': { word: '기념품', reading: 'Ginyeompum', meaning: 'Souvenir', example_sentence: '여행지에서 기념품을 샀어요. (Bought a souvenir at the travel destination.)' },
    '방문': { word: '내방', reading: 'Naebang', meaning: 'Visit (formal)', example_sentence: '외빈의 내방을 환영합니다. (Welcome the visit of foreign guests.)' },
    '음식': { word: '식단', reading: 'Sikdan', meaning: 'Menu / Diet', example_sentence: '건강 식단을 유지해요. (Maintain a healthy diet.)' },
    '불고기': { word: '떡갈비', reading: 'Tteokgalbi', meaning: 'Grilled short rib patties', example_sentence: '담양의 떡갈비가 유명해요. (Damyang\'s tteokgalbi is famous.)' },
    '비빔밥': { word: '돌솥비빔밥', reading: 'Dolsot-bibimbap', meaning: 'Dolsot bibimbap (in a stone pot)', example_sentence: '돌솥비빔밥은 마지막까지 따뜻해요. (Dolsot bibimbap stays warm until the end.)' },
    '김치': { word: '동치미', reading: 'Dongchimi', meaning: 'Water kimchi', example_sentence: '겨울에 시원한 동치미를 먹어요. (Eat cool water kimchi in winter.)' },
    '고추장': { word: '초고추장', reading: 'Chogochujang', meaning: 'Red chili paste with vinegar', example_sentence: '회는 초고추장에 찍어 먹어요. (Eat raw fish dipped in chogochujang.)' },
    '된장': { word: '청국장', reading: 'Cheong-gukjang', meaning: 'Fast-fermented bean paste', example_sentence: '청국장 냄새가 구수해요. (The smell of cheonggukjang is savory.)' },
    '간장': { word: '양조간장', reading: 'Yangjo-ganjang', meaning: 'Brewed soy sauce', example_sentence: '양조간장으로 맛을 냈어요. (Flavored with brewed soy sauce.)' },
    '도자기': { word: '청자', reading: 'Cheongja', meaning: 'Celadon / Blue-green porcelain', example_sentence: '고려 청자의 빛깔이 고와요. (The color of Goryeo celadon is beautiful.)' },
    '온돌': { word: '구들장', reading: 'Gudeuljang', meaning: 'Floor stone (in Ondol)', example_sentence: '구들장이 달궈지면 방이 따뜻해요. (The room gets warm when the floor stones heat up.)' },
    '부채': { word: '합죽선', reading: 'Hapjukseon', meaning: 'Folding bamboo fan', example_sentence: '명인이 만든 합죽선이에요. (It\'s a folding bamboo fan made by a master.)' },
    '서예': { word: '휘호', reading: 'Hwiho', meaning: 'Calligraphy (action of writing brush)', example_sentence: '기념비에 휘호를 남겼어요. (Left calligraphy on the monument.)' },
    '치마': { word: '치맛바람', reading: 'Chimatbaram', meaning: 'Influence/zeal (idiom, lit. skirt wind)', example_sentence: '치맛바람이 거세졌어요. (The influence/zeal has become stronger.)' },
    '바지': { word: '몸빼바지', reading: 'Moppae-baji', meaning: 'Loose-fitting work pants', example_sentence: '시골에서 몸빼 바지를 입었어요. (Wore loose work pants in the countryside.)' },
    '박물관': { word: '미술관', reading: 'Misul-gwan', meaning: 'Art museum', example_sentence: '미술관 관람권을 샀어요. (Bought an art museum ticket.)' }
};

m10Words.forEach((item, index) => {
    if (m10Replacements[item.word]) {
        m10Words[index] = m10Replacements[item.word];
    }
});

fs.writeFileSync(m10Path, JSON.stringify(m10Data, null, 2));
console.log('✅ Resolved Module 10 conflicts');
