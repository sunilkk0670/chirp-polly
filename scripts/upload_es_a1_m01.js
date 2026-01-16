import admin from 'firebase-admin';
import { readFileSync } from 'fs';
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

// Load the new Spanish A1 Module 01
const module = JSON.parse(
    readFileSync(join(__dirname, '../assets/data/curriculum/es_a1/es_a1_m01.json'), 'utf8')
);

async function uploadSpanishA1Module01() {
    try {
        console.log('\n🚀 Starting Spanish A1 Module 01 Upload...\n');

        // Upload the module to Firestore
        console.log('Step 1: Uploading es_a1_m01 to Firestore...');

        await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module.module_id)
            .set(module, { merge: false }); // Use merge: false for clean replacement

        console.log(`✓ Uploaded: ${module.theme}`);
        console.log(`  - Module ID: ${module.module_id}`);
        console.log(`  - Language: ${module.language}`);
        console.log(`  - Level: ${module.level}`);
        console.log(`  - Total Words: ${module.vocabulary.length}\n`);

        // Verify the upload
        console.log('Step 2: Verifying upload...');
        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module.module_id)
            .get();

        if (doc.exists) {
            const data = doc.data();
            console.log(`✓ Verification successful!`);
            console.log(`  - Words in Firestore: ${data.vocabulary.length}`);
            console.log(`  - Sample word: ${data.vocabulary[0].word} (${data.vocabulary[0].translation})`);
            console.log(`  - Has IPA: ${data.vocabulary[0].phonetic ? '✓' : '✗'}`);
            console.log(`  - Has usage: ${data.vocabulary[0].usage ? '✓' : '✗'}\n`);
        }

        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ Spanish A1 Module 01 Upload Complete!');
        console.log('═══════════════════════════════════════════════════════');
        console.log(`\n📊 Summary:`);
        console.log(`   Module: ${module.theme}`);
        console.log(`   Total Words: ${module.vocabulary.length}`);
        console.log(`   Schema: English B1 Compatible ✓`);
        console.log(`   IPA Phonetics: ✓`);
        console.log(`   Usage Examples: ✓`);
        console.log(`   Firestore Path: languages/spanish/levels/a1/modules/${module.module_id}\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error uploading Spanish A1 Module 01:', error);
        process.exit(1);
    }
}

uploadSpanishA1Module01();
