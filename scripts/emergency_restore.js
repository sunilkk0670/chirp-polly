const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const LANGUAGES = {
    'spanish': 'es',
    'french': 'fr',
    'german': 'de',
    'sanskrit': 'sa',
    'japanese': 'jp',
    'korean': 'kr'
};

const LEVELS = ['a1', 'a2', 'b1'];

async function restore() {
    console.log('🚀 Starting Emergency Data Restoration...');

    for (const [fullLang, shortLang] of Object.entries(LANGUAGES)) {
        for (const level of LEVELS) {
            const fileName = `${fullLang}_${level}_full.json`;
            const filePath = path.join(__dirname, '..', 'firestore_data', fileName);

            if (!fs.existsSync(filePath)) {
                console.warn(`⚠️  File not found: ${fileName}, skipping.`);
                continue;
            }

            console.log(`\n📦 Processing ${fullLang} ${level}...`);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            for (const module of data.modules) {
                const docId = module.moduleId;
                const docRef = db.collection('languages').doc(fullLang)
                    .collection('levels').doc(level)
                    .collection('modules').doc(docId);

                // CRITICAL: Overwrite with { merge: false } to purge corruption/placeholders
                await docRef.set(module, { merge: false });
                console.log(`  ✅ Restored ${docId} (${module.theme})`);
            }

            // Also update the level document count to be safe
            const levelRef = db.collection('languages').doc(fullLang).collection('levels').doc(level);
            await levelRef.set({ count: data.modules.length }, { merge: true });
        }
    }

    console.log('\n✨ EMERGENCY RESTORATION COMPLETE! Integrity restored across all 6 languages.');
}

restore().catch(err => {
    console.error('❌ Restoration failed:', err);
    process.exit(1);
});
