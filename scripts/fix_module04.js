/**
 * Fix Module 04 duplicates and extend short sentences
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'firestore_data', 'en_b1_m04.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(`\nFixing Module 04: ${data.theme}`);
console.log(`Current word count: ${data.vocabularyItems.length}\n`);

// Track seen words to remove duplicates
const seenWords = new Set();
const uniqueItems = [];

data.vocabularyItems.forEach(item => {
    const word = item.word.toLowerCase();
    if (!seenWords.has(word)) {
        seenWords.add(word);

        // Fix short sentences (extend to 15+ words)
        if (item.word === 'theme') {
            item.usage = 'The novel explores profound themes of love, loss, and redemption through the complex experiences of characters.';
        } else if (item.word === 'motif') {
            item.usage = 'The recurring floral motif in the ancient tapestry represents the cycle of life and beauty of nature.';
        } else if (item.word === 'irony') {
            item.usage = 'The story\'s dramatic irony lies in the fact that the character\'s greatest strength ultimately becomes weakness.';
        } else if (item.word === 'tragedy') {
            item.usage = 'Shakespeare\'s tragedies explore profound human flaws and the devastating consequences of poor decisions leading to downfall.';
        } else if (item.word === 'farce') {
            item.usage = 'The theatrical farce used exaggerated situations and physical humor to entertain audiences and provoke genuine laughter.';
        } else if (item.word === 'apprenticeship') {
            item.usage = 'The young craftsman completed a rigorous five-year apprenticeship learning traditional woodworking techniques from master carpenter.';
        }

        uniqueItems.push(item);
    } else {
        console.log(`  ⚠️  Removed duplicate: ${item.word}`);
    }
});

data.vocabularyItems = uniqueItems;

console.log(`\nAfter removing duplicates: ${data.vocabularyItems.length} words`);

// Save
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`✓ Module 04 fixed and saved\n`);
