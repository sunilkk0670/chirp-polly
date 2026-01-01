const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function verifyA2Levels() {
    console.log('\n🔍 Verifying A2 Levels in Firestore...\n');

    const languages = ['spanish', 'japanese', 'korean'];

    for (const lang of languages) {
        console.log(`\n📚 ${lang.toUpperCase()}:`);

        // Check if A2 level document exists
        const a2LevelDoc = await db
            .collection('languages')
            .doc(lang)
            .collection('levels')
            .doc('a2')
            .get();

        if (!a2LevelDoc.exists) {
            console.log(`  ⚠️  A2 level document missing - creating it...`);

            // Create A2 level document
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

            console.log(`  ✅ Created A2 level document`);
        } else {
            console.log(`  ✅ A2 level document exists`);
        }

        // Check modules
        const modulesSnapshot = await db
            .collection('languages')
            .doc(lang)
            .collection('levels')
            .doc('a2')
            .collection('modules')
            .get();

        console.log(`  📦 Modules: ${modulesSnapshot.size}`);

        if (modulesSnapshot.size > 0) {
            modulesSnapshot.docs.slice(0, 3).forEach(doc => {
                const data = doc.data();
                console.log(`     - ${data.theme || doc.id}`);
            });
            if (modulesSnapshot.size > 3) {
                console.log(`     ... and ${modulesSnapshot.size - 3} more`);
            }
        }
    }

    console.log('\n✅ Verification complete!\n');
    process.exit(0);
}

verifyA2Levels().catch(console.error);
