const fs = require('fs');
const path = require('path');

const dataDir = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data';

// Load all A1 modules as master set
const a1Files = ['ko_a1_m01.json', 'ko_a1_m02.json', 'ko_a1_m03.json', 'ko_a1_m04.json', 'ko_a1_m05.json',
    'ko_a1_m06.json', 'ko_a1_m07.json', 'ko_a1_m08.json', 'ko_a1_m09.json', 'ko_a1_m10.json'];

const a2Files = ['ko_a2_m01.json', 'ko_a2_m02.json', 'ko_a2_m03.json', 'ko_a2_m04.json', 'ko_a2_m05.json', 'ko_a2_m06.json', 'ko_a2_m07.json', 'ko_a2_m08.json', 'ko_a2_m09.json', 'ko_a2_m10.json'];

const globalSeen = new Set();

// Load A1 words into global set
console.log('Loading A1 master set (1,000 words)...');
a1Files.forEach(file => {
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        globalSeen.add(item.word);
    });
});
console.log(`A1 Master Set: ${globalSeen.size} words\n`);

// Check A2 modules
function sanitizeFile(filename, replacements) {
    const filePath = path.join(dataDir, filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const words = data.lessons[0].vocabularyItems;

    const localSeen = new Set();
    const duplicates = [];
    const a1Conflicts = [];

    words.forEach((item, index) => {
        // Check against A1
        if (globalSeen.has(item.word)) {
            a1Conflicts.push({ index: index + 1, word: item.word });
        }
        // Check within module
        if (localSeen.has(item.word)) {
            duplicates.push({ index: index + 1, word: item.word });
        }
        localSeen.add(item.word);
    });

    if (a1Conflicts.length > 0) {
        console.log(`❌ ${filename}: Found ${a1Conflicts.length} conflicts with A1:`);
        a1Conflicts.forEach(d => console.log(`   Word ${d.index}: ${d.word}`));
    }

    if (duplicates.length > 0) {
        console.log(`❌ ${filename}: Found ${duplicates.length} internal duplicates:`);
        duplicates.forEach(d => console.log(`   Word ${d.index}: ${d.word}`));
    }

    // Apply replacements
    if (replacements.length > 0) {
        console.log(`\n🔧 Applying ${replacements.length} replacements to ${filename}...`);
        replacements.forEach((replacement, idx) => {
            if (idx < words.length) {
                words[words.length - replacements.length + idx] = replacement;
            }
        });
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

    // Add to global set
    words.forEach(item => globalSeen.add(item.word));

    console.log(`${filename}: Final count: ${words.length}`);

    if (a1Conflicts.length === 0 && duplicates.length === 0) {
        console.log(`✅ ${filename}: Clean!\n`);
    } else {
        console.log('');
    }
}

// Sanitize A2 Module 1
sanitizeFile('ko_a2_m01.json', []);

// Sanitize A2 Module 2
sanitizeFile('ko_a2_m02.json', []);

// Sanitize A2 Module 3
sanitizeFile('ko_a2_m03.json', []);

// Sanitize A2 Module 4
sanitizeFile('ko_a2_m04.json', []);

// Sanitize A2 Module 5
sanitizeFile('ko_a2_m05.json', []);

// Sanitize A2 Module 6
sanitizeFile('ko_a2_m06.json', []);

// Sanitize A2 Module 7
sanitizeFile('ko_a2_m07.json', []);

// Sanitize A2 Module 8
sanitizeFile('ko_a2_m08.json', []);

// Sanitize A2 Module 9
sanitizeFile('ko_a2_m09.json', []);

// Sanitize A2 Module 10
sanitizeFile('ko_a2_m10.json', []);

console.log('\n📊 Final Statistics:');
console.log(`Total unique words (A1 + A2): ${globalSeen.size}`);
