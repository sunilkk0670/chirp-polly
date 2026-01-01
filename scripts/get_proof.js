const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function getProof() {
    const doc = await db.collection('languages').doc('spanish').collection('levels').doc('a2').collection('modules').doc('spanish_a2_m1').get();
    const data = doc.data();
    console.log("--- SPANISH A2 MODULE 1 PROOF ---");
    data.lessons.slice(0, 5).forEach((l, i) => {
        console.log(`${i + 1}. ${l.target_text} - ${l.english}`);
    });
}

getProof();
