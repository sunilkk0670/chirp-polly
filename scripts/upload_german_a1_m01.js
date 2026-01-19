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

async function uploadGermanA1Module1() {
    console.log('📤 Uploading German A1 Module 1 to Firestore...\n');

    try {
        const modulePath = join(__dirname, '..', 'firestore_data', 'de_a1_m01.json');
        const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

        // Upload to: languages/german/levels/a1/modules/de_a1_m01
        const docRef = db.collection('languages').doc('german')
            .collection('levels').doc('a1')
            .collection('modules').doc('de_a1_m01');

        await docRef.set(moduleData);

        console.log('✅ Successfully uploaded de_a1_m01');
        console.log(`   Path: languages/german/levels/a1/modules/de_a1_m01`);
        console.log(`   Theme: ${moduleData.theme}`);
        console.log(`   Words: ${moduleData.lessons[0].vocabularyItems.length}`);
        console.log(`   Order: ${moduleData.order}\n`);

        // Update A1 level metadata
        const levelRef = db.collection('languages').doc('german')
            .collection('levels').doc('a1');

        await levelRef.set({
            cefr: 'A1',
            name: 'A1',
            id: 'a1',
            count: 1,
            order: 1
        }, { merge: true });

        console.log('✅ Updated A1 level metadata');
        console.log('   Module Count: 1\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadGermanA1Module1();
