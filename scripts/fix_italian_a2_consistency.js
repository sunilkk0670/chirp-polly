const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function fixModuleStructure(moduleId) {
    const filePath = path.join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
    const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`\n🔧 Fixing structure for ${moduleId}...`);

    const moduleRef = db.collection('languages').doc('italian')
        .collection('levels').doc('a2')
        .collection('modules').doc(moduleId);

    // 1. First, delete the documents in the "lessons" sub-collection to clean up the "ghost" collection
    const subCollectionRef = moduleRef.collection('lessons');
    const snapshot = await subCollectionRef.get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    console.log(`   ✅ Cleaned up sub-collection "lessons"`);

    // 2. Now upload the entire module data as a single document with the lessons array
    await moduleRef.set(moduleData);
    console.log(`   ✅ Uploaded with correct Array structure`);
}

async function run() {
    try {
        await fixModuleStructure('ita_a2_m08');
        await fixModuleStructure('ita_a2_m09');
        console.log('\n✨ Consistency restored for M08 and M09!');
    } catch (error) {
        console.error('❌ Error during fix:', error);
    }
}

run();
