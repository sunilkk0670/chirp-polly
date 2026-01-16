/**
 * Fix Spanish Language Document
 * Add proper metadata to the es document
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function fixSpanishDocument() {
    console.log('\n' + '='.repeat(80));
    console.log('FIXING SPANISH LANGUAGE DOCUMENT');
    console.log('='.repeat(80) + '\n');

    // Set the es document with proper metadata
    const esRef = db.collection('curriculum').doc('es');

    await esRef.set({
        languageCode: 'es',
        languageName: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸',
        order: 2,
        status: 'active'
    }, { merge: true });

    console.log('✅ Spanish language document updated\n');

    // Verify
    const esDoc = await esRef.get();
    console.log('Document data:', JSON.stringify(esDoc.data(), null, 2));

    console.log('\n' + '='.repeat(80));
    console.log('FIX COMPLETE');
    console.log('='.repeat(80) + '\n');

    process.exit(0);
}

fixSpanishDocument().catch(error => {
    console.error('❌ Fix failed:', error);
    process.exit(1);
});
