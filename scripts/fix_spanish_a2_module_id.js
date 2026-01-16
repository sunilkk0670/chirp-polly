/**
 * Fix Spanish A2 Module ID
 * Delete incorrect 'm01' and re-upload as 'es_a2_m01'
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function fixModuleId() {
    try {
        console.log('🔧 Fixing Spanish A2 module ID...\n');

        const modulesRef = db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a2')
            .collection('modules');

        // Delete the incorrect 'm01'
        console.log('🗑️  Deleting incorrect module ID: m01');
        await modulesRef.doc('m01').delete();
        console.log('✅ Deleted m01\n');

        console.log('✅ Ready to re-upload with correct ID: es_a2_m01\n');
        console.log('📍 Run: node upload_spanish_a2_m01.js\n');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

fixModuleId();
