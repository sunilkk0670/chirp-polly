const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deleteLegacyB1Modules() {
    const legacyIds = [
        'italian_b1_m1',
        'italian_b1_m2',
        'italian_b1_m3',
        'italian_b1_m4',
        'italian_b1_m5'
    ];

    console.log('🧹 Starting cleanup of legacy Italian B1 modules...');

    for (const docId of legacyIds) {
        try {
            const docRef = db.collection('languages').doc('italian')
                .collection('levels').doc('b1')
                .collection('modules').doc(docId);

            // Recursively delete sub-collections if any (like 'lessons')
            const subCollections = await docRef.listCollections();
            for (const subColl of subCollections) {
                const subDocs = await subColl.get();
                const batch = db.batch();
                subDocs.docs.forEach(d => batch.delete(d.ref));
                await batch.commit();
                console.log(`   🗑️ Deleted sub-collection "${subColl.id}" for ${docId}`);
            }

            await docRef.delete();
            console.log(`   ✅ Deleted document: ${docId}`);
        } catch (error) {
            console.error(`   ❌ Failed to delete ${docId}:`, error.message);
        }
    }

    console.log('\n✨ Legacy B1 cleanup complete!');
}

deleteLegacyB1Modules();
