const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function createA2LevelDocs() {
    console.log('🔧 Creating A2 level documents...\n');

    const languages = ['japanese', 'korean', 'spanish'];

    for (const lang of languages) {
        await db
            .collection('languages')
            .doc(lang)
            .collection('levels')
            .doc('a2')
            .set({
                name: 'A2 - Elementary',
                description: 'Can understand sentences and frequently used expressions',
                order: 2,
                cefr: 'A2'
            });

        console.log(`✓ ${lang} A2 level document created`);
    }

    console.log('\n✅ All A2 level documents created\n');
    process.exit(0);
}

createA2LevelDocs().catch(console.error);
