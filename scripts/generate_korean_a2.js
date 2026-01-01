const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Korean A2 Modules (1,200 words total)
const koreanA2Modules = [
    {
        moduleId: "korean_a2_m1",
        theme: "TOPIK II Vocabulary: Daily Life",
        order: 1,
        level: "a2",
        targetWordCount: 120,
        vocabularyItems: [
            "생활 (saenghwal) life/living", "일상 (ilsang) daily life", "습관 (seupgwan) habit", "규칙 (gyuchik) rule",
            "계획 (gyehoek) plan", "목표 (mokpyo) goal", "꿈 (kkum) dream", "희망 (huimang) hope",
            "노력 (noryeok) effort", "성공 (seonggong) success", "실패 (silpae) failure", "경험 (gyeongheom) experience",
            "기회 (gihoe) opportunity", "문제 (munje) problem", "해결 (haegyeol) solution", "방법 (bangbeop) method",
            "이유 (iyu) reason", "원인 (wonin) cause", "결과 (gyeolgwa) result", "영향 (yeonghyang) influence",
            "변화 (byeonhwa) change", "발전 (baljeon) development", "진보 (jinbo) progress", "개선 (gaeseon) improvement",
            "증가 (jeungga) increase", "감소 (gamso) decrease", "상승 (sangseung) rise", "하락 (harak) fall",
            "시작 (sijak) start", "끝 (kkeut) end", "중간 (jungan) middle", "과정 (gwajeong) process",
            "단계 (dangye) stage", "순서 (sunseo) order", "차례 (charye) turn", "번호 (beonho) number",
            "양 (yang) quantity", "질 (jil) quality", "크기 (keugi) size", "무게 (muge) weight",
            "길이 (giri) length", "높이 (nopi) height", "넓이 (neolbi) width", "깊이 (gipi) depth",
            "속도 (sokdo) speed", "거리 (geori) distance", "시간 (sigan) time", "기간 (gigan) period",
            "순간 (sungan) moment", "때 (ttae) time/when", "동안 (dongan) during", "사이 (sai) between",
            "전 (jeon) before", "후 (hu) after", "중 (jung) during", "이전 (ijeon) previous",
            "이후 (ihu) after", "현재 (hyeonjae) present", "과거 (gwageo) past", "미래 (mirae) future",
            "최근 (choegeun) recently", "요즘 (yojeum) these days", "옛날 (yennal) old days", "앞으로 (apeuro) in future",
            "자주 (jaju) often", "가끔 (gakkeum) sometimes", "항상 (hangsang) always", "절대 (jeoldae) never/absolutely",
            "보통 (botong) usually", "대부분 (daebubun) mostly", "전부 (jeonbu) all", "일부 (ilbu) part",
            "반 (ban) half", "전체 (jeonche) whole", "각각 (gakgak) each", "모두 (modu) everyone/all",
            "아무도 (amudo) nobody", "누구나 (nuguna) anyone", "무엇이든 (mueosideun) anything", "어디든지 (eodideunji) anywhere",
            "언제나 (eonjena) anytime", "어떻게든 (eotteokeden) somehow", "왜냐하면 (waenyahamyeon) because", "그래서 (geuraeseo) so/therefore",
            "그러나 (geureona) however", "하지만 (hajiman) but", "그런데 (geureonde) but/by the way", "그리고 (geurigo) and",
            "또한 (ttohan) also", "게다가 (gedaga) moreover", "그렇지만 (geureochiman) nevertheless", "그러므로 (geureomeuro) therefore",
            "따라서 (ttaraseo) accordingly", "즉 (jeuk) namely", "예를 들어 (yereul deureo) for example", "특히 (teuki) especially",
            "물론 (mullon) of course", "아마 (ama) probably", "확실히 (hwaksilhi) certainly", "정말 (jeongmal) really",
            "진짜 (jinjja) really (casual)", "사실 (sasil) actually", "실제로 (siljaero) actually", "거의 (geoui) almost",
            "완전히 (wanjeonhi) completely", "전혀 (jeonhyeo) (not) at all", "조금 (jogeum) a little", "많이 (mani) a lot",
            "너무 (neomu) too/very", "매우 (maeu) very", "아주 (aju) very", "상당히 (sangdanghi) considerably"
        ],
        liarGameData: {
            question: "그래서 vs 그런데",
            questionEnglish: "Which means 'therefore'?",
            correctAnswer: "그래서 (geuraeseo - so/therefore)",
            liarAnswer: "그런데 (geureonde - but/by the way)",
            explanation: "그래서 = so/therefore (result). 그런데 = but/by the way (contrast/topic change). Different connectors!",
            trapType: "sentence_connector_confusion"
        }
    },
    {
        moduleId: "korean_a2_m2",
        theme: "Past & Future Tenses Expanded",
        order: 2,
        level: "a2",
        targetWordCount: 120,
        vocabularyItems: [
            "먹었어요 (meogeosseoyo) ate", "갔어요 (gasseoyo) went", "봤어요 (bwasseoyo) saw", "했어요 (haesseoyo) did",
            "공부했어요 (gongbuhaesseoyo) studied", "일했어요 (ilhaesseoyo) worked", "만났어요 (mannasseoyo) met", "샀어요 (sasseoyo) bought",
            "팔았어요 (parasseoyo) sold", "읽었어요 (ilgeosseoyo) read", "썼어요 (sseosseoyo) wrote", "들었어요 (deureosseoyo) listened",
            "먹을 거예요 (meogeul geoyeyo) will eat", "갈 거예요 (gal geoyeyo) will go", "볼 거예요 (bol geoyeyo) will see",
            "할 거예요 (hal geoyeyo) will do", "공부할 거예요 (gongbuhal geoyeyo) will study", "일할 거예요 (ilhal geoyeyo) will work",
            "만날 거예요 (mannal geoyeyo) will meet", "살 거예요 (sal geoyeyo) will buy", "팔 거예요 (pal geoyeyo) will sell",
            "읽을 거예요 (ilgeul geoyeyo) will read", "쓸 거예요 (sseul geoyeyo) will write", "들을 거예요 (deureul geoyeyo) will listen",
            "먹겠어요 (meokgesseoyo) will eat (intention)", "가겠어요 (gagesseoyo) will go", "보겠어요 (bogesseoyo) will see",
            "하겠어요 (hagesseoyo) will do", "공부하겠어요 (gongbuhagesseoyo) will study", "일하겠어요 (ilhagesseoyo) will work",
            "먹었습니다 (meogeotseumnida) ate (formal)", "갔습니다 (gatseumnida) went (formal)", "봤습니다 (bwatseumnida) saw (formal)",
            "했습니다 (haetseumnida) did (formal)", "먹을 겁니다 (meogeul geomni da) will eat (formal)", "갈 겁니다 (gal geomnida) will go (formal)",
            "먹고 있어요 (meokgo isseoyo) is eating", "가고 있어요 (gago isseoyo) is going", "보고 있어요 (bogo isseoyo) is watching",
            "하고 있어요 (hago isseoyo) is doing", "공부하고 있어요 (gongbuhago isseoyo) is studying", "일하고 있어요 (ilhago isseoyo) is working",
            "먹어 봤어요 (meogeo bwasseoyo) have tried eating", "가 봤어요 (ga bwasseoyo) have been to", "해 봤어요 (hae bwasseoyo) have tried doing",
            "먹어 본 적이 있어요 (meogeo bon jeogi isseoyo) have eaten before", "가 본 적이 있어요 (ga bon jeogi isseoyo) have been before",
            "먹은 적이 없어요 (meogeun jeogi eopseoyo) have never eaten", "가 본 적이 없어요 (ga bon jeogi eopseoyo) have never been",
            "먹고 싶어요 (meokgo sipeoyo) want to eat", "가고 싶어요 (gago sipeoyo) want to go", "보고 싶어요 (bogo sipeoyo) want to see/miss",
            "하고 싶어요 (hago sipeoyo) want to do", "먹고 싶었어요 (meokgo sipeosseoyo) wanted to eat", "가고 싶었어요 (gago sipeosseoyo) wanted to go",
            "먹어야 해요 (meogeoya haeyo) must eat", "가야 해요 (gaya haeyo) must go", "해야 해요 (haeya haeyo) must do",
            "먹어야 돼요 (meogeoya dwaeyo) must eat", "가야 돼요 (gaya dwaeyo) must go", "해야 돼요 (haeya dwaeyo) must do",
            "먹으면 안 돼요 (meogeumyeon an dwaeyo) must not eat", "가면 안 돼요 (gamyeon an dwaeyo) must not go", "하면 안 돼요 (hamyeon an dwaeyo) must not do",
            "먹을 수 있어요 (meogeul su isseoyo) can eat", "갈 수 있어요 (gal su isseoyo) can go", "할 수 있어요 (hal su isseoyo) can do",
            "먹을 수 없어요 (meogeul su eopseoyo) cannot eat", "갈 수 없어요 (gal su eopseoyo) cannot go", "할 수 없어요 (hal su eopseoyo) cannot do",
            "먹을까요? (meogeulkkayo?) shall we eat?", "갈까요? (galkkayo?) shall we go?", "할까요? (halkkayo?) shall we do?",
            "먹을래요? (meogeullaeyo?) want to eat? (casual)", "갈래요? (gallaeyo?) want to go?", "할래요? (hallaeyo?) want to do?",
            "먹을게요 (meogeu lgeyo) I will eat", "갈게요 (galgeyo) I will go", "할게요 (halgeyo) I will do",
            "먹었으면 좋겠어요 (meogeosseumyeon jokesseoyo) wish had eaten", "갔으면 좋겠어요 (gasseumyeon jokesseoyo) wish had gone"
        ],
        liarGameData: {
            question: "먹을 거예요 vs 먹겠어요",
            questionEnglish: "Which shows stronger intention?",
            correctAnswer: "먹겠어요 (stronger intention/will)",
            liarAnswer: "먹을 거예요 (simple future plan)",
            explanation: "먹겠어요 = strong will/intention. 먹을 거예요 = simple future plan. Subtle difference!",
            trapType: "future_tense_nuance"
        }
    }
];

console.log("Korean A2 modules ready");
console.log(`Total modules: ${koreanA2Modules.length}`);
console.log(`Total words: ${koreanA2Modules.reduce((sum, m) => sum + m.targetWordCount, 0)}`);

module.exports = { koreanA2Modules };
