import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account
const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function createLocalMirror() {
    try {
        console.log('\n📥 Creating local mirror from Firestore...\n');

        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc('es_a1_m02_audited_100')
            .get();

        if (!doc.exists) {
            console.log('❌ Module not found in Firestore!');
            process.exit(1);
        }

        const data = doc.data();

        // Write to local file
        const localPath = join(__dirname, '../assets/data/curriculum/es_a1/es_a1_m02.json');
        writeFileSync(localPath, JSON.stringify(data, null, 2));

        console.log('✓ Local mirror created successfully');
        console.log(`  File: assets/data/curriculum/es_a1/es_a1_m02.json`);
        console.log(`  Module ID: ${data.module_id}`);
        console.log(`  Theme: ${data.theme}`);
        console.log(`  Total Words: ${data.vocabulary.length}\n`);

        // Validation
        console.log('Validation:');
        console.log(`  Word 10: ${data.vocabulary[9].word} - ${data.vocabulary[9].translation}`);

        const words = data.vocabulary.map(v => v.word);
        const duplicates = words.filter((w, i) => words.indexOf(w) !== i);
        console.log(`  Duplicates: ${duplicates.length === 0 ? 'None ✓' : duplicates.join(', ')}`);
        console.log(`  IPA Phonetics: ${data.vocabulary[0].phonetic ? '✓' : '✗'}`);
        console.log(`  Usage Examples: ${data.vocabulary[0].usage ? '✓' : '✗'}\n`);

        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ Local Mirror Creation Complete!');
        console.log('═══════════════════════════════════════════════════════\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating local mirror:', error);
        process.exit(1);
    }
}

createLocalMirror();
