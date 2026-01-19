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
    const modules = [
        { id: 'de_b1_m09', file: 'de_b1_m09.json' },
        { id: 'de_b1_m10', file: 'de_b1_m10.json' }
    ];

    console.log('🚀 Starting upload for German B1 M09 & M10 (Final)...');

    for (const mod of modules) {
        const filePath = join(__dirname, '..', 'firestore_data', mod.file);
        const fileContent = JSON.parse(readFileSync(filePath, 'utf8'));

        await db.collection('languages').doc('german')
            .collection('levels').doc('b1')
            .collection('modules').doc(mod.id)
            .set(fileContent);

        console.log(`✅ Uploaded ${mod.id}`);
    }

    // Mark B1 Level as Complete
    await db.collection('languages').doc('german')
        .collection('levels').doc('b1')
        .set({
            count: 10,
            status: 'Complete'
        }, { merge: true });

    console.log('🏁 German B1 Level COMPLETE: 1000 words total across 10 modules.');
    process.exit(0);
}

uploadModules().catch(err => {
    console.error('❌ Upload failed:', err);
    process.exit(1);
});
