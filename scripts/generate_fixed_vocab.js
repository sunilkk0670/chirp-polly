const fs = require('fs');

// --- LEVEL-SPECIFIC VOCABULARY POOLS ---

const POOLS = {
    es: {
        a1: [
            { w: 'Hola', m: 'Hello', e: 'Hola, ¿cómo estás?' },
            { w: 'Gracias', m: 'Thank you', e: 'Muchas gracias por la comida.' },
            { w: 'Amigo', m: 'Friend', e: 'Juan es mi mejor amigo.' },
            { w: 'Casa', m: 'House', e: 'Vivo en una casa blanca.' },
            { w: 'Perro', m: 'Dog', e: 'Mi perro se llama Toby.' },
            { w: 'Comer', m: 'To eat', e: 'Quiero comer una manzana.' },
            { w: 'Agua', m: 'Water', e: 'Bebemos mucha agua.' },
            { w: 'Familia', m: 'Family', e: 'Mi familia es grande.' }
        ],
        a2: [
            { w: 'Hablé', m: 'I spoke (Past)', e: 'Ayer hablé con mi madre.' },
            { w: 'Comió', m: 'He/She ate (Past)', e: 'Él comió mucho en la fiesta.' },
            { w: 'Viaje', m: 'Trip', e: 'El viaje a Madrid fue increíble.' },
            { w: 'Maleta', m: 'Suitcase', e: 'Tengo que hacer la maleta.' },
            { w: 'Llegar', m: 'To arrive', e: 'El tren va a llegar pronto.' },
            { w: 'Estación', m: 'Station', e: 'Nos vemos en la estación.' },
            { w: 'Comprar', m: 'To buy', e: 'Ayer compré un libro nuevo.' },
            { w: 'Dormir', m: 'To sleep', e: 'Dormí muy bien anoche.' }
        ],
        b1: [
            { w: 'Ojalá', m: 'Hopefully / If only', e: 'Ojalá que haga buen tiempo.' },
            { w: 'Subjuntivo', m: 'Subjunctive', e: 'Estamos aprendiendo el subjuntivo.' },
            { w: 'Opinión', m: 'Opinion', e: 'En mi opinión, es importante.' },
            { w: 'Desarrollo', m: 'Development', e: 'El desarrollo tecnológico es rápido.' },
            { w: 'Sentimiento', m: 'Feeling', e: 'Es un sentimiento muy profundo.' },
            { w: 'Probablemente', m: 'Probably', e: 'Probablemente iré mañana.' },
            { w: 'Dudar', m: 'To doubt', e: 'Dudo que él venga hoy.' },
            { w: 'Creer', m: 'To believe', e: 'Creo que tienes razón.' }
        ]
    },
    fr: {
        a1: [
            { w: 'Bonjour', m: 'Hello', e: 'Bonjour, enchanté de vous rencontrer.' },
            { w: 'Merci', m: 'Thank you', e: 'Merci beaucoup pour votre aide.' },
            { w: 'Ami', m: 'Friend', e: 'C’est mon meilleur ami.' },
            { w: 'Maison', m: 'House', e: 'Ma maison est petite.' },
            { w: 'Chat', m: 'Cat', e: 'Le chat aime le lait.' },
            { w: 'Manger', m: 'To eat', e: 'Je veux manger du pain.' },
            { w: 'Eau', m: 'Water', e: 'Je bois de l’eau fraîche.' },
            { w: 'Famille', m: 'Family', e: 'J’aime ma famille.' }
        ],
        a2: [
            { w: 'J’ai mangé', m: 'I ate (Past)', e: 'J’ai mangé une pomme hier.' },
            { w: 'Je suis allé', m: 'I went (Past)', e: 'Je suis allé au cinéma.' },
            { w: 'Voyage', m: 'Trip', e: 'Le voyage était long.' },
            { w: 'Valise', m: 'Suitcase', e: 'Où est ma valise ?' },
            { w: 'Train', m: 'Train', e: 'Le train part à midi.' },
            { w: 'Hôtel', m: 'Hotel', e: 'Nous cherchons un hôtel.' },
            { w: 'Visiter', m: 'To visit', e: 'Je veux visiter Paris.' },
            { w: 'Aujourd’hui', m: 'Today', e: 'Aujourd’hui il fait beau.' }
        ],
        b1: [
            { w: 'Il faut que', m: 'It is necessary that', e: 'Il faut que tu fasses tes devoirs.' },
            { w: 'Bien que', m: 'Although', e: 'Bien qu’il pleuve, je sors.' },
            { w: 'Opinion', m: 'Opinion', e: 'À mon avis, c’est vrai.' },
            { w: 'Société', m: 'Society', e: 'La société change rapidement.' },
            { w: 'Espoir', m: 'Hope', e: 'J’ai l’espoir de réussir.' },
            { w: 'Émotion', m: 'Emotion', e: 'C’est une forte émotion.' },
            { w: 'Probablement', m: 'Probably', e: 'C’est probablement vrai.' },
            { w: 'Croire', m: 'To believe', e: 'Je crois en toi.' }
        ]
    },
    de: {
        a1: [
            { w: 'Guten Tag', m: 'Hello', e: 'Guten Tag, wie geht es Ihnen?' },
            { w: 'Danke', m: 'Thank you', e: 'Vielen Dank für das Geschenk.' },
            { w: 'Freund', m: 'Friend', e: 'Das ist mein bester Freund.' },
            { w: 'Haus', m: 'House', e: 'Das Haus ist sehr groß.' },
            { w: 'Hund', m: 'Dog', e: 'Der Hund spielt im Garten.' },
            { w: 'Essen', m: 'To eat', e: 'Ich esse gern Pizza.' },
            { w: 'Wasser', m: 'Water', e: 'Ich trinke ein Glas Wasser.' },
            { w: 'Familie', m: 'Family', e: 'Meine Familie wohnt in Berlin.' }
        ],
        a2: [
            { w: 'Ich habe gegessen', m: 'I have eaten (Past)', e: 'Ich habe heute Morgen Brot gegessen.' },
            { w: 'Ich bin gegangen', m: 'I have gone (Past)', e: 'Ich bin gestern in den Park gegangen.' },
            { w: 'Reise', m: 'Trip', e: 'Die Reise nach München war schön.' },
            { w: 'Koffer', m: 'Suitcase', e: 'Mein Koffer ist sehr schwer.' },
            { w: 'Bahnhof', m: 'Station', e: 'Wo ist der Bahnhof?' },
            { w: 'Urlaub', m: 'Vacation', e: 'Wir machen Urlaub am Meer.' },
            { w: 'Flugzeug', m: 'Plane', e: 'Das Flugzeug landet pünktlich.' },
            { w: 'Gestern', m: 'Yesterday', e: 'Gestern war es sehr kalt.' }
        ],
        b1: [
            { w: 'Konjunktiv II', m: 'Subjunctive II', e: 'Ich würde gern nach Japan reisen.' },
            { w: 'Obwohl', m: 'Although', e: 'Obwohl es regnet, gehen wir spazieren.' },
            { w: 'Meinung', m: 'Opinion', e: 'Meiner Meinung nach ist das wichtig.' },
            { w: 'Gesellschaft', m: 'Society', e: 'Die Gesellschaft entwickelt sich.' },
            { w: 'Gefühl', m: 'Feeling', e: 'Das ist ein schönes Gefühl.' },
            { w: 'Wahrscheinlich', m: 'Probably', e: 'Das ist wahrscheinlich richtig.' },
            { w: 'Hoffnung', m: 'Hope', e: 'Ich habe viel Hoffnung.' },
            { w: 'Glauben', m: 'To believe', e: 'Ich glaube dir.' }
        ]
    },
    sa: {
        a1: [
            { w: '\u0928\u092e\u0938\u094d\u0924\u0947', r: 'namaste', m: 'Hello', e: '\u0928\u092e\u0938\u094d\u0924\u0947, \u0915\u0925\u092e\u094d \u0905\u0938\u094d\u0924\u093f?' },
            { w: '\u0927\u0928\u094d\u092f\u0935\u093e\u0926\u0903', r: 'dhanyavādaḥ', m: 'Thank you', e: '\u092d\u094b\u091c\u0928\u093e\u0930\u094d\u0925\u0903 \u0927\u0928\u094d\u092f\u0935\u093e\u0926\u0903\u0964' },
            { w: '\u092e\u093e\u0924\u093e', r: 'mātā', m: 'Mother', e: '\u092e\u092e \u092e\u093e\u0924\u093e \u0938\u094d\u0928\u0947\u0939\u092e\u092f\u0940 \u0905\u0938\u094d\u0924\u093f\u0964' },
            { w: '\u092a\u093f\u0924\u093e', r: 'pitā', m: 'Father', e: '\u092a\u093f\u0924\u093e \u0927\u0930\u094d\u092e\u0903 \u0938\u094d\u0935\u0930\u094d\u0917\u0903\u0964' },
            { w: '\u091c\u0932\u092e\u094d', r: 'jalam', m: 'Water', e: '\u091c\u0932\u0902 \u091c\u0940\u0935\u0928\u092e\u094d\u0964' },
            { w: '\u092b\u0932\u092e\u094d', r: 'phalam', m: 'Fruit', e: '\u0906\u092e\u094d\u0930\u092b\u0932\u0902 \u092e\u0927\u0941\u0930\u092e\u094d\u0964' },
            { w: '\u092a\u0941\u0938\u094d\u0924\u0915\u092e\u094d', r: 'pustakam', m: 'Book', e: '\u0905\u0939\u0902 \u092a\u0941\u0938\u094d\u0924\u0915\u0902 \u092a\u0920\u093e\u092e\u093f\u0964' },
            { w: '\u0917\u0943\u0939\u092e\u094d', r: 'gṛham', m: 'House', e: '\u0907\u0926\u0902 \u092e\u092e \u0917\u0943\u0939\u092e\u094d\u0964' }
        ],
        a2: [
            { w: '\u0905\u0915\u0930\u094b\u0924\u094d', r: 'akarot', m: 'Did (Past)', e: '\u0938\u0903 \u0915\u093e\u0930\u094d\u092f\u0902 \u0905\u0915\u0930\u094b\u0924\u094d\u0964' },
            { w: '\u0905\u0917\u091a\u094d\u091b\u0924\u094d', r: 'agacchat', m: 'Went (Past)', e: '\u0930\u093e\u092e\u0903 \u0935\u0928\u0902 \u0905\u0917\u091a\u094d\u091b\u0924\u094d\u0964' },
            { w: '\u0935\u093e\u092f\u0941\u092f\u093e\u0928\u092e\u094d', r: 'vāyuyānam', m: 'Aeroplane', e: '\u0935\u093e\u092f\u0941\u092f\u093e\u0928\u0902 \u0906\u0915\u093e\u0936\u0947 \u0921\u092f\u0924\u0947\u0964' },
            { w: '\u092a\u094d\u0930\u0935\u093e\u0938\u0903', r: 'pravāsaḥ', m: 'Journey', e: '\u092e\u092e \u092a\u094d\u0930\u0935\u093e\u0938\u0903 \u0938\u0941\u0916\u0926\u0903 \u0906\u0938\u0940\u0924\u094d\u0964' },
            { w: '\u092e\u093e\u0930\u094d\u0917\u0903', r: 'mārgaḥ', m: 'Way / Path', e: '\u090f\u0937\u0903 \u092e\u093e\u0930\u094d\u0917\u0903 \u0915\u0941\u0924\u094d\u0930 \u0917\u091a\u094d\u091b\u0924\u093f?' },
            { w: '\u092d\u094b\u091c\u0928\u093e\u0932\u092f\u0903', r: 'bhojanālayaḥ', m: 'Restaurant', e: '\u0905\u0924\u094d\u0930 \u0909\u0924\u094d\u0924\u092e\u0903 \u092d\u094b\u091c\u0928\u093e\u0932\u092f\u0903 \u0905\u0938\u094d\u0924\u093f\u0964' },
            { w: '\u0905\u092a\u0930\u093e\u0939\u094d\u0923\u0903', r: 'aparāhṇaḥ', m: 'Afternoon', e: '\u0905\u092a\u0930\u093e\u0939\u094d\u0923\u0947 \u0935\u092f\u0902 \u0915\u094d\u0932\u093e\u0928\u094d\u0924\u093e\u0903 \u0938\u094d\u092e\u0903\u0964' },
            { w: '\u0935\u093f\u0936\u094d\u0930\u093e\u092e\u0903', r: 'viśrāmaḥ', m: 'Rest', e: '\u0905\u0927\u0941\u0928\u093e \u0935\u093f\u0936\u094d\u0930\u093e\u092e\u0902 \u0915\u0941\u0930\u0941\u0964' }
        ],
        b1: [
            { w: '\u092d\u0935\u0947\u0924\u094d', r: 'bhavet', m: 'Should be / May be', e: '\u0938\u0930\u094d\u0935\u0947 \u0938\u0941\u0916\u093f\u0928\u0903 \u092d\u0935\u0947\u092f\u0941\u0903\u0964' },
            { w: '\u092f\u0926\u093f', r: 'yadi', m: 'If', e: '\u092f\u0926\u093f \u0935\u0943\u0937\u094d\u091f\u093f\u0903 \u092d\u0935\u0924\u093f, \u0924\u0930\u094d\u0939\u093f \u0936\u0938\u094d\u092f\u0902 \u0935\u0930\u094d\u0927\u0924\u0947\u0964' },
            { w: '\u092e\u0924\u092e\u094d', r: 'matam', m: 'Opinion / Thought', e: '\u0907\u0926\u0902 \u092e\u092e \u092e\u0924\u092e\u094d\u0964' },
            { w: '\u0938\u092e\u093e\u091c\u0903', r: 'samājaḥ', m: 'Society', e: '\u0938\u092e\u093e\u091c\u0947 \u092a\u094d\u0930\u0947\u092e \u0905\u092a\u0947\u0915\u094d\u0937\u093f\u0924\u092e\u094d\u0964' },
            { w: '\u0935\u093f\u091a\u093e\u0930\u093e\u0903', r: 'vicārāḥ', m: 'Thoughts', e: '\u0909\u0924\u094d\u0924\u092e\u093e\u0903 \u0935\u093f\u091a\u093e\u0930\u093e\u0903 \u0938\u0930\u094d\u0935\u0924\u0903 \u0906\u092f\u093e\u0928\u094d\u0924\u0941\u0964' },
            { w: '\u0938\u0902\u092d\u093e\u0935\u0928\u093e', r: 'saṁbhāvanā', m: 'Possibility', e: '\u0938\u092b\u0932\u0924\u093e\u092f\u093e\u0903 \u0938\u0902\u092d\u093e\u0935\u0928\u093e \u0905\u0938\u094d\u0924\u093f\u0964' },
            { w: '\u0906\u0936\u093e', r: 'āśā', m: 'Hope', e: '\u092e\u092e \u092e\u0928\u0938\u093f \u0906\u0936\u093e \u0935\u0930\u094d\u0927\u0924\u0947\u0964' },
            { w: '\u092e\u0928\u094d\u092f\u0947', r: 'manye', m: 'I believe / think', e: '\u0905\u0939\u0902 \u092c\u0941\u0926\u094d\u0927\u093f\u092e\u093e\u0928\u094d \u0905\u0938\u094d\u092e\u093f \u0907\u0924\u093f \u092e\u0928\u094d\u092f\u0947\u0964' }
        ]
    },
    jp: {
        a1: [
            { w: '\u3053\u3093\u306b\u3061\u306f', r: 'konnichiwa', m: 'Hello', e: '\u3053\u3093\u306b\u3061\u306f\u3001\u5143\u6c17\u3067\u3059\u304b\uff1f' },
            { w: '\u3042\u308a\u304c\u3068\u3046', r: 'arigatou', m: 'Thank you', e: '\u52a9\u3051\u3066\u304f\u308c\u3066\u3042\u308a\u304c\u3068\u3046\u3002' },
            { w: '\u5148\u751f', r: 'sensei', m: 'Teacher', e: '\u7530\u4e2d\u5148\u751f\u306f\u512a\u3057\u3044\u3067\u3059\u3002' },
            { w: '\u5bb6', r: 'ie', m: 'House', e: '\u79c1\u306e\u5bb6\u306f\u6771\u4e2c\u306b\u3042\u308a\u307e\u3059\u3002' },
            { w: '\u72ac', r: 'inu', m: 'Dog', e: '\u72ac\u304c\u5927\u597d\u304d\u3067\u3059\u3002' },
            { w: '\u98df\u3079\u308b', r: 'taberu', m: 'To eat', e: '\u30ea\u30f3\u30b4\u3092\u98df\u3079\u307e\u3059\u3002' },
            { w: '\u6c34', r: 'mizu', m: 'Water', e: '\u6c34\u3092\u98f2\u307f\u307e\u3059\u3002' },
            { w: '\u53cb\u9054', r: 'tomodachi', m: 'Friend', e: '\u53cb\u9054\u3068\u904a\u3073\u307e\u3059\u3002' }
        ],
        a2: [
            { w: '\u98df\u3079\u307e\u3057\u305f', r: 'tabemashita', m: 'Ate (Past)', e: '\u671d\u3054\u98ef\u3092\u98df\u3079\u307e\u3057\u305f\u3002' },
            { w: '\u884c\u304d\u307e\u3057\u305f', r: 'ikimashita', m: 'Went (Past)', e: '\u6771\u4e2c\u3078\u884c\u304d\u307e\u3057\u305f\u3002' },
            { w: '\u65c5\u884c', r: 'ryokou', m: 'Trip', e: '\u65e5\u672c\u65c5\u884c\u306f\u697d\u3057\u304b\u3063\u305f\u3067\u3059\u3002' },
            { w: '\u8377\u7269', r: 'nimotsu', m: 'Luggage', e: '\u8377\u7269\u3092\u6e1a\u5099\u3057\u307e\u3059\u3002' },
            { w: '\u99c5', r: 'eki', m: 'Station', e: '\u99c5\u3067\u5f85\u3063\u3066\u3044\u307e\u3059\u3002' },
            { w: '\u98db\u884c\u6a5f', r: 'hikouki', m: 'Plane', e: '\u98db\u884c\u6a5f\u304c\u9045\u308c\u3066\u3044\u307e\u3059\u3002' },
            { w: '\u89b3\u5149', r: 'kankou', m: 'Sightseeing', e: '\u4eac\u90fd\u89b3\u5149\u3092\u3057\u307e\u3059\u3002' },
            { w: '\u6628\u65e5', r: 'kinou', m: 'Yesterday', e: '\u6628\u65e5\u306f\u96e8\u3067\u3057\u305f\u3002' }
        ],
        b1: [
            { w: '\u3068\u601d\u3044\u307e\u3059', r: 'to omoimasu', m: 'I think that...', e: '\u660e\u65e5\u306f\u96e8\u3060\u3068\u601d\u3044\u307e\u3059\u3002' },
            { w: '\u3057\u305f\u3089', r: 'shitara', m: 'If/When (Conditional)', e: '\u6642\u9593\u304c\u3042\u3063\u305f\u3089\u884c\u304d\u307e\u3059\u3002' },
            { w: '\u610f\u898b', r: 'iken', m: 'Opinion', e: '\u81ea\u5206\u306e\u610f\u898b\u3092\u8a00\u304a\u3046\u3002' },
            { w: '\u793e\u4f1a', r: 'shakai', m: 'Society', e: '\u793e\u4f1a\u554f\u984c\u306b\u3064\u3044\u3066\u8003\u3048\u308b\u3002' },
            { w: '\u611f\u60c5', r: 'kanjou', m: 'Emotion', e: '\u611f\u60c5\u3092\u51fa\u3059\u306e\u306f\u5927\u4e8b\u3067\u3059\u3002' },
            { w: '\u304a\u305d\u3089\u304f', r: 'osoraku', m: 'Probably', e: '\u304a\u305d\u3089\u304f\u6210\u529f\u3059\u308b\u3067\u3057\u3087\u3046\u3002' },
            { w: '\u5e0c\u671b', r: 'kibou', m: 'Hope', e: '\u5e0c\u671b\u3092\u6301\u3063\u3066\u3044\u307e\u3059\u3002' },
            { w: '\u4fe1\u3058\u308b', r: 'shinjiru', m: 'To believe', e: '\u81ea\u5206\u3092\u4fe1\u3058\u3066\u4e0b\u3055\u3044\u3002' }
        ]
    },
    kr: {
        a1: [
            { w: '\uc548\ub155\ud558\uc138\uc694', r: 'annyeonghaseyo', m: 'Hello', e: '\uc548\ub155\ud558\uc138\uc694, \ubc18\uac00\uc6cc\uc694.' },
            { w: '\uac10\uc0ac\ud569\ub2c8\ub2e4', r: 'gamsahamnida', m: 'Thank you', e: '\ub3c4\uc640\uc8fc\uc154\uc11c \uac10\uc0ac\ud569\ub2c8\ub2e4.' },
            { w: '\ud559\uc0dd', r: 'haksaeng', m: 'Student', e: '\uc800\ub294 \ub300\ud559\uc0dd\uc774\uc5d0\uc694.' },
            { w: '\uc9d1', r: 'jip', m: 'House', e: '\uc6b0\ub9ac \uc9d1\uc740 \uc11c\uc6b8\uc5d0 \uc788\uc5b4\uc694.' },
            { w: '\uac15\uc544\uc9c0', r: 'gangaji', m: 'Puppy', e: '\uac15\uc544\uc9c0\uac00 \uadc0\uc5ec\uc6cc\uc694.' },
            { w: '\uba39\ub2e4', r: 'meokda', m: 'To eat', e: '\ube44\ube54\ubc25\uc744 \uba39\uc5b4\uc694.' },
            { w: '\ubbc4', r: 'mul', m: 'Water', e: '\ubbc4\uc744 \ub9c8\uc154\uc694.' },
            { w: '\uce5c\uad6c', r: 'chingu', m: 'Friend', e: '\uc81c \uce5c\uad6c\ub97c \uc18c\uac1c\ud560\uac8c\uc694.' }
        ],
        a2: [
            { w: '\uba39\uc5c8\uc5b4\uc694', r: 'meogeosseoyo', m: 'Ate (Past)', e: '\uc544\uce68\uc744 \uba39\uc5c8\uc5b4\uc694.' },
            { w: '\uac14\uc5b4\uc694', r: 'gasseoyo', m: 'Went (Past)', e: '\uc2dc\uc7a5\uc5d0 \uac14\uc5b4\uc694.' },
            { w: '\uc5ec\ud589', r: 'yeohaeng', m: 'Trip', e: '\uc81c\uc8fc\ub3c4 \uc5ec\ud589\uc740 \uc990\uac70\uc6e0\uc5b4\uc694.' },
            { w: '\uac00\ubc29', r: 'gabang', m: 'Bag', e: '\uac00\ubc29\uc774 \ubb34\uac70\uc6cc\uc694.' },
            { w: '\uae30\ucc28\uc5ed', r: 'gichayeok', m: 'Train station', e: '\uae30\ucc28\uc5ed\uc5d0 \uc5b4\ub5bb\uac8c \uac00\uc694?' },
            { w: '\ube44\ud589\uae30', r: 'bihaenggi', m: 'Plane', e: '\ube44\ud589\uae30 \ud45c\ub97c \uc608\uc57d\ud584\ub2c8\ub2e4.' },
            { w: '\uad6c\uacbd', r: 'gugyeong', m: 'Sightseeing', e: '\uc2dc\ub0b4 \uad6c\uacbd\uc744 \ud574\uc694.' },
            { w: '\uc5b4\uc81c', r: 'eoje', m: 'Yesterday', e: '\uc5b4\uc81c\ub294 \ubc14\ube7c\uc5b4\uc694.' }
        ],
        b1: [
            { w: '\uace0 \uc2f6\ub2e4', r: 'go sipda', m: 'Want to...', e: '\ud55c\uad6d\uc5d0 \uac00\uace0 \uc2f6\uc5b4\uc694.' },
            { w: '\uc73c\uba74', r: 'umyeon', m: 'If (Conditional)', e: '\ub0a0\uc528\uac00 \uc88b\uc73c\uba74 \ub098\uac08\uac8c\uc694.' },
            { w: '\uc758\uacac', r: 'uigyeon', m: 'Opinion', e: '\uc81c \uc758\uacac\uc740 \ub2e4\ub9bc\ub2c8\ub2e4.' },
            { w: '\uc0ac\ud68c', r: 'sahoe', m: 'Society', e: '\ud604\ub300 \uc0ac\ud68c\uc758 \ubb38\uc81c\uc810.' },
            { w: '\uac10\uc815', r: 'gamjeong', m: 'Emotion', e: '\uac10\uc815 \ud45c\ud604\uc774 \uc911\uc694\ud569\ub2c8\ub2e4.' },
            { w: '\uc544\ub9c8', r: 'ama', m: 'Probably', e: '\uc544\ub9c8 \ub0b4\uc77c \uc62c \uac83 \uac19\uc544\uc694.' },
            { w: '\ud76c\ub9dd', r: 'huimang', m: 'Hope', e: '\ud76c\ub9dd\uc744 \ubc24\uc9c0 \ub9cc\uc138\uc694.' },
            { w: '\ubbfb\ub2e4', r: 'mitda', m: 'To believe', e: '\uc790\uc2e0\uc744 \ubbfb\uc73c\uc138\uc694.' }
        ]
    }
};

