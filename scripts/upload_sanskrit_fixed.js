const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function upload() {
    console.log("Starting Sanskrit A1 Fixed Upload...");

    // Read the fixed file
    const dataPath = path.join(__dirname, '../firestore_data/sanskrit_a1_modules_fixed.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    const modules = data.modules;
    const batch = db.batch();

    console.log(`Found ${modules.length} modules to upload.`);

    for (const mod of modules) {
        const ref = db.collection('modules').doc(mod.moduleId);
        // CRITICAL: merge: false as requested to wipe old data
        batch.set(ref, mod, { merge: false });
        console.log(`Queued: ${mod.moduleId} (${mod.vocabularyItems.length} items)`);
    }

    await batch.commit();
    console.log("Upload Completed Successfully.");
}

upload().catch(console.error);
