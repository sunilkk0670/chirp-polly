const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadVerifiedModules() {
    try {
        console.log('--- Syncing Verified Japanese A2 Modules & Metadata ---');

        // 1. Update Level Metadata
        console.log('Updating level metadata...');
        await db.collection('languages').doc('japanese')
            .collection('levels').doc('a2')
            .set({
                levelId: 'a2',
                name: 'A2',
                description: 'Beginner/Elementary Japanese',
                moduleCount: 20,
                status: 'published',
                lastUpdated: new Date().toISOString()
            }, { merge: true });
        console.log('✅ Level metadata updated.');

        // 2. Upload Modules
        const modules = [
            'ja_a2_m11.json',
            'ja_a2_m12.json',
            'ja_a2_m13.json',
            'ja_a2_m14.json',
            'ja_a2_m15.json',
            'ja_a2_m16.json',
            'ja_a2_m17.json',
            'ja_a2_m18.json',
            'ja_a2_m19.json',
            'ja_a2_m20.json'
        ];

        for (const file of modules) {
            const filePath = path.join(__dirname, '../firestore_data', file);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            console.log(`Uploading: ${data.moduleId} (${data.theme})`);
            await db.collection('languages').doc('japanese')
                .collection('levels').doc('a2')
                .collection('modules').doc(data.moduleId)
                .set(data);
        }

        console.log('✅ Modules 11-14 uploaded successfully.');
        console.log('--------------------------------------------');
        process.exit(0);

    } catch (error) {
        console.error('❌ Upload failed:', error);
        process.exit(1);
    }
}

uploadVerifiedModules();
