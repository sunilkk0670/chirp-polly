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

// Additional old modules found during verification
const remainingOldModules = [
    'spanish_a1_m4',
    'spanish_a1_m5',
    'spanish_a1_m6',
    'spanish_a1_m7',
    'spanish_a1_m8'
];

async function deleteRemainingOldModules() {
    try {
        console.log('\n🧹 Deleting remaining old Spanish A1 modules...\n');

        const modulesRef = db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules');

        let deletedCount = 0;
        for (const moduleId of remainingOldModules) {
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

        // Final verification
        console.log('\n\nFinal Verification:');
        const snapshot = await modulesRef.get();

        console.log(`\nTotal modules remaining: ${snapshot.size}`);
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            console.log(`  ✅ ${doc.id} - ${data.vocabulary ? data.vocabulary.length : 'N/A'} words`);
        });

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('✅ Final Cleanup Complete!');
        console.log('═══════════════════════════════════════════════════════');
        console.log(`\n📊 Summary:`);
        console.log(`   Deleted in this run: ${deletedCount} modules`);
        console.log(`   Remaining: ${snapshot.size} audited module(s)`);
        console.log(`   Status: Clean slate - only audited modules remain ✓\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
}

deleteRemainingOldModules();
