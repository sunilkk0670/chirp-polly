const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const module6 = require('../firestore_data/korean_a1_m6_expanded.json');

async function uploadKoreanA1Module6() {
    try {
        await db
            .collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module6.moduleId)
            .set(module6);

        console.log('✅ Korean A1 Module 6 (Particle Mastery) uploaded!');
        console.log('   - 120 words');
        console.log('   - 10 lessons');
        console.log('   - Complete particle system (이/가, 은/는, 을/를, 에/에서, etc.)');
        console.log('\n📊 Korean A1 Total: 620 words (500 + 120)');
        console.log('✅ TOPIK-ready with extensive particle practice!');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

uploadKoreanA1Module6();
