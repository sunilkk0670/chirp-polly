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

async function uploadModule(moduleId) {
    const filePath = path.join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
    const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`\n🚀 Uploading ${moduleId} to Firestore (Array Structure)...`);

    const moduleRef = db.collection('languages').doc('italian')
        .collection('levels').doc('a2')
        .collection('modules').doc(moduleId);

    // Upload as ONE document (lessons is an array inside moduleData)
    await moduleRef.set(moduleData);
    console.log(`✅ Successfully uploaded ${moduleId}`);
}

async function finalizeA2() {
    console.log('\n📈 Finalizing Italian A2 Curriculum...');
    const levelRef = db.collection('languages').doc('italian')
        .collection('levels').doc('a2');

    await levelRef.set({
        count: 10,
        moduleCount: 10
    }, { merge: true });

    console.log('✅ Updated a2/count and a2/moduleCount to 10');
}

async function run() {
    try {
        await uploadModule('ita_a2_m10');
        await finalizeA2();
        console.log('\n🎉 ITALIAN A2 CURRICULUM COMPLETE!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

run();
