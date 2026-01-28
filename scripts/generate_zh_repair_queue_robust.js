const fs = require('fs');
const path = require('path');

function generateRobustRepairQueue() {
    const dataDir = path.join(__dirname, '../firestore_data');
    const files = fs.readdirSync(dataDir).filter(f => f.startsWith('zh_a1_m') || f.startsWith('zh_a2_m'));
    files.sort();

    let seenWords = new Set();
    let repairQueue = [];

    files.forEach(file => {
        if (!file.endsWith('.json')) return;
        const filePath = path.join(dataDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (data.lessons) {
            data.lessons.forEach(lesson => {
                lesson.vocabulary.forEach((v, index) => {
                    if (seenWords.has(v.word)) {
                        repairQueue.push({
                            file: file,
                            lesson_id: lesson.lesson_id,
                            word_index: index,
                            old_word: v.word
                        });
                    } else {
                        seenWords.add(v.word);
                    }
                });
            });
        }
    });

    fs.writeFileSync(path.join(dataDir, 'zh_repair_queue_robust.json'), JSON.stringify(repairQueue, null, 2));
    console.log(`✅ Generated robust repair queue with ${repairQueue.length} items.`);
}

generateRobustRepairQueue();
