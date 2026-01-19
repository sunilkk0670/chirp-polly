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
    const moduleIds = ['de_a2_m06', 'de_a2_m07'];

    for (const moduleId of moduleIds) {
        console.log(`📤 Starting upload for ${moduleId}...`);

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
        } catch (error) {
            console.error(`❌ Error during upload of ${moduleId}:`, error);
        }
    }

    // Update A2 level metadata to reflect 7 modules
    try {
        const levelRef = db.collection('languages').doc('german')
            .collection('levels').doc('a2');

        await levelRef.set({
            count: 7,
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Updated A2 level metadata');
        console.log('   Module Count: 7');
        console.log('   Status: In Progress\n');
        console.log('🎉 German A2 Modules 06 & 07 Deployment Complete!\n');
    } catch (error) {
        console.error('❌ Error updating metadata:', error);
    }

    process.exit(0);
}

uploadModules();
