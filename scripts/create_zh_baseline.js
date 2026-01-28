const fs = require('fs');
const path = require('path');

async function createBaseline() {
    const dataDir = path.join(__dirname, '../firestore_data');
    const files = fs.readdirSync(dataDir).filter(f => f.startsWith('zh_') && f.endsWith('.json') && !f.includes('baseline'));

    let allWords = new Set();

    files.forEach(file => {
        const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
        if (data.lessons) {
            data.lessons.forEach(lesson => {
                lesson.vocabulary.forEach(v => {
                    allWords.add(v.word);
                });
            });
        }
    });

    const baselineArray = Array.from(allWords).sort();
    const baselinePath = path.join(dataDir, 'zh_baseline_2500.json'); // New name for new milestones
    fs.writeFileSync(baselinePath, JSON.stringify(baselineArray, null, 2));

    console.log(`✅ Baseline updated with ${baselineArray.length} unique words.`);
    console.log(`Saved to ${baselinePath}`);
}

createBaseline();
