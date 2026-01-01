const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Replacement word pools for each level
const a1ReplacementWords = [
    { word: "Boisson", meaning: "Drink / Beverage", reading: "bwa-soh", example_sentence: "Une boisson chaude." },
    { word: "Liquide", meaning: "Liquid", reading: "lee-keed", example_sentence: "Un liquide transparent." },
    { word: "Baguette", meaning: "Baguette / French bread", reading: "ba-get", example_sentence: "Acheter une baguette." },
    { word: "Pièce", meaning: "Room / Piece", reading: "pyes", example_sentence: "Une grande pièce." },
    { word: "Suite", meaning: "Suite / Continuation", reading: "sweet", example_sentence: "Une suite d'hôtel." },
    { word: "Docteur", meaning: "Doctor", reading: "dok-tur", example_sentence: "Consulter un docteur." },
    { word: "Clinique", meaning: "Clinic", reading: "klee-neek", example_sentence: "Aller à la clinique." },
    { word: "Monnaie", meaning: "Money / Change", reading: "moh-nay", example_sentence: "Avoir de la monnaie." },
    { word: "Métro", meaning: "Subway / Metro", reading: "may-troh", example_sentence: "Prendre le métro." },
    { word: "Tram", meaning: "Tram", reading: "tram", example_sentence: "Le tram arrive." },
    { word: "Voiture", meaning: "Car", reading: "vwa-toor", example_sentence: "Une voiture rouge." },
    { word: "Auberge", meaning: "Inn / Hostel", reading: "oh-berzh", example_sentence: "Dormir à l'auberge." },
    { word: "Logement", meaning: "Accommodation", reading: "lohzh-mah", example_sentence: "Chercher un logement." },
    { word: "Appartement", meaning: "Apartment", reading: "a-par-tuh-mah", example_sentence: "Louer un appartement." },
    { word: "Exister", meaning: "To exist", reading: "eg-zees-tay", example_sentence: "Cela existe." },
    { word: "Parler", meaning: "To speak", reading: "par-lay", example_sentence: "Parler français." },
    { word: "Capable", meaning: "Capable / Able", reading: "ka-pa-bluh", example_sentence: "Être capable." },
    { word: "Connaître", meaning: "To know (person/place)", reading: "koh-netruh", example_sentence: "Connaître Paris." },
    { word: "Énorme", meaning: "Enormous / Huge", reading: "ay-norm", example_sentence: "Un énorme bâtiment." },
    { word: "Minuscule", meaning: "Tiny", reading: "mee-noos-kool", example_sentence: "Un minuscule insecte." },
    { word: "Excellent", meaning: "Excellent", reading: "ek-seh-lah", example_sentence: "Un excellent repas." },
    { word: "Terrible", meaning: "Terrible", reading: "teh-ree-bluh", example_sentence: "Un temps terrible." },
    { word: "Joli", meaning: "Pretty", reading: "zhoh-lee", example_sentence: "Une jolie fleur." },
    { word: "Tiède", meaning: "Lukewarm", reading: "tyehd", example_sentence: "De l'eau tiède." },
    { word: "Glacé", meaning: "Icy / Frozen", reading: "gla-say", example_sentence: "Un café glacé." },
    { word: "Récent", meaning: "Recent", reading: "ray-sah", example_sentence: "Une nouvelle récente." },
    { word: "Ancien", meaning: "Old / Ancient", reading: "ahn-sya", example_sentence: "Un bâtiment ancien." },
    { word: "Jeune", meaning: "Young", reading: "zhuhn", example_sentence: "Un jeune homme." },
    { word: "Vieux", meaning: "Old", reading: "vyuh", example_sentence: "Un vieux livre." },
    { word: "Rapide", meaning: "Fast / Quick", reading: "ra-peed", example_sentence: "Un train rapide." },
    { word: "Lent", meaning: "Slow", reading: "lah", example_sentence: "Une voiture lente." },
    { word: "Fort", meaning: "Strong", reading: "for", example_sentence: "Un homme fort." },
    { word: "Faible", meaning: "Weak", reading: "feh-bluh", example_sentence: "Une lumière faible." },
    { word: "Riche", meaning: "Rich", reading: "reesh", example_sentence: "Une famille riche." },
    { word: "Pauvre", meaning: "Poor", reading: "poh-vruh", example_sentence: "Un quartier pauvre." },
    { word: "Plein", meaning: "Full", reading: "pla", example_sentence: "Un verre plein." },
    { word: "Vide", meaning: "Empty", reading: "veed", example_sentence: "Une bouteille vide." },
    { word: "Propre", meaning: "Clean", reading: "proh-pruh", example_sentence: "Une maison propre." },
    { word: "Sale", meaning: "Dirty", reading: "sal", example_sentence: "Des mains sales." },
    { word: "Facile", meaning: "Easy", reading: "fa-seel", example_sentence: "Un exercice facile." },
    { word: "Difficile", meaning: "Difficult", reading: "dee-fee-seel", example_sentence: "Un problème difficile." },
    { word: "Simple", meaning: "Simple", reading: "sam-pluh", example_sentence: "Une question simple." },
    { word: "Compliqué", meaning: "Complicated", reading: "kohm-plee-kay", example_sentence: "Une situation compliquée." },
    { word: "Heureux", meaning: "Happy", reading: "uh-ruh", example_sentence: "Un enfant heureux." },
    { word: "Triste", meaning: "Sad", reading: "treest", example_sentence: "Une histoire triste." },
    { word: "Content", meaning: "Happy / Pleased", reading: "kohn-tah", example_sentence: "Être content." },
    { word: "Fâché", meaning: "Angry", reading: "fa-shay", example_sentence: "Un client fâché." },
    { word: "Calme", meaning: "Calm", reading: "kalm", example_sentence: "Un endroit calme." },
    { word: "Bruyant", meaning: "Noisy", reading: "brwee-yah", example_sentence: "Un restaurant bruyant." },
    { word: "Silencieux", meaning: "Silent / Quiet", reading: "see-lahn-syuh", example_sentence: "Un moteur silencieux." }
];

