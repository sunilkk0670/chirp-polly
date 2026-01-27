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
let existingWordsMap = new Map();
let all = [];
let duplicates = [];

paths.forEach(p => {
    const filePath = path.join(dataDir, p);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        data.lessons.forEach(l => l.vocabularyItems.forEach(i => {
            const w = i.word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l')/, "");
            if (existing.has(w) && p === "ita_a1_m08.json") {
                duplicates.push({ word: i.word, module: p, original: [...existingWordsMap.get(w)][0] });
            }
            if (!existing.has(w)) {
                existing.add(w);
                existingWordsMap.set(w, new Set());
            }
            existingWordsMap.get(w).add(p);
            all.push(w);
        }));
    }
});

console.log("TOTAL UNIQUE (NO ARTICLES): " + existing.size);
console.log("TOTAL WORD INSTANCES: " + all.length);
if (duplicates.length > 0) {
    console.log("DUPLICATES FOUND:");
    console.log(JSON.stringify(duplicates, null, 2));
} else {
    console.log("✅ ZERO DUPLICATES FOUND!");
}
