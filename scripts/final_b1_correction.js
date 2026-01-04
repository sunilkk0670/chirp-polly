/**
 * Final correction: Replace last 9 overlaps and add 4 words to Module 04
 */

const fs = require('fs');
const path = require('path');

const firestoreDataDir = path.join(__dirname, '..', 'firestore_data');

const finalReplacements = {
    'en_b1_m01': {
        'arbitrate': { word: 'mediate', phonetic: '/ˈmiːdieɪt/', usage: 'The neutral third party will mediate the labor dispute between management and union representatives effectively.' },
        'capability': { word: 'aptitude', phonetic: '/ˈæptɪtuːd/', usage: 'The team demonstrated exceptional aptitude in handling complex technical challenges under tight deadlines and pressure.' },
        'projection': { word: 'prognosis', phonetic: '/prɑːɡˈnoʊsɪs/', usage: 'The financial prognosis for the next quarter indicates steady growth despite current economic uncertainties.' },
        'specification': { word: 'blueprint', phonetic: '/ˈbluːprɪnt/', usage: 'The technical team will draft a detailed blueprint to outline all the necessary project requirements clearly.' }
    },
    'en_b1_m02': {
        'contamination': { word: 'toxicity', phonetic: '/tɑːkˈsɪsəti/', usage: 'Water toxicity from industrial waste poses serious health risks to communities living near manufacturing facilities.' },
        'collaboration': { word: 'synergy', phonetic: '/ˈsɪnərdʒi/', usage: 'The public-private synergy brought together government agencies and businesses to address infrastructure needs.' }
    },
    'en_b1_m03': {
        'adaptability': { word: 'versatility', phonetic: '/ˌvɜːrsəˈtɪləti/', usage: 'Versatility in changing circumstances is crucial for maintaining mental health and navigating life\'s unexpected challenges.' }
    },
    'en_b1_m04': {
        'auditorium': { word: 'amphitheater', phonetic: '/ˈæmfɪˌθiːətər/', usage: 'The ancient amphitheater hosted dramatic performances and public gatherings for thousands of spectators in classical times.' },
        'viewpoint': { word: 'standpoint', phonetic: '/ˈstændpɔɪnt/', usage: 'Understanding different cultural standpoints enriches our appreciation of art and broadens our worldview significantly always.' },
        // Add 4 new words to reach 100
        'NEW_1': { word: 'fresco', phonetic: '/ˈfreskoʊ/', usage: 'The Renaissance fresco adorning the chapel ceiling depicts biblical scenes with remarkable detail and vibrant colors.' },
        'NEW_2': { word: 'mosaic', phonetic: '/moʊˈzeɪɪk/', usage: 'Byzantine mosaics used tiny colored tiles to create stunning religious images that still dazzle visitors today.' },
        'NEW_3': { word: 'tapestry', phonetic: '/ˈtæpəstri/', usage: 'Medieval tapestries depicted historical events and mythological scenes woven with intricate patterns and rich symbolism throughout.' },
        'NEW_4': { word: 'mural', phonetic: '/ˈmjʊrəl/', usage: 'The street artist created a massive mural celebrating local culture and community history on the building.' }
    }
};

console.log('\n' + '='.repeat(80));
console.log('FINAL CORRECTION BATCH - Eliminating Last 9 Overlaps');
console.log('='.repeat(80) + '\n');

Object.keys(finalReplacements).forEach(moduleId => {
    const filePath = path.join(firestoreDataDir, `${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`Processing ${moduleId}: ${data.theme}`);
    console.log(`  Current: ${data.vocabularyItems.length} words`);

    const moduleReplacements = finalReplacements[moduleId];
    let replacedCount = 0;
    let addedCount = 0;

    // Replace existing words
    data.vocabularyItems = data.vocabularyItems.map(item => {
        const replacement = moduleReplacements[item.word];
        if (replacement) {
            replacedCount++;
            return {
                word: replacement.word,
                phonetic: replacement.phonetic,
                usage: replacement.usage
            };
        }
        return item;
    });

    // Add new words
    Object.keys(moduleReplacements).forEach(key => {
        if (key.startsWith('NEW_')) {
            const newWord = moduleReplacements[key];
            data.vocabularyItems.push({
                word: newWord.word,
                phonetic: newWord.phonetic,
                usage: newWord.usage
            });
            addedCount++;
        }
    });

    // Save
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`  ✓ Replaced: ${replacedCount} words`);
    console.log(`  ✓ Added: ${addedCount} new words`);
    console.log(`  ✓ Final: ${data.vocabularyItems.length} words\n`);
});

console.log('='.repeat(80));
console.log('✅ FINAL CORRECTION COMPLETE');
console.log('='.repeat(80) + '\n');
