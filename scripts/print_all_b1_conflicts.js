import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../firestore_data');
const b1m06 = JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_b1_m06.json'), 'utf8')).lessons.map(l => l.targetText);

const masterFiles = [
    'korean_b1_m01.json',
    'korean_b1_m02.json',
    'korean_b1_m03.json',
    'korean_b1_m04.json',
    'korean_b1_m05.json'
];

let allConflicts = new Set();

masterFiles.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
        const masterData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const masterWords = masterData.lessons.map(l => l.targetText);
        masterWords.forEach(w => {
            if (b1m06.includes(w)) allConflicts.add(w);
        });
    }
});

console.log('--- 🕵️ ALL B1 CONFLICTS FOUND IN M06 ---\n');
console.log(Array.from(allConflicts));
