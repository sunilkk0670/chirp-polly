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

async function checkModule01() {
    try {
        const docRef = db.collection('languages').doc('german')
            .collection('levels').doc('a2')
            .collection('modules').doc('de_a2_m01');

        const doc = await docRef.get();
        if (doc.exists) {
            const data = doc.data();
            console.log('ORDER:', data.order);
        } else {
            console.log('NOT FOUND');
        }
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

checkModule01();
