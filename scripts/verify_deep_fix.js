const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function verifyFix() {
    console.log('🧐 Final Verification for Chinese Curriculum...');

    // 1. Check levels
    const levelsRef = db.collection('languages/chinese/levels');
    const levelsSnapshot = await levelsRef.get();
    const levels = levelsSnapshot.docs.map(doc => doc.id);
    console.log(`\n📂 Current Levels in Firestore: [${levels.join(', ')}]`);

    const hasUppercase = levels.some(l => l === 'A1' || l === 'A2');
    if (hasUppercase) {
        console.log('   ❌ ERROR: Uppercase levels A1/A2 still exist!');
    } else {
        console.log('   ✅ Level consolidation SUCCESS: No uppercase levels found.');
    }

    // 2. Check Specific Modules for A1 and A2
    const checks = [
        { path: 'languages/chinese/levels/a1/modules/zh_a1_m03', expected: 'Daily Life' },
        { path: 'languages/chinese/levels/a1/modules/zh_a1_m04', expected: 'Free Time & Places' },
        { path: 'languages/chinese/levels/a1/modules/zh_a1_m05', expected: 'Home & Shopping' },
        { path: 'languages/chinese/levels/a2/modules/zh_a2_m01', expected: 'Social Relationships' }
    ];

    console.log('\n🔍 Theme Verification:');
    for (const check of checks) {
        const doc = await db.doc(check.path).get();
        if (doc.exists) {
            const actual = doc.data().theme;
            if (actual === check.expected) {
                console.log(`   ✅ ${check.path.split('/').pop()}: "${actual}" (Correct)`);
            } else {
                console.log(`   ❌ ${check.path.split('/').pop()}: "${actual}" (WRONG! Expected "${check.expected}")`);
            }
        } else {
            console.log(`   ⚠️  ${check.path.split('/').pop()} DOES NOT EXIST at ${check.path}`);
        }
    }

    process.exit(0);
}

verifyFix();
