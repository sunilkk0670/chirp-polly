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

async function addItalianLevelDescriptions() {
    console.log('📝 Adding descriptions to Italian levels...\n');

    try {
        // Update A1 level with description
        const a1Ref = db.collection('languages').doc('italian')
            .collection('levels').doc('a1');

        await a1Ref.set({
            description: 'Basic Italian - Greetings, Daily Life, and Essentials'
        }, { merge: true });

        console.log('✅ Updated A1 level description');

        // Update A2 level with description (for future use)
        const a2Ref = db.collection('languages').doc('italian')
            .collection('levels').doc('a2');

        await a2Ref.set({
            cefr: 'A2',
            name: 'A2 - Elementary',
            id: 'a2',
            count: 0,
            moduleCount: 10,
            order: 2,
            status: 'Not Started',
            description: 'Elementary Italian - Conversations and Practical Skills'
        }, { merge: true });

        console.log('✅ Updated A2 level description');

        // Update B1 level with description (for future use)
        const b1Ref = db.collection('languages').doc('italian')
            .collection('levels').doc('b1');

        await b1Ref.set({
            cefr: 'B1',
            name: 'B1 - Intermediate',
            id: 'b1',
            count: 0,
            moduleCount: 10,
            order: 3,
            status: 'Not Started',
            description: 'Intermediate Italian - Complex Topics and Fluency'
        }, { merge: true });

        console.log('✅ Updated B1 level description\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during update:', error);
        process.exit(1);
    }
}

addItalianLevelDescriptions();
