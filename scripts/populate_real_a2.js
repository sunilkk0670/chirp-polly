const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// === JAPANESE A2 (Real Content) ===
const japaneseA2Modules = [
    {
        moduleId: "japanese_a2_gen_6", // Casual Speech
        theme: "Casual Speech & Plain Form",
        order: 6,
        level: "a2",
        targetWordCount: 50,
        vocabularyItems: [
            { targetText: "だ", english: "is (plain form of です)", phoneticTranscription: "da", radicalBreakdown: "Copula" },
            { targetText: "じゃない", english: "is not (plain)", phoneticTranscription: "janai", radicalBreakdown: "Negation" },
            { targetText: "だった", english: "was (plain)", phoneticTranscription: "datta", radicalBreakdown: "Past" },
            { targetText: "食べる", english: "to eat (dictionary)", phoneticTranscription: "taberu", radicalBreakdown: "食" },
            { targetText: "食べない", english: "don't eat (plain)", phoneticTranscription: "tabenai", radicalBreakdown: "食" },
            { targetText: "食べた", english: "ate (plain)", phoneticTranscription: "tabeta", radicalBreakdown: "食" },
            { targetText: "行く", english: "to go (dictionary)", phoneticTranscription: "iku", radicalBreakdown: "行" },
            { targetText: "行かない", english: "don't go (plain)", phoneticTranscription: "ikanai", radicalBreakdown: "行" },
            { targetText: "行った", english: "went (plain)", phoneticTranscription: "itta", radicalBreakdown: "行" },
            { targetText: "来る", english: "to come (dictionary)", phoneticTranscription: "kuru", radicalBreakdown: "来" },
            { targetText: "来ない", english: "don't come (plain)", phoneticTranscription: "konai", radicalBreakdown: "来" },
            { targetText: "来た", english: "came (plain)", phoneticTranscription: "kita", radicalBreakdown: "来" },
            { targetText: "する", english: "to do (dictionary)", phoneticTranscription: "suru", radicalBreakdown: "為" },
            { targetText: "しない", english: "don't do (plain)", phoneticTranscription: "shinai", radicalBreakdown: "為" },
            { targetText: "した", english: "did (plain)", phoneticTranscription: "shita", radicalBreakdown: "為" },
            { targetText: "うん", english: "yeah (casual yes)", phoneticTranscription: "un", radicalBreakdown: "Affirm" },
            { targetText: "ううん", english: "nah (casual no)", phoneticTranscription: "uun", radicalBreakdown: "Neg" },
            { targetText: "マジで", english: "seriously? (slang)", phoneticTranscription: "majide", radicalBreakdown: "真" },
            { targetText: "やばい", english: "crazy/bad/amazing", phoneticTranscription: "yabai", radicalBreakdown: "Slang" },
            { targetText: "超", english: "super/very", phoneticTranscription: "chou", radicalBreakdown: "超" },
            { targetText: "めっちゃ", english: "very (casual)", phoneticTranscription: "meccha", radicalBreakdown: "Slang" },
            { targetText: "うそ", english: "No way!/Lie", phoneticTranscription: "uso", radicalBreakdown: "嘘" },
            { targetText: "本当", english: "Really?", phoneticTranscription: "hontou", radicalBreakdown: "本当" },
            { targetText: "すごい", english: "Amazing/Wow", phoneticTranscription: "sugoi", radicalBreakdown: "凄" },
            { targetText: "かわいい", english: "Cute", phoneticTranscription: "kawaii", radicalBreakdown: "可愛" },
            { targetText: "かっこいい", english: "Cool", phoneticTranscription: "kakkoii", radicalBreakdown: "格好" },
            { targetText: "難しい", english: "difficult", phoneticTranscription: "muzukashii", radicalBreakdown: "難" },
            { targetText: "簡単", english: "easy", phoneticTranscription: "kantan", radicalBreakdown: "簡単" },
            { targetText: "忙しい", english: "busy", phoneticTranscription: "isogashii", radicalBreakdown: "忙" },
            { targetText: "暇", english: "free time", phoneticTranscription: "hima", radicalBreakdown: "暇" },
            { targetText: "眠い", english: "sleepy", phoneticTranscription: "nemui", radicalBreakdown: "眠" },
            { targetText: "お腹すいた", english: "I'm hungry", phoneticTranscription: "onaka suita", radicalBreakdown: "腹空" },
            { targetText: "喉渇いた", english: "I'm thirsty", phoneticTranscription: "nodo kawaita", radicalBreakdown: "喉渇" },
            { targetText: "疲れた", english: "I'm tired", phoneticTranscription: "tsukareta", radicalBreakdown: "疲" },
            { targetText: "何", english: "What?", phoneticTranscription: "nani", radicalBreakdown: "何" },
            { targetText: "どうして", english: "Why?", phoneticTranscription: "doushite", radicalBreakdown: "如何" },
            { targetText: "いつ", english: "When?", phoneticTranscription: "itsu", radicalBreakdown: "何時" },
            { targetText: "どこ", english: "Where?", phoneticTranscription: "doko", radicalBreakdown: "何処" },
            { targetText: "だれ", english: "Who?", phoneticTranscription: "dare", radicalBreakdown: "誰" },
            { targetText: "ありがとう", english: "Thanks", phoneticTranscription: "arigatou", radicalBreakdown: "有難" },
            { targetText: "ごめん", english: "Sorry", phoneticTranscription: "gomen", radicalBreakdown: "御免" },
            { targetText: "バイバイ", english: "Bye", phoneticTranscription: "baibai", radicalBreakdown: "Bye" },
            { targetText: "またね", english: "See ya", phoneticTranscription: "matane", radicalBreakdown: "又" },
            { targetText: "大丈夫", english: "It's okay", phoneticTranscription: "daijoubu", radicalBreakdown: "大丈夫" },
            { targetText: "平気", english: "I'm fine", phoneticTranscription: "heiki", radicalBreakdown: "平気" }
        ]
    },
    {
        moduleId: "japanese_a2_gen_7", // Intermediate Vocabulary
        theme: "Intermediate Vocabulary",
        order: 7,
        level: "a2",
        targetWordCount: 50,
        vocabularyItems: [
            { targetText: "社会", english: "society", phoneticTranscription: "shakai", radicalBreakdown: "社会" },
            { targetText: "文化", english: "culture", phoneticTranscription: "bunka", radicalBreakdown: "文化" },
            { targetText: "経済", english: "economy", phoneticTranscription: "keizai", radicalBreakdown: "経済" },
            { targetText: "政治", english: "politics", phoneticTranscription: "seiji", radicalBreakdown: "政治" },
            { targetText: "法律", english: "law", phoneticTranscription: "houritsu", radicalBreakdown: "法律" },
            { targetText: "教育", english: "education", phoneticTranscription: "kyouiku", radicalBreakdown: "教育" },
            { targetText: "科学", english: "science", phoneticTranscription: "kagaku", radicalBreakdown: "科学" },
            { targetText: "技術", english: "technology", phoneticTranscription: "gijutsu", radicalBreakdown: "技術" },
            { targetText: "自然", english: "nature", phoneticTranscription: "shizen", radicalBreakdown: "自然" },
            { targetText: "環境", english: "environment", phoneticTranscription: "kankyou", radicalBreakdown: "環境" },
            { targetText: "産業", english: "industry", phoneticTranscription: "sangyou", radicalBreakdown: "産業" },
            { targetText: "交通", english: "traffic/transport", phoneticTranscription: "koutsuu", radicalBreakdown: "交通" },
            { targetText: "貿易", english: "trade", phoneticTranscription: "boueki", radicalBreakdown: "貿易" },
            { targetText: "国際", english: "international", phoneticTranscription: "kokusai", radicalBreakdown: "国際" },
            { targetText: "関係", english: "relationship", phoneticTranscription: "kankei", radicalBreakdown: "関係" },
            { targetText: "問題", english: "problem", phoneticTranscription: "mondai", radicalBreakdown: "問題" },
            { targetText: "解決", english: "solution", phoneticTranscription: "kaiketsu", radicalBreakdown: "解決" },
            { targetText: "方法", english: "method", phoneticTranscription: "houhou", radicalBreakdown: "方法" },
            { targetText: "目的", english: "purpose", phoneticTranscription: "mokuteki", radicalBreakdown: "目的" },
            { targetText: "理由", english: "reason", phoneticTranscription: "riyuu", radicalBreakdown: "理由" },
            { targetText: "結果", english: "result", phoneticTranscription: "kekka", radicalBreakdown: "結果" },
            { targetText: "経験", english: "experience", phoneticTranscription: "keiken", radicalBreakdown: "経験" },
            { targetText: "知識", english: "knowledge", phoneticTranscription: "chishiki", radicalBreakdown: "知識" },
            { targetText: "興味", english: "interest", phoneticTranscription: "kyoumi", radicalBreakdown: "興味" },
            { targetText: "意見", english: "opinion", phoneticTranscription: "iken", radicalBreakdown: "意見" },
            { targetText: "考え", english: "idea/thought", phoneticTranscription: "kangae", radicalBreakdown: "考" },
            { targetText: "気持ち", english: "feeling", phoneticTranscription: "kimochi", radicalBreakdown: "気持" },
            { targetText: "心", english: "heart/mind", phoneticTranscription: "kokoro", radicalBreakdown: "心" },
            { targetText: "世界", english: "world", phoneticTranscription: "sekai", radicalBreakdown: "世界" },
            { targetText: "平和", english: "peace", phoneticTranscription: "heiwa", radicalBreakdown: "平和" },
            { targetText: "戦争", english: "war", phoneticTranscription: "sensou", radicalBreakdown: "戦争" },
            { targetText: "歴史", english: "history", phoneticTranscription: "rekishi", radicalBreakdown: "歴史" },
            { targetText: "将来", english: "future", phoneticTranscription: "shourai", radicalBreakdown: "将来" },
            { targetText: "夢", english: "dream", phoneticTranscription: "yume", radicalBreakdown: "夢" },
            { targetText: "希望", english: "hope", phoneticTranscription: "kibou", radicalBreakdown: "希望" },
            { targetText: "努力", english: "effort", phoneticTranscription: "doryoku", radicalBreakdown: "努力" },
            { targetText: "成功", english: "success", phoneticTranscription: "seikou", radicalBreakdown: "成功" },
            { targetText: "失敗", english: "failure", phoneticTranscription: "shippai", radicalBreakdown: "失敗" },
            { targetText: "準備", english: "preparation", phoneticTranscription: "junbi", radicalBreakdown: "準備" },
            { targetText: "約束", english: "promise", phoneticTranscription: "yakusoku", radicalBreakdown: "約束" },
            { targetText: "都合", english: "circumstances", phoneticTranscription: "tsugou", radicalBreakdown: "都合" },
            { targetText: "予定", english: "plan/schedule", phoneticTranscription: "yotei", radicalBreakdown: "予定" },
            { targetText: "予約", english: "reservation", phoneticTranscription: "yoyaku", radicalBreakdown: "予約" },
            { targetText: "案内", english: "guide/information", phoneticTranscription: "annai", radicalBreakdown: "案内" },
            { targetText: "紹介", english: "introduction", phoneticTranscription: "shoukai", radicalBreakdown: "紹介" }
        ]
    },
    {
        moduleId: "japanese_a2_gen_8", // Compound Verbs
        theme: "Compound Verbs & Expressions",
        order: 8,
        level: "a2",
        targetWordCount: 40,
        vocabularyItems: [
            { targetText: "話し合う", english: "to discuss", phoneticTranscription: "hanashiau", radicalBreakdown: "話合" },
            { targetText: "知り合う", english: "to get to know", phoneticTranscription: "shiriau", radicalBreakdown: "知合" },
            { targetText: "待ち合わせる", english: "to meet up", phoneticTranscription: "machiawaseru", radicalBreakdown: "待合" },
            { targetText: "問い合わせる", english: "toinquire", phoneticTranscription: "toiawaseru", radicalBreakdown: "問合" },
            { targetText: "思い出させる", english: "to remind", phoneticTranscription: "omoidaseru", radicalBreakdown: "思出" },
            { targetText: "見直す", english: "to reconsider/review", phoneticTranscription: "minaosu", radicalBreakdown: "見直" },
            { targetText: "書き直す", english: "to rewrite", phoneticTranscription: "kakinaosu", radicalBreakdown: "書直" },
            { targetText: "やり直す", english: "to redo", phoneticTranscription: "yarinaosu", radicalBreakdown: "遣直" },
            { targetText: "食べ始める", english: "to start eating", phoneticTranscription: "tabehajimeru", radicalBreakdown: "食始" },
            { targetText: "降り出す", english: "to start raining", phoneticTranscription: "furidasu", radicalBreakdown: "降出" },
            { targetText: "飛び出す", english: "to jump out", phoneticTranscription: "tobidasu", radicalBreakdown: "飛出" },
            { targetText: "取り出す", english: "to take out", phoneticTranscription: "toridasu", radicalBreakdown: "取出" },
            { targetText: "受け取る", english: "to receive", phoneticTranscription: "uketoru", radicalBreakdown: "受取" },
            { targetText: "手に入れる", english: "to obtain", phoneticTranscription: "teni ireru", radicalBreakdown: "手入" },
            { targetText: "気をつける", english: "to be careful", phoneticTranscription: "ki o tsukeru", radicalBreakdown: "気付" },
            { targetText: "気がつく", english: "to notice", phoneticTranscription: "ki ga tsuku", radicalBreakdown: "気付" },
            { targetText: "気に入る", english: "to like/be pleased with", phoneticTranscription: "ki ni iru", radicalBreakdown: "気入" },
            { targetText: "腹が立つ", english: "to get angry", phoneticTranscription: "hara ga tatsu", radicalBreakdown: "腹立" },
            { targetText: "間に合う", english: "to be in time", phoneticTranscription: "maniau", radicalBreakdown: "間合" },
            { targetText: "役に立つ", english: "to be useful", phoneticTranscription: "yaku ni tatsu", radicalBreakdown: "役立" }
        ]
    },
    {
        moduleId: "japanese_a2_gen_9", // Expressions
        theme: "Expressions & Idioms",
        order: 9,
        level: "a2",
        targetWordCount: 30,
        vocabularyItems: [
            { targetText: "お世話になります", english: "Thank you for your help", phoneticTranscription: "osewa ni narimasu", radicalBreakdown: "世話" },
            { targetText: "お疲れ様です", english: "Good work/Hello (colleagues)", phoneticTranscription: "otsukaresama desu", radicalBreakdown: "疲様" },
            { targetText: "初めまして", english: "Nice to meet you", phoneticTranscription: "hajimemashite", radicalBreakdown: "初" },
            { targetText: "どうぞよろしく", english: "Pleased to meet you", phoneticTranscription: "douzo yoroshiku", radicalBreakdown: "宜" },
            { targetText: "行ってきます", english: "I'm leaving (home)", phoneticTranscription: "ittekimasu", radicalBreakdown: "行来" },
            { targetText: "行ってらっしゃい", english: "Have a good trip", phoneticTranscription: "itterasshai", radicalBreakdown: "行" },
            { targetText: "ただいま", english: "I'm home", phoneticTranscription: "tadaima", radicalBreakdown: "只今" },
            { targetText: "おかえりなさい", english: "Welcome home", phoneticTranscription: "okaerinasai", radicalBreakdown: "帰" },
            { targetText: "いただきます", english: "Let's eat", phoneticTranscription: "itadakimasu", radicalBreakdown: "頂" },
            { targetText: "ごちそうさまでした", english: "Thank you for the meal", phoneticTranscription: "gochisousama deshita", radicalBreakdown: "馳走様" },
            { targetText: "おめでとうございます", english: "Congratulations", phoneticTranscription: "omedetou gozaimasu", radicalBreakdown: "御目出" },
            { targetText: "お大事に", english: "Get well soon", phoneticTranscription: "odaijini", radicalBreakdown: "大事" },
            { targetText: "失礼します", english: "Excuse me (entering/leaving)", phoneticTranscription: "shitsurei shimasu", radicalBreakdown: "失礼" },
            { targetText: "お先に失礼します", english: "I'm leaving first (work)", phoneticTranscription: "osaki ni shitsurei shimasu", radicalBreakdown: "先失礼" },
            { targetText: "少々お待ちください", english: "Please wait a moment", phoneticTranscription: "shoushou omachi kudasai", radicalBreakdown: "少待" },
            { targetText: "かしこまりました", english: "Certainly (service)", phoneticTranscription: "kashikomarimashita", radicalBreakdown: "畏" },
            { targetText: "ごめんなさい", english: "I'm sorry", phoneticTranscription: "gomennasai", radicalBreakdown: "御免" },
            { targetText: "すみません", english: "Excuse me/Sorry", phoneticTranscription: "sumimasen", radicalBreakdown: "済" },
            { targetText: "どういたしまして", english: "You're welcome", phoneticTranscription: "douitashimashite", radicalBreakdown: "致" },
            { targetText: "結構です", english: "No thank you/It's fine", phoneticTranscription: "kekkou desu", radicalBreakdown: "結構" },
            { targetText: "もう一度お願いします", english: "Once more please", phoneticTranscription: "mou ichido onegaishimasu", radicalBreakdown: "一度願" },
            { targetText: "ゆっくり話してください", english: "Speak slowly please", phoneticTranscription: "yukkuri hanashite kudasai", radicalBreakdown: "話" },
            { targetText: "わかりました", english: "I understood", phoneticTranscription: "wakarimashita", radicalBreakdown: "分" },
            { targetText: "わかりません", english: "I don't understand", phoneticTranscription: "wakarimasen", radicalBreakdown: "分" },
            { targetText: "日本語が話せますか", english: "Can you speak Japanese?", phoneticTranscription: "nihongo ga hanasemasuka", radicalBreakdown: "日本語話" }
        ]
    },
    {
        moduleId: "japanese_a2_gen_10", // Conversations
        theme: "A2 Practical Conversations",
        order: 10,
        level: "a2",
        targetWordCount: 30,
        vocabularyItems: [
            { targetText: "趣味は何ですか", english: "What is your hobby?", phoneticTranscription: "shumi wa nan desu ka", radicalBreakdown: "趣味何" },
            { targetText: "週末は何をしますか", english: "What do you do on weekends?", phoneticTranscription: "shuumatsu wa nani o shimasu ka", radicalBreakdown: "週末何" },
            { targetText: "一緒に映画を見ませんか", english: "Won't you watch a movie with me?", phoneticTranscription: "issho ni eiga o mimasenka", radicalBreakdown: "一緒映画見" },
            { targetText: "いいですね", english: "That sounds good", phoneticTranscription: "ii desu ne", radicalBreakdown: "良" },
            { targetText: "残念ですが", english: "Unfortunately...", phoneticTranscription: "zannen desu ga", radicalBreakdown: "残念" },
            { targetText: "また今度", english: "Some other time", phoneticTranscription: "mata kondo", radicalBreakdown: "又今度" },
            { targetText: "駅はどこですか", english: "Where is the station?", phoneticTranscription: "eki wa doko desu ka", radicalBreakdown: "駅何処" },
            { targetText: "手伝っていただけませんか", english: "Could you please help me?", phoneticTranscription: "tetsudatte itadakemasenka", radicalBreakdown: "手伝頂" },
            { targetText: "写真をとってもいいですか", english: "May I take a photo?", phoneticTranscription: "shashin o tottemo ii desu ka", radicalBreakdown: "写真良" },
            { targetText: "これをください", english: "I'll take this one", phoneticTranscription: "kore o kudasai", radicalBreakdown: "下" },
            { targetText: "クレジットカードは使えますか", english: "Can I use a credit card?", phoneticTranscription: "kurejitto kaado wa tsukaemasu ka", radicalBreakdown: "使" },
            { targetText: "お会計をお願いします", english: "The check please", phoneticTranscription: "okaikei o onegaishimasu", radicalBreakdown: "会計願" },
            { targetText: "おすすめは何ですか", english: "What do you recommend?", phoneticTranscription: "osusume wa nan desu ka", radicalBreakdown: "勧何" },
            { targetText: "道に迷いました", english: "I'm lost", phoneticTranscription: "michi ni mayoimashita", radicalBreakdown: "道迷" },
            { targetText: "バス停はどこですか", english: "Where is the bus stop?", phoneticTranscription: "basutei wa doko desu ka", radicalBreakdown: "バス停何処" },
            { targetText: "この電車は東京に行きますか", english: "Does this train go to Tokyo?", phoneticTranscription: "kono densha wa toukyou ni ikimasu ka", radicalBreakdown: "電車東京行" },
            { targetText: "どのくらいかかりますか", english: "How long does it take?", phoneticTranscription: "dono kurai kakarimasu ka", radicalBreakdown: "" },
            { targetText: "何時に始まりますか", english: "What time does it start?", phoneticTranscription: "nanji ni hajimarimasu ka", radicalBreakdown: "何時始" },
            { targetText: "予約したいのですが", english: "I'd like to make a reservation", phoneticTranscription: "yoyaku shitai no desu ga", radicalBreakdown: "予約" },
            { targetText: "名前は〜といいます", english: "My name is...", phoneticTranscription: "namae wa ~ to iimasu", radicalBreakdown: "名前言" }
        ]
    }
];


