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

async function uploadFixedModules() {
    try {
        for (let i = 1; i <= 9; i++) {
            const file = `korean_b1_m${String(i).padStart(2, '0')}.json`;
            const modulePath = join(__dirname, `../firestore_data/${file}`);
            const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

            await db.collection('languages')
                .doc('korean')
                .collection('levels')
                .doc('b1')
                .collection('modules')
                .doc(moduleData.moduleId)
                .set(moduleData);

            console.log(`✅ Uploaded FIXED ${moduleData.moduleId}: ${moduleData.theme}`);
        }
        console.log('🚀 All B1 Modules (01-09) successfully updated in Firestore.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

uploadFixedModules();
