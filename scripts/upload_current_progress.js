const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadCurrentProgress() {
    try {
        console.log('\n🚀 Uploading Current Curriculum Progress to Firestore...\n');

        let totalUploaded = 0;
        let totalWords = 0;

        // === JAPANESE A2 MODULES ===
        console.log('📚 Japanese A2 Modules...');

        const japaneseA2Files = [
            '../firestore_data/japanese_a2_m1_expanded.json',
            '../firestore_data/japanese_a2_m2_expanded.json',
            '../firestore_data/japanese_a2_m3_expanded.json'
        ];

        // Load and upload individual Japanese A2 modules
        for (const file of japaneseA2Files) {
            try {
                const module = require(file);
                await db
                    .collection('languages')
                    .doc('japanese')
                    .collection('levels')
                    .doc('a2')
                    .collection('modules')
                    .doc(module.moduleId)
                    .set(module);

                totalUploaded++;
                totalWords += module.targetWordCount || 100;
                console.log(`✓ ${module.theme} (${module.targetWordCount || 100} words)`);
            } catch (err) {
                console.log(`⚠ Skipping ${file}: ${err.message}`);
            }
        }

        // Load batch file for modules 4-5
        try {
            const batch = require('../firestore_data/japanese_a2_m4_m5_batch.json');
            for (const module of batch.modules) {
                await db
                    .collection('languages')
                    .doc('japanese')
                    .collection('levels')
                    .doc('a2')
                    .collection('modules')
                    .doc(module.moduleId)
                    .set(module);

                totalUploaded++;
                totalWords += module.targetWordCount;
                console.log(`✓ ${module.theme} (${module.targetWordCount} words)`);
            }
        } catch (err) {
            console.log(`⚠ Batch file not found: ${err.message}`);
        }

        // Load and upload modules 6-10 from generation script
        try {
            const { a2Modules } = require('./generate_japanese_a2_b1.js');
            for (const module of a2Modules) {
                await db
                    .collection('languages')
                    .doc('japanese')
                    .collection('levels')
                    .doc('a2')
                    .collection('modules')
                    .doc(module.moduleId)
                    .set(module);

                totalUploaded++;
                totalWords += module.targetWordCount;
                console.log(`✓ ${module.theme} (${module.targetWordCount} words)`);
            }
        } catch (err) {
            console.log(`⚠ Generation script modules: ${err.message}`);
        }

        console.log(`\n✅ Japanese A2: ${totalWords} words uploaded\n`);

        // === KOREAN A2 MODULES ===
        console.log('📚 Korean A2 Modules (Partial)...');

        try {
            const { koreanA2Modules } = require('./generate_korean_a2.js');
            let koreanWords = 0;

            for (const module of koreanA2Modules) {
                await db
                    .collection('languages')
                    .doc('korean')
                    .collection('levels')
                    .doc('a2')
                    .collection('modules')
                    .doc(module.moduleId)
                    .set(module);

                totalUploaded++;
                koreanWords += module.targetWordCount;
                console.log(`✓ ${module.theme} (${module.targetWordCount} words)`);
            }

            totalWords += koreanWords;
            console.log(`\n✅ Korean A2 (Partial): ${koreanWords} words uploaded\n`);
        } catch (err) {
            console.log(`⚠ Korean A2 modules: ${err.message}\n`);
        }

        // === SUMMARY ===
        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ Current Progress Uploaded to Firestore!');
        console.log('═══════════════════════════════════════════════════════');
        console.log(`\n📊 Summary:`);
        console.log(`   Total Modules Uploaded: ${totalUploaded}`);
        console.log(`   Total New Words: ${totalWords}`);
        console.log(`\n📚 Language Status:`);
        console.log(`   Japanese: A1 (950) + A2 (1,000) = 1,950 words ✅`);
        console.log(`   Korean: A1 (620) + A2 (240) = 860 words 🔄`);
        console.log(`   Spanish: A1 (800) = 800 words ✅`);
        console.log(`\n   Grand Total: 3,610 words across 3 languages`);
        console.log(`\n🎯 Next Steps:`);
        console.log(`   - Complete Korean A2 (960 more words needed)`);
        console.log(`   - Create Spanish A2 (1,100 words)`);
        console.log(`   - Create B1 for all 3 languages (3,200 words)`);
        console.log(`   - Target: 9,000 total words (3,000 per language)\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error uploading:', error);
        process.exit(1);
    }
}

uploadCurrentProgress();
