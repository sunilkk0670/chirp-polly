import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// M03 replacements
const replacements = {
    'Die Krankheit': { word: 'Das Krankheitsbild', reading: 'das KRANK-hyts-bilt', meaning: 'Clinical picture / symptoms (plural: Krankheitsbilder)', example: 'Das Krankheitsbild ist komplex. (The clinical picture is complex.)' },
    'Das Fieber': { word: 'Die Körpertemperatur', reading: 'dee KOER-per-tem-pe-ra-toor', meaning: 'Body temperature (plural: Körpertemperaturen)', example: 'Die Körpertemperatur ist erhöht. (The body temperature is elevated.)' },
    'Die Verletzung': { word: 'Die Gewebeschädigung', reading: 'dee ge-VAY-be-shay-dee-goong', meaning: 'Tissue damage (plural: Gewebeschädigungen)', example: 'Die Gewebeschädigung ist schwer. (The tissue damage is severe.)' },
    'Das Pflaster': { word: 'Der Wundschnellverband', reading: 'dehr VOONT-shnel-fer-bant', meaning: 'Adhesive bandage (formal) (plural: Wundschnellverbände)', example: 'Der Wundschnellverband ist steril. (The adhesive bandage is sterile.)' },
    'Der Verband': { word: 'Die Kompresse', reading: 'dee kom-PRE-se', meaning: 'Sterile compress / gauze (plural: Kompressen)', example: 'Die Kompresse ist sauber. (The compress is clean.)' },
    'Das Medikament': { word: 'Das Arzneimittel', reading: 'das ARTS-ny-mit-el', meaning: 'Pharmaceutical drug (plural: Arzneimittel)', example: 'Das Arzneimittel ist verschreibungspflichtig. (The pharmaceutical drug requires prescription.)' },
    'Die Tablette': { word: 'Die Kapsel', reading: 'dee KAP-sel', meaning: 'The capsule (plural: Kapseln)', example: 'Die Kapsel ist leicht zu schlucken. (The capsule is easy to swallow.)' },
    'Die Salbe': { word: 'Die Tinktur', reading: 'dee tink-TOOR', meaning: 'The tincture (plural: Tinkturen)', example: 'Die Tinktur wirkt schnell. (The tincture works quickly.)' },
    'Die Schmerzen': { word: 'Die Beschwerden', reading: 'dee be-SHVEHR-den', meaning: 'Physical complaints / ailments (plural only)', example: 'Die Beschwerden sind chronisch. (The ailments are chronic.)' },
    'Die Klinik': { word: 'Die Klinik', reading: 'dee KLEE-neek', meaning: 'The clinic / specialist hospital (plural: Kliniken)', example: 'Die Klinik ist modern. (The clinic is modern.)' }, // Already correct
    'Der Arzt': { word: 'Der Mediziner', reading: 'dehr me-dee-TSEE-ner', meaning: 'Medical professional (plural: Mediziner)', example: 'Der Mediziner ist erfahren. (The medical professional is experienced.)' },
    'Die Drogerie': { word: 'Der Pharmazeut', reading: 'dehr far-ma-TSOYT', meaning: 'The pharmacist (plural: Pharmazeuten)', example: 'Der Pharmazeut berät mich. (The pharmacist advises me.)' },
    'Das ärztliche Rezept': { word: 'Die Verschreibung', reading: 'dee fer-SHRY-boong', meaning: 'The prescription (noun) (plural: Verschreibungen)', example: 'Die Verschreibung ist notwendig. (The prescription is necessary.)' },
    'Der Husten': { word: 'Der Reizhusten', reading: 'dehr RYT-shoo-sten', meaning: 'Dry / irritating cough (no plural)', example: 'Der Reizhusten ist lästig. (The dry cough is annoying.)' },
    'Der Schnupfen': { word: 'Die Nasenschleimhaut', reading: 'dee NA-zen-shlym-howt', meaning: 'Nasal mucous membrane (plural: Nasenschleimhäute)', example: 'Die Nasenschleimhaut ist gereizt. (The nasal mucous membrane is irritated.)' },
    'Gesund leben': { word: 'Das Wohlbefinden', reading: 'das VOHL-be-fin-den', meaning: 'Well-being / Wellness (no plural)', example: 'Das Wohlbefinden ist wichtig. (Well-being is important.)' },
    'Müde': { word: 'Die Erschöpfung', reading: 'dee er-SHUERP-foong', meaning: 'Exhaustion (no plural)', example: 'Die Erschöpfung ist total. (The exhaustion is total.)' },
    'Schwach': { word: 'Die Kraftlosigkeit', reading: 'dee KRAFT-lo-zish-kyte', meaning: 'Listlessness / Lack of strength (no plural)', example: 'Die Kraftlosigkeit ist besorgniserregend. (The lack of strength is worrying.)' },
    'Der Körper': { word: 'Die Anatomie', reading: 'dee a-na-to-MEE', meaning: 'Anatomy (no plural)', example: 'Die Anatomie ist komplex. (The anatomy is complex.)' },
    'Das Gesicht': { word: 'Der Kiefer', reading: 'dehr KEE-fer', meaning: 'The jaw (plural: Kiefer)', example: 'Der Kiefer schmerzt. (The jaw hurts.)' }
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

console.log(`✅ Successfully replaced ${replacedCount} A1 overlaps in M03`);
console.log(`   Total words: ${m03Data.lessons[0].vocabularyItems.length}`);
