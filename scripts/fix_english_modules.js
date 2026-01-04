const fs = require('fs');
const path = require('path');

console.log('Fixing English A1 Modules 2-4...\n');

// Fix Module 2 - add 1 missing word
const m2Path = path.join(__dirname, '../firestore_data/en_a1_m02.json');
const m2Data = JSON.parse(fs.readFileSync(m2Path, 'utf8'));
m2Data.vocabularyItems.push(
    { "word": "kind", "phonetic": "/kaɪnd/", "english": "She is a very kind person." }
);
fs.writeFileSync(m2Path, JSON.stringify(m2Data, null, 4));
console.log(`✅ Module 2: Added 1 word (now ${m2Data.vocabularyItems.length} words)`);

// Fix Module 3 - remove duplicate "today" and add 5 new words
const m3Path = path.join(__dirname, '../firestore_data/en_a1_m03.json');
const m3Data = JSON.parse(fs.readFileSync(m3Path, 'utf8'));

// Find and remove duplicate "today" (keep only first occurrence)
const todayIndices = [];
m3Data.vocabularyItems.forEach((item, index) => {
    if (item.word.toLowerCase() === 'today') {
        todayIndices.push(index);
    }
});
if (todayIndices.length > 1) {
    m3Data.vocabularyItems.splice(todayIndices[1], 1);
    console.log(`  Removed duplicate "today" at index ${todayIndices[1]}`);
}

// Add 5 new words
const newWords = [
    { "word": "repeat", "phonetic": "/rɪˈpiːt/", "english": "Please repeat that again." },
    { "word": "change", "phonetic": "/tʃeɪndʒ/", "english": "I need to change my schedule." },
    { "word": "move", "phonetic": "/muːv/", "english": "Let's move to the next topic." },
    { "word": "open", "phonetic": "/ˈoʊpən/", "english": "The store will open soon." },
    { "word": "close", "phonetic": "/kloʊz/", "english": "Please close the door." }
];
m3Data.vocabularyItems.push(...newWords);
fs.writeFileSync(m3Path, JSON.stringify(m3Data, null, 4));
console.log(`✅ Module 3: Removed duplicate, added 5 words (now ${m3Data.vocabularyItems.length} words)`);

// Fix Module 4 - add 4 missing words
const m4Path = path.join(__dirname, '../firestore_data/en_a1_m04.json');
const m4Data = JSON.parse(fs.readFileSync(m4Path, 'utf8'));
const newM4Words = [
    { "word": "prefer", "phonetic": "/prɪˈfɜːr/", "english": "I prefer tea over coffee." },
    { "word": "choose", "phonetic": "/tʃuːz/", "english": "Please choose your meal." },
    { "word": "enjoy", "phonetic": "/ɪnˈdʒɔɪ/", "english": "I enjoy eating fresh fruit." },
    { "word": "try", "phonetic": "/traɪ/", "english": "You should try this dish!" }
];
m4Data.vocabularyItems.push(...newM4Words);
fs.writeFileSync(m4Path, JSON.stringify(m4Data, null, 4));
console.log(`✅ Module 4: Added 4 words (now ${m4Data.vocabularyItems.length} words)`);

console.log('\n✅ All modules fixed! Re-running audit...\n');
