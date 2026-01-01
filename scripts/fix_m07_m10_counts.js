const fs = require('fs');

// Load modules
const m07 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m07.json', 'utf8'));
const m08 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m08.json', 'utf8'));
const m09 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m09.json', 'utf8'));
const m10 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m10.json', 'utf8'));

console.log('Current counts:');
console.log('M07:', m07.vocabularyItems.length, '(need', 100 - m07.vocabularyItems.length, 'more)');
console.log('M08:', m08.vocabularyItems.length, '(need', 100 - m08.vocabularyItems.length, 'more)');
console.log('M09:', m09.vocabularyItems.length, '(need', 100 - m09.vocabularyItems.length, 'more)');
console.log('M10:', m10.vocabularyItems.length, '(need', 100 - m10.vocabularyItems.length, 'more)');

// Remove the extra word from M07 (has 101)
m07.vocabularyItems.pop();
console.log('\nM07: Removed 1 word');

// Add missing words to M08 (needs 4 more)
m08.vocabularyItems.push(
    { word: '持続', reading: 'jizoku', meaning: 'Continuation/Sustainability', example_sentence: '環境保護活動を持続するうちに、成果が徐々に現れてきました。' },
    { word: '維持', reading: 'iji', meaning: 'Maintenance', example_sentence: '生態系を維持する反面、人間活動との調和も図ります。' },
    { word: '保護', reading: 'hogo', meaning: 'Protection', example_sentence: '野生動物を保護することによって、生物多様性が守られます。' },
    { word: '保存', reading: 'hozon', meaning: 'Preservation', example_sentence: '自然環境を保存するうちに、観光資源としての価値も高まりました。' }
);
console.log('M08: Added 4 words');

// Add missing words to M09 (needs 7 more)
m09.vocabularyItems.push(
    { word: '起源', reading: 'kigen', meaning: 'Origin', example_sentence: '文明の起源を探るうちに、人類の歴史が明らかになります。' },
    { word: '発祥', reading: 'hasshou', meaning: 'Origin/Birthplace', example_sentence: '文化の発祥地を訪れる反面、現代との変化も感じました。' },
    { word: '由来', reading: 'yurai', meaning: 'Origin/Derivation', example_sentence: '言葉の由来を調べることによって、歴史的背景が理解できます。' },
    { word: '根源', reading: 'kongen', meaning: 'Root/Source', example_sentence: '問題の根源を探るうちに、社会構造の欠陥が見えてきました。' },
    { word: '源泉', reading: 'gensen', meaning: 'Source/Wellspring', example_sentence: '思想の源泉を辿る反面、現代的な解釈も加えます。' },
    { word: '基盤', reading: 'kiban', meaning: 'Foundation/Base', example_sentence: '社会の基盤を築くことによって、安定した発展が可能になります。' },
    { word: '土台', reading: 'dodai', meaning: 'Foundation/Basis', example_sentence: '知識の土台を固めるうちに、応用力も身につきました。' }
);
console.log('M09: Added 7 words');

// Add missing words to M10 (needs 6 more)
m10.vocabularyItems.push(
    { word: '相互', reading: 'sougo', meaning: 'Mutual/Reciprocal', example_sentence: '相互理解を深める反面、文化的な違いも尊重します。' },
    { word: '互恵', reading: 'gokei', meaning: 'Mutual benefit', example_sentence: '互恵関係を築くことによって、双方が利益を得られます。' },
    { word: '双方', "reading": 'souhou', meaning: 'Both sides', example_sentence: '双方の主張を聞くうちに、妥協点が見えてきました。' },
    { word: '両立', reading: 'ryouritsu', meaning: 'Compatibility/Coexistence', example_sentence: '経済発展と環境保護を両立する反面、困難な課題も多いです。' },
    { word: '調和', reading: 'chouwa', meaning: 'Harmony', example_sentence: '異なる価値観が調和することによって、豊かな社会が生まれます。' },
    { word: '均衡', reading: 'kinkou', meaning: 'Balance/Equilibrium', example_sentence: '国際的な勢力均衡を保つうちに、平和が維持されました。' }
);
console.log('M10: Added 6 words');

// Save all modules
fs.writeFileSync('firestore_data/ja_b1_m07.json', JSON.stringify(m07, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m08.json', JSON.stringify(m08, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m09.json', JSON.stringify(m09, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m10.json', JSON.stringify(m10, null, 4));

console.log('\nFinal counts:');
console.log('M07:', m07.vocabularyItems.length);
console.log('M08:', m08.vocabularyItems.length);
console.log('M09:', m09.vocabularyItems.length);
console.log('M10:', m10.vocabularyItems.length);
console.log('Total:', m07.vocabularyItems.length + m08.vocabularyItems.length + m09.vocabularyItems.length + m10.vocabularyItems.length);
console.log('\n✅ All modules now have exactly 100 words!');
