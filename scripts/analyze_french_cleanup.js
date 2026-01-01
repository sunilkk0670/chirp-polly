const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function analyzeAndCleanup() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🔧 FRENCH CURRICULUM CLEANUP ANALYSIS');
    console.log('═══════════════════════════════════════════════════════\n');

    const allModules = [];
    const duplicateReport = {
        withinA1: [],
        withinA2: [],
        withinB1: [],
        crossLevel: [],
        basicWordsInB1: []
    };

    // Basic words that should NOT appear in B1
    const basicWords = [
        'Bonjour', 'Au revoir', 'Merci', 'Oui', 'Non', 'S\'il vous plaît',
        'Pardon', 'Excusez-moi', 'Bonsoir', 'Bonne nuit', 'Salut',
        'Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit', 'Neuf', 'Dix'
    ];

    // High-frequency verbs allowed across levels
    const allowedCrossLevel = [
        'Être', 'Avoir', 'Faire', 'Aller', 'Venir', 'Pouvoir', 'Vouloir', 'Devoir',
        'Savoir', 'Dire', 'Prendre', 'Donner', 'Voir', 'Mettre'
    ];

    // Fetch all modules
    console.log('📥 Fetching all 30 modules from Firebase...\n');

    // A1
    for (let i = 1; i <= 10; i++) {
        const moduleId = `fr_a1_m${i}`;
        const doc = await db.collection('languages').doc('french')
            .collection('levels').doc('a1')
            .collection('modules').doc(moduleId).get();

        if (doc.exists) {
            allModules.push({
                id: moduleId,
                level: 'A1',
                order: i,
                data: doc.data()
            });
        }
    }

    // A2
    for (let i = 11; i <= 20; i++) {
        const moduleId = `fr_a2_m${i}`;
        const doc = await db.collection('languages').doc('french')
            .collection('levels').doc('a2')
            .collection('modules').doc(moduleId).get();

        if (doc.exists) {
            allModules.push({
                id: moduleId,
                level: 'A2',
                order: i,
                data: doc.data()
            });
        }
    }

    // B1
    for (let i = 21; i <= 30; i++) {
        const moduleId = `fr_b1_m${i}`;
        const doc = await db.collection('languages').doc('french')
            .collection('levels').doc('b1')
            .collection('modules').doc(moduleId).get();

        if (doc.exists) {
            allModules.push({
                id: moduleId,
                level: 'B1',
                order: i,
                data: doc.data()
            });
        }
    }

    console.log(`✅ Fetched ${allModules.length} modules\n`);

    // Analyze duplicates
    console.log('🔍 Analyzing duplicates...\n');

    const a1Words = new Map();
    const a2Words = new Map();
    const b1Words = new Map();

    // Track A1 words
    allModules.filter(m => m.level === 'A1').forEach(module => {
        module.data.vocabularyItems.forEach((item, idx) => {
            const word = item.word;
            if (!a1Words.has(word)) {
                a1Words.set(word, []);
            }
            a1Words.get(word).push({ module: module.id, index: idx + 1 });
        });
    });

    // Track A2 words
    allModules.filter(m => m.level === 'A2').forEach(module => {
        module.data.vocabularyItems.forEach((item, idx) => {
            const word = item.word;
            if (!a2Words.has(word)) {
                a2Words.set(word, []);
            }
            a2Words.get(word).push({ module: module.id, index: idx + 1 });
        });
    });

    // Track B1 words
    allModules.filter(m => m.level === 'B1').forEach(module => {
        module.data.vocabularyItems.forEach((item, idx) => {
            const word = item.word;
            if (!b1Words.has(word)) {
                b1Words.set(word, []);
            }
            b1Words.get(word).push({ module: module.id, index: idx + 1 });

            // Check if basic word in B1
            if (basicWords.includes(word)) {
                duplicateReport.basicWordsInB1.push({
                    word: word,
                    module: module.id,
                    index: idx + 1
                });
            }
        });
    });

    // Find within-level duplicates
    a1Words.forEach((locations, word) => {
        if (locations.length > 1) {
            duplicateReport.withinA1.push({ word, locations });
        }
    });

    a2Words.forEach((locations, word) => {
        if (locations.length > 1) {
            duplicateReport.withinA2.push({ word, locations });
        }
    });

    b1Words.forEach((locations, word) => {
        if (locations.length > 1) {
            duplicateReport.withinB1.push({ word, locations });
        }
    });

    // Generate cleanup report
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 CLEANUP REPORT');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log(`🔴 CRITICAL: Within A1 duplicates: ${duplicateReport.withinA1.length}`);
    console.log(`🟡 WARNING: Within A2 duplicates: ${duplicateReport.withinA2.length}`);
    console.log(`🟡 WARNING: Within B1 duplicates: ${duplicateReport.withinB1.length}`);
    console.log(`🟠 REVIEW: Basic words in B1: ${duplicateReport.basicWordsInB1.length}\n`);

    // Save detailed report
    const reportPath = path.join(__dirname, '../firestore_data/french_cleanup_report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
        withinA1: duplicateReport.withinA1,
        withinA2: duplicateReport.withinA2,
        withinB1: duplicateReport.withinB1,
        basicWordsInB1: duplicateReport.basicWordsInB1,
        summary: {
            totalModules: allModules.length,
            withinA1Count: duplicateReport.withinA1.length,
            withinA2Count: duplicateReport.withinA2.length,
            withinB1Count: duplicateReport.withinB1.length,
            basicInB1Count: duplicateReport.basicWordsInB1.length
        }
    }, null, 2));

    console.log(`✅ Detailed report saved to: french_cleanup_report.json\n`);

    // Show top issues
    console.log('🔴 TOP 20 WITHIN-A1 DUPLICATES:');
    duplicateReport.withinA1.slice(0, 20).forEach(dup => {
        console.log(`   "${dup.word}" appears in:`);
        dup.locations.forEach(loc => {
            console.log(`      - ${loc.module} [Word #${loc.index}]`);
        });
    });

    if (duplicateReport.withinA1.length > 20) {
        console.log(`   ... and ${duplicateReport.withinA1.length - 20} more\n`);
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📋 CLEANUP PLAN');
    console.log('═══════════════════════════════════════════════════════');
    console.log('1. Fix fr_a1_m1: Remove 2 extra words');
    console.log(`2. Fix ${duplicateReport.withinA1.length} within-A1 duplicates`);
    console.log(`3. Fix ${duplicateReport.withinA2.length} within-A2 duplicates`);
    console.log(`4. Fix ${duplicateReport.withinB1.length} within-B1 duplicates`);
    console.log(`5. Replace ${duplicateReport.basicWordsInB1.length} basic words in B1`);
    console.log('6. Re-upload cleaned modules');
    console.log('7. Re-run audit to confirm 2,700+ unique words');
    console.log('═══════════════════════════════════════════════════════');
}

analyzeAndCleanup()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
