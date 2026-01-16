/**
 * Upload Spanish A2 Module 02 to Firestore
 * Module ID: es_a2_m02
 * Theme: The Future, Plans & Aspirations
 * Words: 1,101 - 1,200
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

async function uploadSpanishA2Module02() {
    try {
        console.log('🚀 Starting Spanish A2 Module 02 upload...\n');

        // Read the JSON file
        const modulePath = path.join(__dirname, '../assets/data/curriculum/es_a2/es_a2_m02.json');
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

        // Validate word #10 is "Van a"
        if (rawData.vocabulary[9].word !== 'Van a') {
            throw new Error(`❌ Word #10 should be "Van a", got "${rawData.vocabulary[9].word}"`);
        }

        // Transform to Firestore format
        const moduleData = {
            moduleId: 'es_a2_m02',
            theme: rawData.theme,
            order: 2,
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
            .doc('es_a2_m02');

        console.log('📤 Uploading to Firestore...');
        await moduleRef.set(moduleData, { merge: false });
        console.log('✅ Module uploaded successfully!\n');

        // Verification
        console.log('🔍 Verifying upload...');
        const verifyDoc = await moduleRef.get();
        if (verifyDoc.exists) {
            const data = verifyDoc.data();
            console.log(`✅ Verified: ${data.targetWordCount} words in Firestore`);
            console.log(`✅ Module ID: ${data.moduleId}`);
            console.log(`✅ Theme: ${data.theme}`);
            console.log(`✅ Word #10 verification: ${data.lessons[9].vocabularyItems[0].targetText} = "${data.lessons[9].vocabularyItems[0].translation}"`);
        }

        // Check total modules
        console.log('\n📊 Checking Spanish A2 module count...');
        const modulesSnapshot = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a2')
            .collection('modules')
            .get();

        console.log(`✅ Total Spanish A2 modules: ${modulesSnapshot.size}`);
        modulesSnapshot.forEach(doc => {
            console.log(`   - ${doc.id}`);
        });

        console.log('\n🎉 Spanish A2 Module 02 upload complete!');
        console.log('📍 Next step: Hot restart (R) and verify in UI\n');

    } catch (error) {
        console.error('❌ Error uploading module:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

// Execute
uploadSpanishA2Module02();
