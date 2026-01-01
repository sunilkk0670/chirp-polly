const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function cleanupB1() {
    try {
        console.log('--- Cleaning Up Legacy Japanese B1 Modules ---');
        const modulesRef = db.collection('languages').doc('japanese')
            .collection('levels').doc('b1')
            .collection('modules');

        const snapshot = await modulesRef.get();
        const validIds = ['ja_b1_m01', 'ja_b1_m02', 'ja_b1_m03'];

        let deleteCount = 0;
        const batch = db.batch();

        snapshot.forEach(doc => {
            if (!validIds.includes(doc.id)) {
                console.log(`🗑️ Marking for deletion: ${doc.id}`);
                batch.delete(doc.ref);
                deleteCount++;
            } else {
                console.log(`✅ Keeping valid module: ${doc.id}`);
            }
        });

        if (deleteCount > 0) {
            await batch.commit();
            console.log(`Successfully deleted ${deleteCount} legacy documents.`);
        } else {
            console.log('No legacy documents found to delete.');
        }

        console.log('--------------------------------------------');
        process.exit(0);

    } catch (error) {
        console.error('❌ Cleanup failed:', error);
        process.exit(1);
    }
}

cleanupB1();
