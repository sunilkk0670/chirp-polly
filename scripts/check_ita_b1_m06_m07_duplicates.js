const fs = require('fs');
const path = require('path');

const m06WordsRaw = [
    "La legislazione", "La cittadinanza", "La riforma", "Il provvedimento", "L'istituzione", "Il dibattito", "L'opinione pubblica", "La democrazia", "La repubblica", "Il diritto civile", "La libertà di stampa", "La manifestazione", "Lo sciopero", "La solidarietà", "Il benessere sociale", "La previdenza", "L'immigrazione", "L'integrazione", "Il multiculturalismo", "La globalizzazione", "L'attualità", "La cronaca", "L'inviato", "Il sondaggio", "La statistica", "La corruzione", "La trasparenza", "Il privilegio", "L'ingiustizia", "Il divario", "La risorsa", "Lo sviluppo sostenibile", "L'impatto ambientale", "La consapevolezza", "Sensibilizzare", "Il volontariato", "L'ente benefico", "La donazione", "Sostenere una causa", "Il progresso", "La sfida", "L'opportunità", "Il cambiamento", "La tendenza", "Il fenomeno", "La massa", "Il comportamento", "L'abitudine", "Lo stile di vita", "Il consumo", "La pubblicità", "Influenzare", "Il potere", "L'autorità", "Il consenso", "La gerarchia", "Il prestigio", "L'identità", "L'appartenenza", "Il conflitto", "La risoluzione", "Negoziare", "Il compromesso", "La pace", "La sicurezza", "La minaccia", "Il rischio", "L'emergenza", "Il soccorso", "L'assistenza", "Il dovere", "L'impegno", "La responsabilità", "Il valore", "L'etica", "La morale", "La tradizione", "Il progresso tecnologico", "L'innovazione sociale", "La rete sociale", "La comunicazione", "L'informazione", "La verità", "La bugia", "La censura", "Il controllo", "Il monitoraggio", "La sorveglianza", "La privacy", "La protezione dati", "Il reato", "Morbido", "Libreria", "Rumore", "Forse", "Inoltre", "Infatti", "Fine"
];

const m07WordsRaw = [
    "Il capolavoro", "Estetico", "La corrente artistica", "L'ispirazione", "Creatività", "L'opera d'arte", "Il dipinto", "La scultura", "L'architettura", "Il restauro", "La galleria", "Il museo", "L'esposizione", "Il curatore", "Il critico d'arte", "La tecnica", "Lo stile", "Il pennello", "La tela", "Il marmo", "L'argilla", "Il bozzetto", "La prospettiva", "Il chiaroscuro", "La sfumatura", "L'astratto", "Il figurativo", "Il paesaggio", "Il ritratto", "L'autoritratto", "La natura morta", "Il mosaico", "L'affresco", "La ceramica", "Il design", "L'artigianato", "Il pezzo unico", "La collezione", "Il collezionista", "L'asta", "Il valore artistico", "L'originalità", "Il genio", "Il talento", "La maestria", "L'esibizione", "Inaugurare", "L'evento culturale", "Il patrimonio", "La conservazione", "L'archeologia", "Il sito", "Il reperto", "La letteratura", "La poesia", "Il romanzo", "L'autore", "Il poeta", "La rima", "La metafora", "Il simbolo", "L'immaginazione", "Il cinema", "La regia", "La sceneggiatura", "La recitazione", "Il teatro", "Il palcoscenico", "La danza", "La coreografia", "La musica", "La composizione", "L'armonia", "Il ritmo", "La melodia", "Il concerto", "L'opera", "Il libretto", "La creatività", "L'espressione", "L'innovazione", "Il gusto", "L'eleganza", "L'armonia", "Il bello", "L'emozione", "Il sentire", "L'interpretazione", "Sperimentare", "Creare", "Dipingere", "Scolpire", "Parenti", "Magazzino", "Camera", "Inoltre", "Tuttavia", "Infine", "Fine"
];

const allNewWords = [...m06WordsRaw, ...m07WordsRaw].map(w => w.toLowerCase().trim());
const directory = 'firestore_data';
const files = fs.readdirSync(directory).filter(f => f.startsWith('ita_') && f.endsWith('.json'));

files.forEach(f => {
    const filePath = path.join(directory, f);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (data.lessons) {
        data.lessons.forEach(l => {
            l.vocabularyItems.forEach(v => {
                const w = v.word.toLowerCase().trim();
                if (allNewWords.includes(w)) {
                    console.log(`DUPLICATE: "${w}" found in ${f}`);
                }
            });
        });
    }
});
