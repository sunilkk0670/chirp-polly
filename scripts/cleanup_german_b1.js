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

async function cleanupB1Modules() {
    // List of non-padded module IDs to delete
    const oldModuleIds = [
        'de_b1_m1', 'de_b1_m2', 'de_b1_m3', 'de_b1_m4', 'de_b1_m5',
        'de_b1_m6', 'de_b1_m7', 'de_b1_m8', 'de_b1_m9', 'de_b1_m10'
    ];

    console.log('🗑️ Starting cleanup of non-padded German B1 modules...');

    for (const moduleId of oldModuleIds) {
        try {
            const docRef = db.collection('languages').doc('german')
                .collection('levels').doc('b1')
                .collection('modules').doc(moduleId);

            const doc = await docRef.get();
            if (doc.exists) {
                await docRef.delete();
                console.log(`✅ Deleted ${moduleId}`);
            } else {
                console.log(`ℹ️ ${moduleId} not found, skipping.`);
            }
        } catch (error) {
            console.error(`❌ Error deleting ${moduleId}:`, error);
        }
    }

    console.log('\n✨ Firestore B1 cleanup complete.');
    process.exit(0);
}

cleanupB1Modules();
