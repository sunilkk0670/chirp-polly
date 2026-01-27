const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function deleteLegacyChineseModules() {
    try {
        console.log('🗑️  Starting cleanup of legacy Chinese A1 modules...\n');

        // Legacy document IDs to delete
        const legacyDocIds = [
            '3GVWnFCnEpbC0lTn3mkp',
            'An3nAtMeNfqTYqe1xCSQ',
            'T7cgjbhyj7n3kZExDPDQ',
            'bp4mqjbuhvUAK37e78Rm',
            'mnNdj630lUKQ6Z0QEQkQ'
        ];

        const basePath = 'languages/chinese/levels/a1/modules';

        console.log(`📍 Deleting from path: ${basePath}\n`);

        for (const docId of legacyDocIds) {
            const docPath = `${basePath}/${docId}`;
            console.log(`🗑️  Deleting: ${docPath}`);

            await db.doc(docPath).delete();
            console.log(`✅ Deleted: ${docId}`);
        }

        console.log('\n🎉 Cleanup complete!');
        console.log('✅ Kept: zh_a1_m01 (the correct module)');

    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

deleteLegacyChineseModules();
