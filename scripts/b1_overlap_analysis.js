import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../firestore_data');

// Master set (A1/A2)
const masterSet = new Set(JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_a1_a2_blacklist.json'), 'utf8')));
const prevB1Words = new Set();

const reportOut = path.join(__dirname, 'b1_overlap_report.txt');
let report = '--- B1 OVERLAP ANALYSIS ---\n';

for (let i = 1; i <= 10; i++) {
    const file = `korean_b1_m${String(i).padStart(2, '0')}.json`;
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    const words = data.lessons.map(l => l.targetText);

    const overlaps = words.filter(w => masterSet.has(w));
    const internalDups = words.filter((w, j) => words.indexOf(w) !== j);
    const b1Dups = words.filter(w => prevB1Words.has(w));

    const msg = `Module ${i}: Total ${words.length} | Master Overlaps: ${overlaps.length} | Internal Dups: ${internalDups.length} | Prev B1 Dups: ${b1Dups.length}`;
    report += msg + '\n';
    if (overlaps.length > 0) report += `   Overlaps: ${overlaps.slice(0, 10).join(', ')}\n`;
    if (b1Dups.length > 0) report += `   B1 Dups: ${b1Dups.slice(0, 10).join(', ')}\n`;

    words.forEach(w => prevB1Words.add(w));
}

fs.writeFileSync(reportOut, report);
console.log('Report saved to b1_overlap_report.txt');
