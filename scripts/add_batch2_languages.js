const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function addBatch2Languages() {
    try {
        console.log('Adding Batch 2 languages to Firestore...\n');

        // Add Korean
        await db.collection('languages').doc('korean').set({
            name: 'Korean',
            nativeName: '한국어',
            flag: '🇰🇷',
            enabled: true,
            order: 4
        });
        console.log('✓ Added Korean');

        // Add Chinese
        await db.collection('languages').doc('chinese').set({
            name: 'Chinese',
            nativeName: '中文',
            flag: '🇨🇳',
            enabled: true,
            order: 5
        });
        console.log('✓ Added Chinese');

        // Add Sanskrit
        await db.collection('languages').doc('sanskrit').set({
            name: 'Sanskrit',
            nativeName: 'संस्कृतम्',
            flag: '🕉️',
            enabled: true,
            order: 6
        });
        console.log('✓ Added Sanskrit');

        // Add A1 level metadata for each language
        const languages = ['korean', 'chinese', 'sanskrit'];
        for (const lang of languages) {
            await db.collection('languages').doc(lang)
                .collection('levels').doc('a1').set({
                    name: 'A1',
                    description: 'Beginner - Basic phrases and vocabulary',
                    order: 1
                });
        }
        console.log('\n✓ Added A1 level metadata for all three languages');

        console.log('\n✅ Batch 2 languages added successfully!');
        console.log('Korean, Chinese, and Sanskrit should now be visible on the home page.');

    } catch (error) {
        console.error('Error adding languages:', error);
    }
}

addBatch2Languages();
