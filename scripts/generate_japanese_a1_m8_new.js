const fs = require('fs');

const ja_a1_m8_items = [
    // Weather Conditions (1-20)
    { word: '天気', reading: 'tenki', meaning: 'Weather' },
    { word: '晴れ', reading: 'hare', meaning: 'Clear weather / Sunny' },
    { word: '雨', reading: 'ame', meaning: 'Rain' },
    { word: '曇り', reading: 'kumori', meaning: 'Cloudy' },
    { word: '雪', reading: 'yuki', meaning: 'Snow' },
    { word: '風', reading: 'kaze', meaning: 'Wind' },
    { word: '嵐', reading: 'arashi', meaning: 'Storm' },
    { word: '雷', reading: 'kaminari', meaning: 'Thunder / Lightning' },
    { word: '虹', reading: 'niji', meaning: 'Rainbow' },
    { word: '霧', reading: 'kiri', meaning: 'Fog / Mist' },
    { word: '空', reading: 'sora', meaning: 'Sky' },
    { word: '太陽', reading: 'taiyou', meaning: 'Sun' },
    { word: '月', reading: 'tsuki', meaning: 'Moon' },
    { word: '星', reading: 'hoshi', meaning: 'Star' },
    { word: '雲', reading: 'kumo', meaning: 'Cloud' },
    { word: '気温', reading: 'kion', meaning: 'Temperature' },
    { word: '暑い', reading: 'atsui', meaning: 'Hot (weather)' },
    { word: '寒い', reading: 'samui', meaning: 'Cold (weather)' },
    { word: '暖かい', reading: 'atatakai', meaning: 'Warm' },
    { word: '涼しい', reading: 'suzushii', meaning: 'Cool' },

    // Seasons & Time of Year (21-40)
    { word: '季節', reading: 'kisetsu', meaning: 'Season' },
    { word: '四季', reading: 'shiki', meaning: 'Four seasons' },
    { word: '春', reading: 'haru', meaning: 'Spring' },
    { word: '夏', reading: 'natsu', meaning: 'Summer' },
    { word: '秋', reading: 'aki', meaning: 'Autumn / Fall' },
    { word: '冬', reading: 'fuyu', meaning: 'Winter' },
    { word: '梅雨', reading: 'tsuyu', meaning: 'Rainy season' },
    { word: '初夏', reading: 'shoka', meaning: 'Early summer' },
    { word: '真夏', reading: 'manatsu', meaning: 'Midsummer' },
    { word: '晩秋', reading: 'banshuu', meaning: 'Late autumn' },
    { word: '元旦', reading: 'gantan', meaning: 'New Year\'s Day' },
    { word: '正月', reading: 'shougatsu', meaning: 'New Year' },
    { word: 'お盆', reading: 'obon', meaning: 'Obon festival period' },
    { word: '桜', reading: 'sakura', meaning: 'Cherry blossom' },
    { word: '紅葉', reading: 'kouyou / momiji', meaning: 'Autumn leaves' },
    { word: '花見', reading: 'hanami', meaning: 'Flower viewing' },
    { word: '月見', reading: 'tsukimi', meaning: 'Moon viewing' },
    { word: '雪祭り', reading: 'yukimatsuri', meaning: 'Snow festival' },
    { word: '海開き', reading: 'umibiraki', meaning: 'Opening of the beach season' },
    { word: '山開き', reading: 'yamabiraki', meaning: 'Opening of the climbing season' },

    // Nature & Natural Elements (41-60)
    { word: '自然', reading: 'shizen', meaning: 'Nature' },
    { word: '山', reading: 'yama', meaning: 'Mountain' },
    { word: '川', reading: 'kawa', meaning: 'River' },
    { word: '海', reading: 'umi', meaning: 'Sea / Ocean' },
    { word: '湖', reading: 'mizuumi', meaning: 'Lake' },
    { word: '池', reading: 'ike', meaning: 'Pond' },
    { word: '森', reading: 'mori', meaning: 'Forest' },
    { word: '林', reading: 'hayashi', meaning: 'Woods / Grove' },
    { word: '野原', reading: 'nohara', meaning: 'Field' },
    { word: '花', reading: 'hana', meaning: 'Flower' },
    { word: '草', reading: 'kusa', meaning: 'Grass' },
    { word: '木', reading: 'ki', meaning: 'Tree' },
    { word: '葉', reading: 'ha', meaning: 'Leaf' },
    { word: '岩', reading: 'iwa', meaning: 'Rock' },
    { word: '石', reading: 'ishi', meaning: 'Stone' },
    { word: '砂', reading: 'suna', meaning: 'Sand' },
    { word: '波', reading: 'nami', meaning: 'Wave' },
    { word: '滝', reading: 'taki', meaning: 'Waterfall' },
    { word: '谷', reading: 'tani', meaning: 'Valley' },
    { word: '島', reading: 'shima', meaning: 'Island' },

    // Landscapes & Phenomena (61-80)
    { word: '景色', reading: 'keshiki', meaning: 'Scenery / Landscape' },
    { word: '風景', reading: 'fuukei', meaning: 'View / Landscape' },
    { word: '地平線', reading: 'chiheisen', meaning: 'Horizon' },
    { word: '水平線', reading: 'suiheisen', meaning: 'Sea horizon' },
    { word: '日の出', reading: 'hinode', meaning: 'Sunrise' },
    { word: '夕日', reading: 'yuuhi', meaning: 'Setting sun / Sunset' },
    { word: '夜景', reading: 'yakei', meaning: 'Night view' },
    { word: '地震', reading: 'jishin', meaning: 'Earthquake' },
    { word: '津波', reading: 'tsunami', meaning: 'Tsunami' },
    { word: '台風', reading: 'taifuun', meaning: 'Typhoon' },
    { word: '洪水', reading: 'kouzui', meaning: 'Flood' },
    { word: '火山', reading: 'kazan', meaning: 'Volcano' },
    { word: '噴火', reading: 'funka', meaning: 'Eruption' },
    { word: '大地', reading: 'daichi', meaning: 'Great earth / Ground' },
    { word: '空気', reading: 'kuuki', meaning: 'Air' },
    { word: '湿度', reading: 'shitsudo', meaning: 'Humidity' },
    { word: '乾燥', reading: 'kansou', meaning: 'Dryness' },
    { word: '光', reading: 'hikari', meaning: 'Light' },
    { word: '影', reading: 'kage', meaning: 'Shadow' },
    { word: '世界', reading: 'sekai', meaning: 'World' },

    // Animals & Living Nature (81-100)
    { word: '動物', reading: 'doubutsu', meaning: 'Animal' },
    { word: '鳥', reading: 'tori', meaning: 'Bird' },
    { word: '魚', reading: 'sakana', meaning: 'Fish' },
    { word: '虫', reading: 'mushi', meaning: 'Insect' },
    { word: '犬', reading: 'inu', meaning: 'Dog' },
    { word: '猫', reading: 'neko', meaning: 'Cat' },
    { word: '馬', reading: 'uma', meaning: 'Horse' },
    { word: '牛', reading: 'ushi', meaning: 'Cow' },
    { word: '羊', reading: 'hitsuji', meaning: 'Sheep' },
    { word: '象', reading: 'zou', meaning: 'Elephant' },
    { word: '猿', reading: 'saru', meaning: 'Monkey' },
    { word: '熊', reading: 'kuma', meaning: 'Bear' },
    { word: '鹿', reading: 'shika', meaning: 'Deer' },
    { word: 'うさぎ', reading: 'usagi', meaning: 'Rabbit' },
    { word: 'キツネ', reading: 'kitsune', meaning: 'Fox' },
    { word: 'タヌキ', reading: 'tanuki', meaning: 'Raccoon dog' },
    { word: '蛇', reading: 'hebi', meaning: 'Snake' },
    { word: '海亀', reading: 'umigame', meaning: 'Sea turtle' },
    { word: 'クジラ', reading: 'kujira', meaning: 'Whale' },
    { word: 'イルカ', reading: 'iruka', meaning: 'Dolphin' }
];

