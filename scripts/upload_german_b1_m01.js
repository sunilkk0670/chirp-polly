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

async function uploadB1M01() {
    const moduleId = 'de_b1_m01';
    console.log(`📤 Starting upload for ${moduleId}...`);

    try {
        const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
        const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

        const docRef = db.collection('languages').doc('german')
            .collection('levels').doc('b1')
            .collection('modules').doc(moduleId);

        await docRef.set(moduleData);

        console.log(`✅ Successfully uploaded ${moduleId}`);

        // Update B1 level metadata
        const levelRef = db.collection('languages').doc('german')
            .collection('levels').doc('b1');

        await levelRef.set({
            id: 'b1',
            order: 3,
            cefr: 'B1',
            name: 'B1',
            description: 'Intermediate German - B1 Level',
            count: 1,
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Updated B1 level metadata');
        console.log('   Module Count: 1');
        console.log('   Status: In Progress\n');

    } catch (error) {
        console.error(`❌ Error during upload:`, error);
    }

    process.exit(0);
}

uploadB1M01();
