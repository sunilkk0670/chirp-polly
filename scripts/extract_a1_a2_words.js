/**
 * Extract all English A1 and A2 words for B1 exclusion list
 */

const fs = require('fs');
const path = require('path');

const firestoreDataDir = path.join(__dirname, '..', 'firestore_data');
const outputFile = path.join(firestoreDataDir, 'en_a1_a2_exclusion_list.json');

// Extract words from all A1 and A2 modules
const extractWords = () => {
    const allWords = new Set();
    const wordDetails = [];

    // Process A1 modules (M01-M10)
    for (let i = 1; i <= 10; i++) {
        const moduleNum = i.toString().padStart(2, '0');
        const filePath = path.join(firestoreDataDir, `en_a1_m${moduleNum}.json`);

        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            data.vocabularyItems.forEach(item => {
                const word = item.word.toLowerCase().trim();
                allWords.add(word);
                wordDetails.push({
                    word: word,
                    level: 'A1',
                    module: `en_a1_m${moduleNum}`,
                    theme: data.theme
                });
            });
            console.log(`✓ Processed ${data.moduleId}: ${data.vocabularyItems.length} words`);
        }
    }

    // Process A2 modules (M01-M10)
    for (let i = 1; i <= 10; i++) {
        const moduleNum = i.toString().padStart(2, '0');
        const filePath = path.join(firestoreDataDir, `en_a2_m${moduleNum}.json`);

        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            data.vocabularyItems.forEach(item => {
                const word = item.word.toLowerCase().trim();
                allWords.add(word);
                wordDetails.push({
                    word: word,
                    level: 'A2',
                    module: `en_a2_m${moduleNum}`,
                    theme: data.theme
                });
            });
            console.log(`✓ Processed ${data.moduleId}: ${data.vocabularyItems.length} words`);
        }
    }

    // Save results
    const result = {
        totalUniqueWords: allWords.size,
        exclusionList: Array.from(allWords).sort(),
        detailedWordList: wordDetails,
        generatedAt: new Date().toISOString()
    };

    fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
    console.log(`\n✅ Extraction complete!`);
    console.log(`📊 Total unique words: ${allWords.size}`);
    console.log(`📁 Saved to: ${outputFile}`);

    return result;
};

// Run extraction
extractWords();