const ja_a1_m8_traps = [
    { trap: 'The sakura (cherry blossom) season in Japan lasts for three months across the entire country simultaneously.', correctVersion: 'Sakura bloom for only 1-2 weeks in any single location. The "Sakura Front" moves from South to North over several weeks.', explanation: 'The blossoms are highly weather-dependent and ephemeral, which is why they are a symbol of transience in Japanese culture.' },
    { trap: 'Japanese typhoons are like pleasant rain showers that help cool down the summer heat without any risks.', correctVersion: 'Typhoons are powerful tropical storms with heavy rain and dangerous winds. They often cause flooding and transit delays.', explanation: 'While They bring rain, Japan has extensive warning systems (J-Alert) to handle the significant infrastructure risks they pose.' },
    { trap: 'The Japanese rainy season (Tsuyu) occurs in the middle of winter, bringing heavy snow to Tokyo.', correctVersion: 'Tsuyu occurs from early June to mid-July. It brings consistent rain and high humidity, not snow.', explanation: 'Tsuyu is essential for rice farming but is known for being grey and humid. Snow in Tokyo usually happens in late January or February.' }
];

// Integrity Check: Duplicates
const seenWords = new Set();
const duplicates = [];
ja_a1_m8_items.forEach(item => {
    if (seenWords.has(item.word)) {
        duplicates.push(item.word);
    }
    seenWords.add(item.word);
});

if (duplicates.length > 0) {
    console.error('❌ Duplicates found in Module 8:', duplicates);
    process.exit(1);
}

if (ja_a1_m8_items.length !== 100) {
    console.error('❌ Module 8 has ' + ja_a1_m8_items.length + ' items. Expected 100.');
    process.exit(1);
}

const moduleData = {
    id: 'ja_a1_m8',
    moduleId: 'ja_a1_m8',
    name: 'A1 Japanese - Module 8: Weather, Seasons, and Nature',
    theme: 'Weather, Seasons, and Nature',
    order: 8,
    count: 100,
    vocabularyItems: ja_a1_m8_items,
    liarGameData: { culturalTraps: ja_a1_m8_traps }
};

fs.writeFileSync('./firestore_data/ja_a1_m8.json', JSON.stringify(moduleData, null, 2));
console.log('✅ ja_a1_m8.json generated successfully.');
