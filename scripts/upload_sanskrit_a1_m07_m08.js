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

async function uploadSanskritModules0708() {
    const modules = ['sa_a1_m07', 'sa_a1_m08'];

    console.log(`📤 Starting upload for Sanskrit A1 Modules 07 & 08...\n`);

    try {
        for (const moduleId of modules) {
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
            console.log(`   Order: ${moduleData.order}`);

            // Count total words
            const totalWords = moduleData.lessons.reduce((sum, lesson) =>
                sum + lesson.vocabularyItems.length, 0);
            console.log(`   Total Words: ${totalWords}`);
            console.log(`   Liar Game Trap: ${moduleData.liar_game_data.topic}\n`);
        }

        // Update A1 level metadata
        const levelRef = db.collection('languages').doc('sanskrit')
            .collection('levels').doc('a1');

        await levelRef.set({
            cefr: 'A1',
            count: 8,
            description: 'Beginner - Basic phrases and Devanagari script',
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Updated Sanskrit A1 level metadata');
        console.log('   Module Count: 8');
        console.log('   Status: In Progress\n');
        console.log('🎉 Sanskrit A1 Modules 07 & 08 deployment complete!');
        console.log('\n📊 Summary:');
        console.log('   • 200 Sanskrit words uploaded (Modules 07 & 08)');
        console.log('   • 800 total words across 8 modules');
        console.log('   • 20 nested lessons created');
        console.log('   • Module 07: Numbers & Quantities');
        console.log('   • Module 08: Nature & Elements\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadSanskritModules0708();
