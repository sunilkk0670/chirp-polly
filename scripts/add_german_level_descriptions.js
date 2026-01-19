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

async function addLevelDescriptions() {
    console.log('📝 Adding level descriptions to German curriculum...\n');

    try {
        // A1 Level
        const a1Ref = db.collection('languages').doc('german')
            .collection('levels').doc('a1');

        await a1Ref.set({
            description: 'Beginner - Basic phrases and vocabulary'
        }, { merge: true });

        console.log('✅ Updated A1 description');

        // A2 Level
        const a2Ref = db.collection('languages').doc('german')
            .collection('levels').doc('a2');

        await a2Ref.set({
            description: 'Elementary - Simple conversations'
        }, { merge: true });

        console.log('✅ Updated A2 description');

        // B1 Level
        const b1Ref = db.collection('languages').doc('german')
            .collection('levels').doc('b1');

        await b1Ref.set({
            description: 'Intermediate - Everyday situations'
        }, { merge: true });

        console.log('✅ Updated B1 description');

        console.log('\n🎉 All German level descriptions updated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating descriptions:', error);
        process.exit(1);
    }
}

addLevelDescriptions();