const a2ReplacementWords = [
    { word: "Voyage", meaning: "Trip / Journey", reading: "vwa-yazh", example_sentence: "Un long voyage." },
    { word: "Trajet", meaning: "Journey / Route", reading: "tra-zhay", example_sentence: "Le trajet en train." },
    { word: "Périple", meaning: "Journey / Odyssey", reading: "pay-ree-pluh", example_sentence: "Un périple aventureux." },
    { word: "Cuisine", meaning: "Cooking / Kitchen", reading: "kwee-zeen", example_sentence: "La cuisine française." },
    { word: "Gastronomie", meaning: "Gastronomy", reading: "gas-troh-noh-mee", example_sentence: "La gastronomie locale." },
    { word: "Repas", meaning: "Meal", reading: "ruh-pa", example_sentence: "Un bon repas." },
    { word: "Déjeuner", meaning: "Lunch", reading: "day-zhuh-nay", example_sentence: "Le déjeuner de midi." },
    { word: "Dîner", meaning: "Dinner", reading: "dee-nay", example_sentence: "Le dîner du soir." },
    { word: "Souper", meaning: "Supper", reading: "soo-pay", example_sentence: "Un léger souper." },
    { word: "Collation", meaning: "Snack", reading: "koh-la-syoh", example_sentence: "Prendre une collation." },
    { word: "Résidence", meaning: "Residence", reading: "ray-zee-dahns", example_sentence: "Une résidence secondaire." },
    { word: "Domicile", meaning: "Home / Residence", reading: "doh-mee-seel", example_sentence: "Le domicile familial." },
    { word: "Habitation", meaning: "Dwelling / Housing", reading: "a-bee-ta-syoh", example_sentence: "Une habitation moderne." },
    { word: "Demeure", meaning: "Dwelling / Abode", reading: "duh-mur", example_sentence: "Une belle demeure." },
    { word: "Foyer", meaning: "Home / Hearth", reading: "fwa-yay", example_sentence: "Rentrer au foyer." },
    { word: "Parcours", meaning: "Route / Course", reading: "par-koor", example_sentence: "Le parcours professionnel." },
    { word: "Itinéraire", meaning: "Itinerary / Route", reading: "ee-tee-nay-rer", example_sentence: "L'itinéraire touristique." },
    { word: "Destination", meaning: "Destination", reading: "des-tee-na-syoh", example_sentence: "La destination finale." },
    { word: "Excursion", meaning: "Excursion / Trip", reading: "eks-koor-syoh", example_sentence: "Une excursion d'une journée." },
    { word: "Randonnée", meaning: "Hike / Trek", reading: "rahn-doh-nay", example_sentence: "Une randonnée en montagne." },
    { word: "Promenade", meaning: "Walk / Stroll", reading: "proh-muh-nad", example_sentence: "Une promenade au parc." },
    { word: "Balade", meaning: "Walk / Ride", reading: "ba-lad", example_sentence: "Une balade en vélo." },
    { word: "Circuit", meaning: "Circuit / Tour", reading: "seer-kwee", example_sentence: "Un circuit touristique." },
    { word: "Croisière", meaning: "Cruise", reading: "krwa-zyer", example_sentence: "Une croisière en Méditerranée." },
    { word: "Séjour", meaning: "Stay", reading: "say-zhoor", example_sentence: "Un séjour agréable." },
    { word: "Hébergement", meaning: "Accommodation", reading: "ay-berzh-mah", example_sentence: "L'hébergement touristique." },
    { word: "Pension", meaning: "Boarding house / Pension", reading: "pahn-syoh", example_sentence: "Une pension complète." },
    { word: "Gîte", meaning: "Holiday cottage", reading: "zheet", example_sentence: "Louer un gîte rural." },
    { word: "Refuge", meaning: "Shelter / Refuge", reading: "ruh-foozh", example_sentence: "Un refuge de montagne." },
    { word: "Campement", meaning: "Camp / Campsite", reading: "kahmp-mah", example_sentence: "Installer un campement." }
];

