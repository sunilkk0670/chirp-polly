const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function cleanupLegacyB1() {
    const legacyIds = [
        '2T2hd2uHRfJH97Y05zBc',
        '6wNNzLeTnmlFKLeyrzEe',
        '7bqIAe0RdqLqX6tOLYbe',
        'FQn1jT9JH2Z5KmmZ5yCg',
        'zWM4zxKAGIPOIBhaH4LK'
    ];

    console.log('🧹 Cleaning up legacy Chinese B1 documents...\n');

    for (const id of legacyIds) {
        const docRef = db.doc(`languages/chinese/levels/b1/modules/${id}`);
        await docRef.delete();
        console.log(`   🗑️ Deleted: ${id}`);
    }

    console.log('\n✨ Cleanup complete. Only "zh_b1_m01" should remain in the collection.');
    process.exit(0);
}

cleanupLegacyB1().catch(console.error);
