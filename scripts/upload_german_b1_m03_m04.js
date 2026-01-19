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
    const moduleIds = ['de_b1_m03', 'de_b1_m04'];
    console.log(`📤 Starting upload for B1 M03 & M04...`);

    for (const moduleId of moduleIds) {
        try {
            const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
            const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

            const docRef = db.collection('languages').doc('german')
                .collection('levels').doc('b1')
                .collection('modules').doc(moduleId);

            await docRef.set(moduleData);
            console.log(`✅ Successfully uploaded ${moduleId}`);
        } catch (error) {
            console.error(`❌ Error during upload of ${moduleId}:`, error);
        }
    }

    try {
        const levelRef = db.collection('languages').doc('german')
            .collection('levels').doc('b1');

        await levelRef.set({
            count: 4,
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Updated B1 level metadata to count: 4');
    } catch (error) {
        console.error('❌ Error updating level metadata:', error);
    }

    process.exit(0);
}

uploadModules();
