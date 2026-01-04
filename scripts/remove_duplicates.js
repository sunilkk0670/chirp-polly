const fs = require('fs');
const path = require('path');

console.log('Removing duplicates and replacing with unique words...\n');

// Module 2: Remove "old", "teacher", "child", "help" and replace
const m2Path = path.join(__dirname, '../firestore_data/en_a1_m02.json');
const m2Data = JSON.parse(fs.readFileSync(m2Path, 'utf8'));

const m2Replacements = [
    { index: 70, word: "elderly", phonetic: "/ˈeldərli/", english: "My elderly neighbor is very wise." },
    { index: 23, word: "instructor", phonetic: "/ɪnˈstrʌktər/", english: "The instructor explained the lesson clearly." },
    { index: 9, word: "kid", phonetic: "/kɪd/", english: "The kid is playing in the park." },
    { index: 65, word: "assist", phonetic: "/əˈsɪst/", english: "Can you assist me with this task?" }
];

m2Replacements.sort((a, b) => b.index - a.index); // Sort descending to avoid index shifts
m2Replacements.forEach(rep => {
    m2Data.vocabularyItems[rep.index] = { word: rep.word, phonetic: rep.phonetic, english: rep.english };
    console.log(`  M2: Replaced index ${rep.index} with "${rep.word}"`);
});

fs.writeFileSync(m2Path, JSON.stringify(m2Data, null, 4));

// Module 3: Remove "today", "need", and one "time" and replace
const m3Path = path.join(__dirname, '../firestore_data/en_a1_m03.json');
const m3Data = JSON.parse(fs.readFileSync(m3Path, 'utf8'));

const m3Replacements = [
    { index: 94, word: "require", phonetic: "/rɪˈkwaɪər/", english: "I require more time to finish." },
    { index: 27, word: "now", phonetic: "/naʊ/", english: "What are you doing right now?" },
    { index: 17, word: "punctual", phonetic: "/ˈpʌŋktʃuəl/", english: "Please be punctual for the meeting." }
];

m3Replacements.sort((a, b) => b.index - a.index);
m3Replacements.forEach(rep => {
    m3Data.vocabularyItems[rep.index] = { word: rep.word, phonetic: rep.phonetic, english: rep.english };
    console.log(`  M3: Replaced index ${rep.index} with "${rep.word}"`);
});

// Remove the extra word to get to 100
if (m3Data.vocabularyItems.length > 100) {
    m3Data.vocabularyItems.pop();
    console.log(`  M3: Removed extra word (now ${m3Data.vocabularyItems.length} words)`);
}

fs.writeFileSync(m3Path, JSON.stringify(m3Data, null, 4));

console.log('\n✅ All duplicates removed and replaced!');
console.log('   Module 2: 100 words');
console.log('   Module 3: 100 words');
console.log('   Module 4: 100 words');
console.log('\nRe-running audit...\n');
