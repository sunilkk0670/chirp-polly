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

async function deleteOldItalianModules() {
    console.log('🗑️  Deleting old Italian A1 modules (italian_a1_m1 to m5)...\n');

    try {
        const oldModuleIds = [
            'italian_a1_m1',
            'italian_a1_m2',
            'italian_a1_m3',
            'italian_a1_m4',
            'italian_a1_m5'
        ];

        for (const moduleId of oldModuleIds) {
            const moduleRef = db.collection('languages').doc('italian')
                .collection('levels').doc('a1')
                .collection('modules').doc(moduleId);

            // Check if module exists
            const doc = await moduleRef.get();

            if (doc.exists) {
                await moduleRef.delete();
                console.log(`✅ Deleted: ${moduleId}`);
            } else {
                console.log(`⚠️  Not found: ${moduleId} (already deleted or never existed)`);
            }
        }

        console.log('\n✅ Cleanup complete!');
        console.log('📝 Current modules: ita_a1_m01, ita_a1_m02, ita_a1_m03\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during deletion:', error);
        process.exit(1);
    }
}

deleteOldItalianModules();
