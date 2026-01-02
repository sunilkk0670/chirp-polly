const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function uploadEnglishA1() {
    try {
        console.log('--- Uploading English A1 Module 1 ---\n');

        // 1. Create/Update English language document
        console.log('Creating English language document...');
        await db.collection('languages').doc('english').set({
            languageId: 'english',
            name: 'English',
            nativeScript: 'English',
            flag: '🇬🇧',
            enabled: true,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log('✅ English language document created.\n');

        // 2. Create A1 level metadata
        console.log('Creating A1 level metadata...');
        await db.collection('languages').doc('english')
            .collection('levels').doc('a1')
            .set({
                levelId: 'a1',
                name: 'A1',
                description: 'Beginner (CEFR A1)',
                moduleCount: 10,
                status: 'In Progress',
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        console.log('✅ A1 level metadata created.\n');

        // 3. Upload Module 1
        const filePath = path.join(__dirname, '../firestore_data/en_a1_m01.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        console.log(`Uploading: ${data.moduleId} (${data.theme})`);
        await db.collection('languages').doc('english')
            .collection('levels').doc('a1')
            .collection('modules').doc(data.moduleId)
            .set(data);

        console.log('✅ Module 1 uploaded successfully!\n');
        console.log('--------------------------------------------');
        console.log('English A1 Module 1 is now live!');
        console.log('Visit your app to see it in the language selector.');
        console.log('--------------------------------------------');
        process.exit(0);

    } catch (error) {
        console.error('❌ Upload failed:', error);
        process.exit(1);
    }
}

uploadEnglishA1();
