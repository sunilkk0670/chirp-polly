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

async function uploadKoreanA2Module6() {
    console.log('📤 Uploading Korean A2 Module 6 to Firestore...\n');

    try {
        const modulePath = join(__dirname, '..', 'firestore_data', 'ko_a2_m06.json');
        const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

        const docRef = db.collection('languages').doc('korean')
            .collection('levels').doc('a2')
            .collection('modules').doc('ko_a2_m06');

        await docRef.set(moduleData);

        console.log('✅ Successfully uploaded ko_a2_m06');
        console.log(`   Theme: ${moduleData.theme}`);
        console.log(`   Words: ${moduleData.lessons[0].vocabularyItems.length}\n`);

        const levelRef = db.collection('languages').doc('korean')
            .collection('levels').doc('a2');

        await levelRef.set({
            moduleCount: 6,
        }, { merge: true });

        console.log('✅ Updated A2 level metadata (Module Count: 6)\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadKoreanA2Module6();
