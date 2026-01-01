const fs = require('fs');
const path = require('path');

const a1Files = ['ja_a1_m1.json', 'ja_a1_m2.json', 'ja_a1_m3.json', 'ja_a1_m4.json', 'ja_a1_m5.json', 'ja_a1_m6.json', 'ja_a1_m7.json', 'ja_a1_m8.json', 'ja_a1_m9.json', 'ja_a1_m10.json'];
const a2Files = ['ja_a2_m11.json', 'ja_a2_m12.json', 'ja_a2_m13.json', 'ja_a2_m14.json', 'ja_a2_m15.json', 'ja_a2_m16.json', 'ja_a2_m17.json', 'ja_a2_m18.json', 'ja_a2_m19.json', 'ja_a2_m20.json'];
const b1Files = ['ja_b1_m01.json', 'ja_b1_m02.json', 'ja_b1_m03.json', 'ja_b1_m04.json', 'ja_b1_m05.json', 'ja_b1_m06.json', 'ja_b1_m07.json', 'ja_b1_m08.json', 'ja_b1_m09.json', 'ja_b1_m10.json'];

const wordMap = new Map();
const duplicates = [];

function processFile(file, level) {
    const data = JSON.parse(fs.readFileSync(path.join('firestore_data', file), 'utf8'));
    data.vocabularyItems.forEach(item => {
        const word = item.word;
        if (wordMap.has(word)) {
            const info = wordMap.get(word);
            info.locations.push(`${level}-${file}`);
            if (!info.isDuplicate) {
                duplicates.push(word);
                info.isDuplicate = true;
            }
        } else {
            wordMap.set(word, { word, locations: [`${level}-${file}`], isDuplicate: false });
        }
    });
}

a1Files.forEach(f => processFile(f, 'A1'));
a2Files.forEach(f => processFile(f, 'A2'));
b1Files.forEach(f => processFile(f, 'B1'));

const m07to10Duplicates = [];
duplicates.forEach(word => {
    const info = wordMap.get(word);
    const inNewModules = info.locations.some(loc => loc.match(/B1-ja_b1_m(07|08|09|10)/));
    if (inNewModules) {
        m07to10Duplicates.push(info);
    }
});

console.log(JSON.stringify(m07to10Duplicates, null, 2));
