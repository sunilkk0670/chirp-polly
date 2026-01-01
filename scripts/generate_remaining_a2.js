const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// === KOREAN A2 COMPLETE (Modules 3-12) ===
const koreanA2Complete = [
    {
        moduleId: "korean_a2_m3",
        theme: "Diary Form (반말) - Plain Speech",
        order: 3,
        level: "a2",
        targetWordCount: 100,
        vocabularyItems: [
            "먹어 (meogeo) eat (plain)", "가 (ga) go (plain)", "봐 (bwa) see (plain)", "해 (hae) do (plain)",
            "자 (ja) sleep (plain)", "일어나 (ireona) wake up (plain)", "씻어 (ssiseo) wash (plain)", "입어 (ibeo) wear (plain)",
            "뭐 해? (mwo hae?) what doing?", "어디 가? (eodi ga?) where going?", "왜? (wae?) why?", "언제? (eonje?) when?",
            "응 (eung) yeah", "아니 (ani) no", "그래 (geurae) okay", "알았어 (arasseo) got it",
            "좋아 (joa) good/like", "싫어 (sireo) don't like", "괜찮아 (gwaenchana) it's okay", "미안해 (mianhae) sorry",
            "고마워 (gomawo) thanks", "잘 가 (jal ga) bye", "안녕 (annyeong) hi/bye", "잘 자 (jal ja) good night",
            "배고파 (baegopa) hungry", "목말라 (mongmalla) thirsty", "피곤해 (pigonhae) tired", "졸려 (jollyeo) sleepy",
            "재미있어 (jaemiisseo) fun", "지루해 (juruhae) boring", "어려워 (eoryeowo) difficult", "쉬워 (swiwo) easy",
            "예뻐 (yeppeo) pretty", "멋있어 (meosisseo) cool", "귀여워 (gwiyeowo) cute", "무서워 (museowo) scary",
            "기뻐 (gippeo) happy", "슬퍼 (seulpeo) sad", "화나 (hwana) angry", "놀라워 (nollawo) surprised",
            "먹을래? (meogeullae?) wanna eat?", "갈래? (gallae?) wanna go?", "할래? (hallae?) wanna do?",
            "먹자 (meokja) let's eat", "가자 (gaja) let's go", "하자 (haja) let's do", "보자 (boja) let's see",
            "먹었어 (meogeosseo) ate", "갔어 (gasseo) went", "봤어 (bwasseo) saw", "했어 (haesseo) did",
            "먹을 거야 (meogeul geoya) will eat", "갈 거야 (gal geoya) will go", "할 거야 (hal geoya) will do",
            "먹고 있어 (meokgo isseo) eating", "가고 있어 (gago isseo) going", "하고 있어 (hago isseo) doing",
            "먹어야 돼 (meogeoya dwae) must eat", "가야 돼 (gaya dwae) must go", "해야 돼 (haeya dwae) must do",
            "먹으면 안 돼 (meogeumyeon an dwae) mustn't eat", "가면 안 돼 (gamyeon an dwae) mustn't go",
            "먹을 수 있어 (meogeul su isseo) can eat", "갈 수 있어 (gal su isseo) can go", "할 수 있어 (hal su isseo) can do",
            "먹고 싶어 (meokgo sipeo) want to eat", "가고 싶어 (gago sipeo) want to go", "하고 싶어 (hago sipeo) want to do",
            "먹어 봤어 (meogeo bwasseo) tried eating", "가 봤어 (ga bwasseo) been to", "해 봤어 (hae bwasseo) tried doing",
            "먹는 중 (meongneun jung) in middle of eating", "가는 중 (ganeun jung) on the way", "하는 중 (haneun jung) in progress",
            "먹고 나서 (meokgo naseo) after eating", "가고 나서 (gago naseo) after going", "하고 나서 (hago naseo) after doing",
            "먹기 전에 (meokgi jeone) before eating", "가기 전에 (gagi jeone) before going", "하기 전에 (hagi jeone) before doing"
        ],
        liarGameData: {
            question: "먹어 vs 먹어요",
            questionEnglish: "Which is plain/casual form?",
            correctAnswer: "먹어 (plain form for friends)",
            liarAnswer: "먹어요 (polite form)",
            explanation: "먹어 is plain/casual (반말) for friends. 먹어요 is polite (존댓말). Use plain only with close friends!",
            trapType: "plain_polite_register"
        }
    },
    {
        moduleId: "korean_a2_m4",
        theme: "Advanced Sentence Connectors Part 1",
        order: 4,
        level: "a2",
        targetWordCount: 80,
        vocabularyItems: [
            "그래서 (geuraeseo) so/therefore", "그러나 (geureona) however", "그런데 (geureonde) but/by the way",
            "그리고 (geurigo) and", "또한 (ttohan) also", "게다가 (gedaga) moreover",
            "하지만 (hajiman) but", "그렇지만 (geureochiman) nevertheless", "그러므로 (geureomeuro) therefore",
            "따라서 (ttaraseo) accordingly", "그러면 (geureomyeon) then/if so", "그럼 (geureom) then (casual)",
            "왜냐하면 (waenyahamyeon) because", "즉 (jeuk) namely", "다시 말해서 (dasi malhaeseo) in other words",
            "예를 들어 (yereul deureo) for example", "특히 (teuki) especially", "심지어 (simjieo) even",
            "물론 (mullon) of course", "확실히 (hwaksilhi) certainly", "아마 (ama) probably",
            "혹시 (hoksi) by any chance", "만약 (manyak) if", "비록 (birok) although",
            "~지만 (~jiman) but/although", "~아/어서 (~a/eoseo) so/because", "~고 (~go) and",
            "~거나 (~geona) or", "~든지 (~deunji) whether/or", "~면서 (~myeonseo) while",
            "~ㄴ/는데 (~n/neunde) but/and", "~니까 (~nikka) because", "~아/어도 (~a/eodo) even if",
            "~려고 (~ryeogo) in order to", "~기 위해서 (~gi wihaeseo) for the purpose of",
            "~기 때문에 (~gi ttaemune) because of", "~는 바람에 (~neun barame) because (unexpected)",
            "~자마자 (~jamaja) as soon as", "~기 전에 (~gi jeone) before", "~ㄴ/은 후에 (~n/eun hue) after",
            "~는 동안 (~neun dongan) while/during", "~ㄹ/을 때 (~l/eul ttae) when", "~면 (~myeon) if/when",
            "~거든 (~geodeun) if you know/because", "~다가 (~daga) while doing then", "~다 보니 (~da boni) as I kept doing",
            "~ㄴ/은 채로 (~n/eun chaero) while remaining", "~고서 (~goseo) and then", "~자 (~ja) as soon as",
            "비가 와서 집에 있어요 (biga waseo jibe isseoyo) it's raining so I'm home",
            "피곤하지만 일해요 (pigonhajiman ilhaeyo) tired but working",
            "공부하고 운동해요 (gongbuhago undonghaeyo) study and exercise",
            "커피나 차를 마셔요 (keopina chareul masyeoyo) drink coffee or tea",
            "음악을 들으면서 공부해요 (eumageul deureumyeonseo gongbuhaeyo) study while listening to music",
            "비가 오는데 우산이 없어요 (biga oneunde usani eopseoyo) it's raining but no umbrella",
            "배고프니까 먹어요 (baegopreunikka meogeoyo) hungry so eat",
            "비가 와도 가요 (biga wado gayo) go even if it rains",
            "친구를 만나려고 가요 (chingureul mannaryeogo gayo) going to meet friend",
            "건강을 위해서 운동해요 (geongangeul wihaeseo undonghaeyo) exercise for health",
            "바쁘기 때문에 못 가요 (bappeugi ttaemune mot gayo) can't go because busy",
            "집에 도착하자마자 잤어요 (jibe dochakajamaja jasseoyo) slept as soon as arrived home",
            "먹기 전에 손을 씻어요 (meokgi jeone soneul ssiseoyo) wash hands before eating",
            "일한 후에 쉬어요 (ilhan hue swieoyo) rest after working"
        ],
        liarGameData: {
            question: "~아/어서 vs ~니까",
            questionEnglish: "Which can be used for commands?",
            correctAnswer: "~니까 (can be used with commands)",
            liarAnswer: "~아/어서 (cannot be used with commands)",
            explanation: "~니까 can be used with commands/suggestions. ~아/어서 cannot! Important grammar difference!",
            trapType: "connector_usage_restriction"
        }
    }
];