// === KOREAN A2 (Real Content) ===
const koreanA2Modules = [
    {
        moduleId: "korean_a2_m5",
        theme: "Intermediate Verbs & Actions",
        order: 5,
        level: "a2",
        targetWordCount: 50,
        vocabularyItems: [
            { targetText: "준비하다", english: "to prepare", phoneticTranscription: "junbihada" },
            { targetText: "확인하다", english: "to confirm", phoneticTranscription: "hwaginhada" },
            { targetText: "설명하다", english: "to explain", phoneticTranscription: "seolmyeonghada" },
            { targetText: "이해하다", english: "to understand", phoneticTranscription: "ihaehada" },
            { targetText: "기억하다", english: "to remember", phoneticTranscription: "gieokhada" },
            { targetText: "잊어버리다", english: "to forget", phoneticTranscription: "ijeobeorida" },
            { targetText: "약속하다", english: "to promise", phoneticTranscription: "yaksokhada" },
            { targetText: "취소하다", english: "to cancel", phoneticTranscription: "chwisohada" },
            { targetText: "연락하다", english: "to contact", phoneticTranscription: "yeollakhada" },
            { targetText: "도착하다", english: "to arrive", phoneticTranscription: "dochakhada" },
            { targetText: "출발하다", english: "to depart", phoneticTranscription: "chulbalhada" },
            { targetText: "이사하다", english: "to move house", phoneticTranscription: "isahada" },
            { targetText: "청소하다", english: "to clean", phoneticTranscription: "cheongsohada" },
            { targetText: "빨래하다", english: "to do laundry", phoneticTranscription: "ppallaehada" },
            { targetText: "요리하다", english: "to cook", phoneticTranscription: "yorihada" },
            { targetText: "운전하다", english: "to drive", phoneticTranscription: "unjeonhada" },
            { targetText: "운동하다", english: "to exercise", phoneticTranscription: "undonghada" },
            { targetText: "산책하다", english: "to take a walk", phoneticTranscription: "sanchaekhada" },
            { targetText: "여행하다", english: "to travel", phoneticTranscription: "yeohaenghada" },
            { targetText: "구경하다", english: "to look around/sightsee", phoneticTranscription: "gugyeonghada" },
            { targetText: "노력하다", english: "to make an effort", phoneticTranscription: "noryeokhada" },
            { targetText: "성공하다", english: "to succeed", phoneticTranscription: "seonggonghada" },
            { targetText: "실패하다", english: "to fail", phoneticTranscription: "silpaehada" },
            { targetText: "합격하다", english: "to pass", phoneticTranscription: "hapgyeokhada" },
            { targetText: "졸업하다", english: "to graduate", phoneticTranscription: "joreophada" },
            { targetText: "취직하다", english: "to get a job", phoneticTranscription: "chwijikhada" },
            { targetText: "퇴근하다", english: "to leave work", phoneticTranscription: "toegeunhada" },
            { targetText: "출근하다", english: "to go to work", phoneticTranscription: "chulgeunhada" },
            { targetText: "회의하다", english: "to have a meeting", phoneticTranscription: "hoeuihada" },
            { targetText: "발표하다", english: "to present", phoneticTranscription: "balpyohada" },
            { targetText: "사랑하다", english: "to love", phoneticTranscription: "saranghada" },
            { targetText: "좋아하다", english: "to like", phoneticTranscription: "joahada" },
            { targetText: "싫어하다", english: "to dislike", phoneticTranscription: "sireohada" },
            { targetText: "걱정하다", english: "to worry", phoneticTranscription: "geokjeonghada" },
            { targetText: "기대하다", english: "to expect", phoneticTranscription: "gidaehada" },
            { targetText: "실망하다", english: "to be disappointed", phoneticTranscription: "silmanghada" },
            { targetText: "만족하다", english: "to be satisfied", phoneticTranscription: "manjokhada" },
            { targetText: "후회하다", english: "to regret", phoneticTranscription: "huhoehada" },
            { targetText: "결심하다", english: "to decide", phoneticTranscription: "gyeolsimhada" },
            { targetText: "포기하다", english: "to give up", phoneticTranscription: "pogihada" },
            { targetText: "질문하다", english: "to ask", phoneticTranscription: "jilmunhada" },
            { targetText: "대답하다", english: "to answer", phoneticTranscription: "daedaphada" },
            { targetText: "부탁하다", english: "to request", phoneticTranscription: "butakhada" },
            { targetText: "거절하다", english: "to refuse", phoneticTranscription: "geojeolhada" },
            { targetText: "초대하다", english: "to invite", phoneticTranscription: "chodaehada" },
            { targetText: "방문하다", english: "to visit", phoneticTranscription: "bangmunhada" },
            { targetText: "소개하다", english: "to introduce", phoneticTranscription: "sogaehada" },
            { targetText: "인사하다", english: "to greet", phoneticTranscription: "insahada" },
            { targetText: "축하하다", english: "to congratulate", phoneticTranscription: "chukhahada" },
            { targetText: "감사하다", english: "to thank", phoneticTranscription: "gamsahada" }
        ]
    },
    {
        moduleId: "korean_a2_m6",
        theme: "Intermediate Adjectives & Descriptions",
        order: 6,
        level: "a2",
        targetWordCount: 50,
        vocabularyItems: [
            { targetText: "편리하다", english: "convenient", phoneticTranscription: "pyeonlihada" },
            { targetText: "불편하다", english: "inconvenient", phoneticTranscription: "bulpyeonhada" },
            { targetText: "복잡하다", english: "complicated", phoneticTranscription: "bokjaphada" },
            { targetText: "단순하다", english: "simple", phoneticTranscription: "dansunhada" },
            { targetText: "중요하다", english: "important", phoneticTranscription: "jungyohada" },
            { targetText: "필요하다", english: "necessary", phoneticTranscription: "piryohada" },
            { targetText: "가능하다", english: "possible", phoneticTranscription: "ganeunghada" },
            { targetText: "불가능하다", english: "impossible", phoneticTranscription: "bulganeunghada" },
            { targetText: "유명하다", english: "famous", phoneticTranscription: "yumyeonghada" },
            { targetText: "친절하다", english: "kind", phoneticTranscription: "chinjeolhada" },
            { targetText: "똑똑하다", english: "smart", phoneticTranscription: "ttokttokhada" },
            { targetText: "부지런하다", english: "diligent", phoneticTranscription: "bujireonhada" },
            { targetText: "게으르다", english: "lazy", phoneticTranscription: "geeureuda" },
            { targetText: "조용하다", english: "quiet", phoneticTranscription: "joyonghada" },
            { targetText: "시끄럽다", english: "noisy", phoneticTranscription: "sikkeureopda" },
            { targetText: "깨끗하다", english: "clean", phoneticTranscription: "kkaekkeuthada" },
            { targetText: "더럽다", english: "dirty", phoneticTranscription: "deoreopda" },
            { targetText: "넓다", english: "wide", phoneticTranscription: "neolpda" },
            { targetText: "좁다", english: "narrow", phoneticTranscription: "jopda" },
            { targetText: "무겁다", english: "heavy", phoneticTranscription: "mugeopda" },
            { targetText: "가볍다", english: "light", phoneticTranscription: "gabyeopda" },
            { targetText: "어둡다", english: "dark", phoneticTranscription: "eodupda" },
            { targetText: "밝다", english: "bright", phoneticTranscription: "balkda" },
            { targetText: "따뜻하다", english: "warm", phoneticTranscription: "ttatteuthada" },
            { targetText: "시원하다", english: "cool", phoneticTranscription: "siwonhada" },
            { targetText: "신선하다", english: "fresh", phoneticTranscription: "sinseonhada" },
            { targetText: "달다", english: "sweet", phoneticTranscription: "dalda" },
            { targetText: "짜다", english: "salty", phoneticTranscription: "jjada" },
            { targetText: "맵다", english: "spicy", phoneticTranscription: "maepda" },
            { targetText: "시다", english: "sour", phoneticTranscription: "sida" },
            { targetText: "쓰다", english: "bitter", phoneticTranscription: "sseuda" },
            { targetText: "비싸다", english: "expensive", phoneticTranscription: "bissada" },
            { targetText: "싸다", english: "cheap", phoneticTranscription: "ssada" },
            { targetText: "빠르다", english: "fast", phoneticTranscription: "ppareuda" },
            { targetText: "느리다", english: "slow", phoneticTranscription: "neurida" },
            { targetText: "강하다", english: "strong", phoneticTranscription: "ganghada" },
            { targetText: "약하다", english: "weak", phoneticTranscription: "yakhada" },
            { targetText: "안전하다", english: "safe", phoneticTranscription: "anjeonhada" },
            { targetText: "위험하다", english: "dangerous", phoneticTranscription: "wiheomhada" },
            { targetText: "행복하다", english: "happy", phoneticTranscription: "haengbokhada" },
            { targetText: "불행하다", english: "unhappy", phoneticTranscription: "bulhaenghada" },
            { targetText: "건강하다", english: "healthy", phoneticTranscription: "geonganghada" },
            { targetText: "아프다", english: "sick", phoneticTranscription: "apeuda" },
            { targetText: "젊다", english: "young", phoneticTranscription: "jeomda" },
            { targetText: "늙다", english: "old", phoneticTranscription: "neukda" },
            { targetText: "비슷하다", english: "similar", phoneticTranscription: "biseuthada" },
            { targetText: "다르다", english: "different", phoneticTranscription: "dareuda" },
            { targetText: "같다", english: "same", phoneticTranscription: "gatda" },
            { targetText: "충분하다", english: "sufficient", phoneticTranscription: "chungbunhada" },
            { targetText: "부족하다", english: "insufficient", phoneticTranscription: "bujokhada" }
        ]
    },
    {
        moduleId: "korean_a2_m7",
        theme: "Social Situations & Workplace",
        order: 7,
        level: "a2",
        targetWordCount: 40,
        vocabularyItems: [
            { targetText: "회의", english: "meeting", phoneticTranscription: "hoeui" },
            { targetText: "서류", english: "documents/papers", phoneticTranscription: "seoryu" },
            { targetText: "보고서", english: "report", phoneticTranscription: "bogoseo" },
            { targetText: "결재", english: "approval", phoneticTranscription: "gyeoljae" },
            { targetText: "출장", english: "business trip", phoneticTranscription: "chuljang" },
            { targetText: "야근", english: "overtime work", phoneticTranscription: "yageun" },
            { targetText: "회식", english: "company dinner", phoneticTranscription: "hoesik" },
            { targetText: "월급", english: "monthly salary", phoneticTranscription: "wolgeup" },
            { targetText: "보너스", english: "bonus", phoneticTranscription: "boneoseu" },
            { targetText: "휴가", english: "vacation/leave", phoneticTranscription: "hyuga" },
            { targetText: "동료", english: "colleague", phoneticTranscription: "dongnyo" },
            { targetText: "상사", english: "superior/boss", phoneticTranscription: "sangsa" },
            { targetText: "부하 평사원", english: "subordinate", phoneticTranscription: "buha" },
            { targetText: "사장님", english: "CEO/President", phoneticTranscription: "sajangnim" },
            { targetText: "부장님", english: "Department Head", phoneticTranscription: "bujangnim" },
            { targetText: "대리님", english: "Assistant Manager", phoneticTranscription: "daerinim" },
            { targetText: "신입 사원", english: "new employee", phoneticTranscription: "sinip sawon" },
            { targetText: "면접", english: "interview", phoneticTranscription: "myeonjeop" },
            { targetText: "이력서", english: "resume", phoneticTranscription: "iryeokseo" },
            { targetText: "지원하다", english: "to apply (for job)", phoneticTranscription: "jiwonhada" },
            { targetText: "악수", english: "handshake", phoneticTranscription: "aksu" },
            { targetText: "명함", english: "business card", phoneticTranscription: "myeongham" },
            { targetText: "교환하다", english: "to exchange", phoneticTranscription: "gyohwanhada" },
            { targetText: "소개하다", english: "to introduce", phoneticTranscription: "sogaehada" },
            { targetText: "인사", english: "greeting", phoneticTranscription: "insa" },
            { targetText: "예절", english: "etiquette/manners", phoneticTranscription: "yejeol" },
            { targetText: "존댓말", english: "polite language", phoneticTranscription: "jondaetmal" },
            { targetText: "반말", english: "casual language", phoneticTranscription: "banmal" },
            { targetText: "분위기", english: "atmosphere", phoneticTranscription: "bunwigi" },
            { targetText: "성격", english: "personality", phoneticTranscription: "seongkyeok" },
            { targetText: "경험", english: "experience", phoneticTranscription: "gyeongheom" },
            { targetText: "능력", english: "ability", phoneticTranscription: "neungnyeok" },
            { targetText: "전공", english: "major (study)", phoneticTranscription: "jeongong" },
            { targetText: "졸업", english: "graduation", phoneticTranscription: "joreop" },
            { targetText: "입학", english: "admission (school)", phoneticTranscription: "iphak" },
            { targetText: "수업", english: "class", phoneticTranscription: "sueop" },
            { targetText: "강의", english: "lecture", phoneticTranscription: "gangui" },
            { targetText: "장학금", english: "scholarship", phoneticTranscription: "janghakgeum" },
            { targetText: "등록금", english: "tuition fee", phoneticTranscription: "deungnokgeum" },
            { targetText: "성적", english: "grades", phoneticTranscription: "seongjeok" }
        ]
    },
    {
        moduleId: "korean_a2_m8",
        theme: "Abstract Nouns & Concepts",
        order: 8,
        level: "a2",
        targetWordCount: 40,
        vocabularyItems: [
            { targetText: "가능성", english: "possibility", phoneticTranscription: "ganeungseong" },
            { targetText: "필요성", english: "necessity", phoneticTranscription: "piryoseong" },
            { targetText: "중요성", english: "importance", phoneticTranscription: "jungyoseong" },
            { targetText: "문제", english: "problem", phoneticTranscription: "munje" },
            { targetText: "해결", english: "solution", phoneticTranscription: "haegyeol" },
            { targetText: "방법", english: "method", phoneticTranscription: "bangbeop" },
            { targetText: "이유", english: "reason", phoneticTranscription: "iyu" },
            { targetText: "목적", english: "purpose", phoneticTranscription: "mokjeok" },
            { targetText: "결과", english: "result", phoneticTranscription: "gyeolgua" },
            { targetText: "원인", english: "cause", phoneticTranscription: "wonin" },
            { targetText: "의미", english: "meaning", phoneticTranscription: "uimi" },
            { targetText: "사실", english: "fact", phoneticTranscription: "sasil" },
            { targetText: "진실", english: "truth", phoneticTranscription: "jinsil" },
            { targetText: "거짓말", english: "lie", phoneticTranscription: "geojitmal" },
            { targetText: "정보", english: "information", phoneticTranscription: "jeongbo" },
            { targetText: "지식", english: "knowledge", phoneticTranscription: "jisik" },
            { targetText: "경험", english: "experience", phoneticTranscription: "gyeongheom" },
            { targetText: "생각", english: "thought/idea", phoneticTranscription: "saenggak" },
            { targetText: "마음", english: "mind/heart", phoneticTranscription: "maeum" },
            { targetText: "기분", english: "feeling/mood", phoneticTranscription: "gibun" },
            { targetText: "느낌", english: "feeling/sensation", phoneticTranscription: "neukkim" },
            { targetText: "감정", english: "emotion", phoneticTranscription: "gamjeong" },
            { targetText: "사람", english: "person/people", phoneticTranscription: "saram" },
            { targetText: "인간", english: "human being", phoneticTranscription: "ingan" },
            { targetText: "인생", english: "life", phoneticTranscription: "insaeng" },
            { targetText: "삶", english: "life/living", phoneticTranscription: "salm" },
            { targetText: "세상", english: "world", phoneticTranscription: "sesang" },
            { targetText: "사회", english: "society", phoneticTranscription: "sahoe" },
            { targetText: "문화", english: "culture", phoneticTranscription: "munhwa" },
            { targetText: "역사", english: "history", phoneticTranscription: "yeoksa" },
            { targetText: "미래", english: "future", phoneticTranscription: "mirae" },
            { targetText: "과거", english: "past", phoneticTranscription: "gwageo" },
            { targetText: "현재", english: "present", phoneticTranscription: "hyeonjae" },
            { targetText: "꿈", english: "dream", phoneticTranscription: "kkum" },
            { targetText: "희망", english: "hope", phoneticTranscription: "huimang" },
            { targetText: "목표", english: "goal", phoneticTranscription: "mokpyo" },
            { targetText: "계획", english: "plan", phoneticTranscription: "gyehoek" }
        ]
    },
    {
        moduleId: "korean_a2_m9",
        theme: "Complex Sentence Connectors",
        order: 9,
        level: "a2",
        targetWordCount: 30,
        vocabularyItems: [
            { targetText: "~기 때문에", english: "because (of ~ing)", phoneticTranscription: "gi ttaemune" },
            { targetText: "~는데", english: "but/and/so (background)", phoneticTranscription: "neunde" },
            { targetText: "~(으)니까", english: "because/since", phoneticTranscription: "eunikka" },
            { targetText: "~(으)러 가다", english: "go in order to", phoneticTranscription: "eureo gada" },
            { targetText: "~(으)려고 하다", english: "intend to", phoneticTranscription: "euryeogo hada" },
            { targetText: "~거나", english: "or (verbs)", phoneticTranscription: "geona" },
            { targetText: "~지만", english: "but", phoneticTranscription: "jiman" },
            { targetText: "~아/어서", english: "because/so (sequence)", phoneticTranscription: "a/eoseo" },
            { targetText: "~(으)면서", english: "while", phoneticTranscription: "eumyeonseo" },
            { targetText: "~기 전에", english: "before ~ing", phoneticTranscription: "gi jeone" },
            { targetText: "~(으)ㄴ 후에", english: "after ~ing", phoneticTranscription: "eun hue" },
            { targetText: "~고 나서", english: "after finishing", phoneticTranscription: "go naseo" },
            { targetText: "~ㄹ/을 때", english: "when", phoneticTranscription: "eul ttae" },
            { targetText: "~(으)면", english: "if", phoneticTranscription: "eumyeon" },
            { targetText: "~(으)ㄹ 수 있다", english: "can/able to", phoneticTranscription: "eul su itda" },
            { targetText: "~(으)ㄹ 수 없다", english: "cannot/unable to", phoneticTranscription: "eul su eopda" },
            { targetText: "~아야/어야 하다", english: "must/have to", phoneticTranscription: "aya/eoya hada" },
            { targetText: "~아/어도 되다", english: "may/allowed to", phoneticTranscription: "a/eodo doeda" },
            { targetText: "~(으)면 안 되다", english: "must not/not allowed", phoneticTranscription: "eumyeon an doeda" },
            { targetText: "~고 싶다", english: "want to", phoneticTranscription: "go sipda" },
            { targetText: "~(으)ㄹ까요?", english: "shall we?/do you think?", phoneticTranscription: "eulkkayo" },
            { targetText: "~(으)ㅂ시다", english: "let's", phoneticTranscription: "eupsida" },
            { targetText: "~(으)시겠어요?", english: "would you like to?", phoneticTranscription: "usigesseoyo" }
        ]
    },
    {
        moduleId: "korean_a2_m10",
        theme: "Idiomatic Expressions",
        order: 10,
        level: "a2",
        targetWordCount: 20,
        vocabularyItems: [
            { targetText: "발이 넓다", english: "well-connected (wide feet)", phoneticTranscription: "bari neolpda" },
            { targetText: "손이 크다", english: "generous (big hands)", phoneticTranscription: "soni keuda" },
            { targetText: "입이 가볍다", english: "can't keep secrets (light mouth)", phoneticTranscription: "ibi gabyeopda" },
            { targetText: "입이 무겁다", english: "good at secrets (heavy mouth)", phoneticTranscription: "ibi mugeopda" },
            { targetText: "눈이 높다", english: "high standards (high eyes)", phoneticTranscription: "nuni nopda" },
            { targetText: "귀가 얇다", english: "gullible (thin ears)", phoneticTranscription: "gwiga yalpda" },
            { targetText: "얼굴이 두껍다", english: "shameless (thick face)", phoneticTranscription: "eolguri dukkeopda" },
            { targetText: "마음에 들다", english: "to like something (enter heart)", phoneticTranscription: "maeume deulda" },
            { targetText: "손을 잡다", english: "to cooperate (hold hands)", phoneticTranscription: "soneul japda" },
            { targetText: "손을 떼다", english: "to quit (pull hands off)", phoneticTranscription: "soneul tteda" },
            { targetText: "눈을 감아주다", english: "to overlook (close eyes for)", phoneticTranscription: "nuneul gamajuda" },
            { targetText: "가슴이 아프다", english: "heartbroken", phoneticTranscription: "gaseumi apeuda" },
            { targetText: "어깨가 무겁다", english: "heavy responsibility", phoneticTranscription: "eokkaega mugeopda" },
            { targetText: "배가 아프다", english: "jealous (stomach hurts)", phoneticTranscription: "baega apeuda" },
            { targetText: "비행기를 태우다", english: "to flatter (give plane ride)", phoneticTranscription: "bihaenggireul taeuda" },
            { targetText: "바가지를 씌우다", english: "to rip off (cover with gourd)", phoneticTranscription: "bagajireul ssuiuda" },
            { targetText: "바람을 맞다", english: "to get stood up", phoneticTranscription: "barameul matda" },
            { targetText: "한턱내다", english: "to treat (to a meal)", phoneticTranscription: "hanteongnaeda" },
            { targetText: "국수를 먹다", english: "to get married (eat noodles)", phoneticTranscription: "guksureul meokda" },
            { targetText: "미역국을 먹다", english: "to fail exam (eat seaweed soup)", phoneticTranscription: "miyeokgugeul meokda" }
        ]
    }
];

