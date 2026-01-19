import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Replacement mapping
const replacements = {
    'Sich bewerben': { word: 'Die Stellenausschreibung', reading: 'dee SHTEL-en-ows-shry-boong', meaning: 'Job advertisement (plural: Stellenausschreibungen)', example: 'Die Stellenausschreibung ist online. (The job advertisement is online.)' },
    'Das Vorstellungsgespräch': { word: 'Die Gehaltsverhandlung', reading: 'dee ge-HALTS-fer-hant-loong', meaning: 'Salary negotiation (plural: Gehaltsverhandlungen)', example: 'Die Gehaltsverhandlung war erfolgreich. (The salary negotiation was successful.)' },
    'Der Lebenslauf': { word: 'Das Motivationsschreiben', reading: 'das mo-tee-va-TSYOHNS-shry-ben', meaning: 'Letter of motivation (plural: Motivationsschreiben)', example: 'Das Motivationsschreiben ist wichtig. (The letter of motivation is important.)' },
    'Einstellen': { word: 'Einarbeiten', reading: 'EYN-ar-by-ten', meaning: 'To train / onboard', example: 'Wir arbeiten neue Mitarbeiter ein. (We onboard new employees.)' },
    'Arbeitslos': { word: 'Die Erwerbstätigkeit', reading: 'dee er-VERPS-te-tish-kyte', meaning: 'Gainful employment (no plural)', example: 'Die Erwerbstätigkeit ist wichtig. (Gainful employment is important.)' },
    'Das Team': { word: 'Die Belegschaft', reading: 'dee be-LAYK-shaft', meaning: 'The workforce / staff (plural: Belegschaften)', example: 'Die Belegschaft ist motiviert. (The workforce is motivated.)' },
    'Der Erfolg': { word: 'Die Zielsetzung', reading: 'dee TSEEL-zet-soong', meaning: 'Goal setting (plural: Zielsetzungen)', example: 'Die Zielsetzung ist klar. (The goal setting is clear.)' },
    'Erfolgreich': { word: 'Wettbewerbsfähig', reading: 'VET-be-verps-fay-ish', meaning: 'Competitive', example: 'Das Unternehmen ist wettbewerbsfähig. (The company is competitive.)' },
    'Die Erfahrung': { word: 'Die Fachkompetenz', reading: 'dee FAKH-kom-pe-tents', meaning: 'Professional expertise (no plural)', example: 'Die Fachkompetenz ist entscheidend. (Professional expertise is crucial.)' },
    'Organisieren': { word: 'Strukturieren', reading: 'strook-too-REE-ren', meaning: 'To structure / organize', example: 'Wir strukturieren den Prozess. (We structure the process.)' },
    'Planen': { word: 'Koordinieren', reading: 'ko-or-dee-NEE-ren', meaning: 'To coordinate', example: 'Ich koordiniere das Projekt. (I coordinate the project.)' },
    'Die Sitzung': { word: 'Die Videokonferenz', reading: 'dee VEE-de-oh-kon-fe-rents', meaning: 'Video conference (plural: Videokonferenzen)', example: 'Die Videokonferenz beginnt um 10 Uhr. (The video conference starts at 10 o\'clock.)' },
    'Absagen': { word: 'Annullieren', reading: 'a-noo-LEE-ren', meaning: 'To annul / cancel formally', example: 'Wir müssen den Termin annullieren. (We have to cancel the appointment formally.)' },
    'Verschieben': { word: 'Vertagen', reading: 'fer-TA-gen', meaning: 'To adjourn / postpone', example: 'Wir vertagen die Entscheidung. (We adjourn the decision.)' },
    'Das Dokument': { word: 'Die Unterlage', reading: 'dee OON-ter-la-ge', meaning: 'The document / record (plural: Unterlagen)', example: 'Die Unterlagen sind vollständig. (The documents are complete.)' },
    'Die Unterschrift': { word: 'Die Beglaubigung', reading: 'dee be-GLOW-bee-goong', meaning: 'Legal attestation / notarization (plural: Beglaubigungen)', example: 'Die Beglaubigung ist notwendig. (The notarization is necessary.)' },
    'Der Umschlag': { word: 'Das Einschreiben', reading: 'das EYN-shry-ben', meaning: 'Registered mail (plural: Einschreiben)', example: 'Ich schicke ein Einschreiben. (I\'m sending registered mail.)' },
    'Die Briefmarke': { word: 'Das Porto', reading: 'das POR-toh', meaning: 'Postage (no plural)', example: 'Das Porto beträgt 1 Euro. (The postage is 1 euro.)' },
    'Der Kunde': { word: 'Der Auftraggeber', reading: 'dehr OWF-trahk-gay-ber', meaning: 'The client / contractor (plural: Auftraggeber)', example: 'Der Auftraggeber ist zufrieden. (The client is satisfied.)' },
    'Die Beratung': { word: 'Die Kundenbetreuung', reading: 'dee KOON-den-be-troy-oong', meaning: 'Customer support (no plural)', example: 'Die Kundenbetreuung ist exzellent. (The customer support is excellent.)' },
    'Der Handel': { word: 'Der Vertrieb', reading: 'dehr fer-TREEP', meaning: 'Sales / Distribution (no plural)', example: 'Der Vertrieb läuft gut. (Sales are going well.)' },
    'Die Konkurrenz': { word: 'Der Mitbewerber', reading: 'dehr MIT-be-ver-ber', meaning: 'The competitor (plural: Mitbewerber)', example: 'Der Mitbewerber ist stark. (The competitor is strong.)' },
    'Das Unternehmen': { word: 'Der Konzern', reading: 'dehr kon-TSERN', meaning: 'Large corporation (plural: Konzerne)', example: 'Der Konzern ist international. (The corporation is international.)' },
    'Der Betrieb': { word: 'Die Zweigstelle', reading: 'dee TSVYK-shtel-e', meaning: 'Branch office (plural: Zweigstellen)', example: 'Die Zweigstelle ist in München. (The branch office is in Munich.)' },
    'Selbstständig': { word: 'Freiberuflich', reading: 'FRY-be-roof-likh', meaning: 'Freelance', example: 'Ich arbeite freiberuflich. (I work freelance.)' },
    'Die Kreditkarte': { word: 'Die Lastschrift', reading: 'dee LAST-shrift', meaning: 'Direct debit (plural: Lastschriften)', example: 'Die Lastschrift wird abgebucht. (The direct debit is charged.)' },
    'Geld abheben': { word: 'Dauerauftrag', reading: 'DOW-er-owf-trahk', meaning: 'Standing order (plural: Daueraufträge)', example: 'Ich richte einen Dauerauftrag ein. (I\'m setting up a standing order.)' },
    'Die Krise': { word: 'Der Konjunkturrückgang', reading: 'dehr kon-yoonk-TOOR-ruek-gang', meaning: 'Economic recession (plural: Konjunkturrückgänge)', example: 'Der Konjunkturrückgang ist spürbar. (The economic recession is noticeable.)' },
    'Sicher': { word: 'Die Gewährleistung', reading: 'dee ge-VAYR-ly-stoong', meaning: 'Guarantee / Warranty (plural: Gewährleistungen)', example: 'Die Gewährleistung beträgt zwei Jahre. (The warranty is two years.)' },
    'Die Lösung': { word: 'Die Problembewältigung', reading: 'dee pro-BLAYM-be-vel-tee-goong', meaning: 'Problem solving / coping (no plural)', example: 'Die Problembewältigung ist wichtig. (Problem solving is important.)' },
    'Entscheiden': { word: 'Beschließen', reading: 'be-SHLEES-en', meaning: 'To resolve / decide formally', example: 'Wir beschließen eine neue Strategie. (We resolve on a new strategy.)' },
    'Zufrieden': { word: 'Die Wertschätzung', reading: 'dee VERT-shet-soong', meaning: 'Appreciation / Esteem (no plural)', example: 'Die Wertschätzung ist hoch. (The appreciation is high.)' },
    'Pünktlich': { word: 'Die Fristeinhaltung', reading: 'dee FRIST-eyn-hal-toong', meaning: 'Meeting deadlines (no plural)', example: 'Die Fristeinhaltung ist wichtig. (Meeting deadlines is important.)' },
    'Kreativ': { word: 'Das Innovationspotenzial', reading: 'das in-no-va-TSYOHNS-po-ten-tsyal', meaning: 'Innovation potential (no plural)', example: 'Das Innovationspotenzial ist groß. (The innovation potential is great.)' }
};

// Load current M02
const m02Path = join(__dirname, '..', 'firestore_data', 'de_a2_m02.json');
const m02Data = JSON.parse(readFileSync(m02Path, 'utf8'));

// Apply replacements
m02Data.lessons[0].vocabularyItems = m02Data.lessons[0].vocabularyItems.map(item => {
    if (replacements[item.word]) {
        const replacement = replacements[item.word];
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

console.log('✅ Successfully replaced 34 A1 overlaps in M02');
console.log(`   Total words: ${m02Data.lessons[0].vocabularyItems.length}`);
