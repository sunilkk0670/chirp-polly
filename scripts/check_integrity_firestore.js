const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkIntegrity() {
    console.log("Checking Live Firestore Integrity for Sanskrit A1...");

    const snapshot = await db.collection('modules')
        .where('moduleId', '>=', 'sanskrit_a1')
        .where('moduleId', '<=', 'sanskrit_a1\uf8ff')
        .get();

    if (snapshot.empty) {
        console.error("No Sanskrit A1 modules found in Firestore!");
        return;
    }

    let totalErrors = 0;
    let totalWords = 0;
    const allWords = new Set();

    snapshot.forEach(doc => {
        const data = doc.data();
        const items = data.vocabularyItems || [];
        const modId = doc.id;

        console.log(`Checking ${modId}... (${items.length} items)`);

        if (items.length !== 100) {
            console.error(`[FAIL] ${modId} has ${items.length} items (Expected 100)`);
            totalErrors++;
        }

        // Check Repetition (1 vs 9, 0 vs 8)
        if (items.length > 10) {
            if (items[1].word === items[9].word) {
                console.error(`[FAIL] ${modId}: Index 1 matches Index 9 ('${items[1].word}')`);
                totalErrors++;
            }
            if (items[0].word === items[8].word) {
                console.error(`[FAIL] ${modId}: Index 0 matches Index 8 ('${items[0].word}')`);
                totalErrors++;
            }
        }

        // Check Internal Uniqueness
        const modWords = new Set();
        items.forEach((item, idx) => {
            if (modWords.has(item.word)) {
                console.error(`[FAIL] ${modId}: Duplicate word '${item.word}' at index ${idx}`);
                totalErrors++;
            }
            modWords.add(item.word);
            allWords.add(item.word); // For global uniqueness check if required (though user said "1000 unique words", usually across the level)
        });

        totalWords += items.length;
    });

    console.log("---------------------------------------------------");
    console.log(`Total Modules Checked: ${snapshot.size}`);
    console.log(`Total Words: ${totalWords}`);
    console.log(`Total Unique Words (Global): ${allWords.size}`);
    console.log(`Integrity Errors: ${totalErrors}`);

    if (totalErrors === 0 && totalWords === 1000) {
        console.log("VERDICT: PASS (Perfect Integrity)");
    } else {
        console.log("VERDICT: FAIL");
    }
}

checkIntegrity().catch(console.error);
