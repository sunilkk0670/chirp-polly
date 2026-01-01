const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// B1 Spanish Modules (12 modules, 120 words each)
const spanishB1Modules = [
    {
        moduleId: 'spanish_b1_m1',
        theme: 'Subjunctive Mood (Present)',
        order: 1,
        lessons: [
            { targetText: 'Espero que vengas', phoneticTranscription: 'es-PEH-roh keh VEHN-gas', english: 'I hope you come', notes: 'Present subjunctive after esperar que' },
            { targetText: 'Dudo que sea verdad', phoneticTranscription: 'DOO-doh keh SEH-ah vehr-DAHD', english: 'I doubt it\'s true', notes: 'Subjunctive after doubt' },
            { targetText: 'Es importante que estudies', phoneticTranscription: 'es eem-por-TAHN-teh keh es-TOO-dyehs', english: 'It\'s important that you study', notes: 'Subjunctive after impersonal expressions' },
            { targetText: 'Quiero que me ayudes', phoneticTranscription: 'KYEH-roh keh meh ah-YOO-dehs', english: 'I want you to help me', notes: 'Subjunctive after querer que' },
            { targetText: 'No creo que llueva', phoneticTranscription: 'noh KREH-oh keh YWAY-vah', english: 'I don\'t think it will rain', notes: 'Subjunctive after negative belief' },
            // ... (add 115 more words for this module)
        ].concat(generateSpanishB1Words(1, 115)),
        liarGameData: {
            trap: 'Espero que vienes mañana',
            correctVersion: 'Espero que vengas mañana',
            explanation: 'After "espero que", we use the present subjunctive "vengas", not the indicative "vienes".'
        }
    },
    // ... (11 more Spanish B1 modules)
];

// B1 Japanese Modules (12 modules, 120 words each)
const japaneseB1Modules = [
    {
        moduleId: 'japanese_b1_m1',
        theme: 'N4 Kanji Part 1 (50 Kanji)',
        order: 1,
        lessons: [
            { targetText: '漢字', romaji: 'kanji', english: 'Chinese characters', notes: 'N4 kanji, compound word' },
            { targetText: '勉強', romaji: 'benkyou', english: 'study', notes: 'N4 kanji, する verb' },
            { targetText: '教室', romaji: 'kyoushitsu', english: 'classroom', notes: 'N4 kanji, compound' },
            { targetText: '図書館', romaji: 'toshokan', english: 'library', notes: 'N4 kanji, 3-kanji compound' },
            { targetText: '病院', romaji: 'byouin', english: 'hospital', notes: 'N4 kanji, compound' },
            // ... (add 115 more words for this module)
        ].concat(generateJapaneseB1Words(1, 115)),
        liarGameData: {
            trap: '勉強します vs 勉強しました',
            correctVersion: '勉強します (present/future) vs 勉強しました (past)',
            explanation: 'The ます form indicates present/future, while ました indicates past tense.'
        }
    },
    // ... (11 more Japanese B1 modules)
];

// B1 Korean Modules (12 modules, 120 words each)
const koreanB1Modules = [
    {
        moduleId: 'korean_b1_m1',
        theme: 'Formal Speech Levels',
        order: 1,
        lessons: [
            { targetText: '하십니다', phoneticTranscription: 'hasipnida', english: 'do/does (formal)', notes: 'Highest formal level' },
            { targetText: '가십니다', phoneticTranscription: 'gasipnida', english: 'go/goes (formal)', notes: 'Formal speech ending' },
            { targetText: '먹습니다', phoneticTranscription: 'meoksupnida', english: 'eat/eats (formal)', notes: 'Formal present tense' },
            { targetText: '말씀하시다', phoneticTranscription: 'malsseum-hasida', english: 'to speak (honorific)', notes: 'Honorific verb for "speak"' },
            { targetText: '계시다', phoneticTranscription: 'gyesida', english: 'to be/exist (honorific)', notes: 'Honorific form of 있다' },
            // ... (add 115 more words for this module)
        ].concat(generateKoreanB1Words(1, 115)),
        liarGameData: {
            trap: '가요 vs 갑니다',
            correctVersion: '가요 (polite informal) vs 갑니다 (formal)',
            explanation: '가요 is polite but informal, while 갑니다 is the formal speech level used in official settings.'
        }
    },
    // ... (11 more Korean B1 modules)
];

// Helper functions to generate remaining words
function generateSpanishB1Words(moduleNum, count) {
    const words = [];
    // Generate contextually appropriate B1-level Spanish vocabulary
    // This is a placeholder - actual implementation would have full vocabulary
    for (let i = 0; i < count; i++) {
        words.push({
            targetText: `palabra_${moduleNum}_${i}`,
            phoneticTranscription: `pronunciation_${i}`,
            english: `meaning_${i}`,
            notes: `B1 Spanish context`
        });
    }
    return words;
}

function generateJapaneseB1Words(moduleNum, count) {
    const words = [];
    for (let i = 0; i < count; i++) {
        words.push({
            targetText: `漢字_${i}`,
            romaji: `romaji_${i}`,
            english: `meaning_${i}`,
            notes: `N4 kanji context`
        });
    }
    return words;
}

function generateKoreanB1Words(moduleNum, count) {
    const words = [];
    for (let i = 0; i < count; i++) {
        words.push({
            targetText: `단어_${i}`,
            phoneticTranscription: `pronunciation_${i}`,
            english: `meaning_${i}`,
            notes: `B1 Korean context`
        });
    }
    return words;
}

async function uploadB1Modules() {
    console.log('🚀 Starting B1 Module Upload for Priority Languages...\n');

    const languages = [
        { id: 'spanish', modules: spanishB1Modules },
        { id: 'japanese', modules: japaneseB1Modules },
        { id: 'korean', modules: koreanB1Modules }
    ];

    for (const lang of languages) {
        console.log(`\n📚 Uploading ${lang.id.toUpperCase()} B1 modules...`);

        // Create B1 level document
        await db
            .collection('languages')
            .doc(lang.id)
            .collection('levels')
            .doc('b1')
            .set({
                name: 'B1 - Intermediate',
                description: 'Can understand main points of clear standard input on familiar matters',
                order: 3,
                cefr: 'B1'
            });

        console.log(`  ✅ Created B1 level document for ${lang.id}`);

        // Upload modules
        for (const module of lang.modules) {
            await db
                .collection('languages')
                .doc(lang.id)
                .collection('levels')
                .doc('b1')
                .collection('modules')
                .doc(module.moduleId)
                .set(module);

            console.log(`  📦 Uploaded: ${module.theme}`);
        }

        console.log(`  ✅ Completed ${lang.id} B1 (${lang.modules.length} modules)`);
    }

    console.log('\n🎉 B1 Upload Complete!\n');
    process.exit(0);
}

// Note: This is a template script. The actual implementation needs full vocabulary generation
// For now, this demonstrates the structure. We'll create the full content next.

console.log('⚠️  This is a template script.');
console.log('📝 Full B1 vocabulary generation needed before upload.');
console.log('💡 Run generate_b1_priority.js first to create complete modules.');
