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

async function cleanupOldGermanModules() {
    console.log('🧹 Cleaning up old German A1 modules from Firestore...\n');

    // Old module IDs to delete (de_a1_m1 through de_a1_m10)
    const oldModuleIds = [
        'de_a1_m1',
        'de_a1_m2',
        'de_a1_m3',
        'de_a1_m4',
        'de_a1_m5',
        'de_a1_m6',
        'de_a1_m7',
        'de_a1_m8',
        'de_a1_m9',
        'de_a1_m10'
    ];

    try {
        let deletedCount = 0;
        let notFoundCount = 0;

        for (const moduleId of oldModuleIds) {
            const docRef = db.collection('languages').doc('german')
                .collection('levels').doc('a1')
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

        console.log('\n═══════════════════════════════════════════════════════════\n');
        console.log('📊 CLEANUP SUMMARY:\n');
        console.log(`   Deleted: ${deletedCount} modules`);
        console.log(`   Not found: ${notFoundCount} modules`);
        console.log(`   Total processed: ${oldModuleIds.length}\n`);

        console.log('✅ REMAINING MODULES:\n');
        console.log('   - de_a1_m01 (Core Essentials & Articles)');
        console.log('   - de_a1_m02 (Home & Family)');
        console.log('   - de_a1_m03 (Food, Dining & Grocery)\n');

        console.log('🎉 Cleanup complete! Only the new modules remain.\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
}

cleanupOldGermanModules();
