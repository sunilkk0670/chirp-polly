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
    const modulesToUpload = ['de_a1_m09', 'de_a1_m10'];

    console.log(`📤 Starting upload for ${modulesToUpload.length} modules...\n`);

    try {
        for (const moduleId of modulesToUpload) {
            const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
            const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

            const docRef = db.collection('languages').doc('german')
                .collection('levels').doc('a1')
                .collection('modules').doc(moduleId);

            await docRef.set(moduleData);

            console.log(`✅ Successfully uploaded ${moduleId}`);
            console.log(`   Theme: ${moduleData.theme}`);
            console.log(`   Words: ${moduleData.lessons[0].vocabularyItems.length}\n`);
        }

        // Update A1 level metadata to reflect 10 modules and 'Complete' status
        const levelRef = db.collection('languages').doc('german')
            .collection('levels').doc('a1');

        await levelRef.set({
            count: 10,
            status: 'Complete'
        }, { merge: true });

        console.log('✅ Updated A1 level metadata');
        console.log('   Module Count: 10');
        console.log('   Status: Complete\n');
        console.log('🎉 German A1 Deployment Complete! (1,000 words)\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadModules();
