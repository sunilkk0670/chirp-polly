import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function cleanupAuditedIds() {
    try {
        console.log('\n🔍 Checking for _audited_100 IDs in Firestore...\n');

        const modulesRef = db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules');

        const snapshot = await modulesRef.get();

        const auditedDocs = [];
        snapshot.forEach(doc => {
            if (doc.id.includes('_audited_100')) {
                auditedDocs.push(doc.id);
            }
        });

        if (auditedDocs.length === 0) {
            console.log('✅ No _audited_100 IDs found. Database is clean!\n');
        } else {
            console.log(`Found ${auditedDocs.length} documents with _audited_100 suffix:\n`);
            auditedDocs.forEach(id => console.log(`  - ${id}`));

            console.log('\n🗑️  Deleting old IDs...\n');

            for (const docId of auditedDocs) {
                await modulesRef.doc(docId).delete();
                console.log(`  ✓ Deleted: ${docId}`);
            }

            console.log('\n✅ Cleanup complete!\n');
        }

        // List all current modules
        const currentSnapshot = await modulesRef.orderBy('order').get();
        console.log('📋 Current Spanish A1 Modules:\n');
        currentSnapshot.forEach(doc => {
            const data = doc.data();
            console.log(`  ${data.order}. ${doc.id} - ${data.theme} (${data.vocabulary?.length || 0} words)`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

cleanupAuditedIds();
