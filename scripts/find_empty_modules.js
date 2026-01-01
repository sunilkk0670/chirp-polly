const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkEmptyModules() {
    console.log('🔍 Checking Korean A2 modules with 0 words...\n');

    const snapshot = await db.collection('languages')
        .doc('korean')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .get();

    const emptyModules = [];

    snapshot.docs.forEach(doc => {
        const data = doc.data();
        const vocabItems = data.vocabularyItems || [];
        const lessons = data.lessons || [];

        let count = 0;
        if (lessons.length > 0) {
            for (let lesson of lessons) {
                if (lesson.vocabularyItems) {
                    count += lesson.vocabularyItems.length;
                } else {
                    count++;
                }
            }
        } else if (vocabItems.length > 0) {
            count = vocabItems.length;
        }

        if (count === 0) {
            emptyModules.push({
                id: doc.id,
                theme: data.theme,
                order: data.order
            });
        }
    });

    console.log(`Found ${emptyModules.length} empty modules:\n`);
    emptyModules.forEach(mod => {
        console.log(`  - ${mod.id}: "${mod.theme}" (order: ${mod.order})`);
    });

    if (emptyModules.length > 0) {
        console.log('\n❓ These appear to be placeholder modules.');
        console.log('💡 Recommendation: Delete them to clean up the curriculum.');
    }
}

checkEmptyModules().then(() => process.exit(0));
