import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load all words from A1 and A2 M01-M03
const corpus = new Set();
const sources = new Map();

for (let i = 1; i <= 10; i++) {
    const file = `de_a1_m${String(i).padStart(2, '0')}.json`;
    const data = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', file), 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        const w = item.word.toLowerCase().trim();
        corpus.add(w);
        sources.set(w, file);
    });
}

for (let i = 1; i <= 3; i++) {
    const file = `de_a2_m${String(i).padStart(2, '0')}.json`;
    const data = JSON.parse(readFileSync(join(__dirname, '..', 'firestore_data', file), 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        const w = item.word.toLowerCase().trim();
        corpus.add(w);
        sources.set(w, file);
    });
}

const m04Words = [
    "Die Umgebung", "Die Vorfahrt", "Die Einbahnstraße", "Die Sackgasse", "Der Bürgersteig",
    "Der Zebrastreifen", "Die Ampel", "Der Stau", "Die Baustelle", "Umleitung",
    "Das Parkhaus", "Der Parkschein", "Die Ordnungswidrigkeit", "Das Bußgeld", "Abschleppen",
    "Die Tankstelle", "Tanken", "Bleifrei", "Der Diesel", "Die Werkstatt",
    "Die Panne", "Der Reifen", "Die Bremse", "Das Kennzeichen", "Der Führerschein",
    "Die Zulassung", "Mieten", "Der Mietwagen", "Die Versicherung", "Buchen",
    "Die Reservierung", "Bestätigen", "Stornieren", "Die Unterkunft", "Die Pension",
    "Die Ferienwohnung", "Der Aufenthalt", "Anmelden", "Abmelden", "Der Empfang",
    "Die Stadtführung", "Der Stadtplan", "Die Besichtigung", "Eintritt frei", "Ermäßigt",
    "Die Behörde", "Das Rathaus", "Das Amt", "Der Beamte", "Der Antrag",
    "Beantragen", "Die Genehmigung", "Gültig", "Abgelaufen", "Verlängern",
    "Die Staatsbürgerschaft", "Der Einwohner", "Die Bevölkerung", "Das Viertel", "Der Marktplatz",
    "Das Denkmal", "Der Brunnen", "Der Turm", "Das Gebäude", "Die Architektur",
    "Modernisieren", "Renovieren", "Zentral", "Abgelegen", "Die Hektik",
    "Der Lärm", "Lebendig", "Sicher", "Die Kriminalität", "Die Polizei",
    "Anzeigen", "Das Opfer", "Der Zeuge", "Aussagen", "Der Anwalt",
    "Das Gericht", "Die Justiz", "Das Gesetz", "Legal", "Illegal",
    "Verboten", "Erlaubt", "Verhaften", "Das Gefängnis", "Die Strafe",
    "Der Dom", "Der Oldtimer", "Die Autobahn", "Hell", "After", "Gift", "Viel Spaß in der Stadt!"
];

const overlaps = [];
m04Words.forEach(word => {
    const w = word.toLowerCase().trim();
    if (corpus.has(w)) {
        overlaps.push(`${word} (${sources.get(w)})`);
    }
});

console.log(`Common Overlaps फाउंड (${overlaps.length}):`);
console.log(overlaps.join(', '));
