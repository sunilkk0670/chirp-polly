const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadM01() {
    const filePath = path.join(__dirname, '../firestore_data/zh_b1_m01.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    await db.doc('languages/chinese/levels/b1/modules/zh_b1_m01').set(data);

    // Update metadata for B1 In Progress
    await db.doc('languages/chinese/levels/b1').set({
        count: 1,
        moduleCount: 10,
        status: 'In Progress'
    }, { merge: true });

    console.log('✅ Chinese B1 Module 01 uploaded and level metadata updated.');
    process.exit(0);
}

uploadM01().catch(console.error);
