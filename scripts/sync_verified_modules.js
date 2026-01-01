const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function cleanupAndUpload() {
    console.log('🧹 STARTING DATABASE CLEANUP AND VERIFIED UPLOAD...');

    const modulesToUpload = [
        { file: 'french_a1_m1.json', targetId: 'fr_a1_m1' },
        { file: 'french_a1_m2.json', targetId: 'fr_a1_m2' },
        { file: 'french_a1_m3.json', targetId: 'fr_a1_m3' },
        { file: 'french_a1_m4.json', targetId: 'fr_a1_m4' },
        { file: 'french_a1_m5.json', targetId: 'fr_a1_m5' },
        { file: 'french_a1_m6.json', targetId: 'fr_a1_m6' },
        { file: 'french_a1_m7.json', targetId: 'fr_a1_m7' },
        { file: 'french_a1_m8.json', targetId: 'fr_a1_m8' },
        { file: 'french_a1_m9.json', targetId: 'fr_a1_m9' },
        { file: 'french_a1_m10.json', targetId: 'fr_a1_m10' }
    ];

    const extraDocsToDelete = [
        'french_a1_m1', 'french_a1_m2', 'french_a1_m3', 'french_a1_m4', 'french_a1_m5',
        'french_a1_m6', 'french_a1_m7', 'french_a1_m8', 'french_a1_m9', 'french_a1_m10'
    ];

    // 1. Upload verified data to CORRECT IDs
    for (const mod of modulesToUpload) {
        const filePath = path.join(__dirname, '../firestore_data', mod.file);
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found: ${mod.file}`);
            continue;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // CRITICAL: Extract module number for 'order'
        const modNum = parseInt(mod.targetId.split('_m')[1]);

        // Ensure app-required fields are present
        data.id = mod.targetId;
        data.moduleId = mod.targetId;
        data.order = modNum;
        data.theme = data.name || `Module ${modNum}`;

        console.log(`🚀 Uploading verified content to: fr_a1_modules/${mod.targetId} (Order: ${data.order})`);
        await db.collection('languages').doc('french')
            .collection('levels').doc('a1')
            .collection('modules').doc(mod.targetId)
            .set(data, { merge: false });

        console.log(`  ✅ ${mod.targetId} is now live and ordered.`);
    }

    // 2. Delete redundant docs
    for (const docId of extraDocsToDelete) {
        console.log(`🗑️  Deleting redundant document: ${docId}`);
        await db.collection('languages').doc('french')
            .collection('levels').doc('a1')
            .collection('modules').doc(docId)
            .delete();
    }

    console.log('\n✨ APP DEPLOYMENT COMPLETE. All modules now have "order" and "theme" fields.');
}

cleanupAndUpload().catch(console.error);
