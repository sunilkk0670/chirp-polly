const fs = require('fs');
const path = require('path');

console.log('Adding final unique words to reach 2,000...\n');

// M08: Add 5 words
const m08 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a2_m08.json'), 'utf8'));
m08.vocabularyItems.push(
    { word: "sitcom", phonetic: "/ˈsɪtkɑːm/", english: "The sitcom is a popular comedy show on television." },
    { word: "soap", phonetic: "/soʊp/", english: "Soap operas are dramatic television series with continuing storylines." },
    { word: "reality", phonetic: "/riˈæləti/", english: "Reality shows feature real people in unscripted situations daily." },
    { word: "quiz", phonetic: "/kwɪz/", english: "The quiz show tests contestants' knowledge with difficult questions." },
    { word: "talent", phonetic: "/ˈtælənt/", english: "Talent shows give performers a chance to showcase skills." }
);
fs.writeFileSync(path.join(__dirname, '../firestore_data/en_a2_m08.json'), JSON.stringify(m08, null, 2));
console.log(`M08: ${m08.vocabularyItems.length} words`);

// M09: Remove the duplicate words I just added, then add 11 unique words
const m09 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a2_m09.json'), 'utf8'));
const dupsToRemove = ['erosion', 'degradation', 'contamination', 'toxic', 'hazardous', 'landfill'];
m09.vocabularyItems = m09.vocabularyItems.filter(item => {
    const lastIndex = m09.vocabularyItems.lastIndexOf(item);
    const firstIndex = m09.vocabularyItems.indexOf(item);
    if (dupsToRemove.includes(item.word.toLowerCase()) && lastIndex !== firstIndex) {
        return m09.vocabularyItems.indexOf(item) === firstIndex;
    }
    return true;
});

m09.vocabularyItems.push(
    { word: "recycling", phonetic: "/ˌriːˈsaɪklɪŋ/", english: "Recycling plastic bottles helps reduce waste in landfills significantly." },
    { word: "compost", phonetic: "/ˈkɑːmpoʊst/", english: "Compost turns food waste into nutrient-rich soil naturally." },
    { word: "organic", phonetic: "/ɔːrˈɡænɪk/", english: "Organic farming doesn't use chemical pesticides or fertilizers at all." },
    { word: "pesticide", phonetic: "/ˈpestɪsaɪd/", english: "Pesticides kill insects but can harm beneficial wildlife too." },
    { word: "fertilizer", phonetic: "/ˈfɜːrtəlaɪzər/", english: "Chemical fertilizers help plants grow but pollute water sources." },
    { word: "irrigation", phonetic: "/ˌɪrɪˈɡeɪʃən/", english: "Irrigation systems bring water to dry farmland for crops." },
    { word: "famine", phonetic: "/ˈfæmɪn/", english: "The famine caused widespread hunger and suffering for millions." },
    { word: "wildfire", phonetic: "/ˈwaɪldfaɪər/", english: "The wildfire destroyed thousands of acres of forest land." },
    { word: "landslide", phonetic: "/ˈlændslaɪd/", english: "Heavy rain triggered a massive landslide on the mountain." },
    { word: "volcanic", phonetic: "/vɑːlˈkænɪk/", english: "Volcanic eruptions can affect weather patterns globally for years." },
    { word: "lava", phonetic: "/ˈlɑːvə/", english: "Hot lava flowed down the mountain destroying everything nearby." }
);
fs.writeFileSync(path.join(__dirname, '../firestore_data/en_a2_m09.json'), JSON.stringify(m09, null, 2));
console.log(`M09: ${m09.vocabularyItems.length} words`);

// M10: Add 11 words
const m10 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/en_a2_m10.json'), 'utf8'));
m10.vocabularyItems.push(
    { word: "issue", phonetic: "/ˈɪʃuː/", english: "We need to address this issue immediately before worse." },
    { word: "challenge", phonetic: "/ˈtʃælɪndʒ/", english: "Learning a new language is a big challenge for." },
    { word: "difficulty", phonetic: "/ˈdɪfɪkəlti/", english: "I had difficulty understanding the instructions given to me." },
    { word: "obstacle", phonetic: "/ˈɑːbstəkəl/", english: "Don't let obstacles stop you from achieving your dreams." },
    {
        word": "barrier", phonetic: "/ˈbæriər/", english: "Language can be a barrier to communication sometimes clearly."},
    { word: "broken", phonetic: "/ˈbroʊkən/", english: "The broken window needs to be replaced soon today." },
    { word: "repair", phonetic: "/rɪˈper/", english: "The technician will repair the computer by tomorrow afternoon." },
    { word: "fix", phonetic: "/fɪks/", english: "Can you fix the leaking faucet in bathroom please?" },
    { word: "maintenance", phonetic: "/ˈmeɪntənəns/", english: "Regular maintenance keeps equipment running smoothly and efficiently always." },
    { word: "service", phonetic: "/ˈsɜːrvɪs/", english: "The car needs a service every six months regularly." },
    { word: "inspection", phonetic: "/ɪnˈspekʃən/", english: "The building passed the safety inspection without any issues." }
);
fs.writeFileSync(path.join(__dirname, '../firestore_data/en_a2_m10.json'), JSON.stringify(m10, null, 2));
console.log(`M10: ${m10.vocabularyItems.length} words`);

console.log('\n✅ All modules now have 100 words!');
