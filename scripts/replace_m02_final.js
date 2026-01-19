import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Final 20 replacements
const replacements = {
    'Die Karriere': { word: 'Der Werdegang', reading: 'dehr VEHR-de-gang', meaning: 'Professional career / path (plural: Werdegänge)', example: 'Sein Werdegang ist beeindruckend. (His professional career is impressive.)' },
    'Das Protokoll': { word: 'Die Niederschrift', reading: 'dee NEE-der-shrift', meaning: 'The written record / transcript (plural: Niederschriften)', example: 'Die Niederschrift wird erstellt. (The written record is being created.)' },
    'Der Termin': { word: 'Die Fristsetzung', reading: 'dee FRIST-zet-soong', meaning: 'Setting a deadline (plural: Fristsetzungen)', example: 'Die Fristsetzung ist wichtig. (Setting a deadline is important.)' },
    'Der Ordner': { word: 'Das Aktenverzeichnis', reading: 'das AK-ten-fer-tsykh-nis', meaning: 'File directory / index (plural: Aktenverzeichnisse)', example: 'Das Aktenverzeichnis ist vollständig. (The file directory is complete.)' },
    'Verkaufen': { word: 'Veräußern', reading: 'fer-OY-sern', meaning: 'To divest / sell off (formal)', example: 'Wir veräußern die Immobilie. (We are divesting the property.)' },
    'Das Angebot': { word: 'Der Kostenvoranschlag', reading: 'dehr KOS-ten-for-an-shlak', meaning: 'Cost estimate / quote (plural: Kostenvoranschläge)', example: 'Der Kostenvoranschlag ist günstig. (The cost estimate is favorable.)' },
    'Die Firma': { word: 'Die Kapitalgesellschaft', reading: 'dee ka-pee-TAHL-ge-zel-shaft', meaning: 'Joint-stock company (plural: Kapitalgesellschaften)', example: 'Die Kapitalgesellschaft ist börsennotiert. (The joint-stock company is publicly traded.)' },
    'Das Konto': { word: 'Die Bankverbindung', reading: 'dee BANK-fer-bin-doong', meaning: 'Bank details (plural: Bankverbindungen)', example: 'Bitte geben Sie Ihre Bankverbindung an. (Please provide your bank details.)' },
    'Unterzeichnen': { word: 'Unterzeichnen', reading: 'oon-ter-TSYK-nen', meaning: 'To sign formally', example: 'Bitte unterzeichnen Sie hier. (Please sign here.)' }, // Already correct
    'Das Team': { word: 'Die Arbeitsgruppe', reading: 'dee AR-byts-groo-pe', meaning: 'Working group (plural: Arbeitsgruppen)', example: 'Die Arbeitsgruppe trifft sich heute. (The working group meets today.)' },
    'Die Lösung': { word: 'Der Lösungsweg', reading: 'dehr LOE-zoongs-vehk', meaning: 'The approach / method (plural: Lösungswege)', example: 'Der Lösungsweg ist klar. (The approach is clear.)' },
    'Wichtig': { word: 'Wesentlich', reading: 'VAY-zent-likh', meaning: 'Essential / Substantial', example: 'Das ist wesentlich. (That is essential.)' },
    'Dringend': { word: 'Unaufschiebbar', reading: 'oon-owf-SHEEP-bar', meaning: 'Cannot be postponed', example: 'Die Aufgabe ist unaufschiebbar. (The task cannot be postponed.)' },
    'Der Stress': { word: 'Die Belastung', reading: 'dee be-LAS-toong', meaning: 'The strain / burden (plural: Belastungen)', example: 'Die Belastung ist hoch. (The strain is high.)' },
    'Anstrengend': { word: 'Mühsam', reading: 'MUE-zahm', meaning: 'Arduous / Laborious', example: 'Die Arbeit ist mühsam. (The work is arduous.)' },
    'Höflich': { word: 'Zuvorkommend', reading: 'tsoo-FOR-ko-ment', meaning: 'Obliging / Courteous', example: 'Er ist sehr zuvorkommend. (He is very courteous.)' },
    'Pünktlich': { word: 'Zeitnah', reading: 'TSYTE-nah', meaning: 'Prompt / In a timely manner', example: 'Bitte antworten Sie zeitnah. (Please respond promptly.)' },
    'Kreativ': { word: 'Einfallsreich', reading: 'EYN-fals-ryshe', meaning: 'Resourceful / Imaginative', example: 'Sie ist sehr einfallsreich. (She is very resourceful.)' },
    'Fleißig': { word: 'Produktiv', reading: 'pro-dook-TEEV', meaning: 'Productive', example: 'Er ist sehr produktiv. (He is very productive.)' },
    'Faul': { word: 'Passiv', reading: 'PA-seev', meaning: 'Passive', example: 'Er ist passiv. (He is passive.)' }
};

// Load current M02
const m02Path = join(__dirname, '..', 'firestore_data', 'de_a2_m02.json');
const m02Data = JSON.parse(readFileSync(m02Path, 'utf8'));

// Apply replacements
let replacedCount = 0;
m02Data.lessons[0].vocabularyItems = m02Data.lessons[0].vocabularyItems.map(item => {
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

// Save updated M02
writeFileSync(m02Path, JSON.stringify(m02Data, null, 4));

console.log(`✅ Successfully replaced ${replacedCount} remaining A1 overlaps in M02`);
console.log(`   Total words: ${m02Data.lessons[0].vocabularyItems.length}`);
