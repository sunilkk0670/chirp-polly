const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function verifyChineseModules() {
    try {
        console.log('🔍 Verifying Chinese A1 modules...\n');

        const snapshot = await db
            .collection('languages')
            .doc('chinese')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .orderBy('order')
            .get();

        console.log(`Found ${snapshot.docs.length} modules:\n`);

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const vocabCount = data.lessons?.reduce((total, lesson) => {
                return total + (lesson.vocabulary?.length || 0);
            }, 0) || 0;

            console.log('─'.repeat(60));
            console.log(`Document ID: ${doc.id}`);
            console.log(`Module ID Field: ${data.moduleId}`);
            console.log(`Theme: ${data.theme}`);
            console.log(`Order: ${data.order}`);
            console.log(`Lessons: ${data.lessons?.length || 0}`);
            console.log(`Total Vocabulary: ${vocabCount}`);
            console.log('─'.repeat(60));
            console.log('');
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        process.exit(0);
    }
}

verifyChineseModules();
