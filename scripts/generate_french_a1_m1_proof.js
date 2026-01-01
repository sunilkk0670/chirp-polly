const fs = require('fs');
const path = require('path');

// FRENCH A1 MODULE 1: 100 UNIQUE WORDS
// Theme: Greetings & Basics
const frenchA1M1 = [
    // 1-20: Core basics
    { word: "Bonjour", meaning: "Hello/Good morning", ex: "Bonjour madame" },
    { word: "Salut", meaning: "Hi (informal)", ex: "Salut Pierre!" },
    { word: "Bonsoir", meaning: "Good evening", ex: "Bonsoir monsieur" },
    { word: "Bonne nuit", meaning: "Good night", ex: "Bonne nuit maman" },
    { word: "Au revoir", meaning: "Goodbye", ex: "Au revoir mes amis" },
    { word: "Merci", meaning: "Thank you", ex: "Merci beaucoup" },
    { word: "S'il vous plaît", meaning: "Please (formal)", ex: "Un café, s'il vous plaît" },
    { word: "Excusez-moi", meaning: "Excuse me", ex: "Excusez-moi monsieur" },
    { word: "Pardon", meaning: "Sorry/Pardon", ex: "Pardon, je suis désolé" },
    { word: "Oui", meaning: "Yes", ex: "Oui, c'est vrai" },
    { word: "Non", meaning: "No", ex: "Non, merci" },
    { word: "Je", meaning: "I", ex: "Je suis étudiant" },
    { word: "Tu", meaning: "You (informal)", ex: "Tu es français?" },
    { word: "Il", meaning: "He", ex: "Il est grand" },
    { word: "Elle", meaning: "She", ex: "Elle est belle" },
    { word: "Nous", meaning: "We", ex: "Nous sommes amis" },
    { word: "Vous", meaning: "You (formal/plural)", ex: "Vous êtes professeur?" },
    { word: "Ils", meaning: "They (masculine)", ex: "Ils sont contents" },
    { word: "Elles", meaning: "They (feminine)", ex: "Elles sont françaises" },
    { word: "Être", meaning: "To be", ex: "Je suis heureux" },

    // 21-40: Common verbs & questions
    { word: "Avoir", meaning: "To have", ex: "J'ai un chat" },
    { word: "Aller", meaning: "To go", ex: "Je vais à Paris" },
    { word: "Faire", meaning: "To do/make", ex: "Je fais mes devoirs" },
    { word: "Parler", meaning: "To speak", ex: "Je parle français" },
    { word: "Manger", meaning: "To eat", ex: "Je mange du pain" },
    { word: "Boire", meaning: "To drink", ex: "Je bois de l'eau" },
    { word: "Venir", meaning: "To come", ex: "Je viens de France" },
    { word: "Voir", meaning: "To see", ex: "Je vois la tour Eiffel" },
    { word: "Prendre", meaning: "To take", ex: "Je prends le métro" },
    { word: "Donner", meaning: "To give", ex: "Je donne un cadeau" },
    { word: "Comment", meaning: "How", ex: "Comment allez-vous?" },
    { word: "Quoi", meaning: "What", ex: "Quoi de neuf?" },
    { word: "Qui", meaning: "Who", ex: "Qui est-ce?" },
    { word: "Où", meaning: "Where", ex: "Où est la gare?" },
    { word: "Quand", meaning: "When", ex: "Quand partez-vous?" },
    { word: "Pourquoi", meaning: "Why", ex: "Pourquoi pas?" },
    { word: "Combien", meaning: "How much/many", ex: "Combien ça coûte?" },
    { word: "Quel", meaning: "Which/What", ex: "Quel âge as-tu?" },
    { word: "Voici", meaning: "Here is", ex: "Voici mon ami" },
    { word: "Voilà", meaning: "There is", ex: "Voilà le livre" },

    // 41-60: Numbers, time, family
    { word: "Un", meaning: "One", ex: "Un chat" },
    { word: "Deux", meaning: "Two", ex: "Deux chiens" },
    { word: "Trois", meaning: "Three", ex: "Trois pommes" },
    { word: "Quatre", meaning: "Four", ex: "Quatre livres" },
    { word: "Cinq", meaning: "Five", ex: "Cinq euros" },
    { word: "Six", meaning: "Six", ex: "Six heures" },
    { word: "Sept", meaning: "Seven", ex: "Sept jours" },
    { word: "Huit", meaning: "Eight", ex: "Huit ans" },
    { word: "Neuf", meaning: "Nine", ex: "Neuf mois" },
    { word: "Dix", meaning: "Ten", ex: "Dix minutes" },
    { word: "Aujourd'hui", meaning: "Today", ex: "Aujourd'hui il fait beau" },
    { word: "Demain", meaning: "Tomorrow", ex: "À demain!" },
    { word: "Hier", meaning: "Yesterday", ex: "Hier j'étais malade" },
    { word: "Maintenant", meaning: "Now", ex: "Je pars maintenant" },
    { word: "Toujours", meaning: "Always", ex: "Je t'aime toujours" },
    { word: "Jamais", meaning: "Never", ex: "Je ne fume jamais" },
    { word: "Souvent", meaning: "Often", ex: "Je vais souvent au cinéma" },
    { word: "Parfois", meaning: "Sometimes", ex: "Parfois je lis" },
    { word: "Père", meaning: "Father", ex: "Mon père travaille" },
    { word: "Mère", meaning: "Mother", ex: "Ma mère cuisine" },

    // 61-80: More family, objects, places
    { word: "Frère", meaning: "Brother", ex: "Mon frère est grand" },
    { word: "Sœur", meaning: "Sister", ex: "Ma sœur est petite" },
    { word: "Fils", meaning: "Son", ex: "C'est mon fils" },
    { word: "Fille", meaning: "Daughter/Girl", ex: "Ma fille est jolie" },
    { word: "Ami", meaning: "Friend (m)", ex: "C'est mon ami" },
    { word: "Amie", meaning: "Friend (f)", ex: "C'est mon amie" },
    { word: "Maison", meaning: "House", ex: "J'habite dans une maison" },
    { word: "Appartement", meaning: "Apartment", ex: "J'ai un appartement" },
    { word: "Rue", meaning: "Street", ex: "J'habite rue Victor Hugo" },
    { word: "Ville", meaning: "City", ex: "Paris est une belle ville" },
    { word: "Pays", meaning: "Country", ex: "La France est un pays" },
    { word: "École", meaning: "School", ex: "Je vais à l'école" },
    { word: "Université", meaning: "University", ex: "Je suis à l'université" },
    { word: "Travail", meaning: "Work", ex: "Je vais au travail" },
    { word: "Bureau", meaning: "Office", ex: "Je suis au bureau" },
    { word: "Magasin", meaning: "Store", ex: "Je vais au magasin" },
    { word: "Restaurant", meaning: "Restaurant", ex: "On mange au restaurant" },
    { word: "Café", meaning: "Café/Coffee", ex: "Un café, s'il vous plaît" },
    { word: "Hôtel", meaning: "Hotel", ex: "Je dors à l'hôtel" },
    { word: "Gare", meaning: "Train station", ex: "La gare est loin" },

    // 81-100: Food, adjectives, essentials
    { word: "Pain", meaning: "Bread", ex: "J'achète du pain" },
    { word: "Eau", meaning: "Water", ex: "Je bois de l'eau" },
    { word: "Vin", meaning: "Wine", ex: "Un verre de vin" },
    { word: "Fromage", meaning: "Cheese", ex: "J'aime le fromage" },
    { word: "Viande", meaning: "Meat", ex: "Je mange de la viande" },
    { word: "Poisson", meaning: "Fish", ex: "Du poisson frais" },
    { word: "Légume", meaning: "Vegetable", ex: "Des légumes verts" },
    { word: "Fruit", meaning: "Fruit", ex: "J'aime les fruits" },
    { word: "Pomme", meaning: "Apple", ex: "Une pomme rouge" },
    { word: "Orange", meaning: "Orange", ex: "Une orange juteuse" },
    { word: "Grand", meaning: "Big/Tall", ex: "Un grand homme" },
    { word: "Petit", meaning: "Small", ex: "Un petit chat" },
    { word: "Bon", meaning: "Good", ex: "C'est bon!" },
    { word: "Mauvais", meaning: "Bad", ex: "C'est mauvais" },
    { word: "Beau", meaning: "Beautiful (m)", ex: "Un beau garçon" },
    { word: "Belle", meaning: "Beautiful (f)", ex: "Une belle fille" },
    { word: "Nouveau", meaning: "New", ex: "Un nouveau livre" },
    { word: "Vieux", meaning: "Old", ex: "Un vieux monsieur" },
    { word: "Jeune", meaning: "Young", ex: "Un jeune homme" },
    { word: "Heureux", meaning: "Happy", ex: "Je suis heureux" }
];

