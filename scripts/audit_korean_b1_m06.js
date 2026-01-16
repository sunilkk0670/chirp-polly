import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../firestore_data');
const b1m06Path = path.join(dataDir, 'korean_b1_m06.json');

// Master set paths (simplified check against existing B1 modules for now)
const masterFiles = [
    'korean_b1_m01.json',
    'korean_b1_m02.json',
    'korean_b1_m03.json',
    'korean_b1_m04.json',
    'korean_b1_m05.json'
];

async function runAudit() {
    console.log('--- 🧪 KOREAN B1 MODULE 06 AUDIT ---\n');

    // 1. Load B1M06
    if (!fs.existsSync(b1m06Path)) {
        console.error('❌ Error: Module 06 file not found.');
        return;
    }
    const b1m06 = JSON.parse(fs.readFileSync(b1m06Path, 'utf8'));
    const currentWords = b1m06.lessons.map(l => l.targetText);

    // 2. Internal Duplicate Check
    const internalDuplicates = currentWords.filter((w, i) => currentWords.indexOf(w) !== i);
    if (internalDuplicates.length > 0) {
        console.error(`❌ Internal Duplicates Found (${internalDuplicates.length}):`, internalDuplicates);
    } else {
        console.log('✅ No Internal Duplicates.');
    }

    // 3. Word Count Check
    if (currentWords.length === 100) {
        console.log('✅ Word Count: Exactly 100.');
    } else {
        console.error(`❌ Incorrect Word Count: ${currentWords.length} (Expected 100).`);
    }

    // 4. Overlap Check with previous B1 modules
    console.log('\n--- 🕵️ OVERLAP AUDIT (B1 M1-M5) ---\n');
    let totalOverlaps = 0;

    for (const file of masterFiles) {
        const filePath = path.join(dataDir, file);
        if (fs.existsSync(filePath)) {
            const masterData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const masterWords = masterData.lessons.map(l => l.targetText);
            const overlaps = currentWords.filter(w => masterWords.includes(w));

            if (overlaps.length > 0) {
                console.error(`❌ Overlaps with ${file} (${overlaps.length}):`, overlaps);
                totalOverlaps += overlaps.length;
            } else {
                console.log(`✅ No overlaps with ${file}.`);
            }
        }
    }

    if (totalOverlaps === 0) {
        console.log('\n✅ CUMULATIVE AUDIT PASSED (0 conflicts across B1 M1-M6).');
    } else {
        console.error(`\n❌ CUMULATIVE AUDIT FAILED: ${totalOverlaps} overlaps found.`);
    }

    // 5. Generate Proof Tables for Markdown
    console.log('\n--- 📊 PROOF TABLES ---\n');

    console.log('### Words 1-20');
    console.table(b1m06.lessons.slice(0, 20).map((l, i) => ({
        '#': (i + 1).toString().padStart(2, '0'),
        'Korean': l.targetText,
        'English': l.english
    })));

    console.log('\n### Words 85-100');
    console.table(b1m06.lessons.slice(84, 100).map((l, i) => ({
        '#': (i + 85).toString().padStart(2, '0'),
        'Korean': l.targetText,
        'English': l.english
    })));
}

runAudit();
