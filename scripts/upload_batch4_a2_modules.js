const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const punjabiA2 = require('../firestore_data/punjabi_a2_modules.json');
const portugueseA2 = require('../firestore_data/portuguese_a2_modules.json');

async function uploadBatch4A2Modules() {
    const languageModules = [
        { languageId: 'punjabi', modules: punjabiA2, name: 'Punjabi' },
        { languageId: 'portuguese', modules: portugueseA2, name: 'Portuguese' }
    ];

    try {
        for (const { languageId, modules, name } of languageModules) {
            console.log(`\nUploading ${name} A2 modules...`);

            for (const module of modules) {
                await db
                    .collection('languages')
                    .doc(languageId)
                    .collection('levels')
                    .doc('a2')
                    .collection('modules')
                    .doc(module.moduleId)
                    .set(module);

                console.log(`  ✓ ${module.theme}`);
            }

            console.log(`✅ ${name} A2 complete (${modules.length} modules)`);
        }

        console.log('\n✅ All Batch 4 A2 modules uploaded successfully!');
        console.log(`Total modules uploaded: ${punjabiA2.length + portugueseA2.length}`);
        process.exit(0);
    } catch (error) {
        console.error('Error uploading Batch 4 A2 modules:', error);
        process.exit(1);
    }
}

uploadBatch4A2Modules();
