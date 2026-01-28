const fs = require('fs');
const path = require('path');

// Liar Game traps for Chinese A1 modules
const liarGameTraps = {
    m01: [
        { word: "问", translation: "To ask [LIAR GAME: NOT To kiss]", phonetic: "Wèn", liarGame: true },
        { word: "买", translation: "To buy [LIAR GAME: NOT To sell]", phonetic: "Mǎi", liarGame: true },
        { word: "妈妈", translation: "Mother [LIAR GAME: NOT Horse]", phonetic: "Māma", liarGame: true }
    ],
    m02: [
        { word: "卖", translation: "To sell [LIAR GAME: NOT To buy]", phonetic: "Mài", liarGame: true },
        { word: "十", translation: "Ten [LIAR GAME: NOT Four]", phonetic: "Shí", liarGame: true },
        { word: "四", translation: "Four [LIAR GAME: NOT Ten]", phonetic: "Sì", liarGame: true }
    ],
    m03: [
        { word: "打车", translation: "Take a taxi [LIAR GAME: NOT Hit a car]", phonetic: "Dǎchē", liarGame: true },
        { word: "点心", translation: "Dim sum/Snack [LIAR GAME: NOT O'clock heart]", phonetic: "Diǎnxīn", liarGame: true },
        { word: "东西", translation: "Things/Objects [LIAR GAME: NOT East-West]", phonetic: "Dōngxi", liarGame: true }
    ],
    m04: [
        { word: "便宜", translation: "Cheap [LIAR GAME: NOT Convenience]", phonetic: "Piányi", liarGame: true },
        { word: "意思", translation: "Meaning [LIAR GAME: NOT Intent]", phonetic: "Yìsi", liarGame: true },
        { word: "东西", translation: "Things/Objects [LIAR GAME: NOT East-West]", phonetic: "Dōngxi", liarGame: true }
    ],
    m05: [
        { word: "便宜", translation: "Cheap [LIAR GAME: NOT Convenience]", phonetic: "Piányi", liarGame: true },
        { word: "东西", translation: "Things/Objects [LIAR GAME: NOT East-West]", phonetic: "Dōngxi", liarGame: true },
        { word: "卖", translation: "To sell [LIAR GAME: NOT To buy]", phonetic: "Mài", liarGame: true }
    ],
    m06: [
        { word: "打车", translation: "Take a taxi [LIAR GAME: NOT Hit a car]", phonetic: "Dǎchē", liarGame: true },
        { word: "东西", translation: "Things/Objects [LIAR GAME: NOT East-West]", phonetic: "Dōngxi", liarGame: true },
        { word: "马路", translation: "Road [LIAR GAME: NOT Horse-road]", phonetic: "Mǎlù", liarGame: true }
    ]
};

// Process each module
for (let i = 1; i <= 6; i++) {
    const moduleNum = i.toString().padStart(2, '0');
    const filePath = path.join(__dirname, `../firestore_data/zh_a1_m${moduleNum}.json`);

    const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Collect all vocabulary from all lessons
    let allVocab = [];
    moduleData.lessons.forEach(lesson => {
        allVocab.push(...lesson.vocabulary);
    });

    console.log(`\nModule ${moduleNum}: Currently has ${allVocab.length} words`);

    // Remove last 3 words to make room for Liar Game traps
    allVocab = allVocab.slice(0, 97);

    // Add the 3 Liar Game traps
    const traps = liarGameTraps[`m${moduleNum}`];
    allVocab.push(...traps);

    console.log(`After adding Liar Game: ${allVocab.length} words`);
    console.log(`Liar Game traps at positions 95-97:`);
    traps.forEach((trap, idx) => {
        console.log(`  ${95 + idx}. ${trap.word} (${trap.phonetic}) - ${trap.translation}`);
    });

    // Redistribute into 10 lessons of 10 words each
    const newLessons = [];
    for (let j = 0; j < 10; j++) {
        const lessonVocab = allVocab.slice(j * 10, (j + 1) * 10);
        newLessons.push({
            ...moduleData.lessons[j],
            vocabulary: lessonVocab
        });
    }

    moduleData.lessons = newLessons;

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(moduleData, null, 4));
    console.log(`✅ Updated ${filePath}`);
}

console.log('\n🎉 All modules updated with Liar Game traps!');
