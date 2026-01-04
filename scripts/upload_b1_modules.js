/**
 * Upload English B1 Modules to Firestore
 * Path: languages/english/levels/b1/modules/
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

async function uploadB1Modules() {
    console.log('\n' + '='.repeat(80));
    console.log('UPLOADING ENGLISH B1 MODULES TO FIRESTORE');
    console.log('='.repeat(80) + '\n');

    const modules = [
        'en_b1_m01', 'en_b1_m02', 'en_b1_m03', 'en_b1_m04', 'en_b1_m05',
        'en_b1_m06', 'en_b1_m07', 'en_b1_m08', 'en_b1_m09', 'en_b1_m10'
    ];

    for (const moduleId of modules) {
        const filePath = path.join(firestoreDataDir, `${moduleId}.json`);
        const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        console.log(`📤 Uploading ${moduleId}: ${moduleData.theme}`);
        console.log(`   Words: ${moduleData.vocabularyItems.length}`);

        // Upload to Firestore
        const docRef = db.collection('languages')
            .doc('english')
            .collection('levels')
            .doc('b1')
            .collection('modules')
            .doc(moduleId);

        await docRef.set(moduleData, { merge: false });

        console.log(`   ✅ Uploaded successfully\n`);
    }

    // Update B1 level metadata
    console.log('📝 Updating B1 level metadata...');

    const levelRef = db.collection('languages')
        .doc('english')
        .collection('levels')
        .doc('b1');

    await levelRef.set({
        levelId: 'b1',
        levelName: 'B1 - Intermediate',
        moduleCount: 10,
        status: 'Complete',
        totalWords: 1000,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log('   ✅ Metadata updated\n');

    // Ensure English is enabled
    console.log('🌍 Ensuring English language is enabled...');
    await db.collection('languages').doc('english').set({
        enabled: true
    }, { merge: true });
    console.log('   ✅ English enabled\n');

    console.log('='.repeat(80));
    console.log('✅ UPLOAD COMPLETE');
    console.log('='.repeat(80));
    console.log('\nSummary:');
    console.log('  • Modules uploaded: 10');
    console.log('  • Total words: 1000');
    console.log('  • Module count: 10');
    console.log('  • Status: Complete');
    console.log('  • Path: languages/english/levels/b1/modules/\n');

    process.exit(0);
}

uploadB1Modules().catch(error => {
    console.error('❌ Upload failed:', error);
    process.exit(1);
});
