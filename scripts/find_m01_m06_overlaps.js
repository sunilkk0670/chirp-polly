import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../firestore_data');
const b1m01 = JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_b1_m01.json'), 'utf8')).lessons.map(l => l.targetText);
const b1m06 = JSON.parse(fs.readFileSync(path.join(dataDir, 'korean_b1_m06.json'), 'utf8')).lessons.map(l => l.targetText);

const overlaps = b1m06.filter(w => b1m01.includes(w));
console.log('OVERLAPS WITH M01:', overlaps);
