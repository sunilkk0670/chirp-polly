const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function inspect() {
    const docPath = 'languages/japanese/levels/b1/modules/jp_b1_m1';
    const doc = await db.doc(docPath).get();

    if (!doc.exists) {
        console.log(`Document ${docPath} not found!`);
        return;
    }

    const data = doc.data();
    console.log(`Module: ${data.moduleId}`);
    console.log(`Keys: ${Object.keys(data).join(', ')}`);

    if (data.vocabularyItems && data.vocabularyItems.length > 0) {
        console.log(`First Vocabulary Item Keys: ${Object.keys(data.vocabularyItems[0]).join(', ')}`);
        console.log(`First Vocabulary Item:`, JSON.stringify(data.vocabularyItems[0], null, 2));
    } else {
        console.log('No vocabulary items found!');
    }
}

inspect().catch(console.error);
