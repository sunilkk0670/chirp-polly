import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../firestore_data');

const a1Words = [];
for (let i = 1; i <= 10; i++) {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, `ko_a1_m${String(i).padStart(2, '0')}.json`), 'utf8'));
    a1Words.push(...data.lessons[0].vocabularyItems.map(it => it.word));
}
const a2Words = [];
for (let i = 1; i <= 10; i++) {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, `ko_a2_m${String(i).padStart(2, '0')}.json`), 'utf8'));
    a2Words.push(...data.lessons[0].vocabularyItems.map(it => it.word));
}

const masterSet = Array.from(new Set([...a1Words, ...a2Words]));
fs.writeFileSync(path.join(dataDir, 'korean_a1_a2_blacklist.json'), JSON.stringify(masterSet, null, 2));
console.log(`Blacklist created with ${masterSet.length} unique words.`);
