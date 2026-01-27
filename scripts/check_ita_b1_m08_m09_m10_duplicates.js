const fs = require('fs');
const path = require('path');

const m08WordsRaw = [
    "Sostenibile", "Rinnovabile", "Impattare", "L'inquinamento", "L'ecosistema", "Il cambiamento", "Climatico", "La biodiversità", "L'emissione", "Il riscaldameno", "Globale", "La risorsa", "Esauribile", "La tutela", "Salvaguardare", "L'energia solare", "L'eolico", "Il riciclaggio", "Lo spreco", "Ridurre", "Riutilizzare", "Il consumo", "Responsabile", "L'ecologia", "Il pannello", "La biomassa", "L'effetto serra", "L'ozono", "Il ghiacciaio", "Sciogliersi", "L'innalzamento", "Il livello del mare", "La siccità", "L'inondazione", "Catastrofico", "La prevenzione", "Pianificare", "La strategia", "A lungo termine", "Prevedere", "La previsione", "L'incertezza", "Lo scenario", "L'evoluzione", "La tecnologia verde", "L'efficienza", "Energetico", "Il risparmio", "L'investimento", "La ricerca", "Sperimentare", "L'innovazione", "Sfidante", "L'opportunità", "Il progresso", "La civiltà", "L'umanità", "Il destino", "La sopravvivenza", "Adattarsi", "La resilienza", "Sostenere", "L'impegno", "La cooperazione", "Internazionale", "Il trattato", "La norma", "Regolare", "Sanzionare", "L'accordo", "La sfida globale", "La consapevolezza", "Educare", "Le generazioni", "Il patrimonio", "Preservare", "La natura selvaggia", "L'habitat", "Incontaminato", "Puro", "Equilibrato", "La stabilità", "Il benessere", "L'armonia", "L'ideale", "Concreto", "Pragmatico", "Realistico", "Ottimista", "Pessimista", "Burro", "Brave", "Baldo", "Inoltre", "Quindi", "Tuttavia", "Infine", "Fine"
];

const m09WordsRaw = [
    "L'itinerario", "Fuori mano", "Il paesaggio", "L'avventura", "L'esploratore", "Esplorare", "La destinazione", "Il soggiorno", "Pernottare", "La prenotazione", "Il bagaglio", "L'attrezzatura", "Zaino in spalla", "Il sentiero", "La guida", "Il percorso", "Attraversare", "Girovagare", "Sperdersi", "Ritrovare la strada", "Il punto di riferimento", "Panoramico", "Mozzafiato", "La vista", "Lontano", "Isolato", "Selvaggio", "L'ignoto", "La curiosità", "L'imprevisto", "L'ostacolo", "Superare", "Il coraggio", "Audace", "L'intraprendenza", "L'esperienza", "Indimenticabile", "Il ricordo", "L'emozione", "La scoperta", "Culturale", "Locale", "L'usanza", "La tradizione", "Lo straniero", "L'accoglienza", "Ospitale", "La lingua", "Il dialetto", "Comunicare", "Interagire", "Condividere", "L'amicizia", "L'incontro", "Il mezzo di trasporto", "Il tragitto", "La coincidenza", "Il ritardo", "La cancellazione", "Il biglietto", "La tariffa", "Lo sconto", "L'alloggio", "L'albergo", "L'ostello", "Il campeggio", "La tenda", "Sacco a pelo", "Il rifugio", "L'escursione", "Il trekking", "L'arrampicata", "La vetta", "La discesa", "La salita", "Il fiume", "Il mare", "L'oceano", "La spiaggia", "L'isola", "La barca", "Vela", "Navigare", "L'immersione", "Il corallo", "Il deserto", "La sabbia", "Il sole", "Il calore", "La sete", "L'oasi", "Il viaggio di nozze", "Burro", "Brave", "Baldo", "Dunque", "Invece", "Infatti", "Fine"
];

const m10WordsRaw = [
    "Padronanza", "Rafforzare", "La competenza", "La revisione", "Il ripasso", "La padronanza linguistica", "L'abilità", "Migliorare", "Perfezionare", "Il progresso", "L'avanzamento", "Il livello B1", "Intermedio", "L'autonomia", "Indipendente", "Esercitarsi", "L'esercizio", "La pratica", "Applicare", "Utilizzare", "Sviluppare", "La crescita", "L'apprendimento", "Lo studio", "L'impegno", "La costanza", "La motivazione", "L'obiettivo", "Il traguardo", "Il successo", "Raggiungere", "Superare", "L'esame", "La verifica", "Il risultato", "La valutazione", "Il punteggio", "La certificazione", "Il diploma", "La qualifica", "Conoscenza", "Comprensione", "Esprimersi", "Articolare", "Fluente", "Spontaneo", "Naturale", "Complesso", "Dettagliato", "Preciso", "Corretto", "Sbagliato", "L'errore", "Correggere", "L'autocorrezione", "Il dubbio", "La certezza", "La fiducia", "Sicuro di sé", "Soddisfatto", "L'orgoglio", "L'ambizione", "La sfida", "Il coraggio", "La tenacia", "La perseveranza", "Il futuro", "Il livello B2", "Avanzato", "La continuità", "Il percorso", "La tappa", "L'evoluzione", "La trasformazione", "Scoprire", "Esplorare", "Immergersi", "La cultura", "L'identità", "Lo scambio", "Interculturale", "Globale", "Cittadino del mondo", "L'orizzonte", "Nuovo", "Diverso", "Unico", "Speciale", "Prezioso", "L'essenza", "La sintesi", "L'armonia", "Burro", "Brave", "Baldo", "Congratulazioni", "Certamente", "Fine"
];

const allNewWords = [...m08WordsRaw, ...m09WordsRaw, ...m10WordsRaw].map(w => w.toLowerCase().trim());
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
