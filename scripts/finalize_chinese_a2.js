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

async function finalizeChineseA2() {
    try {
        const modulesToUpload = ['zh_a2_m05', 'zh_a2_m06', 'zh_a2_m07', 'zh_a2_m08', 'zh_a2_m09', 'zh_a2_m10'];
        console.log('🚀 Finalizing Chinese A2 Curriculum (Modules 05-10)...\n');

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

        // Update Level Metadata to Complete
        const levelPath = `languages/chinese/levels/a2`;
        await db.doc(levelPath).set({
            count: 10,
            moduleCount: 10,
            status: 'Complete'
        }, { merge: true });

        console.log('\n🏆 Level metadata updated: Chinese A2 is now status: "Complete"');
        console.log('🎉 MISSION ACCOMPLISHED: Entire Chinese A2 Curriculum is LIVE!');

    } catch (error) {
        console.error('❌ Error during finalization:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

finalizeChineseA2();
