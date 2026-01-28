const fs = require('fs');
const path = require('path');

// Load all 8 modules
const modules = [];
for (let i = 1; i <= 8; i++) {
    const fileName = `zh_a1_m0${i}.json`;
    const filePath = path.join(__dirname, `../firestore_data/${fileName}`);
    if (fs.existsSync(filePath)) {
        modules.push({
            id: `M0${i}`,
            data: JSON.parse(fs.readFileSync(filePath, 'utf8'))
        });
    }
}

console.log(`\n📊 Analyzing ${modules.length} Chinese A1 Modules...\n`);

const allWords = [];
const wordToModules = {};

modules.forEach(mod => {
    mod.data.lessons.forEach(lesson => {
        lesson.vocabulary.forEach(item => {
            const word = item.word;
            allWords.push(word);
            if (!wordToModules[word]) {
                wordToModules[word] = [];
            }
            wordToModules[word].push(mod.id);
        });
    });
});

const duplicates = Object.entries(wordToModules).filter(([word, mods]) => mods.length > 1);

console.log(`Total words analyzed: ${allWords.length}`);
console.log(`Unique words: ${Object.keys(wordToModules).length}`);
console.log(`Duplicate count: ${duplicates.length}\n`);

if (duplicates.length > 0) {
    console.log('❌ Duplicates found:');
    duplicates.forEach(([word, mods]) => {
        console.log(`  - "${word}" found in: ${mods.join(', ')}`);
    });
} else {
    console.log('🎉 EXCELLENT! No duplicates found across all 8 modules.');
}
