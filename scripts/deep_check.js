const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deepCheck() {
    const lang = 'french';
    const level = 'a1';

    console.log(`Checking path: languages/${lang}/levels/${level}/modules`);
    const snap = await db.collection('languages').doc(lang).collection('levels').doc(level).collection('modules').get();

    console.log(`Total docs found: ${snap.size}`);
    snap.forEach(doc => {
        const data = doc.data();
        console.log(`- ID: ${doc.id}, Order: ${data.order}, Theme: ${data.theme}, Items: ${data.vocabularyItems ? data.vocabularyItems.length : 0}`);
    });

    console.log('\nChecking with .orderBy("order") query:');
    const orderSnap = await db.collection('languages').doc(lang)
        .collection('levels').doc(level)
        .collection('modules')
        .orderBy('order')
        .get();

    console.log(`Ordered docs found: ${orderSnap.size}`);
}

deepCheck().catch(console.error);
