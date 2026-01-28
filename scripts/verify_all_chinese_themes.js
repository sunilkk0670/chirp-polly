const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, 'serviceAccountKey.json'), 'utf8'));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function comprehensiveVerification() {
    const dataDir = path.join(__dirname, '../firestore_data');

    const files = fs.readdirSync(dataDir).filter(f =>
        (f.startsWith('zh_a1_m') || f.startsWith('zh_a2_m') || f.startsWith('zh_b1_m')) &&
        f.endsWith('.json') &&
        !f.includes('modules')
    ).sort();

    console.log(`🔍 Verifying ${files.length} Chinese modules\n`);

    let allCorrect = true;
    let italianCount = 0;

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const localData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const moduleId = localData.module_id;
        const level = localData.level;
        const modulePath = `languages/chinese/levels/${level}/modules/${moduleId}`;

        const doc = await db.doc(modulePath).get();
        if (doc.exists) {
            const firestoreData = doc.data();
            const theme = firestoreData.theme;

            // Check if theme contains Italian characters
            const hasItalian = /[àèéìòù]/i.test(theme) ||
                theme.includes('Vita') ||
                theme.includes('Relazioni') ||
                theme.includes('Emozioni') ||
                theme.includes('Viaggi') ||
                theme.includes('Lavoro') ||
                theme.includes('Società') ||
                theme.includes('Ambiente') ||
                theme.includes('Decisioni') ||
                theme.includes('Tempo Libero') ||
                theme.includes('Narrazione') ||
                theme.includes('Opinioni');

            if (hasItalian) {
                console.log(`❌ ${moduleId}: "${theme}" (ITALIAN)`);
                italianCount++;
                allCorrect = false;
            } else {
                console.log(`✅ ${moduleId}: "${theme}"`);
            }
        }
    }

    console.log(`\n📊 Verification Summary:`);
    console.log(`   Total modules: ${files.length}`);
    console.log(`   Italian themes remaining: ${italianCount}`);
    console.log(`   Status: ${allCorrect ? '✅ ALL FIXED' : '❌ ISSUES FOUND'}`);

    process.exit(0);
}

comprehensiveVerification();
