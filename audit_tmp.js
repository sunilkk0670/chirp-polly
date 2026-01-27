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
    "ita_a1_m05.json"
];

let allWords = new Set();
let wordMap = {};

paths.forEach(p => {
    const filePath = path.join(dataDir, p);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    data.lessons.forEach(l => {
        l.vocabularyItems.forEach(i => {
            const word = i.word.toLowerCase().trim();
            allWords.add(word);
            if (!wordMap[word]) wordMap[word] = [];
            wordMap[word].push(p);
        });
    });
});

const result = {
    count: allWords.size,
    words: Array.from(allWords),
    wordMap: wordMap
};

fs.writeFileSync(path.join(__dirname, "existing_words.json"), JSON.stringify(result, null, 2));
console.log("Success: wrote existing_words.json");
