const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkAll() {
    const doc = await db.doc('languages/japanese/levels/b1/modules/jp_b1_m1').get();
    const data = doc.data();
    const items = data.vocabularyItems || [];

    console.log(`Total items: ${items.length}`);
    const keySet = new Set();
    items.forEach(item => {
        Object.keys(item).forEach(k => keySet.add(k));
    });
    console.log(`All keys found across all items: ${Array.from(keySet).join(', ')}`);

    if (items.length > 0) {
        console.log('Sample item:', JSON.stringify(items[0], null, 2));
    }
}

checkAll().catch(console.error);
