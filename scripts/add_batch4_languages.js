const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addBatch4Languages() {
    const batch4Languages = [
        {
            id: 'punjabi',
            name: 'Punjabi',
            nativeName: 'ਪੰਜਾਬੀ',
            flag: '🇮🇳',
            enabled: true,
            order: 7
        },
        {
            id: 'portuguese',
            name: 'Portuguese',
            nativeName: 'Português',
            flag: '🇵🇹',
            enabled: true,
            order: 9
        }
    ];

    const levels = [
        { id: 'a1', name: 'A1 - Beginner', order: 1 },
        { id: 'a2', name: 'A2 - Elementary', order: 2 },
        { id: 'b1', name: 'B1 - Intermediate', order: 3 }
    ];

    try {
        for (const language of batch4Languages) {
            console.log(`\nAdding ${language.name}...`);

            // Add language document
            await db.collection('languages').doc(language.id).set(language);
            console.log(`✓ ${language.name} language added`);

            // Add levels for this language
            for (const level of levels) {
                await db.collection('languages')
                    .doc(language.id)
                    .collection('levels')
                    .doc(level.id)
                    .set(level);
                console.log(`  ✓ ${level.name} level added`);
            }
        }

        console.log('\n✅ All Batch 4 languages and levels added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error adding Batch 4 languages:', error);
        process.exit(1);
    }
}

addBatch4Languages();
