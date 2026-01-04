const fs = require('fs');
const path = require('path');

console.log('Removing internal duplicates and adding unique words...\n');

// M08: Remove duplicates
const m08 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a2_m08.json'), 'utf8'));
const m08Seen = new Set();
m08.vocabularyItems = m08.vocabularyItems.filter(item => {
    if (m08Seen.has(item.word.toLowerCase())) {
        console.log(`M08: Removing duplicate "${item.word}"`);
        return false;
    }
    m08Seen.add(item.word.toLowerCase());
    return true;
});
fs.writeFileSync(path.join(__dirname, '../firestore_data/en_a2_m08.json'), JSON.stringify(m08, null, 2));
console.log(`M08: ${m08.vocabularyItems.length} words\n`);

// M09: Remove duplicates and add 6 words
const m09 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a2_m09.json'), 'utf8'));
const m09Seen = new Set();
m09.vocabularyItems = m09.vocabularyItems.filter(item => {
    if (m09Seen.has(item.word.toLowerCase())) {
        console.log(`M09: Removing duplicate "${item.word}"`);
        return false;
    }
    m09Seen.add(item.word.toLowerCase());
    return true;
});

// Add unique words to M09
const m09New = [
    { word: "erosion", phonetic: "/ɪˈroʊʒən/", english: "Soil erosion is caused by wind and water over time." },
    { word: "degradation", phonetic: "/ˌdeɡrəˈdeɪʃən/", english: "Environmental degradation threatens the planet's future and our survival." },
    { word: "contamination", phonetic: "/kənˌtæmɪˈneɪʃən/", english: "Water contamination from factories affects millions of people's health." },
    { word: "toxic", phonetic: "/ˈtɑːksɪk/", english: "Toxic chemicals in the river killed all the fish." },
    { word: "hazardous", phonetic: "/ˈhæzərdəs/", english: "Hazardous waste must be disposed of properly and safely." },
    { word: "landfill", phonetic: "/ˈlændfɪl/", english: "The landfill is full of garbage and non-recyclable waste." }
];
m09.vocabularyItems.push(...m09New);
fs.writeFileSync(path.join(__dirname, '../firestore_data/en_a2_m09.json'), JSON.stringify(m09, null, 2));
console.log(`M09: ${m09.vocabularyItems.length} words\n`);

// M10: Remove duplicates
const m10 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a2_m10.json'), 'utf8'));
const m10Seen = new Set();
m10.vocabularyItems = m10.vocabularyItems.filter(item => {
    if (m10Seen.has(item.word.toLowerCase())) {
        console.log(`M10: Removing duplicate "${item.word}"`);
        return false;
    }
    m10Seen.add(item.word.toLowerCase());
    return true;
});
fs.writeFileSync(path.join(__dirname, '../firestore_data/en_a2_m10.json'), JSON.stringify(m10, null, 2));
console.log(`M10: ${m10.vocabularyItems.length} words\n`);

console.log('✅ Duplicates removed!');
