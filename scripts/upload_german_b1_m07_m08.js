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
        { id: 'de_b1_m07', file: 'de_b1_m07.json' },
        { id: 'de_b1_m08', file: 'de_b1_m08.json' }
    ];

    console.log('🚀 Starting upload for German B1 M07 & M08...');

    for (const mod of modules) {
        const filePath = join(__dirname, '..', 'firestore_data', mod.file);
        const fileContent = JSON.parse(readFileSync(filePath, 'utf8'));

        await db.collection('languages').doc('german')
            .collection('levels').doc('b1')
            .collection('modules').doc(mod.id)
            .set(fileContent);

        console.log(`✅ Uploaded ${mod.id}`);
    }

    // Update level metadata
    await db.collection('languages').doc('german')
        .collection('levels').doc('b1')
        .set({
            count: 8,
            status: 'In Progress'
        }, { merge: true });

    console.log('📈 Updated German B1 metadata: 800 words, In Progress');
    process.exit(0);
}

uploadModules().catch(err => {
    console.error('❌ Upload failed:', err);
    process.exit(1);
});
