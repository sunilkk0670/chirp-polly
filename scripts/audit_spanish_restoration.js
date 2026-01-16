const fs = require('fs');
const path = require('path');

const files = [
    'spanish_a1_modules.json',
    'spanish_a2_modules.json',
    'spanish_b1_modules.json'
];

const dataPath = path.join(__dirname, '..', 'firestore_data');
let totalWords = 0;
const wordSet = new Set();
const placeholders = [];
const traps = [];

files.forEach(file => {
    const filePath = path.join(dataPath, file);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${file}`);
        return;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const level = file.split('_')[1].toUpperCase();

    data.modules.forEach(module => {
        const moduleId = module.moduleId;
        module.lessons.forEach((lesson, lIdx) => {
            lesson.vocabularyItems.forEach((item, vIdx) => {
                totalWords++;
                const word = item.targetText;

                // Track uniqueness
                if (wordSet.has(word) && word !== "Gato de Papel") {
                    console.warn(`Duplicate found: ${word} in ${moduleId}`);
                }
                wordSet.add(word);

                // Check for placeholders
                if (word.includes("Palabra") || word.includes("Expresión") || word.includes("Var ") || word.includes("Meaning ")) {
                    placeholders.push(`${moduleId} - ${word}`);
                }

                // Check for traps
                if (word === "Gato de Papel") {
                    traps.push(`${level} ${moduleId} Lesson ${lIdx + 1} Index ${vIdx + 1}`);
                }

                // Final word check
                if (word === "Meta alcanzada") {
                    console.log(`Final word found: Meta alcanzada in ${moduleId}`);
                }
            });
        });
    });
});

console.log("\n--- Audit Results ---");
console.log(`Total Words Audited: ${totalWords}`);
console.log(`Unique Words: ${wordSet.size}`);
console.log(`Placeholders Found: ${placeholders.length}`);
if (placeholders.length > 0) {
    console.log("Sample Placeholders:", placeholders.slice(0, 5));
}
console.log(`'Gato de Papel' Locations:`, traps);
console.log("----------------------");
