import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Final 15 M03 replacements
const replacements = {
    'Sich fühlen': { word: 'Das Empfinden', reading: 'das em-PFIN-den', meaning: 'Sensation / Perception (no plural)', example: 'Das Empfinden ist subjektiv. (The sensation is subjective.)' },
    'Sich ausruhen': { word: 'Die Regenerierung', reading: 'dee re-ge-ne-REE-roong', meaning: 'Regeneration / Recovery (no plural)', example: 'Die Regenerierung ist wichtig. (Regeneration is important.)' },
    'Gute Besserung!': { word: 'Vollständige Genesung', reading: 'FOL-shten-dee-ge ge-NAY-zoong', meaning: 'Full recovery (no plural)', example: 'Ich wünsche Ihnen vollständige Genesung. (I wish you full recovery.)' },
    'Abnehmen': { word: 'Die Gewichtsreduktion', reading: 'dee ge-VIKHT S-re-dook-tsyohn', meaning: 'Weight reduction (no plural)', example: 'Die Gewichtsreduktion ist erfolgreich. (The weight reduction is successful.)' },
    'Zunehmen': { word: 'Die Gewichtszunahme', reading: 'dee ge-VIKHTS-tsoo-na-me', meaning: 'Weight gain (no plural)', example: 'Die Gewichtszunahme ist unerwünscht. (The weight gain is undesirable.)' },
    'Die Ernährung': { word: 'Die Ernährungsweise', reading: 'dee er-NAY-roongs-vy-ze', meaning: 'Dietary habit / Way of eating (plural: Ernährungsweisen)', example: 'Die Ernährungsweise ist gesund. (The dietary habit is healthy.)' },
    'Sich bewegen': { word: 'Körperlich aktiv sein', reading: 'KOER-per-likh ak-TEEV zyne', meaning: 'To be physically active', example: 'Man sollte körperlich aktiv sein. (One should be physically active.)' },
    'Das Fitnessstudio': { word: 'Die Trainingseinrichtung', reading: 'dee TRAY-nings-eyn-rish-toong', meaning: 'Training facility (plural: Trainingseinrichtungen)', example: 'Die Trainingseinrichtung ist modern. (The training facility is modern.)' },
    'Die Entspannung': { word: 'Die Stressbewältigung', reading: 'dee STRES-be-vel-tee-goong', meaning: 'Stress management (no plural)', example: 'Die Stressbewältigung ist essentiell. (Stress management is essential.)' },
    'Der Schlaf': { word: 'Die Schlafqualität', reading: 'dee SHLAF-kva-lee-tet', meaning: 'Sleep quality (no plural)', example: 'Die Schlafqualität ist schlecht. (The sleep quality is poor.)' },
    'Die Pflege': { word: 'Die Hautvorsorge', reading: 'dee HOWT-for-zor-ge', reading: 'dee HOWT-for-zor-ge', meaning: 'Skin care prevention (no plural)', example: 'Die Hautvorsorge ist wichtig. (Skin care prevention is important.)' },
    'Das Vitamin': { word: 'Die Nährstoffzufuhr', reading: 'dee NAYR-shtof-tsoo-foor', meaning: 'Nutrient intake (no plural)', example: 'Die Nährstoffzufuhr ist ausreichend. (The nutrient intake is sufficient.)' },
    'Rauchen': { word: 'Der Nikotinkonsum', reading: 'dehr nee-ko-TEEN-kon-soom', meaning: 'Nicotine consumption (no plural)', example: 'Der Nikotinkonsum ist schädlich. (Nicotine consumption is harmful.)' }
};

// Load current M03
const m03Path = join(__dirname, '..', 'firestore_data', 'de_a2_m03.json');
const m03Data = JSON.parse(readFileSync(m03Path, 'utf8'));

// Apply replacements
let replacedCount = 0;
m03Data.lessons[0].vocabularyItems = m03Data.lessons[0].vocabularyItems.map(item => {
    if (replacements[item.word]) {
        const replacement = replacements[item.word];
        replacedCount++;
        return {
            word: replacement.word,
            reading: replacement.reading,
            meaning: replacement.meaning,
            example_sentence: replacement.example
        };
    }
    return item;
});

// Save updated M03
writeFileSync(m03Path, JSON.stringify(m03Data, null, 4));

console.log(`✅ Replaced ${replacedCount} final A1 overlaps in M03`);
console.log(`   Total M03 words: ${m03Data.lessons[0].vocabularyItems.length}`);
