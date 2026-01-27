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
    "ita_a2_m01.json", "ita_a2_m02.json", "ita_a2_m03.json", "ita_a2_m04.json"
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

const m05A2Proposed = [
    "Connessione", "Senza fili", "Rete", "Sito web", "Navigare", "Scaricare", "Caricare", "Social network", "Profilo", "Account", "Password", "Sicurezza", "Informatica", "Computer", "Portatile", "Schermo", "Tastiera", "Mouse", "Stampante", "Cuffie", "Microfono", "Telecamera", "Cellulare", "Applicazione", "Messaggio", "Email", "Allegato", "Inviare", "Ricevere", "Rispondere", "Cancellare", "Salvare", "Stampare", "Copiare", "Incollare", "Tagliare", "Software", "Hardware", "Virus", "Dati", "Privacy", "Digitale", "Online", "Offline", "Blog", "Podcast", "Streaming", "Canale", "Programma", "Notizie", "Giornale", "Rivista", "Pubblicità", "Articolo", "Intervista", "Reporter", "Fotografo", "Video", "Audio", "Foto", "Immagine", "Suono", "Volume", "Silenzioso", "Vibrazione", "Schermata", "Sfondo", "Icona", "Menu", "Finestra", "Cartella", "File", "Cestino", "Ricerca", "Risultato", "Link", "Indirizzo", "Browser", "Tab", "Segnalibro", "Condividere", "Commentare", "Pubblicare", "Aggiornare", "Iscriversi", "Seguire", "Bloccare", "Segnalare", "Informatica", "Intelligenza", "Artificiale", "Robot", "Tecnologico", "Moderno", "Editore", "Stampa", "Magazzino", "Utile", "Difficile", "Fine"
];

const duplicates = [];
m05A2Proposed.forEach(word => {
    const clean = word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
    if (existing.has(clean)) {
        duplicates.push(word);
    }
});

console.log(JSON.stringify({
    duplicateCount: duplicates.length,
    duplicates: duplicates
}, null, 2));
