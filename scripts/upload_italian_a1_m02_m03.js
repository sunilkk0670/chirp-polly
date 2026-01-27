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

async function uploadItalianA1Modules() {
    console.log('📤 Uploading Italian A1 Modules 02 & 03 to Firestore...\n');

    try {
        // Upload Module 02
        const module02Path = join(__dirname, '..', 'firestore_data', 'ita_a1_m02.json');
        const module02Data = JSON.parse(readFileSync(module02Path, 'utf8'));

        const docRef02 = db.collection('languages').doc('italian')
            .collection('levels').doc('a1')
            .collection('modules').doc('ita_a1_m02');

        await docRef02.set(module02Data);

        console.log('✅ Successfully uploaded ita_a1_m02');
        console.log(`   Path: languages/italian/levels/a1/modules/ita_a1_m02`);
        console.log(`   Theme: ${module02Data.theme}`);
        console.log(`   Words: ${module02Data.lessons.reduce((sum, lesson) => sum + lesson.vocabularyItems.length, 0)}`);
        console.log(`   Order: ${module02Data.order}\n`);

        // Upload Module 03
        const module03Path = join(__dirname, '..', 'firestore_data', 'ita_a1_m03.json');
        const module03Data = JSON.parse(readFileSync(module03Path, 'utf8'));

        const docRef03 = db.collection('languages').doc('italian')
            .collection('levels').doc('a1')
            .collection('modules').doc('ita_a1_m03');

        await docRef03.set(module03Data);

        console.log('✅ Successfully uploaded ita_a1_m03');
        console.log(`   Path: languages/italian/levels/a1/modules/ita_a1_m03`);
        console.log(`   Theme: ${module03Data.theme}`);
        console.log(`   Words: ${module03Data.lessons.reduce((sum, lesson) => sum + lesson.vocabularyItems.length, 0)}`);
        console.log(`   Order: ${module03Data.order}\n`);

        // Update A1 level metadata
        const levelRef = db.collection('languages').doc('italian')
            .collection('levels').doc('a1');

        await levelRef.set({
            cefr: 'A1',
            name: 'A1 - Beginner',
            id: 'a1',
            count: 3,
            moduleCount: 10,
            order: 1,
            status: 'In Progress'
        }, { merge: true });

        console.log('✅ Updated A1 level metadata');
        console.log('   Current Module Count: 3');
        console.log('   Total Planned Modules: 10');
        console.log('   Status: In Progress\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadItalianA1Modules();
