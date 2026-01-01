const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function cleanupDuplicates() {
    console.log('🧹 Cleaning up duplicate Japanese A2 modules...\n');

    // Delete the old placeholder modules (japanese_a2_m6 through m10)
    // Keep the japanese_a2_gen_X modules which have real content
    const modulesToDelete = [
        'japanese_a2_m6',
        'japanese_a2_m7',
        'japanese_a2_m8',
        'japanese_a2_m9',
        'japanese_a2_m10'
    ];

    for (const moduleId of modulesToDelete) {
        await db.collection('languages')
            .doc('japanese')
            .collection('levels')
            .doc('a2')
            .collection('modules')
            .doc(moduleId)
            .delete();
        console.log(`✓ Deleted ${moduleId}`);
    }

    console.log('\n✅ Cleanup complete!');
    console.log('\nRemaining modules will be:');
    console.log('  M1-M5: Original N4 Kanji modules');
    console.log('  M6-M10: Real content (japanese_a2_gen_6 through gen_10)');
    console.log('  M11-M12: N4 Pillar modules');
}

cleanupDuplicates().then(() => process.exit(0));
