const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Load the B1 module data for Batch 2
const koreanB1 = require('../firestore_data/korean_b1_modules.json');
const chineseB1 = require('../firestore_data/chinese_b1_modules.json');
const sanskritB1 = require('../firestore_data/sanskrit_b1_modules.json');

async function uploadBatch2B1Modules() {
    try {
        console.log('Starting Batch 2 B1 modules upload...\n');

        // Upload Korean B1 modules
        console.log('Uploading Korean B1 modules...');
        for (const module of koreanB1.korean_b1_modules) {
            const docRef = db.collection('languages').doc('korean')
                .collection('levels').doc('b1')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        // Upload Chinese B1 modules
        console.log('\nUploading Chinese B1 modules...');
        for (const module of chineseB1.chinese_b1_modules) {
            const docRef = db.collection('languages').doc('chinese')
                .collection('levels').doc('b1')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        // Upload Sanskrit B1 modules
        console.log('\nUploading Sanskrit B1 modules...');
        for (const module of sanskritB1.sanskrit_b1_modules) {
            const docRef = db.collection('languages').doc('sanskrit')
                .collection('levels').doc('b1')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        console.log('\n✅ All Batch 2 B1 modules uploaded successfully!');
        console.log('Total modules uploaded: 15 (5 per language)');
        console.log('Languages: Korean, Chinese, Sanskrit');
        console.log('\n🎉 Batch 2 is now complete with A1, A2, and B1 content!');

    } catch (error) {
        console.error('Error uploading modules:', error);
    }
}

uploadBatch2B1Modules();
