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
    console.log('  UPLOADING ENGLISH A2 MODULES 5-7');
    console.log('========================================\n');

    const modules = ['en_a2_m05', 'en_a2_m06', 'en_a2_m07'];

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

    // Update A2 level metadata
    console.log('Updating A2 level metadata...');
    await db
        .collection('languages')
        .doc('english')
        .collection('levels')
        .doc('a2')
        .set({
            moduleCount: 7,
            status: 'In Progress',
            enabled: true,
            totalWords: 700
        }, { merge: true });

    console.log('✅ Metadata updated');
    console.log('\n========================================');
    console.log('  DEPLOYMENT COMPLETE!');
    console.log('========================================');
    console.log('English A2: 7 modules (700 words) deployed');
    console.log('Total English: 1,700 words (A1 + A2)');
    console.log('========================================\n');

    process.exit(0);
}

uploadA2Modules().catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
