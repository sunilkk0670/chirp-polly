const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkJapaneseA2Detail() {
    console.log('🔍 Checking Japanese A2 Module Detail...\n');

    const modulesSnapshot = await db
        .collection('languages')
        .doc('japanese')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .get();

    console.log(`Total modules: ${modulesSnapshot.size}\n`);

    modulesSnapshot.docs.forEach((doc, idx) => {
        const data = doc.data();
        const lessonCount = data.lessons ? data.lessons.length : 0;
        const vocabCount = data.vocabularyItems ? data.vocabularyItems.length : 0;

        console.log(`Module ${idx + 1}: ${data.theme}`);
        console.log(`  Lessons: ${lessonCount}`);
        console.log(`  VocabularyItems: ${vocabCount}`);
        console.log(`  Total words: ${lessonCount + vocabCount}`);

        if (lessonCount > 0 && data.lessons[0]) {
            console.log(`  First lesson sample:`, JSON.stringify(data.lessons[0], null, 2));
        }
        console.log('');
    });

    process.exit(0);
}

checkJapaneseA2Detail().catch(console.error);
