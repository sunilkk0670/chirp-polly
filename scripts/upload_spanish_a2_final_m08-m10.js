/**
 * FINAL BATCH: Spanish A2 Modules 08-10
 * Complete the Spanish A2 Curriculum!
 * 
 * Module 08: Home, Living & Interior
 * Module 09: Hobbies, Leisure & Social
 * Module 10: Abstract Concepts & Review (Final word: "A2 Completado")
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const MODULES = [
    {
        file: 'es_a2_m08.json',
        id: 'es_a2_m08',
        order: 8,
        word10: 'Terraza'
    },
    {
        file: 'es_a2_m09.json',
        id: 'es_a2_m09',
        order: 9,
        word10: 'Cine'
    },
    {
        file: 'es_a2_m10.json',
        id: 'es_a2_m10',
        order: 10,
        word10: 'Deseo',
        lastWord: 'A2 Completado'
    }
];

async function uploadSpanishA2Final() {
    try {
        console.log('🎊 FINAL BATCH: Spanish A2 Modules 08-10 🎊\n');
        console.log('Completing the Spanish A2 Curriculum!\n');

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

            // Special validation for Module 10
            if (module.lastWord) {
                const lastWordIndex = rawData.vocabulary.length - 1;
                const lastWord = rawData.vocabulary[lastWordIndex].word;
                console.log(`🏆 FINAL WORD: ${lastWord} - ${rawData.vocabulary[lastWordIndex].translation}`);

                if (lastWord !== module.lastWord) {
                    throw new Error(`❌ Last word should be "${module.lastWord}", got "${lastWord}"`);
                }
            }

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
        console.log('🎉 SPANISH A2 CURRICULUM COMPLETE! 🎉');
        console.log('='.repeat(60));

        const modulesSnapshot = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a2')
            .collection('modules')
            .get();

        console.log(`\n✅ Total Spanish A2 modules: ${modulesSnapshot.size}/10`);
        console.log('\n📚 Complete Module List:');
        modulesSnapshot.docs
            .sort((a, b) => a.data().order - b.data().order)
            .forEach(doc => {
                const data = doc.data();
                console.log(`   ${data.order.toString().padStart(2, '0')}. ${doc.id}: ${data.theme}`);
            });

        console.log('\n📊 Spanish Curriculum Summary:');
        console.log('   - Spanish A1: 10 modules (1,000 words) ✅');
        console.log('   - Spanish A2: 10 modules (1,000 words) ✅');
        console.log('   - Total: 2,000 Spanish words!');

        console.log('\n🎊 Congratulations! Spanish A2 is complete!');
        console.log('📍 Next: Hot restart (R) and verify "A2 Completado" as the last word\n');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

uploadSpanishA2Final();
