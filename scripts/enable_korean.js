import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
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

async function checkAndEnable() {
    const docRef = db.collection('languages').doc('korean');
    const doc = await docRef.get();

    console.log('Current Korean Doc State:', doc.exists ? doc.data() : 'MISSING');

    if (!doc.exists || !doc.data().enabled) {
        console.log('Enabling Korean...');
        await docRef.set({
            name: 'Korean',
            nativeScript: '한국어',
            flag: '🇰🇷',
            enabled: true,
            order: 6 // Adopting a reasonable order
        }, { merge: true });
        console.log('✅ Korean is now enabled.');
    } else {
        console.log('✅ Korean was already enabled.');
    }
    process.exit(0);
}

checkAndEnable();
