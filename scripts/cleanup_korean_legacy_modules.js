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

async function cleanupLegacyModules() {
    try {
        console.log('\n🧹 Starting Cleanup of Legacy Korean A1 Modules...\n');

        const modulesRef = db
            .collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('a1')
            .collection('modules');

        const snapshot = await modulesRef.get();

        if (snapshot.empty) {
            console.log('No modules found to cleanup.');
            process.exit(0);
        }

        let deleteCount = 0;
        const validPrefix = 'ko_a1_';

        for (const doc of snapshot.docs) {
            const id = doc.id;
            // Delete if ID does not start with 'ko_a1_'
            if (!id.startsWith(validPrefix)) {
                console.log(`🗑️ Deleting legacy module: ${id}`);
                await doc.ref.delete();
                deleteCount++;
            } else {
                console.log(`✅ Keeping active module: ${id}`);
            }
        }

        console.log(`\n✨ Cleanup complete! Deleted ${deleteCount} legacy document(s).`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
}

cleanupLegacyModules();
