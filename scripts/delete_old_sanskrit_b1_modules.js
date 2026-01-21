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

async function deleteOldSanskritB1Modules() {
    console.log('🗑️  Starting cleanup of old Sanskrit B1 modules...\n');

    // Old module IDs without leading zeros
    const oldModuleIds = [
        'sa_b1_m1',
        'sa_b1_m2',
        'sa_b1_m3',
        'sa_b1_m4',
        'sa_b1_m5',
        'sa_b1_m6',
        'sa_b1_m7',
        'sa_b1_m8',
        'sa_b1_m9',
        'sa_b1_m10'
    ];

    try {
        let deletedCount = 0;

        for (const moduleId of oldModuleIds) {
            const docRef = db.collection('languages').doc('sanskrit')
                .collection('levels').doc('b1')
                .collection('modules').doc(moduleId);

            const doc = await docRef.get();

            if (doc.exists) {
                await docRef.delete();
                console.log(`✅ Deleted: ${moduleId}`);
                deletedCount++;
            } else {
                console.log(`⏭️  Skipped (not found): ${moduleId}`);
            }
        }

        console.log('\n═══════════════════════════════════════════════════════');
        console.log(`🎯 Cleanup Complete!`);
        console.log('═══════════════════════════════════════════════════════');
        console.log(`📊 Summary:`);
        console.log(`   • Modules deleted: ${deletedCount}`);
        console.log(`   • Modules checked: ${oldModuleIds.length}`);
        console.log(`\n✨ Old modules cleaned up successfully!`);
        console.log(`📝 Current modules: sa_b1_m01, sa_b1_m02 (with leading zeros)\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
}

deleteOldSanskritB1Modules();
