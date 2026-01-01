const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function verifyLive(lang, level, moduleId) {
    console.log(`🔍 FETCHING LIVE DATA: languages/${lang}/levels/${level}/modules/${moduleId}`);

    const doc = await db.collection('languages').doc(lang)
        .collection('levels').doc(level)
        .collection('modules').doc(moduleId).get();

    if (!doc.exists) {
        console.error('❌ Document does not exist in Firestore!');
        return;
    }

    const data = doc.data();
    const items = data.vocabularyItems || [];

    console.log('\n--- LIVE FIRESTORE PROOF ---');
    console.log(`Total items found: ${items.length}`);

    if (items.length > 0) {
        console.log(`\nWord #1 [Index 0]:`);
        console.log(JSON.stringify(items[0], null, 2));
    }

    if (items.length > 8) {
        console.log(`\nWord #9 [Index 8]:`);
        console.log(JSON.stringify(items[8], null, 2));
    }

    if (items.length >= 10) {
        const isDuplicate = items[0].word === items[8].word;
        console.log(`\nIntegrity Check (Word 1 vs Word 9): ${isDuplicate ? 'FAIL (Identical)' : 'PASS (Different)'}`);
    }
}

verifyLive('french', 'a1', 'fr_a1_m3').catch(console.error);
