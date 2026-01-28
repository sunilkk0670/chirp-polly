const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadModule(moduleId) {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Use the lowercase 'b1' for consistency
    const levelId = 'b1';
    const modulePath = `languages/chinese/levels/${levelId}/modules/${moduleId}`;

    console.log(`🚀 Uploading ${moduleId} to ${modulePath}...`);

    // Use delete-and-recreate strategy for reliability
    await db.doc(modulePath).delete();
    await db.doc(modulePath).set(data);

    console.log(`✅ ${moduleId} uploaded successfully.`);
}

async function updateLevelMetadata() {
    const levelPath = `languages/chinese/levels/b1`;
    console.log(`Updating metadata for Chinese B1...`);
    await db.doc(levelPath).update({
        count: 5,
        status: 'In Progress'
    });
    console.log(`✅ Chinese B1 metadata updated: count=5.`);
}

async function run() {
    try {
        await uploadModule('zh_b1_m04');
        await uploadModule('zh_b1_m05');
        await updateLevelMetadata();
        console.log('🎉 Batch upload complete.');
    } catch (error) {
        console.error('❌ Error during upload:', error);
    } finally {
        process.exit();
    }
}

run();
