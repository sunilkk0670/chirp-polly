const fs = require('fs');
const path = require('path');

const modules = ['fr_b1_m22', 'fr_b1_m23', 'fr_b1_m24'];

console.log('🔍 Verifying French B1 Modules 22-24...\n');

modules.forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);

    if (!fs.existsSync(filePath)) {
        console.log(`❌ ${moduleId}: File not found`);
        return;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const words = data.vocabularyItems;
    const seen = new Set();
    let duplicates = 0;

    words.forEach((item, idx) => {
        if (seen.has(item.word)) {
            console.log(`❌ ${moduleId}: Duplicate "${item.word}" at index ${idx}`);
            duplicates++;
        }
        seen.add(item.word);
    });

    if (duplicates === 0) {
        console.log(`✅ ${moduleId}: ${words.length} words, 0 duplicates`);
        console.log(`   - Word #1: ${words[0].word} (${words[0].meaning})`);
        console.log(`   - Word #9: ${words[8].word} (${words[8].meaning})`);
        console.log(`   - Word #100: ${words[99].word} (${words[99].meaning})`);
        console.log(`   - Liar Game traps: ${data.liarGameData.culturalTraps.length}\n`);
    }
});

console.log('✅ Verification complete!');
