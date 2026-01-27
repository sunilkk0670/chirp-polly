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

async function initializeB1Metadata() {
    console.log('\n📈 Initializing Italian B1 level metadata...');
    const levelRef = db.collection('languages').doc('italian')
        .collection('levels').doc('b1');

    await levelRef.set({
        count: 1,
        moduleCount: 10,
        id: 'b1',
        name: 'B1 - Intermediate',
        cefr: 'B1',
        status: 'In Progress',
        order: 3,
        description: 'Intermediate Italian - Narrative, Complex Social Situations, and Future Planning'
    }, { merge: true });

    console.log('✅ Updated b1 metadata');
}

async function run() {
    try {
        await uploadB1Module('ita_b1_m01');
        await initializeB1Metadata();
        console.log('\n🎉 ITALIAN B1 MODULE 01 DEPLOYED!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

run();
