const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function exhaustiveCleanupB1() {
    const modulesColPath = 'languages/chinese/levels/b1/modules';
    const snapshot = await db.collection(modulesColPath).get();

    console.log(`🔍 Checking ${snapshot.size} documents in ${modulesColPath}...\n`);

    for (const doc of snapshot.docs) {
        const id = doc.id;
        // Standard pattern is zh_b1_mXX (e.g., zh_b1_m01)
        const isStandard = /^zh_b1_m\d{2}$/.test(id);

        if (!isStandard) {
            console.log(`   🗑️ Deleting non-standard document: ${id}`);
            await doc.ref.delete();
        } else {
            console.log(`   ✅ Keeping standard document: ${id}`);
        }
    }

    console.log('\n✨ Exhaustive cleanup complete.');
    process.exit(0);
}

exhaustiveCleanupB1().catch(console.error);
