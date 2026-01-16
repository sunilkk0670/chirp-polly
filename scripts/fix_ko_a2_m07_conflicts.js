const fs = require('fs');

const filePath = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m07.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const words = data.lessons[0].vocabularyItems;

// Replacement map for 19 A1 conflicts
const replacements = {
    '영화관': { word: '멀티플렉스', reading: 'Meoltipullekseu', meaning: 'Multiplex / Cinema complex', example_sentence: '멀티플렉스에서 영화를 골라 봐요. (Choose a movie at the multiplex.)' },
    '가사': { word: '소절', reading: 'Sojeol', meaning: 'Verse / Stanza / Phrase', example_sentence: '노래의 첫 소절이 인상적이에요. (The first verse of the song is impressive.)' },
    'SNS': { word: '소셜미디어', reading: 'Sosyeol midieo', meaning: 'Social Media', example_sentence: '소셜미디어로 소식을 전해요. (Share news via social media.)' },
    '연예인': { word: '슈퍼스타', reading: 'Syupeoseuta', meaning: 'Superstar', example_sentence: '그는 세계적인 슈퍼스타예요. (He is a global superstar.)' },
    '아이돌': { word: '연습생', reading: 'Yeonseupsaeng', meaning: 'Trainee', example_sentence: '오랫동안 연습생 생활을 했어요. (I was a trainee for a long time.)' },
    '콘서트': { word: '월드투어', reading: 'Woldeutueo', meaning: 'World tour', example_sentence: '월드투어 공연을 보러 가요. (I\'m going to see a world tour performance.)' },
    '대사': { word: '시나리오', reading: 'Sinario', meaning: 'Scenario / Script', example_sentence: '시나리오 작가가 되고 싶어요. (I want to be a scenario writer.)' },
    '악기': { word: '현악기', reading: 'Hyeon-akgi', meaning: 'String instrument', example_sentence: '바이올린은 대표적인 현악기예요. (The violin is a representative string instrument.)' },
    '기타': { word: '베이스기타', reading: 'Beiseu gita', meaning: 'Bass guitar', example_sentence: '밴드에서 베이스 기타를 쳐요. (I play the bass guitar in the band.)' },
    '피아노': { word: '신디사이저', reading: 'Sindisaijeo', meaning: 'Synthesizer / Keyboard', example_sentence: '신디사이저로 다양한 소리를 내요. (Make various sounds with a synthesizer.)' },
    '취미': { word: '특기', reading: 'Teukgi', meaning: 'Specialty / Talent', example_sentence: '제 특기는 요리예요. (My specialty is cooking.)' },
    '연극': { word: '희곡', reading: 'Heigok', meaning: 'Play / Drama script', example_sentence: '셰익스피어의 희곡을 읽었어요. (I read a play by Shakespeare.)' },
    '전시회': { word: '특별전', reading: 'Teukbyeoljeon', meaning: 'Special exhibition', example_sentence: '박물관에서 특별전을 해요. (The museum is holding a special exhibition.)' },
    '박물관': { word: '기념관', reading: 'Ginyeomgwan', meaning: 'Memorial hall', example_sentence: '역사 기념관을 방문했어요. (I visited the history memorial hall.)' },
    '미술관': { word: '화랑', reading: 'Hwarang', meaning: 'Art gallery / Gallery (traditional term)', example_sentence: '인사동 화랑에서 그림을 봐요. (View paintings at a gallery in Insadong.)' },
    '갤러리': { word: '팝업스토어', reading: 'Pabeopseuto-eo', meaning: 'Pop-up store', example_sentence: '성수동 팝업스토어에 가봤어요. (I went to a pop-up store in Seongsu-dong.)' },
    '조각': { word: '수공예', reading: 'Sugongye', meaning: 'Handicraft / Hand-made craft', example_sentence: '수공예 박람회에 참석했어요. (I attended a handicraft fair.)' },
    '도서관': { word: '열람실', reading: 'Yeollamsil', meaning: 'Reading room', example_sentence: '열람실에서 조용히 공부해요. (Study quietly in the reading room.)' },
    '게임': { word: '이스포츠', reading: 'I-seubocheu', meaning: 'E-sports', example_sentence: '이스포츠 경기를 관람했어요. (I watched an E-sports match.)' }
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

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log(`\n✅ Replaced ${replacedCount} conflicting words in Module 7`);
