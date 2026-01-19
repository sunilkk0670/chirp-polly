import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = join(__dirname, '..', 'firestore_data');

const corpus = new Map();

// Load A1 & A2 (20 modules)
for (const level of ['a1', 'a2']) {
    for (let i = 1; i <= 10; i++) {
        const file = `de_${level}_m${String(i).padStart(2, '0')}.json`;
        try {
            const data = JSON.parse(readFileSync(join(dataDir, file), 'utf8'));
            data.lessons[0].vocabularyItems.forEach(item => {
                const w = item.word.toLowerCase().trim();
                if (!corpus.has(w)) corpus.set(w, file);
            });
        } catch (e) { }
    }
}

// Load B1 M01 & M02
for (let i = 1; i <= 2; i++) {
    const file = `de_b1_m${String(i).padStart(2, '0')}.json`;
    try {
        const data = JSON.parse(readFileSync(join(dataDir, file), 'utf8'));
        data.lessons[0].vocabularyItems.forEach(item => {
            const w = item.word.toLowerCase().trim();
            if (!corpus.has(w)) corpus.set(w, file);
        });
    } catch (e) { }
}

const m03Words = [
    "Die Erwerbstätigkeit", "Das Homeoffice-Privileg", "Die Gleitzeit", "Das Pendeln", "Die berufliche Umorientierung",
    "Der Quereinsteiger", "Die Work-Life-Balance", "Der Fachkräftemangel", "Die Arbeitgebermarke", "Das Sabbatjahr",
    "Der Arbeitsmarkt", "Die Qualifikation", "Der Dienstwagen", "Die Geschäftsreise", "Die Selbstständigkeit",
    "Das Start-up", "Die Unternehmenskultur", "Der Überstundenabbau", "Die Schichtarbeit", "Die Teilzeitbeschäftigung",
    "Der Mindestlohn", "Die Gehaltserhöhung", "Die Kündigungsfrist", "Die Mobilitätsgarantie", "Die Fahrgemeinschaft",
    "Die Bahncard", "Die Fernverkehr", "Der Anschlusszug", "Die Sitzplatzreservierung", "Der Schlafwagen", "Die Flugbuchung",
    "Das Handgepäck", "Die Zollkontrolle", "Das Visum", "Die Impfpflicht", "Der Jetlag", "Die Auslandsentsendung",
    "Die Sprachbarriere", "Die interkulturelle Kompetenz", "Die Auswanderung", "Die Lebensqualität", "Die Lebenshaltungskosten",
    "Die Infrastruktur", "Der öffentliche Nahverkehr", "Das Verkehrsmittel", "Die Umweltbelastung", "Der Kraftstoff",
    "Die E-Mobilität", "Die Ladestation", "Der CO2-Fußabdruck", "Das Tempolimit", "Der Fahrradweg", "Das Carsharing",
    "Die Mitfahrgelegenheit", "Die Flexibilität", "Die Erreichbarkeit", "Die Burnout-Prävention", "Die Belastbarkeit",
    "Das Zeitmanagement", "Die Priorität", "Die Effektivität", "Die Eigenverantwortung", "Die Teamfähigkeit", "Das Engagement",
    "Die Anerkennung", "Das Feedback", "Die Kritikfähigkeit", "Die Verhandlung", "Das Ergebnis", "Die Umsetzung",
    "Die Strategie", "Die Herausforderung", "Das Hindernis", "Die Lösung", "Die Alternative", "Die Entscheidung",
    "Die Perspektive", "Der Wissensaustausch", "Die Kompetenz", "Das Talent", "Die Leidenschaft", "Die Berufsberatung",
    "Die Fachkraft", "Die Weiterentwicklung", "Das Arbeitszeugnis", "Der Kündigungsschutz", "Die Sozialversicherung",
    "Der Betriebsrat", "Das Streikrecht", "Die Gewerkschaft", "Das Ehrenamt", "Die Barrierefreiheit",
    "Body", "Event", "Provision", "Spenden", "Wer", "Viel Erfolg bei der Arbeit!"
];

const m04Words = [
    "Das Kulturerbe", "Die Brauchtumspflege", "Die Heimatverbundenheit", "Die Gedenkstätte", "Das Weltkulturerbe",
    "Die Mundart", "Der Zeitgeist", "Die Identitätsstiftung", "Die Völkerverständigung", "Die Überlieferung",
    "Das Ritual", "Die Geselligkeit", "Die Gastfreundschaft", "Der Anstand", "Die Etikette", "Die Umgangsformen",
    "Die Vielfalt", "Die Migration", "Die Herkunft", "Die Wurzeln", "Die Zugehörigkeit", "Das Zusammengehörigkeitsgefühl",
    "Die Solidarität", "Der Verein", "Das Mitglied", "Der Vorstand", "Die Satzung", "Die Versammlung", "Die Abstimmung",
    "Die Mehrheit", "Die Minderheit", "Der Protest", "Die Demonstration", "Die Bürgerrechte", "Die Gerechtigkeit",
    "Die Gleichberechtigung", "Die Epoche", "Die Revolution", "Der Krieg", "Der Frieden", "Die Versöhnung", "Das Denkmal",
    "Die Ruine", "Das Schloss", "Die Burg", "Das Museum", "Die Literatur", "Die Architektur", "Die Tracht", "Die Volksmusik",
    "Der Volkstanz", "Das Märchen", "Die Sage", "Das Sprichwort", "Die Redewendung", "Die Etymologie", "Die Sprachwissenschaft",
    "Die Mundartpflege", "Die Landschaft", "Die Fernweh", "Die Reiselust", "Die Entdeckung", "Das Abenteuer", "Der Eindruck",
    "Das Heimweh", "Der Abschied", "Der Neubeginn", "Die Anpassung", "Die Entwicklung", "Die Religionsfreiheit",
    "Der Gottesdienst", "Die Weltanschauung", "Die Aufklärung", "Das bürgerliche Gesetzbuch", "Die Verfassung", "Das Brauchtum",
    "Die Festkultur", "Die Stammtischkultur", "Das Nationalbewusstsein", "Die Zeitgeschichte", "Das Denkvermögen",
    "Die Geisteswissenschaften", "Die Zivilcourage", "Die Nachkriegszeit", "Die Wiedervereinigung", "Der Mauerfall",
    "Das Kulturgut", "Die Stadtführung", "Die Sehenswürdigkeit", "Die Überzeugung", "Sich identifizieren",
    "Oldtimer", "Kritik", "Protokoll", "Promotion", "Frohe Feiertage!"
];

const trapsM03 = new Set(["Body", "Event", "Provision", "Spenden", "Wer"]);
const trapsM04 = new Set(["Oldtimer", "Kritik", "Protokoll", "Promotion"]);

function check(words, label, traps) {
    console.log(`\n🔍 ${label} Audit Results:`);
    const overlaps = [];
    words.forEach(w => {
        const low = w.toLowerCase().trim();
        if (traps.has(w)) return;
        if (corpus.has(low)) {
            overlaps.push(`${w} (Overlap with: ${corpus.get(low)})`);
        }
    });
    if (overlaps.length === 0) {
        console.log(`✅ ZERO GENUINE OVERLAPS FOUND!`);
    } else {
        console.log(`❌ OVERLAPS DETECTED:`);
        overlaps.forEach(o => console.log(`   - ${o}`));
    }
}

check(m03Words, "B1 M03", trapsM03);
check(m04Words, "B1 M04", trapsM04);
