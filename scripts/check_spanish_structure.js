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

async function checkSpanishStructure() {
    try {
        console.log('\n🔍 Checking Spanish Firestore Structure...\n');

        // Check if Spanish language document exists
        const langDoc = await db.collection('languages').doc('spanish').get();

        if (!langDoc.exists) {
            console.log('❌ Spanish language document does NOT exist!\n');
            console.log('This is why the app shows nothing. Creating it now...\n');

            await db.collection('languages').doc('spanish').set({
                name: 'Spanish',
                nativeName: 'Español',
                flag: '🇪🇸',
                order: 1,
                isActive: true
            });

            console.log('✅ Created Spanish language document\n');
        } else {
            console.log('✅ Spanish language document exists:');
            console.log(langDoc.data());
            console.log();
        }

        // Check if A1 level exists
        const levelDoc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .get();

        if (!levelDoc.exists) {
            console.log('❌ Spanish A1 level document does NOT exist!\n');
            console.log('Creating it now...\n');

            await db
                .collection('languages')
                .doc('spanish')
                .collection('levels')
                .doc('a1')
                .set({
                    name: 'A1',
                    description: 'Beginner - Basic phrases and everyday expressions',
                    order: 1,
                    moduleCount: 8,
                    totalWords: 800,
                    isActive: true
                });

            console.log('✅ Created Spanish A1 level document\n');
        } else {
            console.log('✅ Spanish A1 level document exists:');
            console.log(levelDoc.data());
            console.log();
        }

        // List all modules
        const modulesSnapshot = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .orderBy('order')
            .get();

        console.log(`📋 Found ${modulesSnapshot.size} modules:\n`);
        modulesSnapshot.forEach(doc => {
            const data = doc.data();
            console.log(`  ${data.order}. ${doc.id} - ${data.theme} (${data.vocabulary?.length || 0} words)`);
        });

        console.log('\n✅ Structure check complete!\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

checkSpanishStructure();
