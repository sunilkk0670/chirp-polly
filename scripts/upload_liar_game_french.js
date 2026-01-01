const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const liarGameData = {
    trap: "Common cultural mistake",
    correctVersion: "The correct cultural practice",
    explanation: "Why this matters culturally"
};

async function uploadLiarGameData() {
    console.log('🎮 Starting Liar Game data upload...\n');

    const modules = [
        // A1 Modules
        {
            level: 'a1', id: 'fr_a1_m1', traps: [
                { trap: "'Bonjour' is informal and used only with close friends.", correctVersion: "'Bonjour' is actually formal and polite, suitable for anyone. Use 'Salut' for close friends.", explanation: "In French, 'Bonjour' is always appropriate in formal settings, unlike the informal 'Salut'." },
                { trap: "'S'il vous plaît' is used after receiving help.", correctVersion: "'S'il vous plaît' is used when asking for something. Use 'Merci' after receiving help.", explanation: "These phrases are often confused. 'Please' comes before the request, 'Thank you' comes after." },
                { trap: "In France, you should use 'Tu' with everyone to be friendly.", correctVersion: "You should use 'Vous' with strangers and in formal situations. 'Tu' is reserved for friends and family.", explanation: "Using 'Tu' with a stranger in France is considered rude and overly familiar." }
            ]
        },
        {
            level: 'a1', id: 'fr_a1_m2', traps: [
                { trap: "French people always eat dinner at 6 PM like in America.", correctVersion: "French dinner typically starts at 8 PM or later. Eating at 6 PM is considered very early.", explanation: "Meal times in France are later than in many English-speaking countries." },
                { trap: "'Pain' means 'pain' (suffering) in French.", correctVersion: "'Pain' means 'bread' in French. It's a staple of every French meal.", explanation: "This is a classic false friend between English and French." },
                { trap: "You should say 'Bon appétit' before starting to eat alone.", correctVersion: "'Bon appétit' is said when eating with others. When alone, you simply start eating.", explanation: "This phrase is a social courtesy meant for shared meals." }
            ]
        },
        {
            level: 'a1', id: 'fr_a1_m3', traps: [
                { trap: "In France, you can drink tap water but it's not safe.", correctVersion: "French tap water ('l'eau du robinet') is perfectly safe and high quality. Many French people prefer it to bottled water.", explanation: "France has excellent water quality standards. Asking for tap water in restaurants is normal." },
                { trap: "'Assiette' means 'asset' in French.", correctVersion: "'Assiette' means 'plate' in French. It comes from the verb 'asseoir' (to sit).", explanation: "Another false friend. The financial term 'asset' is 'actif' in French." },
                { trap: "You should always finish everything on your plate in France to be polite.", correctVersion: "While appreciated, leaving a small amount is acceptable. Forcing yourself to overeat is not expected.", explanation: "French dining values quality over quantity. It's fine to leave food if you're full." }
            ]
        },
        {
            level: 'a1', id: 'fr_a1_m4', traps: [
                { trap: "French people consider it rude to make eye contact while toasting.", correctVersion: "In France, you MUST make eye contact while toasting ('Santé!'). Not doing so is considered bad luck.", explanation: "This is a strong cultural tradition. Avoiding eye contact during a toast is seen as disrespectful." },
                { trap: "'Coin' in French means the same as in English (money).", correctVersion: "'Coin' means 'corner' in French. Money is 'argent' or 'monnaie'.", explanation: "A common false friend. 'Au coin de la rue' means 'at the corner of the street'." },
                { trap: "You can wear shorts to a nice French restaurant.", correctVersion: "Shorts are generally not appropriate for nice restaurants in France. Smart casual is the minimum.", explanation: "French dining culture values proper attire. Dress codes are taken seriously." }
            ]
        },
        {
            level: 'a1', id: 'fr_a1_m5', traps: [
                { trap: "'Actuellement' means 'actually' in French.", correctVersion: "'Actuellement' means 'currently' or 'at present'. 'Actually' is 'en fait' or 'vraiment'.", explanation: "This is one of the most famous false friends between English and French." },
                { trap: "French people love when you speak French with an exaggerated accent.", correctVersion: "French people appreciate genuine attempts to speak French, but mocking accents is offensive.", explanation: "Effort is valued, but stereotypical 'Pepe Le Pew' accents are considered disrespectful." },
                { trap: "You should arrive exactly on time to a French dinner party.", correctVersion: "Arriving 15-30 minutes late to a dinner party is expected and polite. It gives the host time to prepare.", explanation: "This is called 'le quart d'heure de politesse' (the polite quarter hour)." }
            ]
        },
        {
            level: 'a1', id: 'fr_a1_m6', traps: [
                { trap: "In France, Sunday is a regular shopping day like any other.", correctVersion: "Most shops in France are closed on Sundays. Only tourist areas and some bakeries stay open.", explanation: "Sunday rest ('le repos dominical') is protected by law in France." },
                { trap: "'Librairie' is where you go to borrow books for free.", correctVersion: "'Librairie' is a bookstore where you buy books. A library is 'bibliothèque'.", explanation: "A very common false friend. Libraries and bookstores are completely different in French." },
                { trap: "French people find it charming when you call them 'mon ami' upon first meeting.", correctVersion: "'Mon ami' is reserved for actual friends. Use 'Monsieur/Madame' with strangers.", explanation: "Overfamiliarity is considered presumptuous in French culture." }
            ]
        },
        {
            level: 'a1', id: 'fr_a1_m7', traps: [
                { trap: "You should tip 20% at French restaurants like in America.", correctVersion: "Service is included ('service compris') in France. A small tip (1-2 euros) for excellent service is optional.", explanation: "French servers receive full wages. Tipping culture is very different from the US." },
                { trap: "'Excité' means 'excited' in French.", correctVersion: "'Excité' has a sexual connotation in French. Use 'enthousiaste' or 'impatient' instead.", explanation: "This false friend can lead to very embarrassing situations!" },
                { trap: "French people appreciate when you try to bargain in shops.", correctVersion: "Bargaining is not part of French culture except at flea markets. Prices are fixed in regular shops.", explanation: "Attempting to negotiate in a boutique or supermarket would be seen as very strange." }
            ]
        },
        {
            level: 'a1', id: 'fr_a1_m8', traps: [
                { trap: "In France, you should call your teacher by their first name to be friendly.", correctVersion: "Always use 'Monsieur' or 'Madame' with teachers. First names are only used with explicit permission.", explanation: "French educational culture maintains formal distance between students and teachers." },
                { trap: "'Blesser' means 'to bless' in French.", correctVersion: "'Blesser' means 'to injure' or 'to hurt'. 'To bless' is 'bénir'.", explanation: "Another dangerous false friend. The words look similar but have opposite meanings." },
                { trap: "French people love surprise visits from friends.", correctVersion: "Always call before visiting someone in France. Surprise visits are considered intrusive.", explanation: "Privacy is highly valued. Unannounced visits are seen as disrespectful of someone's time." }
            ]
        },
        {
            level: 'a1', id: 'fr_a1_m9', traps: [
                { trap: "You can wear your shoes inside a French person's home.", correctVersion: "While not universal, many French people prefer you remove shoes indoors. Always ask or observe the host.", explanation: "This varies by region and household, but it's polite to offer to remove shoes." },
                { trap: "'Préservatif' means 'preservative' in French.", correctVersion: "'Préservatif' means 'condom'. Food preservative is 'conservateur'.", explanation: "This false friend has caused many awkward moments in French grocery stores!" },
                { trap: "French people think it's polite to finish your wine quickly.", correctVersion: "Wine is meant to be savored slowly in France. Drinking quickly is seen as unsophisticated.", explanation: "French wine culture emphasizes appreciation and conversation over consumption speed." }
            ]
        },
        {
            level: 'a1', id: 'fr_a1_m10', traps: [
                { trap: "In France, you should always split the bill equally ('going Dutch').", correctVersion: "While splitting is becoming more common, traditionally the person who invites pays. Discuss beforehand to avoid awkwardness.", explanation: "French dining etiquette has traditional rules, though younger generations are more flexible." },
                { trap: "'Demander' means 'to demand' in French.", correctVersion: "'Demander' means 'to ask'. 'To demand' is 'exiger'.", explanation: "This false friend makes French seem more aggressive than it is. 'Demander' is polite." },
                { trap: "French people love when you compliment their home extensively.", correctVersion: "One or two sincere compliments are appreciated. Excessive praise can seem insincere or make hosts uncomfortable.", explanation: "French culture values modesty. Overdoing compliments can backfire." }
            ]
        },
        // A2 Modules
        {
            level: 'a2', id: 'fr_a2_m11', traps: [
                { trap: "In France, you can board a train without a ticket as long as you pay on board.", correctVersion: "You must always have a valid ticket before boarding. Conductors issue fines, not tickets.", explanation: "French trains (SNCF) require pre-purchased, validated tickets. Fare evasion carries steep penalties." },
                { trap: "'Pharmacie' in France only sells medicine, never general health products.", correctVersion: "French 'Pharmacies' sell medicine, beauty products, and even first-aid supplies. They are a one-stop shop for health.", explanation: "Unlike some countries, French pharmacies (indicated by a green cross) offer a wide range of health and wellness products." },
                { trap: "'Je suis plein' is the correct way to say 'I am full' after a meal.", correctVersion: "'Je suis plein' is a crass expression. Say 'J'ai bien mangé' (I ate well) or 'Je n'ai plus faim' (I'm no longer hungry).", explanation: "This is a classic cultural trap! 'Je suis plein' has an unintentionally crude meaning in French." }
            ]
        },
        {
            level: 'a2', id: 'fr_a2_m12', traps: [
                { trap: "French people do laundry every day like Americans.", correctVersion: "French people typically do laundry once a week. Daily washing is seen as wasteful and unnecessary.", explanation: "French culture emphasizes conservation of resources. Clothes are worn multiple times before washing." },
                { trap: "'Douche' is a rude word in French.", correctVersion: "'Douche' simply means 'shower' in French. It's a normal, everyday word.", explanation: "English speakers often giggle at this word, but it's completely neutral in French." },
                { trap: "You should make your bed immediately upon waking in France.", correctVersion: "Many French people air out their beds before making them, believing it's healthier to let moisture evaporate.", explanation: "This is a common French household practice based on hygiene beliefs." }
            ]
        },
        {
            level: 'a2', id: 'fr_a2_m13', traps: [
                { trap: "French workers are expected to answer work emails on weekends.", correctVersion: "France has a 'right to disconnect' law. Employees cannot be required to check emails outside work hours.", explanation: "Work-life balance is legally protected in France. Weekend emails are generally discouraged." },
                { trap: "'Agenda' means 'agenda' (meeting topics) in French.", correctVersion: "'Agenda' means 'planner' or 'diary' in French. Meeting topics are 'ordre du jour'.", explanation: "Another false friend. An 'agenda' is the physical book where you write appointments." },
                { trap: "French people appreciate when you work through lunch to show dedication.", correctVersion: "Taking a proper lunch break is culturally important in France. Working through lunch is seen as poor work-life balance.", explanation: "The French lunch break is sacred. Even a quick lunch should be at least 30 minutes." }
            ]
        },
        {
            level: 'a2', id: 'fr_a2_m14', traps: [
                { trap: "In France, it's polite to ask someone's salary when you first meet.", correctVersion: "Asking about salary is considered very rude in France. Money is a private topic.", explanation: "French culture is much more private about finances than American culture." },
                { trap: "'Baiser' is a polite way to say 'kiss' in French.", correctVersion: "As a verb, 'baiser' is vulgar. Use 'embrasser' for 'to kiss'. The noun 'un baiser' is fine.", explanation: "This is a critical distinction. The verb form has a very different, crude meaning." },
                { trap: "French people love talking about their accomplishments.", correctVersion: "French culture values modesty. Bragging about achievements is seen as arrogant and off-putting.", explanation: "Self-promotion is much less accepted in France than in Anglo-Saxon cultures." }
            ]
        },
        {
            level: 'a2', id: 'fr_a2_m15', traps: [
                { trap: "You can use your phone during a French movie screening without issue.", correctVersion: "Using phones in French cinemas is strictly forbidden and will get you ejected. Cinema etiquette is taken very seriously.", explanation: "French cinema culture is reverential. Disruptions are not tolerated." },
                { trap: "'Chat' means 'chat' (conversation) in French.", correctVersion: "'Chat' means 'cat' in French. Online chat is 'discussion' or 'tchat'.", explanation: "This false friend is especially confusing in the digital age!" },
                { trap: "French people check social media constantly like Americans.", correctVersion: "While social media use is growing, French people generally use it less frequently and value face-to-face interaction more.", explanation: "French culture still prioritizes in-person connection over digital communication." }
            ]
        },
        {
            level: 'a2', id: 'fr_a2_m16', traps: [
                { trap: "Recycling is optional in France.", correctVersion: "Recycling is mandatory in France. Failure to sort waste properly can result in fines.", explanation: "France has strict environmental laws. Recycling bins are color-coded and must be used correctly." },
                { trap: "'Pollution' is pronounced the same in French and English.", correctVersion: "In French, 'pollution' is pronounced 'poh-loo-syohn' with the stress on the final syllable.", explanation: "French stress patterns are different from English. The final syllable is emphasized." },
                { trap: "French people don't care about climate change.", correctVersion: "France is a leader in climate action. Environmental consciousness is high, especially among younger generations.", explanation: "France hosted the Paris Climate Agreement and takes environmental issues seriously." }
            ]
        },
        {
            level: 'a2', id: 'fr_a2_m17', traps: [
                { trap: "French people always say exactly what they think without filtering.", correctVersion: "While more direct than some cultures, French people still use politeness and diplomacy. Brutal honesty without tact is rude.", explanation: "There's a difference between directness and rudeness. French communication values both honesty and respect." },
                { trap: "'Sensible' means 'sensible' (rational) in French.", correctVersion: "'Sensible' means 'sensitive' in French. 'Sensible' (rational) is 'raisonnable' or 'sensé'.", explanation: "This false friend can lead to serious misunderstandings about someone's character." },
                { trap: "Crying in public is completely unacceptable in France.", correctVersion: "While emotional restraint is valued, showing genuine emotion is understood. Context matters.", explanation: "French culture isn't emotionless, but public displays of emotion are more reserved than in some cultures." }
            ]
        },
        {
            level: 'a2', id: 'fr_a2_m18', traps: [
                { trap: "French museums allow photography everywhere.", correctVersion: "Flash photography is usually forbidden, and some areas prohibit all photos. Always check the rules.", explanation: "Protecting artwork is a priority. Rules vary by museum and exhibition." },
                { trap: "'Exposition' means 'exposition' (explanation) in French.", correctVersion: "'Exposition' means 'exhibition' or 'art show' in French. Explanation is 'explication'.", explanation: "In French, 'exposition' is specifically about displaying art or objects." },
                { trap: "You can touch sculptures in French museums to appreciate them.", correctVersion: "Never touch artwork in French museums unless explicitly invited. Oils from skin damage art.", explanation: "This is a universal museum rule, but strictly enforced in France." }
            ]
        },
        {
            level: 'a2', id: 'fr_a2_m19', traps: [
                { trap: "French people change jobs frequently like Americans.", correctVersion: "Job stability is valued in France. Frequent job changes can be seen as a red flag to employers.", explanation: "French career culture emphasizes loyalty and long-term employment more than American culture." },
                { trap: "'Opportunité' always means 'opportunity' in French.", correctVersion: "'Opportunité' can mean 'opportunity' but also 'timeliness'. 'Occasion' is often better for 'opportunity'.", explanation: "While similar, 'opportunité' has a more specific meaning about timing." },
                { trap: "French people appreciate aggressive networking and self-promotion.", correctVersion: "French professional culture values relationships built over time. Aggressive networking is seen as insincere.", explanation: "Professional relationships in France develop slowly through genuine connection, not transactional networking." }
            ]
        },
        {
            level: 'a2', id: 'fr_a2_m20', traps: [
                { trap: "Learning French perfectly is required before speaking it in France.", correctVersion: "French people appreciate any effort to speak French, even with mistakes. Trying is more important than perfection.", explanation: "While French people may correct you, it's usually to help. Making an effort is what matters most." },
                { trap: "'Formidable' means 'formidable' (intimidating) in French.", correctVersion: "'Formidable' means 'wonderful' or 'fantastic' in French. It's a very positive word.", explanation: "This is a false friend with opposite connotations. 'Formidable' is high praise in French!" },
                { trap: "French culture is exactly the same throughout all of France.", correctVersion: "France has strong regional identities. Culture, cuisine, and even language vary significantly by region.", explanation: "From Brittany to Provence, regional differences are significant and important to locals." }
            ]
        }
    ];

    for (const module of modules) {
        try {
            const docRef = db.collection('languages').doc('french')
                .collection('levels').doc(module.level)
                .collection('modules').doc(module.id);

            const liarGameData = { culturalTraps: module.traps };

            await docRef.set({ liarGameData }, { merge: true });

            console.log(`✅ ${module.id}: Uploaded ${module.traps.length} cultural traps`);
        } catch (error) {
            console.error(`❌ ${module.id}: Failed -`, error.message);
        }
    }

    console.log(`\n🎯 All Liar Game data uploaded with merge: true`);
    console.log(`📝 Vocabulary data preserved for all modules`);
}

uploadLiarGameData()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
