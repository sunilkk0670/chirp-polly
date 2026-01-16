const fs = require('fs');

const m8Path = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m08.json';
const m8Data = JSON.parse(fs.readFileSync(m8Path, 'utf8'));
const m8Words = m8Data.lessons[0].vocabularyItems;

const m8Replacements = {
    '재활용': { word: '자원순환', reading: 'Jawonsunhwan', meaning: 'Resource circulation', example_sentence: '자원순환 사회를 만들어야 해요. (We should create a resource-circulating society.)' },
    '미세먼지': { word: '대기오염물질', reading: 'Daegi-oyeom-muljil', meaning: 'Air pollutants', example_sentence: '대기오염물질 배출을 단속해요. (Crack down on the emission of air pollutants.)' },
    '태풍': { word: '강풍', reading: 'Gangpung', meaning: 'Strong wind / Gale', example_sentence: '강풍에 간판이 떨어졌어요. (The sign fell down due to the strong wind.)' },
    '폭염': { word: '열대야', reading: 'Yeoldaeya', meaning: 'Tropical night (over 25°C)', example_sentence: '열대야 때문에 잠을 설쳤어요. (I couldn\'t sleep well because of the tropical night.)' },
    '바다': { word: '해안선', reading: 'Haeanseon', meaning: 'Coastline', example_sentence: '해안선을 따라 드라이브를 해요. (Drive along the coastline.)' },
    '강': { word: '강변', reading: 'Gangbyeon', meaning: 'Riverside', example_sentence: '강변 공원에서 산책을 해요. (Take a walk at the riverside park.)' },
    '산': { word: '산맥', reading: 'Sanmaek', meaning: 'Mountain range', example_sentence: '히말라야 산맥은 아주 높아요. (The Himalayan mountain range is very high.)' },
    '공기': { word: '환기', reading: 'Hwangyi', meaning: 'Ventilation', example_sentence: '창문을 열어 환기를 시켜요. (Open the window to ventilate.)' },
    '하늘': { word: '지평선', reading: 'Jipyeongseon', meaning: 'Horizon (land)', example_sentence: '지평선 너머로 해가 져요. (The sun sets beyond the horizon.)' },
    '꽃': { word: '식물원', reading: 'Sikmul-won', meaning: 'Botanical garden', example_sentence: '식물원에서 희귀한 꽃을 봤어요. (I saw rare flowers at the botanical garden.)' },
    '풀': { word: '잡초', reading: 'Japcho', meaning: 'Weed', example_sentence: '정원에 잡초가 많이 자랐어요. (Many weeds have grown in the garden.)' },
    '바람': { word: '돌풍', reading: 'Dolpung', meaning: 'Sudden gust of wind', example_sentence: '갑작스러운 돌풍에 주의하세요. (Watch out for sudden gusts of wind.)' },
    '기온': { word: '일교차', reading: 'Ilgyocha', meaning: 'Daily temperature range', example_sentence: '환절기라 일교차가 커요. (The daily temperature range is large because it\'s the change of seasons.)' },
    '습도': { word: '불쾌지수', reading: 'Bulkoejisu', meaning: 'Discomfort index', example_sentence: '습도가 높아서 불쾌지수가 올라가요. (The discomfort index rises because the humidity is high.)' },
    '가스': { word: '도시가스', reading: 'Dosigaseu', meaning: 'City gas', example_sentence: '도시가스 점검을 나왔어요. (Came out for a city gas inspection.)' },
    '전기': { word: '절전', reading: 'Jeoljeon', meaning: 'Power saving', example_sentence: '절전 모드를 사용 중이에요. (Using power saving mode.)' },
    '수도': { word: '단수', reading: 'Dansu', meaning: 'Water suspension / Cut-off', example_sentence: '공사 때문에 내일 단수예요. (The water is cut off tomorrow due to construction.)' },
    '음식물쓰레기': { word: '음식물류', reading: 'Eumsikmulyu', meaning: 'Food waste types', example_sentence: '음식물류 폐기물을 분리하세요. (Separate food waste refuse.)' },
    '분리수거': { word: '배출', reading: 'Baechul', meaning: 'Discharge / Emission', example_sentence: '쓰레기 배출 요일을 지키세요. (Follow the trash discharge days.)' },
    '황사': { word: '흙먼지', reading: 'Heungmonji', meaning: 'Dust / Earth dust', example_sentence: '흙먼지가 날리지 않게 물을 뿌려요. (Spray water so that dust doesn\'t fly.)' },
    '장바구니': { word: '다회용', reading: 'Dahoeyong', meaning: 'Multi-use / Reusable', example_sentence: '다회용 컵을 사용해요. (Use a multi-use cup.)' },
    '등산': { word: '산행', reading: 'Sanhaeng', meaning: 'Hiking / Mountain climbing', example_sentence: '가을 산행을 준비해요. (Prepare for autumn hiking.)' },
    '낚시': { word: '낚시터', reading: 'Nakksiteo', meaning: 'Fishing spot', example_sentence: '유명한 낚시터에 사람이 많아요. (There are many people at the famous fishing spot.)' },
    '캠핑': { word: '야영', reading: 'Yayeong', meaning: 'Camping / Bivouac', example_sentence: '숲속에서 야영을 했어요. (Camped in the forest.)' },
    '여행': { word: '여정', reading: 'Yeojeong', meaning: 'Journey / Itinerary', example_sentence: '긴 여정을 마쳤어요. (Finished a long journey.)' },
    '계절': { word: '환절기', reading: 'Hwanjeolgi', meaning: 'Change of seasons', example_sentence: '환절기에는 감기를 조심해야 해요. (Be careful not to catch a cold during the change of seasons.)' },
    '봄': { word: '춘분', reading: 'Chunbun', meaning: 'Vernal equinox', example_sentence: '춘분이 지나면 낮이 길어져요. (The days get longer after the vernal equinox.)' },
    '여름': { word: '하지', reading: 'Haji', meaning: 'Summer solstice', example_sentence: '오늘은 해가 가장 긴 하지예요. (Today is the summer solstice, when the sun is longest.)' },
    '가을': { word: '추분', reading: 'Chubun', meaning: 'Autumnal equinox', example_sentence: '추분에는 낮과 밤의 길이가 같아요. (The length of day and night is equal on the autumnal equinox.)' },
    '겨울': { word: '동지', reading: 'Dongji', meaning: 'Winter solstice', example_sentence: '동지에는 팥죽을 먹어요. (We eat red bean porridge on the winter solstice.)' },
    '날씨': { word: '기상정보', reading: 'Gisang-jeongbo', meaning: 'Weather information', example_sentence: '기상정보를 매일 확인해요. (Check the weather information every day.)' },
    '비': { word: '소나기', reading: 'Sonagi', meaning: 'Sudden rain shower', example_sentence: '갑자기 소나기가 내려요. (It\'s suddenly raining in a shower.)' },
    '눈': { word: '함박눈', reading: 'Hambaknun', meaning: 'Large snowflakes / Heavy snow', example_sentence: '함박눈이 펑펑 내려요. (Heavy snow is falling in big flakes.)' },
    '안개': { word: '해무', reading: 'Haemu', meaning: 'Sea fog', example_sentence: '바다에 해무가 꼈어요. (Sea fog has set in on the ocean.)' },
    '번개': { word: '낙뢰', reading: 'Nangnoe', meaning: 'Thunderbolt / Lightning strike', example_sentence: '낙뢰가 칠 때는 나무 아래를 피하세요. (Avoid being under trees when lightning strikes.)' },
    '천둥': { word: '뇌성', reading: 'Noeseong', meaning: 'Thunder / Rumbling', example_sentence: '멀리서 뇌성 소리가 들려요. (Rumbling thunder can be heard from afar.)' },
    '서리': { word: '무서리', reading: 'Museori', meaning: 'First frost', example_sentence: '무서리가 내려서 잎이 시들었어요. (The leaves withered because of the first frost.)' },
    '구름': { word: '적란운', reading: 'Jeongnan-un', meaning: 'Cumulonimbus / Thunderhead', example_sentence: '적란운이 발달하고 있어요. (Cumulonimbus clouds are developing.)' },
    '햇빛': { word: '일조량', reading: 'Iljoryang', meaning: 'Amount of sunshine', example_sentence: '겨울에는 일조량이 부족해요. (There is a lack of sunshine in winter.)' }
};

m8Words.forEach((item, index) => {
    if (m8Replacements[item.word]) {
        m8Words[index] = m8Replacements[item.word];
    }
});

fs.writeFileSync(m8Path, JSON.stringify(m8Data, null, 2));
console.log('✅ Resolved Module 8 conflicts');
