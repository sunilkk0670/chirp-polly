const fs = require('fs');

// Load modules
const m01 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m01.json', 'utf8'));
const m02 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m02.json', 'utf8'));
const m03 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m03.json', 'utf8'));
const m04 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m04.json', 'utf8'));
const m05 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m05.json', 'utf8'));
const m06 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m06.json', 'utf8'));

// Final round of replacements
const fixes = [
    // M04 fixes
    { module: m04, oldWord: '倫理', newWord: { word: '道徳観', reading: 'doutokukan', meaning: 'Moral sense', example_sentence: '道徳観が多様化するうちに、何が正しいかの判断が難しくなっています。' } },
    { module: m04, oldWord: '傲慢', newWord: { word: '尊大', reading: 'sondai', meaning: 'Arrogant/Pompous', example_sentence: '尊大な態度で接する反面、実力が伴わなければ信頼を失います。' } },
    { module: m04, oldWord: '先入観', newWord: { word: '予断', reading: 'yodan', meaning: 'Prejudgment', example_sentence: '予断を持たずに接することによって、公平な評価ができます。' } },
    { module: m04, oldWord: '検証', newWord: { word: '裏取り', reading: 'uradori', meaning: 'Fact-checking', example_sentence: '情報の裏取りをすることによって、誤報を防ぎます。' } },
    { module: m04, oldWord: '拡散', newWord: { word: '流布', reading: 'rufu', meaning: 'Dissemination', example_sentence: 'デマが瞬時に流布することによって、真実の検証が追いつかない状況が生まれています。' } },

    // M05 fixes
    { module: m05, oldWord: '賠償', newWord: { word: '弁済', reading: 'bensai', meaning: 'Repayment', example_sentence: '債務を弁済するうちに、ようやく経済的な自由を取り戻しました。' } },
    { module: m05, oldWord: '却下', newWord: { word: '棄却', reading: 'kikyaku', meaning: 'Dismissal', example_sentence: '訴えが棄却されることによって、法的手段が尽きました。' } },

    // M06 fixes - remove internal duplicates
    { module: m06, oldWord: '偏見', newWord: { word: '先入見', reading: 'sennyuuken', meaning: 'Preconceived view', example_sentence: '先入見を捨てることによって、真の理解が生まれます。' } },
    { module: m06, oldWord: '探究心', newWord: { word: '求知欲', reading: 'kyuuchiyo ku', meaning: 'Thirst for knowledge', example_sentence: '求知欲を持ち続けることによって、新たな発見に繋がります。' } },
    { module: m06, oldWord: '把握', newWord: { word: '掌握', reading: 'shouaku', meaning: 'Grasp/Control', example_sentence: '状況を正確に掌握するうちに、適切な判断ができるようになりました。' } }
];

// Apply all fixes
fixes.forEach(fix => {
    const idx = fix.module.vocabularyItems.findIndex(item => item.word === fix.oldWord);
    if (idx !== -1) {
        fix.module.vocabularyItems[idx] = fix.newWord;
        console.log(`Replaced "${fix.oldWord}" with "${fix.newWord.word}"`);
    }
});

// Save all modules
fs.writeFileSync('firestore_data/ja_b1_m01.json', JSON.stringify(m01, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m02.json', JSON.stringify(m02, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m03.json', JSON.stringify(m03, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m04.json', JSON.stringify(m04, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m05.json', JSON.stringify(m05, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m06.json', JSON.stringify(m06, null, 4));

console.log('\n✅ Final duplicate fixes complete!');