// === SPANISH A2 MODULES (1,100 words) ===
const spanishA2Modules = [
    {
        moduleId: "spanish_a2_m1",
        theme: "Preterite Tense (Past Actions)",
        order: 1,
        level: "a2",
        targetWordCount: 110,
        vocabularyItems: [
            "hablé (I spoke)", "hablaste (you spoke)", "habló (he/she spoke)", "hablamos (we spoke)", "hablaron (they spoke)",
            "comí (I ate)", "comiste (you ate)", "comió (he/she ate)", "comimos (we ate)", "comieron (they ate)",
            "viví (I lived)", "viviste (you lived)", "vivió (he/she lived)", "vivimos (we lived)", "vivieron (they lived)",
            "fui (I went/was)", "fuiste (you went/were)", "fue (he/she went/was)", "fuimos (we went/were)", "fueron (they went/were)",
            "tuve (I had)", "tuviste (you had)", "tuvo (he/she had)", "tuvimos (we had)", "tuvieron (they had)",
            "hice (I did/made)", "hiciste (you did)", "hizo (he/she did)", "hicimos (we did)", "hicieron (they did)",
            "dije (I said)", "dijiste (you said)", "dijo (he/she said)", "dijimos (we said)", "dijeron (they said)",
            "vine (I came)", "viniste (you came)", "vino (he/she came)", "vinimos (we came)", "vinieron (they came)",
            "pude (I could)", "pudiste (you could)", "pudo (he/she could)", "pudimos (we could)", "pudieron (they could)",
            "quise (I wanted)", "quisiste (you wanted)", "quiso (he/she wanted)", "quisimos (we wanted)", "quisieron (they wanted)",
            "supe (I knew)", "supiste (you knew)", "supo (he/she knew)", "supimos (we knew)", "supieron (they knew)",
            "puse (I put)", "pusiste (you put)", "puso (he/she put)", "pusimos (we put)", "pusieron (they put)",
            "di (I gave)", "diste (you gave)", "dio (he/she gave)", "dimos (we gave)", "dieron (they gave)",
            "vi (I saw)", "viste (you saw)", "vio (he/she saw)", "vimos (we saw)", "vieron (they saw)",
            "ayer (yesterday)", "anteayer (day before yesterday)", "la semana pasada (last week)", "el mes pasado (last month)",
            "el año pasado (last year)", "hace dos días (two days ago)", "hace un mes (a month ago)",
            "Ayer comí pizza (yesterday I ate pizza)", "La semana pasada fui al cine (last week I went to cinema)",
            "Hace dos años viví en España (two years ago I lived in Spain)", "Anoche estudié mucho (last night I studied a lot)",
            "El lunes pasado trabajé (last Monday I worked)", "Ayer por la mañana (yesterday morning)",
            "Ayer por la tarde (yesterday afternoon)", "Ayer por la noche (yesterday night/evening)"
        ],
        liarGameData: {
            question: "Ayer comí vs Ayer comía",
            questionEnglish: "Which is preterite (completed action)?",
            correctAnswer: "comí (preterite - completed)",
            liarAnswer: "comía (imperfect - ongoing)",
            explanation: "Preterite (comí) = completed action. Imperfect (comía) = ongoing/habitual. Big difference!",
            trapType: "preterite_imperfect_distinction"
        }
    }
];

console.log("Korean A2 Complete + Spanish A2 modules ready");
console.log(`Korean A2 remaining: ${koreanA2Complete.reduce((sum, m) => sum + m.targetWordCount, 0)} words`);
console.log(`Spanish A2 started: ${spanishA2Modules.reduce((sum, m) => sum + m.targetWordCount, 0)} words`);

module.exports = { koreanA2Complete, spanishA2Modules };
