const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const punjabiA1 = require('../firestore_data/punjabi_a1_modules.json');
const portugueseA1 = require('../firestore_data/portuguese_a1_modules.json');

async function uploadBatch4A1Modules() {
    const languageModules = [
        { languageId: 'punjabi', modules: punjabiA1, name: 'Punjabi' },
        { languageId: 'portuguese', modules: portugueseA1, name: 'Portuguese' }
    ];

    try {
        for (const { languageId, modules, name } of languageModules) {
            console.log(`\nUploading ${name} A1 modules...`);

            for (const module of modules) {
                await db
                    .collection('languages')
                    .doc(languageId)
                    .collection('levels')
                    .doc('a1')
                    .collection('modules')
                    .doc(module.moduleId)
                    .set(module);

                console.log(`  ✓ ${module.theme}`);
            }

            console.log(`✅ ${name} A1 complete (${modules.length} modules)`);
        }

        console.log('\n✅ All Batch 4 A1 modules uploaded successfully!');
        console.log(`Total modules uploaded: ${punjabiA1.length + portugueseA1.length}`);
        process.exit(0);
    } catch (error) {
        console.error('Error uploading Batch 4 A1 modules:', error);
        process.exit(1);
    }
}

uploadBatch4A1Modules();
