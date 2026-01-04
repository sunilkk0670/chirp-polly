const fs = require('fs');
const path = require('path');

console.log('Final comprehensive fix for M08-M10...\n');

// Load all existing words
const allExisting = new Set();
const a1Words = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/a1_word_list.json'), 'utf8'));
a1Words.forEach(w => allExisting.add(w.toLowerCase()));

['en_a2_m01', 'en_a2_m02', 'en_a2_m03', 'en_a2_m04', 'en_a2_m05', 'en_a2_m06', 'en_a2_m07'].forEach(moduleId => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, `../firestore_data/${moduleId}.json`), 'utf8'));
    data.vocabularyItems.forEach(item => allExisting.add(item.word.toLowerCase()));
});

console.log(`Excluding ${allExisting.size} existing words\n`);

// M08: Add 7 unique words
const m08 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a2_m08.json'), 'utf8'));
const m08Words = new Set(m08.vocabularyItems.map(i => i.word.toLowerCase()));

const m08Add = [
    { word: "cinematographer", phonetic: "/ˌsɪnəməˈtɑːɡrəfər/", english: "The cinematographer won an award for beautiful camera work." },
    { word: "screenwriter", phonetic: "/ˈskriːnraɪtər/", english: "The screenwriter spent years developing the story and characters." },
    { word: "stunt", phonetic: "/stʌnt/", english: "The actor performed his own dangerous stunts in film." },
    { word: "sequel", phonetic: "/ˈsiːkwəl/", english: "The sequel to the movie will be released soon." },
    { word: "prequel", phonetic: "/ˈpriːkwəl/", english: "The prequel explains events before the original story happened." },
    { word: "franchise", phonetic: "/ˈfræntʃaɪz/", english: "The movie franchise has made billions of dollars worldwide." },
    { word: "box", phonetic: "/bɑːks/", english: "The film earned millions at the box office opening." }
].filter(item => !allExisting.has(item.word.toLowerCase()) && !m08Words.has(item.word.toLowerCase()));

m08.vocabularyItems.push(...m08Add);
fs.writeFileSync(path.join(__dirname, '../firestore_data/en_a2_m08.json'), JSON.stringify(m08, null, 2));
console.log(`M08: ${m08.vocabularyItems.length} words`);

// M09: Add 6 unique words
const m09 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a2_m09.json'), 'utf8'));
const m09Words = new Set(m09.vocabularyItems.map(i => i.word.toLowerCase()));

const m09Add = [
    { word: "sustainability", phonetic: "/səˌsteɪnəˈbɪləti/", english: "Sustainability means meeting our needs without harming future generations." },
    { word: "renewable", phonetic: "/rɪˈnuːəbəl/", english: "Solar and wind are renewable sources of clean energy." },
    { word: "fossil", phonetic: "/ˈfɑːsəl/", english: "Fossil fuels like coal and oil pollute the environment." },
    { word: "emissions", phonetic: "/ɪˈmɪʃənz/", english: "Carbon emissions from cars contribute to global warming significantly." },
    { word: "deforestation", phonetic: "/diːˌfɔːrɪˈsteɪʃən/", english: "Deforestation destroys animal habitats and increases carbon dioxide levels." },
    { word: "reforestation", phonetic: "/riːˌfɔːrɪˈsteɪʃən/", english: "Reforestation programs plant millions of trees every year worldwide." }
].filter(item => !allExisting.has(item.word.toLowerCase()) && !m09Words.has(item.word.toLowerCase()));

m09.vocabularyItems.push(...m09Add);
fs.writeFileSync(path.join(__dirname, '../firestore_data/en_a2_m09.json'), JSON.stringify(m09, null, 2));
console.log(`M09: ${m09.vocabularyItems.length} words`);

// M10: Add 1 unique word
const m10 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a2_m10.json'), 'utf8'));
const m10Words = new Set(m10.vocabularyItems.map(i => i.word.toLowerCase()));

const m10Add = [
    { word: "troubleshooting", phonetic: "/ˈtrʌbəlʃuːtɪŋ/", english: "Troubleshooting the computer problem took several hours to complete." }
].filter(item => !allExisting.has(item.word.toLowerCase()) && !m10Words.has(item.word.toLowerCase()));

m10.vocabularyItems.push(...m10Add);
fs.writeFileSync(path.join(__dirname, '../firestore_data/en_a2_m10.json'), JSON.stringify(m10, null, 2));
console.log(`M10: ${m10.vocabularyItems.length} words`);

console.log('\n✅ All modules updated!');
