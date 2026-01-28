const fs = require('fs');
const path = require('path');

function findConflicts(moduleId) {
    const dataDir = path.join(__dirname, '../firestore_data');
    const masterCorpus = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_baseline_2100.json'), 'utf8'));
    const blacklist = new Set(masterCorpus);

    const data = JSON.parse(fs.readFileSync(path.join(dataDir, `${moduleId}.json`), 'utf8'));
    let conflicts = [];

    data.lessons.forEach(lesson => {
        lesson.vocabulary.forEach(v => {
            if (blacklist.has(v.word)) {
                conflicts.push({ lesson: lesson.title, word: v.word, translation: v.translation });
            }
        });
    });

    console.log(`\n--- Conflicts for ${moduleId} ---`);
    conflicts.forEach(c => {
        console.log(`${c.lesson}: ${c.word} (${c.translation})`);
    });
}

findConflicts('zh_b1_m04');
findConflicts('zh_b1_m05');
