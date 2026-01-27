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

async function uploadItalianA1Module04() {
    console.log('📤 Uploading Italian A1 Module 04 to Firestore...\n');

    try {
        const modulePath = join(__dirname, '..', 'firestore_data', 'ita_a1_m04.json');
        const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

        // Upload to: languages/italian/levels/a1/modules/ita_a1_m04
        const docRef = db.collection('languages').doc('italian')
            .collection('levels').doc('a1')
            .collection('modules').doc('ita_a1_m04');

        await docRef.set(moduleData);

        console.log('✅ Successfully uploaded ita_a1_m04');
        console.log(`   Path: languages/italian/levels/a1/modules/ita_a1_m04`);
        console.log(`   Theme: ${moduleData.theme}`);
        console.log(`   Words: ${moduleData.lessons.reduce((sum, lesson) => sum + lesson.vocabularyItems.length, 0)}`);
        console.log(`   Order: ${moduleData.order}\n`);

        // Update A1 level metadata
        const levelRef = db.collection('languages').doc('italian')
            .collection('levels').doc('a1');

        await levelRef.set({
            count: 4,
            moduleCount: 10
        }, { merge: true });

        console.log('✅ Updated A1 level metadata');
        console.log('   Current Module Count: 4');
        console.log('   Total Planned Modules: 10\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadItalianA1Module04();
