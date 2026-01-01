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

async function uploadJapaneseA1Module5() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🇯🇵 UPLOADING JAPANESE A1 MODULE 5');
    console.log('═══════════════════════════════════════════════════════\n');

    // Step 1: Load and Upload Module 5
    console.log('Step 1: Uploading ja_a1_m5.json...');
    const modulePath = path.join(__dirname, '../firestore_data/ja_a1_m5.json');
    if (!fs.existsSync(modulePath)) {
        console.error(`❌ File not found: ${modulePath}`);
        return;
    }

    const moduleData = JSON.parse(fs.readFileSync(modulePath, 'utf8'));
    const moduleRef = db.collection('languages').doc('japanese')
        .collection('levels').doc('a1')
        .collection('modules').doc('ja_a1_m5');

    await moduleRef.set(moduleData, { merge: false });
    console.log('✅ Module 5 uploaded successfully.\n');

    // Step 2: Final Verification
    console.log('Step 2: Verifying uploaded modules...');
    const snapshot = await db.collection('languages').doc('japanese')
        .collection('levels').doc('a1')
        .collection('modules').get();

    console.log(`📊 Total modules in A1: ${snapshot.size}`);
    snapshot.forEach(doc => {
        console.log(`   - [${doc.id}] ${doc.data().name || 'No Name'}`);
    });

    if (snapshot.size >= 5) {
        console.log('\n✅ VERIFICATION PASSED: Modules 1-5 are present.');
    } else {
        console.log('\n⚠️ WARNING: Expected 5 modules, found ' + snapshot.size);
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ UPLOAD COMPLETE');
    console.log('═══════════════════════════════════════════════════════');
}

uploadJapaneseA1Module5()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
