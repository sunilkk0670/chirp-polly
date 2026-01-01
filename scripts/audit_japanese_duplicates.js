const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('  JAPANESE CURRICULUM INTEGRITY AUDIT');
console.log('  A1 (1,000) + A2 (1,000) + B1 (1,000)');
console.log('========================================\n');

function loadModule(file) {
    const data = JSON.parse(fs.readFileSync(path.join('firestore_data', file), 'utf8'));
    return data.vocabularyItems || [];
}

function audit() {
    // A1 Level (10 modules, 1000 words)
    const a1Modules = ['ja_a1_m1.json', 'ja_a1_m2.json', 'ja_a1_m3.json', 'ja_a1_m4.json', 'ja_a1_m5.json', 'ja_a1_m6.json', 'ja_a1_m7.json', 'ja_a1_m8.json', 'ja_a1_m9.json', 'ja_a1_m10.json'];

    // A2 Level (10 modules, 1000 words) - Files are m11-m20
    const a2Modules = ['ja_a2_m11.json', 'ja_a2_m12.json', 'ja_a2_m13.json', 'ja_a2_m14.json', 'ja_a2_m15.json', 'ja_a2_m16.json', 'ja_a2_m17.json', 'ja_a2_m18.json', 'ja_a2_m19.json', 'ja_a2_m20.json'];

    // B1 Level (10 modules, 1000 words)
    const b1Modules = ['ja_b1_m01.json', 'ja_b1_m02.json', 'ja_b1_m03.json', 'ja_b1_m04.json', 'ja_b1_m05.json', 'ja_b1_m06.json', 'ja_b1_m07.json', 'ja_b1_m08.json', 'ja_b1_m09.json', 'ja_b1_m10.json'];

    const globalWords = new Map();
    const levelWords = { a1: new Set(), a2: new Set(), b1: new Set() };
    const duplicates = [];
    let totalPlaceholders = 0;

    function processLevel(modules, level, levelName) {
        console.log(`--- Auditing ${levelName} Level (${modules.length} modules) ---`);
        let levelTotal = 0;

        modules.forEach(file => {
            const items = loadModule(file);
            console.log(`✅ ${file}: ${items.length} items`);
            levelTotal += items.length;

            items.forEach(item => {
                const word = item.word;

                if (word === '[PLACEHOLDER]' || word === 'PLACEHOLDER') {
                    totalPlaceholders++;
                    return;
                }

                levelWords[level].add(word);

                if (globalWords.has(word)) {
                    const existing = globalWords.get(word);
                    if (!existing.includes(`${levelName.toUpperCase()}-${file}`)) {
                        existing.push(`${levelName.toUpperCase()}-${file}`);
                        duplicates.push({ word, locations: existing });
                    }
                } else {
                    globalWords.set(word, [`${levelName.toUpperCase()}-${file}`]);
                }
            });
        });

        return levelTotal;
    }

    const a1Total = processLevel(a1Modules, 'a1', 'A1');
    const a2Total = processLevel(a2Modules, 'a2', 'A2');
    const b1Total = processLevel(b1Modules, 'b1', 'B1');

    // Report duplicates
    if (duplicates.length > 0) {
        console.log('\n--- DUPLICATES FOUND ---');
        duplicates.forEach(dup => {
            console.log(`❌ DUPLICATE: "${dup.word}" appears in: ${dup.locations.join(', ')}`);
        });
    }

    // Summary
    console.log('\n========================================');
    console.log('         AUDIT SUMMARY');
    console.log('========================================');
    console.log(`A1 Level:  ${a1Total} words (Expected: 1,000)`);
    console.log(`A2 Level:  ${a2Total} words (Expected: 1,000)`);
    console.log(`B1 Level:  ${b1Total} words (Expected: 1,000)`);
    console.log('----------------------------------------');
    console.log(`Total Words:      ${a1Total + a2Total + b1Total}`);
    console.log(`Unique Words:     ${globalWords.size}`);
    console.log(`Total Duplicates: ${duplicates.length} items`);
    console.log(`Placeholders:     ${totalPlaceholders}`);
    console.log('========================================');

    const expectedA1 = 1000;
    const expectedA2 = 1000;
    const expectedB1 = 1000;
    const expectedTotal = 3000;

    if (duplicates.length === 0 && a1Total + a2Total + b1Total === expectedTotal) {
        console.log('✅ AUDIT PASSED: No duplicates found!');
        process.exit(0);
    } else {
        console.log('🚫 AUDIT FAILED:');
        if (duplicates.length > 0) console.log(`   - ${duplicates.length} duplicate(s) found`);
        if (a1Total + a2Total + b1Total !== expectedTotal) console.log(`   - Expected ${expectedTotal} words, found ${a1Total + a2Total + b1Total}`);
        process.exit(1);
    }
}

audit();
