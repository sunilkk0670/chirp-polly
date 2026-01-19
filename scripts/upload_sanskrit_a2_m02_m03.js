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

async function uploadSanskritA2M02M03() {
    const modules = ['sa_a2_m02', 'sa_a2_m03'];

    console.log(`📤 Starting upload for Sanskrit A2 Modules 02 & 03...\n`);

    try {
        for (const moduleId of modules) {
            // Read the module data
            const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
            const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

            // Upload module to Firestore
            const docRef = db.collection('languages').doc('sanskrit')
                .collection('levels').doc('a2')
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

        // Update A2 level metadata
        const levelRef = db.collection('languages').doc('sanskrit')
            .collection('levels').doc('a2');

        await levelRef.set({
            cefr: 'A2',
            count: 3,
            description: 'Elementary - Complex sentences and cultural concepts',
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Updated Sanskrit A2 level metadata');
        console.log('   Module Count: 3');
        console.log('   Status: In Progress\n');
        console.log('═══════════════════════════════════════════════════════');
        console.log('🌟 SANSKRIT A2 MODULES 02 & 03 DEPLOYED! 🌟');
        console.log('═══════════════════════════════════════════════════════\n');
        console.log('📊 Summary:');
        console.log('   • 200 Sanskrit A2 words uploaded (Modules 02 & 03)');
        console.log('   • 300 total words across 3 modules');
        console.log('   • 20 nested lessons created');
        console.log('   • Module 02: Advanced Verbs & Gerunds');
        console.log('   • Module 03: City, Travel & Infrastructure');
        console.log('   • 2 Liar Game traps integrated\n');
        console.log('🎯 Progress: 300/1,000 words (30% of A2 complete)\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadSanskritA2M02M03();
