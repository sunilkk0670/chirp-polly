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

console.log('\n📤 UPLOADING KOREAN B1 MODULES 01-03\n');
console.log('═══════════════════════════════════════════════════════════════\n');

async function uploadB1Modules() {
    try {
        // Load the three modules
        const modules = [];
        for (let i = 1; i <= 3; i++) {
            const moduleNum = i.toString().padStart(2, '0');
            const modulePath = join(__dirname, `../firestore_data/korean_b1_m${moduleNum}.json`);
            const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));
            modules.push(moduleData);
            console.log(`✅ Loaded ${moduleData.moduleId}: ${moduleData.theme}`);
        }

        console.log('\n📚 Uploading modules to Firestore...\n');

        // Upload each module
        for (const module of modules) {
            await db.collection('languages')
                .doc('korean')
                .collection('levels')
                .doc('b1')
                .collection('modules')
                .doc(module.moduleId)
                .set(module);

            console.log(`  ✓ Uploaded ${module.moduleId}: ${module.theme} (${module.lessons.length} words)`);
        }

        console.log('\n✅ All modules uploaded successfully!\n');

        // Update B1 level metadata
        console.log('📝 Updating B1 level metadata...\n');

        await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .update({
                totalModules: 3,
                status: 'In Progress'
            });

        console.log('✅ B1 metadata updated: totalModules = 3\n');

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
            console.log(`     - Liar Game: ${data.liarGameData.trap.substring(0, 30)}...`);
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
        console.log('✅ UPLOAD COMPLETE - B1 MODULES ARE NOW LIVE!');
        console.log('═══════════════════════════════════════════════════════════════\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadB1Modules();
