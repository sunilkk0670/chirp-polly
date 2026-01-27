const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function thoroughCleanup() {
    try {
        console.log('🗑️ Starting thorough cleanup of Chinese A1 modules...');
        const snapshot = await db.collection('languages/chinese/levels/a1/modules').get();

        const allowedIds = ['zh_a1_m01', 'zh_a1_m02'];
        let deletedCount = 0;

        for (const doc of snapshot.docs) {
            if (!allowedIds.includes(doc.id)) {
                console.log(`🗑️ Deleting legacy document: ${doc.id} (Theme: ${doc.data().theme})`);
                await doc.ref.delete();
                deletedCount++;
            }
        }

        console.log(`\n✅ Cleanup complete. Deleted ${deletedCount} documents.`);
        console.log(`✅ Kept ${snapshot.docs.length - deletedCount} documents: ${allowedIds.join(', ')}`);

    } catch (error) {
        console.error('❌ Error during cleanup:', error);
    } finally {
        process.exit(0);
    }
}

thoroughCleanup();
