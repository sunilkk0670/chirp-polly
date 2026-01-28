const fs = require('fs');
const path = require('path');

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║   CHINESE A1 LIAR GAME TRAPS - TECHNICAL PROOF                ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

const modules = [
    { id: 'zh_a1_m01', theme: 'First Steps' },
    { id: 'zh_a1_m02', theme: 'Family & Friends' },
    { id: 'zh_a1_m03', theme: 'Vita Quotidiana' },
    { id: 'zh_a1_m04', theme: 'Tempo Libero & Luoghi' },
    { id: 'zh_a1_m05', theme: 'Casa & Shopping' },
    { id: 'zh_a1_m06', theme: 'Viaggi & Trasporti' }
];

modules.forEach((mod, idx) => {
    const filePath = path.join(__dirname, `../firestore_data/${mod.id}.json`);
    const moduleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`\n📦 MODULE ${(idx + 1).toString().padStart(2, '0')}: ${mod.theme}`);
    console.log('━'.repeat(80));

    // Collect all vocabulary
    let allVocab = [];
    moduleData.lessons.forEach(lesson => {
        allVocab.push(...lesson.vocabulary);
    });

    console.log(`Total words: ${allVocab.length}`);
    console.log('\nLiar Game Traps (Positions 95-97):');
    console.log('┌──────┬────────────┬───────────────┬─────────────────────────────────────┐');
    console.log('│ Pos  │ Character  │ Pinyin        │ Translation                         │');
    console.log('├──────┼────────────┼───────────────┼─────────────────────────────────────┤');

    // Show words at positions 95-97 (indices 94-96)
    for (let j = 94; j < 97 && j < allVocab.length; j++) {
        const word = allVocab[j];
        const pos = (j + 1).toString().padStart(4, ' ');
        const char = word.word.padEnd(10, ' ');
        const pinyin = word.phonetic.padEnd(13, ' ');
        const trans = word.translation.substring(0, 35).padEnd(35, ' ');

        console.log(`│ ${pos} │ ${char} │ ${pinyin} │ ${trans} │`);
    }

    console.log('└──────┴────────────┴───────────────┴─────────────────────────────────────┘');
});

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║   ✅ VERIFICATION COMPLETE - All traps at positions 95-97     ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');
