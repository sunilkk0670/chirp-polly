const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const punjabiB1 = require('../firestore_data/punjabi_b1_modules.json');
const portugueseB1 = require('../firestore_data/portuguese_b1_modules.json');

async function uploadBatch4B1Modules() {
    const languageModules = [
        { languageId: 'punjabi', modules: punjabiB1, name: 'Punjabi' },
        { languageId: 'portuguese', modules: portugueseB1, name: 'Portuguese' }
    ];

    try {
        for (const { languageId, modules, name } of languageModules) {
            console.log(`\nUploading ${name} B1 modules...`);

            for (const module of modules) {
                await db
                    .collection('languages')
                    .doc(languageId)
                    .collection('levels')
                    .doc('b1')
                    .collection('modules')
                    .doc(module.moduleId)
                    .set(module);

                console.log(`  ✓ ${module.theme}`);
            }

            console.log(`✅ ${name} B1 complete (${modules.length} modules)`);
        }

        console.log('\n✅ All Batch 4 B1 modules uploaded successfully!');
        console.log(`Total modules uploaded: ${punjabiB1.length + portugueseB1.length}`);
        console.log('\n🎉 Batch 4 is now complete with A1, A2, and B1 content!');
        process.exit(0);
    } catch (error) {
        console.error('Error uploading Batch 4 B1 modules:', error);
        process.exit(1);
    }
}

uploadBatch4B1Modules();
