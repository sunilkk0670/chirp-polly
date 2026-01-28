const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadA2Module01() {
    try {
        console.log('🚀 Uploading Chinese A2 Module 01: Relazioni e Vita Sociale...\n');

        const filePath = path.join(__dirname, '../firestore_data/zh_a2_m01.json');
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found: ${filePath}`);
            process.exit(1);
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const modulePath = `languages/chinese/levels/a2/modules/zh_a2_m01`;

        await db.doc(modulePath).set({
            module_id: data.module_id,
            language: data.language,
            level: data.level,
            theme: data.theme,
            order: data.order,
            lessons: data.lessons,
            liar_game_data: data.liar_game_data
        });

        console.log(`   ✅ Uploaded: zh_a2_m01 (${data.theme})`);

        // Update Level Metadata for A2
        const levelPath = `languages/chinese/levels/a2`;
        await db.doc(levelPath).set({
            level: 'A2',
            description: "Intermediate - Social and deeper topics",
            count: 1,
            moduleCount: 10,
            status: 'In Progress'
        }, { merge: true });

        console.log('\n✅ Level metadata updated: a2 count set to 1');
        console.log('🎉 SUCCESS: Chinese A2 Module 01 is now live!');

    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

uploadA2Module01();
