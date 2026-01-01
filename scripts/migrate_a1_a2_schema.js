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

const LEVELS = ['a1', 'a2'];

async function migrateSchema(dryRun = true) {
    console.log(`${dryRun ? '[DRY RUN] ' : ''}Starting A1/A2 schema migration...`);

    let totalUpdated = 0;

    for (const [langFull, langShort] of Object.entries(LANGUAGES)) {
        for (const level of LEVELS) {
            console.log(`\nProcessing ${langFull} ${level}...`);

            const modulesRef = db.collection('languages').doc(langFull)
                .collection('levels').doc(level)
                .collection('modules');

            const snapshot = await modulesRef.get();

            if (snapshot.empty) {
                console.log(`No modules found for ${langFull} ${level}`);
                continue;
            }

            for (const doc of snapshot.docs) {
                const data = doc.data();
                const updates = {};
                let needsUpdate = false;

                // 1. Rename lessons to vocabularyItems
                if (data.lessons && !data.vocabularyItems) {
                    updates.vocabularyItems = data.lessons;
                    updates.lessons = admin.firestore.FieldValue.delete();
                    updates.count = data.lessons.length;
                    needsUpdate = true;
                    console.log(`  - Standardizing vocabulary field for ${doc.id}`);
                } else if (data.vocabularyItems && data.count === undefined) {
                    updates.count = data.vocabularyItems.length;
                    needsUpdate = true;
                    console.log(`  - Adding missing count field for ${doc.id}`);
                }

                // 2. Standardize module_id
                // Format: [lang]_[level]_m[number]
                // Example: es_a1_m1
                const order = data.order || 1;
                const expectedModuleId = `${langShort}_${level}_m${order}`;

                if (data.moduleId !== expectedModuleId) {
                    updates.moduleId = expectedModuleId;
                    needsUpdate = true;
                    console.log(`  - Updating moduleId: ${data.moduleId} -> ${expectedModuleId}`);
                }

                if (needsUpdate) {
                    if (!dryRun) {
                        await doc.ref.update(updates);
                    }
                    totalUpdated++;
                }
            }
        }
    }

    console.log(`\n${dryRun ? '[DRY RUN] ' : ''}Migration complete.`);
    console.log(`Total documents ${dryRun ? 'to be updated' : 'updated'}: ${totalUpdated}`);
}

// Check for --execute flag
const isDryRun = !process.argv.includes('--execute');
migrateSchema(isDryRun).catch(console.error);
