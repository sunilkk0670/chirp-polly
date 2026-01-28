const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deleteLegacyModules() {
    const legacyIds = [
        'VNbzb0gMHHgg8Q2iDucj',
        'ha7uogHawAnzCLUBhcEw',
        'sKmgLPUenlHoh31Jn1r1',
        'uSajIlC1pPhPGSUCqrdO',
        'v0zizgMWIbkBY8gXBRgr'
    ];

    console.log('🗑️ Deleting legacy Chinese A2 modules with auto-generated IDs...\n');

    for (const id of legacyIds) {
        const docPath = `languages/chinese/levels/a2/modules/${id}`;
        try {
            await db.doc(docPath).delete();
            console.log(`   ✅ Deleted: ${id}`);
        } catch (error) {
            console.error(`   ❌ Failed to delete ${id}:`, error.message);
        }
    }

    console.log('\n✨ Cleanup complete!');
    process.exit(0);
}

deleteLegacyModules();
