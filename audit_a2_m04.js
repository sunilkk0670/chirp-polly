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
    "ita_a2_m01.json", "ita_a2_m02.json", "ita_a2_m03.json"
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

const m04A2Proposed = [
    "La carriera", "La promozione", "Lo stipendio", "Il contratto", "Il colloquio", "Il curriculum", "Le competenze", "L'esperienza", "Licenziare", "Dimettersi", "Assumere", "Disoccupato", "La pensione", "Il sindacato", "La ditta", "Il settore", "La riunione", "Il progetto", "La scadenza", "Il successo", "L'ufficio", "Il capo", "Il collega", "La scrivania", "Il direttore", "L'impiegato", "Il cliente", "L'affare", "Guadagnare", "Spendere", "Risparmiare", "Investire", "Le tasse", "La banca", "Il prestito", "Il debito", "La fattura", "Il profitto", "La perdita", "Organizzare", "Gestire", "Pianificare", "Collaborare", "Incontrare", "Discutere", "Decidere", "Risolvere", "Il problema", "La soluzione", "Impegnato", "Stanco", "Soddisfatto", "Stressato", "Ambizione", "Obiettivo", "Risultato", "Avanzamento", "Formazione", "Corso", "Certificato", "Qualifica", "Abilità", "Talento", "Creatività", "Innovazione", "Tecnologia", "Sviluppo", "Sito", "Rete", "Sistema", "Dati", "Informazione", "Comunicazione", "Messaggio", "Contatto", "Relazione", "Fiducia", "Rispetto", "Onestà", "Puntualità", "Responsabilità", "Dovere", "Diritto", "Legge", "Regola", "Sicurezza", "Protezione", "Emergenza", "Aiuto", "Supporto", "Consiglio", "Speranza", "Futuro", "Fabbrica", "Avviso", "Camera", "Conclusione", "Risultato", "Fine"
];

const duplicates = [];
m04A2Proposed.forEach(word => {
    const clean = word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
    if (existing.has(clean)) {
        duplicates.push(word);
    }
});

console.log(JSON.stringify({
    duplicateCount: duplicates.length,
    duplicates: duplicates
}, null, 2));
