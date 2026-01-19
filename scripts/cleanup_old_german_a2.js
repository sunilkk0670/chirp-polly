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

async function deleteOldModules() {
    // List of non-padded module IDs to delete
    const oldModuleIds = [
        'de_a2_m1', 'de_a2_m2', 'de_a2_m3', 'de_a2_m4',
        'de_a2_m5', 'de_a2_m6', 'de_a2_m7', 'de_a2_m8', 'de_a2_m9'
    ];

    console.log('🗑️ Starting deletion of non-padded A2 modules...');

    for (const moduleId of oldModuleIds) {
        try {
            const docRef = db.collection('languages').doc('german')
                .collection('levels').doc('a2')
                .collection('modules').doc(moduleId);

            const doc = await docRef.get();
            if (doc.exists) {
                await docRef.delete();
                console.log(`✅ Deleted ${moduleId}`);
            } else {
                console.log(`ℹ️ ${moduleId} does not exist, skipping.`);
            }
        } catch (error) {
            console.error(`❌ Error deleting ${moduleId}:`, error);
        }
    }

    console.log('\n✨ Firestore cleanup complete.');
    process.exit(0);
}

deleteOldModules();
