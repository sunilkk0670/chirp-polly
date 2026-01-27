const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function listChineseModules() {
    try {
        console.log('🔍 Listing Chinese A1 modules in Firestore...');
        const snapshot = await db.collection('languages/chinese/levels/a1/modules').get();

        console.log(`Found ${snapshot.docs.length} documents:`);
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            console.log(`- ID: ${doc.id}, Theme: ${data.theme}, ModuleID: ${data.module_id || data.moduleId}, Lessons: ${data.lessons?.length}`);
        });

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        process.exit(0);
    }
}

listChineseModules();
