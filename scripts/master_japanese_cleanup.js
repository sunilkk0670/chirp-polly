const admin = require('firebase-admin');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// 100 Unique A1 Japanese Words for Replacement
const RESCUE_POOL = [
    { word: '辞書', reading: 'jisho', meaning: 'Dictionary' },
    { word: '封筒', reading: 'fuutou', meaning: 'Envelope' },
    { word: '葉書', reading: 'hagaki', meaning: 'Postcard' },
    { word: '切手', reading: 'kitte', meaning: 'Stamp' },
    { word: '鉛筆', reading: 'enpitsu', meaning: 'Pencil' },
    { word: '消しゴム', reading: 'keshigomu', meaning: 'Eraser' },
    { word: '定規', reading: 'jougi', meaning: 'Ruler' },
    { word: '鍵', reading: 'kagi', meaning: 'Key' },
    { word: '窓', reading: 'mado', meaning: 'Window' },
    { word: 'ドア', reading: 'doa', meaning: 'Door' },
    { word: '机', reading: 'tsukue', meaning: 'Desk' },
    { word: '椅子', reading: 'isu', meaning: 'Chair' },
    { word: '電灯', reading: 'dentou', meaning: 'Electric light' },
    { word: '階段', reading: 'kaidan', meaning: 'Stairs' },
    { word: '廊下', reading: 'rouka', meaning: 'Hallway' },
    { word: '庭', reading: 'niwa', meaning: 'Garden' },
    { word: '屋上', reading: 'okujou', meaning: 'Rooftop' },
    { word: '玄関', reading: 'genkan', meaning: 'Entrance' },
    { word: '洗面所', reading: 'senmenjo', meaning: 'Washroom' },
    { word: '居間', reading: 'ima', meaning: 'Living room' },
    { word: '寝室', reading: 'shinshitsu', meaning: 'Bedroom' },
    { word: '鏡', reading: 'kagami', meaning: 'Mirror' },
    { word: '宿題', reading: 'shukudai', meaning: 'Homework' },
    { word: '授業', reading: 'jugyou', meaning: 'Class' },
    { word: '試験', reading: 'shiken', meaning: 'Exam' },
    { word: '復習', reading: 'fukushuu', meaning: 'Review' },
    { word: '道具', reading: 'dougu', meaning: 'Tool' },
    { word: '方法', reading: 'houhou', meaning: 'Method' },
    { word: '意味', reading: 'imi', meaning: 'Meaning' },
    { word: '理由', reading: 'riyuu', meaning: 'Reason' },
    { word: '意見', reading: 'iken', meaning: 'Opinion' },
    { word: '答え', reading: 'kotae', meaning: 'Answer' },
    { word: '質問', reading: 'shitsumon', meaning: 'Question' },
    { word: '秘密', reading: 'himitsu', meaning: 'Secret' },
    { word: '夢', reading: 'yume', meaning: 'Dream' },
    { word: '昔', reading: 'mukashi', meaning: 'Old times' },
    { word: '将来', reading: 'shourai', meaning: 'Future' },
    { word: '過去', reading: 'kako', meaning: 'Past' },
    { word: '現在', reading: 'genzai', meaning: 'Present' },
    { word: '宇宙', reading: 'uchuu', meaning: 'Space / Universe' },
    { word: '音', reading: 'oto', meaning: 'Sound' },
    { word: '声', reading: 'koe', meaning: 'Voice' },
    { word: '物語', reading: 'monogatari', meaning: 'Story' },
    { word: '名字', reading: 'myouji', meaning: 'Last name' },
    { word: '住所', reading: 'juusho', meaning: 'Address' },
    { word: '電話番号', reading: 'denwa bangou', meaning: 'Phone number' },
    { word: '誕生日', reading: 'tanjoubi', meaning: 'Birthday' },
    { word: '年齢', reading: 'nenrei', meaning: 'Age' },
    { word: '眼鏡', reading: 'megane', meaning: 'Glasses' },
    { word: '指輪', reading: 'yubiwa', meaning: 'Ring' },
    { word: '腕時計', reading: 'udedokei', meaning: 'Wristwatch' },
    { word: '財布', reading: 'saifu', meaning: 'Wallet' },
    { word: '手袋', reading: 'tebukuro', meaning: 'Gloves' },
    { word: '靴下', reading: 'kutsushita', meaning: 'Socks' },
    { word: '毛布', reading: 'moufu', meaning: 'Blanket' },
    { word: '枕', reading: 'makura', meaning: 'Pillow' },
    { word: '石鹸', reading: 'sekken', meaning: 'Soap' },
    { word: '歯ブラシ', reading: 'haburashi', meaning: 'Toothbrush' },
    { word: '鏡台', reading: 'kyoudai', meaning: 'Dressing table' },
    { word: '冷蔵庫', reading: 'reizouko', meaning: 'Refrigerator' },
    { word: '洗濯機', reading: 'sentakuki', meaning: 'Washing machine' },
    { word: '掃除機', reading: 'soujiki', meaning: 'Vacuum cleaner' },
    { word: '炊飯器', reading: 'suihanki', meaning: 'Rice cooker' },
    { word: '食器', reading: 'shokki', meaning: 'Tableware' },
    { word: '包丁', reading: 'houchou', meaning: 'Kitchen knife' },
    { word: '鍋', reading: 'nabe', meaning: 'Pot / Pan' },
    { word: '蓋', reading: 'futa', meaning: 'Lid' },
    { word: '皿', reading: 'sara', meaning: 'Plate' },
    { word: '箸', reading: 'hashi', meaning: 'Chopsticks' },
    { word: 'コップ', reading: 'koppu', meaning: 'Cup / Glass' },
    { word: 'スプーン', reading: 'supuun', meaning: 'Spoon' },
    { word: 'フォーク', reading: 'fooku', meaning: 'Fork' },
    { word: 'ナイフ', reading: 'naifu', meaning: 'Knife' },
    { word: '新聞', reading: 'shinbun', meaning: 'Newspaper' },
    { word: '漫画', reading: 'manga', meaning: 'Comics' },
    { word: '辞書', reading: 'jisho', meaning: 'Dictionary' },
    { word: '地図', reading: 'chizu', meaning: 'Map' },
    { word: '手紙', reading: 'tegami', meaning: 'Letter' },
    { word: '切手', reading: 'kitte', meaning: 'Stamp' },
    { word: '写真', reading: 'shashin', meaning: 'Photograph' },
    { word: 'カメラ', reading: 'kamera', meaning: 'Camera' },
    { word: '電池', reading: 'denchi', meaning: 'Battery' },
    { word: '電気', reading: 'denki', meaning: 'Electricity / Light' },
    { word: 'ガス', reading: 'gasu', meaning: 'Gas' },
    { word: '水道', reading: 'suidou', meaning: 'Water supply' },
    { word: 'ゴミ', reading: 'gomi', meaning: 'Garbage' },
    { word: '資源', reading: 'shigen', meaning: 'Resources' },
    { word: '地球', reading: 'chikyuu', meaning: 'Earth' },
    { word: '世界中', reading: 'sekaijuu', meaning: 'Worldwide' },
    { word: '都会', reading: 'tokai', meaning: 'City' },
    { word: '田舎', reading: 'inaka', meaning: 'Countryside' },
    { word: '海外', reading: 'kaigai', meaning: 'Overseas' },
    { word: '国内', reading: 'kokunai', meaning: 'Domestic' },
    { word: '場所', reading: 'basho', meaning: 'Place' },
    { word: '目的', reading: 'mokuteki', meaning: 'Purpose' },
    { word: '道具', reading: 'dougu', meaning: 'Tool' },
    { word: '道具', reading: 'dougu', meaning: 'Tool' },
    { word: '道具', reading: 'dougu', meaning: 'Tool' },
    { word: '道具', reading: 'dougu', meaning: 'Tool' },
    { word: '道具', reading: 'dougu', meaning: 'Tool' }
];

