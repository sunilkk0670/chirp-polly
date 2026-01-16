/**
 * CLEANUP: Spanish Curriculum Data
 * Deletes redundant top-level 'curriculum' collection and inconsistent B1 module IDs
 */

const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function deleteCollection(collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        resolve();
        return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    process.nextTick(() => {
        deleteQueryBatch(db, query, resolve);
    });
}

async function cleanupSpanishCurriculum() {
    try {
        console.log('\n' + '='.repeat(80));
        console.log('CLEANING UP REDUNDANT SPANISH CURRICULUM DATA');
        console.log('='.repeat(80) + '\n');

        // 1. Delete redundant modules in languages/spanish/levels/b1/modules/
        // We know these existed from diagnostic: es_b1_m1, es_b1_m2... es_b1_m9, spanish_b1_m1... spanish_b1_m5
        const incorrectIds = [
            'es_b1_m1', 'es_b1_m2', 'es_b1_m3', 'es_b1_m4', 'es_b1_m5', 'es_b1_m6', 'es_b1_m7', 'es_b1_m8', 'es_b1_m9',
            'spanish_b1_m1', 'spanish_b1_m2', 'spanish_b1_m3', 'spanish_b1_m4', 'spanish_b1_m5'
        ];

        console.log('🗑️ Deleting inconsistent IDs in languages/spanish/levels/b1/modules/...');
        const b1ModulesRef = db.collection('languages').doc('spanish').collection('levels').doc('b1').collection('modules');
        const batch = db.batch();
        let deletionCount = 0;

        for (const id of incorrectIds) {
            const docRef = b1ModulesRef.doc(id);
            const doc = await docRef.get();
            if (doc.exists) {
                batch.delete(docRef);
                deletionCount++;
                console.log(`   - Deleting ${id}`);
            }
        }

        if (deletionCount > 0) {
            await batch.commit();
            console.log(`   ✅ Deleted ${deletionCount} inconsistent documents.\n`);
        } else {
            console.log('   ℹ️ No inconsistent document IDs found.\n');
        }

        // 2. Delete the redundant top-level 'curriculum' collection
        // This is tricky because Firestore doesn't provide a direct "delete collection" for non-empty collections in SDK, 
        // we need to delete recursively or delete documents one by one.
        console.log('🗑️ Deleting top-level /curriculum/es/levels/B1/modules/ documents...');
        const modulesPath = 'curriculum/es/levels/B1/modules';
        await deleteCollection(modulesPath, 50);
        console.log('   ✅ Deleted /curriculum/es/levels/B1/modules/\n');

        console.log('🗑️ Deleting top-level /curriculum/es/levels/B1/ level document...');
        await db.doc('curriculum/es/levels/B1').delete();
        console.log('   ✅ Deleted /curriculum/es/levels/B1\n');

        console.log('🗑️ Deleting top-level /curriculum/es/ document...');
        await db.doc('curriculum/es').delete();
        console.log('   ✅ Deleted /curriculum/es\n');

        console.log('='.repeat(80));
        console.log('✅ CLEANUP COMPLETE');
        console.log('='.repeat(80) + '\n');

    } catch (error) {
        console.error('❌ Cleanup failed:', error);
    } finally {
        process.exit(0);
    }
}

cleanupSpanishCurriculum();
