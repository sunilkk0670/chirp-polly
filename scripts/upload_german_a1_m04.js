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

async function uploadGermanA1Module4() {
    console.log('📤 Uploading German A1 Module 4 to Firestore...\n');

    try {
        const modulePath = join(__dirname, '..', 'firestore_data', 'de_a1_m04.json');
        const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

        // Upload to: languages/german/levels/a1/modules/de_a1_m04
        const docRef = db.collection('languages').doc('german')
            .collection('levels').doc('a1')
            .collection('modules').doc('de_a1_m04');

        await docRef.set(moduleData);

        console.log('✅ Successfully uploaded de_a1_m04');
        console.log(`   Path: languages/german/levels/a1/modules/de_a1_m04`);
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
            count: 4,
            order: 1
        }, { merge: true });

        console.log('✅ Updated A1 level metadata');
        console.log('   Module Count: 4\n');

        console.log('🎉 German A1 Module 04 deployment complete!');
        console.log('   Total cumulative words: 400 (399 unique + 1 review)\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadGermanA1Module4();
