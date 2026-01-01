const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkCasing() {
    const snap = await db.collection('languages').get();
    console.log('--- ALL LANGUAGE IDS ---');
    snap.forEach(doc => {
        console.log(`ID: "${doc.id}"`);
    });
}

checkCasing().catch(console.error);
