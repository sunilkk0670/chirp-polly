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

async function fixJapaneseA1AndUpload() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🇯🇵 FIXING JAPANESE A1 METADATA & UPLOADING MOD 1-2');
    console.log('═══════════════════════════════════════════════════════\n');

    // Step 1: Fix Level Metadata
    console.log('Step 1: Fixing level metadata for languages/japanese/levels/a1...');
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
    }, { merge: false }); // Using merge: false to ensure status is set correctly and old fields removed

    console.log('✅ Level metadata fixed (moduleCount: 10, status: published)\n');

    // Step 2: Upload Modules
    const modulesToUpload = ['ja_a1_m1.json', 'ja_a1_m2.json'];

    for (const fileName of modulesToUpload) {
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
        console.log(`   ✅ ${moduleId} uploaded successfully to sub-collection 'modules'\n`);
    }

    // Step 3: Final Verification
    console.log('Step 3: Verification Check...');
    const snapshot = await db.collection('languages').doc('japanese')
        .collection('levels').doc('a1')
        .collection('modules').get();

    console.log(`📊 Number of modules in sub-collection: ${snapshot.size}`);
    snapshot.forEach(doc => {
        console.log(`   - Found module: ${doc.id}`);
    });

    if (snapshot.size >= 2) {
        console.log('\n✅ VERIFICATION PASSED: Modules correctly nested.');
    } else {
        console.log('\n❌ VERIFICATION FAILED: Missing modules in sub-collection.');
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ DATABASE FIX COMPLETE');
    console.log('═══════════════════════════════════════════════════════');
}

fixJapaneseA1AndUpload()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
