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

async function fullDiagnostic() {
    try {
        console.log('\n═══════════════════════════════════════════════════════');
        console.log('🔍 SPANISH A1 FULL DIAGNOSTIC');
        console.log('═══════════════════════════════════════════════════════\n');

        // 1. Check language document
        console.log('1️⃣  Checking Spanish language document...\n');
        const langDoc = await db.collection('languages').doc('spanish').get();

        if (langDoc.exists) {
            console.log('✅ Spanish language exists:');
            console.log(JSON.stringify(langDoc.data(), null, 2));
        } else {
            console.log('❌ Spanish language does NOT exist!');
        }

        // 2. Check A1 level document
        console.log('\n2️⃣  Checking A1 level document...\n');
        const levelDoc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .get();

        if (levelDoc.exists) {
            console.log('✅ A1 level exists:');
            console.log(JSON.stringify(levelDoc.data(), null, 2));
        } else {
            console.log('❌ A1 level does NOT exist!');
        }

        // 3. Check modules with orderBy
        console.log('\n3️⃣  Checking modules (with orderBy)...\n');
        const modulesSnapshot = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .orderBy('order')
            .get();

        console.log(`✅ Found ${modulesSnapshot.size} modules:\n`);
        modulesSnapshot.forEach(doc => {
            const data = doc.data();
            console.log(`  ${data.order}. ${doc.id}`);
            console.log(`     Theme: ${data.theme}`);
            console.log(`     Words: ${data.vocabulary?.length || 0}`);
            console.log(`     Has order field: ${data.order !== undefined ? '✓' : '✗'}`);
            console.log();
        });

        // 4. Sample word from Module 01
        console.log('4️⃣  Sample from Module 01 (Word 1)...\n');
        const m01 = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc('es_a1_m01')
            .get();

        if (m01.exists) {
            const word1 = m01.data().vocabulary[0];
            console.log('✅ Module 01 Word 1:');
            console.log(`   Word: ${word1.word}`);
            console.log(`   Translation: ${word1.translation}`);
            console.log(`   Phonetic: ${word1.phonetic}`);
            console.log(`   Usage: ${word1.usage?.substring(0, 50)}...`);
        }

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('✅ DIAGNOSTIC COMPLETE');
        console.log('═══════════════════════════════════════════════════════');
        console.log('\n📱 Next Steps:');
        console.log('   1. Hot restart your Flutter app (press R in terminal)');
        console.log('   2. Navigate to Spanish → A1');
        console.log('   3. You should see all 8 modules listed\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error:', error);
        console.error('\nIf you see "requires an index", create it here:');
        console.error('https://console.firebase.google.com/project/_/firestore/indexes\n');
        process.exit(1);
    }
}

fullDiagnostic();
