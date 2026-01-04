const fs = require('fs');
const path = require('path');

const duplicateWords = ['itinerary', 'advise', 'motivate', 'prohibit', 'decline'];

console.log('Finding duplicate locations...\n');

['en_a2_m02', 'en_a2_m04', 'en_a2_m06', 'en_a2_m07'].forEach(moduleId => {
    const filePath = path.join(__dirname, `../firestore_data/${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    data.vocabularyItems.forEach((item, idx) => {
        if (duplicateWords.includes(item.word.toLowerCase())) {
            console.log(`${moduleId} [${idx}]: ${item.word}`);
        }
    });
});

console.log('\nRemoving duplicates from M06 and M07...\n');

// Remove from M06
const m06Path = path.join(__dirname, '../firestore_data/en_a2_m06.json');
const m06 = JSON.parse(fs.readFileSync(m06Path, 'utf8'));
const m06Before = m06.vocabularyItems.length;
m06.vocabularyItems = m06.vocabularyItems.filter(item => item.word !== 'itinerary');
m06.vocabularyItems.push({ word: "timetable", phonetic: "/ˈtaɪmteɪbəl/", english: "Check the train timetable for departure and arrival times." });
fs.writeFileSync(m06Path, JSON.stringify(m06, null, 2));
console.log(`M06: ${m06Before} -> ${m06.vocabularyItems.length}`);

// Remove from M07
const m07Path = path.join(__dirname, '../firestore_data/en_a2_m07.json');
const m07 = JSON.parse(fs.readFileSync(m07Path, 'utf8'));
const m07Before = m07.vocabularyItems.length;
const toRemove = ['advise', 'motivate', 'prohibit', 'decline'];
m07.vocabularyItems = m07.vocabularyItems.filter(item => !toRemove.includes(item.word));

const newWords = [
    { word: "mediate", phonetic: "/ˈmiːdieɪt/", english: "The lawyer will mediate the dispute between the two parties." },
    { word: "arbitrate", phonetic: "/ˈɑːrbɪtreɪt/", english: "An independent judge will arbitrate the disagreement fairly today." },
    { word: "intervene", phonetic: "/ˌɪntərˈviːn/", english: "The teacher had to intervene to stop the argument." },
    { word: "interfere", phonetic: "/ˌɪntərˈfɪr/", english: "Don't interfere in other people's personal business please." }
];
m07.vocabularyItems.push(...newWords);
fs.writeFileSync(m07Path, JSON.stringify(m07, null, 2));
console.log(`M07: ${m07Before} -> ${m07.vocabularyItems.length}`);

console.log('\n✅ Duplicates removed and replaced!');
