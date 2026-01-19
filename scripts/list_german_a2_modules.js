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

async function listModules() {
    console.log('📋 Current German A2 Modules in Firestore:');
    try {
        const modulesRef = db.collection('languages').doc('german')
            .collection('levels').doc('a2')
            .collection('modules');

        const snapshot = await modulesRef.orderBy('__name__').get();
        snapshot.forEach(doc => {
            console.log(` - ${doc.id}`);
        });
    } catch (error) {
        console.error('❌ Error listing modules:', error);
    }
    process.exit(0);
}

listModules();
