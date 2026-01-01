const admin = require('firebase-admin');
const fs = require('fs');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

async function auditJapaneseA1() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🇯🇵 JAPANESE A1 FINAL AUDIT (10 MODULES / 1,000 WORDS)');
    console.log('═══════════════════════════════════════════════════════\n');

    const levelRef = db.collection('languages').doc('japanese').collection('levels').doc('a1');
    const modulesSnapshot = await levelRef.collection('modules').orderBy('order').get();

    let totalWords = 0;
    const globalWords = new Set();
    const duplicates = [];
    const gaps = [];

    modulesSnapshot.forEach(doc => {
        const data = doc.data();
        const items = data.vocabularyItems || [];
        const moduleId = doc.id;

        console.log(`Checking ${moduleId} (Order ${data.order}): ${items.length} words...`);

        if (items.length !== 100) {
            gaps.push(`${moduleId} has ${items.length} words (expected 100)`);
        }

        items.forEach((item, idx) => {
            if (!item.word || !item.reading || !item.meaning) {
                gaps.push(`${moduleId} Word #${idx + 1} is missing a column (word/reading/meaning)`);
            }

            if (globalWords.has(item.word)) {
                duplicates.push(`${moduleId}: Duplicate "${item.word}" found across level`);
            }
            globalWords.add(item.word);
            totalWords++;
        });
    });

    console.log('\n📊 RESULTS:');
    console.log(`- Total Words: ${totalWords}`);
    console.log(`- Total Unique Words: ${globalWords.size}`);
    console.log(`- Total Duplicates: ${duplicates.length}`);
    console.log(`- Total Integrity Gaps: ${gaps.length}`);

    if (duplicates.length > 0) {
        console.log('\n❌ DUPLICATE LIST:');
        duplicates.slice(0, 10).forEach(d => console.log(`  ${d}`));
        if (duplicates.length > 10) console.log(`  ... and ${duplicates.length - 10} more`);
    }

    if (gaps.length > 0) {
        console.log('\n❌ INTEGRITY GAPS:');
        gaps.forEach(g => console.log(`  ${g}`));
    }

    if (totalWords === 1000 && duplicates.length === 0 && gaps.length === 0) {
        console.log('\n🏆 AUDIT PASSED: JAPANESE A1 IS PERFECT.');
    } else {
        console.log('\n⚠️ AUDIT FAILED: FIX THE ISSUES ABOVE.');
    }

    console.log('\n═══════════════════════════════════════════════════════');
}

auditJapaneseA1()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
