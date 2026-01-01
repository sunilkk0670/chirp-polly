const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function inspectA1Data() {
    const doc = await db.collection('languages').doc('japanese').collection('levels').doc('a1').collection('modules').limit(1).get();
    if (doc.empty) return;
    const data = doc.docs[0].data();
    console.log("--- JAPANESE A1 MODULE INSPECTION ---");
    if (data.lessons && data.lessons.length > 0) {
        console.log("First lesson keys:", Object.keys(data.lessons[0]));
        console.log("First lesson data sample:", JSON.stringify(data.lessons[0], null, 2));
    }
}

inspectA1Data();
