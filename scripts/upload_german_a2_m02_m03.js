import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

async function uploadGermanA2Modules() {
    try {
        console.log('🚀 Starting German A2 Modules 02 & 03 Upload\n');

        // Load M02
        const m02Path = join(__dirname, '..', 'firestore_data', 'de_a2_m02.json');
        const m02Data = JSON.parse(readFileSync(m02Path, 'utf8'));

        // Load M03
        const m03Path = join(__dirname, '..', 'firestore_data', 'de_a2_m03.json');
        const m03Data = JSON.parse(readFileSync(m03Path, 'utf8'));

        // Upload M02
        console.log('📤 Uploading de_a2_m02...');
        await db.collection('languages').doc('german')
            .collection('levels').doc('a2')
            .collection('modules').doc('de_a2_m02')
            .set(m02Data);
        console.log('✅ de_a2_m02 uploaded successfully');
        console.log(`   Theme: ${m02Data.theme}`);
        console.log(`   Words: ${m02Data.lessons[0].vocabularyItems.length}\n`);

        // Upload M03
        console.log('📤 Uploading de_a2_m03...');
        await db.collection('languages').doc('german')
            .collection('levels').doc('a2')
            .collection('modules').doc('de_a2_m03')
            .set(m03Data);
        console.log('✅ de_a2_m03 uploaded successfully');
        console.log(`   Theme: ${m03Data.theme}`);
        console.log(`   Words: ${m03Data.lessons[0].vocabularyItems.length}\n`);

        // Update A2 level metadata
        console.log('📊 Updating A2 level metadata...');
        await db.collection('languages').doc('german')
            .collection('levels').doc('a2')
            .set({
                count: 3,
                status: 'In Progress',
                description: 'Elementary German - A2 Level'
            }, { merge: true });
        console.log('✅ A2 level metadata updated');
        console.log('   Module Count: 3');
        console.log('   Status: In Progress\n');

        console.log('🎉 German A2 Modules 02 & 03 Deployment Complete!\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Upload failed:', error);
        process.exit(1);
    }
}

uploadGermanA2Modules();
