const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
    console.error('❌ Service account key not found at:', serviceAccountPath);
    process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadModule(moduleId) {
    const filePath = path.join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Data file not found: ${filePath}`);
        return;
    }
    const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const level = 'a2';
    const language = 'italian';

    console.log(`\n🚀 Uploading Italian A2 Module ${moduleId} to Firestore...`);

    const moduleRef = db.collection('languages').doc(language)
        .collection('levels').doc(level)
        .collection('modules').doc(moduleId);

    // Upload main doc
    await moduleRef.set({
        moduleId: moduleId,
        theme: moduleData.theme,
        title: moduleData.title,
        level: level,
        language: language,
        order: moduleData.order,
        liar_game_data: moduleData.liar_game_data
    });

    // Upload lessons
    for (const lesson of moduleData.lessons) {
        const lessonRef = moduleRef.collection('lessons').doc(`lesson_${lesson.order}`);
        await lessonRef.set({
            order: lesson.order,
            vocabularyItems: lesson.vocabularyItems
        });
    }

    console.log(`✅ Successfully uploaded ${moduleId}`);
}

async function updateLevelMetadata() {
    console.log('\n📈 Updating Italian A2 level metadata...');
    const levelRef = db.collection('languages').doc('italian')
        .collection('levels').doc('a2');

    await levelRef.set({
        count: 9,
        moduleCount: 10
    }, { merge: true });

    console.log('✅ Updated a2/count to 9');
}

async function run() {
    try {
        // Explicitly using the requested naming convention
        await uploadModule('ita_a2_m08');
        await uploadModule('ita_a2_m09');
        await updateLevelMetadata();
        console.log('\n🎉 UPLOAD COMPLETE! Modules are now in firestore.');
    } catch (error) {
        console.error('❌ Error during process:', error);
    }
}

run();
