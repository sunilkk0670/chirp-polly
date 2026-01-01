const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkSpanishA2M1() {
    console.log('🔍 Checking Spanish A2 M1 in detail...\n');

    const doc = await db.collection('languages')
        .doc('spanish')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .doc('spanish_a2_m1')
        .get();

    if (!doc.exists) {
        console.log('❌ Module not found');
        return;
    }

    const data = doc.data();

    console.log('📦 Module: spanish_a2_m1');
    console.log(`📝 Theme: ${data.theme}`);
    console.log(`📊 Order: ${data.order}\n`);

    console.log('🔑 All fields:', Object.keys(data).join(', '), '\n');

    // Check vocabularyItems
    const vocabItems = data.vocabularyItems || [];
    console.log(`vocabularyItems: ${vocabItems.length} items`);

    // Check lessons
    const lessons = data.lessons || [];
    console.log(`lessons: ${lessons.length} items`);

    if (lessons.length > 0) {
        console.log('\n📚 Lessons structure:');
        const firstLesson = lessons[0];
        console.log('  First lesson keys:', Object.keys(firstLesson).join(', '));

        // Count nested vocabularyItems in lessons
        let nestedVocabCount = 0;
        for (let lesson of lessons) {
            if (lesson.vocabularyItems && Array.isArray(lesson.vocabularyItems)) {
                nestedVocabCount += lesson.vocabularyItems.length;
            }
        }
        console.log(`  Total nested vocabularyItems in lessons: ${nestedVocabCount}`);
    }

    // Check if there are other fields with vocabulary data
    if (data.sampleVocab) {
        console.log(`sampleVocab: ${data.sampleVocab.length} items`);
    }

    if (data.targetWordCount) {
        console.log(`targetWordCount: ${data.targetWordCount}`);
    }

    if (data.vocabularyCount) {
        console.log(`vocabularyCount: ${data.vocabularyCount}`);
    }
}

checkSpanishA2M1().then(() => process.exit(0));
