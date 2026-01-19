import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = join(__dirname, '..', 'firestore_data');

const corpus = new Map();

// Load A1 (10 modules)
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

// Load A2 (10 modules)
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

// Load B1 M01
try {
    const data = JSON.parse(readFileSync(join(dataDir, 'de_b1_m01.json'), 'utf8'));
    data.lessons[0].vocabularyItems.forEach(item => {
        const w = item.word.toLowerCase().trim();
        if (!corpus.has(w)) corpus.set(w, 'de_b1_m01.json');
    });
} catch (e) { }

const b1M02Words = [
    "Die Informationsgesellschaft", "Die digitale Kluft", "Der Datenschutzbeauftragte", "Die Privatsphäre",
    "Die Urheberrechtsverletzung", "Verschlüsseln", "Die Zwei-Faktor-Authentisierung", "Der Algorithmus",
    "Die Filterblase", "Die manipulative Software", "Die künstliche Intelligenz", "Die Desinformation",
    "Die Glaubwürdigkeit", "Eine Quelle prüfen", "Der investigative Journalismus", "Die Pressefreiheit",
    "Die Zensur", "Die öffentliche Meinung", "Die Berichterstattung", "Der Leitartikel",
    "Die Medienkompetenz", "Der Influencer", "Die Reichweite", "Der Follower-Zuwachs",
    "Das Nutzerverhalten", "Die Kommentarfunktion", "Einen Shitstorm auslösen", "Das Cybermobbing",
    "Die Anonymität", "Die Identitätsdiebstahl", "Die Suchmaschine", "Die Benutzeroberfläche",
    "Die Datenübertragung", "Die Cloud-Speicherung", "Das Endgerät", "Die Vernetzung",
    "Drahtlos", "Die Breitbandverbindung", "Der Streaming-Dienst", "On-Demand abrufen",
    "Die Rundfunkgebühr", "Das Werbefernsehen", "Die Zielgruppe", "Die Einschaltquote",
    "Der Redakteur", "Die Nachrichtenagentur", "Sich informieren", "Recherchieren",
    "Die Pressemitteilung", "Das Urheberrecht", "Geistiges Eigentum", "Die Lizenz",
    "Open-Source-Software", "Der Datenschutz", "Die Datensicherheit", "Der Hackerangriff",
    "Die Schadsoftware", "Virenschutzprogramm", "Die Firewall", "Passwortgeschützt",
    "Sichern", "Wiederherstellen", "Der Speicherplatz", "Die Datei",
    "Hochladen", "Herunterladen", "Die Applikation", "Aktualisieren",
    "Interaktiv", "Virtuell", "Die soziale Medien", "Das Profil",
    "Teilen", "Kommentieren", "Liken", "Verlinken",
    "Der Hashtag", "Viral gehen", "Die Online-Community", "Das Forum",
    "Der Blog", "Der Podcast", "Der Newsletter", "Abonnieren",
    "Die Abmeldung", "Digitalisierung", "Die Transformation", "Die Effizienz",
    "Nachvollziehbar", "Handy", "Oldtimer", "Mobbing", "Public Viewing",
    "Beamer", "Display", "Chatten", "Message", "Kritisch hinterfragen"
];

const traps = new Set(["Handy", "Oldtimer", "Mobbing", "Public Viewing", "Beamer", "Display", "Chatten", "Message"]);

const overlaps = [];
b1M02Words.forEach(w => {
    const low = w.toLowerCase().trim();
    if (traps.has(w)) return;
    if (corpus.has(low)) {
        overlaps.push(`${w} (Overlap with: ${corpus.get(low)})`);
    }
});

console.log(`🔍 B1 M02 Audit Results:`);
if (overlaps.length === 0) {
    console.log(`✅ ZERO GENUINE OVERLAPS FOUND!`);
} else {
    console.log(`❌ OVERLAPS DETECTED:`);
    overlaps.forEach(o => console.log(`   - ${o}`));
}
