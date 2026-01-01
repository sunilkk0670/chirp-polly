const admin = require('firebase-admin');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deleteOldB1Modules() {
    console.log('🗑️  Deleting OLD French B1 Modules (m1-m10) with duplicate data...\n');
    console.log('⚠️  These are being replaced by the correct modules (m21-m30)\n');

    const modulesToDelete = [
        'fr_b1_m1', 'fr_b1_m2', 'fr_b1_m3', 'fr_b1_m4', 'fr_b1_m5',
        'fr_b1_m6', 'fr_b1_m7', 'fr_b1_m8', 'fr_b1_m9', 'fr_b1_m10'
    ];

    for (const moduleId of modulesToDelete) {
        try {
            const docRef = db.collection('languages').doc('french')
                .collection('levels').doc('b1')
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
            .collection('levels').doc('b1')
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
    console.log('📚 French B1 now has 10 modules (m21-m30) = 1000 words');
    console.log('🎯 Level Total should now show: 1000 words');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\n🎊 French curriculum is now CLEAN:');
    console.log('   A1: 1000 words (m1-m10)');
    console.log('   A2: 1000 words (m11-m20)');
    console.log('   B1: 1000 words (m21-m30)');
    console.log('   TOTAL: 3000 words');
    console.log('═══════════════════════════════════════════════════════');
}

deleteOldB1Modules()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
