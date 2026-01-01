const fs = require('fs');

const ja_a1_m10_items = [
    // Basic Adjectives - Opposite Pairs (1-20)
    { word: '大きい', reading: 'ookii', meaning: 'Big' },
    { word: '小さい', reading: 'chiisai', meaning: 'Small' },
    { word: '高い', reading: 'takai', meaning: 'High / Expensive' },
    { word: '安い', reading: 'yasui', meaning: 'Cheap' },
    { word: '新しい', reading: 'atarashii', meaning: 'New' },
    { word: '古い', reading: 'furui', meaning: 'Old' },
    { word: '良い / いい', reading: 'yoi / ii', meaning: 'Good' },
    { word: '悪い', reading: 'warui', meaning: 'Bad' },
    { word: '長い', reading: 'nagai', meaning: 'Long' },
    { word: '短い', reading: 'mijikai', meaning: 'Short' },
    { word: '重い', reading: 'omoi', meaning: 'Heavy' },
    { word: '軽い', reading: 'karui', meaning: 'Light (weight)' },
    { word: '速い', reading: 'hayai', meaning: 'Fast' },
    { word: '遅い', reading: 'osoi', meaning: 'Slow' },
    { word: '明るい', reading: 'akarui', meaning: 'Bright' },
    { word: '暗い', reading: 'kurai', meaning: 'Dark' },
    { word: '広い', reading: 'hiroi', meaning: 'Wide / Spacious' },
    { word: '狭い', reading: 'semai', meaning: 'Narrow' },
    { word: '厚い', reading: 'atsui', meaning: 'Thick' },
    { word: '薄い', reading: 'usui', meaning: 'Thin (objects)' },

    // Shopping & Retail Phrases (21-40)
    { word: '買い物', reading: 'kaimono', meaning: 'Shopping' },
    { word: '店', reading: 'mise', meaning: 'Store / Shop' },
    { word: '売り場', reading: 'uriba', meaning: 'Sales area / Counter' },
    { word: '値段', reading: 'nedan', meaning: 'Price' },
    { word: 'お釣り', reading: 'otsuri', meaning: 'Change (money)' },
    { word: '領収書', reading: 'ryoushuusho', meaning: 'Receipt' },
    { word: 'レジ', reading: 'reji', meaning: 'Cash register' },
    { word: '袋', reading: 'fukuro', meaning: 'Bag' },
    { word: '財布', reading: 'saifu', meaning: 'Wallet' },
    { word: '割引', reading: 'waribiki', meaning: 'Discount' },
    { word: '半額', reading: 'hangaku', meaning: 'Half price' },
    { word: '特売', reading: 'tokubai', meaning: 'Special sale' },
    { word: '試着する', reading: 'shichaku suru', meaning: 'To try on' },
    { word: '選ぶ', reading: 'erabu', meaning: 'To choose' },
    { word: '払う', reading: 'harau', meaning: 'To pay' },
    { word: '買う', reading: 'kau', meaning: 'To buy' },
    { word: '売る', reading: 'uru', meaning: 'To sell' },
    { word: '贈答品', reading: 'zoutouhin', meaning: 'Gift item' },
    { word: '免税', reading: 'menzei', meaning: 'Tax free' },
    { word: 'ポイントカード', reading: 'pointo kaado', meaning: 'Point card' },

    // Common Objects & Colors Review (41-60)
    { word: '赤', reading: 'aka', meaning: 'Red' },
    { word: '青', reading: 'ao', meaning: 'Blue' },
    { word: '白', reading: 'shiro', meaning: 'White' },
    { word: '黒', reading: 'kuro', meaning: 'Black' },
    { word: '黄色', reading: 'kiiro', meaning: 'Yellow' },
    { word: '緑', reading: 'midori', meaning: 'Green' },
    { word: '茶色', reading: 'chairo', meaning: 'Brown' },
    { word: 'ピンク', reading: 'pinku', meaning: 'Pink' },
    { word: '服', reading: 'fuku', meaning: 'Clothes' },
    { word: '靴', reading: 'kutsu', meaning: 'Shoes' },
    { word: '鞄', reading: 'kaban', meaning: 'Bag / briefcase' },
    { word: '傘', reading: 'kasa', meaning: 'Umbrella' },
    { word: '帽子', reading: 'boushi', meaning: 'Hat' },
    { word: '眼鏡', reading: 'megane', meaning: 'Glasses' },
    { word: '時計', reading: 'tokei', meaning: 'Watch / Clock' },
    { word: '本', reading: 'hon', meaning: 'Book' },
    { word: 'おもちゃ', reading: 'omocha', meaning: 'Toy' },
    { word: '家電', reading: 'kaden', meaning: 'Home appliances' },
    { word: '食品', reading: 'shokuhin', meaning: 'Food items' },
    { word: 'お菓子', reading: 'okashi', meaning: 'Sweets / Snacks' },

    // Na-Adjectives & States (61-80)
    { word: '静か', reading: 'shizuka', meaning: 'Quiet' },
    { word: '賑やか', reading: 'nigiyaka', meaning: 'Lively / Busy' },
    { word: '便利', reading: 'benri', meaning: 'Convenient' },
    { word: '不便', reading: 'fuben', meaning: 'Inconvenient' },
    { word: '大切', reading: 'taisetsu', meaning: 'Important' },
    { word: '暇', reading: 'hima', meaning: 'Free time' },
    { word: '元気', reading: 'genki', meaning: 'Fine / Healthy' },
    { word: '綺麗', reading: 'kirei', meaning: 'Beautiful / Clean' },
    { word: '丁寧', reading: 'teinei', meaning: 'Polite' },
    { word: '複雑', reading: 'fukuzatsu', meaning: 'Complex' },
    { word: '簡単', reading: 'kantan', meaning: 'Simple / Easy' },
    { word: '親切', reading: 'shinsetsu', meaning: 'Kind' },
    { word: '嫌い', reading: 'kirai', meaning: 'Hate / Dislike' },
    { word: '好き', reading: 'suki', meaning: 'Like / Love' },
    { word: '上手', reading: 'jouzu', meaning: 'Skillful' },
    { word: '下手', reading: 'heta', meaning: 'Unskillful' },
    { word: '色々', reading: 'iroiro', meaning: 'Various' },
    { word: '大丈夫', reading: 'daijoubu', meaning: 'Okay / Fine' },
    { word: '大変', reading: 'taihen', meaning: 'Difficult / Tough' },
    { word: '不思議', reading: 'fushigi', meaning: 'Mysterious' },

    // Review & Practical Phrases (81-100)
    { word: '全部', reading: 'zenbu', meaning: 'All / Everything' },
    { word: '半分', reading: 'hanbun', meaning: 'Half' },
    { word: '少し', reading: 'sukoshi', meaning: 'A little' },
    { word: '沢山', reading: 'takusan', meaning: 'Many / A lot' },
    { word: '一番', reading: 'ichiban', meaning: 'Number one / Best' },
    { word: '本当に', reading: 'hontou ni', meaning: 'Really' },
    { word: 'とても', reading: 'totemo', meaning: 'Very' },
    { word: '少しずつ', reading: 'sukoshi zutsu', meaning: 'Little by little' },
    { word: '一緒に', reading: 'issho ni', meaning: 'Together' },
    { word: '一人で', reading: 'hitori de', meaning: 'By oneself' },
    { word: '多分', reading: 'tabun', meaning: 'Probably' },
    { word: '絶対', reading: 'zettai', meaning: 'Absolutely' },
    { word: 'もう一度', reading: 'mou ichido', meaning: 'Once more' },
    { word: 'ゆっくり', reading: 'yukkuri', meaning: 'Slowly' },
    { word: 'すぐ', reading: 'sugu', meaning: 'Immediately' },
    { word: 'まだ', reading: 'mada', meaning: 'Not yet' },
    { word: 'もう', reading: 'mou', meaning: 'Already' },
    { word: 'いつも', reading: 'itsumo', meaning: 'Always' },
    { word: 'よく', reading: 'yoku', meaning: 'Often / Well' },
    { word: '完璧', reading: 'kanpeki', meaning: 'Perfect' }
];

