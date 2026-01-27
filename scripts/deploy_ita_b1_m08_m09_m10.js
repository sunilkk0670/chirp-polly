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
        .collection('levels').doc('b1');

    await moduleRef.collection('modules').doc(moduleId).set(moduleData);
    console.log(`✅ Successfully uploaded ${moduleId}`);
}

async function finalizeB1() {
    console.log('\n📈 Finalizing Italian B1 level metadata...');
    const levelRef = db.collection('languages').doc('italian')
        .collection('levels').doc('b1');

    await levelRef.update({
        count: 10
    });

    console.log('✅ Updated b1 count to 10');
}

async function run() {
    try {
        await uploadB1Module('ita_b1_m08');
        await uploadB1Module('ita_b1_m09');
        await uploadB1Module('ita_b1_m10');
        await finalizeB1();
        console.log('\n🎉 ALL ITALIAN B1 MODULES DEPLOYED!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

run();
