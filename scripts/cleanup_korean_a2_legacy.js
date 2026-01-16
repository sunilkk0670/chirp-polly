import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function cleanupLegacyKoreanA2() {
    console.log('🧹 Starting cleanup of legacy Korean A2 modules...\n');

    try {
        // Path: languages/korean/levels/a2/modules
        const modulesRef = db.collection('languages').doc('korean')
            .collection('levels').doc('a2')
            .collection('modules');

        const snapshot = await modulesRef.get();

        if (snapshot.empty) {
            console.log('✅ No modules found. Collection is already clean.');
            process.exit(0);
            return;
        }

        console.log(`Found ${snapshot.docs.length} modules to delete:\n`);

        const batch = db.batch();
        let count = 0;

        snapshot.docs.forEach(doc => {
            console.log(`  - Deleting: ${doc.id}`);
            batch.delete(doc.ref);
            count++;
        });

        await batch.commit();

        console.log(`\n✅ Successfully deleted ${count} legacy Korean A2 modules.`);
        console.log('✅ Ready for fresh A2 generation!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
}

cleanupLegacyKoreanA2();
