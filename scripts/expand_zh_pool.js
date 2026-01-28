const fs = require('fs');
const path = require('path');

const corpus = JSON.parse(fs.readFileSync('firestore_data/zh_a1_a2_corpus.json', 'utf8'));
const seen = new Set(corpus);

const pool = [
    // Countries & Languages
    { word: "意大利", translation: "Italy", phonetic: "Yìdàlì" },
    { word: "德国", translation: "Germany", phonetic: "Déguó" },
    { word: "法国", translation: "France", phonetic: "Fǎguó" },
    { word: "西班牙", translation: "Spain", phonetic: "Xībānyá" },
    { word: "日本", translation: "Japan", phonetic: "Rìběn" },
    { word: "韩国", translation: "South Korea", phonetic: "Hánguó" },
    { word: "印度", translation: "India", phonetic: "Yìndù" },
    { word: "外语", translation: "Foreign language", phonetic: "Wàiyǔ" },
    { word: "母语", translation: "Native language", phonetic: "Mǔyǔ" },
    { word: "方言", translation: "Dialect", phonetic: "Fāngyán" },
    { word: "口音", translation: "Accent", phonetic: "Kǒuyīn" },
    { word: "语法", translation: "Grammar", phonetic: "Yǔfǎ" },
    { word: "词汇", translation: "Vocabulary", phonetic: "Cíhuì" },
    { word: "发音", translation: "Pronunciation", phonetic: "Fāyīn" },

    // Life Events
    { word: "出生", translation: "Be born", phonetic: "Chūshēng" },
    { word: "成长", translation: "Grow up", phonetic: "Chéngzhǎng" },
    { word: "恋爱", translation: "Fall in love", phonetic: "Liàn'ài" },
    { word: "结婚", translation: "Get married", phonetic: "Jiéhūn" },
    { word: "固执", translation: "Stubborn", phonetic: "Gùzhí" }, // Duplicate check?
    { word: "退休", translation: "Retire", phonetic: "Tuìxiū" },
    { word: "去世", translation: "Pass away", phonetic: "Qùshì" },
    { word: "面试", translation: "Interview", phonetic: "Miànshì" },
    { word: "录取", translation: "Admit/Accept", phonetic: "Lùqǔ" },
    { word: "解雇", translation: "Fire/Lay off", phonetic: "Jiěgù" },
    { word: "升职", translation: "Get promoted", phonetic: "Shēngzhí" },

    // Nature & Science
    { word: "宇宙", translation: "Universe", phonetic: "Yǔzhòu" },
    { word: "银河", translation: "Galaxy", phonetic: "Yínhé" },
    { word: "行星", translation: "Planet", phonetic: "Xíngxīng" },
    { word: "彗星", translation: "Comet", phonetic: "Huìxīng" },
    { word: "黑洞", translation: "Black hole", phonetic: "Hēidòng" },
    { word: "重力", translation: "Gravity", phonetic: "Zhònglì" },
    { word: "磁场", translation: "Magnetic field", phonetic: "Cíchǎng" },
    { word: "频率", translation: "Frequency", phonetic: "Pínlǜ" },
    { word: "波长", translation: "Wavelength", phonetic: "Bōcháng" },
    { word: "维度", translation: "Dimension", phonetic: "Wéidù" },

    // More Household
    { word: "牙签", translation: "Toothpick", phonetic: "Yáqiān" },
    { word: "棉签", translation: "Cotton swab", phonetic: "Miánqiān" },
    { word: "指甲刀", translation: "Nail clipper", phonetic: "Zhǐjiadāo" },
    { word: "手电筒", translation: "Flashlight", phonetic: "Shǒudiàntǒng" },
    { word: "蚊香", translation: "Mosquito coil", phonetic: "Wénxiāng" },
    { word: "除湿机", translation: "Dehumidifier", phonetic: "Chúshījī" },
    { word: "加湿器", translation: "Humidifier", phonetic: "Jiāshīqì" },
    { word: "吸尘器", translation: "Vacuum cleaner", phonetic: "Xīchénqì" },
    { word: "洗衣粉", translation: "Laundry detergent", phonetic: "Xǐyīfěn" },
    { word: "柔顺剂", translation: "Fabric softener", phonetic: "Róushùnjì" }
];

const existingPool = JSON.parse(fs.readFileSync('firestore_data/zh_replacement_pool.json', 'utf8'));
const finalPool = [...existingPool];
const currentWordsInPool = new Set(existingPool.map(p => p.word));

pool.forEach(p => {
    if (!seen.has(p.word) && !currentWordsInPool.has(p.word)) {
        finalPool.push(p);
        currentWordsInPool.add(p.word);
    }
});

fs.writeFileSync('firestore_data/zh_replacement_pool.json', JSON.stringify(finalPool, null, 2));
console.log(`✅ Final pool count: ${finalPool.length}`);
