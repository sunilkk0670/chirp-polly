const fs = require('fs');
const path = require('path');

function collectAllChineseWords() {
    const dataDir = path.join(__dirname, '../firestore_data');

    // Include A1, A2, and already finalized B1 modules
    const searchPatterns = ['zh_a1_', 'zh_a2_', 'zh_b1_'];
    const files = fs.readdirSync(dataDir).filter(f =>
        searchPatterns.some(p => f.startsWith(p)) && f.endsWith('.json')
    );

    let allWords = new Set();

    files.forEach(file => {
        // Skip current working modules if they are being audited (handled by audit script)
        // But for the master corpus, we usually want stable versions.
        // Actually, let's just collect EVERYTHING existing.
        const filePath = path.join(dataDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (data.lessons) {
            data.lessons.forEach(lesson => {
                lesson.vocabulary.forEach(v => {
                    allWords.add(v.word);
                });
            });
        }
    });

    const output = Array.from(allWords).sort();
    fs.writeFileSync(path.join(dataDir, 'zh_master_corpus.json'), JSON.stringify(output, null, 2));

    console.log(`✅ Master Corpus Updated: ${output.length} unique words collected.`);
    console.log(`📄 Saved to firestore_data/zh_master_corpus.json`);
}

collectAllChineseWords();