// Strict uniqueness check
function validateUniqueness(list, moduleName) {
    const seen = new Set();
    const duplicates = [];

    list.forEach((item, idx) => {
        const key = item.word.toLowerCase().trim();
        if (seen.has(key)) {
            duplicates.push(`Duplicate at index ${idx}: "${item.word}"`);
        }
        seen.add(key);
    });

    if (duplicates.length > 0) {
        console.error(`CRITICAL ERROR in ${moduleName}:`);
        duplicates.forEach(d => console.error(`  ${d}`));
        throw new Error(`Duplicates found in ${moduleName}`);
    }

    if (list.length !== 100) {
        throw new Error(`${moduleName} has ${list.length} words, expected 100`);
    }

    console.log(`✓ ${moduleName}: ${list.length} unique words validated`);
    return list;
}

// Validate
const validatedM1 = validateUniqueness(frenchA1M1, "French A1 M1");

// Create output
const output = {
    modules: [{
        moduleId: "fr_a1_m1",
        theme: "Greetings & Basics",
        order: 1,
        vocabularyItems: validatedM1.map(item => ({
            word: item.word,
            meaning: item.meaning,
            reading: null,
            example_sentence: item.ex
        }))
    }]
};

fs.writeFileSync(
    path.join(__dirname, '../firestore_data/french_a1_m1_proof.json'),
    JSON.stringify(output, null, 2)
);

console.log('\n=== PROOF TABLE ===');
console.log('\nWords 1-20:');
for (let i = 0; i < 20; i++) {
    console.log(`${i + 1}: ${validatedM1[i].word} - ${validatedM1[i].meaning}`);
}

console.log('\nWords 90-100:');
for (let i = 89; i < 100; i++) {
    console.log(`${i + 1}: ${validatedM1[i].word} - ${validatedM1[i].meaning}`);
}

console.log('\n=== INTEGRITY CHECK ===');
console.log(`Total Unique Words: ${new Set(validatedM1.map(v => v.word.toLowerCase())).size} / 100`);
console.log(`Word #1: "${validatedM1[0].word}"`);
console.log(`Word #9: "${validatedM1[8].word}"`);
console.log(`Match? ${validatedM1[0].word === validatedM1[8].word ? 'FAIL' : 'PASS'}`);
