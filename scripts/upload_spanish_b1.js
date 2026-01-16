/**
 * Upload Spanish B1 Modules to Firestore
 * Path: curriculum/es/levels/B1/modules/
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const firestoreDataDir = path.join(__dirname, '..', 'firestore_data');

async function uploadSpanishB1Modules() {
    console.log('\n' + '='.repeat(80));
    console.log('UPLOADING SPANISH B1 MODULES TO FIRESTORE');
    console.log('='.repeat(80) + '\n');

    const modules = [
        { id: 'es_b1_m01', order: 1 },
        { id: 'es_b1_m02', order: 2 },
        { id: 'es_b1_m03', order: 3 },
        { id: 'es_b1_m04', order: 4 },
        { id: 'es_b1_m05', order: 5 },
        { id: 'es_b1_m06', order: 6 },
        { id: 'es_b1_m07', order: 7 },
        { id: 'es_b1_m08', order: 8 },
        { id: 'es_b1_m09', order: 9 },
        { id: 'es_b1_m10', order: 10 }
    ];

    for (const module of modules) {
        const moduleId = module.id;
        const filePath = path.join(firestoreDataDir, `spanish_b1_m${moduleId.split('_m')[1]}.json`);

        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  File not found: ${filePath}`);
            continue;
        }

        const rawData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        console.log(`📤 Uploading ${moduleId}: ${rawData.theme}`);
        console.log(`   Words: ${rawData.vocabulary.length}`);

        // Transform to Standardized Firestore Format (Lessons structure)
        const moduleData = {
            moduleId: moduleId,
            theme: rawData.theme,
            order: module.order,
            targetWordCount: rawData.vocabulary.length,
            lessons: rawData.vocabulary.map((item, index) => ({
                lessonId: `lesson_${index + 1}`,
                vocabularyItems: [{
                    targetText: item.word,
                    translation: item.translation,
                    phonetic: item.phonetic,
                    type: 'vocabulary'
                }]
            }))
        };

        // Upload to Firestore - Standardized Path
        const docRef = db.collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('b1')
            .collection('modules')
            .doc(moduleId);

        await docRef.set(moduleData, { merge: false });

        console.log(`   ✅ Uploaded successfully (Schema Transformed)\n`);
    }

    // Update B1 level metadata
    console.log('📝 Updating B1 level metadata...');

    const levelRef = db.collection('languages')
        .doc('spanish')
        .collection('levels')
        .doc('b1');

    await levelRef.set({
        levelId: 'b1',
        levelName: 'Spanish B1',
        description: 'Intermediate Spanish - Subjunctive & Complex Expressions',
        moduleCount: 10,
        status: 'Complete',
        totalWords: 1000,
        order: 3, // B1 is order 3 (A1=1, A2=2)
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log('   ✅ Metadata updated\n');

    console.log('='.repeat(80));
    console.log('✅ UPLOAD COMPLETE');
    console.log('='.repeat(80));
    console.log('\nSummary:');
    console.log('  • Modules uploaded: 10');
    console.log('  • Total words: 1000');
    console.log('  • Module count: 10');
    console.log('  • Status: Complete');
    console.log('  • Path: languages/spanish/levels/b1/modules/\n');

    process.exit(0);
}

uploadSpanishB1Modules().catch(error => {
    console.error('❌ Upload failed:', error);
    process.exit(1);
});
