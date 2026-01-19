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

async function fixOrders() {
    console.log('🛠️ Fixing order fields for German A2 modules...');

    for (let i = 1; i <= 10; i++) {
        const moduleId = `de_a2_m${String(i).padStart(2, '0')}`;
        const docRef = db.collection('languages').doc('german')
            .collection('levels').doc('a2')
            .collection('modules').doc(moduleId);

        try {
            const doc = await docRef.get();
            if (doc.exists) {
                await docRef.update({ order: i });
                console.log(`✅ Set order: ${i} for ${moduleId}`);
            } else {
                console.log(`⚠️ ${moduleId} not found, skipping.`);
            }
        } catch (error) {
            console.error(`❌ Error updating ${moduleId}:`, error);
        }
    }

    // Also verify and fix the Level metadata
    try {
        const levelRef = db.collection('languages').doc('german')
            .collection('levels').doc('a2');

        await levelRef.set({
            count: 10,
            status: 'Complete'
        }, { merge: true });
        console.log('✅ Verified A2 Level metadata (count: 10)');
    } catch (error) {
        console.error('❌ Error updating level metadata:', error);
    }

    console.log('\n✨ All order fields fixed.');
    process.exit(0);
}

fixOrders();
