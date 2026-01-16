import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadM07M08() {
    try {
        const modulesToUpload = ['07', '08'];

        for (const num of modulesToUpload) {
            const modulePath = join(__dirname, `../firestore_data/korean_b1_m${num}.json`);
            const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

            await db.collection('languages')
                .doc('korean')
                .collection('levels')
                .doc('b1')
                .collection('modules')
                .doc(moduleData.moduleId)
                .set(moduleData);

            console.log(`✅ Uploaded ${moduleData.moduleId}: ${moduleData.theme}`);
        }

        // Update B1 metadata
        await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .update({
                totalModules: 8,
                status: 'In Progress'
            });

        console.log('🚀 B1 Level Metadata updated to 8 modules.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

uploadM07M08();
