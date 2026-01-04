const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkEnglishData() {
    try {
        console.log('=== Checking English Language Data ===\n');

        // Check language document
        const langDoc = await db.collection('languages').doc('english').get();
        console.log('1. Language Document:');
        console.log('   Exists:', langDoc.exists);
        if (langDoc.exists) {
            console.log('   Data:', JSON.stringify(langDoc.data(), null, 2));
        }
        console.log();

        // Check A1 level
        const a1Doc = await db.collection('languages').doc('english')
            .collection('levels').doc('a1').get();
        console.log('2. A1 Level Document:');
        console.log('   Exists:', a1Doc.exists);
        if (a1Doc.exists) {
            console.log('   Data:', JSON.stringify(a1Doc.data(), null, 2));
        }
        console.log();

        // Check modules
        const modulesSnapshot = await db.collection('languages').doc('english')
            .collection('levels').doc('a1')
            .collection('modules').get();
        console.log('3. Modules:');
        console.log('   Count:', modulesSnapshot.size);
        modulesSnapshot.forEach(doc => {
            const data = doc.data();
            console.log(`   - ${doc.id}: ${data.vocabularyItems?.length || 0} words`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkEnglishData();
