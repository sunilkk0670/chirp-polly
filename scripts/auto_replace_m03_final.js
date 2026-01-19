import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load A1 words to find all overlaps
const a1Words = new Set();
for (let i = 1; i <= 10; i++) {
    const moduleId = `de_a1_m${String(i).padStart(2, '0')}`;
    const data = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', `${moduleId}.json`), 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        a1Words.add(item.word.toLowerCase().trim());
    });
}

// Load M03
const m03Path = join(__dirname, '..', 'firestore_data', 'de_a2_m03.json');
const m03Data = JSON.parse(readFileSync(m03Path, 'utf8'));
const liarTraps = new Set(['das gymnasium', 'die kur', 'das präservativ', 'gift', 'after', 'pickel']);

// Find all remaining overlaps
const overlaps = [];
m03Data.lessons[0].vocabularyItems.forEach((item, idx) => {
    const word = item.word.toLowerCase().trim();
    if (!liarTraps.has(word) && a1Words.has(word)) {
        overlaps.push({ idx, word: item.word });
    }
});

console.log(`\nFound ${overlaps.length} remaining A1 overlaps in M03:\n`);
overlaps.forEach(o => console.log(`${o.idx + 1}. ${o.word}`));

// Auto-replace with advanced A2 terms
const autoReplacements = {
    'Sich entspannen': { word: 'Entspannungstechniken anwenden', reading: 'ent-SHPAN-oongs-tekh-nee-ken AN-ven-den', meaning: 'To apply relaxation techniques', example: 'Man sollte Entspannungstechniken anwenden. (One should apply relaxation techniques.)' },
    'Trainieren': { word: 'Konditionstraining betreiben', reading: 'kon-dee-TSYOHNS-tray-ning be-TRY-ben', meaning: 'To engage in fitness training', example: 'Ich betreibe regelmäßig Konditionstraining. (I regularly engage in fitness training.)' },
    'Die Bewegung': { word: 'Die Mobilität', reading: 'dee mo-bee-lee-TET', meaning: 'Mobility (no plural)', example: 'Die Mobilität ist eingeschränkt. (The mobility is limited.)' },
    'Der Sport': { word: 'Die Sportmedizin', reading: 'dee SHPORT-me-dee-tseen', meaning: 'Sports medicine (no plural)', example: 'Die Sportmedizin ist wichtig. (Sports medicine is important.)' },
    'Die Kondition': { word: 'Die Leistungsfähigkeit', reading: 'dee LYS-toongs-fay-ish-kyte', meaning: 'Physical performance capacity (no plural)', example: 'Die Leistungsfähigkeit ist hoch. (The physical performance capacity is high.)' },
    'Tief schlafen': { word: 'Erholsamen Schlaf haben', reading: 'er-HOHL-za-men SHLAF HA-ben', meaning: 'To have restful sleep', example: 'Ich habe erholsamen Schlaf. (I have restful sleep.)' }
};

let replacedCount = 0;
m03Data.lessons[0].vocabularyItems = m03Data.lessons[0].vocabularyItems.map(item => {
    if (autoReplacements[item.word]) {
        const replacement = autoReplacements[item.word];
        replacedCount++;
        console.log(`\n✅ Replacing: ${item.word} → ${replacement.word}`);
        return {
            word: replacement.word,
            reading: replacement.reading,
            meaning: replacement.meaning,
            example_sentence: replacement.example
        };
    }
    return item;
});

// Save updated M03
writeFileSync(m03Path, JSON.stringify(m03Data, null, 4));

console.log(`\n✅ Auto-replaced ${replacedCount} final A1 overlaps`);
console.log(`   Total M03 words: ${m03Data.lessons[0].vocabularyItems.length}\n`);
