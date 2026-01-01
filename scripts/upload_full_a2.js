const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

console.log('🚀 DEEP GENERATION: Full A2 Curriculum\n');
console.log('Target: 3,700+ words across 3 languages\n');

// SPANISH A2: 1,000+ words (Preterito focus)
const spanishA2 = require('../firestore_data/spanish_a2_full.json');

// JAPANESE A2: 1,200+ words (300 N4 Kanji)
const japaneseA2 = require('../firestore_data/japanese_a2_full.json');

// KOREAN A2: 1,500+ words (Past tense honorifics)
const koreanA2 = require('../firestore_data/korean_a2_full.json');

async function uploadFullA2() {
    let totalWords = 0;

    // Upload Spanish A2
    console.log('📚 SPANISH A2...');
    for (const module of spanishA2.modules) {
        await db.collection('languages').doc('spanish')
            .collection('levels').doc('a2')
            .collection('modules').doc(module.moduleId)
            .set(module);

        const wordCount = (module.lessons || []).length;
        totalWords += wordCount;
        console.log(`  ✓ ${module.theme} (${wordCount} words)`);
    }

    // Upload Japanese A2
    console.log('\n📚 JAPANESE A2...');
    for (const module of japaneseA2.modules) {
        await db.collection('languages').doc('japanese')
            .collection('levels').doc('a2')
            .collection('modules').doc(module.moduleId)
            .set(module);

        const wordCount = (module.lessons || []).length;
        totalWords += wordCount;
        console.log(`  ✓ ${module.theme} (${wordCount} words)`);
    }

    // Upload Korean A2
    console.log('\n📚 KOREAN A2...');
    for (const module of koreanA2.modules) {
        await db.collection('languages').doc('korean')
            .collection('levels').doc('a2')
            .collection('modules').doc(module.moduleId)
            .set(module);

        const wordCount = (module.lessons || []).length;
        totalWords += wordCount;
        console.log(`  ✓ ${module.theme} (${wordCount} words)`);
    }

    console.log(`\n✅ TOTAL UPLOADED: ${totalWords} words\n`);
    process.exit(0);
}

uploadFullA2().catch(err => {
    console.error('❌ Error during upload:', err);
    process.exit(1);
});
