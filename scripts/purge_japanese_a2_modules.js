const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function purgeA2Modules() {
    try {
        console.log('--- Purging Japanese A2 Modules for Clean Slate ---');

        const modulesRef = db.collection('languages').doc('japanese')
            .collection('levels').doc('a2')
            .collection('modules');

        const snapshot = await modulesRef.get();

        if (snapshot.empty) {
            console.log('No documents found to delete.');
            return;
        }

        console.log(`Found ${snapshot.docs.length} documents. Deleting...`);

        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            console.log(`- Deleting: ${doc.id}`);
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log('✅ All old Japanese A2 modules purged.');
        console.log('---------------------------------------------------');

    } catch (error) {
        console.error('❌ Purge failed:', error);
    }
}

purgeA2Modules();
