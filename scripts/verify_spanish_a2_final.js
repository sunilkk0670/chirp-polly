const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
const db = admin.firestore();

async function verifyFinalCount() {
    console.log('🔍 Performing final content audit for Spanish A2...\n');

    const snapshot = await db.collection('languages')
        .doc('spanish')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .orderBy('order')
        .get();

    let totalCurriculumWords = 0;

    snapshot.docs.forEach(doc => {
        const data = doc.data();
        const vocabItems = data.vocabularyItems || [];
        const lessons = data.lessons || [];

        // Match the logic in the app: check lessons first, then vocabItems
        let count = 0;
        if (lessons.length > 0) {
            lessons.forEach(l => {
                if (l.vocabularyItems) count += l.vocabularyItems.length;
                else count++;
            });
        } else {
            count = vocabItems.length;
        }

        totalCurriculumWords += count;
        console.log(`Module ${data.order} (${doc.id}): ${count} words - ${data.theme}`);
    });

    console.log('\n' + '='.repeat(50));
    console.log(`✨ FINAL SPANISH A2 WORD COUNT: ${totalCurriculumWords} words`);
    console.log('='.repeat(50));
}

verifyFinalCount().then(() => process.exit(0));
