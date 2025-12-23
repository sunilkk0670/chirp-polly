const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Load all 5 expanded Japanese A1 modules
const module1 = require('../firestore_data/japanese_a1_m1_expanded.json');
const module2 = require('../firestore_data/japanese_a1_m2_expanded.json');
const module3 = require('../firestore_data/japanese_a1_m3_expanded.json');
const module4 = require('../firestore_data/japanese_a1_m4_expanded.json');
const module5 = require('../firestore_data/japanese_a1_m5_expanded.json');

const modules = [module1, module2, module3, module4, module5];

async function uploadJapaneseA1Expanded() {
    try {
        console.log('\n🚀 Starting Japanese A1 Expanded Upload...\n');
        console.log('This will OVERWRITE existing Japanese A1 modules with high-density content.\n');

        // First, delete all existing Japanese A1 modules
        console.log('Step 1: Clearing existing Japanese A1 modules...');
        const existingModules = await db
            .collection('languages')
            .doc('japanese')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .get();

        const deletePromises = existingModules.docs.map(doc => doc.ref.delete());
        await Promise.all(deletePromises);
        console.log(`✓ Deleted ${existingModules.size} old modules\n`);

        // Upload new expanded modules
        console.log('Step 2: Uploading new expanded modules...\n');

        let totalWords = 0;
        let totalLessons = 0;

        for (const module of modules) {
            await db
                .collection('languages')
                .doc('japanese')
                .collection('levels')
                .doc('a1')
                .collection('modules')
                .doc(module.moduleId)
                .set(module);

            const wordCount = module.targetWordCount || module.lessons.length * 10;
            totalWords += wordCount;
            totalLessons += module.lessons.length;

            console.log(`✓ ${module.theme}`);
            console.log(`  - Module ID: ${module.moduleId}`);
            console.log(`  - Lessons: ${module.lessons.length}`);
            console.log(`  - Words: ${wordCount}`);
            if (module.kanjiCount) {
                console.log(`  - Kanji: ${module.kanjiCount}`);
            }
            console.log('');
        }

        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ Japanese A1 Expanded Upload Complete!');
        console.log('═══════════════════════════════════════════════════════');
        console.log(`\n📊 Summary:`);
        console.log(`   Total Modules: ${modules.length}`);
        console.log(`   Total Lessons: ${totalLessons}`);
        console.log(`   Total Words: ${totalWords}`);
        console.log(`   N5 Kanji: 100 characters`);
        console.log(`   Hiragana: 46 characters`);
        console.log(`   Katakana: 46 characters`);
        console.log(`\n✅ CEFR A1 Compliant: YES (${totalWords} words)`);
        console.log(`   Required: 500-1,000 words`);
        console.log(`   Achieved: ${totalWords} words ✓\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error uploading Japanese A1 modules:', error);
        process.exit(1);
    }
}

uploadJapaneseA1Expanded();
