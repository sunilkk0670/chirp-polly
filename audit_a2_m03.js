import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "firestore_data");
const allPaths = [
    "ita_a1_m01.json", "ita_a1_m02.json", "ita_a1_m03.json",
    "ita_a1_m04.json", "ita_a1_m05.json", "ita_a1_m06.json",
    "ita_a1_m07.json", "ita_a1_m08.json", "ita_a1_m09.json", "ita_a1_m10.json",
    "ita_a2_m01.json", "ita_a2_m02.json"
];

let existing = new Set();
allPaths.forEach(p => {
    const filePath = path.join(dataDir, p);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        data.lessons.forEach(l => l.vocabularyItems.forEach(i => {
            const w = i.word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
            existing.add(w);
        }));
    }
});

const m03A2Proposed = [
    "L'itinerario", "La destinazione", "Il viaggio", "L'avventura", "La scoperta", "Esplorare", "Girovagare", "Ammirare", "Godersi", "Visitare", "Il monumento", "L'attrazione", "Il museo", "La mostra", "Il patrimonio", "La cultura", "L'usanza", "La tradizione", "Il folclore", "La leggenda", "Il mito", "L'evento", "Il festival", "La festa patronale", "Il rito", "Locale", "Del posto", "Tipico", "Artigianale", "L'artigiano", "Il prodotto", "Il ricordo", "Il regalo", "Comprare", "Vendere", "Il mercato", "La bottega", "Lo straniero", "Turistico", "L'agenzia", "La guida", "L'opuscolo", "La mappa", "Pianificare", "Prenotare", "Confermare", "Cancellare", "Il rimborso", "La tariffa", "Lo sconto", "L'alloggio", "L'albergo", "Il villaggio", "L'agriturismo", "Il campeggio", "Il paesaggio", "La vista", "Panoramico", "Mozzafiato", "Meraviglioso", "Incredibile", "Unico", "Storico", "Antico", "Moderno", "Contemporaneo", "Artistico", "L'architettura", "Il castello", "La torre", "La fontana", "Il palazzo", "La cattedrale", "La piazza", "Il centro storico", "L'atmosfera", "Accogliente", "Ospitale", "L'ospitalità", "Gentile", "Disponibile", "Educato", "Rispettoso", "Il rispetto", "La tolleranza", "La diversità", "Multiculturale", "Internazionale", "Globale", "La società", "La comunità", "Cittadino", "Romanzo", "Feroce", "Ostrica", "Dunque", "Invece", "Infatti", "Apposta", "Fine"
];

const duplicates = [];
m03A2Proposed.forEach(word => {
    const clean = word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
    if (existing.has(clean)) {
        duplicates.push(word);
    }
});

console.log(JSON.stringify({
    duplicateCount: duplicates.length,
    duplicates: duplicates
}, null, 2));
