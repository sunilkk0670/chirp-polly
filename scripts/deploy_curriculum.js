const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const LANGUAGES = {
    'spanish': 'es',
    'japanese': 'jp',
    'korean': 'kr'
};

/**
 * Loads generated B1 data
 */
function loadB1Data() {
    try {
        const esData = require('../firestore_data/spanish_b1_full.json');
        const jpData = require('../firestore_data/japanese_b1_full.json');
        const krData = require('../firestore_data/korean_b1_full.json');
        return {
            spanish: esData.modules,
            japanese: jpData.modules,
            korean: krData.modules
        };
    } catch (e) {
        console.error('Error loading B1 data. Ensure generation script was run.', e);
        return null;
    }
}

/**
 * Unified deployment function
 */
async function deploy(dryRun = true) {
    const b1DataMap = loadB1Data();
    if (!b1DataMap) return;

    console.log(`${dryRun ? '[DRY RUN] ' : ''}Starting deployment...`);

    let a1a2Count = 0;
    let b1Count = 1000 * 3; // We know we generated 10x100 for 3 languages

    // Phase 1: Scan A1/A2 for summary (already ran the migration separately but we'll include it here for completeness)
    for (const lang of Object.keys(LANGUAGES)) {
        for (const level of ['a1', 'a2']) {
            const snap = await db.collection('languages').doc(lang).collection('levels').doc(level).collection('modules').get();
            a1a2Count += snap.size;
        }
    }

    console.log(`Ready to migrate ${a1a2Count} A1/A2 modules and upload ${b1Count} new B1 items`);

    if (dryRun) {
        console.log('\nDry run complete. Use --execute to apply changes.');
        return;
    }

    // Phase 2: Execute A1/A2 Refinement (Idempotent)
    console.log('\nRefining A1/A2 Schema...');
    for (const [langFull, langShort] of Object.entries(LANGUAGES)) {
        for (const level of ['a1', 'a2']) {
            const modulesRef = db.collection('languages').doc(langFull).collection('levels').doc(level).collection('modules');
            const snapshot = await modulesRef.get();
            for (const doc of snapshot.docs) {
                const data = doc.data();
                const updates = {};
                let needsUpdate = false;

                if (data.lessons && !data.vocabularyItems) {
                    updates.vocabularyItems = data.lessons;
                    updates.lessons = admin.firestore.FieldValue.delete();
                    updates.count = data.lessons.length;
                    needsUpdate = true;
                } else if (data.vocabularyItems && data.count === undefined) {
                    updates.count = data.vocabularyItems.length;
                    needsUpdate = true;
                }

                const expectedId = `${langShort}_${level}_m${data.order || 1}`;
                if (data.moduleId !== expectedId) {
                    updates.moduleId = expectedId;
                    needsUpdate = true;
                }

                if (needsUpdate) {
                    await doc.ref.update(updates);
                }
            }
        }
    }

    // Phase 3: Upload B1 Content
    console.log('\nUploading B1 Content...');
    for (const [langFull, modules] of Object.entries(b1DataMap)) {
        console.log(`  Processing ${langFull} B1...`);
        for (const module of modules) {
            // Use moduleId as document ID for clean structure
            const docRef = db.collection('languages').doc(langFull)
                .collection('levels').doc('b1')
                .collection('modules').doc(module.moduleId);

            await docRef.set(module, { merge: true });
            console.log(`    ✓ Uploaded ${module.moduleId} (${module.theme})`);
        }
    }

    console.log('\n✅ Deployment complete!');
}

const execute = process.argv.includes('--execute');
deploy(!execute).catch(console.error);
