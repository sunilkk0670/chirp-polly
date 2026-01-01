const admin = require('firebase-admin');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function verify() {
    console.log('🔍 Final Verification Checks...');

    const checks = [
        { path: 'languages/spanish/levels/a1/modules/es_a1_m1', word1: 'Hola' },
        { path: 'languages/japanese/levels/b1/modules/jp_b1_m1', word1: '\u3053\u3093\u306b\u3061\u306f' },
        { path: 'languages/sanskrit/levels/a2/modules/sa_a2_m1', word1: '\u0928\u092e\u0938\u094d\u0924\u0947' },
        { path: 'languages/german/levels/b1/modules/de_b1_m1', word1: 'Guten Tag' }
    ];

    for (const check of checks) {
        const snap = await db.doc(check.path).get();
        if (!snap.exists) {
            console.error(`❌ Missing: ${check.path}`);
            continue;
        }

        const data = snap.data();
        const firstWord = data.vocabularyItems[0].word;
        if (firstWord === check.word1) {
            console.log(`✅ ${check.path}: Matched "${firstWord}"`);
        } else {
            console.error(`❌ ${check.path}: Expected "${check.word1}", found "${firstWord}"`);
        }
    }
}

verify();
