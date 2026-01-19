import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Final 3 genuine overlaps (not Liar Game)
const replacements = {
    'Sparen': { word: 'Investieren', reading: 'in-ves-TEE-ren', meaning: 'To invest', example: 'Ich investiere in Aktien. (I invest in stocks.)' },
    'Gefährlich': { word: 'Riskant', reading: 'ris-KANT', meaning: 'Risky', example: 'Die Entscheidung ist riskant. (The decision is risky.)' },
    'Viel Erfolg!': { word: 'Alles Gute!', reading: 'AL-es GOO-te', meaning: 'All the best!', example: 'Alles Gute für die Zukunft! (All the best for the future!)' }
};

// Load current M02
const m02Path = join(__dirname, '..', 'firestore_data', 'de_a2_m02.json');
const m02Data = JSON.parse(readFileSync(m02Path, 'utf8'));

// Apply replacements
let replacedCount = 0;
m02Data.lessons[0].vocabularyItems = m02Data.lessons[0].vocabularyItems.map(item => {
    if (replacements[item.word]) {
        const replacement = replacements[item.word];
        replacedCount++;
        return {
            word: replacement.word,
            reading: replacement.reading,
            meaning: replacement.meaning,
            example_sentence: replacement.example
        };
    }
    return item;
});

// Save updated M02
writeFileSync(m02Path, JSON.stringify(m02Data, null, 4));

console.log(`✅ Replaced ${replacedCount} final genuine overlaps`);
console.log(`   Liar Game overlaps (5) are intentional review words`);
console.log(`   Total M02 words: ${m02Data.lessons[0].vocabularyItems.length}`);
