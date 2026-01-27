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
    "ita_a2_m01.json", "ita_a2_m02.json", "ita_a2_m03.json", "ita_a2_m04.json", "ita_a2_m05.json"
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

const m06A2Proposed = [
    "La società", "Il cittadino", "La cittadinanza", "Il governo", "La politica", "Il politico", "Il partito", "Le elezioni", "Il voto", "Votare", "La democrazia", "La repubblica", "Il presidente", "Il ministro", "La legge", "Il diritto", "Il dovere", "La giustizia", "Il tribunale", "Il giudice", "L'avvocato", "La polizia", "Il crimine", "La sicurezza", "La pace", "La guerra", "Il conflitto", "La protesta", "Lo sciopero", "La libertà", "L'uguaglianza", "I diritti umani", "La solidarietà", "La comunità", "Il volontariato", "L'associazione", "L'organizzazione", "Il problema sociale", "La povertà", "La ricchezza", "L'economia", "La crisi", "Lo sviluppo", "Il progresso", "L'immigrazione", "L'integrazione", "La diversità", "La cultura", "L'opinione pubblica", "Il dibattito", "Discutere", "Esprimere", "Sostenere", "Opporsi", "Cambiare", "Migliorare", "Proteggere", "Rispettare", "Aiutare", "Collaborare", "La notizia", "L'attualità", "Il quotidiano", "L'articolo", "Il giornalista", "L'informazione", "I media", "La televisione", "Internet", "I social media", "La verità", "La bugia", "La censura", "L'educazione", "L'istruzione", "Il futuro", "Il passato", "La speranza", "Il cambiamento", "La sfida", "L'opportunità", "Il successo", "Il fallimento", "La responsabilità", "Importante", "Urgente", "Necessario", "Possibile", "Impossibile", "Globale", "Locale", "Straniero", "Internazionale", "Pretendere", "Parenti", "Confrontare", "Almeno", "Dunque", "Infine", "Fine"
];

const duplicates = [];
m06A2Proposed.forEach(word => {
    const clean = word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
    if (existing.has(clean)) {
        duplicates.push(word);
    }
});

console.log(JSON.stringify({
    duplicateCount: duplicates.length,
    duplicates: duplicates
}, null, 2));
