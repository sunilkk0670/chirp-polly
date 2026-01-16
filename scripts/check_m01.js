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

async function checkModule01() {
    try {
        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc('es_a1_m01')
            .get();

        if (doc.exists) {
            const data = doc.data();
            console.log('\n✅ Module 01 EXISTS in Firestore');
            console.log(`   Theme: ${data.theme}`);
            console.log(`   Words: ${data.vocabulary?.length || 0}`);
            console.log(`   Order: ${data.order}`);
        } else {
            console.log('\n❌ Module 01 DOES NOT EXIST in Firestore!');
            console.log('   This is the problem - Module 01 was never uploaded.\n');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkModule01();
