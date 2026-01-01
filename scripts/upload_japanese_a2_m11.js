const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function upload() {
    try {
        console.log('--- Starting Production Upload: Japanese A2 Module 11 ---');

        // 1. Upload Level Metadata
        const metadataPath = path.join(__dirname, '../firestore_data/japanese_a2_level_metadata.json');
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

        console.log('Updating level metadata...');
        await db.collection('languages').doc('japanese')
            .collection('levels').doc('a2')
            .set(metadata, { merge: true });
        console.log('✅ Level metadata updated.');

        // 2. Upload Module 11
        const modulePath = path.join(__dirname, '../firestore_data/ja_a2_m11.json');
        const moduleData = JSON.parse(fs.readFileSync(modulePath, 'utf8'));

        console.log(`Uploading module: ${moduleData.moduleId} (${moduleData.theme})...`);

        // Use the moduleId as the document ID for stability
        await db.collection('languages').doc('japanese')
            .collection('levels').doc('a2')
            .collection('modules').doc(moduleData.moduleId)
            .set(moduleData);

        console.log('✅ Module 11 uploaded successfully.');
        console.log('-------------------------------------------------------');
        process.exit(0);

    } catch (error) {
        console.error('❌ Upload failed:', error);
        process.exit(1);
    }
}

upload();
