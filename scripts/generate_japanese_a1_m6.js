const fs = require('fs');

const ja_a1_m6_items = [
    // Common Places (1-20)
    { word: '場所', reading: 'basho', meaning: 'Place / Location' },
    { word: '家', reading: 'ie / uchi', meaning: 'House / Home' },
    { word: '部屋', reading: 'heya', meaning: 'Room' },
    { word: '学校', reading: 'gakkou', meaning: 'School' },
    { word: '教室', reading: 'kyoushitsu', meaning: 'Classroom' },
    { word: '大学', reading: 'daigaku', meaning: 'University' },
    { word: '会社', reading: 'kaisha', meaning: 'Company / Office' },
    { word: '事務所', reading: 'jimusho', meaning: 'Office' },
    { word: '病院', reading: 'byouin', meaning: 'Hospital' },
    { word: '薬局', reading: 'yakkyoku', meaning: 'Pharmacy' },
    { word: '銀行', reading: 'ginkou', meaning: 'Bank' },
    { word: '郵便局', reading: 'yuubinkyoku', meaning: 'Post office' },
    { word: '図書館', reading: 'toshokan', meaning: 'Library' },
    { word: '美術館', reading: 'bijutsukan', meaning: 'Art museum' },
    { word: '博物館', reading: 'hakubutsukan', meaning: 'Museum' },
    { word: '映画館', reading: 'eigakan', meaning: 'Movie theater' },
    { word: '劇場', reading: 'gekijou', meaning: 'Theater' },
    { word: '公園', reading: 'kouen', meaning: 'Park' },
    { word: '動物園', reading: 'doubutsuen', meaning: 'Zoo' },
    { word: '水族館', reading: 'suizokukan', meaning: 'Aquarium' },

    // Shopping & Food (21-40)
    { word: '店', reading: 'mise', meaning: 'Shop / Store' },
    { word: '本屋', reading: 'honya', meaning: 'Bookstore' },
    { word: '花屋', reading: 'hanaya', meaning: 'Flower shop' },
    { word: 'パン屋', reading: 'panya', meaning: 'Bakery' },
    { word: '八百屋', reading: 'yaoya', meaning: 'Greengrocer' },
    { word: '肉屋', reading: 'nikuya', meaning: 'Butcher' },
    { word: '鱼屋', reading: 'sakanaya', meaning: 'Fishmonger' },
    { word: '薬屋', reading: 'kusuriya', meaning: 'Pharmacy / Drugstore' },
    { word: 'スーパー', reading: 'suupaa', meaning: 'Supermarket' },
    { word: 'デパート', reading: 'depaato', meaning: 'Department store' },
    { word: 'コンビニ', reading: 'konbini', meaning: 'Convenience store' },
    { word: '市場', reading: 'ichiba / shijou', meaning: 'Market' },
    { word: '食堂', reading: 'shokudou', meaning: 'Dining hall / Cafeteria' },
    { word: '喫茶店', reading: 'kissaten', meaning: 'Coffee shop / Cafe' },
    { word: '居酒屋', reading: 'izakaya', meaning: 'Japanese style pub' },
    { word: 'バー', reading: 'baa', meaning: 'Bar' },
    { word: '工場', reading: 'koujou', meaning: 'Factory' },
    { word: '駐車場', reading: 'chuushajou', meaning: 'Parking lot' },
    { word: 'ガソリンスタンド', reading: 'gasorin sutando', meaning: 'Gas station' },
    { word: '美容院', reading: 'biyouin', meaning: 'Hair salon' },

    // Transportation (41-60)
    { word: '駅', reading: 'eki', meaning: 'Station' },
    { word: '地下鉄', reading: 'chikatetsu', meaning: 'Subway' },
    { word: '新幹線', reading: 'shinkansen', meaning: 'Bullet train' },
    { word: 'バス停', reading: 'basutei', meaning: 'Bus stop' },
    { word: '空港', reading: 'kuukou', meaning: 'Airport' },
    { word: '港', reading: 'minato', meaning: 'Port / Harbor' },
    { word: '道路', reading: 'douro', meaning: 'Road' },
    { word: '交差点', reading: 'kousaten', meaning: 'Intersection' },
    { word: '角', reading: 'kado', meaning: 'Corner' },
    { word: '信号', reading: 'shingou', meaning: 'Traffic light' },
    { word: '橋', reading: 'hashi', meaning: 'Bridge' },
    { word: '踏切', reading: 'fumikiri', meaning: 'Railway crossing' },
    { word: '階段', reading: 'kaidan', meaning: 'Stairs' },
    { word: 'エレベーター', reading: 'erebeetaa', meaning: 'Elevator' },
    { word: 'エスカレーター', reading: 'esukareetaa', meaning: 'Escalator' },
    { word: '入口', reading: 'iriguchi', meaning: 'Entrance' },
    { word: '出口', reading: 'deguchi', meaning: 'Exit' },
    { word: '受付', reading: 'uketsuke', meaning: 'Reception' },
    { word: '案内所', reading: 'annaijou', meaning: 'Information desk' },
    { word: 'トイレ', reading: 'toire', meaning: 'Toilet / Restroom' },

    // City & Country (61-80)
    { word: '町', reading: 'machi', meaning: 'Town / City' },
    { word: '村', reading: 'mura', meaning: 'Village' },
    { word: '都', reading: 'miyako', meaning: 'Capital / Metropolis' },
    { word: '都道府県', reading: 'todou fuken', meaning: 'Prefectures of Japan' },
    { word: '都心', reading: 'toushin', meaning: 'City center' },
    { word: '郊外', reading: 'kougai', meaning: 'Suburbs' },
    { word: '田舎', reading: 'inaka', meaning: 'Countryside' },
    { word: '外国', reading: 'gaikoku', meaning: 'Foreign country' },
    { word: '海', reading: 'umi', meaning: 'Sea / Ocean' },
    { word: '山', reading: 'yama', meaning: 'Mountain' },
    { word: '川', reading: 'kawa', meaning: 'River' },
    { word: '湖', reading: 'mizuumi', meaning: 'Lake' },
    { word: '池', reading: 'ike', meaning: 'Pond' },
    { word: '森', reading: 'mori', meaning: 'Forest' },
    { word: '林', reading: 'hayashi', meaning: 'Woods' },
    { word: '島', reading: 'shima', meaning: 'Island' },
    { word: '畑', reading: 'hatake', meaning: 'Field / Farm' },
    { word: '寺', reading: 'tera', meaning: 'Temple' },
    { word: '神社', reading: 'jinja', meaning: 'Shrine' },
    { word: '教会', reading: 'kyoukai', meaning: 'Church' },

    // Positions & Directions (81-100)
    { word: 'どこ', reading: 'doko', meaning: 'Where' },
    { word: 'ここ', reading: 'koko', meaning: 'Here' },
    { word: 'そこ', reading: 'soko', meaning: 'There' },
    { word: 'あそこ', reading: 'asoko', meaning: 'Over there' },
    { word: '前', reading: 'mae', meaning: 'Front / Before' },
    { word: '後ろ', reading: 'ushiro', meaning: 'Behind' },
    { word: '横', reading: 'yoko', meaning: 'Side / Next to' },
    { word: '右', reading: 'migi', meaning: 'Right' },
    { word: '左', reading: 'hidari', meaning: 'Left' },
    { word: '隣', reading: 'tonari', meaning: 'Neighbor / Next door' },
    { word: 'そば', reading: 'soba', meaning: 'Near / Beside' },
    { word: '近く', reading: 'chikaku', meaning: 'Close / Nearby' },
    { word: '遠く', reading: 'tooku', meaning: 'Far away' },
    { word: '上', reading: 'ue', meaning: 'Above / Up' },
    { word: '下', reading: 'shita', meaning: 'Below / Down' },
    { word: '中', reading: 'naka', meaning: 'Inside / Middle' },
    { word: '外', reading: 'soto', meaning: 'Outside' },
    { word: '北', reading: 'kita', meaning: 'North' },
    { word: '南', reading: 'minami', meaning: 'South' },
    { word: '東', reading: 'higashi', meaning: 'East' }
];

