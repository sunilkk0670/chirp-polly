import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account
const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

console.log('\n📤 UPLOADING KOREAN B1 MODULES 04-05\n');
console.log('═══════════════════════════════════════════════════════════════\n');

async function uploadModules04And05() {
    try {
        // Load modules 04 and 05
        const module04 = JSON.parse(
            readFileSync(join(__dirname, '../firestore_data/korean_b1_m04.json'), 'utf8')
        );
        const module05 = JSON.parse(
            readFileSync(join(__dirname, '../firestore_data/korean_b1_m05.json'), 'utf8')
        );

        console.log(`✅ Loaded ${module04.moduleId}: ${module04.theme}`);
        console.log(`✅ Loaded ${module05.moduleId}: ${module05.theme}\n`);

        console.log('📚 Uploading modules to Firestore...\n');

        // Upload Module 04
        await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .collection('modules')
            .doc(module04.moduleId)
            .set(module04);

        console.log(`  ✓ Uploaded ${module04.moduleId}: ${module04.theme} (${module04.lessons.length} words)`);

        // Upload Module 05
        await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .collection('modules')
            .doc(module05.moduleId)
            .set(module05);

        console.log(`  ✓ Uploaded ${module05.moduleId}: ${module05.theme} (${module05.lessons.length} words)`);

        console.log('\n✅ Modules 04-05 uploaded successfully!\n');

        // Update B1 level metadata
        console.log('📝 Updating B1 level metadata...\n');

        await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .update({
                totalModules: 5,
                status: 'In Progress'
            });

        console.log('✅ B1 metadata updated: totalModules = 5\n');

        // Verify upload
        console.log('🔍 VERIFICATION\n');
        console.log('═══════════════════════════════════════════════════════════════\n');

        const modulesSnapshot = await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .collection('modules')
            .orderBy('order')
            .get();

        console.log(`Total modules in Firestore: ${modulesSnapshot.size}\n`);

        modulesSnapshot.docs.forEach(doc => {
            const data = doc.data();
            console.log(`  ${data.order}. ${data.moduleId}: ${data.theme}`);
            console.log(`     - Words: ${data.lessons.length}`);
            console.log(`     - Liar Game: ${data.liarGameData.trap.substring(0, 40)}...`);
        });

        // Verify B1 level document
        const b1Level = await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .get();

        const b1Data = b1Level.data();
        console.log(`\n📊 B1 Level Status:`);
        console.log(`   - Total Modules: ${b1Data.totalModules}`);
        console.log(`   - Status: ${b1Data.status}`);
        console.log(`   - Description: ${b1Data.description}`);

        console.log('\n═══════════════════════════════════════════════════════════════');
        console.log('✅ UPLOAD COMPLETE - MODULES 04-05 ARE NOW LIVE!');
        console.log('═══════════════════════════════════════════════════════════════');
        console.log('\n📈 Progress: 5/10 modules (500/1,000 words - 50% complete)\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadModules04And05();
