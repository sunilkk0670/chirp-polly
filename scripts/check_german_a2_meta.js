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

async function checkMetadata() {
    try {
        const levelRef = db.collection('languages').doc('german')
            .collection('levels').doc('a2');

        const doc = await levelRef.get();
        if (doc.exists) {
            console.log('📄 German A2 Level Metadata:');
            console.log(JSON.stringify(doc.data(), null, 2));
        } else {
            console.log('❌ German A2 Metadata document not found!');
        }
    } catch (error) {
        console.error('❌ Error checking metadata:', error);
    }
    process.exit(0);
}

checkMetadata();
