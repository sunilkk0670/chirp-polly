const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function countSpanishA2VocabularyItems() {
    console.log('🔍 Counting Spanish A2 vocabularyItems (ignoring lessons)...\n');

    const snapshot = await db.collection('languages')
        .doc('spanish')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .orderBy('order')
        .get();

    let totalVocabItems = 0;

    console.log(`Found ${snapshot.docs.length} modules:\n`);

    snapshot.docs.forEach(doc => {
        const data = doc.data();
        const vocabItems = data.vocabularyItems || [];
        const vocabCount = vocabItems.length;

        totalVocabItems += vocabCount;

        console.log(`${doc.id} (order: ${data.order})`);
        console.log(`  Theme: ${data.theme}`);
        console.log(`  vocabularyItems.length: ${vocabCount}`);
        console.log('');
    });

    console.log('═'.repeat(50));
    console.log(`\n📊 FINAL SUM: ${totalVocabItems} words\n`);
    console.log('═'.repeat(50));
}

countSpanishA2VocabularyItems().then(() => process.exit(0));
