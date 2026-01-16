import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../firestore_data');
const outPath = path.join(__dirname, 'audit_report.txt');
let report = '--- 🏆 KOREAN GRAND CURRICULUM AUDIT V2 (3,000 WORDS) ---\n';

function log(msg) {
    report += msg + '\n';
    console.log(msg);
}

const levels = {
    'A1': { prefix: 'ko_a1_m', count: 10, schema: 'nested' },
    'A2': { prefix: 'ko_a2_m', count: 10, schema: 'nested' },
    'B1': { prefix: 'korean_b1_m', count: 10, schema: 'flat' }
};

const allWords = [];
const levelWords = { 'A1': [], 'A2': [], 'B1': [] };

for (const [level, config] of Object.entries(levels)) {
    for (let i = 1; i <= config.count; i++) {
        const file = `${config.prefix}${String(i).padStart(2, '0')}.json`;
        const filePath = path.join(dataDir, file);

        if (!fs.existsSync(filePath)) {
            console.log(`❌ Missing File: ${file}`);
            continue;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let words = [];

        if (config.schema === 'nested') {
            // A1/A2 structure: lessons[0].vocabularyItems
            if (data.lessons && data.lessons[0] && data.lessons[0].vocabularyItems) {
                words = data.lessons[0].vocabularyItems.map(item => item.word);
            }
        } else {
            // B1 structure: lessons[].targetText
            if (data.lessons) {
                words = data.lessons.map(item => item.targetText);
            }
        }

        levelWords[level].push(...words);
        allWords.push(...words);
    }
}

log(`\n📊 Word Counts:`);
log(`   - A1 Total: ${levelWords['A1'].length} (${new Set(levelWords['A1']).size} unique)`);
log(`   - A2 Total: ${levelWords['A2'].length} (${new Set(levelWords['A2']).size} unique)`);
log(`   - B1 Total: ${levelWords['B1'].length} (${new Set(levelWords['B1']).size} unique)`);
log(`   - Grand Total: ${allWords.length}`);

const uniqueWords = new Set(allWords);
log(`🎯 Unique Words Count: ${uniqueWords.size}`);

if (allWords.length === uniqueWords.size && allWords.length === 3000) {
    log('\n✅ 100% SUCCESS: 3,000 Unique Words across all levels.');
} else {
    log(`\n⚠️ DISCREPANCY DETECTED: ${uniqueWords.size} unique / 3,000 target.`);

    // Check for duplicates
    const counts = {};
    allWords.forEach(w => counts[w] = (counts[w] || 0) + 1);
    const dups = Object.keys(counts).filter(w => counts[w] > 1);
    if (dups.length > 0) {
        log(`❌ Overlaps Found (${dups.length}): ${dups.slice(0, 20).join(', ')}${dups.length > 20 ? '...' : ''}`);
    }
}

fs.writeFileSync(outPath, report);
console.log('Report saved to audit_report.txt');
