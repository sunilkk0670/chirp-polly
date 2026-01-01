const admin = require('firebase-admin');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function finalCleanJapaneseA1() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🇯🇵 FINAL CLEANUP & VISIBILITY FIX: JAPANESE A1');
    console.log('═══════════════════════════════════════════════════════\n');

    // Step 1: Fix Parent Language Document
    console.log('Step 1: Setting up languages/japanese doc...');
    await db.collection('languages').doc('japanese').set({
        id: 'japanese',
        name: 'Japanese',
        order: 2,
        status: 'published',
        levelCount: 3
    }, { merge: true });
    console.log('✅ languages/japanese fixed.\n');

    // Step 2: Fix A1 Level Document
    console.log('Step 2: Fixing languages/japanese/levels/a1 doc...');
    await db.collection('languages').doc('japanese')
        .collection('levels').doc('a1').set({
            id: 'a1',
            name: 'A1 Beginner',
            cefr: 'A1',
            description: 'Basic Japanese - Greetings, Numbers, and Basics',
            order: 1,
            moduleCount: 10,
            totalModules: 10,
            status: 'published'
        }, { merge: false });
    console.log('✅ levels/a1 fixed (status: published).\n');

    // Step 3: Cleanup modules sub-collection (DELETE GARBAGE)
    console.log('Step 3: Cleaning up modules sub-collection...');
    const modulesRef = db.collection('languages').doc('japanese')
        .collection('levels').doc('a1')
        .collection('modules');

    const snapshot = await modulesRef.get();
    const keptIds = ['ja_a1_m1', 'ja_a1_m2'];
    let deletedCount = 0;

    for (const doc of snapshot.docs) {
        if (!keptIds.includes(doc.id)) {
            await doc.ref.delete();
            console.log(`   🗑️  Deleted: ${doc.id}`);
            deletedCount++;
        } else {
            console.log(`   ⭐ Kept: ${doc.id}`);
        }
    }
    console.log(`\n✅ Deleted ${deletedCount} garbage modules.\n`);

    // Step 4: Final verification
    const finalSnapshot = await modulesRef.get();
    console.log('Step 4: Final Verification');
    console.log(`📊 Number of modules: ${finalSnapshot.size}`);
    if (finalSnapshot.size === 2) {
        console.log('✅ SUCCESS: Exactly 2 modules remain.');
    } else {
        console.log('⚠️ WARNING: Unexpected module count.');
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✅ ALL SYSTEMS GO - CHECK APP NOW');
    console.log('═══════════════════════════════════════════════════════');
}

finalCleanJapaneseA1()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
