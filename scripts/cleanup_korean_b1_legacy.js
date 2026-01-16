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

async function cleanupKoreanB1Legacy() {
    try {
        console.log('\n🧹 Starting Cleanup of Legacy Korean B1 Modules...\n');

        const modulesRef = db
            .collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .collection('modules');

        const snapshot = await modulesRef.get();

        if (snapshot.empty) {
            console.log('No modules found to cleanup.');
            process.exit(0);
        }

        console.log(`📊 Found ${snapshot.size} total modules in Korean B1\n`);

        let deleteCount = 0;
        const validPrefix = 'ko_b1_';

        for (const doc of snapshot.docs) {
            const id = doc.id;
            // Delete ALL modules (including old kr_b1_* and random IDs)
            // We only want to keep modules with 'ko_b1_' prefix (which don't exist yet)
            if (!id.startsWith(validPrefix)) {
                console.log(`🗑️  Deleting legacy module: ${id}`);
                await doc.ref.delete();
                deleteCount++;
            } else {
                console.log(`✅ Keeping active module: ${id}`);
            }
        }

        console.log(`\n✨ Cleanup complete! Deleted ${deleteCount} legacy module(s).`);

        // Verify cleanup
        const verifySnapshot = await modulesRef.get();
        console.log(`\n📋 Remaining modules: ${verifySnapshot.size}`);

        if (verifySnapshot.size > 0) {
            console.log('\nRemaining module IDs:');
            verifySnapshot.docs.forEach(doc => {
                console.log(`  - ${doc.id}`);
            });
        } else {
            console.log('\n🎉 Korean B1 modules collection is now clean and ready for new modules!');
        }

        // Update B1 level metadata to reset
        await db.collection('languages')
            .doc('korean')
            .collection('levels')
            .doc('b1')
            .set({
                id: 'b1',
                name: 'B1',
                description: 'Intermediate - Everyday situations',
                order: 3,
                totalModules: 0,
                status: 'In Progress'
            }, { merge: true });

        console.log('\n✅ Korean B1 level metadata reset to 0 modules');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        process.exit(1);
    }
}

cleanupKoreanB1Legacy();
