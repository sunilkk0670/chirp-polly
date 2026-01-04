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

async function uploadEnglishModules() {
    try {
        console.log('--- Uploading English A1 Modules 5-7 ---\n');

        const modules = [
            { id: 'en_a1_m05', order: 5, file: 'en_a1_m05.json' },
            { id: 'en_a1_m06', order: 6, file: 'en_a1_m06.json' },
            { id: 'en_a1_m07', order: 7, file: 'en_a1_m07.json' }
        ];

        for (const module of modules) {
            const filePath = path.join(__dirname, `../firestore_data/${module.file}`);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Transform vocabularyItems to match app's expected format
            data.vocabularyItems = data.vocabularyItems.map(item => ({
                word: item.word,
                phonetic: item.phonetic,
                english: item.english,
                example_sentence: item.english
            }));

            // Add order field
            data.order = module.order;

            console.log(`Uploading: ${data.moduleId} (${data.theme}) - ${data.vocabularyItems.length} words`);

            await db.collection('languages').doc('english')
                .collection('levels').doc('a1')
                .collection('modules').doc(data.moduleId)
                .set(data);

            console.log(`✅ ${module.id} uploaded successfully!\n`);
        }

        // Update A1 level metadata
        console.log('Updating A1 level metadata...');
        await db.collection('languages').doc('english')
            .collection('levels').doc('a1')
            .update({
                moduleCount: 10,  // Keep at 10 (total planned)
                status: 'In Progress',
                lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            });
        console.log('✅ Metadata updated.\n');

        console.log('--------------------------------------------');
        console.log('English A1 Modules 5-7 are now live!');
        console.log('Total modules available: 7 of 10');
        console.log('Total words: 700 unique words');
        console.log('--------------------------------------------');
        process.exit(0);

    } catch (error) {
        console.error('❌ Upload failed:', error);
        process.exit(1);
    }
}

uploadEnglishModules();
