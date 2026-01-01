const fs = require('fs');

// Load modules
const m03 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m03.json', 'utf8'));
const m04 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m04.json', 'utf8'));
const m05 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m05.json', 'utf8'));
const m06 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m06.json', 'utf8'));

console.log('Current counts:');
console.log('M04:', m04.vocabularyItems.length);
console.log('M05:', m05.vocabularyItems.length);
console.log('M06:', m06.vocabularyItems.length);

// Fix M03: Replace "棄却" to avoid duplicate with M05
const m03Idx = m03.vocabularyItems.findIndex(i => i.word === '棄却');
if (m03Idx !== -1) {
    m03.vocabularyItems[m03Idx] = {
        word: '否決',
        reading: 'hiketsu',
        meaning: 'Rejection/Voting down',
        example_sentence: '提案が否決されることによって、計画の見直しを余儀なくされました。'
    };
    console.log('M03: Replaced 棄却 with 否決');
}

// Add missing words to M04 (needs 2 more)
m04.vocabularyItems.push(
    { word: '虚構', reading: 'kyokou', meaning: 'Fiction/Falsehood', example_sentence: '虚構の物語を楽しむ反面、現実との境界を見失わないよう注意します。' },
    { word: '真偽', reading: 'shingi', meaning: 'Truth or falsehood', example_sentence: '情報の真偽を見極めることによって、誤った判断を避けられます。' }
);
console.log('M04: Added 2 words');

// Add missing words to M05 (needs 4 more)
m05.vocabularyItems.push(
    { word: '訴訟', reading: 'soshou', meaning: 'Litigation/Lawsuit', example_sentence: '訴訟を起こすうちに、多額の費用と時間が必要になります。' },
    { word: '審査', reading: 'shinsa', meaning: 'Examination/Screening', example_sentence: '厳格な審査を経ることによって、公正性が担保されます。' },
    { word: '判定', reading: 'hantei', meaning: 'Judgment/Decision', example_sentence: '微妙な判定を下す反面、誤審の可能性もゼロではありません。' },
    { word: '裁く', reading: 'sabaku', meaning: 'To judge', example_sentence: '罪を裁くことによって、社会の秩序を保ちます。' }
);
console.log('M05: Added 4 words');

// Add missing words to M06 (needs 3 more)
m06.vocabularyItems.push(
    { word: '煩悩', reading: 'bonnou', meaning: 'Worldly desires', example_sentence: '煩悩を断ち切ろうと努力するうちに、かえって執着が強まることもあります。' },
    { word: '悟性', reading: 'gosei', meaning: 'Intellect/Understanding', example_sentence: '悟性を磨く反面、感性も大切にすべきです。' },
    { word: '叡智', reading: 'eichi', meaning: 'Wisdom/Sagacity', example_sentence: '先人の叡智に学ぶことによって、同じ過ちを繰り返さずに済みます。' }
);
console.log('M06: Added 3 words');

// Save all modules
fs.writeFileSync('firestore_data/ja_b1_m03.json', JSON.stringify(m03, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m04.json', JSON.stringify(m04, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m05.json', JSON.stringify(m05, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m06.json', JSON.stringify(m06, null, 4));

console.log('\nFinal counts:');
console.log('M04:', m04.vocabularyItems.length);
console.log('M05:', m05.vocabularyItems.length);
console.log('M06:', m06.vocabularyItems.length);
console.log('Total:', m04.vocabularyItems.length + m05.vocabularyItems.length + m06.vocabularyItems.length);
console.log('\n✅ All modules fixed!');
