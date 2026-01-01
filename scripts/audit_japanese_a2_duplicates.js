const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../firestore_data');
const FILES_TO_CHECK = ['ja_a2_m11.json', 'ja_a2_m12.json', 'ja_a2_m13.json', 'ja_a2_m14.json', 'ja_a2_m15.json', 'ja_a2_m16.json', 'ja_a2_m17.json', 'ja_a2_m18.json', 'ja_a2_m19.json', 'ja_a2_m20.json'];

function audit() {
    let totalDuplicates = 0;
    let totalPlaceholders = 0;
    let totalWords = 0;

    console.log('--- Starting Strict Integrity Audit ---');

    FILES_TO_CHECK.forEach(file => {
        const filePath = path.join(DATA_DIR, file);
        if (!fs.existsSync(filePath)) {
            console.error(`❌ File not found: ${file}`);
            return;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const items = data.vocabularyItems || [];
        const seenWords = new Set();

        items.forEach((item, index) => {
            totalWords++;
            const word = item.word;
            if (seenWords.has(word)) {
                console.error(`❌ Duplicate found: "${word}" in ${file} at index ${index}`);
                totalDuplicates++;
            }
            seenWords.add(word);

            const meaning = item.meaning || '';
            if (meaning.includes('(Var ') || meaning.toLowerCase().includes('placeholder')) {
                console.error(`❌ Placeholder found in meaning: "${meaning}" for word "${word}" in ${file} at index ${index}`);
                totalPlaceholders++;
            }
        });

        console.log(`✅ Audited ${file}: ${items.length} items.`);
    });

    console.log('---------------------------------------');
    console.log(`Summary:`);
    console.log(`Total Words Audited: ${totalWords}`);
    console.log(`Total Duplicates: ${totalDuplicates}`);
    console.log(`Total Placeholders: ${totalPlaceholders}`);

    if (totalDuplicates === 0 && totalPlaceholders === 0 && totalWords > 0) {
        console.log('🏆 AUDIT PASSED: Integrity verified.');
    } else {
        console.error('🚫 AUDIT FAILED: Duplicates or placeholders detected.');
        process.exit(1);
    }
}

audit();
