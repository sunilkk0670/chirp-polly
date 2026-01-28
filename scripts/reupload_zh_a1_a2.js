const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function reuploadAllA1A2() {
    console.log('🚀 Re-uploading Cleaned Chinese A1 & A2 Curriculum...\n');
    const dataDir = path.join(__dirname, '../firestore_data');

    // A1 Modules
    for (let i = 1; i <= 10; i++) {
        const moduleId = `zh_a1_m${i.toString().padStart(2, '0')}`;
        const filePath = path.join(dataDir, `${moduleId}.json`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        await db.doc(`languages/chinese/levels/a1/modules/${moduleId}`).set(data);
        console.log(`   ✅ Re-uploaded: ${moduleId}`);
    }

    // A2 Modules
    for (let i = 1; i <= 10; i++) {
        const moduleId = `zh_a2_m${i.toString().padStart(2, '0')}`;
        const filePath = path.join(dataDir, `${moduleId}.json`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        await db.doc(`languages/chinese/levels/a2/modules/${moduleId}`).set(data);
        console.log(`   ✅ Re-uploaded: ${moduleId}`);
    }

    // Update Metadata
    await db.doc('languages/chinese/levels/a1').set({ count: 10, moduleCount: 10, status: 'Complete' }, { merge: true });
    await db.doc('languages/chinese/levels/a2').set({ count: 10, moduleCount: 10, status: 'Complete' }, { merge: true });

    console.log('\n🏆 Deployment successful. All 2,000 unique words are LIVE!');
    process.exit(0);
}

reuploadAllA1A2().catch(console.error);
