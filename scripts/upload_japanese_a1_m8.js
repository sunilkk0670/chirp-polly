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

async function uploadModule8() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🇯🇵 UPLOADING JAPANESE A1 MODULE 8');
    console.log('═══════════════════════════════════════════════════════\n');

    const fileName = 'ja_a1_m8.json';
    console.log(`Uploading ${fileName}...`);
    const modulePath = path.join(__dirname, '../firestore_data/', fileName);
    if (!fs.existsSync(modulePath)) {
        console.error(`❌ File not found: ${modulePath}`);
        return;
    }

    const moduleData = JSON.parse(fs.readFileSync(modulePath, 'utf8'));
    const moduleId = moduleData.id;

    const moduleRef = db.collection('languages').doc('japanese')
        .collection('levels').doc('a1')
        .collection('modules').doc(moduleId);

    await moduleRef.set(moduleData, { merge: false });
    console.log(`   ✅ ${moduleId} uploaded successfully. (Order: ${moduleData.order})\n`);

    // Update level metadata to show 8 modules live
    await db.collection('languages').doc('japanese')
        .collection('levels').doc('a1').set({
            moduleCount: 8
        }, { merge: true });

    console.log('Step 2: Verification Check...');
    const snapshot = await db.collection('languages').doc('japanese')
        .collection('levels').doc('a1')
        .collection('modules').orderBy('order').get();

    console.log(`📊 Total modules in A1: ${snapshot.size}`);
    snapshot.forEach(doc => {
        console.log(`   - [Order ${doc.data().order}] ${doc.id}`);
    });

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ UPLOAD COMPLETE');
    console.log('═══════════════════════════════════════════════════════');
}

uploadModule8()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
