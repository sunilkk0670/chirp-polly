const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const files = [
    { level: 'a1', file: 'spanish_a1_modules.json' },
    { level: 'a2', file: 'spanish_a2_modules.json' },
    { level: 'b1', file: 'spanish_b1_modules.json' }
];

async function syncLevel(level, filename) {
    const filePath = path.join(__dirname, '..', 'firestore_data', filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`Syncing Spanish ${level.toUpperCase()}...`);

    for (const module of data.modules) {
        const moduleRef = db.collection('languages').doc('spanish')
            .collection('levels').doc(level)
            .collection('modules').doc(module.moduleId);

        await moduleRef.set(module);
        console.log(`  Uploaded ${module.moduleId}`);
    }

    // Update Metadata
    const levelRef = db.collection('languages').doc('spanish')
        .collection('levels').doc(level);

    await levelRef.set({
        id: level,
        name: level.toUpperCase(),
        moduleCount: 10,
        status: 'Complete',
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log(`  Updated metadata for ${level.toUpperCase()}`);
}

async function run() {
    try {
        for (const f of files) {
            await syncLevel(f.level, f.file);
        }
        console.log("\n✅ All Spanish restoration data synced successfully.");
    } catch (error) {
        console.error("❌ Sync failed:", error);
    } finally {
        process.exit();
    }
}

run();
