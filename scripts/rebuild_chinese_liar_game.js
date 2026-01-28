const fs = require('fs');
const path = require('path');

const modules = [
    { id: 'zh_a1_m01', theme: 'First Steps', order: 1 },
    { id: 'zh_a1_m02', theme: 'Family & Friends', order: 2 },
    { id: 'zh_a1_m03', theme: 'Vita Quotidiana', order: 3 },
    { id: 'zh_a1_m04', theme: 'Tempo Libero & Luoghi', order: 4 },
    { id: 'zh_a1_m05', theme: 'Casa & Shopping', order: 5 },
    { id: 'zh_a1_m06', theme: 'Viaggi & Trasporti', order: 6 }
];

// Rich Liar Game Metadata for Module Level
const liarGameMetadata = {
    'zh_a1_m01': {
        "topic": "Chinese Tonal Traps",
        "question": "If you want to say 'Mother', which tone should you use for 'ma'?",
        "options": [
            "1st Tone (High level)",
            "2nd Tone (Rising)",
            "3rd Tone (Falling-rising)",
            "4th Tone (Falling)"
        ],
        "correct_answer_index": 0,
        "explanation": "In Chinese, 妈妈 (māma) uses the 1st tone. Be careful: 马 (mǎ) with the 3rd tone means 'horse'! Confusing these can lead to saying things like 'My horse is beautiful' when you meant your mother."
    },
    'zh_a1_m02': {
        "topic": "Numbers & Confusable Sounds",
        "question": "Which character represents the number Ten (10)?",
        "options": [
            "十 (shí)",
            "四 (sì)",
            "二 (èr)",
            "六 (liù)"
        ],
        "correct_answer_index": 0,
        "explanation": "十 (shí) is 10 and 四 (sì) is 4. They are often confused in fast speech. Remember: 十 is a cross shape, like a plus sign."
    },
    'zh_a1_m03': {
        "topic": "Literal vs. Meaning",
        "question": "What does the word '东西' (dōngxi) mean in everyday life?",
        "options": [
            "East and West",
            "Left and Right",
            "Things / Stuff",
            "Compass"
        ],
        "correct_answer_index": 2,
        "explanation": "While '东' is East and '西' is West, together '东西' mean 'things' or 'objects'. It is one of the most common compound words in Mandarin!"
    },
    'zh_a1_m04': {
        "topic": "Pronunciation Nuances",
        "question": "How do you say 'Cheap' in Chinese?",
        "options": [
            "biànyi",
            "piányi",
            "fāngbiàn",
            "hǎo de"
        ],
        "correct_answer_index": 1,
        "explanation": "The character 便 is a polyphone. In 方便 (fāngbiàn - convenient) it is 'biàn', but in 便宜 (piányi - cheap) it must be pronounced 'pián'."
    },
    'zh_a1_m05': {
        "topic": "Shopping Vocabulary",
        "question": "What is the difference between 买 (mǎi) and 卖 (mài)?",
        "options": [
            "One is to buy, one is to sell",
            "One is to go, one is to come",
            "One is big, one is small",
            "They are the same"
        ],
        "correct_answer_index": 0,
        "explanation": "买 (mǎi) with the 3rd tone is 'to buy'. 卖 (mài) with the 4th tone is 'to sell'. Notice the extra symbol on top of 卖 – selling adds stuff to your counter!"
    },
    'zh_a1_m06': {
        "topic": "Travel & Transport",
        "question": "Does '马路' (mǎlù) literally involve horses today?",
        "options": [
            "Yes, only for horses",
            "No, it means any city road",
            "Yes, for horse racing",
            "It means a stable"
        ],
        "correct_answer_index": 1,
        "explanation": "Though it literally means 'horse road', today '马路' is the standard term for a public road or street. Don't go looking for actual horses on the mǎlù!"
    }
};

