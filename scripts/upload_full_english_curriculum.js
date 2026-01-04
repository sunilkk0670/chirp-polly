/**
 * Full English Curriculum Synchronization
 * Standardizes metadata and uploads all 30 modules with 'order' fields.
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();
const firestoreDataDir = path.join(__dirname, '..', 'firestore_data');

async function syncEnglishCurriculum() {
    console.log('\n=========================================================');
    console.log('🚀 FULL ENGLISH CURRICULUM SYNCHRONIZATION');
    console.log('=========================================================\n');

    const config = [
        {
            id: 'a1',
            name: 'A1',
            description: 'Beginner (CEFR A1)',
            prefix: 'en_a1_m'
        },
        {
            id: 'a2',
            name: 'A2',
            description: 'Elementary (CEFR A2)',
            prefix: 'en_a2_m'
        },
        {
            id: 'b1',
            name: 'B1',
            description: 'Intermediate (CEFR B1)',
            prefix: 'en_b1_m'
        }
    ];

    for (const level of config) {
        console.log(`\n📂 LEVEL: ${level.name} (${level.description})`);

        // 1. Update Level Metadata
        const levelRef = db.collection('languages')
            .doc('english')
            .collection('levels')
            .doc(level.id);

        await levelRef.set({
            name: level.name,
            description: level.description,
            moduleCount: 10,
            status: 'Complete',
            totalWords: 1000,
            lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log(`   ✅ Metadata standardized`);

        // 2. Upload 10 Modules with Order
        for (let i = 1; i <= 10; i++) {
            const moduleNum = i.toString().padStart(2, '0');
            const moduleId = `${level.prefix}${moduleNum}`;
            const fileName = `${moduleId}.json`;
            const filePath = path.join(firestoreDataDir, fileName);

            if (!fs.existsSync(filePath)) {
                console.warn(`   ⚠️ Missing file: ${fileName}`);
                continue;
            }

            const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            // Inject Order and Level info
            moduleData.order = i;
            if (!moduleData.level) moduleData.level = level.name;

            const modRef = levelRef.collection('modules').doc(moduleId);
            await modRef.set(moduleData, { merge: false });

            process.stdout.write(`   📤 ${moduleId} [Order: ${i}] `);
            if (i % 5 === 0) console.log('');
        }
        console.log('\n   ✅ Modules synchronized');
    }

    // 3. Ensure English is enabled
    console.log('\n🌍 Enabling English language...');
    await db.collection('languages').doc('english').set({
        enabled: true,
        order: 1 // Ranking English first for now
    }, { merge: true });

    console.log('\n=========================================================');
    console.log('✅ SYNCHRONIZATION COMPLETE: 3 Levels, 30 Modules');
    console.log('=========================================================\n');

    process.exit(0);
}

syncEnglishCurriculum().catch(error => {
    console.error('❌ Sync failed:', error);
    process.exit(1);
});
