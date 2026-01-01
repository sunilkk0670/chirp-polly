const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadB1Modules() {
    console.log('🚀 Uploading French B1 Modules 22-24 to Firestore...\n');

    const modules = ['fr_b1_m22', 'fr_b1_m23', 'fr_b1_m24'];

    for (const moduleId of modules) {
        const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);

        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found: ${filePath}`);
            continue;
        }

        const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        console.log(`📦 Uploading ${moduleId}...`);
        console.log(`   Theme: ${moduleData.theme}`);
        console.log(`   Order: ${moduleData.order}`);
        console.log(`   Words: ${moduleData.vocabularyItems.length}`);
        console.log(`   Traps: ${moduleData.liarGameData.culturalTraps.length}`);

        try {
            const docRef = db.collection('languages').doc('french')
                .collection('levels').doc('b1')
                .collection('modules').doc(moduleId);

            // CRITICAL: Using merge: false for clean upload
            await docRef.set(moduleData, { merge: false });

            console.log(`✅ ${moduleId} uploaded successfully!\n`);

        } catch (error) {
            console.error(`❌ ${moduleId} upload failed:`, error.message);
        }
    }

    console.log('🔍 Verifying uploads...\n');

    for (const moduleId of modules) {
        const docRef = db.collection('languages').doc('french')
            .collection('levels').doc('b1')
            .collection('modules').doc(moduleId);

        const doc = await docRef.get();

        if (doc.exists) {
            const data = doc.data();
            console.log(`✅ ${moduleId} verified:`);
            console.log(`   - vocabularyItems: ${data.vocabularyItems.length}`);
            console.log(`   - liarGameData: ${data.liarGameData ? 'PRESENT' : 'MISSING'}`);
            console.log(`   - Word #1: ${data.vocabularyItems[0].word}`);
            console.log(`   - Word #100: ${data.vocabularyItems[99].word}\n`);
        } else {
            console.log(`❌ ${moduleId}: Not found in Firestore\n`);
        }
    }

    console.log('🎯 Upload complete! All modules are now LIVE in Firebase.');
}

uploadB1Modules()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
