import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "firestore_data");
const paths = [
    "ita_a1_m01.json", "ita_a1_m02.json", "ita_a1_m03.json",
    "ita_a1_m04.json", "ita_a1_m05.json", "ita_a1_m06.json",
    "ita_a1_m07.json", "ita_a1_m08.json", "ita_a1_m09.json"
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

const m10Proposed = [
    "Ripassare", "Finire", "Comprendere", "Ricordare", "Dimenticare", "Domanda", "Risposta", "Esercizio", "Esempio", "Corretto", "Sbagliato", "Facile", "Difficile", "Pratica", "Conversazione", "Migliorare", "Obiettivo", "Risultato", "Successo", "Congratulazioni", "Ascoltare", "Leggere", "Scrivere", "Parlare", "Pronunciare", "Tradurre", "Il significato", "La parola", "La frase", "La grammatica", "Il test", "Il certificato", "Livello", "Principiante", "Avanzato", "Sempre", "Spesso", "Qualche volta", "Raramente", "Mai", "Presto", "Tardi", "Subito", "Dopo", "Prima", "Già", "Ancora", "Solamente", "Insieme", "Da solo", "Certo", "Sicuramente", "Forse", "Probabilmente", "Veramente", "Davvero", "Beh", "Quindi", "Però", "Invece", "Almeno", "Soprattutto", "Inoltre", "Ogni", "Qualcuno", "Nessuno", "Tutti", "Tutto", "Niente", "Qualcosa", "Molto", "Poco", "Troppo", "Abbastanza", "Altro", "Stesso", "Simile", "Diverso", "Vero", "Falso", "Importante", "Inutile", "Utile", "Speciale", "Normale", "Perfetto", "Ottimo", "Pessimo", "Bello", "Bravo", "Felice", "Pronto", "Libero", "Infine", "Anno", "Brave", "Burro", "Un po'", "Sempre", "Fine"
];

const duplicates = [];
m10Proposed.forEach(word => {
    const clean = word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
    if (existing.has(clean)) {
        duplicates.push(word);
    }
});

console.log(JSON.stringify({
    duplicateCount: duplicates.length,
    duplicates: duplicates
}, null, 2));
