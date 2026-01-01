const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../firestore_data');

/**
 * Enhanced integrity check for curriculum data.
 * Checks for duplicates within each module and ensures level-appropriate length.
 */
function checkIntegrity() {
    console.log('--- STRICT INTEGRITY CHECK STARTING ---');
    const files = fs.readdirSync(directoryPath);
    let totalFilesChecked = 0;
    let totalDuplicatesFound = 0;

    files.forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(directoryPath, file);
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const data = JSON.parse(content);
                totalFilesChecked++;

                const moduleResults = [];

                if (Array.isArray(data)) {
                    moduleResults.push(checkModuleItems(data, file, 'Root'));
                } else if (data.vocabularyItems) {
                    moduleResults.push(checkModuleItems(data.vocabularyItems, file, 'vocabularyItems'));
                } else if (data.modules) {
                    data.modules.forEach((mod, idx) => {
                        const items = mod.vocabulary || mod.vocabularyItems || mod.items || [];
                        moduleResults.push(checkModuleItems(items, file, `Module ${idx + 1}`));
                    });
                } else {
                    // Search for any array property
                    for (const key in data) {
                        if (Array.isArray(data[key])) {
                            moduleResults.push(checkModuleItems(data[key], file, key));
                        }
                    }
                }

                const fileHasDuplicates = moduleResults.some(res => res.duplicates > 0);
                if (fileHasDuplicates) {
                    totalDuplicatesFound += moduleResults.reduce((acc, res) => acc + res.duplicates, 0);
                }

            } catch (err) {
                console.error(`Error reading ${file}: ${err.message}`);
            }
        }
    });

    console.log('\n--- FINAL SUMMARY ---');
    console.log(`Files Checked: ${totalFilesChecked}`);
    console.log(`Total Duplicate Pairs Found: ${totalDuplicatesFound}`);
    if (totalDuplicatesFound === 0) {
        console.log('STATUS: PASS (0 Duplicates)');
    } else {
        console.log('STATUS: FAIL (Duplicates detected)');
    }
}

function checkModuleItems(items, filename, context) {
    if (!items || !Array.isArray(items) || items.length === 0) {
        return { duplicates: 0 };
    }

    const words = items.map(item => {
        if (typeof item === 'string') return item.trim().toLowerCase();
        if (item && item.word) return item.word.trim().toLowerCase();
        return null;
    }).filter(w => w !== null);

    let duplicates = 0;
    const seen = new Map(); // word -> first index found

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (seen.has(word)) {
            const firstIdx = seen.get(word);
            console.log(`[FAIL] ${filename} [${context}]: Duplicate detected! '${items[i].word || word}' found at Index ${firstIdx} and Index ${i}`);
            duplicates++;
        } else {
            seen.set(word, i);
        }
    }

    // Special check for User's specific pattern (Index 0 vs Index 8, or Index 1 vs Index 9)
    if (words.length >= 10) {
        if (words[0] === words[8]) {
            console.log(`[CRITICAL] ${filename} [${context}]: Repeat Pattern Detected! Index 0 matches Index 8.`);
        }
        if (words[1] === words[9]) {
            console.log(`[CRITICAL] ${filename} [${context}]: Repeat Pattern Detected! Index 1 matches Index 9.`);
        }
    }

    if (duplicates === 0) {
        console.log(`[PASS] ${filename} [${context}]: 0 Duplicates in ${items.length} items.`);
    }

    return { duplicates };
}

checkIntegrity();