// Trap definitions for positions 95, 96, 97
const moduleTraps = {
    'zh_a1_m01': [
        { word: "问", translation: "To ask", phonetic: "Wèn", liarGame: true, explanation: "In Chinese, 问 (wèn) means 'To ask', NOT 'To kiss' (吻 - wěn). These characters are often confused due to tonal similarity!" },
        { word: "买", translation: "To buy", phonetic: "Mǎi", liarGame: true, explanation: "Be careful! 买 (mǎi, 3rd tone) means 'to buy', while 卖 (mài, 4th tone) means 'to sell'. They look almost identical except for the top stroke!" },
        { word: "妈妈", translation: "Mother", phonetic: "Māma", liarGame: true, explanation: "妈妈 (māma) means Mother. Don't confuse it with 马 (mǎ), which means Horse! Tones matter: High level vs Falling-rising." }
    ],
    'zh_a1_m02': [
        { word: "卖", translation: "To sell", phonetic: "Mài", liarGame: true, explanation: "卖 (mài, 4th tone) means 'to sell'. It looks like 买 (mǎi - to buy) but with an extra mark on top. Remember: selling means adding value/items!" },
        { word: "十", translation: "Ten", phonetic: "Shí", liarGame: true, explanation: "十 (shí) is 10. It sounds similar to 四 (sì - 4). In many dialects, 'shi' and 'si' are confused. 10 is the cross shape." },
        { word: "四", translation: "Four", phonetic: "Sì", liarGame: true, explanation: "四 (sì) is 4. Don't confuse it with 十 (shí - 10). A common tongue twister is 'sì shì sì, shí shì shí' (4 is 4, 10 is 10)." }
    ],
    'zh_a1_m03': [
        { word: "打车", translation: "Take a taxi", phonetic: "Dǎchē", liarGame: true, explanation: "打 (dǎ) usually means 'to hit', but in '打车' it means to catch or take a taxi. You aren't actually hitting the vehicle!" },
        { word: "点心", translation: "Dim sum / Snack", phonetic: "Diǎnxīn", liarGame: true, explanation: "Literally 'to touch the heart'. It means snacks or dim sum, not a medical procedure. It refers to food that touches your heart!" },
        { word: "东西", translation: "Things / Objects", phonetic: "Dōngxi", liarGame: true, explanation: "东 (dōng) is East, 西 (xī) is West. But together '东西' (dōngxi) means 'stuff' or 'things'. It has nothing to do with navigation!" }
    ],
    'zh_a1_m04': [
        { word: "便宜", translation: "Cheap", phonetic: "Piányi", liarGame: true, explanation: "The character 便 is a polyphone. In 方便 (fāngbiàn - convenient) it is 'biàn', but in 便宜 (piányi - cheap) it must be 'pián'." },
        { word: "意思", translation: "Meaning", phonetic: "Yìsi", liarGame: true, explanation: "意思 can mean meaning, intent, or interest. '有意思' (yǒu yìsi) specifically means 'interesting' or 'fun'." },
        { word: "东西", translation: "Things / Objects", phonetic: "Dōngxi", liarGame: true, explanation: "东 (dōng) is East, 西 (xī) is West. But together '东西' (dōngxi) means 'stuff' or 'things'." }
    ],
    'zh_a1_m05': [
        { word: "便宜", translation: "Cheap", phonetic: "Piányi", liarGame: true, explanation: "The character 便 is a polyphone. In 方便 (fāngbiàn - convenient) it is 'biàn', but in 便宜 (piányi - cheap) it must be 'pián'." },
        { word: "东西", translation: "Things / Objects", phonetic: "Dōngxi", liarGame: true, explanation: "东 (dōng) is East, 西 (xī) is West. But together '东西' (dōngxi) means 'stuff' or 'things'." },
        { word: "卖", translation: "To sell", phonetic: "Mài", liarGame: true, explanation: "卖 (mài) means 'to sell'. It looks like 买 (mǎi) but has a 'cross' on top!" }
    ],
    'zh_a1_m06': [
        { word: "打车", translation: "Take a taxi", phonetic: "Dǎchē", liarGame: true, explanation: "Catch or take a taxi. Literally 'to hit car' but used for hailing a cab!" },
        { word: "东西", translation: "Things / Objects", phonetic: "Dōngxi", liarGame: true, explanation: "Stuff or things. Combining East and West characters creates the meaning of 'objects'." },
        { word: "马路", translation: "Road / Street", phonetic: "Mǎlù", liarGame: true, explanation: "Literally 'Horse Road'. It's the common term for any city road or main street today." }
    ]
};

