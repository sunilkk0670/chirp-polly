const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function verify() {
    const snapshot = await db
        .collection('languages')
        .doc('spanish')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .get();

    console.log(`\n✅ Spanish A2 modules: ${snapshot.size}/10\n`);

    snapshot.docs
        .sort((a, b) => a.data().order - b.data().order)
        .forEach(doc => {
            const data = doc.data();
            console.log(`  ${data.order.toString().padStart(2, '0')}. ${doc.id}: ${data.theme}`);
        });

    // Check last word of module 10
    const m10 = await db
        .collection('languages')
        .doc('spanish')
        .collection('levels')
        .doc('a2')
        .collection('modules')
        .doc('es_a2_m10')
        .get();

    if (m10.exists) {
        const data = m10.data();
        const lastLesson = data.lessons[data.lessons.length - 1];
        const lastWord = lastLesson.vocabularyItems[0];
        console.log(`\n🏆 Last word of Module 10: "${lastWord.targetText}" = "${lastWord.translation}"`);
    }

    console.log('\n✅ Verification complete!\n');
    process.exit(0);
}

verify();
