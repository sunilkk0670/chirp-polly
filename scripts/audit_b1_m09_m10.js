const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'firestore_data');

const b1_m09_json = JSON.parse(fs.readFileSync(path.join(dataDir, 'de_b1_m09.json'), 'utf8'));
const b1_m10_json = JSON.parse(fs.readFileSync(path.join(dataDir, 'de_b1_m10.json'), 'utf8'));

const b1_m09_words = b1_m09_json.lessons[0].vocabularyItems.map(vi => vi.word);
const b1_m10_words = b1_m10_json.lessons[0].vocabularyItems.map(vi => vi.word);

const existingFiles = fs.readdirSync(dataDir).filter(f => f.startsWith('de_') && f.endsWith('.json') && f !== 'de_b1_m09.json' && f !== 'de_b1_m10.json');
const corpus = {};

existingFiles.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    let words = [];
    if (data.lessons) {
        data.lessons.forEach(l => {
            l.vocabularyItems.forEach(vi => words.push(vi.word));
        });
    }
    corpus[file] = words;
});

function cleanForAudit(word) {
    if (!word) return "";
    return word.replace(/\s\([^)]+\)/g, '').replace(/\[TRAP\]/g, '').trim().toLowerCase();
}

function checkOverlaps(list, listName) {
    console.log(`\n--- Auditing ${listName} ---`);
    let count = 0;
    list.forEach(word => {
        const cleanWord = cleanForAudit(word);
        for (const [file, words] of Object.entries(corpus)) {
            if (words.some(w => cleanForAudit(w) === cleanWord)) {
                console.log(`❌ Overlap: "${word}" found in ${file}`);
                count++;
            }
        }
    });
    if (count === 0) console.log("✅ Zero overlaps found.");
}

checkOverlaps(b1_m09_words, "Module 09");
checkOverlaps(b1_m10_words, "Module 10");