const b1ReplacementWords = [
    { word: "Conceptualiser", meaning: "To conceptualize", reading: "kohn-sep-too-a-lee-zay", example_sentence: "Conceptualiser une idée." },
    { word: "Théoriser", meaning: "To theorize", reading: "tay-oh-ree-zay", example_sentence: "Théoriser sur un sujet." },
    { word: "Analyser", meaning: "To analyze", reading: "a-na-lee-zay", example_sentence: "Analyser les données." },
    { word: "Synthétiser", meaning: "To synthesize", reading: "san-tay-tee-zay", example_sentence: "Synthétiser l'information." },
    { word: "Interpréter", meaning: "To interpret", reading: "an-ter-pray-tay", example_sentence: "Interpréter un texte." },
    { word: "Évaluer", meaning: "To evaluate", reading: "ay-va-loo-ay", example_sentence: "Évaluer les résultats." },
    { word: "Critiquer", meaning: "To criticize", reading: "kree-tee-kay", example_sentence: "Critiquer une œuvre." },
    { word: "Argumenter", meaning: "To argue", reading: "ar-goo-mahn-tay", example_sentence: "Argumenter sa position." },
    { word: "Débattre", meaning: "To debate", reading: "day-ba-truh", example_sentence: "Débattre d'un sujet." },
    { word: "Discuter", meaning: "To discuss", reading: "dees-koo-tay", example_sentence: "Discuter philosophie." },
    { word: "Réfléchir", meaning: "To reflect / Think", reading: "ray-flay-sheer", example_sentence: "Réfléchir profondément." },
    { word: "Méditer", meaning: "To meditate", reading: "may-dee-tay", example_sentence: "Méditer sur la vie." },
    { word: "Contempler", meaning: "To contemplate", reading: "kohn-tahm-play", example_sentence: "Contempler l'univers." },
    { word: "Philosopher", meaning: "To philosophize", reading: "fee-loh-zoh-fay", example_sentence: "Philosopher sur l'existence." },
    { word: "Raisonner", meaning: "To reason", reading: "ray-zoh-nay", example_sentence: "Raisonner logiquement." },
    { word: "Déduire", meaning: "To deduce", reading: "day-dweer", example_sentence: "Déduire une conclusion." },
    { word: "Induire", meaning: "To induce", reading: "an-dweer", example_sentence: "Induire une hypothèse." },
    { word: "Inférer", meaning: "To infer", reading: "an-fay-ray", example_sentence: "Inférer des résultats." },
    { word: "Postuler", meaning: "To postulate", reading: "pohs-too-lay", example_sentence: "Postuler une théorie." },
    { word: "Hypothétiser", meaning: "To hypothesize", reading: "ee-poh-tay-tee-zay", example_sentence: "Hypothétiser sur les causes." },
    { word: "Spéculer", meaning: "To speculate", reading: "spay-koo-lay", example_sentence: "Spéculer sur l'avenir." },
    { word: "Conjecturer", meaning: "To conjecture", reading: "kohn-zhek-too-ray", example_sentence: "Conjecturer une solution." },
    { word: "Présumer", meaning: "To presume", reading: "pray-zoo-may", example_sentence: "Présumer l'innocence." },
    { word: "Supposer", meaning: "To suppose", reading: "soo-poh-zay", example_sentence: "Supposer que c'est vrai." },
    { word: "Assumer", meaning: "To assume", reading: "a-soo-may", example_sentence: "Assumer ses responsabilités." },
    { word: "Présupposer", meaning: "To presuppose", reading: "pray-soo-poh-zay", example_sentence: "Présupposer une condition." },
    { word: "Impliquer", meaning: "To imply", reading: "am-plee-kay", example_sentence: "Cela implique des conséquences." },
    { word: "Suggérer", meaning: "To suggest", reading: "soo-zhay-ray", example_sentence: "Suggérer une alternative." },
    { word: "Proposer", meaning: "To propose", reading: "proh-poh-zay", example_sentence: "Proposer une solution." },
    { word: "Recommander", meaning: "To recommend", reading: "ruh-koh-mahn-day", example_sentence: "Recommander une approche." }
];

