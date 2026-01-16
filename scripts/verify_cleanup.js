const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function verify() {
    const levels = ['a1', 'a2', 'b1'];
    console.log("Verifying Firestore State for Spanish...");

    for (const level of levels) {
        const modulesRef = db.collection('languages').doc('spanish')
            .collection('levels').doc(level)
            .collection('modules');

        const snapshot = await modulesRef.get();
        console.log(`Level ${level.toUpperCase()}:`);
        console.log(`  Module IDs: ${snapshot.docs.map(d => d.id).join(', ')}`);

        const meta = await db.doc(`languages/spanish/levels/${level}`).get();
        const data = meta.data();
        console.log(`  Metadata - Count: ${data.moduleCount}, Status: ${data.status}`);
    }

    process.exit();
}

verify();
