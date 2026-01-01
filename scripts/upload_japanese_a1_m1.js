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

async function uploadJapaneseA1Module1() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🇯🇵 UPLOADING JAPANESE A1 MODULE 1');
    console.log('═══════════════════════════════════════════════════════\n');

    // Step 1: Ensure level metadata exists
    console.log('Step 1: Setting up level metadata...');
    const levelRef = db.collection('languages').doc('japanese')
        .collection('levels').doc('a1');

    await levelRef.set({
        id: 'a1',
        name: 'A1',
        cefr: 'A1',
        description: 'Beginner - Basic greetings and expressions',
        order: 1,
        moduleCount: 10,
        totalModules: 10
    }, { merge: true });

    console.log('✅ Level metadata set (moduleCount: 10)\n');

    // Step 2: Load Module 1 data
    console.log('Step 2: Loading Module 1 data...');
    const modulePath = path.join(__dirname, '../firestore_data/ja_a1_m1.json');
    const moduleData = JSON.parse(fs.readFileSync(modulePath, 'utf8'));

    console.log(`   - Module ID: ${moduleData.id}`);
    console.log(`   - Words: ${moduleData.vocabularyItems.length}`);
    console.log(`   - Traps: ${moduleData.liarGameData.culturalTraps.length}\n`);

    // Step 3: Upload Module 1 with merge: false
    console.log('Step 3: Uploading Module 1 to Firestore...');
    const moduleRef = db.collection('languages').doc('japanese')
        .collection('levels').doc('a1')
        .collection('modules').doc('ja_a1_m1');

    await moduleRef.set(moduleData, { merge: false });
    console.log('✅ Module 1 uploaded successfully\n');

    // Step 4: Verify upload
    console.log('Step 4: Verifying upload...');
    const doc = await moduleRef.get();

    if (doc.exists) {
        const data = doc.data();
        console.log('✅ Module 1 verified in Firestore:');
        console.log(`   - vocabularyItems: ${data.vocabularyItems.length}`);
        console.log(`   - liarGameData: ${data.liarGameData ? 'PRESENT' : 'MISSING'}`);
        console.log(`   - Word #1: ${data.vocabularyItems[0].word} (${data.vocabularyItems[0].meaning})`);
        console.log(`   - Word #100: ${data.vocabularyItems[99].word} (${data.vocabularyItems[99].meaning})`);
    } else {
        console.log('❌ Module 1 not found in Firestore');
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ UPLOAD COMPLETE');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📱 Module 1 should now be visible in the app');
    console.log('🔍 Path: languages/japanese/levels/a1/modules/ja_a1_m1');
}

uploadJapaneseA1Module1()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
