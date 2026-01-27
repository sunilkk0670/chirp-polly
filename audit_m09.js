import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "firestore_data");
const paths = [
    "ita_a1_m01.json", "ita_a1_m02.json", "ita_a1_m03.json",
    "ita_a1_m04.json", "ita_a1_m05.json", "ita_a1_m06.json",
    "ita_a1_m07.json", "ita_a1_m08.json"
];

let existing = new Set();
paths.forEach(p => {
    const filePath = path.join(dataDir, p);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        data.lessons.forEach(l => l.vocabularyItems.forEach(i => {
            const w = i.word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
            existing.add(w);
        }));
    }
});

const m09Proposed = [
    "La natura", "L'ambiente", "Il mondo", "Il cielo", "Il sole", "La luna", "Le stelle", "La terra", "Il mare", "L'oceano", "La spiaggia", "L'isola", "Il fiume", "Il lago", "La montagna", "La collina", "La valle", "Il bosco", "La foresta", "L'albero", "La foglia", "Il fiore", "L'erba", "La pianta", "L'animale", "Il cane", "Il gatto", "L'uccello", "Il pesce", "Il cavallo", "La mucca", "Il maiale", "La pecora", "Il leone", "La tigre", "L'elefante", "La scimmia", "L'insetto", "La farfalla", "L'ape", "Il tempo", "Fa caldo", "Fa freddo", "C'è il sole", "È nuvoloso", "Piove", "Nevica", "Tira vento", "Il temporale", "L'arcobaleno", "La stagione", "La primavera", "L'estate", "L'autunno", "L'inverno", "L'aria", "Il fuoco", "L'acqua", "La sabbia", "La pietra", "Il vulcano", "Il terremoto", "Il clima", "L'ecologia", "Riciclare", "Proteggere", "Inquinare", "La plastica", "La carta", "Il vetro", "L'energia", "Il parco naturale", "La campagna", "La fattoria", "Il contadino", "Seminare", "Raccogliere", "Crescere", "Fiorire", "L'alba", "Il tramonto", "Il paesaggio", "La vista", "L'orizzonte", "Bello", "Incredibile", "Selvaggio", "Tranquillo", "Rumoroso", "Inquinato", "Puro", "Fresco", "Umidità", "Ghiaccio", "Fattoria", "Argomento", "Camera", "Rispetto", "Futuro", "Fine"
];

const duplicates = [];
m09Proposed.forEach(word => {
    const clean = word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
    if (existing.has(clean)) {
        duplicates.push(word);
    }
});

console.log(JSON.stringify({
    duplicateCount: duplicates.length,
    duplicates: duplicates
}, null, 2));
