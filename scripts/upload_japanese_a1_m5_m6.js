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

async function uploadModules5And6() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🇯🇵 UPLOADING JAPANESE A1 MODULES 5 & 6');
    console.log('═══════════════════════════════════════════════════════\n');

    const modules = ['ja_a1_m5.json', 'ja_a1_m6.json'];

    for (const fileName of modules) {
        console.log(`Uploading ${fileName}...`);
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
        console.log(`   ✅ ${moduleId} uploaded successfully. (Order: ${moduleData.order})\n`);
    }

    // Update level metadata to show 6 modules for now (or 10 total)
    await db.collection('languages').doc('japanese')
        .collection('levels').doc('a1').set({
            moduleCount: 6 // Temporary update to reflect current live modules
        }, { merge: true });

    console.log('Step 3: Verification Check...');
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

uploadModules5And6()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
