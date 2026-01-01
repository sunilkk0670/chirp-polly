const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function listModules() {
    const langs = ['spanish', 'japanese', 'korean'];
    for (const lang of langs) {
        console.log(`\n--- ${lang} b1 modules ---`);
        const snap = await db.collection('languages').doc(lang).collection('levels').doc('b1').collection('modules').get();
        for (const doc of snap.docs) {
            const data = doc.data();
            console.log(`ID: ${doc.id} | Order: ${data.order} | Theme: ${data.theme}`);
        }
    }
}

listModules().catch(console.error);
