import { readFileSync } from 'fs';
import { join } from 'path';

const corpus = new Map();
for (let i = 1; i <= 10; i++) {
    const file = `de_a1_m${String(i).padStart(2, '0')}.json`;
    const data = JSON.parse(readFileSync(join('firestore_data', file), 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        const w = item.word.toLowerCase().trim();
        if (!corpus.has(w)) corpus.set(w, file);
    });
}
for (let i = 1; i <= 7; i++) {
    const file = `de_a2_m${String(i).padStart(2, '0')}.json`;
    const data = JSON.parse(readFileSync(join('firestore_data', file), 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        const w = item.word.toLowerCase().trim();
        if (!corpus.has(w)) corpus.set(w, file);
    });
}

const target = process.argv[2];
const words = target === 'm08' ? [
    'Der Mietvertrag', 'Die Kaltmiete', 'Die Nebenkosten', 'Die Kaution', 'Der Vermieter', 'Der Mieter', 'Die Wohnfläche', 'Das Erdgeschoss', 'Der Stock', 'Die Etage', 'Das Dach', 'Der Keller', 'Der Speicher', 'Dachboden', 'Die Garage', 'Der Stellplatz', 'Der Aufzug', 'Das Treppenhaus', 'Einziehen', 'Ausziehen', 'Kündigen', 'Möbliert', 'Leer', 'Die Nachbarschaft', 'Der Vorort', 'Zentral gelegen', 'Ruhig', 'Laut', 'Der Umzug', 'Packen', 'Auspacken', 'Der Karton', 'Renovieren', 'Tapezieren', 'Streichen', 'Reparieren', 'Kaputt', 'Funktionieren', 'Der Handwerker', 'Der Klempner', 'Der Elektriker', 'Die Heizung', 'Der Wasserhahn', 'Das Rohr', 'Verstopft', 'Die Steckdose', 'Die Sicherung', 'Der Schalter', 'Die Klimaanlage', 'Lüften', 'Der Müll', 'Abholen', 'Die Hausordnung', 'Rücksicht nehmen', 'Der Mitbewohner', 'Die Wohngemeinschaft', 'Die Einrichtung', 'Gemütlich', 'Hässlich', 'Schön', 'Modern', 'Das Regal', 'Der Teppich', 'Der Vorhang', 'Das Kissen', 'Die Decke', 'Die Bettwäsche', 'Das Handtuch', 'Der Spiegel', 'Die Seife', 'Das Toilettenpapier', 'Die Bürste', 'Kämmen', 'Rasieren', 'Schminken', 'Waschen', 'Spülen', 'Der Staubsauger', 'Saugen', 'Der Besen', 'Kehren', 'Wischen', 'Putzen', 'Sauber machen', 'Das Chaos', 'Ordentlich', 'Unordentlich', 'Die Miete', 'Sich wohlfühlen', 'Der Schlüssel'
] : [
    'Die Bildung', 'Die Grundschule', 'Das Gymnasium', 'Die Realschule', 'Der Mitschüler', 'Das Fach', 'Lieblingsfach', 'Die Note', 'Das Zeugnis', 'Die Prüfung bestehen', 'Durchfallen', 'Wiederholen', 'Das Abitur', 'Sich bewerben um', 'Der Studienplatz', 'Zulassen', 'Die Einschreibung', 'Das Semester', 'Die Vorlesung', 'Das Seminar', 'Der Professor', 'Der Student', 'Die Bibliothek', 'Recherchieren', 'Das Stipendium', 'Die Gebühr', 'Kostenlos', 'Die Ausbildung', 'Der Auszubildende', 'Der Meister', 'Die Erfahrung', 'Das Praktikum', 'Das Talent', 'Die Fähigkeit', 'Sich verbessern', 'Fortschritte machen', 'Die Zukunft', 'Die Absicht', 'Der Plan', 'Planen', 'Sich entscheiden für', 'Das Ziel', 'Der Traum', 'Träumen von', 'Die Hoffnung', 'Hoffen auf', 'Sich etwas vornehmen', 'Erreichen', 'Schaffen', 'Der Erfolg', 'Ehrgeizig', 'Fleißig', 'Geduldig', 'Mutig', 'Sicher', 'Unsicher', 'Die Entscheidung treffen', 'Vielleicht', 'Wahrscheinlich', 'Bestimmt', 'Auf keinen Fall', 'Auf jeden Fall', 'Die Möglichkeit', 'Die Chance', 'Sich ändern', 'Die Veränderung', 'Anders', 'Gleich', 'Das Risiko', 'Wagen', 'Die Karriere', 'Die Position', 'Leiten', 'Die Verantwortung', 'Sich spezialisieren auf', 'Wissen', 'Das Fachwissen', 'Die Kenntnisse', 'Die Fremdsprache', 'Fließend', 'Verhandlungssicher', 'Der Lebenslauf', 'Die Bewerbungsunterlagen', 'Das Vorstellungsgespräch'
];

words.forEach(w => {
    const low = w.toLowerCase().trim();
    if (corpus.has(low)) console.log(`[OVERLAP] ${w} -> ${corpus.get(low)}`);
});
