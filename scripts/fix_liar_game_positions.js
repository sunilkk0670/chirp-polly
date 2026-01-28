const fs = require('fs');
const path = require('path');

// Liar Game traps for each module (positions 95-97, indices 94-96)
const liarGameTraps = {
    'm01': [
        { word: "问", translation: "To ask [LIAR GAME: NOT To kiss]", phonetic: "Wèn", liarGame: true },
        { word: "买", translation: "To buy [LIAR GAME: NOT To sell]", phonetic: "Mǎi", liarGame: true },
        { word: "妈妈", translation: "Mother [LIAR GAME: NOT Horse]", phonetic: "Māma", liarGame: true }
    ],
    'm02': [
        { word: "卖", translation: "To sell [LIAR GAME: NOT To buy]", phonetic: "Mài", liarGame: true },
        { word: "Liar Game: 十", translation: "Ten (NOT Four)", phonetic: "Shí", liarGame: true },
        { word: "Liar Game: 四", translation: "Four (NOT Ten)", phonetic: "Sì", liarGame: true }
    ],
    'm03': [
        { word: "打车", translation: "Take a taxi [LIAR GAME: NOT Hit a car]", phonetic: "Dǎchē", liarGame: true },
        { word: "点心", translation: "Dim sum/Snack [LIAR GAME: NOT O'clock heart]", phonetic: "Diǎnxīn", liarGame: true },
        { word: "东西", translation: "Things/Objects [LIAR GAME: NOT East-West]", phonetic: "Dōngxi", liarGame: true }
    ],
    'm04': [
        { word: "便宜", translation: "Cheap [LIAR GAME: NOT Convenience]", phonetic: "Piányi", liarGame: true },
        { word: "意思", translation: "Meaning [LIAR GAME: NOT Intent]", phonetic: "Yìsi", liarGame: true },
        { word: "东西", translation: "Things/Objects [LIAR GAME: NOT East-West]", phonetic: "Dōngxi", liarGame: true }
    ],
    'm05': [
        { word: "便宜", translation: "Cheap [LIAR GAME: NOT Convenience]", phonetic: "Piányi", liarGame: true },
        { word: "东西", translation: "Things/Objects [LIAR GAME: NOT East-West]", phonetic: "Dōngxi", liarGame: true },
        { word: "卖", translation: "To sell [LIAR GAME: NOT To buy]", phonetic: "Mài", liarGame: true }
    ],
    'm06': [
        { word: "打车", translation: "Take a taxi [LIAR GAME: NOT Hit a car]", phonetic: "Dǎchē", liarGame: true },
        { word: "东西", translation: "Things/Objects [LIAR GAME: NOT East-West]", phonetic: "Dōngxi", liarGame: true },
        { word: "马路", translation: "Road [LIAR GAME: NOT Horse-road]", phonetic: "Mǎlù", liarGame: true }
    ]
};

console.log('\n🔧 Fixing Liar Game traps for all Chinese A1 modules...\n');

for (let i = 1; i <= 6; i++) {
    const moduleNum = i.toString().padStart(2, '0');
    const filePath = path.join(__dirname, `../firestore_data/zh_a1_m${moduleNum}.json`);

    const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Collect all vocabulary
    let allVocab = [];
    moduleData.lessons.forEach(lesson => {
        allVocab.push(...lesson.vocabulary);
    });

    console.log(`Module ${moduleNum}: ${allVocab.length} words`);

    // Replace words at indices 94, 95, 96 with Liar Game traps
    const traps = liarGameTraps[`m${moduleNum}`];
    allVocab[94] = traps[0];
    allVocab[95] = traps[1];
    allVocab[96] = traps[2];

    // Keep only first 100 words (remove any extras)
    allVocab = allVocab.slice(0, 100);

    console.log(`  Trap 95: ${traps[0].word} (${traps[0].phonetic})`);
    console.log(`  Trap 96: ${traps[1].word} (${traps[1].phonetic})`);
    console.log(`  Trap 97: ${traps[2].word} (${traps[2].phonetic})`);

    // Redistribute into 10 lessons of 10 words each
    const newLessons = [];
    for (let j = 0; j < 10; j++) {
        const lessonVocab = allVocab.slice(j * 10, (j + 1) * 10);
        newLessons.push({
            lesson_id: moduleData.lessons[j].lesson_id,
            title: moduleData.lessons[j].title,
            order: moduleData.lessons[j].order,
            vocabulary: lessonVocab
        });
    }

    moduleData.lessons = newLessons;

    // Write back
    fs.writeFileSync(filePath, JSON.stringify(moduleData, null, 4));
    console.log(`✅ Updated ${filePath}\n`);
}

console.log('🎉 All modules fixed with Liar Game traps at positions 95-97!');
