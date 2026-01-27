import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "firestore_data");
const paths = [
    "ita_a1_m01.json",
    "ita_a1_m02.json",
    "ita_a1_m03.json",
    "ita_a1_m04.json",
    "ita_a1_m05.json",
    "ita_a1_m06.json"
];

let existingWords = new Set();
paths.forEach(p => {
    const filePath = path.join(dataDir, p);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        data.lessons.forEach(l => l.vocabularyItems.forEach(i => {
            existingWords.add(i.word.toLowerCase().trim());
        }));
    }
});

const m07Proposed = [
    "Il lavoro", "La professione", "L'ufficio", "L'azienda", "Il collega", "La collega", "Il capo", "Il dipendente", "Lo stipendio", "La riunione", "Il computer", "La scrivania", "La sedia", "Il telefono", "L'email", "Documento", "Il progetto", "Lavorare", "Scrivere", "Chiamare", "Insegnante", "Professore", "Studente", "Medico / Dottore", "Infermiere", "Ingegnere", "Avvocato", "Architetto", "Commesso", "Cameriere", "Cuoco", "Autista", "Poliziotto", "Segretario", "Attore", "Musicista", "Artista", "Scrittore", "Studiare", "Imparare", "Insegnare", "La scuola", "L'università", "La classe", "L'aula", "Il corso", "La lezione", "L'esame", "Il compito", "Il voto", "La laurea", "Leggere", "Capire", "Domandare", "Rispondere", "Il libro", "Il quaderno", "La penna", "La matita", "Lo zaino", "La biblioteca", "La ricerca", "La borsa di studio", "La facoltà", "Il dipartimento", "Disegnare", "Calcolare", "Analizzare", "Organizzare", "Gestire", "Sviluppare", "Vendere", "Comprare", "Negoziare", "Collaborare", "Puntuale", "In ritardo", "Impegnato", "Libero", "Stanco", "Soddisfatto", "Stressato", "Ambizioso", "Creativo", "Esperto", "Il successo", "La carriera", "L'opportunità", "Il futuro", "L'obiettivo", "Il colloquio", "Curriculum", "Educazione", "Stage", "Domanda", "Fine"
];

const duplicates = [];
m07Proposed.forEach(word => {
    const clean = word.toLowerCase().trim();
    if (existingWords.has(clean)) {
        duplicates.push(word);
    } else {
        // Also check without articles if applicable
        const base = clean.replace(/^(il|la|l\x27|lo|i|le|gli)\s+/, "");
        if (existingWords.has(base)) {
            duplicates.push(word);
        }
    }
});

console.log(JSON.stringify({
    duplicateCount: duplicates.length,
    duplicates: duplicates,
    totalExisting: existingWords.size
}, null, 2));
