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

async function uploadB1Module(moduleId) {
    const filePath = path.join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
    const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`\n🚀 Uploading ${moduleId} to Firestore (Array Structure)...`);

    const moduleRef = db.collection('languages').doc('italian')
        .collection('levels').doc('b1')
        .collection('modules').doc(moduleId);

    await moduleRef.set(moduleData);
    console.log(`✅ Successfully uploaded ${moduleId}`);
}

async function finalizeB1Batch() {
    console.log('\n📈 Updating Italian B1 level metadata...');
    const levelRef = db.collection('languages').doc('italian')
        .collection('levels').doc('b1');

    await levelRef.update({
        count: 5
    });

    console.log('✅ Updated b1 count to 5');
}

async function run() {
    try {
        await uploadB1Module('ita_b1_m04');
        await uploadB1Module('ita_b1_m05');
        await finalizeB1Batch();
        console.log('\n🎉 ITALIAN B1 MODULES 04 & 05 DEPLOYED!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

run();