// === SPANISH A2 (Real Content) ===
const spanishA2Modules = [
    {
        moduleId: "spanish_a2_m2",
        theme: "Imperfect Tense (Habits & Past)",
        order: 2,
        level: "a2",
        targetWordCount: 40,
        vocabularyItems: [
            { targetText: "hablaba", english: "I/he/she used to speak", phoneticTranscription: "a-bla-ba" },
            { targetText: "comía", english: "I/he/she used to eat", phoneticTranscription: "ko-mi-a" },
            { targetText: "vivía", english: "I/he/she used to live", phoneticTranscription: "bi-bi-a" },
            { targetText: "era", english: "I/he/she was (description)", phoneticTranscription: "e-ra" }
        ]
    },
    {
        moduleId: "spanish_a2_m3",
        theme: "Conversational Connectors",
        order: 3,
        level: "a2",
        targetWordCount: 30,
        vocabularyItems: [
            { targetText: "entonces", english: "then/so", phoneticTranscription: "en-ton-ses" },
            { targetText: "luego", english: "then/later", phoneticTranscription: "lwe-go" },
            { targetText: "después", english: "afterwards", phoneticTranscription: "des-pwes" },
            { targetText: "además", english: "besides/furthemore", phoneticTranscription: "a-de-mas" }
        ]
    },
    {
        moduleId: "spanish_a2_m4",
        theme: "Por vs Para",
        order: 4,
        level: "a2",
        targetWordCount: 25,
        vocabularyItems: [
            { targetText: "por la mañana", english: "in (during) the morning", phoneticTranscription: "por la ma-nya-na" },
            { targetText: "por la tarde", english: "in (during) the afternoon", phoneticTranscription: "por la tar-de" },
            { targetText: "por la noche", english: "in (during) the night", phoneticTranscription: "por la no-che" },
            { targetText: "por favor", english: "please (for favor)", phoneticTranscription: "por fa-bor" },
            { targetText: "por supuesto", english: "of course", phoneticTranscription: "por su-pwes-to" },
            { targetText: "por fin", english: "finally/at last", phoneticTranscription: "por fin" },
            { targetText: "por ejemplo", english: "for example", phoneticTranscription: "por e-hem-plo" },
            { targetText: "por eso", english: "that's why/therefore", phoneticTranscription: "por e-so" },
            { targetText: "gracias por", english: "thanks for", phoneticTranscription: "gra-syas por" },
            { targetText: "para mí", english: "for me (opinion/recipient)", phoneticTranscription: "pa-ra mi" },
            { targetText: "para ti", english: "for you", phoneticTranscription: "pa-ra ti" },
            { targetText: "para siempre", english: "forever", phoneticTranscription: "pa-ra sjem-pre" },
            { targetText: "para qué", english: "what for", phoneticTranscription: "pa-ra ke" },
            { targetText: "estudiar para", english: "study in order to", phoneticTranscription: "es-tu-djar pa-ra" },
            { targetText: "listo para", english: "ready for", phoneticTranscription: "lis-to pa-ra" },
            { targetText: "ir para", english: "go towards/to", phoneticTranscription: "ir pa-ra" }
        ]
    },
    {
        moduleId: "spanish_a2_m5",
        theme: "Reflexive Verbs",
        order: 5,
        level: "a2",
        targetWordCount: 30,
        vocabularyItems: [
            { targetText: "levantarse", english: "to get up", phoneticTranscription: "le-ban-tar-se" },
            { targetText: "despertarse", english: "to wake up", phoneticTranscription: "des-per-tar-se" },
            { targetText: "lavarse", english: "to wash oneself", phoneticTranscription: "la-bar-se" },
            { targetText: "cepillarse", english: "to brush (teeth/hair)", phoneticTranscription: "se-pi-yar-se" },
            { targetText: "ducharse", english: "to shower", phoneticTranscription: "du-char-se" },
            { targetText: "bañarse", english: "to bathe", phoneticTranscription: "ba-nyar-se" },
            { targetText: "peinarse", english: "to comb oneself", phoneticTranscription: "pej-nar-se" },
            { targetText: "afeitarse", english: "to shave", phoneticTranscription: "a-fej-tar-se" },
            { targetText: "maquillarse", english: "to put on makeup", phoneticTranscription: "ma-ki-yar-se" },
            { targetText: "vestirse", english: "to get dressed", phoneticTranscription: "bes-tir-se" },
            { targetText: "ponerse", english: "to put on (clothes)", phoneticTranscription: "po-ner-se" },
            { targetText: "quitarse", english: "to take off (clothes)", phoneticTranscription: "ki-tar-se" },
            { targetText: "acostarse", english: "to go to bed", phoneticTranscription: "a-kos-tar-se" },
            { targetText: "dormirse", english: "to fall asleep", phoneticTranscription: "dor-mir-se" },
            { targetText: "llamarse", english: "to be called", phoneticTranscription: "ya-mar-se" },
            { targetText: "sentarse", english: "to sit down", phoneticTranscription: "sen-tar-se" },
            { targetText: "sentirse", english: "to feel", phoneticTranscription: "sen-tir-se" },
            { targetText: "preocuparse", english: "to worry", phoneticTranscription: "pre-o-ku-par-se" },
            { targetText: "acordarse", english: "to remember", phoneticTranscription: "a-kor-dar-se" },
            { targetText: "olvidarse", english: "to forget", phoneticTranscription: "ol-bi-dar-se" },
            { targetText: "irse", english: "to leave/go away", phoneticTranscription: "ir-se" },
            { targetText: "quedarse", english: "to stay", phoneticTranscription: "ke-dar-se" }
        ]
    }
];

