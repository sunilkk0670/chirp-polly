const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function verifyLiarGameData() {
    console.log('🔍 Verifying Liar Game data in Firestore...\n');

    const modulesToCheck = [
        { level: 'a1', id: 'fr_a1_m1' },
        { level: 'a2', id: 'fr_a2_m11' }
    ];

    for (const module of modulesToCheck) {
        const docRef = db.collection('languages').doc('french')
            .collection('levels').doc(module.level)
            .collection('modules').doc(module.id);

        const doc = await docRef.get();

        if (!doc.exists) {
            console.log(`❌ ${module.id}: Document not found`);
            continue;
        }

        const data = doc.data();

        console.log(`\n📦 ${module.id}:`);
        console.log(`   ✅ vocabularyItems: ${data.vocabularyItems ? data.vocabularyItems.length : 'MISSING'} items`);
        console.log(`   ✅ liarGameData: ${data.liarGameData ? 'PRESENT' : 'MISSING'}`);

        if (data.liarGameData && data.liarGameData.culturalTraps) {
            console.log(`   ✅ culturalTraps: ${data.liarGameData.culturalTraps.length} traps`);
            console.log(`\n   Sample trap:`);
            console.log(`   - Trap: "${data.liarGameData.culturalTraps[0].trap}"`);
            console.log(`   - Correct: "${data.liarGameData.culturalTraps[0].correctVersion}"`);
        }
    }

    console.log(`\n✅ Verification complete!`);
}

verifyLiarGameData()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
