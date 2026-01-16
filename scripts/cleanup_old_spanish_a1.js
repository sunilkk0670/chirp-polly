import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account
const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// List of old module IDs to delete (the ones with the Word 9 bug)
const oldModulesToDelete = [
    'es_a1_m1',
    'es_a1_m2',
    'es_a1_m3',
    'es_a1_m4',
    'es_a1_m5',
    'es_a1_m6',
    'es_a1_m7',
    'es_a1_m8',
    'es_a1_m9',
    'es_a1_m10',
    'spanish_a1_m1',
    'spanish_a1_m2',
    'spanish_a1_m3'
];

async function cleanupOldSpanishA1Modules() {
    try {
        console.log('\n🧹 Starting cleanup of old Spanish A1 modules...\n');
        console.log('⚠️  These modules had the "Word 9 duplication bug"\n');

        // Get all modules first to see what exists
        console.log('Step 1: Checking existing modules...');
        const modulesRef = db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules');

        const snapshot = await modulesRef.get();

        console.log(`Found ${snapshot.size} total modules in Firestore\n`);

        const existingModules = snapshot.docs.map(doc => doc.id);
        console.log('Existing modules:');
        existingModules.forEach(id => {
            const isOld = oldModulesToDelete.includes(id);
            console.log(`  ${isOld ? '❌' : '✅'} ${id} ${isOld ? '(will delete)' : '(keep - new audited)'}`);
        });

        // Delete old modules
        console.log('\n\nStep 2: Deleting old modules with Word 9 bug...\n');

        let deletedCount = 0;
        for (const moduleId of oldModulesToDelete) {
            try {
                const docRef = modulesRef.doc(moduleId);
                const doc = await docRef.get();

                if (doc.exists) {
                    await docRef.delete();
                    console.log(`✓ Deleted: ${moduleId}`);
                    deletedCount++;
                } else {
                    console.log(`  Skipped: ${moduleId} (doesn't exist)`);
                }
            } catch (error) {
                console.log(`  Error deleting ${moduleId}:`, error.message);
            }
        }

        // Verify cleanup
        console.log('\n\nStep 3: Verifying cleanup...');
        const afterSnapshot = await modulesRef.get();

        console.log(`\nModules remaining: ${afterSnapshot.size}`);
        afterSnapshot.docs.forEach(doc => {
            console.log(`  ✅ ${doc.id}`);
        });

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('✅ Cleanup Complete!');
        console.log('═══════════════════════════════════════════════════════');
        console.log(`\n📊 Summary:`);
        console.log(`   Deleted: ${deletedCount} old modules with Word 9 bug`);
        console.log(`   Remaining: ${afterSnapshot.size} audited module(s)`);
        console.log(`   Status: Clean slate ready for Spanish A1-B1 curriculum ✓\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
}

cleanupOldSpanishA1Modules();
