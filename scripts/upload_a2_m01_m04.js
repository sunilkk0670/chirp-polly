const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadA2Modules() {
    console.log('========================================');
    console.log('  UPLOADING ENGLISH A2 MODULES 1-4');
    console.log('========================================\n');

    const modules = ['en_a2_m01', 'en_a2_m02', 'en_a2_m03', 'en_a2_m04'];

    for (const moduleId of modules) {
        const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
        const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        console.log(`Uploading ${moduleId}...`);
        console.log(`  Theme: ${moduleData.theme}`);
        console.log(`  Words: ${moduleData.vocabularyItems.length}`);

        await db
            .collection('languages')
            .doc('english')
            .collection('levels')
            .doc('a2')
            .collection('modules')
            .doc(moduleId)
            .set(moduleData);

        console.log(`✅ ${moduleId} uploaded\n`);
    }

    console.log('========================================');
    console.log('  UPLOAD COMPLETE!');
    console.log('========================================');
    console.log('English A2: All 7 modules now deployed');
    console.log('========================================\n');

    process.exit(0);
}

uploadA2Modules().catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
