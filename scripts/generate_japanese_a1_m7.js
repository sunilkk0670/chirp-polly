const fs = require('fs');

const ja_a1_m7_items = [
    // Daily Routine (1-20)
    { word: '毎日', reading: 'mainichi', meaning: 'Every day' },
    { word: '朝', reading: 'asa', meaning: 'Morning' },
    { word: '昼', reading: 'hiru', meaning: 'Daytime / Noon' },
    { word: '晩 / 夜', reading: 'ban / yoru', meaning: 'Evening / Night' },
    { word: '生活', reading: 'seikatsu', meaning: 'Life / Lifestyle' },
    { word: '習慣', reading: 'shuukan', meaning: 'Habit / Custom' },
    { word: '予定', reading: 'yotei', meaning: 'Schedule / Plan' },
    { word: '準備', reading: 'junbi', meaning: 'Preparation' },
    { word: '掃除する', reading: 'souji suru', meaning: 'To clean' },
    { word: '洗濯する', reading: 'sentaku suru', meaning: 'To do laundry' },
    { word: '掃除機', reading: 'soujiki', meaning: 'Vacuum cleaner' },
    { word: '洗濯機', reading: 'sentakuki', meaning: 'Washing machine' },
    { word: '手伝う', reading: 'tetsudau', meaning: 'To help' },
    { word: '散歩する', reading: 'sanpo suru', meaning: 'To take a walk' },
    { word: '運動する', reading: 'undou suru', meaning: 'To exercise' },
    { word: '休憩', reading: 'kyuukei', meaning: 'Break / Rest' },
    { word: '入浴する', reading: 'nyuuyoku suru', meaning: 'To take a bath' },
    { word: 'お風呂', reading: 'ofuro', meaning: 'Bath' },
    { word: 'シャワー', reading: 'shawaa', meaning: 'Shower' },
    { word: '歯磨き', reading: 'hamigaki', meaning: 'Brushing teeth' },

    // Hobbies & Interests (21-40)
    { word: '趣味', reading: 'shumi', meaning: 'Hobby' },
    { word: '音楽', reading: 'ongaku', meaning: 'Music' },
    { word: '歌', reading: 'uta', meaning: 'Song' },
    { word: '読書', reading: 'dokusho', meaning: 'Reading books' },
    { word: '本', reading: 'hon', meaning: 'Book' },
    { word: '映画', reading: 'eiga', meaning: 'Movie' },
    { word: 'アニメ', reading: 'anime', meaning: 'Anime' },
    { word: '漫画', reading: 'manga', meaning: 'Manga / Comics' },
    { word: 'ゲーム', reading: 'geemu', meaning: 'Game' },
    { word: '料理', reading: 'ryouri', meaning: 'Cooking' },
    { word: '旅行', reading: 'ryokou', meaning: 'Travel / Trip' },
    { word: '写真', reading: 'shashin', meaning: 'Photograph' },
    { word: 'カメラ', reading: 'kamera', meaning: 'Camera' },
    { word: '絵', reading: 'e', meaning: 'Picture / Painting' },
    { word: '美術', reading: 'bijutsu', meaning: 'Fine arts' },
    { word: '博物館', reading: 'hakubutsukan', meaning: 'Museum' },
    { word: '踊り', reading: 'odori', meaning: 'Dance' },
    { word: '楽器', reading: 'gakki', meaning: 'Musical instrument' },
    { word: 'ピアノ', reading: 'piano', meaning: 'Piano' },
    { word: 'ギター', reading: 'gitaa', meaning: 'Guitar' },

    // Sports (41-60)
    { word: 'スポーツ', reading: 'supootsu', meaning: 'Sports' },
    { word: '野球', reading: 'yakyuu', meaning: 'Baseball' },
    { word: 'サッカー', reading: 'sakkaa', meaning: 'Soccer' },
    { word: 'テニス', reading: 'tenisu', meaning: 'Tennis' },
    { word: 'バスケットボール', reading: 'basukettobooru', meaning: 'Basketball' },
    { word: '水泳', reading: 'suiei', meaning: 'Swimming' },
    { word: 'ジョギング', reading: 'jogingu', meaning: 'Jogging' },
    { word: 'スキー', reading: 'sukii', meaning: 'Skiing' },
    { word: 'スノーボード', reading: 'sunoboodo', meaning: 'Snowboarding' },
    { word: 'ゴルフ', reading: 'gorufu', meaning: 'Golf' },
    { word: '柔道', reading: 'juudou', meaning: 'Judo' },
    { word: '空手', reading: 'karate', meaning: 'Karate' },
    { word: '相撲', reading: 'sumou', meaning: 'Sumo' },
    { word: '試合', reading: 'shiai', meaning: 'Game / Match' },
    { word: '応援', reading: 'ouen', meaning: 'Cheering / Support' },
    { word: '勝負', reading: 'shoubu', meaning: 'Victory or defeat' },
    { word: '勝利', reading: 'shouri', meaning: 'Victory' },
    { word: '選手', reading: 'senshu', meaning: 'Player / Athlete' },
    { word: 'チーム', reading: 'chiimu', meaning: 'Team' },
    { word: '練習', reading: 'renshuu', meaning: 'Practice' },

    // Items & Social (61-80)
    { word: 'カラオケ', reading: 'karaoke', meaning: 'Karaoke' },
    { word: 'お祭り', reading: 'omatsuri', meaning: 'Festival' },
    { word: '花火', reading: 'hanabi', meaning: 'Fireworks' },
    { word: 'お土産', reading: 'omiyage', meaning: 'Souvenir' },
    { word: '贈り物', reading: 'okurimono', meaning: 'Gift' },
    { word: '遊び', reading: 'asobi', meaning: 'Play / Recreation' },
    { word: '友達', reading: 'tomodachi', meaning: 'Friend' },
    { word: '紹介', reading: 'shoukai', meaning: 'Introduction' },
    { word: '集まり', reading: 'atsumari', meaning: 'Gathering' },
    { word: 'パーティー', reading: 'paatii', meaning: 'Party' },
    { word: '電話', reading: 'denwa', meaning: 'Telephone' },
    { word: '携帯', reading: 'keitai', meaning: 'Mobile phone' },
    { word: 'メール', reading: 'meeru', meaning: 'Email / Message' },
    { word: 'インターネット', reading: 'intaanetto', meaning: 'Internet' },
    { word: 'パソコン', reading: 'pasokon', meaning: 'Personal computer' },
    { word: 'テレビ', reading: 'terebi', meaning: 'TV' },
    { word: 'ニュース', reading: 'nyuusu', meaning: 'News' },
    { word: '雑誌', reading: 'zasshi', meaning: 'Magazine' },
    { word: '新聞', reading: 'shinbun', meaning: 'Newspaper' },
    { word: '日記', reading: 'nikki', meaning: 'Diary' },

    // Verbs related to hobbies (81-100)
    { word: '弾く', reading: 'hiku', meaning: 'To play (string instrument)' },
    { word: '吹く', reading: 'fuku', meaning: 'To blow / play (wind instrument)' },
    { word: '叩く', reading: 'tataku', meaning: 'To hit / play (percussion)' },
    { word: '聴く', reading: 'kiku', meaning: 'To listen to (music)' },
    { word: '撮る', reading: 'toru', meaning: 'To take (photo)' },
    { word: '描く', reading: 'kaku', meaning: 'To draw / paint' },
    { word: '作る', reading: 'tsukuru', meaning: 'To make' },
    { word: '集める', reading: 'atsumeru', meaning: 'To collect' },
    { word: '楽しむ', reading: 'tanoshimu', meaning: 'To enjoy' },
    { word: '喜ぶ', reading: 'yorokobu', meaning: 'To be glad' },
    { word: '笑う', reading: 'warau', meaning: 'To laugh' },
    { word: '感動する', reading: 'kandou suru', meaning: 'To be moved / impressed' },
    { word: '参加する', reading: 'sanka suru', meaning: 'To participate' },
    { word: '見学する', reading: 'kengaku suru', meaning: 'To visit / observe' },
    { word: '散歩', reading: 'sanpo', meaning: 'Stroll' },
    { word: '昼寝', reading: 'hirune', meaning: 'Nap' },
    { word: '早起き', reading: 'hayaoki', meaning: 'Early rising' },
    { word: '夜更かし', reading: 'yofukashi', meaning: 'Staying up late' },
    { word: '自由', reading: 'jiyuu', meaning: 'Freedom / Free time' },
    { word: '休み', reading: 'yasumi', meaning: 'Holiday / Rest' }
];

