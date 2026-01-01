const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function checkKoreanA1() {
    console.log('🔍 Checking Korean A1 "Verbs & Actions" module...\n');

    const snapshot = await db.collection('languages')
        .doc('korean')
        .collection('levels')
        .doc('a1')
        .collection('modules')
        .where('theme', '==', 'Verbs & Actions')
        .get();

    if (snapshot.empty) {
        console.log('❌ Module not found');
        return;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    console.log(`📦 Module ID: ${doc.id}`);
    console.log(`📝 Theme: ${data.theme}`);
    console.log(`📊 Order: ${data.order}\n`);

    console.log('🔑 Top-level keys:', Object.keys(data).join(', '), '\n');

    // Check vocabularyItems
    if (data.vocabularyItems) {
        console.log(`✅ vocabularyItems: ${data.vocabularyItems.length} items`);
        if (data.vocabularyItems.length > 0) {
            console.log('   First item:', JSON.stringify(data.vocabularyItems[0], null, 2));
        }
    } else {
        console.log('❌ No vocabularyItems field');
    }

    console.log('');

    // Check lessons
    if (data.lessons) {
        console.log(`✅ lessons: ${data.lessons.length} items`);
        if (data.lessons.length > 0) {
            const firstLesson = data.lessons[0];
            console.log('   First lesson keys:', Object.keys(firstLesson).join(', '));
            console.log('   First lesson:', JSON.stringify(firstLesson, null, 2));

            // Check if lessons have nested vocabularyItems
            if (firstLesson.vocabularyItems) {
                console.log(`   ⚠️  First lesson has nested vocabularyItems: ${firstLesson.vocabularyItems.length} items`);
            }
        }
    } else {
        console.log('❌ No lessons field');
    }

    console.log('\n📊 Summary:');
    console.log(`   - vocabularyItems count: ${data.vocabularyItems?.length || 0}`);
    console.log(`   - lessons count: ${data.lessons?.length || 0}`);

    // Calculate what the list view sees vs detail view sees
    const listViewCount = (data.vocabularyItems?.length || 0) || (data.lessons?.length || 0);
    console.log(`\n🔍 List view would show: ${listViewCount} words`);
    console.log(`🔍 Detail view would extract and count all nested items`);
}

checkKoreanA1().then(() => process.exit(0));
