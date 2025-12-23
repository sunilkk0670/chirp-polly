const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const spanishA1 = require('../firestore_data/spanish_a1_modules.json');
const germanA1 = require('../firestore_data/german_a1_modules.json');
const italianA1 = require('../firestore_data/italian_a1_modules.json');

async function uploadBatch3A1Modules() {
    const languageModules = [
        { languageId: 'spanish', modules: spanishA1, name: 'Spanish' },
        { languageId: 'german', modules: germanA1, name: 'German' },
        { languageId: 'italian', modules: italianA1, name: 'Italian' }
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

        console.log('\n✅ All Batch 3 A1 modules uploaded successfully!');
        console.log(`Total modules uploaded: ${spanishA1.length + germanA1.length + italianA1.length}`);
        process.exit(0);
    } catch (error) {
        console.error('Error uploading Batch 3 A1 modules:', error);
        process.exit(1);
    }
}

uploadBatch3A1Modules();
