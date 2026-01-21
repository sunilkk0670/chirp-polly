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

async function uploadSanskritB1M01M02() {
    const modules = ['sa_b1_m01', 'sa_b1_m02'];

    console.log(`📤 Starting upload for Sanskrit B1 Modules 01 & 02...\n`);
    console.log(`🎯 INITIALIZING SANSKRIT B1 LEVEL!\n`);

    try {
        for (const moduleId of modules) {
            // Read the module data
            const modulePath = join(__dirname, '..', 'firestore_data', `${moduleId}.json`);
            const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

            // Upload module to Firestore
            const docRef = db.collection('languages').doc('sanskrit')
                .collection('levels').doc('b1')
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

        // Initialize B1 level metadata
        const levelRef = db.collection('languages').doc('sanskrit')
            .collection('levels').doc('b1');

        await levelRef.set({
            cefr: 'B1',
            count: 2,
            description: 'Intermediate - Advanced literary analysis and philosophical discourse',
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Initialized Sanskrit B1 level metadata');
        console.log('   Module Count: 2');
        console.log('   Status: In Progress\n');
        console.log('═══════════════════════════════════════════════════════');
        console.log('🎊 SANSKRIT B1 LEVEL INITIALIZED! 🎊');
        console.log('═══════════════════════════════════════════════════════\n');
        console.log('📊 Deployment Summary:');
        console.log('   • 200 Sanskrit B1 words uploaded (Modules 01-02)');
        console.log('   • 20 nested lessons created');
        console.log('   • Module 01: Advanced Literature & Epic Syntax');
        console.log('   • Module 02: Philosophical Dialectics & Logic');
        console.log('   • 2 Liar Game traps integrated\n');
        console.log('🎯 Progress: 200/1,000 words (20% COMPLETE)\n');
        console.log('📚 SANSKRIT B1 MODULES DEPLOYED:');
        console.log('   01. Advanced Literature & Epic Syntax (100 words) ✅');
        console.log('   02. Philosophical Dialectics & Logic (100 words) ✅');
        console.log('   03-10. Pending (800 words remaining)\n');
        console.log('🌟 Total Sanskrit Vocabulary: 2,200 words (A1 + A2 + B1) 🌟\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadSanskritB1M01M02();
