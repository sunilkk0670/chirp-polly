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

async function checkModule10() {
    try {
        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc('es_a1_m10')
            .get();

        if (doc.exists) {
            const data = doc.data();
            console.log('\n✅ Module 10 EXISTS');
            console.log(`   Words: ${data.vocabulary?.length || 0}`);
            console.log(`   Word 1: ${data.vocabulary[0]?.word}`);
            console.log(`   Word 10: ${data.vocabulary[9]?.word}`);
            console.log(`   Word 100: ${data.vocabulary[99]?.word}`);
            console.log(`   Last word: ${data.vocabulary[data.vocabulary.length - 1]?.word}\n`);
        } else {
            console.log('\n❌ Module 10 does NOT exist\n');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkModule10();