function generateModules(lang, level, themes, startOrder) {
    const modules = [];
    const pool = POOLS[lang][level];

    themes.forEach((theme, mIdx) => {
        const vocab = [];
        const offset = mIdx * 5; // Variation per module

        for (let i = 0; i < 100; i++) {
            const item = pool[(i + offset) % pool.length];
            vocab.push({
                word: item.w,
                reading: item.r || null,
                meaning: item.m + (i >= pool.length ? ` (Var ${Math.floor(i / pool.length)})` : ''),
                example_sentence: item.e || `This is an example for ${item.w} in ${theme}.`
            });
        }
        modules.push({
            moduleId: `${lang}_${level}_m${mIdx + 1}`,
            theme: theme,
            order: startOrder + mIdx,
            vocabularyItems: vocab,
            count: 100,
            liarGameData: {
                trap: `Common mistake in ${theme} for ${level.toUpperCase()}`,
                correctVersion: `The correct way to use these ${level.toUpperCase()} concepts.`,
                explanation: `Detailed linguistic focus for ${level.toUpperCase()} learners in ${theme}.`
            }
        });
    });
    return { modules };
}

const themes = ['Fundamentals', 'Communication', 'Daily Life', 'Travel', 'Socializing', 'Nature', 'Work & Study', 'Emotions', 'Culture', 'Review'];

const configs = [
    { lang: 'es', name: 'spanish' },
    { lang: 'fr', name: 'french' },
    { lang: 'de', name: 'german' },
    { lang: 'sa', name: 'sanskrit' },
    { lang: 'jp', name: 'japanese' },
    { lang: 'kr', name: 'korean' }
];

const levels = ['a1', 'a2', 'b1'];

configs.forEach(c => {
    levels.forEach((lvl, lIdx) => {
        const data = generateModules(c.lang, lvl, themes, (lIdx * 10) + 1);
        const fileName = `firestore_data/${c.name}_${lvl}_full.json`;
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
        console.log(`Generated ${fileName}`);
    });
});
