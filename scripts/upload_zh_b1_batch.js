const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadBatch(moduleIds) {
    const dataDir = path.join(__dirname, '../firestore_data');

    for (const moduleId of moduleIds) {
        const filePath = path.join(dataDir, `${moduleId}.json`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const modulePath = `languages/chinese/levels/b1/modules/${moduleId}`;
        await db.doc(modulePath).set(data);
        console.log(`🚀 Uploaded: ${moduleId}`);
    }

    // Update level metadata
    const levelPath = `languages/chinese/levels/b1`;
    await db.doc(levelPath).set({
        count: moduleIds[moduleIds.length - 1].split('_m')[1] * 1, // Get number from last ID (e.g. 03)
        moduleCount: 10,
        status: 'In Progress'
    }, { merge: true });

    console.log(`✅ Level metadata updated for Chinese B1.`);
    process.exit(0);
}

const modulesToUpload = process.argv.slice(2);
if (modulesToUpload.length === 0) {
    console.log('Usage: node scripts/upload_zh_b1_batch.js module_id1 module_id2 ...');
} else {
    uploadBatch(modulesToUpload);
}
