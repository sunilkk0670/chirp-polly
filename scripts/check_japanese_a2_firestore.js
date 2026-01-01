const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkJapaneseA2() {
    console.log('🔍 Checking Japanese A2 modules in Firestore...\n');

    const snapshot = await db.collection('languages')
        .doc('japanese')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .orderBy('order')
        .get();

    console.log(`Found ${snapshot.docs.length} modules:\n`);

    snapshot.docs.forEach(doc => {
        const data = doc.data();
        const wordCount = data.vocabularyItems?.length ||
            data.lessons?.length ||
            data.vocabularyCount ||
            0;
        console.log(`📦 ${doc.id}`);
        console.log(`   Theme: ${data.theme}`);
        console.log(`   Order: ${data.order}`);
        console.log(`   Words: ${wordCount}`);
        console.log(`   Has vocabularyItems: ${!!data.vocabularyItems}`);
        console.log(`   Has lessons: ${!!data.lessons}`);
        console.log('');
    });
}

checkJapaneseA2().then(() => process.exit(0));
