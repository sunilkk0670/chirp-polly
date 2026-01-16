/**
 * Verify Spanish B1 Modules in Firestore
 * Lists all module IDs to confirm correct upload
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function verifySpanishB1() {
    console.log('\n' + '='.repeat(80));
    console.log('VERIFYING SPANISH B1 MODULES IN FIRESTORE');
    console.log('='.repeat(80) + '\n');

    const modulesRef = db.collection('languages')
        .doc('spanish')
        .collection('levels')
        .doc('b1')
        .collection('modules');

    const snapshot = await modulesRef.get();

    console.log(`Total modules found: ${snapshot.size}\n`);
    console.log('Module IDs:');
    console.log('-'.repeat(40));

    const moduleIds = [];
    snapshot.forEach(doc => {
        moduleIds.push(doc.id);
        const data = doc.data();
        console.log(`✓ ${doc.id} - ${data.theme || 'No theme'} (${data.vocabulary?.length || 0} words)`);
    });

    moduleIds.sort();

    console.log('\n' + '-'.repeat(40));
    console.log('Sorted IDs:');
    moduleIds.forEach(id => console.log(`  ${id}`));

    console.log('\n' + '='.repeat(80));
    console.log('VERIFICATION COMPLETE');
    console.log('='.repeat(80) + '\n');

    process.exit(0);
}

verifySpanishB1().catch(error => {
    console.error('❌ Verification failed:', error);
    process.exit(1);
});
