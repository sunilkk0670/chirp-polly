import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const existingData = JSON.parse(fs.readFileSync(path.join(__dirname, "existing_words.json"), "utf8"));
const existingWords = new Set(existingData.words);

const m06Vocabulary = [
    { "word": "L'aeroporto", "translation": "The airport", "phonetic": "la-ay-ro-POR-to" },
    { "word": "Il volo", "translation": "The flight", "phonetic": "eel VO-lo" },
    { "word": "L'aereo", "translation": "The airplane", "phonetic": "la-AY-ray-o" },
    { "word": "Il passaporto", "translation": "The passport", "phonetic": "eel pas-sa-POR-to" },
    { "word": "Il visto", "translation": "The visa", "phonetic": "eel VEES-to" },
    { "word": "La valigia", "translation": "The suitcase", "phonetic": "la va-LEE-ja" },
    { "word": "Il bagaglio", "translation": "The luggage", "phonetic": "eel ba-GA-lyo" },
    { "word": "La prenotazione", "translation": "The reservation", "phonetic": "la pray-no-ta-TSYO-nay" },
    { "word": "Il biglietto", "translation": "The ticket", "phonetic": "eel bee-LYET-to" },
    { "word": "La stazione", "translation": "The station", "phonetic": "la sta-TSYO-nay" },
    { "word": "Il treno", "translation": "The train", "phonetic": "eel TRAY-no" },
    { "word": "Il binario", "translation": "The platform", "phonetic": "eel bee-NA-ryo" },
    { "word": "La nave", "translation": "The ship", "phonetic": "la NA-vay" },
    { "word": "Il traghetto", "translation": "The ferry", "phonetic": "eel tra-GET-to" },
    { "word": "L'autobus", "translation": "The bus", "phonetic": "LOW-to-boos" },
    { "word": "La metropolitana", "translation": "The subway", "phonetic": "la may-tro-po-lee-TA-na" },
    { "word": "La fermata", "translation": "The stop", "phonetic": "la fer-MA-ta" },
    { "word": "Il taxi", "translation": "The taxi", "phonetic": "eel TAK-see" },
    { "word": "La bicicletta", "translation": "The bicycle", "phonetic": "la bee-chee-KLET-ta" },
    { "word": "Il noleggio", "translation": "The rental", "phonetic": "eel no-LED-jo" },
    { "word": "Guidare", "translation": "To drive", "phonetic": "gwee-DA-ray" },
    { "word": "Viaggiare", "translation": "To travel", "phonetic": "vyad-JA-ray" },
    { "word": "Partire", "translation": "To depart", "phonetic": "par-TEE-ray" },
    { "word": "Arrivare", "translation": "To arrive", "phonetic": "ar-ree-VA-ray" },
    { "word": "Tornare", "translation": "To return", "phonetic": "tor-NA-ray" },
    { "word": "Decollare", "translation": "To take off", "phonetic": "day-kol-LA-ray" },
    { "word": "Atterrare", "translation": "To land", "phonetic": "at-ter-RA-ray" },
    { "word": "Cambiare", "translation": "To change / transfer", "phonetic": "kam-BYA-ray" },
    { "word": "Perdere", "translation": "To miss (a flight/train)", "phonetic": "PER-day-ray" },
    { "word": "Aspettare", "translation": "To wait", "phonetic": "as-pet-TA-ray" },
    { "word": "Il ritardo", "translation": "The delay", "phonetic": "eel ree-TAR-do" },
    { "word": "In orario", "translation": "On time", "phonetic": "een o-RA-ryo" },
    { "word": "L'uscita", "translation": "The exit / gate", "phonetic": "loo-SHEE-ta" },
    { "word": "L'entrata", "translation": "The entrance", "phonetic": "len-TRA-ta" },
    { "word": "Sola andata", "translation": "One way", "phonetic": "SO-la an-DA-ta" },
    { "word": "Andata e ritorno", "translation": "Round trip", "phonetic": "an-DA-ta ay ree-TOR-no" },
    { "word": "Prima classe", "translation": "First class", "phonetic": "PREE-ma KLAS-say" },
    { "word": "Seconda classe", "translation": "Second class", "phonetic": "say-KON-da KLAS-say" },
    { "word": "Il posto", "translation": "The seat", "phonetic": "eel POS-to" },
    { "word": "La mappa", "translation": "The map", "phonetic": "la MAP-pa" },
    { "word": "Il turista", "translation": "The tourist", "phonetic": "eel too-REES-ta" },
    { "word": "La guida", "translation": "The guide", "phonetic": "la GWEE-da" },
    { "word": "Il centro città", "translation": "The city center", "phonetic": "eel CHEN-tro chit-TA" },
    { "word": "Il monumento", "translation": "The monument", "phonetic": "eel mo-noo-MEN-to" },
    { "word": "La chiesa", "translation": "The church", "phonetic": "la KYAY-za" },
    { "word": "Il museo", "translation": "The museum", "phonetic": "eel moo-ZAY-o" },
    { "word": "Il palazzo", "translation": "The building / palace", "phonetic": "eel pa-LAT-tso" },
    { "word": "La piazza", "translation": "The square", "phonetic": "la PYAT-tsa" },
    { "word": "Il ponte", "translation": "The bridge", "phonetic": "eel PON-tay" },
    { "word": "La strada", "translation": "The street", "phonetic": "la STRA-da" },
    { "word": "L'albergo", "translation": "The hotel", "phonetic": "lal-BER-go" },
    { "word": "La camera", "translation": "The room", "phonetic": "la KA-may-ra" },
    { "word": "La colazione inclusa", "translation": "Breakfast included", "phonetic": "la ko-la-TSYO-nay een-KLOO-za" },
    { "word": "Il mare", "translation": "The sea", "phonetic": "eel MA-ray" },
    { "word": "La spiaggia", "translation": "The beach", "phonetic": "la SPYAD-ja" },
    { "word": "La montagna", "translation": "The mountain", "phonetic": "la mon-TA-nya" },
    { "word": "La campagna", "translation": "The countryside", "phonetic": "la kam-PA-nya" },
    { "word": "Il lago", "translation": "The lake", "phonetic": "eel LA-go" },
    { "word": "L'isola", "translation": "The island", "phonetic": "LEE-zo-la" },
    { "word": "Il fiume", "translation": "The river", "phonetic": "eel FYOO-may" },
    { "word": "La natura", "translation": "Nature", "phonetic": "la na-TOO-ra" },
    { "word": "Il passatempo", "translation": "Pastime", "phonetic": "eel pas-sa-TEM-po" },
    { "word": "Divertimento", "translation": "Amusement", "phonetic": "dee-ver-tee-MEN-to" },
    { "word": "Scattare una foto", "translation": "To take a photo", "phonetic": "skat-TA-ray OO-na FO-to" },
    { "word": "Comprare souvenir", "translation": "To buy souvenirs", "phonetic": "kom-PRA-ray soo-vay-NEER" },
    { "word": "Mangiare fuori", "translation": "To eat out", "phonetic": "man-JA-ray FWOH-ree" },
    { "word": "Bere un caffè", "translation": "To drink a coffee", "phonetic": "BAY-ray oon kaf-FAY" },
    { "word": "Passeggiare", "translation": "To stroll", "phonetic": "pas-sed-JA-ray" },
    { "word": "Riposare", "translation": "To rest", "phonetic": "ree-po-ZA-ray" },
    { "word": "Dormire", "translation": "To sleep", "phonetic": "dor-MEE-ray" },
    { "word": "Destra", "translation": "Right", "phonetic": "DES-tra" },
    { "word": "Sinistra", "translation": "Left", "phonetic": "see-NEES-tra" },
    { "word": "Dritto", "translation": "Straight", "phonetic": "DREET-to" },
    { "word": "Accanto a", "translation": "Next to", "phonetic": "ak-KAN-to a" },
    { "word": "Davanti a", "translation": "In front of", "phonetic": "da-VAN-tee a" },
    { "word": "Dietro", "translation": "Behind", "phonetic": "DYAY-tro" },
    { "word": "Sopra", "translation": "Above", "phonetic": "SO-pra" },
    { "word": "Sotto", "translation": "Under", "phonetic": "SOT-to" },
    { "word": "Tra", "translation": "Between", "phonetic": "tra" },
    { "word": "Lontano", "translation": "Far", "phonetic": "lon-TA-no" },
    { "word": "Vicino", "translation": "Near", "phonetic": "vee-CHEE-no" },
    { "word": "Il confine", "translation": "The border", "phonetic": "eel kon-FEE-nay" },
    { "word": "La dogana", "translation": "Customs", "phonetic": "la do-GA-na" },
    { "word": "Il controllo", "translation": "Control / Check", "phonetic": "eel kon-TROL-lo" },
    { "word": "La sicurezza", "translation": "Security", "phonetic": "la see-koo-RET-tsa" },
    { "word": "All'estero", "translation": "Abroad", "phonetic": "al-LES-tay-ro" },
    { "word": "Straniero", "translation": "Foreigner / Strange", "phonetic": "stra-NYAY-ro" },
    { "word": "La lingua", "translation": "The language", "phonetic": "la LEEN-gwa" },
    { "word": "Il dizionario", "translation": "The dictionary", "phonetic": "eel deet-tsyo-NA-ryo" },
    { "word": "Aiuto", "translation": "Help", "phonetic": "a-YOO-to" },
    { "word": "Per favore", "translation": "Please", "phonetic": "per fa-VO-ray" },
    { "word": "Grazie", "translation": "Thanks", "phonetic": "GRAT-zyay" },
    { "word": "Prego", "translation": "You're welcome", "phonetic": "PRAY-go" },
    { "word": "Scusa", "translation": "Excuse me", "phonetic": "SKOO-za" },
    { "word": "Liar Game: Pretendere", "translation": "To demand (NOT To pretend)", "phonetic": "pray-TEN-day-ray" },
    { "word": "Liar Game: Fabbrica", "translation": "Factory (NOT Fabric)", "phonetic": "FAB-bree-ka" },
    { "word": "Liar Game: Suggestione", "translation": "Influence/Fascination (NOT Suggestion)", "phonetic": "sood-jes-TYO-nay" },
    { "word": "Fine", "translation": "End", "phonetic": "FEE-nay" }
];

const duplicates = [];
const cleanVocabulary = [];

m06Vocabulary.forEach(item => {
    let wordClean = item.word.replace("Liar Game: ", "").toLowerCase().trim();
    // Also remove articles for comparison if they were inconsistently used
    let baseWord = wordClean.replace(/^(il|la|l\x27|i|le|gli)\s+/, "");

    if (existingWords.has(wordClean) || existingWords.has(baseWord)) {
        duplicates.push(item.word);
    } else {
        cleanVocabulary.push(item);
    }
});

console.log(JSON.stringify({
    duplicateCount: duplicates.length,
    duplicates: duplicates,
    cleanCount: cleanVocabulary.length
}));
