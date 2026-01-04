const fs = require('fs');
const path = require('path');

console.log('Fixing A1 overlaps and word counts...\n');

// Load A1 words for checking
const a1Words = new Set(JSON.parse(fs.readFileSync(
    path.join(__dirname, '../firestore_data/a1_word_list.json'),
    'utf8'
)));

// Fix M02 (needs 2 words)
const m02Path = path.join(__dirname, '../firestore_data/en_a2_m02.json');
const m02 = JSON.parse(fs.readFileSync(m02Path, 'utf8'));
m02.vocabularyItems.push(
    { word: "outlook", phonetic: "/ˈaʊtlʊk/", english: "The economic outlook for next year appears very positive indeed." },
    { word: "prospect", phonetic: "/ˈprɑːspekt/", english: "The prospect of traveling abroad excites me very much always." }
);
fs.writeFileSync(m02Path, JSON.stringify(m02, null, 2));
console.log(`✅ M02: Added 2 words (now ${m02.vocabularyItems.length})`);

// Fix M04 (needs 1 word)
const m04Path = path.join(__dirname, '../firestore_data/en_a2_m04.json');
const m04 = JSON.parse(fs.readFileSync(m04Path, 'utf8'));
m04.vocabularyItems.push(
    { word: "mindset", phonetic: "/ˈmaɪndset/", english: "A positive mindset helps you achieve your goals successfully always." }
);
fs.writeFileSync(m04Path, JSON.stringify(m04, null, 2));
console.log(`✅ M04: Added 1 word (now ${m04.vocabularyItems.length})`);

// Fix M05 (remove 3 A1 overlaps, add 6 new words)
const m05Path = path.join(__dirname, '../firestore_data/en_a2_m05.json');
const m05 = JSON.parse(fs.readFileSync(m05Path, 'utf8'));

// Remove A1 overlaps
m05.vocabularyItems = m05.vocabularyItems.filter(item => !a1Words.has(item.word.toLowerCase()));
console.log(`  M05: Removed ${97 - m05.vocabularyItems.length} A1 overlaps`);

// Add new words
const m05NewWords = [
    { word: "workplace", phonetic: "/ˈwɜːrkpleɪs/", english: "My workplace is located in the downtown business district area." },
    { word: "workspace", phonetic: "/ˈwɜːrkspeɪs/", english: "I need a clean workspace to concentrate on tasks." },
    { word: "foyer", phonetic: "/ˈfɔɪər/", english: "Wait in the foyer and someone will assist you." }
];
m05.vocabularyItems.push(...m05NewWords);
fs.writeFileSync(m05Path, JSON.stringify(m05, null, 2));
console.log(`✅ M05: Now has ${m05.vocabularyItems.length} words`);

// Fix M06 (remove 13 A1 overlaps, add 17 new words)
const m06Path = path.join(__dirname, '../firestore_data/en_a2_m06.json');
const m06 = JSON.parse(fs.readFileSync(m06Path, 'utf8'));

m06.vocabularyItems = m06.vocabularyItems.filter(item => !a1Words.has(item.word.toLowerCase()));
console.log(`  M06: Removed ${96 - m06.vocabularyItems.length} A1 overlaps`);

