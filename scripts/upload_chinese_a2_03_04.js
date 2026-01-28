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

async function uploadA2Modules() {
    try {
        const modulesToUpload = ['zh_a2_m03', 'zh_a2_m04'];
        console.log('🚀 Uploading Chinese A2 Modules 03 & 04...\n');

        for (const moduleId of modulesToUpload) {
            const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
            if (!fs.existsSync(filePath)) {
                console.error(`❌ File not found: ${filePath}`);
                continue;
            }

            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const modulePath = `languages/chinese/levels/a2/modules/${moduleId}`;

            await db.doc(modulePath).set({
                module_id: data.module_id,
                language: data.language,
                level: data.level,
                theme: data.theme,
                order: data.order,
                lessons: data.lessons,
                liar_game_data: data.liar_game_data
            });

            console.log(`   ✅ Uploaded: ${moduleId} (${data.theme})`);
        }

        // Update Level Metadata
        const levelPath = `languages/chinese/levels/a2`;
        await db.doc(levelPath).set({
            count: 4,
            status: 'In Progress'
        }, { merge: true });

        console.log('\n✅ Level metadata updated: a2 count set to 4');
        console.log('🎉 SUCCESS: Modules 03 and 04 are live!');

    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

uploadA2Modules();
