const fs = require('fs');
const path = require('path');

function auditM01() {
    const dataDir = path.join(__dirname, '../firestore_data');
    const corpusLayer = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_a1_a2_corpus.json'), 'utf8'));
    const blacklist = new Set(corpusLayer);

    const m01 = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_b1_m01.json'), 'utf8'));
    let conflicts = [];
    let uniqueWords = new Set();
    let totalCount = 0;

    m01.lessons.forEach(lesson => {
        lesson.vocabulary.forEach(v => {
            totalCount++;
            if (blacklist.has(v.word)) {
                conflicts.push(`Blacklist Conflict: ${v.word}`);
            }
            if (uniqueWords.has(v.word)) {
                // Some words like 故事/事故 appear twice in the traps lesson for reinforcement
                // but we should check if they were already in A1/A2.
            }
            uniqueWords.add(v.word);
        });
    });

    console.log(`📊 Audit Results for zh_b1_m01:`);
    console.log(`   Total Words: ${totalCount}`);
    console.log(`   Unique In-Module: ${uniqueWords.size}`);
    console.log(`   Blacklist Conflicts: ${conflicts.length}`);
    conflicts.forEach(c => console.log(`      ❌ ${c}`));

    if (conflicts.length === 0 && uniqueWords.size >= 90) { // Allowing for some internal reinforcement duplicates if necessary
        console.log(`✅ Audit Passed!`);
    } else {
        console.log(`⚠️ Audit Issues detected.`);
    }
}

auditM01();
