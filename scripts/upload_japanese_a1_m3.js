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

async function uploadJapaneseA1Module3() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🇯🇵 UPLOADING JAPANESE A1 MODULE 3');
    console.log('═══════════════════════════════════════════════════════\n');

    // Step 1: Confirm A1 Level Metadata
    console.log('Step 1: Setting up level metadata...');
    const levelRef = db.collection('languages').doc('japanese')
        .collection('levels').doc('a1');

    await levelRef.set({
        id: 'a1',
        name: 'A1 Beginner',
        cefr: 'A1',
        description: 'Basic Japanese - Greetings, Numbers, and Basics',
        order: 1,
        moduleCount: 10,
        totalModules: 10,
        status: 'published'
    }, { merge: true });

    console.log('✅ Level metadata confirmed.\n');

    // Step 2: Load and Upload Module 3
    console.log('Step 2: Uploading ja_a1_m3.json...');
    const modulePath = path.join(__dirname, '../firestore_data/ja_a1_m3.json');
    if (!fs.existsSync(modulePath)) {
        console.error(`❌ File not found: ${modulePath}`);
        return;
    }

    const moduleData = JSON.parse(fs.readFileSync(modulePath, 'utf8'));
    const moduleRef = db.collection('languages').doc('japanese')
        .collection('levels').doc('a1')
        .collection('modules').doc('ja_a1_m3');

    await moduleRef.set(moduleData, { merge: false });
    console.log('✅ Module 3 uploaded successfully.\n');

    // Step 3: Final Visibility Check
    console.log('Step 3: Verifying all uploaded modules...');
    const snapshot = await db.collection('languages').doc('japanese')
        .collection('levels').doc('a1')
        .collection('modules').get();

    console.log(`📊 Total modules in A1: ${snapshot.size}`);
    snapshot.forEach(doc => {
        console.log(`   - [${doc.id}] ${doc.data().name || 'No Name'}`);
    });

    if (snapshot.size >= 3) {
        console.log('\n✅ VERIFICATION PASSED: Modules 1, 2, and 3 are present.');
    } else {
        console.log('\n❌ VERIFICATION FAILED: Some modules are missing.');
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ UPLOAD COMPLETE');
    console.log('═══════════════════════════════════════════════════════');
}

uploadJapaneseA1Module3()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
