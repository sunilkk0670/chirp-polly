const fs = require('fs');
const path = require('path');

const newWordsRaw = [
    "Il punto di vista", "Convincere", "Sostenere", "Il pregiudizio", "La convinzione", "L'opinione", "Il ragionamento", "Dubitare", "Negare", "Ammettere", "Influenzare", "Discutere", "L'accordo", "Il disaccordo", "La certezza", "La probabilità", "Evidente", "Soggettivo", "Oggettivo", "Valutare", "La prospettiva", "La logica", "La KREE-tee-ka", "Approvare", "Rifiutare", "Il parere", "Condividere", "Esprimere", "Sviluppare", "L'ideologia", "Il valore", "L'etica", "La morale", "Il principio", "Credere", "La fede", "La speranza", "Il dubbio", "L'incertezza", "Rifletterere", "Pensare", "Immaginare", "Supporre", "Ipotizzare", "L'ipotesi", "La teoria", "La realtà", "La verità", "Il fatto", "Dimostrare", "La prova", "Concludere", "La conclusione", "Riassumere", "Il riassunto", "Il discorso", "Il dibattito", "La polemica", "L'argomentazione", "Persuadere", "La persuasione", "Efficace", "Inutile", "Necessario", "Fondamentale", "Importante", "Interessante", "Noioso", "Curioso", "Strano", "Incredibile", "Saggio", "Intelligente", "Stupido", "Giusto", "Sbagliato", "La giustizia", "L'ingiustizia", "La libertà", "L'uguaglianza", "La tolleranza", "Il rispetto", "La fiducia", "La responsabilità", "L'impegno", "Il dovere", "Il diritto", "La scelta", "Decidere", "L'opzione", "Attualmente", "Argomento", "Comprensivo", "Sensibile", "Educato", "Confidenza", "Dunque", "Quindi", "Comunque", "Fine"
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
