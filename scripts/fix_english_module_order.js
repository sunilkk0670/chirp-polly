const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function fixEnglishModule() {
    try {
        console.log('Adding "order" field to English A1 Module 1...\n');

        await db.collection('languages').doc('english')
            .collection('levels').doc('a1')
            .collection('modules').doc('en_a1_m01')
            .update({
                order: 1
            });

        console.log('✅ Successfully added order: 1 to en_a1_m01');
        console.log('\nThe module should now appear in the app!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

fixEnglishModule();
