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

async function uploadRichChineseModules() {
    try {
        console.log('🚀 Uploading Chinese A1 modules with Rich Liar Game Metadata...\n');

        const modules = ['zh_a1_m01', 'zh_a1_m02', 'zh_a1_m03', 'zh_a1_m04', 'zh_a1_m05', 'zh_a1_m06'];

        for (const moduleId of modules) {
            const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            console.log(`📦 Module: ${moduleId} (${data.theme})`);

            const modulePath = `languages/chinese/levels/a1/modules/${moduleId}`;

            // Note: We include liar_game_data at the root of the document
            await db.doc(modulePath).set({
                module_id: data.module_id,
                language: data.language,
                level: data.level,
                theme: data.theme,
                order: data.order,
                lessons: data.lessons,
                liar_game_data: data.liar_game_data
            });

            console.log(`   ✅ Uploaded to: ${modulePath}`);
            console.log(`     Liar Game Trap 1: ${data.lessons[9].vocabulary[4].word} (Pos 95)`);
            console.log(`     Liar Game Trap 2: ${data.lessons[9].vocabulary[5].word} (Pos 96)`);
            console.log(`     Liar Game Trap 3: ${data.lessons[9].vocabulary[6].word} (Pos 97)`);
        }

        // Update Level Metadata
        const levelPath = `languages/chinese/levels/a1`;
        await db.doc(levelPath).set({
            level: 'A1',
            description: "Beginner - Basic phrases and vocabulary",
            count: 6,
            moduleCount: 10,
            status: 'In Progress'
        }, { merge: true });

        console.log('\n✅ Level metadata updated!');
        console.log('\n🎉 SUCCESS: All Chinese A1 modules updated with Rich Liar Game Metadata!');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

uploadRichChineseModules();
