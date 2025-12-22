const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Load the B1 module data
const japaneseB1 = require('../firestore_data/japanese_b1_modules.json');
const frenchB1 = require('../firestore_data/french_b1_modules.json');
const hindiB1 = require('../firestore_data/hindi_b1_modules.json');

async function uploadB1Modules() {
    try {
        console.log('Starting B1 modules upload...\n');

        // Upload Japanese B1 modules
        console.log('Uploading Japanese B1 modules...');
        for (const module of japaneseB1.japanese_b1_modules) {
            const docRef = db.collection('languages').doc('japanese')
                .collection('levels').doc('b1')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        // Upload French B1 modules
        console.log('\nUploading French B1 modules...');
        for (const module of frenchB1.french_b1_modules) {
            const docRef = db.collection('languages').doc('french')
                .collection('levels').doc('b1')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        // Upload Hindi B1 modules
        console.log('\nUploading Hindi B1 modules...');
        for (const module of hindiB1.hindi_b1_modules) {
            const docRef = db.collection('languages').doc('hindi')
                .collection('levels').doc('b1')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        console.log('\n✅ All B1 modules uploaded successfully!');
        console.log('Total modules uploaded: 15 (5 per language)');

    } catch (error) {
        console.error('Error uploading modules:', error);
    }
}

uploadB1Modules();
