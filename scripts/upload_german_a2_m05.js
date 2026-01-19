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

async function uploadModule() {
    const moduleId = 'de_a2_m05';

    console.log(`📤 Starting upload for ${moduleId}...\n`);

    try {
        const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
        const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

        const docRef = db.collection('languages').doc('german')
            .collection('levels').doc('a2')
            .collection('modules').doc(moduleId);

        await docRef.set(moduleData);

        console.log(`✅ Successfully uploaded ${moduleId}`);
        console.log(`   Theme: ${moduleData.theme}`);
        console.log(`   Words: ${moduleData.lessons[0].vocabularyItems.length}\n`);

        // Update A2 level metadata to reflect 5 modules
        const levelRef = db.collection('languages').doc('german')
            .collection('levels').doc('a2');

        await levelRef.set({
            count: 5,
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Updated A2 level metadata');
        console.log('   Module Count: 5');
        console.log('   Status: In Progress\n');
        console.log('🎉 German A2 Module 05 Deployment Complete!\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadModule();
