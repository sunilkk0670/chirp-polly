const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function inspect() {
    const levels = ['a1', 'a2', 'b1'];
    console.log("FINAL INSPECTION OF SPANISH FIRESTORE STATE");
    for (const level of levels) {
        const modulesRef = db.collection('languages').doc('spanish')
            .collection('levels').doc(level)
            .collection('modules');

        const snapshot = await modulesRef.get();
        const ids = snapshot.docs.map(d => d.id).sort();

        console.log(`\nLEVEL: ${level.toUpperCase()}`);
        console.log(`  Count Found: ${ids.length}`);
        console.log(`  Module IDs:  ${ids.join(', ')}`);

        const levelRef = db.collection('languages').doc('spanish')
            .collection('levels').doc(level);

        const status = ids.length >= 10 ? 'Complete' : 'In Progress';
        await levelRef.set({
            moduleCount: ids.length,
            status: status
        }, { merge: true });
        console.log(`  Metadata Synchronized: ${ids.length} modules, ${status}`);
    }
    process.exit();
}

inspect().catch(err => {
    console.error(err);
    process.exit(1);
});