console.log('👷 Regenerating Chinese A1 modules with Rich Liar Game Metadata...\n');

modules.forEach(mod => {
    const filePath = path.join(__dirname, `../firestore_data/${mod.id}.json`);
    const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Extract all words to a flat list
    let allWords = [];
    moduleData.lessons.forEach(lesson => {
        lesson.vocabulary.forEach(item => {
            // Remove previous tags if any
            let cleanWord = item.word.replace('Liar Game: ', '');
            let cleanTrans = item.translation.replace(' (NOT To kiss)', '').replace(' (NOT To sell)', '').replace(' (NOT Horse)', '').replace(' [LIAR GAME: NOT To kiss]', '').replace(' [LIAR GAME: NOT To sell]', '').replace(' [LIAR GAME: NOT Horse]', '');
            allWords.push({
                word: cleanWord,
                translation: cleanTrans,
                phonetic: item.phonetic
            });
        });
    });

    // Remove duplicates from the list (some modules got messy in previous attempts)
    const uniqueWords = [];
    const seen = new Set();
    allWords.forEach(w => {
        if (!seen.has(w.word)) {
            uniqueWords.push(w);
            seen.add(w.word);
        }
    });

    // We need 100 words. 
    // If we have less, we'll need to pad (unlikely). 
    // If we have more, we'll truncate before injecting traps.

    // Preparation: Take first 97 unique words (leaving room for 3 traps at the end is easier, 
    // but the user wants them at 95, 96, 97).
    // So we take first 94 normal words.
    let baseWords = uniqueWords.slice(0, 94);

    // Inject traps at 95, 96, 97 (indices 94, 95, 96)
    const traps = moduleTraps[mod.id];
    baseWords.push(...traps); // Indices 94, 95, 96

    // Add 3 more normal words to reach 100 (indices 97, 98, 99)
    let extraWords = uniqueWords.slice(94).filter(w => !traps.some(t => t.word === w.word)).slice(0, 3);

    // Fallback if not enough words
    if (extraWords.length < 3) {
        extraWords.push({ word: "完成", translation: "Complete", phonetic: "Wánchéng" });
        extraWords.push({ word: "结束", translation: "Finish", phonetic: "Jiéshù" });
        extraWords.push({ word: "成功", translation: "Success", phonetic: "Chénggōng" });
    }

    const finalWords = [...baseWords, ...extraWords].slice(0, 100);

    // Reconstruct lessons
    const newLessons = [];
    for (let i = 0; i < 10; i++) {
        const lessonVocab = finalWords.slice(i * 10, (i + 1) * 10);
        newLessons.push({
            lesson_id: `${mod.id}_l${(i + 1).toString().padStart(2, '0')}`,
            title: moduleData.lessons[i] ? moduleData.lessons[i].title : `Lesson ${i + 1}`,
            order: i + 1,
            vocabulary: lessonVocab
        });
    }

    // New module structure
    const newModuleData = {
        module_id: mod.id,
        language: "chinese",
        level: "A1",
        theme: mod.theme,
        order: mod.order,
        lessons: newLessons,
        liar_game_data: liarGameMetadata[mod.id]
    };

    fs.writeFileSync(filePath, JSON.stringify(newModuleData, null, 4));
    console.log(`✅ Fixed ${mod.id} - ${finalWords.length} words + liat_game_data`);
});

console.log('\n🚀 All modules ready for re-upload!');
