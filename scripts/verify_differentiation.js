const admin = require('firebase-admin');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function verify() {
    console.log('🔍 Level Differentiation Verification...');

    const checks = [
        { path: 'languages/french/levels/a1/modules/fr_a1_m1', expected: 'Bonjour' },
        { path: 'languages/french/levels/a2/modules/fr_a2_m1', expected: 'J’ai mangé' },
        { path: 'languages/french/levels/b1/modules/fr_b1_m1', expected: 'Il faut que' },
        { path: 'languages/german/levels/a1/modules/de_a1_m1', expected: 'Guten Tag' },
        { path: 'languages/german/levels/a2/modules/de_a2_m1', expected: 'Ich habe gegessen' },
        { path: 'languages/german/levels/b1/modules/de_b1_m1', expected: 'Konjunktiv II' }
    ];

    for (const check of checks) {
        const snap = await db.doc(check.path).get();
        if (!snap.exists) {
            console.error(`❌ Missing: ${check.path}`);
            continue;
        }

        const data = snap.data();
        const firstWord = data.vocabularyItems[0].word;
        if (firstWord === check.expected) {
            console.log(`✅ ${check.path}: Correctly differentiated ("${firstWord}")`);
        } else {
            console.error(`❌ ${check.path}: Expected "${check.expected}", found "${firstWord}"`);
        }
    }
}

verify();