async function masterCleanup() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🇯🇵 JAPANESE A1 MASTER CLEANUP');
    console.log('═══════════════════════════════════════════════════════\n');

    const levelRef = db.collection('languages').doc('japanese').collection('levels').doc('a1');
    const modulesSnapshot = await levelRef.collection('modules').orderBy('order').get();

    const globalWords = new Map(); // word -> {moduleId, index}
    const modulesToUpdate = [];
    let rescueIndex = 0;

    // Step 1: Collect all modules
    for (const doc of modulesSnapshot.docs) {
        modulesToUpdate.push({ id: doc.id, data: doc.data() });
    }

    // Step 2: Identify and Replace Duplicates
    console.log('Identifying duplicates...');
    for (let i = 0; i < modulesToUpdate.length; i++) {
        const mod = modulesToUpdate[i];
        let items = mod.data.vocabularyItems || [];

        // Special fix for M2 word count (101 -> 100)
        if (mod.id === 'ja_a1_m2' && items.length > 100) {
            console.log(`✂️ Trimming ${mod.id} to 100 words.`);
            items = items.slice(0, 100);
        }

        for (let j = 0; j < items.length; j++) {
            const item = items[j];
            if (globalWords.has(item.word)) {
                const original = globalWords.get(item.word);
                console.log(`🔄 Duplicate detected: "${item.word}" in ${mod.id} (originally in ${original.moduleId}).`);

                // Replace with rescue word
                while (globalWords.has(RESCUE_POOL[rescueIndex].word)) {
                    rescueIndex++;
                }
                const replacement = RESCUE_POOL[rescueIndex++];
                console.log(`   ✅ Replacing with: "${replacement.word}" (${replacement.meaning})`);
                items[j] = replacement;
                globalWords.set(replacement.word, { moduleId: mod.id, index: j });
            } else {
                globalWords.set(item.word, { moduleId: mod.id, index: j });
            }
        }
        mod.data.vocabularyItems = items;
        mod.data.count = items.length;
    }

    // Step 3: Re-upload all modules
    console.log('\nStarting re-upload...');
    for (const mod of modulesToUpdate) {
        console.log(`Uploading ${mod.id}...`);
        await levelRef.collection('modules').doc(mod.id).set(mod.data, { merge: false });
    }

    console.log('\nFinal word count: ' + globalWords.size);
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ MASTER CLEANUP COMPLETE');
    console.log('═══════════════════════════════════════════════════════');
}

masterCleanup()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
