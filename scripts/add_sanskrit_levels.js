const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function addSanskritLevels() {
    try {
        console.log('Adding A2 and B1 levels for Sanskrit...\n');

        // Add A2 level
        await db.collection('languages').doc('sanskrit')
            .collection('levels').doc('a2').set({
                name: 'A2',
                description: 'Elementary - Simple conversations',
                order: 2
            });
        console.log('✓ Added A2 level for Sanskrit');

        // Add B1 level
        await db.collection('languages').doc('sanskrit')
            .collection('levels').doc('b1').set({
                name: 'B1',
                description: 'Intermediate - Everyday situations',
                order: 3
            });
        console.log('✓ Added B1 level for Sanskrit');

        console.log('\n✅ Sanskrit A2 and B1 levels added successfully!');
        console.log('Sanskrit should now show all three levels: A1, A2, B1');

    } catch (error) {
        console.error('Error adding levels:', error);
    }
}

addSanskritLevels();
