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

const migrations = [
    { old: 'es_a1_m01_audited_100', new: 'es_a1_m01', order: 1, file: 'es_a1_m01.json' },
    { old: 'es_a1_m02_audited_100', new: 'es_a1_m02', order: 2, file: 'es_a1_m02.json' },
    { old: 'es_a1_m03_audited_100', new: 'es_a1_m03', order: 3, file: 'es_a1_m03.json' },
    { old: 'es_a1_m04_audited_100', new: 'es_a1_m04', order: 4, file: 'es_a1_m04.json' },
    { old: 'es_a1_m05_audited_100', new: 'es_a1_m05', order: 5, file: 'es_a1_m05.json' }
];

async function migrateModuleIds() {
    try {
        console.log('\n🔄 Migrating Spanish A1 module IDs to clean format...\n');

        for (const migration of migrations) {
            console.log(`Processing: ${migration.old} → ${migration.new}`);

            // Step 1: Read old document
            const oldDoc = await db
                .collection('languages')
                .doc('spanish')
                .collection('levels')
                .doc('a1')
                .collection('modules')
                .doc(migration.old)
                .get();

            if (!oldDoc.exists) {
                console.log(`  ⚠️  Old document not found, skipping...`);
                continue;
            }

            const data = oldDoc.data();

            // Step 2: Update module_id field
            data.module_id = migration.new;
            data.order = migration.order;

            // Step 3: Create new document with clean ID
            await db
                .collection('languages')
                .doc('spanish')
                .collection('levels')
                .doc('a1')
                .collection('modules')
                .doc(migration.new)
                .set(data, { merge: false });

            console.log(`  ✓ Created new document: ${migration.new}`);

            // Step 4: Update local JSON file
            const localPath = join(__dirname, '../assets/data/curriculum/es_a1', migration.file);
            writeFileSync(localPath, JSON.stringify(data, null, 2));
            console.log(`  ✓ Updated local file: ${migration.file}`);

            // Step 5: Delete old document
            await db
                .collection('languages')
                .doc('spanish')
                .collection('levels')
                .doc('a1')
                .collection('modules')
                .doc(migration.old)
                .delete();

            console.log(`  ✓ Deleted old document: ${migration.old}\n`);
        }

        // Verify migration
        console.log('Verification:');
        const snapshot = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .orderBy('order')
            .get();

        console.log(`\nModules in Firestore (${snapshot.size} total):`);
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            console.log(`  ✓ ${doc.id} (order: ${data.order}, theme: ${data.theme})`);
        });

        console.log('\n═══════════════════════════════════════════════════════');
        console.log('✅ Migration Complete!');
        console.log('═══════════════════════════════════════════════════════');
        console.log('\nAll modules now use clean IDs: es_a1_m01 through es_a1_m05');
        console.log('Old _audited_100 versions have been deleted.\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during migration:', error);
        process.exit(1);
    }
}

migrateModuleIds();
