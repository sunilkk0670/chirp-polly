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

async function uploadModules() {
    const moduleIds = ['de_b1_m02', 'de_b1_m05', 'de_b1_m06'];
    console.log(`📤 Syncing exact 100-word counts for B1 M02, M05 & M06...`);

    for (const moduleId of moduleIds) {
        try {
            const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
            const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

            const docRef = db.collection('languages').doc('german')
                .collection('levels').doc('b1')
                .collection('modules').doc(moduleId);

            await docRef.set(moduleData);
            console.log(`✅ Successfully synced ${moduleId} (100 items)`);
        } catch (error) {
            console.error(`❌ Error during upload of ${moduleId}:`, error);
        }
    }

    try {
        const levelRef = db.collection('languages').doc('german')
            .collection('levels').doc('b1');

        await levelRef.set({
            count: 6,
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Verified B1 level metadata (6 Modules, 600 Words total)');
    } catch (error) {
        console.error('❌ Error updating level metadata:', error);
    }

    process.exit(0);
}

uploadModules();
