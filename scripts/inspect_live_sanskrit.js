const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function inspectLive() {
    console.log("Inspecting live sanskrit_a1_m1...");
    const doc = await db.collection('modules').doc('sanskrit_a1_m1').get();

    if (!doc.exists) {
        console.log("Doc does not exist!");
        return;
    }

    const data = doc.data();
    const items = data.vocabularyItems || [];

    console.log(`Word Count: ${items.length}`);
    console.log("First 10 words in Firestore:");
    items.slice(0, 10).forEach((item, idx) => {
        console.log(`${idx + 1}: ${item.word} (${item.meaning})`);
    });
}

inspectLive().catch(console.error);
