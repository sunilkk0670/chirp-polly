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

async function uploadJapaneseA1Batch() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🇯🇵 BATCH UPLOAD: JAPANESE A1 (MODS 1-4)');
    console.log('═══════════════════════════════════════════════════════\n');

    // Step 1: Ensure Level Metadata
    console.log('Step 1: Fixing level metadata...');
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
    }, { merge: false });
    console.log('✅ Level metadata fixed.\n');

    // Step 2: Upload Modules 1-4
    const moduleFiles = ['ja_a1_m1.json', 'ja_a1_m2.json', 'ja_a1_m3.json', 'ja_a1_m4.json'];

    for (const fileName of moduleFiles) {
        console.log(`Step 2: Uploading ${fileName}...`);
        const modulePath = path.join(__dirname, '../firestore_data/', fileName);
        if (!fs.existsSync(modulePath)) {
            console.error(`❌ File not found: ${modulePath}`);
            continue;
        }

        const moduleData = JSON.parse(fs.readFileSync(modulePath, 'utf8'));
        const moduleId = moduleData.id;

        const moduleRef = db.collection('languages').doc('japanese')
            .collection('levels').doc('a1')
            .collection('modules').doc(moduleId);

        await moduleRef.set(moduleData, { merge: false });
        console.log(`   ✅ ${moduleId} uploaded successfully.\n`);
    }

    // Step 3: Final Verification
    console.log('Step 3: Verification Check...');
    const snapshot = await db.collection('languages').doc('japanese')
        .collection('levels').doc('a1')
        .collection('modules').get();

    console.log(`📊 Total modules in A1 sub-collection: ${snapshot.size}`);
    snapshot.forEach(doc => {
        console.log(`   - Found module: ${doc.id}`);
    });

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ BATCH UPLOAD COMPLETE');
    console.log('═══════════════════════════════════════════════════════');
}

uploadJapaneseA1Batch()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
