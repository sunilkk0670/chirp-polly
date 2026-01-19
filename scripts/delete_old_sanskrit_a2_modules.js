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

async function deleteOldSanskritA2Modules() {
    console.log('🗑️  Starting cleanup of old Sanskrit A2 modules...\n');

    // Old module IDs to delete (sa_a2_m1 through sa_a2_m10)
    const oldModuleIds = [
        'sa_a2_m1',
        'sa_a2_m2',
        'sa_a2_m3',
        'sa_a2_m4',
        'sa_a2_m5',
        'sa_a2_m6',
        'sa_a2_m7',
        'sa_a2_m8',
        'sa_a2_m9',
        'sa_a2_m10'
    ];

    try {
        let deletedCount = 0;
        let notFoundCount = 0;

        for (const moduleId of oldModuleIds) {
            const docRef = db.collection('languages').doc('sanskrit')
                .collection('levels').doc('a2')
                .collection('modules').doc(moduleId);

            const doc = await docRef.get();

            if (doc.exists) {
                await docRef.delete();
                console.log(`✅ Deleted: ${moduleId}`);
                deletedCount++;
            } else {
                console.log(`⚠️  Not found: ${moduleId}`);
                notFoundCount++;
            }
        }

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('🎯 CLEANUP COMPLETE!');
        console.log('═══════════════════════════════════════════════════════\n');
        console.log(`📊 Summary:`);
        console.log(`   • Modules deleted: ${deletedCount}`);
        console.log(`   • Modules not found: ${notFoundCount}`);
        console.log(`   • Remaining module: sa_a2_m01 (new format)\n`);
        console.log('✨ Sanskrit A2 collection is now clean and ready!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
}

deleteOldSanskritA2Modules();
