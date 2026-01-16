import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';
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

async function fixFieldNames() {
    try {
        console.log('\n🔧 Fixing field names: "vocabulary" → "vocabularyItems"\n');

        const modulesRef = db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules');

        const snapshot = await modulesRef.get();

        for (const doc of snapshot.docs) {
            const data = doc.data();

            if (data.vocabulary && !data.vocabularyItems) {
                console.log(`  Fixing ${doc.id}...`);

                // Rename the field
                await modulesRef.doc(doc.id).update({
                    vocabularyItems: data.vocabulary,
                    vocabulary: admin.firestore.FieldValue.delete()
                });

                // Update local mirror
                const localPath = join(__dirname, `../assets/data/curriculum/es_a1/${doc.id}.json`);
                const updatedData = {
                    ...data,
                    vocabularyItems: data.vocabulary
                };
                delete updatedData.vocabulary;
                writeFileSync(localPath, JSON.stringify(updatedData, null, 2));

                console.log(`    ✓ Firestore updated`);
                console.log(`    ✓ Local mirror updated`);
            }
        }

        console.log('\n✅ All modules fixed!\n');

        // Verification
        console.log('📋 Verification:\n');
        const verifySnapshot = await modulesRef.orderBy('order').get();
        verifySnapshot.forEach(doc => {
            const data = doc.data();
            const count = data.vocabularyItems?.length || 0;
            console.log(`  ${data.order}. ${doc.id}: ${count} words`);
        });

        console.log('\n🎉 Migration complete! Hot restart your app now.\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

fixFieldNames();
