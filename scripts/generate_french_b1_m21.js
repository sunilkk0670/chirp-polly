const fs = require('fs');
const path = require('path');

// French B1 Module 21: Advanced Communication & Argumentation
// Theme: Expressing opinions, debating, and persuading
const module21 = {
    id: "fr_b1_m21",
    moduleId: "fr_b1_m21",
    name: "B1 French - Module 21: Argumentation & Debate",
    theme: "B1 French - Module 21: Argumentation & Debate",
    order: 21,
    count: 100,
    vocabularyItems: [
        // Advanced Opinion & Argumentation (1-20)
        { word: "Selon moi", meaning: "In my opinion", reading: "suh-loh mwa", example_sentence: "Selon moi, cette solution est la meilleure." },
        { word: "À mon sens", meaning: "To my mind", reading: "a moh sahns", example_sentence: "À mon sens, il faut agir rapidement." },
        { word: "Il me semble que", meaning: "It seems to me that", reading: "eel muh sahm-bluh kuh", example_sentence: "Il me semble que vous avez raison." },
        { word: "J'estime que", meaning: "I consider that", reading: "zhes-teem kuh", example_sentence: "J'estime que c'est une erreur." },
        { word: "Je suis convaincu que", meaning: "I'm convinced that", reading: "zhuh swee kohn-van-koo kuh", example_sentence: "Je suis convaincu que nous réussirons." },
        { word: "Argument", meaning: "Argument", reading: "ar-goo-mah", example_sentence: "Votre argument est convaincant." },
        { word: "Preuve", meaning: "Proof / Evidence", reading: "pruhv", example_sentence: "Avez-vous des preuves ?" },
        { word: "Démontrer", meaning: "To demonstrate", reading: "day-mohn-tray", example_sentence: "Il faut démontrer votre théorie." },
        { word: "Justifier", meaning: "To justify", reading: "zhoos-tee-fyay", example_sentence: "Pouvez-vous justifier cette décision ?" },
        { word: "Convaincre", meaning: "To convince", reading: "kohn-vankr", example_sentence: "J'ai réussi à le convaincre." },
        { word: "Persuader", meaning: "To persuade", reading: "per-swa-day", example_sentence: "Elle m'a persuadé d'accepter." },
        { word: "Contredire", meaning: "To contradict", reading: "kohn-truh-deer", example_sentence: "Je ne veux pas vous contredire." },
        { word: "Réfuter", meaning: "To refute", reading: "ray-foo-tay", example_sentence: "Il a réfuté tous mes arguments." },
        { word: "Nuancer", meaning: "To nuance", reading: "noo-ahn-say", example_sentence: "Il faut nuancer votre propos." },
        { word: "Concéder", meaning: "To concede", reading: "kohn-say-day", example_sentence: "Je concède que vous avez un point." },

        // Debate & Discussion (16-35)
        { word: "Débat", meaning: "Debate", reading: "day-ba", example_sentence: "Le débat était passionnant." },
        { word: "Controverse", meaning: "Controversy", reading: "kohn-troh-vers", example_sentence: "Cette loi crée une controverse." },
        { word: "Polémique", meaning: "Polemic / Controversial", reading: "poh-lay-meek", example_sentence: "Un sujet polémique." },
        { word: "Divergence", meaning: "Divergence", reading: "dee-ver-zhahns", example_sentence: "Il y a une divergence d'opinions." },
        { word: "Consensus", meaning: "Consensus", reading: "kohn-sahn-soos", example_sentence: "Nous avons trouvé un consensus." },
        { word: "Compromis", meaning: "Compromise", reading: "kohm-proh-mee", example_sentence: "Cherchons un compromis." },
        { word: "Concession", meaning: "Concession", reading: "kohn-seh-syohn", example_sentence: "Faire une concession." },
        { word: "Objection", meaning: "Objection", reading: "ob-zhek-syohn", example_sentence: "J'ai une objection à formuler." },
        { word: "Réserve", meaning: "Reservation / Reserve", reading: "ray-zerv", example_sentence: "J'émets quelques réserves." },
        { word: "Désaccord", meaning: "Disagreement", reading: "day-za-kor", example_sentence: "Nous sommes en désaccord." },
        { word: "Malentendu", meaning: "Misunderstanding", reading: "ma-lahn-tahn-doo", example_sentence: "Il y a un malentendu." },
        { word: "Clarifier", meaning: "To clarify", reading: "kla-ree-fyay", example_sentence: "Permettez-moi de clarifier." },
        { word: "Préciser", meaning: "To specify", reading: "pray-see-zay", example_sentence: "Je voudrais préciser un point." },
        { word: "Souligner", meaning: "To emphasize", reading: "soo-lee-nyay", example_sentence: "Je tiens à souligner que..." },
        { word: "Insister", meaning: "To insist", reading: "an-sees-tay", example_sentence: "J'insiste sur ce point." },
        { word: "Affirmer", meaning: "To assert", reading: "a-feer-may", example_sentence: "J'affirme que c'est vrai." },
        { word: "Nier", meaning: "To deny", reading: "nyay", example_sentence: "Il nie toute responsabilité." },
        { word: "Admettre", meaning: "To admit", reading: "ad-metruh", example_sentence: "J'admets mon erreur." },
        { word: "Reconnaître", meaning: "To acknowledge", reading: "ruh-koh-netruh", example_sentence: "Je reconnais mes torts." },
        { word: "Avouer", meaning: "To confess", reading: "a-voo-ay", example_sentence: "Il a avoué la vérité." },

        // Logical Connectors & Structure (36-55)
        { word: "En effet", meaning: "Indeed", reading: "ahn ay-fay", example_sentence: "En effet, vous avez raison." },
        { word: "D'ailleurs", meaning: "Besides / Moreover", reading: "da-yur", example_sentence: "D'ailleurs, j'ai oublié de mentionner..." },
        { word: "Par ailleurs", meaning: "Furthermore", reading: "par a-yur", example_sentence: "Par ailleurs, il faut noter que..." },
        { word: "En outre", meaning: "In addition", reading: "ahn oo-truh", example_sentence: "En outre, ce projet coûte cher." },
        { word: "De plus", meaning: "Moreover", reading: "duh ploo", example_sentence: "De plus, c'est dangereux." },
        { word: "Qui plus est", meaning: "What's more", reading: "kee ploo ay", example_sentence: "Qui plus est, c'est illégal." },
        { word: "Néanmoins", meaning: "Nevertheless", reading: "nay-ahn-mwa", example_sentence: "Néanmoins, je comprends votre point." },
        { word: "Toutefois", meaning: "However", reading: "toot-fwa", example_sentence: "Toutefois, il y a un problème." },
        { word: "Cependant", meaning: "However", reading: "suh-pahn-dah", example_sentence: "Cependant, ce n'est pas suffisant." },
        { word: "Pourtant", meaning: "Yet / Nevertheless", reading: "poor-tah", example_sentence: "Pourtant, il a échoué." },
        { word: "Malgré", meaning: "Despite", reading: "mal-gray", example_sentence: "Malgré ses efforts, il a perdu." },
        { word: "Bien que", meaning: "Although", reading: "byah kuh", example_sentence: "Bien qu'il soit tard, continuons." },
        { word: "Quoique", meaning: "Although", reading: "kwa-kuh", example_sentence: "Quoique difficile, c'est possible." },
        { word: "Tandis que", meaning: "Whereas / While", reading: "tahn-dee kuh", example_sentence: "Tandis que lui dort, je travaille." },
        { word: "Alors que", meaning: "While / Whereas", reading: "a-lor kuh", example_sentence: "Alors qu'il pleut, elle sort." },
        { word: "Étant donné que", meaning: "Given that", reading: "ay-tah doh-nay kuh", example_sentence: "Étant donné que c'est urgent..." },
        { word: "Vu que", meaning: "Seeing that", reading: "voo kuh", example_sentence: "Vu que tu es là, aide-moi." },
        { word: "Puisque", meaning: "Since", reading: "pwees-kuh", example_sentence: "Puisque tu insistes, d'accord." },
        { word: "Parce que", meaning: "Because", reading: "par-suh kuh", example_sentence: "Parce que c'est important." },
        { word: "Car", meaning: "For / Because", reading: "kar", example_sentence: "Je refuse, car c'est injuste." },

        // Consequence & Result (56-70)
        { word: "Par conséquent", meaning: "Consequently", reading: "par kohn-say-kah", example_sentence: "Par conséquent, nous devons agir." },
        { word: "Donc", meaning: "Therefore", reading: "dohnk", example_sentence: "Je pense, donc je suis." },
        { word: "Ainsi", meaning: "Thus", reading: "an-see", example_sentence: "Ainsi, nous avons réussi." },
        { word: "De ce fait", meaning: "As a result", reading: "duh suh fay", example_sentence: "De ce fait, le projet est annulé." },
        { word: "C'est pourquoi", meaning: "That's why", reading: "say poor-kwa", example_sentence: "C'est pourquoi j'ai démissionné." },
        { word: "D'où", meaning: "Hence / From which", reading: "doo", example_sentence: "D'où ma décision de partir." },
        { word: "Si bien que", meaning: "So that", reading: "see byah kuh", example_sentence: "Il a plu, si bien que la route est fermée." },
        { word: "De sorte que", meaning: "So that", reading: "duh sort kuh", example_sentence: "Parlez fort, de sorte que tous entendent." },
        { word: "Au point que", meaning: "To the point that", reading: "oh pwa kuh", example_sentence: "Il est fatigué au point qu'il s'endort." },
        { word: "Tellement... que", meaning: "So... that", reading: "tel-mah... kuh", example_sentence: "Il fait tellement froid que je gèle." },
        { word: "Tel que", meaning: "Such as", reading: "tel kuh", example_sentence: "Des fruits tels que les pommes." },
        { word: "Comme", meaning: "As / Like", reading: "kohm", example_sentence: "Comme vous le savez..." },
        { word: "À savoir", meaning: "Namely", reading: "a sa-vwahr", example_sentence: "Trois personnes, à savoir Paul, Marie et Jean." },
        { word: "C'est-à-dire", meaning: "That is to say", reading: "say-ta-deer", example_sentence: "Demain, c'est-à-dire mardi." },
        { word: "Autrement dit", meaning: "In other words", reading: "oh-truh-mah dee", example_sentence: "Autrement dit, c'est impossible." },

        // Hypothesis & Condition (71-85)
        { word: "Supposons que", meaning: "Let's suppose that", reading: "soo-poh-zoh kuh", example_sentence: "Supposons que vous ayez raison." },
        { word: "Admettons que", meaning: "Let's admit that", reading: "ad-meh-toh kuh", example_sentence: "Admettons que ce soit vrai." },
        { word: "À condition que", meaning: "On condition that", reading: "a kohn-dee-syoh kuh", example_sentence: "J'accepte, à condition que tu viennes." },
        { word: "Pourvu que", meaning: "Provided that", reading: "poor-voo kuh", example_sentence: "Pourvu qu'il fasse beau demain." },
        { word: "À moins que", meaning: "Unless", reading: "a mwa kuh", example_sentence: "À moins qu'il ne pleuve, on sort." },
        { word: "En cas de", meaning: "In case of", reading: "ahn ka duh", example_sentence: "En cas de problème, appelez-moi." },
        { word: "Au cas où", meaning: "In case", reading: "oh ka oo", example_sentence: "Au cas où tu aurais besoin d'aide." },
        { word: "Dans l'hypothèse où", meaning: "In the event that", reading: "dah lee-poh-tez oo", example_sentence: "Dans l'hypothèse où il refuserait..." },
        { word: "Même si", meaning: "Even if", reading: "mem see", example_sentence: "Même si c'est difficile, j'essaie." },
        { word: "Sauf si", meaning: "Unless", reading: "sohf see", example_sentence: "Sauf si tu changes d'avis." },
        { word: "Sinon", meaning: "Otherwise", reading: "see-noh", example_sentence: "Dépêche-toi, sinon tu seras en retard." },
        { word: "Faute de", meaning: "For lack of", reading: "foht duh", example_sentence: "Faute de temps, j'ai abandonné." },
        { word: "Grâce à", meaning: "Thanks to", reading: "grahs a", example_sentence: "Grâce à vous, j'ai réussi." },
        { word: "À cause de", meaning: "Because of", reading: "a kohz duh", example_sentence: "À cause de la pluie, on reste." },
        { word: "En raison de", meaning: "Due to", reading: "ahn ray-zoh duh", example_sentence: "En raison du mauvais temps..." },

        // Advanced Expressions (86-100)
        { word: "Quant à", meaning: "As for", reading: "kah ta", example_sentence: "Quant à moi, je pars." },
        { word: "Pour ce qui est de", meaning: "As far as... is concerned", reading: "poor suh kee ay duh", example_sentence: "Pour ce qui est de l'argent, on verra." },
        { word: "En ce qui concerne", meaning: "Regarding", reading: "ahn suh kee kohn-sern", example_sentence: "En ce qui concerne votre demande..." },
        { word: "À l'égard de", meaning: "With regard to", reading: "a lay-gar duh", example_sentence: "À l'égard de cette question..." },
        { word: "Vis-à-vis de", meaning: "Vis-à-vis / Regarding", reading: "vee-za-vee duh", example_sentence: "Vis-à-vis de lui, soyez prudent." },
        { word: "Au sujet de", meaning: "About / Concerning", reading: "oh soo-zhay duh", example_sentence: "Au sujet de notre conversation..." },
        { word: "À propos de", meaning: "About / Regarding", reading: "a proh-poh duh", example_sentence: "À propos de ton projet..." },
        { word: "Concernant", meaning: "Concerning", reading: "kohn-ser-nah", example_sentence: "Concernant votre email..." },
        { word: "Relativement à", meaning: "Relative to", reading: "ruh-la-teev-mah a", example_sentence: "Relativement à ce problème..." },
        { word: "Par rapport à", meaning: "Compared to", reading: "par ra-por a", example_sentence: "Par rapport à l'année dernière..." },
        { word: "Contrairement à", meaning: "Contrary to", reading: "kohn-trer-mah a", example_sentence: "Contrairement à ce qu'on pense..." },
        { word: "Conformément à", meaning: "In accordance with", reading: "kohn-for-may-mah a", example_sentence: "Conformément à la loi..." },
        { word: "Suite à", meaning: "Following", reading: "sweet a", example_sentence: "Suite à votre demande..." },
        { word: "Lors de", meaning: "During", reading: "lor duh", example_sentence: "Lors de la réunion..." },
        { word: "Au cours de", meaning: "During / In the course of", reading: "oh koor duh", example_sentence: "Au cours de ma carrière..." }
    ],
    liarGameData: {
        culturalTraps: [
            {
                trap: "In French debates, raising your voice shows passion and is appreciated.",
                correctVersion: "French debates value eloquence and logic over volume. Shouting is seen as losing control, not passion.",
                explanation: "French intellectual culture prizes measured, articulate argumentation. Emotional outbursts undermine credibility."
            },
            {
                trap: "'Argument' in French means the same as in English (a fight or disagreement).",
                correctVersion: "'Argument' in French means 'reasoning' or 'point in a debate'. A fight is 'une dispute' or 'une querelle'.",
                explanation: "This false friend causes confusion. French 'argument' is neutral and intellectual, not emotional."
            },
            {
                trap: "Using 'Parce que' and 'Car' interchangeably is always correct in French.",
                correctVersion: "'Parce que' answers 'why' questions. 'Car' introduces explanations and cannot start a sentence answering 'Pourquoi?'",
                explanation: "While both mean 'because', their usage differs. 'Car' is more formal and cannot directly answer questions."
            }
        ]
    }
};

// Save to file
const outputPath = path.join(__dirname, '../firestore_data/french_b1_m21.json');
fs.writeFileSync(outputPath, JSON.stringify(module21, null, 2));

console.log('✅ French B1 Module 21 generated successfully!');
console.log(`📁 Saved to: ${outputPath}`);
console.log(`📊 Total words: ${module21.vocabularyItems.length}`);
console.log(`🎮 Cultural traps: ${module21.liarGameData.culturalTraps.length}`);
