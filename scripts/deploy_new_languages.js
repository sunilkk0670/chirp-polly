const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const NEW_LANGUAGES = {
    'french': 'fr',
    'german': 'de',
    'sanskrit': 'sa'
};

const LEVELS = ['a1', 'a2', 'b1'];

/**
 * Loads all generated data for new languages
 */
function loadAllData() {
    const dataMap = {};
    try {
        for (const [langFull, langShort] of Object.entries(NEW_LANGUAGES)) {
            dataMap[langFull] = {};
            for (const level of LEVELS) {
                const fileName = `${langFull}_${level}_full.json`;
                const filePath = path.join(__dirname, '..', 'firestore_data', fileName);
                if (fs.existsSync(filePath)) {
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    dataMap[langFull][level] = JSON.parse(fileContent).modules;
                } else {
                    console.warn(`Warning: ${fileName} not found.`);
                    dataMap[langFull][level] = [];
                }
            }
        }
        return dataMap;
    } catch (e) {
        console.error('Error loading data files:', e);
        return null;
    }
}

/**
 * Deployment logic
 */
async function deploy(dryRun = true) {
    const allData = loadAllData();
    if (!allData) return;

    console.log(`${dryRun ? '[DRY RUN] ' : ''}Starting deployment for French, German, and Sanskrit...`);

    let totalModules = 0;
    let totalWords = 0;
    let sanskritEncodingOk = true;

    // Phase 1: Verification
    for (const [langFull, levels] of Object.entries(allData)) {
        for (const [level, modules] of Object.entries(levels)) {
            totalModules += modules.length;
            for (const mod of modules) {
                totalWords += mod.vocabularyItems.length;

                // Sanskrit encoding check
                if (langFull === 'sanskrit') {
                    for (const item of mod.vocabularyItems) {
                        if (!/[\u0900-\u097F]/.test(item.word)) {
                            console.error(`Error: Sanskrit word "${item.word}" does not contain Devanagari characters.`);
                            sanskritEncodingOk = false;
                        }
                    }
                }
            }
        }
    }

    console.log(`\nVerification Summary:`);
    console.log(`- Languages: ${Object.keys(NEW_LANGUAGES).join(', ')}`);
    console.log(`- Total Modules: ${totalModules} (expected: 90)`);
    console.log(`- Total Vocabulary Items: ${totalWords} (expected: 9,000)`);
    console.log(`- Sanskrit Devanagari Check: ${sanskritEncodingOk ? 'PASSED' : 'FAILED'}`);

    if (totalModules !== 90 || totalWords !== 9000) {
        console.warn(`CAUTION: Counts do not match expected totals (90 modules, 9,000 items).`);
    }

    if (dryRun) {
        console.log('\nDry run complete. Use --execute to apply changes.');
        return;
    }

    if (!sanskritEncodingOk) {
        console.error('Deployment aborted due to Sanskrit encoding issues.');
        return;
    }

    // Phase 2: Create/Update Level Docs
    console.log('\nUpdating Level Documents...');
    for (const [langFull, langShort] of Object.entries(NEW_LANGUAGES)) {
        for (const level of LEVELS) {
            const levelRef = db.collection('languages').doc(langFull).collection('levels').doc(level);
            await levelRef.set({
                name: level.toUpperCase(),
                order: level === 'a1' ? 1 : level === 'a2' ? 2 : 3,
                cefr: level.toUpperCase()
            }, { merge: true });
        }
    }

    // Phase 3: Purge and Upload
    console.log('\nPurging old placeholders and uploading new content...');
    for (const [langFull, levels] of Object.entries(allData)) {
        console.log(`  Processing ${langFull}...`);
        for (const [level, modules] of Object.entries(levels)) {
            const modulesCollectionRef = db.collection('languages').doc(langFull).collection('levels').doc(level).collection('modules');

            // Purge: Delete existing modules in this level that aren't in our new set
            // For simplicity and safety, we'll list current IDs and delete those not in our new batch
            const snapshot = await modulesCollectionRef.get();
            const newIds = new Set(modules.map(m => m.moduleId));

            for (const doc of snapshot.docs) {
                if (!newIds.has(doc.id)) {
                    await doc.ref.delete();
                    console.log(`    🗑️ Purged old module: ${doc.id}`);
                }
            }

            // Upload
            for (const mod of modules) {
                await modulesCollectionRef.doc(mod.moduleId).set(mod, { merge: true });
            }
            console.log(`    ✅ Uploaded ${modules.length} modules for ${level}`);
        }
    }

    console.log('\n✅ Deployment complete!');
}

const execute = process.argv.includes('--execute');
deploy(!execute).catch(console.error);
