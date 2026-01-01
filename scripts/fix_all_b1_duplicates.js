const fs = require('fs');

// Load modules
const m01 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m01.json', 'utf8'));
const m02 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m02.json', 'utf8'));
const m04 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m04.json', 'utf8'));
const m05 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m05.json', 'utf8'));
const m06 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m06.json', 'utf8'));

// Fix M04 duplicates with M01
let idx = m04.vocabularyItems.findIndex(i => i.word === '虚偽');
if (idx !== -1) {
    m04.vocabularyItems[idx] = { word: '偽装', reading: 'gisou', meaning: 'Camouflage/Disguise', example_sentence: '事実を偽装することによって、一時的に危機を逃れても、いずれ真実が明らかになります。' };
    console.log('M04: Replaced 虚偽 with 偽装');
}

idx = m04.vocabularyItems.findIndex(i => i.word === '架空');
if (idx !== -1) {
    m04.vocabularyItems[idx] = { word: '空想', reading: 'kuusou', meaning: 'Fantasy/Imagination', example_sentence: '空想の世界に浸る反面、現実的な問題解決も忘れてはなりません。' };
    console.log('M04: Replaced 架空 with 空想');
}

// Fix M05 duplicates with M02
idx = m05.vocabularyItems.findIndex(i => i.word === '訴訟');
if (idx !== -1) {
    m05.vocabularyItems[idx] = { word: '訴え', reading: 'uttae', meaning: 'Lawsuit/Appeal', example_sentence: '訴えを起こすうちに、長期的な法廷闘争を覚悟しなければなりません。' };
    console.log('M05: Replaced 訴訟 with 訴え');
}

idx = m05.vocabularyItems.findIndex(i => i.word === '補填');
if (idx !== -1) {
    m05.vocabularyItems[idx] = { word: '補完', reading: 'hoken', meaning: 'Complement/Supplementation', example_sentence: '不足分を補完することによって、全体のバランスが保たれます。' };
    console.log('M05: Replaced 補填 with 補完');
}

// Fix M06 duplicates with M01
idx = m06.vocabularyItems.findIndex(i => i.word === '変容');
if (idx !== -1) {
    m06.vocabularyItems[idx] = { word: '変貌', reading: 'henbou', meaning: 'Transformation', example_sentence: '街が急速に変貌するうちに、古き良き風景が失われていきました。' };
    console.log('M06: Replaced 変容 with 変貌');
}

idx = m06.vocabularyItems.findIndex(i => i.word === '滅亡');
if (idx !== -1) {
    m06.vocabularyItems[idx] = { word: '崩壊', reading: 'houkai', meaning: 'Collapse/Breakdown', example_sentence: '信頼関係が崩壊することによって、組織全体が機能不全に陥りました。' };
    console.log('M06: Replaced 滅亡 with 崩壊');
}

idx = m06.vocabularyItems.findIndex(i => i.word === '永遠');
if (idx !== -1) {
    m06.vocabularyItems[idx] = { word: '恒久', reading: 'koukyuu', meaning: 'Permanence', example_sentence: '恒久的な平和を願ううちに、現実の困難さに直面します。' };
    console.log('M06: Replaced 永遠 with 恒久');
}

idx = m06.vocabularyItems.findIndex(i => i.word === '刹那');
if (idx !== -1) {
    m06.vocabularyItems[idx] = { word: '瞬間', reading: 'shunkan', meaning: 'Moment/Instant', example_sentence: '瞬間的な判断を迫られる反面、慎重さも失ってはなりません。' };
    console.log('M06: Replaced 刹那 with 瞬間');
}

idx = m06.vocabularyItems.findIndex(i => i.word === '無常');
if (idx !== -1) {
    m06.vocabularyItems[idx] = { word: '無為', reading: 'mui', meaning: 'Inaction/Naturalness', example_sentence: '無為自然の境地に至るうちに、心の平安が得られました。' };
    console.log('M06: Replaced 無常 with 無為');
}

// Save all modules
fs.writeFileSync('firestore_data/ja_b1_m01.json', JSON.stringify(m01, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m02.json', JSON.stringify(m02, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m04.json', JSON.stringify(m04, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m05.json', JSON.stringify(m05, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m06.json', JSON.stringify(m06, null, 4));

console.log('\n✅ All B1 internal duplicates fixed!');
