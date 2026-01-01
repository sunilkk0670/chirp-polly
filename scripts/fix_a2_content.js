const fs = require('fs');
const path = require('path');

const DATA_DIR = 'c:\\Users\\Sindhu\\Desktop\\chirp-polly\\firestore_data';

// --- DATA MAPPING ---
// Map language codes to their expanded files and destination
// Note: Spanish A2 uses a mixture of deep and expanded. I'll rely on what's available.
const CONFIG = {
    japanese: {
        targetFile: 'japanese_a2_full.json',
        sourceFiles: [
            'japanese_a2_m1_expanded.json',
            'japanese_a2_m2_expanded.json',
            'japanese_a2_m3_expanded.json',
            'japanese_a2_m4_m5_batch.json' // Verify this exists or handle
        ],
        // Fallback if specific expected files are missing, try to find any japanese_a2_*.json
    },
    korean: {
        targetFile: 'korean_a2_full.json',
        sourceFiles: [
            'korean_a2_m1_deep.json', // Check this
            'korean_a2_modules.json' // Check if this has real content or check for other expanded files
        ]
    },
    spanish: {
        targetFile: 'spanish_a2_full.json',
        sourceFiles: [
            'spanish_a2_m1_deep.json',
            'spanish_a2_modules.json'
        ]
    }
};

function readJson(filename) {
    try {
        const filePath = path.join(DATA_DIR, filename);
        if (!fs.existsSync(filePath)) return null;
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        console.error(`Error reading ${filename}:`, e.message);
        return null;
    }
}

function writeJson(filename, data) {
    fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 4));
    console.log(`Updated ${filename}`);
}

function processJapanese() {
    console.log('Processing Japanese A2...');

    let allModules = [];

    // We want to combine all valid modules found in source files
    // Expanded files usually have a single root object which is the module itself, 
    // OR they might have a "modules" array. I need to be careful.

    const sources = [
        'japanese_a2_m1_expanded.json',
        'japanese_a2_m2_expanded.json',
        'japanese_a2_m3_expanded.json',
        // 'japanese_a2_m4_m5_batch.json' // Let's check structure if this exists
    ];

    sources.forEach(file => {
        const data = readJson(file);
        if (!data) return;

        let modulesToAdd = [];
        if (Array.isArray(data.modules)) {
            modulesToAdd = data.modules;
        } else if (data.moduleId) {
            modulesToAdd = [data];
        }

        modulesToAdd.forEach((mod, index) => {
            if (!mod.moduleId) {
                mod.moduleId = `japanese_a2_gen_${index + 1}`;
            }
            // Flatten nested lessons if they exist (Module -> Lessons -> VocabularyItems)
            if (mod.lessons && Array.isArray(mod.lessons)) {
                let flattenedVocab = [];
                let hasNested = false;

                mod.lessons.forEach(lesson => {
                    if (lesson.vocabularyItems && Array.isArray(lesson.vocabularyItems)) {
                        hasNested = true;
                        // Add each item, ensure it has necessary fields
                        lesson.vocabularyItems.forEach(item => {
                            // If kanji is present but targetText is missing, fix it
                            if (!item.targetText && item.kanji) item.targetText = item.kanji;
                            flattenedVocab.push(item);
                        });
                    } else {
                        // It might be a direct lesson item or mixed
                        flattenedVocab.push(lesson);
                    }
                });

                if (hasNested) {
                    console.log(`Flattening ${flattenedVocab.length} items for ${mod.moduleId}`);
                    // Replace lessons with the flat list
                    mod.lessons = flattenedVocab;
                    // Ensure compatibility with both datasource checks
                    mod.vocabularyItems = flattenedVocab;
                }
            }
            allModules.push(mod);
        });
    });

    // Verify we have real content
    if (allModules.length === 0) {
        console.error('No Japanese A2 content found to merge!');
        return;
    }

    const finalData = {
        modules: allModules
    };

    writeJson('japanese_a2_full.json', finalData);
}

function processKorean() {
    console.log('Processing Korean A2...');
    // Load available data
    let modulesToAdd = [];

    // Check modules file
    const modulesData = readJson('korean_a2_modules.json');
    if (modulesData && modulesData.korean_a2_modules) {
        modulesToAdd.push(...modulesData.korean_a2_modules);
    }

    // Check deep file
    const deepData = readJson('korean_a2_m1_deep.json');
    if (deepData && deepData.modules) {
        // Avoid duplicates if deep matches modules
        deepData.modules.forEach(m => {
            if (!modulesToAdd.find(existing => existing.moduleId === m.moduleId)) {
                modulesToAdd.push(m);
            }
        });
    }

    if (modulesToAdd.length === 0) {
        // Fallback to placeholders if absolutely nothing
        // But we should have something
    }

    // Ensure IDs
    modulesToAdd.forEach((m, i) => {
        if (!m.moduleId) {
            m.moduleId = `korean_a2_gen_${i + 1}`;
        }
    });

    writeJson('korean_a2_full.json', { modules: modulesToAdd });
}

function processSpanish() {
    console.log('Processing Spanish A2...');

    let modulesToAdd = [];

    const deepData = readJson('spanish_a2_m1_deep.json');
    if (deepData && deepData.modules) {
        modulesToAdd.push(...deepData.modules);
    }

    const modulesData = readJson('spanish_a2_modules.json');
    if (modulesData && modulesData.spanish_a2_modules) {
        modulesData.spanish_a2_modules.forEach(m => {
            if (!modulesToAdd.find(existing => existing.moduleId === m.moduleId)) {
                modulesToAdd.push(m);
            }
        });
    } else if (modulesData && modulesData.modules) {
        modulesData.modules.forEach(m => {
            if (!modulesToAdd.find(existing => existing.moduleId === m.moduleId)) {
                modulesToAdd.push(m);
            }
        });
    }

    // Ensure IDs
    modulesToAdd.forEach((m, i) => {
        if (!m.moduleId) {
            m.moduleId = `spanish_a2_gen_${i + 1}`;
        }
    });

    writeJson('spanish_a2_full.json', { modules: modulesToAdd });
}

processJapanese();
processKorean();
processSpanish();

console.log('Done!');
