// Verify Firestore rules and connection
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function testFirestoreAccess() {
    console.log('🔍 Testing Firestore access...\n');

    try {
        // Try to read languages collection
        const languagesSnapshot = await db.collection('languages').get();

        console.log(`✅ Successfully read languages collection`);
        console.log(`📚 Found ${languagesSnapshot.size} languages\n`);

        languagesSnapshot.forEach(doc => {
            const data = doc.data();
            console.log(`${data.flag} ${data.name} - enabled: ${data.enabled}`);
        });

        console.log('\n✅ Firestore connection is working!');
        console.log('\nℹ️  If the Flutter app still shows permission error:');
        console.log('   1. Clear browser cache (Ctrl+Shift+Delete)');
        console.log('   2. Hard refresh (Ctrl+F5)');
        console.log('   3. Wait 1-2 minutes for rules to propagate');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

testFirestoreAccess();
