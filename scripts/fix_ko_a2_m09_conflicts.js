const fs = require('fs');

const m9Path = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m09.json';
const m9Data = JSON.parse(fs.readFileSync(m9Path, 'utf8'));
const m9Words = m9Data.lessons[0].vocabularyItems;

const m9Replacements = {
    '댓글': { word: '악플', reading: 'Akple', meaning: 'Malicious comment', example_sentence: '악플은 사람에게 상처를 줘요. (Malicious comments hurt people.)' },
    '노트북': { word: '휴대용PC', reading: 'Hyudaeyong PC', meaning: 'Portable PC', example_sentence: '이 휴대용 PC는 가벼워요. (This portable PC is lightweight.)' },
    '컴퓨터': { word: '본체', reading: 'Bonche', meaning: 'Main body / PC case', example_sentence: '컴퓨터 본체에서 소리가 나요. (There is a sound coming from the PC case.)' },
    '스마트폰': { word: '최신단말기', reading: 'Choesin-danmalgi', meaning: 'Latest terminal / Handset', example_sentence: '최신 단말기로 교체했어요. (I switched to the latest handset.)' },
    '수리': { word: '수선', reading: 'Suseon', meaning: 'Repair / Mending (clothes/etc)', example_sentence: '망가진 가방을 수선했어요. (I repaired the broken bag.)' },
    '업로드': { word: '게시', reading: 'Gesi', meaning: 'Posting / Notice', example_sentence: '공지사항을 게시했어요. (Posted an announcement.)' },
    '다운로드': { word: '내려받기', reading: 'Naeryeobatgi', meaning: 'Download (native term)', example_sentence: '앱을 내려받기 하세요. (Please download the app.)' },
    '비밀번호': { word: '인증번호', reading: 'Injeung-beonho', meaning: 'Verification code', example_sentence: '인증 번호를 문자로 받았어요. (I received a verification code via text.)' },
    '로그인': { word: '사용자접속', reading: 'Sayongja-jeopsok', meaning: 'User access', example_sentence: '사용자 접속이 지연되고 있어요. (User access is being delayed.)' },
    '회원가입': { word: '신규등록', reading: 'Sin-gyu-deungnok', meaning: 'New registration', example_sentence: '신규 등록 회원에게 혜택을 줘요. (Give benefits to newly registered members.)' },
    '해킹': { word: '계정탈취', reading: 'Gyejeong-talchwi', meaning: 'Account hijacking', example_sentence: '계정 탈취를 조심하세요. (Be careful of account hijacking.)' },
    '보안': { word: '해킹방지', reading: 'Haeking-bangji', meaning: 'Hacking prevention', example_sentence: '해킹 방지 프로그램을 설치하세요. (Install a hacking prevention program.)' },
    '이메일': { word: '전자우편', reading: 'Jeonja-upyeon', meaning: 'E-mail (standard term)', example_sentence: '전자우편으로 서류를 보냈어요. (Sent the document by e-mail.)' },
    '광고': { word: '스팸메일', reading: 'Seupaem-meil', meaning: 'Spam email', example_sentence: '스팸 메일이 너무 많이 와요. (There are too many spam emails.)' },
    '이어폰': { word: '헤드폰', reading: 'Hedeupon', meaning: 'Headphones', example_sentence: '헤드폰으로 크게 음악을 들어요. (Listen to music loudly with headphones.)' },
    '프린터': { word: '출력기', reading: 'Chullyeokgi', meaning: 'Output device / Printer', example_sentence: '출력기의 상태를 확인하세요. (Check the status of the output device.)' },
    '종이': { word: '인쇄용지', reading: 'Inswae-yongji', meaning: 'Printing paper', example_sentence: '인쇄 용지가 부족해요. (Printing paper is insufficient.)' },
    '내비게이션': { word: '길도우미', reading: 'Gildoumi', meaning: 'Road helper / Navigation', example_sentence: '길도우미 어플을 켰어요. (Turned on the road helper app.)' }
};

m9Words.forEach((item, index) => {
    if (m9Replacements[item.word]) {
        m9Words[index] = m9Replacements[item.word];
    }
});

fs.writeFileSync(m9Path, JSON.stringify(m9Data, null, 2));
console.log('✅ Resolved Module 9 conflicts');
