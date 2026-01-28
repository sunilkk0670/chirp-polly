const fs = require('fs');
const path = require('path');

function executeSurgicalRepair() {
    const dataDir = path.join(__dirname, '../firestore_data');
    const queue = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_repair_queue_robust.json'), 'utf8'));
    const pool = JSON.parse(fs.readFileSync(path.join(dataDir, 'zh_replacement_pool.json'), 'utf8'));

    console.log(`🛠️ Starting surgical repair of ${queue.length} slots...`);

    // Group queue by file for efficiency
    const fileTasks = {};
    queue.forEach((item, idx) => {
        if (!fileTasks[item.file]) fileTasks[item.file] = [];
        fileTasks[item.file].push({ ...item, poolWord: pool[idx] });
    });

    Object.keys(fileTasks).forEach(fileName => {
        const filePath = path.join(dataDir, fileName);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        fileTasks[fileName].forEach(task => {
            const lesson = data.lessons.find(l => l.lesson_id === task.lesson_id);
            if (lesson && lesson.vocabulary[task.word_index]) {
                const entry = lesson.vocabulary[task.word_index];
                // console.log(`   📝 In ${fileName}: Replacing "${entry.word}" with "${task.poolWord.word}"`);
                entry.word = task.poolWord.word;
                entry.translation = task.poolWord.translation;
                entry.phonetic = task.poolWord.phonetic;
                // Preserve liarGame flag if it was a trap (unlikely for duplicates but safe)
                if (entry.liarGame) {
                    console.log(`   ⚠️ Note: Replaced a Liar Game trap in ${fileName}`);
                }
            } else {
                console.error(`   ❌ Failed to find lesson/word: ${task.lesson_id}, index ${task.word_index} in ${fileName}`);
            }
        });

        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log(`   ✅ Repaired ${fileName}`);
    });

    console.log('\n✨ All files updated locally.');
}

executeSurgicalRepair();
