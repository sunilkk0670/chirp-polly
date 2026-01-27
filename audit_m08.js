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
    "ita_a1_m06.json",
    "ita_a1_m07.json"
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

const m08Proposed = [
    "Il corpo", "La testa", "I capelli", "Il viso", "Gli occhi", "Il naso", "La bocca", "La lingua", "I denti", "Le labbra", "Le orecchie", "Il collo", "La gola", "Le spalle", "Il braccio", "Il gomito", "Il polso", "La mano", "Il dito", "L'unghia", "Il petto", "La schiena", "Lo stomaco", "La gamba", "Il ginocchio", "La caviglia", "Il piede", "Le dita dei piedi", "Il cuore", "I polmoni", "Il sangue", "Le ossa", "La pelle", "La salute", "Sentirsi", "Bene", "Male", "Essere malato", "Il dolore", "Il raffreddore", "La tosse", "La febbre", "L'influenza", "Il mal di testa", "Il mal di pancia", "Il mal di denti", "La ferita", "Tagliarsi", "Cadere", "Rompere", "L'ospedale", "Il medico", "L'infermiere", "Il dentista", "La visita", "L'ambulanza", "Il pronto soccorso", "Aiutare", "Chiamare", "La farmacia", "La medicina", "La ricetta", "La pastiglia", "Lo sciroppo", "La crema", "Il cerotto", "La benda", "Il termometro", "L'appuntamento", "Aspettare", "Riposare", "Dormire", "Guarire", "Migliorare", "Peggiorare", "Sano", "Forte", "Debole", "Stanco", "Energico", "Allergico", "Contagioso", "Pericoloso", "Sicuro", "Il peso", "L'altezza", "Misurare", "Pesare", "La vita", "La morte", "Nascere", "Crescere", "Vivere", "Morire", "Preservativo", "Stitico", "Tossico", "Urgente", "Importante", "Fine"
];

const duplicates = [];
m08Proposed.forEach(word => {
    const clean = word.toLowerCase().trim();
    // Remove articles like il, la, lo, i, le, gli, l'
    const cleanNoArticle = clean.replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");

    if (existingWords.has(clean) || existingWords.has(cleanNoArticle)) {
        duplicates.push(word);
        return;
    }

    // Check if any existing word (without article) matches this clean word
    for (let existing of existingWords) {
        const existingNoArticle = existing.replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
        if (existingNoArticle === cleanNoArticle || existingNoArticle === clean) {
            duplicates.push(word);
            break;
        }
    }
});

console.log(JSON.stringify({
    duplicateCount: duplicates.length,
    duplicates: duplicates,
    totalExisting: existingWords.size
}, null, 2));
