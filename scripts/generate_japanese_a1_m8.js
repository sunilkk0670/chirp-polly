const fs = require('fs');

const ja_a1_m8_items = [
    // Body Parts - Head & Face (1-20)
    { word: '体', reading: 'karada', meaning: 'Body' },
    { word: '頭', reading: 'atama', meaning: 'Head' },
    { word: '顔', reading: 'kao', meaning: 'Face' },
    { word: '髪', reading: 'kami', meaning: 'Hair' },
    { word: '目', reading: 'me', meaning: 'Eye' },
    { word: '耳', reading: 'mimi', meaning: 'Ear' },
    { word: '鼻', reading: 'hana', meaning: 'Nose' },
    { word: '口', reading: 'kuchi', meaning: 'Mouth' },
    { word: '歯', reading: 'ha', meaning: 'Tooth / Teeth' },
    { word: '舌', reading: 'shita', meaning: 'Tongue' },
    { word: '喉', reading: 'nodo', meaning: 'Throat' },
    { word: '首', reading: 'kubi', meaning: 'Neck' },
    { word: '肩', reading: 'kata', meaning: 'Shoulder' },
    { word: '胸', reading: 'mune', meaning: 'Chest' },
    { word: '背中', reading: 'senaka', meaning: 'Back' },
    { word: 'お腹', reading: 'onaka', meaning: 'Stomach / Belly' },
    { word: '腰', reading: 'koshi', meaning: 'Waist / Lower back' },
    { word: 'お尻', reading: 'oshiri', meaning: 'Buttocks' },
    { word: '肌', reading: 'hada', meaning: 'Skin' },
    { word: '骨', reading: 'hone', meaning: 'Bone' },

    // Limbs & Organs (21-40)
    { word: '腕', reading: 'ude', meaning: 'Arm' },
    { word: '手', reading: 'te', meaning: 'Hand' },
    { word: '指', reading: 'yubi', meaning: 'Finger / Toe' },
    { word: '爪', reading: 'tsume', meaning: 'Nail' },
    { word: '足', reading: 'ashi', meaning: 'Leg / Foot' },
    { word: '膝', reading: 'hiza', meaning: 'Knee' },
    { word: '足首', reading: 'ashikubi', meaning: 'Ankle' },
    { word: '心臓', reading: 'shinzou', meaning: 'Heart' },
    { word: '血液', reading: 'ketsueki', meaning: 'Blood' },
    { word: '筋肉', reading: 'kinniku', meaning: 'Muscle' },
    { word: '脳', reading: 'nou', meaning: 'Brain' },
    { word: '胃', reading: 'i', meaning: 'Stomach (organ)' },
    { word: '肝臓', reading: 'kanzou', meaning: 'Liver' },
    { word: '肺', reading: 'hai', meaning: 'Lung' },
    { word: '腎臓', reading: 'jinzou', meaning: 'Kidney' },
    { word: '右手', reading: 'migite', meaning: 'Right hand' },
    { word: '左手', reading: 'hidarite', meaning: 'Left hand' },
    { word: '右足', reading: 'migiashi', meaning: 'Right foot' },
    { word: '左足', reading: 'hidariashi', meaning: 'Left foot' },
    { word: '指先', reading: 'yubisaki', meaning: 'Fingertip' },

    // Health & Sickness (41-60)
    { word: '健康', reading: 'kenkou', meaning: 'Health' },
    { word: '病気', reading: 'byouki', meaning: 'Illness / Sickness' },
    { word: '風邪', reading: 'kaze', meaning: 'Cold (illness)' },
    { word: '熱', reading: 'netsu', meaning: 'Fever' },
    { word: '咳', reading: 'seki', meaning: 'Cough' },
    { word: '頭痛', reading: 'zutsuu', meaning: 'Headache' },
    { word: '腹痛', reading: 'futsuu', meaning: 'Stomachache' },
    { word: '怪我', reading: 'kega', meaning: 'Injury' },
    { word: '痛み', reading: 'itami', meaning: 'Pain' },
    { word: '痒い', reading: 'kayui', meaning: 'Itchy' },
    { word: '痛い', reading: 'itai', meaning: 'Painful' },
    { word: '腫れる', reading: 'hareru', meaning: 'To swell' },
    { word: '疲労', reading: 'hirou', meaning: 'Fatigue' },
    { word: '目眩', reading: 'mekamai', meaning: 'Dizziness' },
    { word: '吐き気', reading: 'hakike', meaning: 'Nausea' },
    { word: 'アレルギー', reading: 'arerugii', meaning: 'Allergy' },
    { word: 'インフルエンザ', reading: 'infuruenza', meaning: 'Influenza' },
    { word: '花粉症', reading: 'kafunshou', meaning: 'Hay fever' },
    { word: '骨折', reading: 'kossetsu', meaning: 'Bone fracture' },
    { word: '火傷', reading: 'yakedo', meaning: 'Burn' },

    // Medical & Treatment (61-80)
    { word: '医者', reading: 'isha', meaning: 'Doctor' },
    { word: '看護師', reading: 'kangoshi', meaning: 'Nurse' },
    { word: '患者', reading: 'kanja', meaning: 'Patient' },
    { word: '病院', reading: 'byouin', meaning: 'Hospital' },
    { word: 'クリニック', reading: 'kurinikku', meaning: 'Clinic' },
    { word: '外科', reading: 'geka', meaning: 'Surgery department' },
    { word: '内科', reading: 'naika', meaning: 'Internal medicine' },
    { word: '眼科', reading: 'ganka', meaning: 'Ophthalmology' },
    { word: '歯科', reading: 'shika', meaning: 'Dentistry' },
    { word: '救急車', reading: 'kyuukyuusha', meaning: 'Ambulance' },
    { word: '薬', reading: 'kusuri', meaning: 'Medicine' },
    { word: '飲み薬', reading: 'nomigusuri', meaning: 'Oral medicine' },
    { word: '処方箋', reading: 'shohousen', meaning: 'Prescription' },
    { word: '注射', reading: 'chuusha', meaning: 'Injection' },
    { word: '手術', reading: 'shunjutsu', meaning: 'Surgery' },
    { word: '検査', reading: 'kensa', meaning: 'Examination / Test' },
    { word: '治療', reading: 'chiryou', meaning: 'Treatment' },
    { word: '入院', reading: 'nyuuin', meaning: 'Hospitalization' },
    { word: '退院', reading: 'taiin', meaning: 'Discharge from hospital' },
    { word: '体温計', reading: 'taionkei', meaning: 'Thermometer' },

    // Daily Health Habits (81-100)
    { word: 'マスク', reading: 'masuku', meaning: 'Mask' },
    { word: '消毒', reading: 'shoudoku', meaning: 'Disinfection' },
    { word: '石鹸', reading: 'sekken', meaning: 'Soap' },
    { word: 'タオル', reading: 'taoru', meaning: 'Towel' },
    { word: '絆創膏', reading: 'bansougou', meaning: 'Band-aid' },
    { word: '包帯', reading: 'houtai', meaning: 'Bandage' },
    { word: '湿布', reading: 'shippu', meaning: 'Compress' },
    { word: 'うがい', reading: 'ugai', meaning: 'Gargling' },
    { word: '手洗い', reading: 'tearai', meaning: 'Hand washing' },
    { word: '睡眠', reading: 'suimin', meaning: 'Sleep' },
    { word: '運動', reading: 'undou', meaning: 'Exercise' },
    { word: '食事', reading: 'shokuji', meaning: 'Meal' },
    { word: '栄養', reading: 'eiyou', meaning: 'Nutrition' },
    { word: 'ビタミン', reading: 'bitamin', meaning: 'Vitamin' },
    { word: '休息', reading: 'kyuuseki', meaning: 'Rest' },
    { word: '散歩', reading: 'sanpo', meaning: 'Walk' },
    { word: '体重', reading: 'taijuu', meaning: 'Body weight' },
    { word: '身長', reading: 'shinchou', meaning: 'Height' },
    { word: '血圧', reading: 'ketsuatsu', meaning: 'Blood pressure' },
    { word: '元気', reading: 'genki', meaning: 'Healthy / Energetic' }
];

