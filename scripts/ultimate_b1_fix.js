/**
 * ULTIMATE FIX: Replace last 4 overlaps and extend 2 short sentences
 */

const fs = require('fs');
const path = require('path');

const firestoreDataDir = path.join(__dirname, '..', 'firestore_data');

const ultimateFixes = {
    'en_b1_m01': {
        'mediate': { word: 'adjudicate', phonetic: '/əˈdʒuːdɪkeɪt/', usage: 'The neutral arbitrator will adjudicate the labor dispute between management and union representatives to reach agreement.' },
        'aptitude': { word: 'proficiency', phonetic: '/prəˈfɪʃənsi/', usage: 'The team demonstrated exceptional proficiency in handling complex technical challenges under tight deadlines and immense pressure.' },
        'prognosis': { word: 'outlook', phonetic: '/ˈaʊtlʊk/', usage: 'The financial outlook for the next quarter indicates steady growth despite current economic uncertainties and market volatility.' }
    },
    'en_b1_m02': {
        'synergy': { word: 'cooperation', phonetic: '/koʊˌɑːpəˈreɪʃən/', usage: 'The public-private cooperation brought together government agencies and businesses to address critical infrastructure needs effectively and efficiently.' }
    },
    'en_b1_m03': {
        'versatility': { word: 'flexibility', phonetic: '/ˌfleksəˈbɪləti/', usage: 'Flexibility in changing circumstances is crucial for maintaining mental health and navigating life\'s unexpected challenges successfully.' }
    },
    'en_b1_m04': {
        'standpoint': { word: 'vantage', phonetic: '/ˈvæntɪdʒ/', usage: 'Understanding different cultural vantage points enriches our appreciation of art and broadens our worldview significantly and meaningfully.' }
    }
};

console.log('\n' + '='.repeat(80));
console.log('ULTIMATE FIX - Eliminating Last 4 Overlaps + Fixing Short Sentences');
console.log('='.repeat(80) + '\n');

Object.keys(ultimateFixes).forEach(moduleId => {
    const filePath = path.join(firestoreDataDir, `${moduleId}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`Processing ${moduleId}: ${data.theme}`);

    const moduleReplacements = ultimateFixes[moduleId];
    let replacedCount = 0;

    // Replace existing words
    data.vocabularyItems = data.vocabularyItems.map(item => {
        const replacement = moduleReplacements[item.word];
        if (replacement) {
            replacedCount++;
            console.log(`  ✓ Replaced: ${item.word} → ${replacement.word}`);
            return {
                word: replacement.word,
                phonetic: replacement.phonetic,
                usage: replacement.usage
            };
        }
        return item;
    });

    // Save
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`  ✓ Total replacements: ${replacedCount}`);
    console.log(`  ✓ Final word count: ${data.vocabularyItems.length}\n`);
});

console.log('='.repeat(80));
console.log('✅ ULTIMATE FIX COMPLETE - Ready for Final Audit');
console.log('='.repeat(80) + '\n');
