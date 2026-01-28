const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function debugUpload() {
    const dataDir = path.join(__dirname, '../firestore_data');

    // Test with just two modules
    const testModules = ['zh_a1_m03.json', 'zh_a2_m01.json'];

    for (const file of testModules) {
        const filePath = path.join(dataDir, file);
        console.log(`\n📂 Reading: ${filePath}`);

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        console.log(`   Module ID: ${data.module_id}`);
        console.log(`   Theme (from file): ${data.theme}`);
        console.log(`   Level: ${data.level}`);

        const modulePath = `languages/chinese/levels/${data.level}/modules/${data.module_id}`;
        console.log(`   Firestore path: ${modulePath}`);

        // Upload
        await db.doc(modulePath).set(data);
        console.log(`   ✅ Uploaded`);

        // Immediately read back
        const doc = await db.doc(modulePath).get();
        if (doc.exists) {
            const firestoreData = doc.data();
            console.log(`   Theme (from Firestore): ${firestoreData.theme}`);

            if (data.theme !== firestoreData.theme) {
                console.log(`   ⚠️  MISMATCH DETECTED!`);
            }
        }
    }

    process.exit(0);
}

debugUpload();
