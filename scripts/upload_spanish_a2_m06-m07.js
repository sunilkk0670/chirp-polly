/**
 * Batch Upload: Spanish A2 Modules 06-07
 * Social Issues & Media + Art, Literature & History
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const MODULES = [
    {
        file: 'es_a2_m06.json',
        id: 'es_a2_m06',
        order: 6,
        word10: 'Anuncio'
    },
    {
        file: 'es_a2_m07.json',
        id: 'es_a2_m07',
        order: 7,
        word10: 'Escultor'
    }
];

async function uploadSpanishA2Batch0607() {
    try {
        console.log('🚀 Starting Spanish A2 Batch Upload (Modules 06-07)...\n');

        for (const module of MODULES) {
            console.log(`\n${'='.repeat(60)}`);
            console.log(`📦 Processing: ${module.id}`);
            console.log('='.repeat(60));

            const modulePath = path.join(__dirname, '../assets/data/curriculum/es_a2/', module.file);
            const rawData = JSON.parse(fs.readFileSync(modulePath, 'utf8'));

            console.log(`📖 Module ID: ${rawData.module_id}`);
            console.log(`🎯 Theme: ${rawData.theme}`);
            console.log(`📝 Word Count: ${rawData.vocabulary.length}`);
            console.log(`✅ Word #10: ${rawData.vocabulary[9].word} - ${rawData.vocabulary[9].translation}`);

            if (rawData.vocabulary.length !== 100) {
                throw new Error(`❌ ${module.id}: Expected 100 words, got ${rawData.vocabulary.length}`);
            }

            if (rawData.vocabulary[9].word !== module.word10) {
                throw new Error(`❌ ${module.id}: Word #10 should be "${module.word10}", got "${rawData.vocabulary[9].word}"`);
            }

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

        console.log(`\n✅ Total Spanish A2 modules: ${modulesSnapshot.size}/10`);
        console.log('\nAll modules:');
        modulesSnapshot.docs
            .sort((a, b) => a.data().order - b.data().order)
            .forEach(doc => {
                const data = doc.data();
                console.log(`   ${data.order}. ${doc.id}: ${data.theme}`);
            });

        console.log('\n🎉 Modules 06-07 upload complete!');
        console.log(`📊 Progress: ${modulesSnapshot.size}/10 modules (${(modulesSnapshot.size / 10 * 100).toFixed(0)}%)\n`);

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

uploadSpanishA2Batch0607();
