/**
 * Upload Spanish A2 Module 01 to Firestore
 * Module ID: es_a2_m01
 * Theme: The Past Tense & Childhood
 * Words: 1,001 - 1,100
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

async function uploadSpanishA2Module01() {
    try {
        console.log('🚀 Starting Spanish A2 Module 01 upload...\n');

        // Read the JSON file
        const modulePath = path.join(__dirname, '../assets/data/curriculum/es_a2/es_a2_m01.json');
        const rawData = JSON.parse(fs.readFileSync(modulePath, 'utf8'));

        console.log(`📖 Module ID: ${rawData.module_id}`);
        console.log(`🌍 Language: ${rawData.language}`);
        console.log(`📊 Level: ${rawData.level}`);
        console.log(`🎯 Theme: ${rawData.theme}`);
        console.log(`📝 Word Count: ${rawData.vocabulary.length}`);
        console.log(`\n✅ Word #10: ${rawData.vocabulary[9].word} - ${rawData.vocabulary[9].translation}\n`);

        // Validate word count
        if (rawData.vocabulary.length !== 100) {
            throw new Error(`❌ Expected 100 words, got ${rawData.vocabulary.length}`);
        }

        // Validate word #10 is "Fueron"
        if (rawData.vocabulary[9].word !== 'Fueron') {
            throw new Error(`❌ Word #10 should be "Fueron", got "${rawData.vocabulary[9].word}"`);
        }

        // Transform to Firestore format
        const moduleData = {
            moduleId: 'es_a2_m01',
            theme: rawData.theme,
            order: 1,
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
            .doc('es_a2_m01');

        console.log('📤 Uploading to Firestore...');
        await moduleRef.set(moduleData, { merge: false });
        console.log('✅ Module uploaded successfully!\n');

        // Update Spanish A2 level metadata
        console.log('📊 Updating Spanish A2 level metadata...');
        const levelRef = db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a2');

        await levelRef.set({
            name: 'Spanish A2',
            description: 'Intermediate Spanish - Past Tense & Narration',
            order: 2
        }, { merge: true });

        console.log('✅ Level metadata updated!\n');

        // Verification
        console.log('🔍 Verifying upload...');
        const verifyDoc = await moduleRef.get();
        if (verifyDoc.exists) {
            const data = verifyDoc.data();
            console.log(`✅ Verified: ${data.targetWordCount} words in Firestore`);
            console.log(`✅ Module ID: ${data.moduleId}`);
            console.log(`✅ Word #10 verification: ${data.lessons[9].vocabularyItems[0].targetText} = "${data.lessons[9].vocabularyItems[0].translation}"`);
        }

        console.log('\n🎉 Spanish A2 Module 01 upload complete!');
        console.log('📍 Next step: Hot restart (R) and verify in UI\n');

    } catch (error) {
        console.error('❌ Error uploading module:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

// Execute
uploadSpanishA2Module01();