const m06NewWords = [
    { word: "trek", phonetic: "/trek/", "english": "We trekked through the mountains for five days straight." },
    { word: "wander", phonetic: "/ˈwɑːndər/", "english": "We wandered through the old city streets exploring shops." },
    { word: "roam", phonetic: "/roʊm/", "english": "Wild animals roam freely in the national park area." },
    { word: "traverse", phonetic: "/trəˈvɜːrs/", "english": "The explorers traversed the desert in search of water." },
    {
        word": "itinerary", phonetic: "/aɪˈtɪnəreri/", "english": "Our travel itinerary includes visits to five different cities."},
    { word: "embarkation", phonetic: "/ˌembɑːrˈkeɪʃən/", "english": "The embarkation point is at pier number seven today." },
    { word: "disembarkation", phonetic: "/ˌdɪsembɑːrˈkeɪʃən/", "english": "Disembarkation will begin shortly after we dock at port." },
    { word: "commuter", phonetic: "/kəˈmjuːtər/", "english": "The commuter train is crowded during rush hour mornings." },
    { word: "voyager", phonetic: "/ˈvɔɪɪdʒər/", "english": "The brave voyager sailed across the ocean alone successfully." },
    { word: "explorer", phonetic: "/ɪkˈsplɔːrər/", "english": "The explorer discovered new lands during his expedition journey." },
    { word: "wanderer", phonetic: "/ˈwɑːndərər/", "english": "The wanderer traveled from town to town without destination." },
    { word: "nomad", phonetic: "/ˈnoʊmæd/", "english": "Nomads move from place to place following their herds." },
    { word: "migrant", phonetic: "/ˈmaɪɡrənt/", "english": "Many migrants travel to find better job opportunities abroad." },
    { word: "emigrant", "phonetic": "/ˈemɪɡrənt/", "english": "Emigrants leave their home country to live elsewhere permanently." },
    { word: "immigrant", "phonetic": "/ˈɪmɪɡrənt/", "english": "Immigrants bring diverse cultures to their new countries always." },
    { word: "refugee", "phonetic": "/ˌrefjuˈdʒiː/", "english": "Refugees flee their countries due to war or persecution." },
    { word: "expatriate", "phonetic": "/eksˈpeɪtriət/", "english": "Many expatriates work in foreign countries for international companies." }
];
m06.vocabularyItems.push(...m06NewWords);
fs.writeFileSync(m06Path, JSON.stringify(m06, null, 2));
console.log(`✅ M06: Now has ${m06.vocabularyItems.length} words`);

// Fix M07 (remove 10 A1 overlaps, add 15 new words)
const m07Path = path.join(__dirname, '../firestore_data/en_a2_m07.json');
const m07 = JSON.parse(fs.readFileSync(m07Path, 'utf8'));

m07.vocabularyItems = m07.vocabularyItems.filter(item => !a1Words.has(item.word.toLowerCase()));
console.log(`  M07: Removed ${95 - m07.vocabularyItems.length} A1 overlaps`);

const m07NewWords = [
    { word: "salute", phonetic: "/səˈluːt/", "english": "Soldiers salute their commanding officers as a sign of respect." },
    { word: "bow", phonetic: "/baʊ/", "english": "In Japan people bow when greeting each other politely." },
    { word: "handshake", phonetic: "/ˈhændʃeɪk/", "english": "A firm handshake shows confidence during business meetings always." },
    { word: "embrace", phonetic: "/ɪmˈbreɪs/", "english": "Old friends embraced warmly after years of being apart." },
    { word: "hug", phonetic: "/hʌɡ/", "english": "She gave her mother a big hug when arriving." },
    { word: "nod", phonetic: "/nɑːd/", "english": "He nodded his head to show agreement with proposal." },
    { word: "wink", phonetic: "/wɪŋk/", "english": "She winked at me across the room playfully yesterday." },
    { word: "gesture", phonetic: "/ˈdʒestʃər/", "english": "He made a gesture with his hand to signal." },
    { word: "signal", phonetic: "/ˈsɪɡnəl/", "english": "The referee signaled the start of the match clearly." },
    { word: "beckon", phonetic: "/ˈbekən/", "english": "She beckoned me to come closer with her hand." },
    { word: "summon", phonetic: "/ˈsʌmən/", "english": "The king summoned his advisors to the throne room." },
    { word: "convene", phonetic: "/kənˈviːn/", "english": "The committee will convene next week to discuss matters." },
    { word: "assemble", phonetic: "/əˈsembəl/", "english": "Students assembled in the hall for the important announcement." },
    { word: "gather", phonetic: "/ˈɡæðər/", "english": "Family members gathered for the annual reunion celebration yesterday." },
    { word: "congregate", phonetic: "/ˈkɑːŋɡrɪɡeɪt/", "english": "People congregated in the square to hear the speech." }
];
m07.vocabularyItems.push(...m07NewWords);
fs.writeFileSync(m07Path, JSON.stringify(m07, null, 2));
console.log(`✅ M07: Now has ${m07.vocabularyItems.length} words`);

console.log('\n✅ All fixes complete!');