const ja_a1_m6_traps = [
    { trap: 'Japanese temples and shrines are the same thing and can be called interchangeably.', correctVersion: 'Temples (O-tera) are Buddhist, while Shrines (Jinja) are Shinto. They have distinct features like torii gates for shrines.', explanation: 'While many Japanese practice both, the traditions and physical structures are distinct. Torii gates mark shrines, while large gates (mon) and statues of Buddha mark temples.' },
    { trap: 'You should always tip the waiter in Japanese restaurants to show appreciation.', correctVersion: 'Tipping is not practiced in Japan and can even be seen as confusing or rude. The price on the bill is all you pay.', explanation: 'Service is considered part of the hospitality (*omotenashi*). Leaving extra cash may result in the waiter chasing you down to return the "forgotten" money.' },
    { trap: 'Public trash cans are found on every street corner in Japanese cities.', correctVersion: 'Public trash cans are surprisingly rare in Japan. People are expected to carry their trash home with them.', explanation: 'This is part of the communal responsibility for cleanliness. You will mostly find trash cans only near vending machines or convenience stores.' }
];

// Integrity Check: Duplicates
const seenWords = new Set();
const duplicates = [];
ja_a1_m6_items.forEach(item => {
    if (seenWords.has(item.word)) {
        duplicates.push(item.word);
    }
    seenWords.add(item.word);
});

if (duplicates.length > 0) {
    console.error('❌ Duplicates found in Module 6:', duplicates);
    process.exit(1);
}

if (ja_a1_m6_items.length !== 100) {
    console.log('Current length:', ja_a1_m6_items.length);
    console.error('❌ Module 6 must have exactly 100 items.');
    process.exit(1);
}

const moduleData = {
    id: 'ja_a1_m6',
    moduleId: 'ja_a1_m6',
    name: 'A1 Japanese - Module 6: Places and Locations',
    theme: 'Places and Locations',
    order: 6,
    count: 100,
    vocabularyItems: ja_a1_m6_items,
    liarGameData: { culturalTraps: ja_a1_m6_traps }
};

fs.writeFileSync('./firestore_data/ja_a1_m6.json', JSON.stringify(moduleData, null, 2));
console.log('✅ ja_a1_m6.json generated successfully.');
