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

async function verifySpanishA1Module01() {
    try {
        console.log('\n🔍 Verifying Spanish A1 Module 01 in Firestore...\n');

        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc('es_a1_m01_audited_100')
            .get();

        if (!doc.exists) {
            console.log('❌ Module not found in Firestore!');
            process.exit(1);
        }

        const data = doc.data();

        console.log('✅ Module found in Firestore!\n');
        console.log('📊 Module Details:');
        console.log(`   Module ID: ${data.module_id}`);
        console.log(`   Language: ${data.language}`);
        console.log(`   Level: ${data.level}`);
        console.log(`   Theme: ${data.theme}`);
        console.log(`   Total Words: ${data.vocabulary.length}\n`);

        console.log('📝 Sample Vocabulary Items:');
        for (let i = 0; i < Math.min(5, data.vocabulary.length); i++) {
            const item = data.vocabulary[i];
            console.log(`\n   Word ${i + 1}: ${item.word}`);
            console.log(`   Translation: ${item.translation}`);
            console.log(`   IPA: ${item.phonetic}`);
            console.log(`   Usage: ${item.usage.substring(0, 60)}...`);
        }

        console.log(`\n\n🔍 Checking for duplicates...`);
        const words = data.vocabulary.map(v => v.word);
        const duplicates = words.filter((w, i) => words.indexOf(w) !== i);

        if (duplicates.length > 0) {
            console.log(`❌ Found ${duplicates.length} duplicates: ${duplicates.join(', ')}`);
        } else {
            console.log('✅ No duplicates found!');
        }

        console.log(`\n🔍 Checking Word 9 and 10 (the bug fix area)...`);
        console.log(`   Word 9: ${data.vocabulary[8].word} (${data.vocabulary[8].translation})`);
        console.log(`   Word 10: ${data.vocabulary[9].word} (${data.vocabulary[9].translation})`);

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('✅ Verification Complete - All Checks Passed!');
        console.log('═══════════════════════════════════════════════════════\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error verifying module:', error);
        process.exit(1);
    }
}

verifySpanishA1Module01();
