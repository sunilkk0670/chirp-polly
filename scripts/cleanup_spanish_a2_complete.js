/**
 * Cleanup Script: Remove ALL remaining old Spanish A2 module IDs
 * 
 * This script removes ALL modules except 'm01' from Spanish A2
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

async function cleanupAllOldModules() {
    try {
        console.log('🧹 Starting complete Spanish A2 cleanup...\n');
        console.log('📍 Target: languages/spanish/levels/a2/modules/\n');
        console.log('🎯 Strategy: Keep only "m01", delete everything else\n');

        const modulesRef = db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a2')
            .collection('modules');

        // Get all current modules
        console.log('📋 Scanning all modules...');
        const snapshot = await modulesRef.get();

        const toDelete = [];
        const toKeep = [];

        snapshot.forEach(doc => {
            if (doc.id === 'm01') {
                toKeep.push(doc.id);
            } else {
                toDelete.push(doc.id);
            }
        });

        console.log(`\n   Total modules found: ${snapshot.size}`);
        console.log(`   To keep: ${toKeep.length} (${toKeep.join(', ')})`);
        console.log(`   To delete: ${toDelete.length}\n`);

        if (toDelete.length > 0) {
            console.log('🗑️  Deleting old modules:\n');

            for (const moduleId of toDelete) {
                await modulesRef.doc(moduleId).delete();
                console.log(`   ✅ Deleted: ${moduleId}`);
            }
        } else {
            console.log('✅ No modules to delete - already clean!\n');
        }

        // Verify final state
        console.log('\n🔍 Verifying final state...');
        const finalSnapshot = await modulesRef.get();

        console.log(`\n✅ Final module count: ${finalSnapshot.size}`);
        console.log('   Remaining modules:');
        finalSnapshot.forEach(doc => {
            console.log(`   - ${doc.id}`);
        });

        if (finalSnapshot.size === 1 && finalSnapshot.docs[0].id === 'm01') {
            console.log('\n🎉 Perfect! Spanish A2 is now clean with only m01');
        } else {
            console.log('\n⚠️  Warning: Unexpected state');
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
cleanupAllOldModules();
