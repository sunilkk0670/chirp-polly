const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkKoreanA2Data() {
    console.log('🔍 Checking Korean A2 Data Structure...\n');

    const modulesSnapshot = await db
        .collection('languages')
        .doc('korean')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .limit(1)
        .get();

    if (modulesSnapshot.empty) {
        console.log('❌ No Korean A2 modules found!');
        return;
    }

    const data = modulesSnapshot.docs[0].data();
    console.log('Module:', data.theme);

    if (data.lessons) {
        console.log('Found lessons array. Length:', data.lessons.length);
        console.log('First lesson sample:', JSON.stringify(data.lessons[0], null, 2));
    }

    process.exit(0);
}

checkKoreanA2Data().catch(console.error);
