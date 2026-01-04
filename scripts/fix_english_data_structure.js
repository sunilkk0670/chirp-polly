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

async function fixEnglishDataStructure() {
    try {
        console.log('Fixing English A1 Module 1 data structure...\n');

        // Read the current data
        const filePath = path.join(__dirname, '../firestore_data/en_a1_m01.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Transform vocabularyItems to match app's expected format
        const transformedItems = data.vocabularyItems.map(item => ({
            word: item.word,                    // Keep as 'word' (maps to target_text)
            phonetic: item.phonetic,            // Keep as 'phonetic' (maps to phonetic_transcription)
            english: item.usage,                // Map 'usage' to 'english' (what app expects)
            example_sentence: item.usage        // Also keep as example_sentence for completeness
        }));

        // Update the data
        data.vocabularyItems = transformedItems;
        data.order = 1;  // Ensure order field is present

        // Upload to Firestore
        await db.collection('languages').doc('english')
            .collection('levels').doc('a1')
            .collection('modules').doc(data.moduleId)
            .set(data);

        console.log('✅ Successfully updated en_a1_m01 with correct field mapping');
        console.log(`   - Transformed ${transformedItems.length} vocabulary items`);
        console.log('   - word → target_text');
        console.log('   - phonetic → phonetic_transcription');
        console.log('   - usage → english (example sentence)');
        console.log('\nThe module should now display correctly in the app!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

fixEnglishDataStructure();
