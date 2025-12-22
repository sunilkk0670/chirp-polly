// Verify Firestore data upload
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function verifyData() {
    console.log('🔍 Verifying Firestore data...\n');

    try {
        // Get all languages
        const languagesSnapshot = await db.collection('languages').get();

        console.log(`📚 Found ${languagesSnapshot.size} languages:\n`);

        for (const doc of languagesSnapshot.docs) {
            const data = doc.data();
            const status = data.enabled ? '✅ ENABLED' : '⚪ DISABLED';
            console.log(`${data.flag} ${data.name} (${data.code}) - ${status}`);

            // Get levels for this language
            const levelsSnapshot = await db.collection('languages')
                .doc(doc.id)
                .collection('levels')
                .orderBy('order')
                .get();

            console.log(`   └─ ${levelsSnapshot.size} levels: ${levelsSnapshot.docs.map(l => l.data().name).join(', ')}`);
        }

        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ VERIFICATION COMPLETE!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`\n🌐 View in Firestore Console:`);
        console.log(`https://console.firebase.google.com/project/my-gift-pool/firestore/databases/-default-/data/~2Flanguages\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error verifying data:', error);
        process.exit(1);
    }
}

verifyData();
