const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function verifySpanish() {
    console.log("Verifying Spanish Data on Firestore...");

    // Check A1 M1 for Gato de Papel
    const a1m1 = await db.doc('languages/spanish/levels/a1/modules/es_a1_m1').get();
    const a1m1Data = a1m1.data();
    const gdp = a1m1Data.lessons[0].vocabularyItems[8]; // Index 8
    console.log(`A1 M1 L1 Index 9: ${gdp.targetText} (${gdp.english})`);

    // Check B1 M10 for Meta alcanzada
    const b1m10 = await db.doc('languages/spanish/levels/b1/modules/es_b1_m10').get();
    const b1m10Data = b1m10.data();
    const finalWord = b1m10Data.lessons[9].vocabularyItems[9]; // Lesson 10 Index 10
    console.log(`B1 M10 L10 Index 10: ${finalWord.targetText} (${finalWord.english})`);

    // Check Level Metadata
    const a1Meta = await db.doc('languages/spanish/levels/a1').get();
    console.log(`A1 Status: ${a1Meta.data().status}, ModuleCount: ${a1Meta.data().moduleCount}`);

    process.exit();
}

verifySpanish();
