const m01 = require('../firestore_data/zh_a1_m01.json');
const m02 = require('../firestore_data/zh_a1_m02.json');
const m03 = require('../firestore_data/zh_a1_m03.json');
const m04 = require('../firestore_data/zh_a1_m04.json');
const m05 = require('../firestore_data/zh_a1_m05.json');
const m06 = require('../firestore_data/zh_a1_m06.json');

const modules = [m01, m02, m03, m04, m05, m06];

console.log('\n=== CHINESE A1 LIAR GAME TRAPS - TECHNICAL PROOF ===\n');

modules.forEach((mod, idx) => {
    const v = [];
    mod.lessons.forEach(l => v.push(...l.vocabulary));

    console.log(`MODULE ${(idx + 1).toString().padStart(2, '0')}: ${mod.theme}`);
    console.log(`Total words: ${v.length}`);
    console.log('Liar Game Traps (positions 95-97):');

    for (let i = 94; i < 97 && i < v.length; i++) {
        const w = v[i];
        console.log(`  ${i + 1}. ${w.word} (${w.phonetic})`);
        console.log(`      ${w.translation}`);
    }
    console.log('');
});

console.log('=== VERIFICATION COMPLETE ===\n');
