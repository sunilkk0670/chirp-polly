const fs = require('fs');
const path = require('path');

// Load A1 words for exclusion
const a1Words = new Set(JSON.parse(fs.readFileSync(
    path.join(__dirname, '../firestore_data/a1_word_list.json'),
    'utf8'
)));

// Load existing A2 M01-M07 words
const existingA2 = new Set();
['en_a2_m01', 'en_a2_m02', 'en_a2_m03', 'en_a2_m04', 'en_a2_m05', 'en_a2_m06', 'en_a2_m07'].forEach(moduleId => {
    const data = JSON.parse(fs.readFileSync(
        path.join(__dirname, `../firestore_data/${moduleId}.json`),
        'utf8'
    ));
    data.vocabularyItems.forEach(item => existingA2.add(item.word.toLowerCase()));
});

console.log('Removing A1 and A2 M01-M07 overlaps from M08-M10...\n');

// Fix M08
const m08Path = path.join(__dirname, '../firestore_data/en_a2_m08.json');
const m08 = JSON.parse(fs.readFileSync(m08Path, 'utf8'));
const m08Before = m08.vocabularyItems.length;
m08.vocabularyItems = m08.vocabularyItems.filter(item => {
    const word = item.word.toLowerCase();
    return !a1Words.has(word) && !existingA2.has(word);
});
console.log(`M08: ${m08Before} -> ${m08.vocabularyItems.length} (removed ${m08Before - m08.vocabularyItems.length})`);

// Add words to M08
const m08New = [
    { word: "broadcast", phonetic: "/ˈbrɔːdkæst/", english: "The news will broadcast live from the stadium tonight." },
    { word: "streaming", phonetic: "/ˈstriːmɪŋ/", english: "Streaming services have changed how we watch television shows." },
    { word: "podcast", phonetic: "/ˈpɑːdkæst/", english: "I listen to podcasts while commuting to work daily." },
    { word: "episode", phonetic: "/ˈepɪsoʊd/", english: "The final episode of the series airs next week." }
];
m08.vocabularyItems.push(...m08New);
fs.writeFileSync(m08Path, JSON.stringify(m08, null, 2));
console.log(`M08: Now has ${m08.vocabularyItems.length} words\n`);

// Fix M09
const m09Path = path.join(__dirname, '../firestore_data/en_a2_m09.json');
const m09 = JSON.parse(fs.readFileSync(m09Path, 'utf8'));
const m09Before = m09.vocabularyItems.length;
m09.vocabularyItems = m09.vocabularyItems.filter(item => {
    const word = item.word.toLowerCase();
    return !a1Words.has(word) && !existingA2.has(word);
});
console.log(`M09: ${m09Before} -> ${m09.vocabularyItems.length} (removed ${m09Before - m09.vocabularyItems.length})`);

// Add words to M09
const m09New = [
    { word: "environment", phonetic: "/ɪnˈvaɪrənmənt/", english: "We must protect the environment for future generations to enjoy." },
    { word: "ecosystem", phonetic: "/ˈiːkoʊsɪstəm/", english: "The forest ecosystem supports thousands of different species of life." },
    { word: "biodiversity", phonetic: "/ˌbaɪoʊdaɪˈvɜːrsəti/", english: "Biodiversity is essential for a healthy planet and ecosystem." },
    { word: "conservation", phonetic: "/ˌkɑːnsərˈveɪʃən/", english: "Wildlife conservation efforts have saved many endangered species from extinction." },
    { word: "preservation", phonetic: "/ˌprezərˈveɪʃən/", english: "The preservation of natural habitats is crucial for wildlife." }
];
m09.vocabularyItems.push(...m09New);
fs.writeFileSync(m09Path, JSON.stringify(m09, null, 2));
console.log(`M09: Now has ${m09.vocabularyItems.length} words\n`);

// Fix M10
const m10Path = path.join(__dirname, '../firestore_data/en_a2_m10.json');
const m10 = JSON.parse(fs.readFileSync(m10Path, 'utf8'));
const m10Before = m10.vocabularyItems.length;
m10.vocabularyItems = m10.vocabularyItems.filter(item => {
    const word = item.word.toLowerCase();
    return !a1Words.has(word) && !existingA2.has(word);
});
console.log(`M10: ${m10Before} -> ${m10.vocabularyItems.length} (removed ${m10Before - m10.vocabularyItems.length})`);

// Add words to M10
const m10New = [
    { word: "complaint", phonetic: "/kəmˈpleɪnt/", english: "I filed a complaint about the poor service yesterday." },
    { word: "dissatisfaction", phonetic: "/ˌdɪsˌsætɪsˈfækʃən/", english: "Customer dissatisfaction led to many negative reviews online today." },
    { word: "compensation", phonetic: "/ˌkɑːmpenˈseɪʃən/", english: "The airline offered compensation for the delayed flight yesterday." },
    { word: "reimbursement", phonetic: "/ˌriːɪmˈbɜːrsmənt/", english: "You can claim reimbursement for your travel expenses incurred." },
    { word: "replacement", phonetic: "/rɪˈpleɪsmənt/", english: "They sent a replacement for the broken item immediately." },
    { word: "warranty", phonetic: "/ˈwɔːrənti/", english: "The product comes with a two year warranty period." },
    { word: "defect", phonetic: "/ˈdiːfekt/", english: "The product has a manufacturing defect and doesn't work." },
    { word: "malfunction", phonetic: "/mælˈfʌŋkʃən/", english: "The machine malfunctioned and stopped working completely this morning." },
    { word: "faulty", phonetic: "/ˈfɔːlti/", english: "The faulty wiring caused the electrical fire last night." },
    { word: "damaged", phonetic: "/ˈdæmɪdʒd/", english: "The package arrived damaged with items broken inside badly." }
];
m10.vocabularyItems.push(...m10New);
fs.writeFileSync(m10Path, JSON.stringify(m10, null, 2));
console.log(`M10: Now has ${m10.vocabularyItems.length} words\n`);

console.log('✅ All fixes complete!');
