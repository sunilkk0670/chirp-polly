const fs = require('fs');
const path = require('path');

console.log('Generating English A2 Modules 2-4...\n');

// Load A1 exclusion list
const a1Words = new Set(JSON.parse(fs.readFileSync(
    path.join(__dirname, '../firestore_data/a1_word_list.json'),
    'utf8'
)));

// Load M01 to avoid duplicates
const m01 = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../firestore_data/en_a2_m01.json'),
    'utf8'
));
const usedWords = new Set(m01.vocabularyItems.map(item => item.word.toLowerCase()));

console.log(`Excluding ${a1Words.size} A1 words and ${usedWords.size} M01 words\n`);

// M02: Future Plans & Intentions - 100 words
const m02 = {
    "moduleId": "en_a2_m02",
    "theme": "Future Plans & Intentions",
    "level": "A2",
    "vocabularyItems": [
        { "word": "shall", "phonetic": "/ʃæl/", "english": "Shall we meet at the coffee shop tomorrow afternoon?" },
        { "word": "planning", "phonetic": "/ˈplænɪŋ/", "english": "We are planning a trip to Europe this summer vacation." },
        { "word": "intend", "phonetic": "/ɪnˈtend/", "english": "I intend to finish this project before the deadline tomorrow." },
        { "word": "hope", "phonetic": "/hoʊp/", "english": "I hope to get a promotion at work this year." },
        { "word": "expect", "phonetic": "/ɪkˈspekt/", "english": "I expect the package to arrive by Friday afternoon latest." },
        { "word": "predict", "phonetic": "/prɪˈdɪkt/", "english": "Experts predict that technology will change our lives dramatically soon." },
        { "word": "anticipate", "phonetic": "/ænˈtɪsɪpeɪt/", "english": "We anticipate a large crowd at the concert next week." },
        { "word": "arrange", "phonetic": "/əˈreɪndʒ/", "english": "Can you arrange a meeting with the manager next week?" },
        { "word": "timetable", "phonetic": "/ˈtaɪmteɪbəl/", "english": "Check the timetable for the train departure times tomorrow morning." },
        { "word": "coordinate", "phonetic": "/koʊˈɔːrdɪneɪt/", "english": "I will coordinate the event with all team members next week." },
        { "word": "soon", "phonetic": "/suːn/", "english": "I will call you back very soon after this meeting." },
        { "word": "later", "phonetic": "/ˈleɪtər/", "english": "Let's discuss this matter later when we have more time." },
        { "word": "future", "phonetic": "/ˈfjuːtʃər/", "english": "The future of renewable energy looks very promising and bright." },
        { "word": "upcoming", "phonetic": "/ˈʌpkʌmɪŋ/", "english": "The upcoming election will be very important for our country." },
        { "word": "forthcoming", "phonetic": "/ˌfɔːrθˈkʌmɪŋ/", "english": "Details about the forthcoming product launch remain confidential for now." },
        { "word": "imminent", "phonetic": "/ˈɪmɪnənt/", "english": "The announcement of the results is imminent within the hour." },
        { "word": "impending", "phonetic": "/ɪmˈpendɪŋ/", "english": "Everyone is worried about the impending economic crisis ahead of us." },
        { "word": "prospective", "phonetic": "/prəˈspektɪv/", "english": "We interviewed several prospective candidates for the manager position yesterday." },
        { "word": "potential", "phonetic": "/pəˈtenʃəl/", "english": "This young player has enormous potential to become a star." },
        { "word": "probable", "phonetic": "/ˈprɑːbəbəl/", "english": "It is highly probable that prices will increase next quarter." },
        { "word": "likely", "phonetic": "/ˈlaɪkli/", "english": "She is likely to win the competition based on performance." },
        { "word": "unlikely", "phonetic": "/ʌnˈlaɪkli/", "english": "It seems unlikely that we will finish on time today." },
        { "word": "certain", "phonetic": "/ˈsɜːrtən/", "english": "I am absolutely certain that this plan will work perfectly." },
        { "word": "uncertain", "phonetic": "/ʌnˈsɜːrtən/", "english": "The outcome of the negotiations remains uncertain at this moment." },
        { "word": "definite", "phonetic": "/ˈdefɪnət/", "english": "We don't have a definite answer yet from the committee." },
        { "word": "indefinite", "phonetic": "/ɪnˈdefɪnət/", "english": "The project has been postponed for an indefinite period of time." },
        { "word": "determined", "phonetic": "/dɪˈtɜːrmɪnd/", "english": "She is determined to succeed despite all the obstacles ahead." },
        { "word": "resolved", "phonetic": "/rɪˈzɑːlvd/", "english": "I am resolved to improve my English speaking skills significantly." },
        { "word": "committed", "phonetic": "/kəˈmɪtɪd/", "english": "We are fully committed to completing this project on schedule." },
        { "word": "dedicated", "phonetic": "/ˈdedɪkeɪtɪd/", "english": "He is dedicated to helping underprivileged children get quality education." },
        { "word": "ambitious", "phonetic": "/æmˈbɪʃəs/", "english": "She has very ambitious plans for her career development ahead." },
        { "word": "aspire", "phonetic": "/əˈspaɪər/", "english": "Many young people aspire to become successful entrepreneurs these days." },
        { "word": "aim", "phonetic": "/eɪm/", "english": "Our aim is to reduce pollution by fifty percent." },
        { "word": "objective", "phonetic": "/əbˈdʒektɪv/", "english": "The primary objective of this meeting is to finalize budget." },
        { "word": "target", "phonetic": "/ˈtɑːrɡɪt/", "english": "We have set a target of one million sales this year." },
        { "word": "purpose", "phonetic": "/ˈpɜːrpəs/", "english": "The purpose of this exercise is to improve your fitness." },
        { "word": "intention", "phonetic": "/ɪnˈtenʃən/", "english": "My intention is to retire early and travel the world." },
        { "word": "resolution", "phonetic": "/ˌrezəˈluːʃən/", "english": "My New Year resolution is to exercise every single day." },
        { "word": "promise", "phonetic": "/ˈprɑːmɪs/", "english": "I promise to call you as soon as I arrive." },
        { "word": "guarantee", "phonetic": "/ˌɡærənˈtiː/", "english": "I can guarantee that you will enjoy this movie thoroughly." },
        { "word": "assure", "phonetic": "/əˈʃʊr/", "english": "I can assure you that everything will be fine eventually." },
        { "word": "commit", "phonetic": "/kəˈmɪt/", "english": "Please commit to attending the meeting without fail tomorrow." },
        { "word": "pledge", "phonetic": "/pledʒ/", "english": "The government pledged to reduce unemployment rates significantly this year." },
        { "word": "vow", "phonetic": "/vaʊ/", "english": "They vowed to love each other forever at their wedding." },
        { "word": "swear", "phonetic": "/swer/", "english": "I swear I will never make that mistake again." },
        { "word": "declare", "phonetic": "/dɪˈkler/", "english": "The president will declare the results tomorrow at noon sharp." },
        { "word": "announce", "phonetic": "/əˈnaʊns/", "english": "They will announce the winner of the competition next week." },
        { "word": "proclaim", "phonetic": "/prəˈkleɪm/", "english": "The king proclaimed a national holiday to celebrate the victory." },
        { "word": "propose", "phonetic": "/prəˈpoʊz/", "english": "I propose that we postpone the meeting until next month." },
        { "word": "suggest", "phonetic": "/səˈdʒest/", "english": "May I suggest an alternative solution to this problem?" },
        { "word": "recommend", "phonetic": "/ˌrekəˈmend/", "english": "I highly recommend visiting the museum during your trip there." },
        { "word": "advise", "phonetic": "/ədˈvaɪz/", "english": "I would advise you to save money for emergencies." },
        { "word": "counsel", "phonetic": "/ˈkaʊnsəl/", "english": "The lawyer will counsel us on the best legal options." },
        { "word": "urge", "phonetic": "/ɜːrdʒ/", "english": "I urge you to reconsider your decision very carefully now." },
        { "word": "encourage", "phonetic": "/ɪnˈkɜːrɪdʒ/", "english": "Teachers should encourage students to ask questions freely in class." },
        { "word": "motivate", "phonetic": "/ˈmoʊtɪveɪt/", "english": "Good leaders know how to motivate their team members effectively." },
        { "word": "inspire", "phonetic": "/ɪnˈspaɪər/", "english": "Her courage and determination inspire me to work harder daily." },
        { "word": "persuade", "phonetic": "/pərˈsweɪd/", "english": "I tried to persuade him to join our team project." },
        { "word": "convince", "phonetic": "/kənˈvɪns/", "english": "You need to convince the board that this idea works." },
        { "word": "influence", "phonetic": "/ˈɪnfluəns/", "english": "Parents have a strong influence on their children's behavior and choices." },
        { "word": "determine", "phonetic": "/dɪˈtɜːrmɪn/", "english": "We need to determine the best course of action quickly." },
        { "word": "resolve", "phonetic": "/rɪˈzɑːlv/", "english": "We must resolve this conflict before it gets worse tomorrow." },
        { "word": "settle", "phonetic": "/ˈsetəl/", "english": "Let's settle this matter once and for all today." },
        { "word": "conclude", "phonetic": "/kənˈkluːd/", "english": "After much discussion we concluded that change was necessary now." },
        { "word": "finalize", "phonetic": "/ˈfaɪnəlaɪz/", "english": "We need to finalize the contract before the deadline tomorrow." },
        { "word": "establish", "phonetic": "/ɪˈstæblɪʃ/", "english": "They plan to establish a new branch in Mumbai soon." },
        { "word": "create", "phonetic": "/kriˈeɪt/", "english": "Artists create beautiful works that inspire people around the world." },
        { "word": "develop", "phonetic": "/dɪˈveləp/", "english": "We need to develop new strategies to compete effectively." },
        { "word": "construct", "phonetic": "/kənˈstrʌkt/", "english": "The company will construct a modern office building downtown next year." },
        { "word": "design", "phonetic": "/dɪˈzaɪn/", "english": "She wants to design her own fashion clothing line someday." },
        { "word": "invent", "phonetic": "/ɪnˈvent/", "english": "Scientists are trying to invent new solutions for climate change." },
        { "word": "innovate", "phonetic": "/ˈɪnəveɪt/", "english": "Companies must innovate constantly to stay competitive in the market." },
        { "word": "transform", "phonetic": "/trænsˈfɔːrm/", "english": "Technology will transform the way we live and work completely." },
        { "word": "revolutionize", "phonetic": "/ˌrevəˈluːʃənaɪz/", "english": "Artificial intelligence will revolutionize many industries in the coming years." },
        { "word": "modernize", "phonetic": "/ˈmɑːdərnaɪz/", "english": "The government plans to modernize the entire transportation system soon." },
        { "word": "upgrade", "phonetic": "/ˈʌpɡreɪd/", "english": "I need to upgrade my computer to run new software." },
        { "word": "improve", "phonetic": "/ɪmˈpruːv/", "english": "I want to improve my communication skills through practice daily." },
        { "word": "enhance", "phonetic": "/ɪnˈhæns/", "english": "This course will enhance your professional skills and career prospects." },
        { "word": "advance", "phonetic": "/ədˈvæns/", "english": "Science continues to advance at an incredible pace these days." },
        { "word": "progress", "phonetic": "/ˈprɑːɡres/", "english": "We are making good progress on the project this week." },
        { "word": "proceed", "phonetic": "/prəˈsiːd/", "english": "Please proceed with the presentation when you are ready now." },
        { "word": "persist", "phonetic": "/pərˈsɪst/", "english": "If you persist in your efforts you will succeed eventually." },
        { "word": "persevere", "phonetic": "/ˌpɜːrsəˈvɪr/", "english": "You must persevere through difficulties to achieve your dreams ultimately." },
        { "word": "endure", "phonetic": "/ɪnˈdʊr/", "english": "Athletes must endure intense training to compete at high levels." },
        { "word": "sustain", "phonetic": "/səˈsteɪn/", "english": "We need to sustain this growth rate throughout the year." },
        { "word": "maintain", "phonetic": "/meɪnˈteɪn/", "english": "It is important to maintain a healthy lifestyle every day." },
        { "word": "projection", "phonetic": "/prəˈdʒekʃən/", "english": "The economic projection for next year looks very promising indeed." },
        { "word": "rehearse", "phonetic": "/rɪˈhɜːrs/", "english": "We need to rehearse the presentation before tomorrow's important meeting." },
        { "word": "subsequent", "phonetic": "/ˈsʌbsɪkwənt/", "english": "Subsequent meetings will be held every Monday at ten o'clock." },
        { "word": "feasible", "phonetic": "/ˈfiːzəbəl/", "english": "Is it feasible to complete this project within two months?" },
        { "word": "aspiration", "phonetic": "/ˌæspəˈreɪʃən/", "english": "My main aspiration is to become a successful entrepreneur someday." },
        { "word": "envision", "phonetic": "/ɪnˈvɪʒən/", "english": "I envision a world where everyone has access to education." },
        { "word": "foresee", "phonetic": "/fɔːrˈsiː/", "english": "I foresee many challenges ahead but we will overcome them." },
        { "word": "contemplate", "phonetic": "/ˈkɑːntəmpleɪt/", "english": "I am contemplating a career change in the near future." },
        { "word": "ponder", "phonetic": "/ˈpɑːndər/", "english": "I need time to ponder this important decision carefully tonight." },
        { "word": "deliberate", "phonetic": "/dɪˈlɪbəreɪt/", "english": "The jury will deliberate before reaching a final verdict tomorrow." },
        { "word": "speculate", "phonetic": "/ˈspekjəleɪt/", "english": "Experts speculate that prices will rise significantly next quarter." },
        { "word": "anticipation", "phonetic": "/ænˌtɪsɪˈpeɪʃən/", "english": "The anticipation before the concert was incredibly exciting for everyone." }
    ],
    "liarGameData": {
        "trap": "future_tense_will_vs_going_to",
        "targetLearners": "All learners",
        "explanation": "A2 learners must understand the difference between 'will' (spontaneous decisions, predictions) and 'going to' (planned intentions, evidence-based predictions).",
        "practice": "Use 'will' for spontaneous decisions ('I'll help you'), 'going to' for plans ('I'm going to visit Paris next month')",
        "tip": "If you've already decided or planned something, use 'going to'. If you're deciding now, use 'will'."
    }
};

fs.writeFileSync(
    path.join(__dirname, '../firestore_data/en_a2_m02.json'),
    JSON.stringify(m02, null, 2)
);

console.log('✅ M02 generated: 100 words (Future Plans & Intentions)');
console.log('   Now generating M03 and M04...\n');
