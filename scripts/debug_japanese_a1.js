const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function debugJapaneseA1() {
    console.log('\n🔍 Debugging Japanese A1 Data...\n');

    const modulesSnapshot = await db
        .collection('languages')
        .doc('japanese')
        .collection('levels')
        .doc('a1')
        .collection('modules')
        .limit(1)
        .get();

    if (modulesSnapshot.empty) {
        console.log('❌ No Japanese A1 modules found!');
        return;
    }

    const firstModule = modulesSnapshot.docs[0];
    const data = firstModule.data();

    console.log('📦 First Module Data:');
    console.log('Module ID:', firstModule.id);
    console.log('Theme:', data.theme);
    console.log('\n📚 Lessons structure:');

    if (data.lessons && Array.isArray(data.lessons)) {
        console.log(`Found ${data.lessons.length} lessons`);
        console.log('\nFirst lesson:');
        console.log(JSON.stringify(data.lessons[0], null, 2));
    } else if (data.vocabularyItems && Array.isArray(data.vocabularyItems)) {
        console.log(`Found ${data.vocabularyItems.length} vocabularyItems`);
        console.log('\nFirst vocabularyItem:');
        console.log(JSON.stringify(data.vocabularyItems[0], null, 2));
    } else {
        console.log('⚠️ No lessons or vocabularyItems found!');
        console.log('Available fields:', Object.keys(data));
    }

    console.log('\n✅ Debug complete\n');
    process.exit(0);
}

debugJapaneseA1().catch(console.error);
