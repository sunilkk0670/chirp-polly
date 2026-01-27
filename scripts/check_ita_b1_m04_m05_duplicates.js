const fs = require('fs');
const path = require('path');

const m04WordsRaw = [
    "L'imprenditore", "Il fatturato", "Conseguire", "La competenza", "L'aspirazione", "Il curriculum", "La risorsa", "La gestione", "Sviluppare", "L'obiettivo", "La promozione", "L'incarico", "La scadenza", "Puntuale", "Il sussidio", "La disoccupazione", "Il sindacato", "Il contratto", "Flessibile", "Il dipendente", "Il datore di lavoro", "Collaborare", "La riunione", "Il verbale", "La strategia", "Il mercato", "La concorrenza", "Il profitto", "L'investimento", "Finanziare", "Il debito", "Il credito", "La banca", "Il risparmio", "Economico", "Il bilancio", "L'azienda", "La ditta", "Il commercio", "L'industria", "La produzione", "Il servizio", "Il fornitore", "La clientela", "Soddisfare", "L'esigenza", "Qualificato", "L'apprendistato", "La carriera", "Il successo", "Il fallimento", "Assumere", "Licenziare", "Le dimissioni", "La pensione", "Il pensionamento", "Impegnarsi", "Determinazione", "La tenacia", "Il coraggio", "Pianificare", "Organizzare", "L'agenda", "L'impegno", "Occupato", "Disponibile", "La trasferta", "La sede", "La filiale", "La mansione", "La responsabilità", "Gestire", "Controllare", "Supervisionare", "Il progetto", "L'avanzamento", "L'aggiornamento", "La formazione", "Il seminario", "La conferenza", "Il networking", "La relazione", "Il contatto", "Lo scambio", "L'opportunità", "La sfida", "Crescere", "Evolversi", "Il futuro", "La visione", "Il valore aggiunto", "Il merito", "La fatica", "Fabbrica", "Attualmente", "Pretendere", "Almeno", "Invece", "Fine"
];

const m05WordsRaw = [
    "La svolta", "L'esperimento", "La ricerca", "La scoperta", "L'ipotesi", "La teoria", "La dimostrazione", "Il dato", "L'analisi", "Il laboratorio", "Lo scienziato", "Il ricercatore", "L'invenzione", "L'ingegneria", "La tecnologia", "L'innovazione", "L'intelligenza artificiale", "Il software", "L'algoritmo", "La genetica", "Il DNA", "La cellula", "L'evoluzione", "L'astronomia", "L'universo", "La galassia", "Il pianeta", "L'esplorazione", "La chimica", "L'atomo", "La molecola", "La fisica", "L'energia nucleare", "La radiazione", "Il vaccino", "La medicina", "La cura", "Guarire", "La chirurgia", "Il trapianto", "La robotica", "Il robot", "L'automazione", "La sostenibilità", "L'ambiente", "L'ecologia", "Il clima", "Rinnovabile", "Il progresso", "Il futuro", "La sfida", "Etico", "La morale", "Il metodo", "Osservare", "Verificare", "Analizzare", "Pubblicare", "L'articolo scientifico", "Il brevetto", "Proteggere", "L'ingegno", "L'intuizione", "Il dubbio", "La certezza", "Risolvere", "Il problema", "La soluzione", "L'efficacia", "Il rischio", "La sicurezza", "Il sistema", "L'osservazione", "L'evidenza", "Concreto", "Astratto", "Complesso", "Semplice", "Moderno", "Antico", "Digitale", "Analogico", "Il sensore", "La misura", "Lo strumento", "La scala", "Il microscopio", "Il telescopio", "Lo spazio", "La materia", "L'esperto", "La competenza", "Educazione", "Stage", "Domanda", "Certamente", "Probabilmente", "Fine"
];

const allNewWords = [...m04WordsRaw, ...m05WordsRaw].map(w => w.toLowerCase().trim());
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
