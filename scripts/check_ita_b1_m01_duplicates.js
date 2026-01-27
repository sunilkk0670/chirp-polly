const fs = require('fs');
const path = require('path');

const newWordsRaw = [
    'La narrazione', 'L\'ambientazione', 'L\'intreccio', 'Rievocare', 'Accadere', 'Svolgersi', 'Il protagonista', 'La sfumatura', 'La memoria', 'La dimenticanza', 'La nostalgia', 'La malinconia', 'Avvincente', 'Verosimile', 'Imprevedibile', 'Significativo', 'La ricorrenza', 'La quotidianità', 'Il passato', 'Remoto', 'Il testimone', 'La vicenda', 'L\'eredità', 'Sussurrare', 'Rammentare', 'Scordare', 'L\'aneddoto', 'Il cimelio', 'Svanire', 'Immaginario', 'La fantasia', 'L\'ispirazione', 'L\'incubo', 'Pauroso', 'L\'eroe', 'Il nemico', 'La sfida', 'La vittoria', 'La sconfitta', 'Il tentativo', 'Il rischio', 'La salvezza', 'Il destino', 'L\'infanzia', 'L\'adolescenza', 'La maturità', 'La crescita', 'L\'invecchiamento', 'I genitori', 'La parentela', 'La casa natale', 'Le radici', 'L\'epoca', 'Il secolo', 'Il decennio', 'L\'antichità', 'Il Medioevo', 'Il Rinascimento', 'L\'Illuminismo', 'La rivoluzione', 'L\'indipendenza', 'La menzogna', 'Il segreto', 'La confessione', 'Il mistero', 'L\'enigma', 'Il sospetto', 'L\'indizio', 'La prova', 'Il colpevole', 'L\'innocente', 'Il giudizio', 'L\'opinione', 'Il pensiero', 'La riflessione', 'La convinzione', 'Il dubbio', 'L\'incertezza', 'La saggezza', 'La conoscenza', 'L\'istruzione', 'La cultura', 'Sviluppare', 'Delineare', 'Sottolineare', 'Trascorrere', 'Rimproverare', 'Affascinante', 'Noioso', 'Antico', 'Moderno', 'Eventualmente', 'Annoiato', 'Suggestione', 'Confidenza', 'Sensibile', 'Educato', 'La conclusione', 'Proseguire', 'Fine'
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