const ja_a1_m8_traps = [
    {
        trap: 'In Japan, wearing a surgical mask in public always means you are currently contagious and should be avoided.',
        correctVersion: "Masks are often worn for hay fever, pollution, or as a courtesy even with a minor cold. It's a social norm, not just for severe illness.",
        explanation: 'Japanese mask culture emphasizes communal protection. Many wear them during flu or pollen seasons even when healthy.'
    },
    {
        trap: 'Japanese pharmacies (yakkyoku) and drugstores (doraggusutoa) are exactly the same thing.',
        correctVersion: "A 'yakkyoku' usually handles prescriptions and medical advice, while a drugstore is more like a convenience store with cosmetics and snacks.",
        explanation: 'While both sell medicine, yakkyoku are often attached to clinics and require the guidance of a pharmacist for prescription-strength items.'
    },
    {
        trap: 'You can walk into any Japanese hospital at night for a minor checkup without any extra fees.',
        correctVersion: "Emergency or after-hours visits often incur significant extra surcharges (sentei ryoyou-fu). It's better to wait for clinic hours for non-emergencies.",
        explanation: 'Japan has a tiered healthcare system. Large hospitals often charge extra for those without a referral from a local clinic to prevent overcrowding.'
    }
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

// Slice to exactly 100 items
const finalItems = ja_a1_m8_items.slice(0, 100);

if (finalItems.length !== 100) {
    console.error('❌ Module 8 has ' + finalItems.length + ' items. Expected 100.');
    process.exit(1);
}

const moduleData = {
    id: 'ja_a1_m8',
    moduleId: 'ja_a1_m8',
    name: 'A1 Japanese - Module 8: Body and Health',
    theme: 'Body and Health',
    order: 8,
    count: 100,
    vocabularyItems: finalItems,
    liarGameData: { culturalTraps: ja_a1_m8_traps }
};

fs.writeFileSync('./firestore_data/ja_a1_m8.json', JSON.stringify(moduleData, null, 2));
console.log('✅ ja_a1_m8.json generated successfully.');
