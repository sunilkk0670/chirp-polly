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

async function checkModule(moduleId) {
    try {
        const docRef = db.collection('languages').doc('german')
            .collection('levels').doc('a2')
            .collection('modules').doc(moduleId);

        const doc = await docRef.get();
        if (doc.exists) {
            console.log(`📄 Metadata for ${moduleId}:`);
            const data = doc.data();
            // Just print top level fields
            const topLevel = {};
            for (const key in data) {
                if (key !== 'lessons' && key !== 'vocabularyItems') {
                    topLevel[key] = data[key];
                }
            }
            console.log(JSON.stringify(topLevel, null, 2));
        } else {
            console.log(`❌ ${moduleId} doc not found!`);
        }
    } catch (error) {
        console.error('❌ Error checking module:', error);
    }
}

async function run() {
    await checkModule('de_a2_m01');
    await checkModule('de_a2_m08');
    await checkModule('de_a2_m10');
    process.exit(0);
}

run();
