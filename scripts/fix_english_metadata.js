/**
 * Fix English Level Metadata
 * Standardizes 'name' and 'description' fields for A1, A2, and B1.
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function fixMetadata() {
    console.log('\n=========================================================');
    console.log('REPAIRING ENGLISH LEVEL METADATA');
    console.log('=========================================================\n');

    const levels = [
        {
            id: 'a1',
            name: 'A1',
            description: 'Beginner (CEFR A1)',
            moduleCount: 10,
            status: 'Complete'
        },
        {
            id: 'a2',
            name: 'A2',
            description: 'Elementary (CEFR A2)',
            moduleCount: 10,
            status: 'Complete'
        },
        {
            id: 'b1',
            name: 'B1',
            description: 'Intermediate (CEFR B1)',
            moduleCount: 10,
            status: 'Complete'
        }
    ];

    for (const level of levels) {
        console.log(`🔧 Updating Level: ${level.id.toUpperCase()}`);

        const docRef = db.collection('languages')
            .doc('english')
            .collection('levels')
            .doc(level.id);

        await docRef.set({
            name: level.name,
            description: level.description,
            moduleCount: level.moduleCount,
            status: level.status,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log(`   ✅ Success: ${level.name} - ${level.description}\n`);
    }

    console.log('=========================================================');
    console.log('✅ METADATA REPAIR COMPLETE');
    console.log('=========================================================\n');

    process.exit(0);
}

fixMetadata().catch(error => {
    console.error('❌ Repair failed:', error);
    process.exit(1);
});
