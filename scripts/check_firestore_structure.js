/**
 * Check Firestore Structure for Spanish
 * Diagnose the path issue
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkStructure() {
    console.log('\n' + '='.repeat(80));
    console.log('CHECKING FIRESTORE STRUCTURE');
    console.log('='.repeat(80) + '\n');

    // Check curriculum collection
    console.log('1. Checking curriculum collection...');
    const curriculumSnapshot = await db.collection('curriculum').get();
    console.log(`   Found ${curriculumSnapshot.size} documents`);
    curriculumSnapshot.forEach(doc => {
        console.log(`   - ${doc.id}`);
    });

    // Check es document
    console.log('\n2. Checking es document...');
    const esDoc = await db.collection('curriculum').doc('es').get();
    if (esDoc.exists) {
        console.log('   ✓ es document exists');
        console.log('   Data:', JSON.stringify(esDoc.data(), null, 2));
    } else {
        console.log('   ✗ es document does NOT exist');
    }

    // Check levels subcollection
    console.log('\n3. Checking levels subcollection...');
    const levelsSnapshot = await db.collection('curriculum').doc('es').collection('levels').get();
    console.log(`   Found ${levelsSnapshot.size} levels`);
    levelsSnapshot.forEach(doc => {
        console.log(`   - ${doc.id}:`, doc.data());
    });

    // Check B1 modules
    console.log('\n4. Checking B1 modules...');
    const modulesSnapshot = await db.collection('curriculum').doc('es').collection('levels').doc('B1').collection('modules').get();
    console.log(`   Found ${modulesSnapshot.size} modules`);
    modulesSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`   - ${doc.id}: ${data.theme} (${data.vocabulary?.length || 0} words)`);
    });

    // Check if there's an alternative path
    console.log('\n5. Checking alternative paths...');
    const altSnapshot = await db.collection('curriculum').doc('es').collection('modules').get();
    console.log(`   curriculum/es/modules: ${altSnapshot.size} documents`);

    console.log('\n' + '='.repeat(80));
    console.log('STRUCTURE CHECK COMPLETE');
    console.log('='.repeat(80) + '\n');

    process.exit(0);
}

checkStructure().catch(error => {
    console.error('❌ Check failed:', error);
    process.exit(1);
});
