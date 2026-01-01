const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function inspect() {
    const doc = await db.doc('languages/spanish/levels/b1/modules/es_b1_m1').get();
    const data = doc.data();
    console.log(`Module: ${data.moduleId}`);
    console.log(`Keys: ${Object.keys(data).join(', ')}`);
}

inspect().catch(console.error);
