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

async function syncB1() {
    try {
        console.log('--- Syncing Japanese B1 Modules & Metadata ---');

        // 1. Update Level Metadata
        console.log('Updating B1 level metadata...');
        await db.collection('languages').doc('japanese')
            .collection('levels').doc('b1')
            .set({
                levelId: 'b1',
                name: 'B1',
                description: 'Intermediate (JLPT N3)',
                moduleCount: 10,
                status: 'Complete',
                lastUpdated: new Date().toISOString()
            }, { merge: true });
        console.log('✅ B1 level metadata updated.');

        // 2. Upload B1 Modules
        const modules = [
            'ja_b1_m01.json',
            'ja_b1_m02.json',
            'ja_b1_m03.json',
            'ja_b1_m04.json',
            'ja_b1_m05.json',
            'ja_b1_m06.json',
            'ja_b1_m07.json',
            'ja_b1_m08.json',
            'ja_b1_m09.json',
            'ja_b1_m10.json'
        ];

        for (const file of modules) {
            const filePath = path.join(__dirname, '../firestore_data', file);
            if (!fs.existsSync(filePath)) {
                console.warn(`⚠️ Warning: ${file} not found, skipping.`);
                continue;
            }
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            console.log(`Uploading: ${data.moduleId} (${data.theme})`);
            await db.collection('languages').doc('japanese')
                .collection('levels').doc('b1')
                .collection('modules').doc(data.moduleId)
                .set(data);
        }

        console.log('✅ B1 modules uploaded successfully.');
        console.log('--------------------------------------------');
        process.exit(0);

    } catch (error) {
        console.error('❌ Upload failed:', error);
        process.exit(1);
    }
}

syncB1();
