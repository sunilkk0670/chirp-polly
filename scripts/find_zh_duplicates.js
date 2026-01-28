const fs = require('fs');
const path = require('path');

function findDuplicates() {
    const dataDir = path.join(__dirname, '../firestore_data');
    const files = fs.readdirSync(dataDir).filter(f => f.startsWith('zh_a1_m') || f.startsWith('zh_a2_m'));

    let wordMap = new Map(); // word -> array of files it appears in

    files.forEach(file => {
        if (!file.endsWith('.json')) return;
        const filePath = path.join(dataDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (data.lessons) {
            data.lessons.forEach(lesson => {
                lesson.vocabulary.forEach(v => {
                    const word = v.word;
                    if (!wordMap.has(word)) {
                        wordMap.set(word, []);
                    }
                    wordMap.get(word).push(file);
                });
            });
        }
    });

    let duplicates = {};
    wordMap.forEach((fileList, word) => {
        if (fileList.length > 1) {
            duplicates[word] = fileList;
        }
    });

    fs.writeFileSync(path.join(dataDir, 'zh_duplicates_report.json'), JSON.stringify(duplicates, null, 2));

    const dupCount = Object.keys(duplicates).length;
    console.log(`⚠️ Found ${dupCount} words with duplicates.`);
    console.log(`📄 Saved report to firestore_data/zh_duplicates_report.json`);
}

findDuplicates();
