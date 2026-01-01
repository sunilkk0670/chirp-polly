const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const db = admin.firestore();

async function addFinalTouch() {
    const docRef = db.collection('languages').doc('spanish').collection('levels').doc('a2').collection('modules').doc('spanish_a2_m10');
    const doc = await docRef.get();
    const data = doc.data();

    const additionalWords = [
        { targetText: "¡Qué tengas un buen día!", english: "Have a nice day!", phoneticTranscription: "KE TEHN-gahs oon BWEHN DEE-ah" },
        { targetText: "Igualmente", english: "Likewise / Same to you", phoneticTranscription: "ee-gwahl-MEHN-teh" },
        { targetText: "Disfrute de su estancia", english: "Enjoy your stay (formal)", phoneticTranscription: "dees-FROO-teh deh soo es-TAHN-syah" },
        { targetText: "Que te vaya bien", english: "Hope things go well for you", phoneticTranscription: "KE TE BA-ya BYEHN" },
        { targetText: "¡Pásalo bien!", english: "Have a good time!", phoneticTranscription: "PA-sa-lo BYEHN" }
    ];

    data.vocabularyItems.push(...additionalWords);
    await docRef.update({ vocabularyItems: data.vocabularyItems });
    console.log("Added 5 more words to M10.");
}

addFinalTouch().then(() => process.exit(0));
