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

async function uploadB1Module21() {
    console.log('🚀 Uploading French B1 Module 21 to Firestore...\n');

    const filePath = path.join(__dirname, '../firestore_data/french_b1_m21.json');

    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        process.exit(1);
    }

    const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`📦 Module: ${moduleData.id}`);
    console.log(`📝 Theme: ${moduleData.theme}`);
    console.log(`📊 Order: ${moduleData.order}`);
    console.log(`📚 Vocabulary Items: ${moduleData.vocabularyItems.length}`);
    console.log(`🎮 Cultural Traps: ${moduleData.liarGameData.culturalTraps.length}`);

    try {
        const docRef = db.collection('languages').doc('french')
            .collection('levels').doc('b1')
            .collection('modules').doc(moduleData.id);

        // CRITICAL: Using merge: false for clean upload
        await docRef.set(moduleData, { merge: false });

        console.log(`\n✅ ${moduleData.id} uploaded successfully!`);
        console.log(`🔒 Upload method: { merge: false } (clean overwrite)`);

        // Verify the upload
        const verifyDoc = await docRef.get();
        if (verifyDoc.exists) {
            const verifyData = verifyDoc.data();
            console.log(`\n🔍 Verification:`);
            console.log(`   ✅ vocabularyItems: ${verifyData.vocabularyItems.length} items`);
            console.log(`   ✅ liarGameData: ${verifyData.liarGameData ? 'PRESENT' : 'MISSING'}`);
            console.log(`   ✅ culturalTraps: ${verifyData.liarGameData?.culturalTraps?.length || 0} traps`);
            console.log(`\n   Sample words:`);
            console.log(`   - Word #1: ${verifyData.vocabularyItems[0].word} (${verifyData.vocabularyItems[0].meaning})`);
            console.log(`   - Word #9: ${verifyData.vocabularyItems[8].word} (${verifyData.vocabularyItems[8].meaning})`);
            console.log(`   - Word #100: ${verifyData.vocabularyItems[99].word} (${verifyData.vocabularyItems[99].meaning})`);
        }

        console.log(`\n🎯 Upload complete! Module is now LIVE in Firebase.`);

    } catch (error) {
        console.error(`\n❌ Upload failed:`, error.message);
        process.exit(1);
    }
}

uploadB1Module21()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
