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

async function checkMeta() {
    const doc = await db.collection('languages').doc('german')
        .collection('levels').doc('b1').get();
    console.log('Metadata:', doc.data());
    process.exit(0);
}

checkMeta().catch(err => {
    console.error(err);
    process.exit(1);
});
