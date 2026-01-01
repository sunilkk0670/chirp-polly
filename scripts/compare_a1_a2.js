const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function compareA1A2() {
    console.log('\n🔍 Comparing Japanese A1 vs A2 Structure...\n');

    // Get A1 module
    const a1Snapshot = await db
        .collection('languages')
        .doc('japanese')
        .collection('levels')
        .doc('a1')
        .collection('modules')
        .limit(1)
        .get();

    // Get A2 module
    const a2Snapshot = await db
        .collection('languages')
        .doc('japanese')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .limit(1)
        .get();

    console.log('📚 A1 Structure:');
    if (!a1Snapshot.empty) {
        const a1Data = a1Snapshot.docs[0].data();
        console.log('Fields:', Object.keys(a1Data));
        console.log('Has lessons?', a1Data.lessons ? 'YES' : 'NO');
        console.log('Has vocabularyItems?', a1Data.vocabularyItems ? 'YES' : 'NO');

        if (a1Data.lessons && a1Data.lessons[0]) {
            console.log('First lesson structure:', Object.keys(a1Data.lessons[0]));
            if (a1Data.lessons[0].vocabularyItems) {
                console.log('First vocab item:', JSON.stringify(a1Data.lessons[0].vocabularyItems[0], null, 2));
            }
        }
    }

    console.log('\n📚 A2 Structure:');
    if (!a2Snapshot.empty) {
        const a2Data = a2Snapshot.docs[0].data();
        console.log('Fields:', Object.keys(a2Data));
        console.log('Has lessons?', a2Data.lessons ? 'YES' : 'NO');
        console.log('Has vocabularyItems?', a2Data.vocabularyItems ? 'YES' : 'NO');

        if (a2Data.vocabularyItems && a2Data.vocabularyItems[0]) {
            console.log('First vocab item:', a2Data.vocabularyItems[0]);
        }
    }

    console.log('\n✅ Comparison complete\n');
    process.exit(0);
}

compareA1A2().catch(console.error);
