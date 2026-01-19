const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'firestore_data');
const b1_m05_words = [
    "Der Zahlungsverkehr", "Die Kreditwürdigkeit", "Die Verschuldung", "Zinsen erwirtschaften",
    "Die Geldanlage (-n)", "Das Wertpapier (-e)", "Der Aktienmarkt", "Die Inflationsrate",
    "Nachhaltiger Konsum", "Die Mangelware", "Das Preis-Leistungs-Verhältnis", "Die Gewährleistung",
    "Der Kaufvertrag (-ä, e)", "Die Widerrufsfrist", "Das Schnäppchen (-)", "Die Verschwendung",
    "Der Konsumverzicht", "Die Kaufkraft", "Das Haushaltsbudget", "Die Ersparnisse (pl.)",
    "Der Dauerauftrag", "Die Lastschrift", "Die Kontoführungsgebühren", "Der Dispokredit",
    "Die Abhebung", "Die Einzahlung", "Der Kontoauszug", "Die Währung (-en)", "Der Wechselkurs",
    "Das Bargeld", "Die Geheimzahl", "Der Geldbeutel", "Die Geldverschwendung", "Die Finanzkrise",
    "Der Reichtum", "Die Armut", "Das Sparguthaben", "Der Schuldenberg", "Zahlungsunfähig",
    "Die Insolvenz", "Die Bonität", "Der Kreditantrag", "Die Rückzahlung", "Die Mahnung (-en)",
    "Die Inkasso", "Der Rechnungsbetrag", "Die Mehrwertsteuer", "Die Quittung (-en)",
    "Der Kassenbon", "Der Umtauch", "Die Rückerstattung", "Der Preisnachlass", "Das Sonderangebot",
    "Die Kundenkarte", "Das Konsumverhalten", "Die Markenware", "Die Massenproduktion",
    "Die Lieferzeit", "Die Versandkosten", "Der Onlineshop", "Der Warenkorb", "Die Bestellung",
    "Die Bestätigung", "Der Lieferstatus", "Die Reklamation", "Der Kundenservice", "Die Erreichbarkeit",
    "Die Qualitätssicherung", "Der Rohstoff (-e)", "Die Lieferkette", "Der faire Handel",
    "Das Bio-Siegel", "Die Regionalität", "Die Saisonalität", "Der Umweltschutz", "Das Recycling",
    "Die Müllvermeidung", "Die Plastikverpackung", "Die Einwegflasche", "Das Pfandsystem",
    "Der Minimalismus", "Die Genügsamkeit", "Der Luxus", "Die Lebenshaltung", "Das Vermögen",
    "Die Erbschaft", "Die Schenkung", "Das Taschengeld", "Die Finanzplanung", "Die Vorsorge",
    "Der Versicherungsschutz", "Die Police", "Der Schadensfall", "Die Entschädigung",
    "Die Rate", "Der Prospekt", "Sparen", "Die Provision", "Finanziell unabhängig", "Gute Geschäfte machen!"
];

const b1_m06_words = [
    "Der Studiengang (-ä, e)", "Die Immatrikulation", "Das Forschungsprojekt (-e)",
    "Die wissenschaftliche Arbeit", "Das Stipendium (-ien)", "Die Promotion (-en)",
    "Der Dozent (-en)", "Die Fachliteratur", "Das lebenslange Lernen",
    "Die Schlüsselqualifikation", "Die Führungskompetenz", "Das Projektmanagement",
    "Die berufliche Herausforderung", "Das Arbeitsklima", "Die Aufstiegschance (-n)",
    "Die Fortbildungsmaßnahme", "Das Selbststudium", "Die Lernmethode",
    "Die Konzentrationsfähigkeit", "Der Wissenstransfer", "Die Prüfungsvorbereitung",
    "Der Zeitdruck", "Die Überforderung", "Die Unterforderung", "Die Eigeninitiative",
    "Die Teamarbeit", "Die Kommunikationsfähigkeit", "Die Konfliktlösung",
    "Das Verhandlungsgeschick", "Die Kundenorientierung", "Die Belastbarkeit",
    "Die Zuverlässigkeit", "Die Pünktlichkeit", "Die Sorgfalt",
    "Das Verantwortungsbewusstsein", "Die Fachkenntnisse (pl.)", "Die Berufserfahrung",
    "Das Praktikumszeugnis", "Die Bewerbungsunterlagen", "Das Anschreiben",
    "Der Lebenslauf", "Das Vorstellungsgespräch", "Die Gehaltsvorstellung",
    "Der Arbeitsvertrag", "Die Probezeit", "Die Festanstellung",
    "Die Teilzeitbeschäftigung", "Die Gleitzeit", "Die Überstunden (pl.)",
    "Die Nachtschicht", "Der Urlaubsanspruch", "Die Lohnfortzahlung",
    "Die Kündigungsfrist", "Die Abfindung", "Die Rente", "Die Altersvorsorge",
    "Die Gewerkschaft", "Der Streik", "Die Tarifverhandlung", "Die Mitbestimmung",
    "Die Unternehmenskultur", "Die Hierarchie", "Die Weisungsbefugnis",
    "Der Vorgesetzte (-n)", "Die Zusammenarbeit", "Der Wissenstransfer",
    "Die Fehlerkultur", "Die Innovationskraft", "Die Digitalisierung",
    "Die Automatisierung", "Die künstliche Intelligenz", "Die berufliche Umorientierung",
    "Die Existenzgründung", "Die Selbstständigkeit", "Das Unternehmertum", "Das Risiko",
    "Die Rentabilität", "Die Nachhaltigkeit", "Die soziale Verantwortung",
    "Der Fachkräftemangel", "Der demografische Wandel", "Die Globalisierung",
    "Die Mobilität", "Die Flexibilität", "Die Work-Life-Balance", "Das Sabbatjahr",
    "Die berufliche Zufriedenheit", "Die Selbstverwirklichung", "Die Anerkennung",
    "Das Gehalt", "Die Sozialleistungen (pl.)", "Der Kündigungsgrund",
    "Die Arbeitslosigkeit", "Die Umschulung", "Das Gymnasium", "Die Promotion",
    "Der Mentor", "Der Chef", "Viel Erfolg bei Ihrer Karriere!"
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

function checkOverlaps(list, listName) {
    console.log(`\n--- Auditing ${listName} ---`);
    list.forEach(word => {
        // Strip suffixes like (-en), (pl.), (-ä, e) for better matching
        const cleanWord = word.replace(/\s\([^)]+\)/, '').trim();
        for (const [file, words] of Object.entries(corpus)) {
            if (words.some(w => w.replace(/\s\([^)]+\)/, '').trim().toLowerCase() === cleanWord.toLowerCase())) {
                console.log(`❌ Overlap: "${word}" found in ${file}`);
            }
        }
    });
}

checkOverlaps(b1_m05_words, "Module 05");
checkOverlaps(b1_m06_words, "Module 06");
