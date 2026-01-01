const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function verifyModuleOne() {
    const docPath = 'languages/french/levels/a1/modules/fr_a1_m1';
    console.log(`Checking document: ${docPath}`);

    const doc = await db.doc(docPath).get();

    if (!doc.exists) {
        console.error(`❌ ERROR: Document ${docPath} DOES NOT EXIST.`);
        return;
    }

    const data = doc.data();
    console.log('--- Document Fields ---');
    console.log(`ID: ${data.id}`);
    console.log(`ModuleID: ${data.moduleId}`);
    console.log(`Order: ${data.order} (Type: ${typeof data.order})`);
    console.log(`Theme: ${data.theme}`);
    console.log(`VocabularyItems Count: ${data.vocabularyItems ? data.vocabularyItems.length : 'MISSING'}`);
    console.log(`Explicit Count: ${data.count}`);

    if (data.vocabularyItems && data.vocabularyItems.length > 0) {
        console.log('\n--- First 3 Words ---');
        data.vocabularyItems.slice(0, 3).forEach((item, i) => {
            console.log(`${i + 1}. Word: ${item.word}, Meaning: ${item.meaning}`);
        });

        console.log('\n--- Last 3 Words ---');
        data.vocabularyItems.slice(-3).forEach((item, i) => {
            console.log(`${98 + i}. Word: ${item.word}, Meaning: ${item.meaning}`);
        });
    }
}

verifyModuleOne().catch(console.error);
