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

async function uploadVerifiedModule(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`Error: File not found at ${filePath}`);
        return;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const fileName = path.basename(filePath, '.json');

    // Parse parts from filename (e.g., french_a1_m1)
    const parts = fileName.split('_');
    if (parts.length < 3) {
        console.error('Error: Unexpected filename format. Expected lang_level_mX.json');
        return;
    }

    const lang = parts[0];
    const level = parts[1];
    const moduleId = fileName; // fr_a1_m1 or french_a1_m1

    console.log(`🚀 Uploading VERIFIED module: ${moduleId} to languages/${lang}/levels/${level}/modules/${moduleId}`);

    const docRef = db.collection('languages').doc(lang)
        .collection('levels').doc(level)
        .collection('modules').doc(moduleId);

    // CRITICAL: Merge false to PURGE recursion/repetitive artifacts
    await docRef.set(data, { merge: false });

    console.log(`✅ SUCCESS: ${moduleId} uploaded with { merge: false }.`);
}

// Target the approved French A1 Module 2
const target = path.join(__dirname, '../firestore_data/french_a1_m2.json');
uploadVerifiedModule(target).catch(console.error);
