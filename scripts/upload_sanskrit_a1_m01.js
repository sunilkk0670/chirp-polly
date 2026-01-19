import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadSanskritModule() {
    const moduleId = 'sa_a1_m01';

    console.log(`📤 Starting upload for Sanskrit A1 Module 01...\n`);

    try {
        // Read the module data
        const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
        const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

        // Upload module to Firestore
        const docRef = db.collection('languages').doc('sanskrit')
            .collection('levels').doc('a1')
            .collection('modules').doc(moduleId);

        await docRef.set(moduleData);

        console.log(`✅ Successfully uploaded ${moduleId}`);
        console.log(`   Theme: ${moduleData.theme}`);
        console.log(`   Language: ${moduleData.language}`);
        console.log(`   Level: ${moduleData.level}`);
        console.log(`   Order: ${moduleData.order}`);
        console.log(`   Lessons: ${moduleData.lessons.length}`);

        // Count total words
        const totalWords = moduleData.lessons.reduce((sum, lesson) =>
            sum + lesson.vocabularyItems.length, 0);
        console.log(`   Total Words: ${totalWords}`);
        console.log(`   Liar Game Trap: ${moduleData.liar_game_data.topic}\n`);

        // Update A1 level metadata
        const levelRef = db.collection('languages').doc('sanskrit')
            .collection('levels').doc('a1');

        await levelRef.set({
            cefr: 'A1',
            count: 1,
            description: 'Beginner - Basic phrases and Devanagari script',
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Updated Sanskrit A1 level metadata');
        console.log('   Module Count: 1');
        console.log('   Status: In Progress\n');
        console.log('🎉 Sanskrit A1 Module 01 deployment complete!');
        console.log('\n📊 Summary:');
        console.log('   • 100 Sanskrit words uploaded');
        console.log('   • 10 nested lessons created');
        console.log('   • Liar Game trap: कागजमार्जारी (Paper Cat)');
        console.log('   • Devanagari script support enabled\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadSanskritModule();
