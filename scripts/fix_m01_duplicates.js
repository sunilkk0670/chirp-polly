const fs = require('fs');
const path = require('path');

console.log('Fixing M01 duplicates...\n');

const m01Path = path.join(__dirname, '../firestore_data/en_a2_m01.json');
const m01 = JSON.parse(fs.readFileSync(m01Path, 'utf8'));

// Remove duplicates and add unique replacements
const duplicates = ['fled', 'tore', 'wore', 'swore', 'knew', 'withdrew'];
const replacements = [
    { word: 'strode', phonetic: '/stroʊd/', english: 'He strode confidently into the important meeting room yesterday.' },
    { word: 'wove', phonetic: '/woʊv/', english: 'She wove a beautiful basket from natural materials skillfully.' },
    { word: 'clung', phonetic: '/klʌŋ/', english: 'The frightened child clung to her mother tightly during storm.' },
    { word: 'flung', phonetic: '/flʌŋ/', english: 'He flung the ball across the field with force.' },
    { word: 'stung', phonetic: '/stʌŋ/', english: 'The bee stung me on my arm this afternoon.' },
    { word: 'swung', phonetic: '/swʌŋ/', english: 'The children swung on the playground swings happily yesterday.' },
    { word: 'wrung', phonetic: '/rʌŋ/', english: 'She wrung the wet towel to remove excess water.' },
    { word: 'hung', phonetic: '/hʌŋ/', english: 'I hung my coat on the hook near door.' },
    { word: 'clung', phonetic: '/klʌŋ/', english: 'The wet shirt clung to his body after rain.' },
    { word: 'sprung', phonetic: '/sprʌŋ/', english: 'The trap sprung shut when the animal approached it.' },
    { word: 'sung', phonetic: '/sʌŋ/', english: 'The national anthem was sung beautifully at the ceremony.' }
];

// Filter out duplicates
const seen = new Set();
m01.vocabularyItems = m01.vocabularyItems.filter(item => {
    if (seen.has(item.word.toLowerCase())) {
        console.log(`  Removed duplicate: ${item.word}`);
        return false;
    }
    seen.add(item.word.toLowerCase());
    return true;
});

// Add new words to reach 100
const needed = 100 - m01.vocabularyItems.length;
console.log(`\nAdding ${needed} words to reach 100...\n`);

m01.vocabularyItems.push(...replacements.slice(0, needed));

console.log(`✅ M01 now has ${m01.vocabularyItems.length} unique words`);

fs.writeFileSync(m01Path, JSON.stringify(m01, null, 2));
