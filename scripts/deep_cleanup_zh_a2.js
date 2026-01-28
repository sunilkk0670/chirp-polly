const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deepCleanup() {
    console.log('🔍 Scanning Chinese A2 modules for legacy IDs...\n');

    const collectionRef = db.collection('languages/chinese/levels/a2/modules');
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
        console.log('No documents found in the collection.');
        process.exit(0);
    }

    const validPrefix = 'zh_a2_m';
    let deleteCount = 0;

    for (const doc of snapshot.docs) {
        if (!doc.id.startsWith(validPrefix)) {
            console.log(`🗑️ Found legacy document: ${doc.id}. Deleting...`);
            await doc.ref.delete();
            deleteCount++;
        }
    }

    if (deleteCount === 0) {
        console.log('✨ No legacy documents found. Collection is clean!');
    } else {
        console.log(`\n✅ Successfully deleted ${deleteCount} legacy items.`);
    }

    process.exit(0);
}

deepCleanup().catch(error => {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
});
