const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deleteEmptyModules() {
    console.log('🗑️  Deleting empty Korean A2 placeholder modules...\n');

    const modulesToDelete = [
        'korean_a2_m11',
        'korean_a2_m12'
    ];

    for (const moduleId of modulesToDelete) {
        await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('a2')
            .collection('modules')
            .doc(moduleId)
            .delete();
        console.log(`✓ Deleted ${moduleId}`);
    }

    console.log('\n✅ Cleanup complete!');
    console.log('\nKorean A2 now has:');
    console.log('  M1-M4: TOPIK II Pillar modules (100 words each)');
    console.log('  M5-M10: Real content modules (20-50 words each)');
}

deleteEmptyModules().then(() => process.exit(0));
