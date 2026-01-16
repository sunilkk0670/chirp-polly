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

console.log('--- 🕵️ COMPREHENSIVE B1 OVERLAP CHECK ---\n');

masterFiles.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
        const masterData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const masterWords = masterData.lessons.map(l => l.targetText);
        const overlaps = b1m06.filter(w => masterWords.includes(w));

        if (overlaps.length > 0) {
            console.log(`❌ Overlaps with ${file} (${overlaps.length}):`, overlaps);
        } else {
            console.log(`✅ No overlaps with ${file}.`);
        }
    }
});
