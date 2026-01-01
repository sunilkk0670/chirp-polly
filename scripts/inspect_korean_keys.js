const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function inspectKoreanData() {
    const doc = await db.collection('languages').doc('korean').collection('levels').doc('a2').collection('modules').doc('korean_a2_m1').get();
    const data = doc.data();
    console.log("--- KOREAN A2 MODULE 1 INSPECTION ---");
    console.log("Module theme:", data.theme);
    if (data.lessons && data.lessons.length > 0) {
        console.log("First lesson keys:", Object.keys(data.lessons[0]));
        console.log("First lesson data:", JSON.stringify(data.lessons[0], null, 2));
    } else {
        console.log("No lessons found in this module!");
    }
}

inspectKoreanData();
