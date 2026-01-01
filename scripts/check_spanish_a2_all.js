const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkSpanishA2() {
    console.log('🔍 Checking Spanish A2 modules...\n');

    const snapshot = await db.collection('languages')
        .doc('spanish')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .orderBy('order')
        .get();

    console.log(`Found ${snapshot.docs.length} modules:\n`);

    let totalWords = 0;
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

        totalWords += count;

        const status = count === 0 ? '❌ EMPTY' : '✅';
        console.log(`${status} ${doc.id} (order: ${data.order})`);
        console.log(`   Theme: ${data.theme}`);
        console.log(`   Words: ${count}`);
        console.log('');

        if (count === 0) {
            emptyModules.push({
                id: doc.id,
                theme: data.theme,
                order: data.order
            });
        }
    });

    console.log(`📊 Total: ${totalWords} words across all modules`);
    console.log(`\n❌ Empty modules: ${emptyModules.length}`);

    if (emptyModules.length > 0) {
        console.log('\nEmpty modules to populate or delete:');
        emptyModules.forEach(mod => {
            console.log(`  - ${mod.theme} (${mod.id}, order: ${mod.order})`);
        });
    }
}

checkSpanishA2().then(() => process.exit(0));
