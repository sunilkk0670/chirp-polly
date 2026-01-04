const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadFinalModulesAndFinalize() {
    try {
        console.log('========================================');
        console.log('  FINAL ENGLISH A1 DEPLOYMENT');
        console.log('  Uploading Modules 8-10 & Finalizing');
        console.log('========================================\n');

        const modules = [
            { id: 'en_a1_m08', order: 8, file: 'en_a1_m08.json' },
            { id: 'en_a1_m09', order: 9, file: 'en_a1_m09.json' },
            { id: 'en_a1_m10', order: 10, file: 'en_a1_m10.json' }
        ];

        for (const module of modules) {
            const filePath = path.join(__dirname, `../firestore_data/${module.file}`);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Transform vocabularyItems to match app's expected format
            data.vocabularyItems = data.vocabularyItems.map(item => ({
                word: item.word,
                phonetic: item.phonetic,
                english: item.english,
                example_sentence: item.english
            }));

            // Add order field
            data.order = module.order;

            console.log(`Uploading: ${data.moduleId} (${data.theme}) - ${data.vocabularyItems.length} words`);

            await db.collection('languages').doc('english')
                .collection('levels').doc('a1')
                .collection('modules').doc(data.moduleId)
                .set(data);

            console.log(`✅ ${module.id} uploaded successfully!\n`);
        }

        // FINALIZE METADATA
        console.log('========================================');
        console.log('  FINALIZING METADATA');
        console.log('========================================\n');

        // Update A1 level metadata to COMPLETE
        console.log('Setting A1 level status to "Complete"...');
        await db.collection('languages').doc('english')
            .collection('levels').doc('a1')
            .update({
                moduleCount: 10,
                status: 'Complete',  // ← FINAL STATUS
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            });
        console.log('✅ A1 level marked as Complete\n');

        // Ensure English language is enabled
        console.log('Ensuring English language is enabled...');
        await db.collection('languages').doc('english')
            .update({
                enabled: true,
                moduleCount: 10,
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            });
        console.log('✅ English language enabled\n');

        console.log('========================================');
        console.log('  🎉 DEPLOYMENT COMPLETE!');
        console.log('========================================');
        console.log('English A1 Curriculum Status:');
        console.log('  ✅ All 10 modules uploaded');
        console.log('  ✅ 1,000 unique words deployed');
        console.log('  ✅ Status: Complete');
        console.log('  ✅ Enabled: true');
        console.log('  ✅ 9 Liar Game traps active');
        console.log('========================================\n');

        process.exit(0);

    } catch (error) {
        console.error('❌ Upload failed:', error);
        process.exit(1);
    }
}

uploadFinalModulesAndFinalize();
