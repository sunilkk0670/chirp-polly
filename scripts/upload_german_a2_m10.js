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

async function uploadModule10() {
    const moduleId = 'de_a2_m10';
    console.log(`📤 Starting upload for ${moduleId}...`);

    try {
        const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
        const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

        const docRef = db.collection('languages').doc('german')
            .collection('levels').doc('a2')
            .collection('modules').doc(moduleId);

        await docRef.set(moduleData);

        console.log(`✅ Successfully uploaded ${moduleId}`);

        // Update A2 level metadata to reflect 10 modules and COMPLETE status
        const levelRef = db.collection('languages').doc('german')
            .collection('levels').doc('a2');

        await levelRef.set({
            count: 10,
            status: 'Complete'
        }, { merge: true });

        console.log('✅ Updated A2 level metadata');
        console.log('   Module Count: 10');
        console.log('   Status: Complete\n');
        console.log('🎉 German A2 Curriculum Finalized!\n');
    } catch (error) {
        console.error(`❌ Error during upload of ${moduleId}:`, error);
    }

    process.exit(0);
}

uploadModule10();
