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

async function verifyAndFixOrder() {
    try {
        console.log('\n🔍 Checking order fields for all modules...\n');

        const modulesRef = db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules');

        const snapshot = await modulesRef.get();

        const updates = [];

        for (const doc of snapshot.docs) {
            const data = doc.data();
            const expectedOrder = parseInt(doc.id.replace('es_a1_m', '').replace('0', ''));

            if (data.order !== expectedOrder) {
                console.log(`⚠️  ${doc.id}: order is ${data.order}, should be ${expectedOrder}`);
                updates.push({
                    id: doc.id,
                    currentOrder: data.order,
                    newOrder: expectedOrder
                });
            } else {
                console.log(`✅ ${doc.id}: order = ${data.order} (correct)`);
            }
        }

        if (updates.length > 0) {
            console.log(`\n🔧 Fixing ${updates.length} modules...\n`);

            for (const update of updates) {
                await modulesRef.doc(update.id).update({ order: update.newOrder });
                console.log(`  ✓ Updated ${update.id}: ${update.currentOrder} → ${update.newOrder}`);
            }

            console.log('\n✅ All order fields fixed!\n');
        } else {
            console.log('\n✅ All order fields are correct!\n');
        }

        // Final verification
        console.log('📋 Final module list (ordered):\n');
        const orderedSnapshot = await modulesRef.orderBy('order').get();
        orderedSnapshot.forEach(doc => {
            const data = doc.data();
            console.log(`  ${data.order}. ${doc.id} - ${data.theme}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

verifyAndFixOrder();
