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

async function addOrderFields() {
    try {
        console.log('\n📝 Adding order fields to Spanish A1 modules...\n');

        const modules = [
            { id: 'es_a1_m01_audited_100', order: 1 },
            { id: 'es_a1_m02_audited_100', order: 2 },
            { id: 'es_a1_m03_audited_100', order: 3 },
            { id: 'es_a1_m04_audited_100', order: 4 },
            { id: 'es_a1_m05_audited_100', order: 5 }
        ];

        for (const module of modules) {
            await db
                .collection('languages')
                .doc('spanish')
                .collection('levels')
                .doc('a1')
                .collection('modules')
                .doc(module.id)
                .update({ order: module.order });

            console.log(`✓ Added order ${module.order} to ${module.id}`);
        }

        console.log('\n✅ All order fields added successfully!\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

addOrderFields();
