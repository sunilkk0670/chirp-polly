import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = join(__dirname, '..', 'firestore_data');

const corpus = new Map();

// Load A1
for (let i = 1; i <= 10; i++) {
    const file = `de_a1_m${String(i).padStart(2, '0')}.json`;
    try {
        const data = JSON.parse(readFileSync(join(dataDir, file), 'utf8'));
        data.lessons[0].vocabularyItems.forEach(item => {
            const w = item.word.toLowerCase().trim();
            if (!corpus.has(w)) corpus.set(w, file);
        });
    } catch (e) { }
}

// Load A2
for (let i = 1; i <= 10; i++) {
    const file = `de_a2_m${String(i).padStart(2, '0')}.json`;
    try {
        const data = JSON.parse(readFileSync(join(dataDir, file), 'utf8'));
        data.lessons[0].vocabularyItems.forEach(item => {
            const w = item.word.toLowerCase().trim();
            if (!corpus.has(w)) corpus.set(w, file);
        });
    } catch (e) { }
}

const b1Words = [
    "Die Verbundenheit", "Sich hineinversetzen", "Die Enttäuschung", "Die Eifersucht",
    "Das Vertrauensverhältnis", "Die Geborgenheit", "Die Meinungsverschiedenheit",
    "Die Zuneigung", "Die Einsamkeit", "Sich versöhnen", "Das Mitgefühl", "Die Sehnsucht",
    "Frustriert", "Die Erleichterung", "Sich vernachlässigt fühlen", "Die Dankbarkeit",
    "Der Neid", "Sich schämen", "Das Selbstwertgefühl", "Die Verzweiflung", "Harmonisch",
    "Konfliktfähig", "Die Rücksichtnahme", "Das Vorurteil", "Die Toleranz", "Sich respektieren",
    "Die Leidenschaft", "Die Zärtlichkeit", "Der Liebeskummer", "Die Fernbeziehung",
    "Die Trennung verarbeiten", "Sich aussprechen", "Das Missverständnis", "Empfindlich",
    "Die Stimmungsschwankung", "Das Lampenfieber", "Die Begeisterung", "Überfordert sein",
    "Die Erwartungshaltung", "Sich gebunden fühlen", "Die Ehrlichkeit", "Das Misstrauen",
    "Die Verlässlichkeit", "Sich auf jemanden verlassen", "Das Geheimnis", "Etwas anvertrauen",
    "Die Unterstützung", "Der Beistand", "Sich trösten", "Die Anteilnahme", "Die Kaltblütigkeit",
    "Gefühlskalt", "Die Reue", "Sich Vorwürfe machen", "Verbittert sein", "Die Ausgeglichenheit",
    "Die Neugier", "Das Erstaunen", "Sich wundern", "Die Gleichgültigkeit", "Die Abneigung",
    "Der Ekel", "Eingebildet", "Die Bescheidenheit", "Die Selbstlosigkeit", "Die Hilfsbereitschaft",
    "Sich solidarisieren", "Der Zusammenhalt", "Die Einsicht", "Einsichtig sein", "Der Kompromiss",
    "Sich einigen", "Die Einigung", "Der Widerspruch", "Widersprechen", "Die Provokation",
    "Sich beherrschen", "Die Selbstbeherrschung", "Der Wutausbruch", "Die Gelassenheit",
    "Souverän", "Das Selbstbewusstsein", "Die Verunsicherung", "Eingeschüchtert", "Der Respekt",
    "Respektvoll", "Die Menschenwürde", "Das Mitwirken", "Der Austausch", "Die Kontaktpflege",
    "Das Netzwerk", "Brav", "Gift", "Eventuell", "Fast", "Hell", "After", "Spenden", "Wer",
    "Sich wertgeschätzt fühlen"
];

// Traps are expected to overlap with "dangerous" words from A1/A2 or be review
const traps = new Set(["Brav", "Gift", "Eventuell", "Fast", "Hell", "After", "Spenden", "Wer"]);

const overlaps = [];
b1Words.forEach(w => {
    const low = w.toLowerCase().trim();
    if (traps.has(w)) return;
    if (corpus.has(low)) {
        overlaps.push(`${w} (Overlap with: ${corpus.get(low)})`);
    }
});

console.log(`🔍 B1 M01 Audit Results:`);
if (overlaps.length === 0) {
    console.log(`✅ ZERO GENUINE OVERLAPS FOUND!`);
} else {
    console.log(`❌ OVERLAPS DETECTED:`);
    overlaps.forEach(o => console.log(`   - ${o}`));
}
