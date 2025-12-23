const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const spanishB1 = require('../firestore_data/spanish_b1_modules.json');
const germanB1 = require('../firestore_data/german_b1_modules.json');
const italianB1 = require('../firestore_data/italian_b1_modules.json');

async function uploadBatch3B1Modules() {
    const languageModules = [
        { languageId: 'spanish', modules: spanishB1, name: 'Spanish' },
        { languageId: 'german', modules: germanB1, name: 'German' },
        { languageId: 'italian', modules: italianB1, name: 'Italian' }
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

        console.log('\n✅ All Batch 3 B1 modules uploaded successfully!');
        console.log(`Total modules uploaded: ${spanishB1.length + germanB1.length + italianB1.length}`);
        console.log('\n🎉 Batch 3 is now complete with A1, A2, and B1 content!');
        process.exit(0);
    } catch (error) {
        console.error('Error uploading Batch 3 B1 modules:', error);
        process.exit(1);
    }
}

uploadBatch3B1Modules();