async function cleanupFrenchCurriculum() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🧹 FRENCH CURRICULUM FULL CLEANUP');
    console.log('═══════════════════════════════════════════════════════\n');

    // Load the cleanup report
    const reportPath = path.join(__dirname, '../firestore_data/french_cleanup_report.json');
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

    console.log('📊 Cleanup Summary:');
    console.log(`   - Within-A1 duplicates: ${report.withinA1.length}`);
    console.log(`   - Within-A2 duplicates: ${report.withinA2.length}`);
    console.log(`   - Within-B1 duplicates: ${report.withinB1.length}`);
    console.log(`   - Total to fix: ${report.withinA1.length + report.withinA2.length + report.withinB1.length}\n`);

    const allModules = [];

    // Fetch all modules
    console.log('📥 Phase 1: Downloading all modules from Firebase...\n');

    // A1
    for (let i = 1; i <= 10; i++) {
        const moduleId = `fr_a1_m${i}`;
        const doc = await db.collection('languages').doc('french')
            .collection('levels').doc('a1')
            .collection('modules').doc(moduleId).get();

        if (doc.exists) {
            allModules.push({
                id: moduleId,
                level: 'A1',
                order: i,
                data: doc.data()
            });
            console.log(`   ✅ Downloaded ${moduleId}`);
        }
    }

    // A2
    for (let i = 11; i <= 20; i++) {
        const moduleId = `fr_a2_m${i}`;
        const doc = await db.collection('languages').doc('french')
            .collection('levels').doc('a2')
            .collection('modules').doc(moduleId).get();

        if (doc.exists) {
            allModules.push({
                id: moduleId,
                level: 'A2',
                order: i,
                data: doc.data()
            });
            console.log(`   ✅ Downloaded ${moduleId}`);
        }
    }

    // B1
    for (let i = 21; i <= 30; i++) {
        const moduleId = `fr_b1_m${i}`;
        const doc = await db.collection('languages').doc('french')
            .collection('levels').doc('b1')
            .collection('modules').doc(moduleId).get();

        if (doc.exists) {
            allModules.push({
                id: moduleId,
                level: 'B1',
                order: i,
                data: doc.data()
            });
            console.log(`   ✅ Downloaded ${moduleId}`);
        }
    }

    console.log(`\n✅ Downloaded ${allModules.length} modules\n`);

    // Phase 2: Fix fr_a1_m1 word count
    console.log('🔧 Phase 2: Fixing fr_a1_m1 word count...\n');
    const m1 = allModules.find(m => m.id === 'fr_a1_m1');
    if (m1 && m1.data.vocabularyItems.length > 100) {
        console.log(`   Before: ${m1.data.vocabularyItems.length} words`);
        m1.data.vocabularyItems = m1.data.vocabularyItems.slice(0, 100);
        m1.data.count = 100;
        console.log(`   After: ${m1.data.vocabularyItems.length} words ✅\n`);
    }

    // Phase 3: Replace duplicates
    console.log('🔧 Phase 3: Replacing within-level duplicates...\n');

    let replacementIndex = {
        a1: 0,
        a2: 0,
        b1: 0
    };

    let replacedCount = 0;

    // Helper function to replace duplicate
    function replaceDuplicate(module, wordIndex, level) {
        let replacementPool, poolKey;

        if (level === 'A1') {
            replacementPool = a1ReplacementWords;
            poolKey = 'a1';
        } else if (level === 'A2') {
            replacementPool = a2ReplacementWords;
            poolKey = 'a2';
        } else {
            replacementPool = b1ReplacementWords;
            poolKey = 'b1';
        }

        if (replacementIndex[poolKey] < replacementPool.length) {
            const replacement = replacementPool[replacementIndex[poolKey]];
            module.data.vocabularyItems[wordIndex] = replacement;
            replacementIndex[poolKey]++;
            replacedCount++;
            return replacement.word;
        }
        return null;
    }

    // Replace A1 duplicates
    console.log('   Replacing A1 duplicates...');
    report.withinA1.forEach(dup => {
        // Keep first occurrence, replace others
        dup.locations.slice(1).forEach(loc => {
            const module = allModules.find(m => m.id === loc.module);
            if (module) {
                const oldWord = module.data.vocabularyItems[loc.index - 1].word;
                const newWord = replaceDuplicate(module, loc.index - 1, 'A1');
                if (newWord) {
                    console.log(`      ${loc.module} [#${loc.index}]: "${oldWord}" → "${newWord}"`);
                }
            }
        });
    });

    // Replace A2 duplicates
    console.log('\n   Replacing A2 duplicates...');
    report.withinA2.forEach(dup => {
        dup.locations.slice(1).forEach(loc => {
            const module = allModules.find(m => m.id === loc.module);
            if (module) {
                const oldWord = module.data.vocabularyItems[loc.index - 1].word;
                const newWord = replaceDuplicate(module, loc.index - 1, 'A2');
                if (newWord) {
                    console.log(`      ${loc.module} [#${loc.index}]: "${oldWord}" → "${newWord}"`);
                }
            }
        });
    });

    // Replace B1 duplicates
    console.log('\n   Replacing B1 duplicates...');
    report.withinB1.forEach(dup => {
        dup.locations.slice(1).forEach(loc => {
            const module = allModules.find(m => m.id === loc.module);
            if (module) {
                const oldWord = module.data.vocabularyItems[loc.index - 1].word;
                const newWord = replaceDuplicate(module, loc.index - 1, 'B1');
                if (newWord) {
                    console.log(`      ${loc.module} [#${loc.index}]: "${oldWord}" → "${newWord}"`);
                }
            }
        });
    });

    console.log(`\n✅ Replaced ${replacedCount} duplicate words\n`);

    // Phase 4: Upload cleaned modules
    console.log('📤 Phase 4: Uploading cleaned modules to Firebase...\n');

    for (const module of allModules) {
        const levelMap = { 'A1': 'a1', 'A2': 'a2', 'B1': 'b1' };
        const levelId = levelMap[module.level];

        const docRef = db.collection('languages').doc('french')
            .collection('levels').doc(levelId)
            .collection('modules').doc(module.id);

        // CRITICAL: Preserve Liar Game data
        const uploadData = {
            ...module.data,
            vocabularyItems: module.data.vocabularyItems,
            liarGameData: module.data.liarGameData || { culturalTraps: [] }
        };

        await docRef.set(uploadData, { merge: false });
        console.log(`   ✅ Uploaded ${module.id} (${uploadData.vocabularyItems.length} words, ${uploadData.liarGameData.culturalTraps.length} traps)`);
    }

    console.log('\n✅ All modules uploaded successfully!\n');

    // Phase 5: Show tail proof
    console.log('═══════════════════════════════════════════════════════');
    console.log('👁️  TAIL PROOF - Last 5 Words');
    console.log('═══════════════════════════════════════════════════════\n');

    const tailModules = [
        { id: 'fr_a1_m10', name: 'A1 Module 10' },
        { id: 'fr_a2_m20', name: 'A2 Module 20' },
        { id: 'fr_b1_m30', name: 'B1 Module 30' }
    ];

    tailModules.forEach(tm => {
        const module = allModules.find(m => m.id === tm.id);
        if (module) {
            const words = module.data.vocabularyItems;
            const last5 = words.slice(-5);
            console.log(`${tm.name} (${tm.id}):`);
            last5.forEach((item, idx) => {
                console.log(`   ${words.length - 4 + idx}. ${item.word} - ${item.meaning}`);
            });
            console.log('');
        }
    });

    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ CLEANUP COMPLETE!');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\n🔍 Now run: node scripts/audit_french_curriculum.js');
    console.log('   to verify the final results.\n');
}

cleanupFrenchCurriculum()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
