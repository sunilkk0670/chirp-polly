const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadChineseA1Module01() {
    try {
        console.log('🚀 Starting Chinese A1 Module 01 upload...\n');

        // Read the JSON file
        const filePath = path.join(__dirname, '../firestore_data/zh_a1_m01.json');
        const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const { module_id, language, level, theme, order, lessons } = moduleData;

        console.log(`📦 Module ID: ${module_id}`);
        console.log(`🌍 Language: ${language}`);
        console.log(`📊 Level: ${level}`);
        console.log(`🎯 Theme: ${theme}`);
        console.log(`📝 Total Lessons: ${lessons.length}`);

        // Count total words
        const totalWords = lessons.reduce((sum, lesson) => sum + lesson.vocabulary.length, 0);
        console.log(`📚 Total Words: ${totalWords}\n`);

        // Upload to Firestore: languages/chinese/levels/a1/modules/zh_a1_m01
        const modulePath = `languages/${language}/levels/${level.toLowerCase()}/modules/${module_id}`;

        console.log(`📍 Uploading to path: ${modulePath}`);

        await db.doc(modulePath).set({
            module_id,
            language,
            level,
            theme,
            order,
            lessons
        });

        console.log('✅ Module uploaded successfully!\n');

        // Update the A1 level metadata
        const levelPath = `languages/${language}/levels/${level.toLowerCase()}`;

        console.log(`📍 Updating level metadata at: ${levelPath}`);

        await db.doc(levelPath).set({
            level: level,
            description: "Beginner - Basic phrases and vocabulary",
            modules: admin.firestore.FieldValue.arrayUnion(module_id),
            count: 1,
            moduleCount: 10,
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Level metadata updated!\n');
        console.log('🎉 Chinese A1 Module 01 deployment complete!');

    } catch (error) {
        console.error('❌ Error uploading module:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

uploadChineseA1Module01();
