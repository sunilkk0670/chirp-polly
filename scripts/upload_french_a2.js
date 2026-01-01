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

async function uploadA2Module(moduleFile, targetId) {
    console.log(`🚀 Uploading ${moduleFile} to fr_a2_modules/${targetId}`);

    const filePath = path.join(__dirname, '../firestore_data', moduleFile);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        return;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Ensure all required fields are present
    if (!data.order || !data.moduleId || !data.theme || !data.vocabularyItems) {
        console.error('❌ Missing required fields (order, moduleId, theme, vocabularyItems)');
        return;
    }

    console.log(`   ID: ${data.id}`);
    console.log(`   Order: ${data.order}`);
    console.log(`   Theme: ${data.theme}`);
    console.log(`   Items: ${data.vocabularyItems.length}`);

    // Upload to Firestore with merge: false
    await db.collection('languages').doc('french')
        .collection('levels').doc('a2')
        .collection('modules').doc(targetId)
        .set(data, { merge: false });

    console.log(`✅ ${targetId} uploaded successfully!`);
}

// Upload Modules 18, 19, and 20
async function runBatch() {
    await uploadA2Module('french_a2_m18.json', 'fr_a2_m18');
    await uploadA2Module('french_a2_m19.json', 'fr_a2_m19');
    await uploadA2Module('french_a2_m20.json', 'fr_a2_m20');
}

runBatch().catch(console.error);
