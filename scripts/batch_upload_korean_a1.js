import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account
const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');
if (!existsSync(serviceAccountPath)) {
    console.error('❌ Service account key not found at:', serviceAccountPath);
    process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const modulesToUpload = [
    'ko_a1_m01.json', 'ko_a1_m02.json', 'ko_a1_m03.json', 'ko_a1_m04.json', 'ko_a1_m05.json',
    'ko_a1_m06.json', 'ko_a1_m07.json', 'ko_a1_m08.json', 'ko_a1_m09.json', 'ko_a1_m10.json'
];

async function batchUpload() {
    try {
        console.log('\n🚀 Starting Final Batch Upload for Korean A1 Golden Record...');

        const dataDir = join(__dirname, '../firestore_data'); // Define dataDir

        for (const moduleFile of modulesToUpload) {
            const filePath = join(dataDir, moduleFile); // Use 'join' from 'path'
            if (!existsSync(filePath)) {
                console.warn(`⚠️ skipping ${moduleFile}: File not found.`);
                continue;
            }
            const data = JSON.parse(readFileSync(filePath, 'utf8')); // Use 'readFileSync' from 'fs'
            const moduleId = data.moduleId;

            console.log(`\nStep: Uploading ${moduleFile} ("${data.title}") to Firestore...`);
            await db.collection('languages').doc('korean').collection('levels').doc('a1').collection('modules').doc(moduleId).set(data, { merge: false });
            console.log(`✓ Uploaded ${moduleId}`);
        }

        console.log('\nStep: Updating Level A1 Metadata...');
        await db.collection('languages').doc('korean').collection('levels').doc('a1').set({
            levelId: 'a1',
            title: 'Beginner (A1)',
            moduleCount: 10,
            status: 'published',
            language: 'korean'
        }, { merge: true });

        console.log('\n✅ Golden Record Finalized! All 10 Modules and Metadata uploaded.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during batch upload:', error);
        process.exit(1);
    }
}

batchUpload();
