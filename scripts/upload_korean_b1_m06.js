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

console.log('\n📤 UPLOADING KOREAN B1 MODULE 06\n');
console.log('═══════════════════════════════════════════════════════════════\n');

async function uploadModule06() {
    try {
        const moduleFile = '../firestore_data/korean_b1_m06.json';
        const module06 = JSON.parse(
            readFileSync(join(__dirname, moduleFile), 'utf8')
        );

        console.log(`✅ Loaded ${module06.moduleId}: ${module06.theme}`);

        console.log('📚 Uploading module to Firestore...\n');

        // Upload Module 06
        await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .collection('modules')
            .doc(module06.moduleId)
            .set(module06);

        console.log(`  ✓ Uploaded ${module06.moduleId}: ${module06.theme} (${module06.lessons.length} words)`);

        // Update B1 level metadata
        console.log('\n📝 Updating B1 level metadata...\n');

        await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .update({
                totalModules: 6,
                status: 'In Progress'
            });

        console.log('✅ B1 metadata updated: totalModules = 6\n');

        // Verify summary
        const snapshot = await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .collection('modules')
            .get();

        console.log(`📊 Current B1 Module Count in Firestore: ${snapshot.size}`);
        console.log('═══════════════════════════════════════════════════════════════');
        console.log('✅ UPLOAD COMPLETE - MODULE 06 IS NOW LIVE!');
        console.log('═══════════════════════════════════════════════════════════════\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadModule06();
