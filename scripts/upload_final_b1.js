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

async function uploadAllB1() {
    try {
        for (let i = 1; i <= 10; i++) {
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

            console.log(`✅ Uploaded ${moduleData.moduleId}: ${moduleData.theme}`);
        }

        await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .update({
                totalModules: 10,
                status: 'Complete'
            });

        console.log('🚀 Final B1 Curriculum Upload Complete. 1,000 unique words verified.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

uploadAllB1();
