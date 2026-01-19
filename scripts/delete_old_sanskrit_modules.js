import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deleteOldSanskritModules() {
    // Old module IDs to delete (sa_a1_m1 through sa_a1_m10)
    const oldModuleIds = [
        'sa_a1_m1',
        'sa_a1_m2',
        'sa_a1_m3',
        'sa_a1_m4',
        'sa_a1_m5',
        'sa_a1_m6',
        'sa_a1_m7',
        'sa_a1_m8',
        'sa_a1_m9',
        'sa_a1_m10'
    ];

    console.log(`🗑️  Starting deletion of ${oldModuleIds.length} old Sanskrit modules...\n`);

    try {
        let deletedCount = 0;

        for (const moduleId of oldModuleIds) {
            const docRef = db.collection('languages').doc('sanskrit')
                .collection('levels').doc('a1')
                .collection('modules').doc(moduleId);

            // Check if document exists
            const doc = await docRef.get();

            if (doc.exists) {
                await docRef.delete();
                console.log(`✅ Deleted ${moduleId}`);
                deletedCount++;
            } else {
                console.log(`⚠️  ${moduleId} does not exist (skipping)`);
            }
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ CLEANUP COMPLETE!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`\n📊 Summary:`);
        console.log(`   • ${deletedCount} old modules deleted`);
        console.log(`   • Kept: sa_a1_m01 (new format with 100 words)`);
        console.log(`   • Sanskrit A1 is now clean and ready for M02-M10\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during deletion:', error);
        process.exit(1);
    }
}

deleteOldSanskritModules();
