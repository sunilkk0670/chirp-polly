const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function getActualWordCounts() {
    console.log('\n📊 ACTUAL WORD COUNTS IN FIRESTORE\n');
    console.log('='.repeat(50));

    const languages = ['spanish', 'japanese', 'korean'];
    const levels = ['a1', 'a2'];

    for (const lang of languages) {
        console.log(`\n${lang.toUpperCase()}:`);

        for (const level of levels) {
            const snapshot = await db
                .collection('languages')
                .doc(lang)
                .collection('levels')
                .doc(level)
                .collection('modules')
                .get();

            if (snapshot.empty) {
                console.log(`  ${level.toUpperCase()}: NO MODULES`);
                continue;
            }

            let totalWords = 0;
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                const lessons = data.lessons || [];
                const vocabItems = data.vocabularyItems || [];
                const sampleVocab = data.sampleVocab || [];

                // Count actual vocabulary items
                let moduleWords = 0;

                // Check nested structure
                if (lessons.length > 0 && lessons[0].vocabularyItems) {
                    lessons.forEach(lesson => {
                        moduleWords += (lesson.vocabularyItems || []).length;
                    });
                } else {
                    moduleWords = lessons.length + vocabItems.length;
                }

                // If only sampleVocab exists, it's incomplete
                if (moduleWords === 0 && sampleVocab.length > 0) {
                    moduleWords = sampleVocab.length;
                }

                totalWords += moduleWords;
            });

            console.log(`  ${level.toUpperCase()}: ${snapshot.size} modules, ${totalWords} ACTUAL words`);
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('\nThis is the TRUTH - no estimates, no plans.\n');
    process.exit(0);
}

getActualWordCounts().catch(console.error);
