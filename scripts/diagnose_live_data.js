const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function diagnose() {
    console.log("=== LIVE FIRESTORE DIAGNOSIS ===\n");

    const doc = await db.collection('modules').doc('sanskrit_a1_m1').get();

    if (!doc.exists) {
        console.log("ERROR: Document does not exist!");
        return;
    }

    const data = doc.data();
    const items = data.vocabularyItems || [];

    console.log(`Total items in sanskrit_a1_m1: ${items.length}\n`);

    console.log("First 10 words:");
    items.slice(0, 10).forEach((item, idx) => {
        console.log(`  ${idx + 1}: ${item.word} - ${item.meaning}`);
    });

    console.log("\nWords 80-100:");
    items.slice(79, 100).forEach((item, idx) => {
        console.log(`  ${idx + 80}: ${item.word} - ${item.meaning}`);
    });

    // Check for duplicates
    const wordSet = new Set();
    const duplicates = [];
    items.forEach((item, idx) => {
        if (wordSet.has(item.word)) {
            duplicates.push(`Word "${item.word}" appears at multiple positions`);
        }
        wordSet.add(item.word);
    });

    console.log(`\n=== UNIQUENESS CHECK ===`);
    console.log(`Total Unique Words: ${wordSet.size} / ${items.length}`);

    if (duplicates.length > 0) {
        console.log(`\nDUPLICATES FOUND:`);
        duplicates.forEach(d => console.log(`  - ${d}`));
    } else {
        console.log(`No duplicates found.`);
    }
}

diagnose().catch(console.error);
