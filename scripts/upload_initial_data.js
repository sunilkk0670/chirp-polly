// Upload initial structure to Firestore
// This uploads languages and levels from initial_structure.json

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Read the initial structure data
const dataPath = path.join(__dirname, '../firestore_data/initial_structure.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

async function uploadData() {
    console.log('🚀 Starting Firestore data upload...\n');

    try {
        // Upload Languages
        console.log('📚 Uploading languages...');
        const languagesData = data.languages;
        let languageCount = 0;

        for (const [langId, langData] of Object.entries(languagesData)) {
            await db.collection('languages').doc(langId).set(langData);
            console.log(`  ✅ ${langData.flag} ${langData.name} (${langData.enabled ? 'enabled' : 'disabled'})`);
            languageCount++;
        }

        console.log(`\n✨ Uploaded ${languageCount} languages\n`);

        // Upload Levels for each language
        console.log('📊 Uploading levels...');
        const levelsData = data.levels;
        let levelCount = 0;

        for (const [langId] of Object.entries(languagesData)) {
            for (const [levelId, levelData] of Object.entries(levelsData)) {
                await db.collection('languages')
                    .doc(langId)
                    .collection('levels')
                    .doc(levelId)
                    .set(levelData);
                levelCount++;
            }
            console.log(`  ✅ Added 3 levels to ${languagesData[langId].name}`);
        }

        console.log(`\n✨ Uploaded ${levelCount} total levels (3 per language)\n`);

        // Summary
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ UPLOAD COMPLETE!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`\n📊 Summary:`);
        console.log(`   • ${languageCount} languages uploaded`);
        console.log(`   • ${levelCount} levels uploaded`);
        console.log(`   • 3 enabled languages: Japanese, Hindi, French`);
        console.log(`   • 2 disabled languages: Korean, Chinese`);
        console.log(`\n🌐 Check your Firestore Console:`);
        console.log(`   https://console.firebase.google.com/project/my-gift-pool/firestore`);
        console.log('\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error uploading data:', error);
        process.exit(1);
    }
}

// Run the upload
uploadData();
