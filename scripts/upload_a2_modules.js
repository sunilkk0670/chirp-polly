const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Load the A2 module data
const japaneseA2 = require('../firestore_data/japanese_a2_modules.json');
const frenchA2 = require('../firestore_data/french_a2_modules.json');
const hindiA2 = require('../firestore_data/hindi_a2_modules.json');

async function uploadA2Modules() {
    try {
        console.log('Starting A2 modules upload...\n');

        // Upload Japanese A2 modules
        console.log('Uploading Japanese A2 modules...');
        for (const module of japaneseA2.japanese_a2_modules) {
            const docRef = db.collection('languages').doc('japanese')
                .collection('levels').doc('a2')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        // Upload French A2 modules
        console.log('\nUploading French A2 modules...');
        for (const module of frenchA2.french_a2_modules) {
            const docRef = db.collection('languages').doc('french')
                .collection('levels').doc('a2')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        // Upload Hindi A2 modules
        console.log('\nUploading Hindi A2 modules...');
        for (const module of hindiA2.hindi_a2_modules) {
            const docRef = db.collection('languages').doc('hindi')
                .collection('levels').doc('a2')
                .collection('modules').doc();

            await docRef.set(module);
            console.log(`✓ Uploaded: ${module.theme}`);
        }

        console.log('\n✅ All A2 modules uploaded successfully!');
        console.log('Total modules uploaded: 15 (5 per language)');

    } catch (error) {
        console.error('Error uploading modules:', error);
    }
}

uploadA2Modules();
