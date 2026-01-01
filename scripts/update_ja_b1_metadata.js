const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function updateMetadata() {
    const b1Ref = db.collection('languages').doc('japanese').collection('levels').doc('b1');
    await b1Ref.set({
        moduleCount: 10,
        status: 'Complete',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    console.log('✅ Japanese B1 metadata updated: moduleCount=10, status=Complete');
    process.exit(0);
}

updateMetadata().catch(console.error);
