const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkSpanishA2Data() {
    console.log('🔍 Checking Spanish A2 Data Structure...\n');

    const modulesSnapshot = await db
        .collection('languages')
        .doc('spanish')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .limit(1)
        .get();

    if (modulesSnapshot.empty) {
        console.log('❌ No Spanish A2 modules found!');
        return;
    }

    const data = modulesSnapshot.docs[0].data();
    console.log('Module:', data.theme);
    console.log('Keys:', Object.keys(data));

    if (data.lessons) {
        console.log('Found lessons array. Length:', data.lessons.length);
        console.log('First lesson sample:', JSON.stringify(data.lessons[0], null, 2));
    } else if (data.vocabularyItems) {
        console.log('Found vocabularyItems array. Length:', data.vocabularyItems.length);
    } else {
        console.log('⚠️ No vocabulary found in expected fields.');
    }

    process.exit(0);
}

checkSpanishA2Data().catch(console.error);