const ja_a1_m7_traps = [
    { trap: 'In a Japanese public bath (onsen), it is polite to bring your small modesty towel into the water with you.', correctVersion: 'Towels must NEVER touch the water. Keep them on your head or on the side of the bath.', explanation: 'The water is communal. Submerging a towel is seen as unhygienic. Always wash your body thoroughly before entering.' },
    { trap: 'Japanese karaoke is only for people who can sing perfectly like professionals.', correctVersion: 'Karaoke is for everyone! It is about having fun with friends, and enthusiastic singing is valued more than professional skill.', explanation: 'Karaoke culture is about social bonding. Its common for groups to rent private rooms (*karaoke-kan*) to sing and enjoy food/drinks together.' },
    { trap: "Giving a gift (omiyage) in Japan is just a casual gesture and doesn't require any specific etiquette.", correctVersion: 'Gift giving is highly ritualized. Omiyage is expected when returning from a trip, usually individually wrapped sweets or snacks from that region.', explanation: "Omiyage is a way to maintain social harmony (*wa*) and acknowledge those who stayed behind while you traveled." }
];

// Integrity Check: Duplicates
const seenWords = new Set();
const duplicates = [];
ja_a1_m7_items.forEach(item => {
    if (seenWords.has(item.word)) {
        duplicates.push(item.word);
    }
    seenWords.add(item.word);
});

if (duplicates.length > 0) {
    console.error('❌ Duplicates found in Module 7:', duplicates);
    process.exit(1);
}

// Slice to exactly 100 items
const finalItems = ja_a1_m7_items.slice(0, 100);

if (finalItems.length !== 100) {
    console.error('❌ Module 7 has ' + finalItems.length + ' items. Expected 100.');
    process.exit(1);
}

const moduleData = {
    id: 'ja_a1_m7',
    moduleId: 'ja_a1_m7',
    name: 'A1 Japanese - Module 7: Daily Routine and Hobbies',
    theme: 'Daily Routine and Hobbies',
    order: 7,
    count: 100,
    vocabularyItems: finalItems,
    liarGameData: { culturalTraps: ja_a1_m7_traps }
};

fs.writeFileSync('./firestore_data/ja_a1_m7.json', JSON.stringify(moduleData, null, 2));
console.log('✅ ja_a1_m7.json generated successfully.');
