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

async function uploadKoreanA2FinalBatch() {
    const modules = ['ko_a2_m08', 'ko_a2_m09', 'ko_a2_m10'];
    console.log(`📤 Uploading Korean A2 Final Batch: ${modules.join(', ')}...\n`);

    try {
        for (const moduleId of modules) {
            const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
            const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

            const docRef = db.collection('languages').doc('korean')
                .collection('levels').doc('a2')
                .collection('modules').doc(moduleId);

            await docRef.set(moduleData);
            console.log(`✅ Successfully uploaded ${moduleId}`);
        }

        const levelRef = db.collection('languages').doc('korean')
            .collection('levels').doc('a2');

        await levelRef.set({
            moduleCount: 10,
            status: 'Complete'
        }, { merge: true });

        console.log('\n✅ Updated A2 level metadata (Module Count: 10, Status: Complete)\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadKoreanA2FinalBatch();
