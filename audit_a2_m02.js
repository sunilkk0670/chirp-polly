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
    "ita_a2_m01.json"
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

const m02A2Proposed = [
    "Emozionato", "Depresso", "Preoccupato", "Sorpreso", "Arrabbiato", "Deluso", "Orgoglioso", "Innamorato", "Geloso", "Imbarazzato", "Confuso", "Spaventato", "Soddisfatto", "Ottimista", "Pessimista", "In forma", "Debole", "Esaurito", "Il sintomo", "La tosse", "Il brivido", "La nausea", "Il giramento di testa", "Lo svenimento", "La febbre alta", "Il raffreddore", "L'influenza", "Il dolore", "L'infiammazione", "Il gonfiore", "L'infezione", "La ferita", "Il sangue", "La pressione", "Il battito", "Riprendersi", "Guarire", "Migliorare", "Peggiorare", "Curare", "Operare", "Visitare", "Prescrivere", "La ricetta", "La pastiglia", "L'antibiotico", "Lo sciroppo", "La vitamina", "Il cerotto", "La benda", "Il termometro", "La siringa", "L'ospedale", "La clinica", "Il pronto soccorso", "Il reparto", "L'ambulanza", "L'appuntamento", "La sala d'attesa", "Lo specialista", "Il chirurgo", "L'infermiere", "Il paziente", "L'assicurazione", "Il rimborso", "Sano", "Malato", "Stanco", "Riposato", "Stressato", "Calmo", "Ansioso", "Sensibile", "Forte", "Fragile", "Dolce", "Amaro", "Acido", "Salato", "Piccante", "Fresco", "Pesante", "Leggero", "Morbido", "Duro", "Liscio", "Ruvido", "Chiaro", "Scuro", "Opaco", "Brillante", "Morboso", "Noia", "Stitico", "Inoltre", "Perciò", "Tuttavia", "Dunque", "Altrimenti", "Fine"
];

const duplicates = [];
m02A2Proposed.forEach(word => {
    const clean = word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
    if (existing.has(clean)) {
        duplicates.push(word);
    }
});

console.log(JSON.stringify({
    duplicateCount: duplicates.length,
    duplicates: duplicates
}, null, 2));
