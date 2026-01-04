const fs = require('fs');
const path = require('path');

console.log('Fixing final 5 duplicates...\n');

// M06: Remove "timetable" (already in M02)
const m06Path = path.join(__dirname, '../firestore_data/en_a2_m06.json');
const m06 = JSON.parse(fs.readFileSync(m06Path, 'utf8'));
m06.vocabularyItems = m06.vocabularyItems.filter(item => item.word !== 'timetable');
m06.vocabularyItems.push({ word: "itinerary", phonetic: "/aɪˈtɪnəreri/", english: "Our travel itinerary includes visits to five different cities." });
fs.writeFileSync(m06Path, JSON.stringify(m06, null, 2));
console.log('✅ M06: Replaced "timetable" with "itinerary"');

// M07: Remove duplicates (already in M02/M04)
const m07Path = path.join(__dirname, '../firestore_data/en_a2_m07.json');
const m07 = JSON.parse(fs.readFileSync(m07Path, 'utf8'));

const duplicates = ['counsel', 'encourage', 'forbid', 'reject'];
m07.vocabularyItems = m07.vocabularyItems.filter(item => !duplicates.includes(item.word));

// Add replacements
const replacements = [
    { word: "advise", phonetic: "/ədˈvaɪz/", english: "I would advise you to save money for emergencies." },
    { word: "motivate", phonetic: "/ˈmoʊtɪveɪt/", english: "Good leaders know how to motivate their team members effectively." },
    { word: "prohibit", phonetic: "/prəˈhɪbɪt/", english: "The law prohibits smoking in all public indoor spaces." },
    { word: "decline", phonetic: "/dɪˈklaɪn/", english: "I had to decline the invitation due to scheduling." }
];
m07.vocabularyItems.push(...replacements);
fs.writeFileSync(m07Path, JSON.stringify(m07, null, 2));
console.log('✅ M07: Replaced 4 duplicates with new words');

console.log('\n✅ All duplicates fixed!');
