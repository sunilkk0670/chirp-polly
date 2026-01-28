const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function forceReuploadChineseModules() {
    const dataDir = path.join(__dirname, '../firestore_data');

    // Get all Chinese module files
    const files = fs.readdirSync(dataDir).filter(f =>
        (f.startsWith('zh_a1_m') || f.startsWith('zh_a2_m') || f.startsWith('zh_b1_m')) &&
        f.endsWith('.json') &&
        !f.includes('modules')
    ).sort();

    console.log(`📦 Force re-uploading ${files.length} Chinese modules\n`);

    let uploadedCount = 0;

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const moduleId = data.module_id;
        const level = data.level;
        const theme = data.theme;

        const modulePath = `languages/chinese/levels/${level}/modules/${moduleId}`;

        try {
            // First delete the document
            await db.doc(modulePath).delete();
            console.log(`🗑️  Deleted ${moduleId}`);

            // Wait a bit
            await delay(100);

            // Then recreate it
            await db.doc(modulePath).set(data);
            console.log(`✅ Re-created ${moduleId}: "${theme}"`);
            uploadedCount++;

            // Small delay between uploads
            await delay(50);
        } catch (error) {
            console.error(`❌ ${moduleId}: ${error.message}`);
        }
    }

    console.log(`\n📊 Summary: ${uploadedCount}/${files.length} modules force re-uploaded`);
    process.exit(0);
}

forceReuploadChineseModules();
