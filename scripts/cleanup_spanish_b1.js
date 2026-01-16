/**
 * Cleanup Spanish B1 Modules from Firestore
 * Deletes ALL existing modules to prepare for fresh upload
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function cleanupSpanishB1() {
    console.log('\n' + '='.repeat(80));
    console.log('CLEANING UP SPANISH B1 MODULES FROM FIRESTORE');
    console.log('='.repeat(80) + '\n');

    const modulesRef = db.collection('curriculum')
        .doc('es')
        .collection('levels')
        .doc('B1')
        .collection('modules');

    // Get all existing modules
    const snapshot = await modulesRef.get();

    console.log(`Found ${snapshot.size} modules to delete\n`);

    // Delete each module
    const deletePromises = [];
    snapshot.forEach(doc => {
        console.log(`🗑️  Deleting: ${doc.id}`);
        deletePromises.push(doc.ref.delete());
    });

    await Promise.all(deletePromises);

    console.log('\n✅ All modules deleted\n');
    console.log('='.repeat(80));
    console.log('CLEANUP COMPLETE');
    console.log('='.repeat(80));
    console.log('\nYou can now run upload_spanish_b1.js to upload fresh data\n');

    process.exit(0);
}

cleanupSpanishB1().catch(error => {
    console.error('❌ Cleanup failed:', error);
    process.exit(1);
});
