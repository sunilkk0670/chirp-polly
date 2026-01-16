import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkDataStructure() {
    try {
        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc('es_a1_m01')
            .get();

        const data = doc.data();
        console.log('\n📋 Module 01 Data Structure:\n');
        console.log('Fields:', Object.keys(data));
        console.log('\nHas "vocabulary"?', data.vocabulary ? 'YES' : 'NO');
        console.log('Has "vocabularyItems"?', data.vocabularyItems ? 'YES' : 'NO');
        console.log('Has "lessons"?', data.lessons ? 'YES' : 'NO');
        console.log('Has "count"?', data.count ? 'YES' : 'NO');

        if (data.vocabulary) {
            console.log('\n❌ PROBLEM: Using "vocabulary" field');
            console.log('   App expects: "vocabularyItems" or "lessons"\n');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkDataStructure();
