import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account
const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Load the Korean A1 Module 01
const moduleData = JSON.parse(
    readFileSync(join(__dirname, '../firestore_data/ko_a1_m01.json'), 'utf8')
);

async function uploadKoreanA1() {
    try {
        console.log('\n🚀 Starting Korean A1 Initialization...\n');

        // 1. Update Level Metadata
        console.log('Step 1: Updating Level Metadata (languages/korean/levels/a1)...');
        const levelRef = db.collection('languages').doc('korean').collection('levels').doc('a1');
        await levelRef.set({
            levelId: 'a1',
            moduleCount: 10,
            status: 'published',
            title: 'Beginner A1',
            order: 1
        }, { merge: true });
        console.log('✓ Level metadata updated.\n');

        // 2. Upload Module 1
        console.log('Step 2: Uploading ko_a1_m01 to Firestore...');
        const moduleRef = levelRef.collection('modules').doc(moduleData.moduleId);
        await moduleRef.set(moduleData, { merge: false });
        console.log(`✓ Uploaded Module: ${moduleData.title} (${moduleData.moduleId})\n`);

        // 3. Verification
        console.log('Step 3: Verifying upload...');
        const doc = await moduleRef.get();
        if (doc.exists) {
            const data = doc.data();
            const wordCount = data.lessons[0].words.length;
            console.log(`✓ Verification successful!`);
            console.log(`  - Words in Firestore: ${wordCount}`);
            console.log(`  - Last word: ${data.lessons[0].words[wordCount - 1].word}\n`);
        }

        console.log('✅ Korean A1 Module 1 & Metadata Initialization Complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during Korean A1 upload:', error);
        process.exit(1);
    }
}

uploadKoreanA1();
