const fs = require('fs');
const blacklist = require('./firestore_data/japanese_b1_m07_blacklist.json');
const blacklistSet = new Set(blacklist.words);

console.log(`Blacklist loaded: ${blacklistSet.size} words\n`);

// Helper function to check if a word is unique
function isUnique(word) {
    return !blacklistSet.has(word);
}

// Helper to validate a vocabulary item
function validateItem(item) {
    if (!item.word || !item.reading || !item.meaning || !item.example_sentence) {
        return { valid: false, error: 'Missing required fields' };
    }
    if (!isUnique(item.word)) {
        return { valid: false, error: `Word "${item.word}" is in blacklist` };
    }
    // Check for N3 grammar connectors
    const hasN3Grammar = /反面|うちに|によって/.test(item.example_sentence);
    if (!hasN3Grammar) {
        return { valid: false, error: 'Missing N3 grammar connector' };
    }
    return { valid: true };
}

// Module template
function createModule(moduleId, theme, order, vocabItems) {
    const validated = vocabItems.map((item, idx) => {
        const result = validateItem(item);
        if (!result.valid) {
            console.log(`❌ Item ${idx + 1}: ${result.error}`);
            return null;
        }
        return item;
    }).filter(item => item !== null);

    console.log(`✅ ${moduleId}: ${validated.length}/100 valid items`);

    return {
        moduleId,
        theme,
        order,
        vocabularyItems: validated,
        liarGameData: {
            trap: "[PLACEHOLDER]",
            correctVersion: "[PLACEHOLDER]",
            explanation: "[PLACEHOLDER]"
        }
    };
}

// Export helpers
module.exports = {
    blacklistSet,
    isUnique,
    validateItem,
    createModule
};

console.log('✅ Validation helper module ready');
