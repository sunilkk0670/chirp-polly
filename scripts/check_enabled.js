const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkEnabled() {
    const doc = await db.collection('languages').doc('french').get();
    if (doc.exists) {
        console.log(`French document exists. Data:`, doc.data());
    } else {
        console.log(`French document does NOT exist!`);
    }

    // Check level document
    const levelDoc = await db.collection('languages').doc('french').collection('levels').doc('a1').get();
    if (levelDoc.exists) {
        console.log(`A1 level document exists. Data:`, levelDoc.data());
    } else {
        console.log(`A1 level document does NOT exist!`);
    }
}

checkEnabled().catch(console.error);
