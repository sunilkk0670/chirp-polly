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

async function uploadAllChineseA1Modules() {
    try {
        console.log('🚀 Re-uploading all Chinese A1 modules with Liar Game traps...\n');

        for (let i = 1; i <= 6; i++) {
            const moduleNum = i.toString().padStart(2, '0');
            const filePath = path.join(__dirname, `../firestore_data/zh_a1_m${moduleNum}.json`);
            const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            const { module_id, language, level, theme, order, lessons } = moduleData;

            console.log(`📦 Module ${moduleNum}: ${module_id}`);
            console.log(`   Theme: ${theme}`);
            console.log(`   Lessons: ${lessons.length}`);

            const totalWords = lessons.reduce((sum, lesson) => sum + lesson.vocabulary.length, 0);
            console.log(`   Total Words: ${totalWords}`);

            const modulePath = `languages/${language}/levels/${level.toLowerCase()}/modules/${module_id}`;

            await db.doc(modulePath).set({
                module_id,
                language,
                level,
                theme,
                order,
                lessons
            });

            console.log(`   ✅ Uploaded to: ${modulePath}\n`);
        }

        // Update level metadata
        const levelPath = `languages/chinese/levels/a1`;
        await db.doc(levelPath).set({
            level: 'A1',
            description: "Beginner - Basic phrases and vocabulary",
            count: 6,
            moduleCount: 10,
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Level metadata updated!');
        console.log('\n🎉 All Chinese A1 modules re-uploaded with Liar Game traps!');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

uploadAllChineseA1Modules();
