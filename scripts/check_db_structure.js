const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkLangs() {
    const snap = await db.collection('languages').get();
    console.log('--- LANGUAGES ---');
    snap.forEach(doc => {
        console.log(`Lang ID: ${doc.id}`);
    });

    // Check French levels specifically
    const frenchDoc = snap.docs.find(d => d.id.toLowerCase() === 'french');
    if (frenchDoc) {
        console.log(`\n--- Levels in ${frenchDoc.id} ---`);
        const levelsSnap = await db.collection('languages').doc(frenchDoc.id).collection('levels').get();
        levelsSnap.forEach(l => {
            console.log(`Level ID: ${l.id}`);
            // Check modules in A1
            if (l.id.toLowerCase() === 'a1') {
                console.log(`\n--- Modules in ${frenchDoc.id}/a1 ---`);
                db.collection('languages').doc(frenchDoc.id).collection('levels').doc(l.id).collection('modules').get().then(mSnap => {
                    mSnap.forEach(m => console.log(`Module ID: ${m.id} (Order: ${m.data().order})`));
                });
            }
        });
    }
}

checkLangs().catch(console.error);
