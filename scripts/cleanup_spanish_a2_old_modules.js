/**
 * Cleanup Script: Remove old Spanish A2 module IDs from Firestore
 * 
 * This script removes all old/incorrect module IDs from the Spanish A2 level:
 * - es_a2_m1 through es_a2_m10
 * - spanish_a2_m1, spanish_a2_m2, spanish_a2_m10
 * 
 * Keeps only: m01 (the correct new format)
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Old module IDs to delete
const OLD_MODULE_IDS = [
    'es_a2_m1', 'es_a2_m2', 'es_a2_m3', 'es_a2_m4', 'es_a2_m5',
    'es_a2_m6', 'es_a2_m7', 'es_a2_m8', 'es_a2_m9', 'es_a2_m10',
    'spanish_a2_m1', 'spanish_a2_m2', 'spanish_a2_m10'
];

async function cleanupOldModules() {
    try {
        console.log('🧹 Starting Spanish A2 cleanup...\n');
        console.log('📍 Target: languages/spanish/levels/a2/modules/\n');

        const modulesRef = db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a2')
            .collection('modules');

        // First, list all current modules
        console.log('📋 Current modules in Firestore:');
        const snapshot = await modulesRef.get();
        snapshot.forEach(doc => {
            console.log(`   - ${doc.id}`);
        });
        console.log(`\n   Total: ${snapshot.size} modules\n`);

        // Delete old modules
        console.log('🗑️  Deleting old module IDs...\n');
        let deletedCount = 0;

        for (const moduleId of OLD_MODULE_IDS) {
            const docRef = modulesRef.doc(moduleId);
            const doc = await docRef.get();

            if (doc.exists) {
                await docRef.delete();
                console.log(`   ✅ Deleted: ${moduleId}`);
                deletedCount++;
            } else {
                console.log(`   ⏭️  Skipped (not found): ${moduleId}`);
            }
        }

        console.log(`\n📊 Cleanup Summary:`);
        console.log(`   - Modules deleted: ${deletedCount}`);
        console.log(`   - Modules before: ${snapshot.size}`);
        console.log(`   - Modules after: ${snapshot.size - deletedCount}`);

        // Verify final state
        console.log('\n🔍 Verifying final state...');
        const finalSnapshot = await modulesRef.get();
        console.log('\n✅ Remaining modules:');
        finalSnapshot.forEach(doc => {
            console.log(`   - ${doc.id}`);
        });

        if (finalSnapshot.size === 1 && finalSnapshot.docs[0].id === 'm01') {
            console.log('\n🎉 Perfect! Only m01 remains (correct state)');
        } else {
            console.log('\n⚠️  Warning: Expected only m01, but found:');
            finalSnapshot.forEach(doc => {
                if (doc.id !== 'm01') {
                    console.log(`   - Unexpected: ${doc.id}`);
                }
            });
        }

        console.log('\n✅ Cleanup complete!\n');

    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

// Execute
cleanupOldModules();
