const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function verifyLiarGame() {
    const modules = ['zh_a1_m01', 'zh_a1_m02', 'zh_a1_m03', 'zh_a1_m04', 'zh_a1_m05', 'zh_a1_m06'];

    console.log('\n🔍 Verifying Liar Game Rich Metadata in Firestore...\n');

    for (const id of modules) {
        const doc = await db.doc(`languages/chinese/levels/a1/modules/${id}`).get();
        if (doc.exists) {
            const data = doc.data();
            console.log(`📦 ${id}:`);
            console.log(`   Theme: ${data.theme}`);
            console.log(`   Liar Game Data: ${data.liar_game_data ? '✅ Present' : '❌ MISSING'}`);
            if (data.liar_game_data) {
                console.log(`   - Topic: ${data.liar_game_data.topic}`);
                console.log(`   - Question: ${data.liar_game_data.question}`);
            }

            // Check traps in lesson 10
            const lesson10 = data.lessons[9];
            const traps = lesson10.vocabulary.slice(4, 7);
            console.log(`   - Traps at Pos 95-97:`);
            traps.forEach((t, i) => {
                console.log(`     ${95 + i}. ${t.word}: ${t.explanation ? '✅ Has Explanation' : '❌ Missing Explanation'}`);
            });
            console.log('');
        } else {
            console.log(`❌ ${id}: DOCUMENT MISSING\n`);
        }
    }
    process.exit(0);
}

verifyLiarGame();
