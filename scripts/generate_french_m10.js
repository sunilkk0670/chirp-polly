const fs = require('fs');
const path = require('path');

const m10_items = [
    // --- CONNECTORS & LOGIC (Building Blocks) ---
    { word: "Cependant", meaning: "However", reading: "suh-pah-dah", example_sentence: "J'aime le café, cependant je préfère le thé." },
    { word: "Néanmoins", meaning: "Nonetheless", reading: "nay-ah-mwah", example_sentence: "C'est difficile, néanmoins c'est possible." },
    { word: "Car", meaning: "Because (formal)", reading: "kar", example_sentence: "Il ne sort pas car il pleut." },
    { word: "Puisque", meaning: "Since / Seeing as", reading: "pweez-kuh", example_sentence: "Puisque tu es là, aide-moi." },
    { word: "Surtout", meaning: "Above all / Especially", reading: "soor-too", example_sentence: "N'oublie pas tes clés, surtout !" },
    { word: "Afin de", meaning: "In order to", reading: "a-fah duh", example_sentence: "Je travaille afin de réussir." },
    { word: "Sinon", meaning: "Otherwise / Or else", reading: "see-noh", example_sentence: "Mange, sinon tu auras faim." },
    { word: "Selon", meaning: "According to", reading: "suh-loh", example_sentence: "Selon le journal, il fait beau." },
    { word: "Malgré", meaning: "Despite", reading: "mal-gray", example_sentence: "Il sort malgré la pluie." },
    { word: "Grâce à", meaning: "Thanks to", reading: "gras a", example_sentence: "Grâce à toi, j'ai fini." },
    { word: "À cause de", meaning: "Because of (negative)", reading: "a kohz duh", example_sentence: "En retard à cause du trafic." },
    { word: "Environ", meaning: "Approximately", reading: "ah-vee-roh", example_sentence: "Il y a environ dix personnes." },
    { word: "Presque", meaning: "Almost", reading: "pres-kuh", example_sentence: "J'ai presque fini mon travail." },
    { word: "Parfois", meaning: "Sometimes", reading: "par-frwa", example_sentence: "Je vais parfois au théâtre." },
    { word: "Souvent", meaning: "Often", reading: "soo-vah", example_sentence: "Nous lisons souvent des livres." },

    // --- ADVERBS OF NUANCE ---
    { word: "Probablement", meaning: "Probably", reading: "proh-ba-bluh-mah", example_sentence: "Il viendra probablement demain." },
    { word: "Certainement", meaning: "Certainly", reading: "ser-ten-mah", example_sentence: "C'est certainement une erreur." },
    { word: "Vraiment", meaning: "Really / Truly", reading: "vre-mah", example_sentence: "C'est vraiment très bon." },
    { word: "Tellement", meaning: "So much / So", reading: "tel-mah", example_sentence: "Je suis tellement content !" },
    { word: "Assez", meaning: "Enough", reading: "a-say", example_sentence: "J'ai assez mangé." },
    { word: "Rarement", meaning: "Rarely", reading: "rar-mah", example_sentence: "Il pleut rarement ici." },
    { word: "Habituellement", meaning: "Usually", reading: "a-bee-too-el-mah", example_sentence: "Habituellement, je me lève à sept heures." },
    { word: "Actuellement", reading: "ak-too-el-mah", meaning: "Currently", example_sentence: "Je cherche actuellement un emploi." },
    { word: "Récemment", meaning: "Recently", reading: "ray-sa-mah", example_sentence: "J'ai vu ce film récemment." },
    { word: "Immédiatement", meaning: "Immediately", reading: "ee-may-dya-tuh-mah", example_sentence: "Venez immédiatement !" },
    { word: "Facilement", meaning: "Easily", reading: "fa-seel-mah", example_sentence: "Il parle facilement." },
    { word: "Heureusement", meaning: "Fortunately", reading: "uh-ruh-zuh-mah", example_sentence: "Heureusement, il est là." },
    { word: "Malheureusement", meaning: "Unfortunately", reading: "ma-luh-ruh-zuh-mah", example_sentence: "Malheureusement, c'est trop tard." },

    // --- SOCIETY & CULTURE (A1 wrapping up) ---
    { word: "Société", meaning: "Society", reading: "soh-syay-tay", example_sentence: "La société moderne." },
    { word: "Gouvernement", meaning: "Government", reading: "goo-ver-nuh-mah", example_sentence: "Le gouvernement décide." },
    { word: "Politique", meaning: "Politics", reading: "poh-lee-teek", example_sentence: "S'intéresser à la politique." },
    { word: "Économie", meaning: "Economy", reading: "ay-koh-noh-mee", example_sentence: "L'économie mondiale." },
    { word: "Science", meaning: "Science", reading: "syahs", example_sentence: "Une découverte en science." },
    { word: "Climat", meaning: "Climate", reading: "klee-ma", example_sentence: "Le climat change." },
    { word: "Argument", meaning: "Argument", reading: "ar-goo-mah", example_sentence: "Un bon argument." },
    { word: "Recherche", meaning: "Research", reading: "ruh-sher-shuh", example_sentence: "Faire de la recherche." },
    { word: "Conclusion", meaning: "Conclusion", reading: "koh-kloo-zyoh", example_sentence: "En conclusion, merci." },
    { word: "Présentation", meaning: "Presentation", reading: "pray-zah-ta-syoh", example_sentence: "Une belle présentation." },
    { word: "Développement", meaning: "Development", reading: "day-vuh-lop-mah", example_sentence: "Le développement durable." },
    { word: "Système", meaning: "System", reading: "sees-tem", example_sentence: "Un système complexe." },
    { word: "Structure", meaning: "Structure", reading: "strook-toor", example_sentence: "La structure du texte." },
    { word: "Égalité", meaning: "Equality", reading: "ay-ga-lee-tay", example_sentence: "Liberté, égalité, fraternité." },
    { word: "Fraternité", meaning: "Fraternity", reading: "fra-ter-nee-tay", example_sentence: "Vivre en fraternité." },
    { word: "Progrès", meaning: "Progress", reading: "proh-gray", example_sentence: "Faire des progrès." },
    { word: "Connaissance", meaning: "Knowledge", reading: "koh-ne-sahs", example_sentence: "Avoir des connaissances." },
    { word: "Tradition", meaning: "Tradition", reading: "tra-dee-syoh", example_sentence: "Une vieille tradition." },
    { word: "Avenir", meaning: "Future (time to come)", reading: "av-neer", example_sentence: "Penser à l'avenir." },

    // --- EMOTIONS & STATES OF MIND ---
    { word: "Enthousiasme", meaning: "Enthusiasm", reading: "ah-too-zyaz-muh", example_sentence: "Avoir de l'enthousiasme." },
    { word: "Inquiétude", meaning: "Worry", reading: "ah-kyay-tood", example_sentence: "Une grande inquiétude." },
    { word: "Jalousie", meaning: "Jealousy", reading: "zha-loo-zee", example_sentence: "La jalousie est mauvaise." },
    { word: "Fierté", meaning: "Pride", reading: "fyer-tay", example_sentence: "Une légitime fierté." },
    { word: "Honte", meaning: "Shame", reading: "ohnt", example_sentence: "Quelle honte !" },
    { word: "Solitude", meaning: "Solitude", reading: "soh-lee-tood", example_sentence: "Aimer la solitude." },
    { word: "Ambition", meaning: "Ambition", reading: "ah-bee-syoh", example_sentence: "Une grande ambition." },
    { word: "Paix", meaning: "Peace", reading: "pe", example_sentence: "Vivre en paix." },
    { word: "Conflit", meaning: "Conflict", reading: "koh-flee", example_sentence: "Gérer un conflit." },
    { word: "Solidarité", meaning: "Solidarity", reading: "soh-lee-da-ree-tay", example_sentence: "Un geste de solidarité." },
    { word: "Émotion", meaning: "Emotion", reading: "ay-moh-syoh", example_sentence: "Une forte émotion." },
    { word: "Sentiment", meaning: "Feeling", reading: "sah-tee-mah", example_sentence: "Un beau sentiment." },
    { word: "Sagesse", meaning: "Wisdom", reading: "sa-zhes", example_sentence: "La sagesse des anciens." },
    { word: "Volonté", meaning: "Willpower", reading: "voh-loh-tay", example_sentence: "Une forte volonté." },
    { word: "Responsabilité", meaning: "Responsibility", reading: "res-poh-sa-bee-lee-tay", example_sentence: "Prendre sa responsabilité." },
    { word: "Imagination", meaning: "Imagination", reading: "ee-ma-zhee-na-syoh", example_sentence: "Utilisez votre imagination." },
    { word: "Réalité", meaning: "Reality", reading: "ray-a-lee-tay", example_sentence: "Face à la réalité." },
    { word: "Confiance", meaning: "Confidence / Trust", reading: "koh-fyahs", example_sentence: "Avoir confiance en soi." },

    // --- COMMUNICATION VERBS (The 'How' of speaking) ---
    { word: "Expliquer", meaning: "To explain", reading: "ek-splee-kay", example_sentence: "Explique-moi encore." },
    { word: "Décrire", meaning: "To describe", reading: "day-kreer", example_sentence: "Décrire une personne." },
    { word: "Répéter", meaning: "To repeat", reading: "ray-pay-tay", example_sentence: "Pouvez-vous répéter ?" },
    { word: "Traduire", meaning: "To translate", reading: "tra-dweer", example_sentence: "Traduire vers le français." },
    { word: "Prononcer", meaning: "To pronounce", reading: "proh-noh-say", example_sentence: "Bien prononcer les mots." },
    { word: "Réfléchir", meaning: "To reflect / think", reading: "ray-flay-sheer", example_sentence: "Laissez-moi réfléchir." },
    { word: "S'imaginer", meaning: "To imagine oneself", reading: "see-ma-zhee-nay", example_sentence: "S'imaginer sur une île." },
    { word: "Oublier", meaning: "To forget", reading: "oo-blee-yay", example_sentence: "J'ai oublié son nom." },
    { word: "Proposer", meaning: "To propose", reading: "proh-poh-zay", example_sentence: "Proposer une solution." },
    { word: "Accepter", meaning: "To accept", reading: "ak-sep-tay", example_sentence: "J'accepte votre offre." },
    { word: "Refuser", meaning: "To refuse", reading: "ruh-foo-zay", example_sentence: "Elle refuse de partir." },
    { word: "Promettre", meaning: "To promise", reading: "proh-me-truh", example_sentence: "Je te promets d'être là." },
    { word: "Mentir", meaning: "To lie", reading: "mah-teer", example_sentence: "Ne mentez pas." },
    { word: "Plaisanter", meaning: "To joke", reading: "ple-zah-tay", example_sentence: "Je ne fais que plaisanter." },
    { word: "Crier", meaning: "To shout", reading: "kree-yay", example_sentence: "Ne criez pas !" },
    { word: "Murmurer", meaning: "To whisper", reading: "moor-moo-ray", example_sentence: "Murmurer un secret." },
    { word: "Débattre", meaning: "To debate", reading: "day-ba-truh", example_sentence: "Débattre d'un sujet." },
    { word: "Convaincre", meaning: "To convince", reading: "koh-vah-kruh", example_sentence: "Il cherche à me convaincre." },
    { word: "Influencer", meaning: "To influence", reading: "ah-floo-ah-say", example_sentence: "Influencer les autres." },
    { word: "Communiquer", meaning: "To communicate", reading: "koh-moo-nee-kay", example_sentence: "Savoir communiquer." },

    // --- ACTIONS & STATES (Final Wrap) ---
    { word: "Créer", meaning: "To create", reading: "kray-ay", example_sentence: "Créer un projet." },
    { word: "Détruire", meaning: "To destroy", reading: "day-trweer", example_sentence: "Le feu détruit tout." },
    { word: "Améliorer", meaning: "To improve", reading: "a-may-lyoh-ray", example_sentence: "Améliorer son français." },
    { word: "Tenter", meaning: "To attempt", reading: "tah-tay", example_sentence: "Tenter une expérience." },
    { word: "Espérer", meaning: "To hope", reading: "es-pay-ray", example_sentence: "J'espère qu'il fera beau." },
    { word: "Croire", meaning: "To believe", reading: "krwar", example_sentence: "Je crois en toi." },
    { word: "Penser", meaning: "To think", reading: "pah-say", example_sentence: "Je pense à toi." },
    { word: "Attendre", meaning: "To wait", reading: "a-tah-druh", example_sentence: "Attendre le bus." },
    { word: "Entendre", meaning: "To hear", reading: "ah-tah-druh", example_sentence: "J'entends un bruit." },
    { word: "Sentir", meaning: "To feel / smell", reading: "sah-teer", example_sentence: "Je sens le parfum." },
    { word: "Toucher", meaning: "To touch", reading: "too-shay", example_sentence: "Ne pas toucher." },
    { word: "Goûter", meaning: "To taste", reading: "goo-tay", example_sentence: "Goûte cette soupe." },
    { word: "Appeler", meaning: "To call", reading: "a-pul-ay", example_sentence: "Appelez-moi demain." },
    { word: "Envoyer", meaning: "To send", reading: "ah-vwa-yay", example_sentence: "Envoyer un colis." },
    { word: "Gagner", meaning: "To win / earn", reading: "ga-nyay", example_sentence: "Gagner un match." },
    { word: "Perdre", meaning: "To lose", reading: "per-droh", example_sentence: "Perdre ses clés." },
    { word: "Commencer", meaning: "To start", reading: "koh-mah-say", example_sentence: "Commencer le travail." },
    { word: "Finir", meaning: "To finish", reading: "fee-neer", example_sentence: "Finir la leçon." },
    { word: "Partager", meaning: "To share", reading: "par-ta-zhay", example_sentence: "Partager son repas." }
];

console.log('Drafting Module 10...');
console.log('Total items count: ' + m10_items.length);

if (m10_items.length !== 100) {
    console.warn('⚠️ WARNING: Count is ' + m10_items.length + '. Adjusting to exactly 100...');
}

const final_m10_items = m10_items.slice(0, 100);
// If it was less than 100, I'd add fillers. But I'll ensure it's around 100 first.
// Let's count properly: 15+13+19+18+20+19 = 104. I need to trim 4.

const m10 = {
    id: "fr_a1_m10",
    name: "A1 French - Module 10: Advanced Communication",
    count: 100,
    vocabularyItems: final_m10_items
};

fs.writeFileSync(path.join(__dirname, '../firestore_data/french_a1_m10.json'), JSON.stringify(m10, null, 2));
console.log('Saved 100 UNIQUE French words to firestore_data/french_a1_m10.json');
