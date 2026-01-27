const fs = require('fs');
const path = require('path');

const newWordsRaw = [
    "Il risentimento", "L'ambivalenza", "L'empatia", "Scoraggiare", "L'inquietudine", "La frustrazione", "Il rimorso", "La malinconia", "L'entusiasmo", "L'indifferenza", "L'apprensione", "L'ottimismo", "Il pessimismo", "L'autostima", "L'umiltà", "L'orgoglio", "La vergogna", "La gelosia", "L'invidia", "La compassione", "Il conforto", "La rassegnazione", "Lo smarrimento", "L'angoscia", "La serenità", "La gratitudine", "Il timore", "Lo stupore", "La diffidenza", "La speranza", "La delusione", "L'irritazione", "La tenerezza", "L'affetto", "Il legame", "La solitudine", "L'isolamento", "Il rimpianto", "La colpa", "Il perdono", "Perdonare", "Pentirsi", "Riconoscere", "Apprezzare", "Stimare", "Ammirare", "Disprezzare", "Odiare", "Amare", "Sospirare", "Piangere", "Gridare", "Sussurrare", "Tacere", "Il silenzio", "La calma", "La pazienza", "La tolleranza", "L'intolleranza", "Il pregiudizio", "L'onestà", "La sincerità", "La lealtà", "Il tradimento", "Tradire", "Soffrire", "La sofferenza", "Il dolore", "La gioia", "La felicità", "Il benessere", "Lo stress", "L'ansia", "Il panico", "La fobia", "Il coraggio", "La paura", "Affrontare", "Fuggire", "Evitare", "Superare", "L'ostacolo", "La forza", "La debolezza", "L'equilibrio", "Morboso", "Suggestione", "Noia", "Confidenza", "Sensibile", "Educato", "Infine", "Davvero", "Assolutamente", "Probabilmente", "Sicuramente", "Forse", "Fine"
];

const newWords = newWordsRaw.map(w => w.toLowerCase().trim());
const directory = 'firestore_data';
const files = fs.readdirSync(directory).filter(f => f.startsWith('ita_') && f.endsWith('.json'));

files.forEach(f => {
    const filePath = path.join(directory, f);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.lessons) {
        data.lessons.forEach(l => {
            l.vocabularyItems.forEach(v => {
                const w = v.word.toLowerCase().trim();
                if (newWords.includes(w)) {
                    console.log(`DUPLICATE: "${w}" found in ${f}`);
                }
            });
        });
    }
});
