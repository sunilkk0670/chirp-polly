const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const spanishA2 = require('../firestore_data/spanish_a2_modules.json');
const germanA2 = require('../firestore_data/german_a2_modules.json');
const italianA2 = require('../firestore_data/italian_a2_modules.json');

async function uploadBatch3A2Modules() {
    const languageModules = [
        { languageId: 'spanish', modules: spanishA2, name: 'Spanish' },
        { languageId: 'german', modules: germanA2, name: 'German' },
        { languageId: 'italian', modules: italianA2, name: 'Italian' }
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

        console.log('\n✅ All Batch 3 A2 modules uploaded successfully!');
        console.log(`Total modules uploaded: ${spanishA2.length + germanA2.length + italianA2.length}`);
        process.exit(0);
    } catch (error) {
        console.error('Error uploading Batch 3 A2 modules:', error);
        process.exit(1);
    }
}

uploadBatch3A2Modules();
