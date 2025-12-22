const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Load the A2 module data for Batch 2
const koreanA2 = require('../firestore_data/korean_a2_modules.json');
const chineseA2 = require('../firestore_data/chinese_a2_modules.json');
const sanskritA2 = require('../firestore_data/sanskrit_a2_modules.json');

async function uploadBatch2A2Modules() {
    try {
        console.log('Starting Batch 2 A2 modules upload...\n');

        // Upload Korean A2 modules
        console.log('Uploading Korean A2 modules...');
        for (const module of koreanA2.korean_a2_modules) {
            const docRef = db.collection('languages').doc('korean')
                .collection('levels').doc('a2')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        // Upload Chinese A2 modules
        console.log('\nUploading Chinese A2 modules...');
        for (const module of chineseA2.chinese_a2_modules) {
            const docRef = db.collection('languages').doc('chinese')
                .collection('levels').doc('a2')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        // Upload Sanskrit A2 modules
        console.log('\nUploading Sanskrit A2 modules...');
        for (const module of sanskritA2.sanskrit_a2_modules) {
            const docRef = db.collection('languages').doc('sanskrit')
                .collection('levels').doc('a2')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        console.log('\n✅ All Batch 2 A2 modules uploaded successfully!');
        console.log('Total modules uploaded: 15 (5 per language)');
        console.log('Languages: Korean, Chinese, Sanskrit');

    } catch (error) {
        console.error('Error uploading modules:', error);
    }
}

uploadBatch2A2Modules();
