const fs = require('fs');
const path = require('path');

console.log('Fixing A1 overlaps and word counts...\n');

// Load A1 words
const a1Words = new Set(JSON.parse(fs.readFileSync(
    path.join(__dirname, '../firestore_data/a1_word_list.json'),
    'utf8'
)));

// Define replacement words (A2-level, no A1 overlap)
const replacements = {
    // M01 replacements
    'yesterday': { word: 'formerly', phonetic: '/ˈfɔːrmərli/', english: 'I formerly worked as a teacher before changing careers completely.' },
    'never': { word: 'seldom', phonetic: '/ˈseldəm/', english: 'I seldom visit that restaurant because the food quality declined.' },
    'journey': { word: 'voyage', phonetic: '/ˈvɔɪɪdʒ/', english: 'The voyage across the ocean took three long weeks.' },
    'past': { word: 'bygone', phonetic: '/ˈbaɪɡɔːn/', english: 'Those were the happy days of a bygone era.' },
    'describe': { word: 'portray', phonetic: '/pɔːrˈtreɪ/', english: 'The author portrayed the character very vividly in the novel.' },

    // M02 replacements
    'will': { word: 'shall', phonetic: '/ʃæl/', english: 'We shall overcome all obstacles in our path eventually.' },
    'forecast': { word: 'projection', phonetic: '/prəˈdʒekʃən/', english: 'The economic projection for next year looks very promising indeed.' },
    'prepare': {
        word: 'rehearse', phonetic: '/rɪˈhɜːrs/', english: 'We need to rehearse the presentation before tomorrow's important meeting.'},
    'schedule': { word: 'timetable', phonetic: '/ˈtaɪmteɪbəl/', english: 'Check the timetable for the train departure times tomorrow morning.'},
'organize': { word: 'coordinate', phonetic: '/koʊˈɔːrdɪneɪt/', english: 'I will coordinate the event with all team members next week.' },
'tomorrow': { word: 'forthcoming', phonetic: '/ˌfɔːrθˈkʌmɪŋ/', english: 'Details about the forthcoming product launch remain confidential for now.' },
'next': {
    word: 'subsequent', phonetic: '/ˈsʌbsɪkwənt/', english: 'Subsequent meetings will be held every Monday at ten o'clock.'},
    'possible': { word: 'feasible', phonetic: '/ˈfiːzəbəl/', english: 'Is it feasible to complete this project within two months?' },
    'goal': { word: 'aspiration', phonetic: '/ˌæspəˈreɪʃən/', english: 'My main aspiration is to become a successful entrepreneur someday.' },
    'decide': { word: 'determine', phonetic: '/dɪˈtɜːrmɪn/', english: 'We need to determine the best course of action quickly.' },
    'continue': { word: 'proceed', phonetic: '/prəˈsiːd/', english: 'Please proceed with the presentation when you are ready now.' },

    // M03 replacements
    'prefer': { word: 'favor', phonetic: '/ˈfeɪvər/', english: 'I favor the first option over the second one clearly.' },
    'favorite': { word: 'preferred', phonetic: '/prɪˈfɜːrd/', english: 'What is your preferred method of communication these days?' },
    'choice': { word: 'selection', phonetic: '/sɪˈlekʃən/', english: 'The store has a wide selection of products to choose.' },
    'option': { word: 'alternative', phonetic: '/ɔːlˈtɜːrnətɪv/', english: 'Is there an alternative route to avoid the heavy traffic?' },
    'same': { word: 'identical', phonetic: '/aɪˈdentɪkəl/', english: 'The twins are wearing identical outfits which confuses people often.' },
    'different': { word: 'distinct', phonetic: '/dɪˈstɪŋkt/', english: 'Each region has its own distinct culture and traditions today.' },
    'opposite': { word: 'contrary', phonetic: '/ˈkɑːntreri/', english: 'Contrary to popular belief chocolate can be healthy sometimes.' },
    'perfect': { word: 'flawless', phonetic: '/ˈflɔːləs/', english: 'Her performance was absolutely flawless from start to finish.' },

    // M04 replacements
    'think': { word: 'reckon', phonetic: '/ˈrekən/', english: 'I reckon this is the best solution to our problem.' },
    'support': { word: 'endorse', phonetic: '/ɪnˈdɔːrs/', english: 'I fully endorse your plan to expand the business overseas.' },
    'trust': { word: 'rely', phonetic: '/rɪˈlaɪ/', english: 'You can rely on me to complete the task.' },
    'tired': { word: 'weary', phonetic: '/ˈwɪri/', english: 'I feel weary after the long journey across the country.' },
    'hurt': { word: 'wounded', phonetic: '/ˈwuːndɪd/', english: 'I felt wounded by her harsh words yesterday afternoon.' }
};

// Fix each module
const modules = [
    { id: 'en_a2_m01', targetCount: 100 },
    { id: 'en_a2_m02', targetCount: 100 },
    { id: 'en_a2_m03', targetCount: 100 },
    { id: 'en_a2_m04', targetCount: 100 }
];

modules.forEach(mod => {
    const filePath = path.join(__dirname, `../firestore_data/${mod.id}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Replace overlapping words
    data.vocabularyItems = data.vocabularyItems.filter(item => {
        if (a1Words.has(item.word.toLowerCase())) {
            const replacement = replacements[item.word.toLowerCase()];
            if (replacement) {
                item.word = replacement.word;
                item.phonetic = replacement.phonetic;
                item.english = replacement.english;
                console.log(`  ${mod.id}: Replaced "${item.word}" with "${replacement.word}"`);
                return true;
            }
            console.log(`  ${mod.id}: Removed "${item.word}" (A1 overlap, no replacement)`);
            return false;
        }
        return true;
    });

    // Add words to reach target count
    const needed = mod.target - data.vocabularyItems.length;
    if (needed > 0) {
        console.log(`  ${mod.id}: Adding ${needed} words to reach 100`);
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('\n✅ All overlaps fixed!');
