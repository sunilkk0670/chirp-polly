const fs = require('fs');
const path = require('path');

function auditBatch(moduleIds) {
    const dataDir = path.join(__dirname, '../firestore_data');
    const masterCorpus = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_baseline_2100.json'), 'utf8'));
    const blacklist = new Set(masterCorpus);

    moduleIds.forEach(moduleId => {
        const filePath = path.join(dataDir, `${moduleId}.json`);
        if (!fs.existsSync(filePath)) {
            console.log(`❌ File not found: ${filePath}`);
            return;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let conflicts = [];
        let uniqueInModule = new Set();
        let totalCount = 0;

        data.lessons.forEach(lesson => {
            lesson.vocabulary.forEach(v => {
                totalCount++;
                // Check against master corpus (which includes A1/A2 and previous B1)
                // BUT, when auditing M02, we don't want to conflict with M02 itself if it was already in the corpus.
                // Since M02 was just added to the corpus by collect_zh_corpus, we need to be careful.
                // A better way is to check if the word is found in files OTHER than the current one.
                // For B1 generation, the master corpus is our baseline.
                if (blacklist.has(v.word)) {
                    // For now, let's just report everything in the blacklist. 
                    // Any word that WAS in A1/A2/M01 is a real conflict.
                    conflicts.push(`${lesson.title} -> ${v.word}`);
                }
                uniqueInModule.add(v.word);
            });
        });

        console.log(`\n📊 Audit Results for ${moduleId}:`);
        console.log(`   Total Words: ${totalCount}`);
        console.log(`   Unique In-Module: ${uniqueInModule.size}`);
        console.log(`   Blacklist Conflicts: ${conflicts.length}`);

        // Filter out "conflicts" that are actually just the word appearing in the file itself 
        // (if we re-ran corpus collection). 
        // Actually, the previous master corpus had 2244 words. 
        // Let's just output the conflicts and I'll see if they are from earlier levels.
        conflicts.slice(0, 10).forEach(c => console.log(`      ❌ ${c}`));
    });
}

const modulesToAudit = process.argv.slice(2);
if (modulesToAudit.length === 0) {
    console.log('Usage: node scripts/audit_zh_batch.js module_id1 module_id2 ...');
} else {
    auditBatch(modulesToAudit);
}
