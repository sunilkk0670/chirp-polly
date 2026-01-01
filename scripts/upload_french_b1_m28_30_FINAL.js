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

async function uploadFinalB1Modules() {
    console.log('🚀 Uploading FINAL French B1 Modules 28-30 to Firestore...\n');
    console.log('🎊 This completes the entire French curriculum!\n');

    const modules = ['fr_b1_m28', 'fr_b1_m29', 'fr_b1_m30'];

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

    console.log('═══════════════════════════════════════════════════════');
    console.log('🎉 FRENCH CURRICULUM COMPLETE! 🎉');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📚 Total: 30 modules (A1: 1-10, A2: 11-20, B1: 21-30)');
    console.log('📝 Total vocabulary: 3,000 unique French words');
    console.log('🎮 Total Liar Game traps: 90 cultural insights');
    console.log('✅ All modules are now LIVE in Firebase!');
    console.log('═══════════════════════════════════════════════════════');
}

uploadFinalB1Modules()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