const ja_a1_m10_traps = [
    {
        trap: 'In Japanese department stores, tax-free shopping is automatically applied to all customers regardless of nationality or visa status.',
        correctVersion: "Tax-free is only for non-residents on short-term visas (usually 6 months or less) and requires presenting your original passport at the designated counter.",
        explanation: 'The 10% consumption tax can be refunded at specific booths (*menzei counter*) after showing your passport and receipts.'
    },
    {
        trap: 'When a shopkeeper asks if you have a "pointo kaado" (point card), it is mandatory to sign up for one before you can finish your purchase.',
        correctVersion: 'Point cards are optional loyalty programs. If you don\'t have one, you can simply say "arimasen" (I don\'t have one) or "kekkou desu" (No thank you).',
        explanation: 'Almost every shop (convenience stores, drugstores) has a loyalty card. It can be overwhelming for beginners, but you are never required to have one.'
    },
    {
        trap: 'In Japan, it is considered polite to say "No" directly and loudly if you don\'t like a product in a store.',
        correctVersion: 'Directly saying "No" (*iie*) can be seen as too blunt. It is more common to use softer phrases or ambiguous gestures like "chotto..." (a bit...) to decline.',
        explanation: 'Japanese social harmony (*wa*) favors indirect communication. Saying "chotto..." while fading off implies that the item or price is a bit difficult/not right.'
    }
];

// Integrity Check: Duplicates
const seenWords = new Set();
const duplicates = [];
ja_a1_m10_items.forEach(item => {
    if (seenWords.has(item.word)) {
        duplicates.push(item.word);
    }
    seenWords.add(item.word);
});

if (duplicates.length > 0) {
    console.error('❌ Duplicates found in Module 10:', duplicates);
    process.exit(1);
}

if (ja_a1_m10_items.length !== 100) {
    console.error('❌ Module 10 has ' + ja_a1_m10_items.length + ' items. Expected 100.');
    process.exit(1);
}

const moduleData = {
    id: 'ja_a1_m10',
    moduleId: 'ja_a1_m10',
    name: 'A1 Japanese - Module 10: Adjectives, Shopping, and Level Review',
    theme: 'Adjectives, Shopping, and Level Review',
    order: 10,
    count: 100,
    vocabularyItems: ja_a1_m10_items,
    liarGameData: { culturalTraps: ja_a1_m10_traps }
};

fs.writeFileSync('./firestore_data/ja_a1_m10.json', JSON.stringify(moduleData, null, 2));
console.log('✅ ja_a1_m10.json generated successfully.');
