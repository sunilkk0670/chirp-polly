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

async function uploadChineseA1Module06() {
    try {
        console.log('🚀 Starting Chinese A1 Module 06 upload...\n');

        const filePath = path.join(__dirname, '../firestore_data/zh_a1_m06.json');
        const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const { module_id, language, level, theme, order, lessons } = moduleData;

        console.log(`📦 Module ID: ${module_id}`);
        console.log(`🌍 Language: ${language}`);
        console.log(`📊 Level: ${level}`);
        console.log(`🎯 Theme: ${theme}`);
        console.log(`📝 Total Lessons: ${lessons.length}`);

        const totalWords = lessons.reduce((sum, lesson) => sum + lesson.vocabulary.length, 0);
        console.log(`📚 Total Words: ${totalWords}\n`);

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

        const levelPath = `languages/${language}/levels/${level.toLowerCase()}`;

        console.log(`📍 Updating level metadata at: ${levelPath}`);

        await db.doc(levelPath).set({
            level: level,
            description: "Beginner - Basic phrases and vocabulary",
            modules: admin.firestore.FieldValue.arrayUnion(module_id),
            count: 6,
            moduleCount: 10,
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Level metadata updated!\n');
        console.log('🎉 Chinese A1 Module 06 deployment complete!');

    } catch (error) {
        console.error('❌ Error uploading module:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

uploadChineseA1Module06();
