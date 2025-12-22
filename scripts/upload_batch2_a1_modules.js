const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Load the A1 module data for Batch 2
const koreanA1 = require('../firestore_data/korean_a1_modules.json');
const chineseA1 = require('../firestore_data/chinese_a1_modules.json');
const sanskritA1 = require('../firestore_data/sanskrit_a1_modules.json');

async function uploadBatch2A1Modules() {
    try {
        console.log('Starting Batch 2 A1 modules upload...\n');

        // Upload Korean A1 modules
        console.log('Uploading Korean A1 modules...');
        for (const module of koreanA1.korean_a1_modules) {
            const docRef = db.collection('languages').doc('korean')
                .collection('levels').doc('a1')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        // Upload Chinese A1 modules
        console.log('\nUploading Chinese A1 modules...');
        for (const module of chineseA1.chinese_a1_modules) {
            const docRef = db.collection('languages').doc('chinese')
                .collection('levels').doc('a1')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        // Upload Sanskrit A1 modules
        console.log('\nUploading Sanskrit A1 modules...');
        for (const module of sanskritA1.sanskrit_a1_modules) {
            const docRef = db.collection('languages').doc('sanskrit')
                .collection('levels').doc('a1')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        console.log('\n✅ All Batch 2 A1 modules uploaded successfully!');
        console.log('Total modules uploaded: 15 (5 per language)');
        console.log('Languages: Korean, Chinese, Sanskrit');

    } catch (error) {
        console.error('Error uploading modules:', error);
    }
}

uploadBatch2A1Modules();
