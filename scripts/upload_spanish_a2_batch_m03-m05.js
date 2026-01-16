/**
 * Batch Upload: Spanish A2 Modules 03, 04, 05
 * Upload three modules at once to Firestore
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const MODULES = [
    {
        file: 'es_a2_m03.json',
        id: 'es_a2_m03',
        order: 3,
        word10: 'Pasaje'
    },
    {
        file: 'es_a2_m04.json',
        id: 'es_a2_m04',
        order: 4,
        word10: 'Media jornada'
    },
    {
        file: 'es_a2_m05.json',
        id: 'es_a2_m05',
        order: 5,
        word10: 'Descanso'
    }
];

async function uploadSpanishA2Batch() {
    try {
        console.log('🚀 Starting Spanish A2 Batch Upload (Modules 03-05)...\n');

        for (const module of MODULES) {
            console.log(`\n${'='.repeat(60)}`);
            console.log(`📦 Processing: ${module.id}`);
            console.log('='.repeat(60));

            // Read the JSON file
            const modulePath = path.join(__dirname, '../assets/data/curriculum/es_a2/', module.file);
            const rawData = JSON.parse(fs.readFileSync(modulePath, 'utf8'));

            console.log(`📖 Module ID: ${rawData.module_id}`);
            console.log(`🎯 Theme: ${rawData.theme}`);
            console.log(`📝 Word Count: ${rawData.vocabulary.length}`);
            console.log(`✅ Word #10: ${rawData.vocabulary[9].word} - ${rawData.vocabulary[9].translation}`);

            // Validate word count
            if (rawData.vocabulary.length !== 100) {
                throw new Error(`❌ ${module.id}: Expected 100 words, got ${rawData.vocabulary.length}`);
            }

            // Validate word #10
            if (rawData.vocabulary[9].word !== module.word10) {
                throw new Error(`❌ ${module.id}: Word #10 should be "${module.word10}", got "${rawData.vocabulary[9].word}"`);
            }

            // Transform to Firestore format
            const moduleData = {
                moduleId: module.id,
                theme: rawData.theme,
                order: module.order,
                targetWordCount: rawData.vocabulary.length,
                lessons: rawData.vocabulary.map((item, index) => ({
                    lessonId: `lesson_${index + 1}`,
                    vocabularyItems: [{
                        targetText: item.word,
                        translation: item.translation,
                        phonetic: item.phonetic,
                        type: 'vocabulary'
                    }]
                }))
            };

            // Upload to Firestore
            const moduleRef = db
                .collection('languages')
                .doc('spanish')
                .collection('levels')
                .doc('a2')
                .collection('modules')
                .doc(module.id);

            console.log('📤 Uploading to Firestore...');
            await moduleRef.set(moduleData, { merge: false });
            console.log(`✅ ${module.id} uploaded successfully!`);
        }

        // Final verification
        console.log(`\n${'='.repeat(60)}`);
        console.log('🔍 Final Verification');
        console.log('='.repeat(60));

        const modulesSnapshot = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a2')
            .collection('modules')
            .get();

        console.log(`\n✅ Total Spanish A2 modules in Firestore: ${modulesSnapshot.size}`);
        console.log('\nAll modules:');
        modulesSnapshot.docs.forEach(doc => {
            const data = doc.data();
            console.log(`   - ${doc.id}: ${data.theme} (${data.targetWordCount} words)`);
        });

        console.log('\n🎉 Batch upload complete!');
        console.log('📍 Next step: Hot restart (R) and verify in UI\n');

    } catch (error) {
        console.error('❌ Error during batch upload:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

// Execute
uploadSpanishA2Batch();
