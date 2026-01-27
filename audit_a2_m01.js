import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "firestore_data");
const a1Paths = [
    "ita_a1_m01.json", "ita_a1_m02.json", "ita_a1_m03.json",
    "ita_a1_m04.json", "ita_a1_m05.json", "ita_a1_m06.json",
    "ita_a1_m07.json", "ita_a1_m08.json", "ita_a1_m09.json", "ita_a1_m10.json"
];

let existing = new Set();
a1Paths.forEach(p => {
    const filePath = path.join(dataDir, p);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        data.lessons.forEach(l => l.vocabularyItems.forEach(i => {
            const w = i.word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
            existing.add(w);
        }));
    }
});

const m01A2Proposed = [
    "Ieri", "L'altro ieri", "La settimana scorsa", "Il mese scorso", "L'anno scorso", "Un anno fa", "Molto tempo fa", "Recentemente", "Già", "Ancora no", "Appena", "Prima", "Dopo", "Poi", "Finalmente", "Durante", "Mentre", "Spesso", "Qualche volta", "Raramente", "Essere (Stato)", "Avere (Avuto)", "Andare (Andato)", "Venire (Venuto)", "Fare (Fatto)", "Dire (Detto)", "Vedere (Visto)", "Prendere (Preso)", "Mettere (Messo)", "Scrivere (Scritto)", "Leggere (Letto)", "Bere (Bevuto)", "Mangiare (Mangiato)", "Dormire (Dormito)", "Uscire (Uscito)", "Entrare (Entrato)", "Partire (Partito)", "Arrivare (Arrivato)", "Perdere (Perduto)", "Vincere (Vinto)", "Nascere (Nato)", "Morire (Morto)", "Sposarsi", "Incontrarsi", "Conoscere", "Viaggiare", "Visitare", "Traslocare", "Cambiare lavoro", "Laurearsi", "L'infanzia", "La gioventù", "Il ricordo", "La memoria", "Dimenticare", "Ricordare", "L'evento", "La festa", "Il compleanno", "L'anniversario", "Il regalo", "Divertimento", "Divertirsi", "Annoiarsi", "Succedere", "Cosa è successo?", "L'esperienza", "La storia", "Il passato", "Il futuro", "Pianificare", "Sperare", "Sognare", "Desiderare", "Credere", "Pensare", "Capire", "Spiegare", "Raccontare", "Chiacchierare", "Iniziare", "Finiture", "Continuare", "Smettere", "Tentare", "Riuscire", "Fallire", "Lo sbaglio", "La verità", "La bugia", "Onesto", "Falso", "Sicuro", "Incerto", "Argomento", "Attualmente", "Biondo", "Inoltre", "Comunque", "Fine"
];

const duplicates = [];
m01A2Proposed.forEach(word => {
    const clean = word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
    // Handle verbs with past participles in parens
    const baseVerb = clean.split(" ")[0];
    if (existing.has(clean) || existing.has(baseVerb)) {
        duplicates.push(word);
    }
});

console.log(JSON.stringify({
    duplicateCount: duplicates.length,
    duplicates: duplicates
}, null, 2));