async function uploadRealContent() {
    console.log('🚀 Uploading REAL A2 Content (replacing placeholders)...\n');

    // KOREAN
    console.log('🇰🇷 Uploading Korean Modules...');
    for (const module of koreanA2Modules) {
        await db.collection('languages').doc('korean')
            .collection('levels').doc('a2')
            .collection('modules').doc(module.moduleId)
            .set(module);
        console.log(`  ✓ ${module.theme} (${module.vocabularyItems.length} words)`);
    }

    // SPANISH
    console.log('\n🇪🇸 Uploading Spanish Modules...');
    for (const module of spanishA2Modules) {
        await db.collection('languages').doc('spanish')
            .collection('levels').doc('a2')
            .collection('modules').doc(module.moduleId)
            .set(module);
        console.log(`  ✓ ${module.theme} (${module.vocabularyItems.length} words)`);
    }

    // JAPANESE
    console.log('\n🇯🇵 Uploading Japanese Modules...');
    for (const module of japaneseA2Modules) {
        await db.collection('languages').doc('japanese')
            .collection('levels').doc('a2')
            .collection('modules').doc(module.moduleId)
            .set(module);
        console.log(`  ✓ ${module.theme} (${module.vocabularyItems.length} words)`);
    }

    console.log('\n✅ Upload Complete.');
}

uploadRealContent();
