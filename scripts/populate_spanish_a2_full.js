const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Expand existing modules and add new ones
const spanishA2Modules = [
    {
        moduleId: "spanish_a2_m2",
        theme: "Imperfect Tense (Habits & Past)",
        order: 2,
        level: "a2",
        targetWordCount: 30,
        vocabularyItems: [
            { targetText: "hablaba", english: "I/he/she used to speak", phoneticTranscription: "a-bla-ba" },
            { targetText: "comía", english: "I/he/she used to eat", phoneticTranscription: "ko-mi-a" },
            { targetText: "vivía", english: "I/he/she used to live", phoneticTranscription: "bi-bi-a" },
            { targetText: "era", english: "I/he/she was (description)", phoneticTranscription: "e-ra" },
            { targetText: "iba", english: "I/he/she used to go", phoneticTranscription: "i-ba" },
            { targetText: "veía", english: "I/he/she used to see", phoneticTranscription: "be-i-a" },
            { targetText: "hacía", english: "I/he/she used to do/make", phoneticTranscription: "a-si-a" },
            { targetText: "tenía", english: "I/he/she had", phoneticTranscription: "te-ni-a" },
            { targetText: "estaba", english: "I/he/she was (location/state)", phoneticTranscription: "es-ta-ba" },
            { targetText: "sabía", english: "I/he/she knew", phoneticTranscription: "sa-bi-a" },
            { targetText: "podía", english: "I/he/she could", phoneticTranscription: "po-di-a" },
            { targetText: "quería", english: "I/he/she wanted", phoneticTranscription: "ke-ri-a" },
            { targetText: "decía", english: "I/he/she used to say", phoneticTranscription: "de-si-a" },
            { targetText: "daba", english: "I/he/she used to give", phoneticTranscription: "da-ba" },
            { targetText: "pensaba", english: "I/he/she thought", phoneticTranscription: "pen-sa-ba" },
            { targetText: "trabajaba", english: "I/he/she used to work", phoneticTranscription: "tra-ba-ha-ba" },
            { targetText: "estudiaba", english: "I/he/she used to study", phoneticTranscription: "es-tu-dja-ba" },
            { targetText: "jugaba", english: "I/he/she used to play", phoneticTranscription: "hu-ga-ba" },
            { targetText: "siempre", english: "always", phoneticTranscription: "sjem-pre" },
            { targetText: "nunca", english: "never", phoneticTranscription: "nun-ka" },
            { targetText: "a veces", english: "sometimes", phoneticTranscription: "a be-ses" },
            { targetText: "frecuentemente", english: "frequently", phoneticTranscription: "fre-kwen-te-men-te" },
            { targetText: "todos los días", english: "every day", phoneticTranscription: "to-dos los di-as" },
            { targetText: "cada semana", english: "every week", phoneticTranscription: "ka-da se-ma-na" },
            { targetText: "cuando era niño", english: "when I was a child", phoneticTranscription: "kwan-do e-ra ni-nyo" },
            { targetText: "de pequeño", english: "as a child", phoneticTranscription: "de pe-ke-nyo" },
            { targetText: "antes", english: "before", phoneticTranscription: "an-tes" },
            { targetText: "mientras", english: "while", phoneticTranscription: "mjen-tras" },
            { targetText: "solía", english: "I/he/she used to", phoneticTranscription: "so-li-a" },
            { targetText: "normalmente", english: "normally", phoneticTranscription: "nor-mal-men-te" }
        ]
    },
    {
        moduleId: "spanish_a2_m3",
        theme: "Conversational Connectors",
        order: 3,
        level: "a2",
        targetWordCount: 25,
        vocabularyItems: [
            { targetText: "entonces", english: "then/so", phoneticTranscription: "en-ton-ses" },
            { targetText: "luego", english: "then/later", phoneticTranscription: "lwe-go" },
            { targetText: "después", english: "afterwards", phoneticTranscription: "des-pwes" },
            { targetText: "además", english: "besides/furthermore", phoneticTranscription: "a-de-mas" },
            { targetText: "sin embargo", english: "however", phoneticTranscription: "sin em-bar-go" },
            { targetText: "por eso", english: "that's why/therefore", phoneticTranscription: "por e-so" },
            { targetText: "así que", english: "so", phoneticTranscription: "a-si ke" },
            { targetText: "aunque", english: "although", phoneticTranscription: "awn-ke" },
            { targetText: "porque", english: "because", phoneticTranscription: "por-ke" },
            { targetText: "como", english: "as/since", phoneticTranscription: "ko-mo" },
            { targetText: "pero", english: "but", phoneticTranscription: "pe-ro" },
            { targetText: "sino", english: "but rather", phoneticTranscription: "si-no" },
            { targetText: "o sea", english: "in other words", phoneticTranscription: "o se-a" },
            { targetText: "es decir", english: "that is to say", phoneticTranscription: "es de-sir" },
            { targetText: "por ejemplo", english: "for example", phoneticTranscription: "por e-hem-plo" },
            { targetText: "en realidad", english: "actually", phoneticTranscription: "en re-a-li-dad" },
            { targetText: "de hecho", english: "in fact", phoneticTranscription: "de e-cho" },
            { targetText: "por lo tanto", english: "therefore", phoneticTranscription: "por lo tan-to" },
            { targetText: "al final", english: "in the end", phoneticTranscription: "al fi-nal" },
            { targetText: "primero", english: "first", phoneticTranscription: "pri-me-ro" },
            { targetText: "segundo", english: "second", phoneticTranscription: "se-gun-do" },
            { targetText: "por último", english: "finally", phoneticTranscription: "por ul-ti-mo" },
            { targetText: "también", english: "also", phoneticTranscription: "tam-bjen" },
            { targetText: "tampoco", english: "neither", phoneticTranscription: "tam-po-ko" },
            { targetText: "quizás", english: "maybe/perhaps", phoneticTranscription: "ki-sas" }
        ]
    },
    {
        moduleId: "spanish_a2_m4",
        theme: "Por vs Para",
        order: 4,
        level: "a2",
        targetWordCount: 25,
        vocabularyItems: [
            { targetText: "por la mañana", english: "in the morning", phoneticTranscription: "por la ma-nya-na" },
            { targetText: "por la tarde", english: "in the afternoon", phoneticTranscription: "por la tar-de" },
            { targetText: "por la noche", english: "in the evening", phoneticTranscription: "por la no-che" },
            { targetText: "por favor", english: "please", phoneticTranscription: "por fa-bor" },
            { targetText: "por supuesto", english: "of course", phoneticTranscription: "por su-pwes-to" },
            { targetText: "por fin", english: "finally/at last", phoneticTranscription: "por fin" },
            { targetText: "por ejemplo", english: "for example", phoneticTranscription: "por e-hem-plo" },
            { targetText: "por eso", english: "that's why", phoneticTranscription: "por e-so" },
            { targetText: "gracias por", english: "thanks for", phoneticTranscription: "gra-syas por" },
            { targetText: "por aquí", english: "around here", phoneticTranscription: "por a-ki" },
            { targetText: "por allí", english: "over there", phoneticTranscription: "por a-yi" },
            { targetText: "para mí", english: "for me", phoneticTranscription: "pa-ra mi" },
            { targetText: "para ti", english: "for you", phoneticTranscription: "pa-ra ti" },
            { targetText: "para siempre", english: "forever", phoneticTranscription: "pa-ra sjem-pre" },
            { targetText: "para qué", english: "what for", phoneticTranscription: "pa-ra ke" },
            { targetText: "estudiar para", english: "study for/to", phoneticTranscription: "es-tu-djar pa-ra" },
            { targetText: "listo para", english: "ready for", phoneticTranscription: "lis-to pa-ra" },
            { targetText: "caminar por", english: "walk through", phoneticTranscription: "ka-mi-nar por" },
            { targetText: "hablar por teléfono", english: "talk on the phone", phoneticTranscription: "a-blar por te-le-fo-no" },
            { targetText: "pagar por", english: "pay for", phoneticTranscription: "pa-gar por" },
            { targetText: "es para", english: "it is for", phoneticTranscription: "es pa-ra" },
            { targetText: "ir para", english: "go towards", phoneticTranscription: "ir pa-ra" },
            { targetText: "trabajar para", english: "work for", phoneticTranscription: "tra-ba-har pa-ra" },
            { targetText: "para mañana", english: "for tomorrow/by tomorrow", phoneticTranscription: "pa-ra ma-nya-na" },
            { targetText: "por ciento", english: "percent", phoneticTranscription: "por sjen-to" }
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
            { targetText: "peinarse", english: "to comb one's hair", phoneticTranscription: "pej-nar-se" },
            { targetText: "afeitarse", english: "to shave", phoneticTranscription: "a-fej-tar-se" },
            { targetText: "maquillarse", english: "to put on makeup", phoneticTranscription: "ma-ki-yar-se" },
            { targetText: "vestirse", english: "to get dressed", phoneticTranscription: "bes-tir-se" },
            { targetText: "ponerse", english: "to put on (clothes)", phoneticTranscription: "po-ner-se" },
            { targetText: "quitarse", english: "to take off (clothes)", phoneticTranscription: "ki-tar-se" },
            { targetText: "acostarse", english: "to go to bed", phoneticTranscription: "a-kos-tar-se" },
            { targetText: "dormirse", english: "to fall asleep", phoneticTranscription: "dor-mir-se" },
            { targetText: "llamarse", english: "to be called/named", phoneticTranscription: "ya-mar-se" },
            { targetText: "sentarse", english: "to sit down", phoneticTranscription: "sen-tar-se" },
            { targetText: "sentirse", english: "to feel", phoneticTranscription: "sen-tir-se" },
            { targetText: "preocuparse", english: "to worry", phoneticTranscription: "pre-o-ku-par-se" },
            { targetText: "acordarse", english: "to remember", phoneticTranscription: "a-kor-dar-se" },
            { targetText: "olvidarse", english: "to forget", phoneticTranscription: "ol-bi-dar-se" },
            { targetText: "irse", english: "to leave/go away", phoneticTranscription: "ir-se" },
            { targetText: "quedarse", english: "to stay", phoneticTranscription: "ke-dar-se" },
            { targetText: "divertirse", english: "to have fun", phoneticTranscription: "di-ber-tir-se" },
            { targetText: "aburrirse", english: "to get bored", phoneticTranscription: "a-bu-rrir-se" },
            { targetText: "enojarse", english: "to get angry", phoneticTranscription: "e-no-har-se" },
            { targetText: "cansarse", english: "to get tired", phoneticTranscription: "kan-sar-se" },
            { targetText: "relajarse", english: "to relax", phoneticTranscription: "re-la-har-se" },
            { targetText: "prepararse", english: "to get ready", phoneticTranscription: "pre-pa-rar-se" },
            { targetText: "despedirse", english: "to say goodbye", phoneticTranscription: "des-pe-dir-se" },
            { targetText: "reunirse", english: "to meet/gather", phoneticTranscription: "re-u-nir-se" }
        ]
    },
    {
        moduleId: "spanish_a2_m6",
        theme: "Comparatives & Superlatives",
        order: 6,
        level: "a2",
        targetWordCount: 25,
        vocabularyItems: [
            { targetText: "más que", english: "more than", phoneticTranscription: "mas ke" },
            { targetText: "menos que", english: "less than", phoneticTranscription: "me-nos ke" },
            { targetText: "tan...como", english: "as...as", phoneticTranscription: "tan ko-mo" },
            { targetText: "tanto como", english: "as much as", phoneticTranscription: "tan-to ko-mo" },
            { targetText: "mejor", english: "better", phoneticTranscription: "me-hor" },
            { targetText: "peor", english: "worse", phoneticTranscription: "pe-or" },
            { targetText: "mayor", english: "older/bigger", phoneticTranscription: "ma-yor" },
            { targetText: "menor", english: "younger/smaller", phoneticTranscription: "me-nor" },
            { targetText: "el más", english: "the most", phoneticTranscription: "el mas" },
            { targetText: "el menos", english: "the least", phoneticTranscription: "el me-nos" },
            { targetText: "el mejor", english: "the best", phoneticTranscription: "el me-hor" },
            { targetText: "el peor", english: "the worst", phoneticTranscription: "el pe-or" },
            { targetText: "más grande", english: "bigger", phoneticTranscription: "mas gran-de" },
            { targetText: "más pequeño", english: "smaller", phoneticTranscription: "mas pe-ke-nyo" },
            { targetText: "más alto", english: "taller", phoneticTranscription: "mas al-to" },
            { targetText: "más bajo", english: "shorter", phoneticTranscription: "mas ba-ho" },
            { targetText: "más rápido", english: "faster", phoneticTranscription: "mas ra-pi-do" },
            { targetText: "más lento", english: "slower", phoneticTranscription: "mas len-to" },
            { targetText: "más fácil", english: "easier", phoneticTranscription: "mas fa-sil" },
            { targetText: "más difícil", english: "more difficult", phoneticTranscription: "mas di-fi-sil" },
            { targetText: "más caro", english: "more expensive", phoneticTranscription: "mas ka-ro" },
            { targetText: "más barato", english: "cheaper", phoneticTranscription: "mas ba-ra-to" },
            { targetText: "igual que", english: "the same as", phoneticTranscription: "i-gwal ke" },
            { targetText: "diferente de", english: "different from", phoneticTranscription: "di-fe-ren-te de" },
            { targetText: "superior a", english: "superior to", phoneticTranscription: "su-pe-rjor a" }
        ]
    },
    {
        moduleId: "spanish_a2_m7",
        theme: "Object Pronouns",
        order: 7,
        level: "a2",
        targetWordCount: 20,
        vocabularyItems: [
            { targetText: "me", english: "me (direct/indirect)", phoneticTranscription: "me" },
            { targetText: "te", english: "you (direct/indirect)", phoneticTranscription: "te" },
            { targetText: "lo", english: "him/it (masculine)", phoneticTranscription: "lo" },
            { targetText: "la", english: "her/it (feminine)", phoneticTranscription: "la" },
            { targetText: "le", english: "to him/her (indirect)", phoneticTranscription: "le" },
            { targetText: "nos", english: "us (direct/indirect)", phoneticTranscription: "nos" },
            { targetText: "os", english: "you all (direct/indirect)", phoneticTranscription: "os" },
            { targetText: "los", english: "them (masculine)", phoneticTranscription: "los" },
            { targetText: "las", english: "them (feminine)", phoneticTranscription: "las" },
            { targetText: "les", english: "to them (indirect)", phoneticTranscription: "les" },
            { targetText: "me gusta", english: "I like (it pleases me)", phoneticTranscription: "me gus-ta" },
            { targetText: "te doy", english: "I give you", phoneticTranscription: "te doy" },
            { targetText: "lo veo", english: "I see him/it", phoneticTranscription: "lo be-o" },
            { targetText: "la conozco", english: "I know her", phoneticTranscription: "la ko-nos-ko" },
            { targetText: "le digo", english: "I tell him/her", phoneticTranscription: "le di-go" },
            { targetText: "nos ayuda", english: "he/she helps us", phoneticTranscription: "nos a-yu-da" },
            { targetText: "se lo doy", english: "I give it to him/her", phoneticTranscription: "se lo doy" },
            { targetText: "me lo da", english: "he/she gives it to me", phoneticTranscription: "me lo da" },
            { targetText: "te lo digo", english: "I tell you (it)", phoneticTranscription: "te lo di-go" },
            { targetText: "nos lo explica", english: "he/she explains it to us", phoneticTranscription: "nos lo eks-pli-ka" }
        ]
    },
    {
        moduleId: "spanish_a2_m8",
        theme: "Commands (Imperative)",
        order: 8,
        level: "a2",
        targetWordCount: 25,
        vocabularyItems: [
            { targetText: "habla", english: "speak (tú)", phoneticTranscription: "a-bla" },
            { targetText: "come", english: "eat (tú)", phoneticTranscription: "ko-me" },
            { targetText: "escribe", english: "write (tú)", phoneticTranscription: "es-kri-be" },
            { targetText: "hable", english: "speak (usted)", phoneticTranscription: "a-ble" },
            { targetText: "coma", english: "eat (usted)", phoneticTranscription: "ko-ma" },
            { targetText: "escriba", english: "write (usted)", phoneticTranscription: "es-kri-ba" },
            { targetText: "ven", english: "come (tú)", phoneticTranscription: "ben" },
            { targetText: "venga", english: "come (usted)", phoneticTranscription: "ben-ga" },
            { targetText: "haz", english: "do/make (tú)", phoneticTranscription: "as" },
            { targetText: "haga", english: "do/make (usted)", phoneticTranscription: "a-ga" },
            { targetText: "di", english: "say/tell (tú)", phoneticTranscription: "di" },
            { targetText: "diga", english: "say/tell (usted)", phoneticTranscription: "di-ga" },
            { targetText: "pon", english: "put (tú)", phoneticTranscription: "pon" },
            { targetText: "ponga", english: "put (usted)", phoneticTranscription: "pon-ga" },
            { targetText: "sal", english: "leave/go out (tú)", phoneticTranscription: "sal" },
            { targetText: "salga", english: "leave/go out (usted)", phoneticTranscription: "sal-ga" },
            { targetText: "ten", english: "have (tú)", phoneticTranscription: "ten" },
            { targetText: "tenga", english: "have (usted)", phoneticTranscription: "ten-ga" },
            { targetText: "no hables", english: "don't speak (tú)", phoneticTranscription: "no a-bles" },
            { targetText: "no comas", english: "don't eat (tú)", phoneticTranscription: "no ko-mas" },
            { targetText: "no escribas", english: "don't write (tú)", phoneticTranscription: "no es-kri-bas" },
            { targetText: "escucha", english: "listen (tú)", phoneticTranscription: "es-ku-cha" },
            { targetText: "mira", english: "look (tú)", phoneticTranscription: "mi-ra" },
            { targetText: "espera", english: "wait (tú)", phoneticTranscription: "es-pe-ra" },
            { targetText: "ayúdame", english: "help me (tú)", phoneticTranscription: "a-yu-da-me" }
        ]
    },
    {
        moduleId: "spanish_a2_m9",
        theme: "Progressive Tenses",
        order: 9,
        level: "a2",
        targetWordCount: 20,
        vocabularyItems: [
            { targetText: "estoy hablando", english: "I am speaking", phoneticTranscription: "es-toy a-blan-do" },
            { targetText: "estás comiendo", english: "you are eating", phoneticTranscription: "es-tas ko-mjen-do" },
            { targetText: "está escribiendo", english: "he/she is writing", phoneticTranscription: "es-ta es-kri-bjen-do" },
            { targetText: "estamos estudiando", english: "we are studying", phoneticTranscription: "es-ta-mos es-tu-djan-do" },
            { targetText: "están trabajando", english: "they are working", phoneticTranscription: "es-tan tra-ba-han-do" },
            { targetText: "estoy leyendo", english: "I am reading", phoneticTranscription: "es-toy le-yen-do" },
            { targetText: "está durmiendo", english: "he/she is sleeping", phoneticTranscription: "es-ta dur-mjen-do" },
            { targetText: "estamos viendo", english: "we are watching", phoneticTranscription: "es-ta-mos bjen-do" },
            { targetText: "están haciendo", english: "they are doing", phoneticTranscription: "es-tan a-sjen-do" },
            { targetText: "estoy pensando", english: "I am thinking", phoneticTranscription: "es-toy pen-san-do" },
            { targetText: "está lloviendo", english: "it is raining", phoneticTranscription: "es-ta yo-bjen-do" },
            { targetText: "estoy aprendiendo", english: "I am learning", phoneticTranscription: "es-toy a-pren-djen-do" },
            { targetText: "están jugando", english: "they are playing", phoneticTranscription: "es-tan hu-gan-do" },
            { targetText: "estoy corriendo", english: "I am running", phoneticTranscription: "es-toy ko-rjen-do" },
            { targetText: "está cocinando", english: "he/she is cooking", phoneticTranscription: "es-ta ko-si-nan-do" },
            { targetText: "estamos bailando", english: "we are dancing", phoneticTranscription: "es-ta-mos baj-lan-do" },
            { targetText: "están cantando", english: "they are singing", phoneticTranscription: "es-tan kan-tan-do" },
            { targetText: "estoy esperando", english: "I am waiting", phoneticTranscription: "es-toy es-pe-ran-do" },
            { targetText: "está limpiando", english: "he/she is cleaning", phoneticTranscription: "es-ta lim-pjan-do" },
            { targetText: "estamos viajando", english: "we are traveling", phoneticTranscription: "es-ta-mos bja-han-do" }
        ]
    },
    {
        moduleId: "spanish_a2_m10",
        theme: "A2 Practical Conversations",
        order: 10,
        level: "a2",
        targetWordCount: 25,
        vocabularyItems: [
            { targetText: "¿Cómo estás?", english: "How are you?", phoneticTranscription: "ko-mo es-tas" },
            { targetText: "¿Qué tal?", english: "How's it going?", phoneticTranscription: "ke tal" },
            { targetText: "¿Qué haces?", english: "What are you doing?", phoneticTranscription: "ke a-ses" },
            { targetText: "¿Dónde vives?", english: "Where do you live?", phoneticTranscription: "don-de bi-bes" },
            { targetText: "¿Cuántos años tienes?", english: "How old are you?", phoneticTranscription: "kwan-tos a-nyos tje-nes" },
            { targetText: "Me llamo...", english: "My name is...", phoneticTranscription: "me ya-mo" },
            { targetText: "Soy de...", english: "I'm from...", phoneticTranscription: "soy de" },
            { targetText: "Tengo...años", english: "I am...years old", phoneticTranscription: "ten-go a-nyos" },
            { targetText: "¿Te gusta...?", english: "Do you like...?", phoneticTranscription: "te gus-ta" },
            { targetText: "Me encanta", english: "I love it", phoneticTranscription: "me en-kan-ta" },
            { targetText: "No me gusta", english: "I don't like it", phoneticTranscription: "no me gus-ta" },
            { targetText: "¿Puedes ayudarme?", english: "Can you help me?", phoneticTranscription: "pwe-des a-yu-dar-me" },
            { targetText: "Por supuesto", english: "Of course", phoneticTranscription: "por su-pwes-to" },
            { targetText: "Lo siento", english: "I'm sorry", phoneticTranscription: "lo sjen-to" },
            { targetText: "No importa", english: "It doesn't matter", phoneticTranscription: "no im-por-ta" },
            { targetText: "¿Cuánto cuesta?", english: "How much does it cost?", phoneticTranscription: "kwan-to kwes-ta" },
            { targetText: "¿Dónde está...?", english: "Where is...?", phoneticTranscription: "don-de es-ta" },
            { targetText: "¿A qué hora...?", english: "At what time...?", phoneticTranscription: "a ke o-ra" },
            { targetText: "Hasta luego", english: "See you later", phoneticTranscription: "as-ta lwe-go" },
            { targetText: "Nos vemos", english: "See you", phoneticTranscription: "nos be-mos" },
            { targetText: "Que tengas un buen día", english: "Have a good day", phoneticTranscription: "ke ten-gas un bwen di-a" },
            { targetText: "¿Me entiendes?", english: "Do you understand me?", phoneticTranscription: "me en-tjen-des" },
            { targetText: "No entiendo", english: "I don't understand", phoneticTranscription: "no en-tjen-do" },
            { targetText: "¿Puedes repetir?", english: "Can you repeat?", phoneticTranscription: "pwe-des re-pe-tir" },
            { targetText: "Más despacio, por favor", english: "Slower, please", phoneticTranscription: "mas des-pa-sjo por fa-bor" }
        ]
    }
];

async function populateSpanishA2() {
    console.log('🚀 Populating Spanish A2 with comprehensive content...\n');

    let totalWords = 0;

    for (const module of spanishA2Modules) {
        await db.collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a2')
            .collection('modules')
            .doc(module.moduleId)
            .set(module);

        totalWords += module.vocabularyItems.length;
        console.log(`✓ ${module.theme} (${module.vocabularyItems.length} words)`);
    }

    console.log(`\n✅ Upload complete! Total: ${totalWords} words`);
}

populateSpanishA2().then(() => process.exit(0));
