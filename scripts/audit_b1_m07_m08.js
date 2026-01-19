const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'firestore_data');

const b1_m07_words = [
    "Erneuerbare Energien", "Die Energiewende", "Der Klimawandel", "Die Erderwärmung", "Das Treibhausgas",
    "Die CO2-Emissionen", "Der ökologische Fußabdruck", "Die Nachhaltigkeit", "Ressourcenschonend",
    "Die Artenvielfalt", "Das Artensterben", "Der Naturschutz", "Das Ökosystem", "Die Umweltverschmutzung",
    "Der Schadstoffausstoß", "Das Mikroplastik", "Die Meeresverschmutzung", "Die Müllverbrennung",
    "Die Kreislaufwirtschaft", "Die Wiederverwertung", "Die Solarenergie", "Die Windkraft", "Die Wasserkraft",
    "Die Geothermie", "Die Kernenergie", "Der Atomausstieg", "Die Energieeffizienz", "Die Wärmedämmung",
    "Der Stromverbrauch", "Die Versorgungssicherheit", "Die Mobilitätswende", "Der Ausbau der Schiene",
    "Die E-Mobilität", "Die Ladeinfrastruktur", "Der Verzicht auf Inlandsflüge", "Die Landwirtschaft",
    "Der ökologische Landbau", "Der Pestizideinsatz", "Die Massentierhaltung", "Die Lebensmittelsicherheit",
    "Die Wasserknappheit", "Die Dürreperiode", "Die Überschwemmung", "Die Naturkatastrophe",
    "Der Meeresspiegelanstieg", "Der Permafrostboden", "Das Ozonloch", "Der Umweltschutzaktivist",
    "Das zivile Engagement", "Die Petition", "Der politische Druck", "Das Klimaschutzabkommen",
    "Die Zukunftsvision", "Die technologische Innovation", "Die künstliche Intelligenz", "Die Digitalisierung",
    "Die Automatisierung", "Der demografische Wandel", "Die Bevölkerungsentwicklung", "Die Urbanisierung",
    "Die Globalisierung", "Der kulturelle Austausch", "Die Friedenssicherung", "Die soziale Gerechtigkeit",
    "Die Chancengleichheit", "Die Armutsbekämpfung", "Der Wohlstand für alle", "Die Lebensqualität",
    "Die psychische Gesundheit", "Die Achtsamkeit", "Die Entschleunigung", "Der Minimalismus",
    "Die Solidargemeinschaft", "Das Generationenprojekt", "Die Erneuerung", "Der Fortschritt", "Die Skepsis",
    "Das Verantwortungsgefühl", "Handeln erforderlich", "Die globale Krise", "Die Anpassungsfähigkeit",
    "Die Widerstandsfähigkeit", "Das Bewusstsein schärfen", "Die Bildungsinitiative", "Die technologische Wende",
    "Die Infrastrukturmaßnahme", "Der gesellschaftliche Zusammenhalt", "Eventuell", "Gift", "Hell",
    "Die Promotion", "Schützen wir unsere Erde!"
];

const b1_m08_words = [
    "Die Gesundheitsvorsorge", "Die Vorsorgeuntersuchung", "Das Gesundheitssystem", "Die Krankenversicherung",
    "Die Versichertenkarte", "Der Versicherungsschutz", "Die gesetzliche Krankenkasse", "Die Privatversicherung",
    "Die Zuzahlung", "Die Facharztüberweisung", "Die Diagnose stellen", "Das Krankheitsbild",
    "Die chronische Erkrankung", "Die Infektionskrankheit", "Die Heilungschancen", "Die Rehabilitation",
    "Die Physiotherapie", "Die Ergotherapie", "Die Alternativmedizin", "Die Homöopathie", "Die Akupunktur",
    "Das Immunsystem stärken", "Die Abwehrkräfte", "Die Entzündung", "Die Schmerzlinderung",
    "Das Betäubungsmittel", "Die Narkose", "Der chirurgische Eingriff", "Die Operationswunde",
    "Die Narbenbildung", "Die Blutwerte", "Der Cholesterinspiegel", "Der Bluthochdruck", "Der Herzinfarkt",
    "Der Schlaganfall", "Die Atemwege", "Das Asthma", "Die Allergie", "Die Unverträglichkeit",
    "Der Stoffwechsel", "Die Drüse", "Das Hormonsystem", "Die Schilddrüse", "Die Verdauung", "Die Darmflora",
    "Die Wirbelsäule", "Der Bandscheibenvorfall", "Das Gelenk", "Die Arthrose", "Die Muskulatur",
    "Die Bänderdehnung", "Die Knochendichte", "Die psychische Belastung", "Das Burnout-Syndrom",
    "Die Depression", "Die Angststörung", "Die Psychotherapie", "Die Verhaltenstherapie",
    "Die Stressbewältigung", "Die Entspannungstechnik", "Die Work-Life-Balance", "Der Schlafmangel",
    "Die Schlafstörung", "Die Hygienevorschriften", "Die Desinfektion", "Die Keimfreiheit",
    "Die Übertragung", "Der Erreger", "Die Schutzimpfung", "Die Nebenwirkung", "Der Beipackzettel",
    "Die Dosierung", "Die Überdosis", "Die Abhängigkeit", "Die Suchtprävention", "Der Entzug",
    "Die Erste Hilfe", "Der Notfallarzt", "Die Intensivstation", "Die Patientenverfügung", "Die Organspende",
    "Die Ethikkommission", "Die medizinische Forschung", "Der Proband", "Die klinische Studie",
    "Die Kur", "Das Präservativ", "After", "Brav", "Pickel", "Gute Besserung!"
];

const existingFiles = fs.readdirSync(dataDir).filter(f => f.startsWith('de_') && f.endsWith('.json'));
const corpus = {};

existingFiles.forEach(file => {
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    let words = [];
    if (data.lessons) {
        data.lessons.forEach(l => {
            l.vocabularyItems.forEach(vi => words.push(vi.word));
        });
    }
    corpus[file] = words;
});

function cleanForAudit(word) {
    return word.replace(/\s\([^)]+\)/g, '').replace(/\[TRAP\]/g, '').trim().toLowerCase();
}

function checkOverlaps(list, listName) {
    console.log(`\n--- Auditing ${listName} ---`);
    list.forEach(word => {
        const cleanWord = cleanForAudit(word);
        for (const [file, words] of Object.entries(corpus)) {
            if (words.some(w => cleanForAudit(w) === cleanWord)) {
                console.log(`❌ Overlap: "${word}" found in ${file}`);
            }
        }
    });
}

checkOverlaps(b1_m07_words, "Module 07");
checkOverlaps(b1_m08_words, "Module 08");
