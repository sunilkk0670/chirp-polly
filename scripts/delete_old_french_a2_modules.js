const admin = require('firebase-admin');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deleteOldA2Modules() {
    console.log('🗑️  Deleting OLD French A2 Modules (m1-m10) with duplicate data...\n');
    console.log('⚠️  These are being replaced by the correct modules (m11-m20)\n');

    const modulesToDelete = [
        'fr_a2_m1', 'fr_a2_m2', 'fr_a2_m3', 'fr_a2_m4', 'fr_a2_m5',
        'fr_a2_m6', 'fr_a2_m7', 'fr_a2_m8', 'fr_a2_m9', 'fr_a2_m10'
    ];

    for (const moduleId of modulesToDelete) {
        try {
            const docRef = db.collection('languages').doc('french')
                .collection('levels').doc('a2')
                .collection('modules').doc(moduleId);

            // Check if it exists first
            const doc = await docRef.get();

            if (doc.exists) {
                await docRef.delete();
                console.log(`✅ Deleted ${moduleId}`);
            } else {
                console.log(`⚠️  ${moduleId} does not exist (already deleted)`);
            }

        } catch (error) {
            console.error(`❌ Failed to delete ${moduleId}:`, error.message);
        }
    }

    console.log('\n🔍 Verifying deletion...\n');

    // Verify they're gone
    for (const moduleId of modulesToDelete) {
        const docRef = db.collection('languages').doc('french')
            .collection('levels').doc('a2')
            .collection('modules').doc(moduleId);

        const doc = await docRef.get();

        if (!doc.exists) {
            console.log(`✅ ${moduleId} confirmed deleted`);
        } else {
            console.log(`❌ ${moduleId} still exists!`);
        }
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ Cleanup Complete!');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📚 French A2 now has 10 modules (m11-m20) = 1000 words');
    console.log('🎯 Level Total should now show: 1000 words');
    console.log('═══════════════════════════════════════════════════════');
}

deleteOldA2Modules()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
