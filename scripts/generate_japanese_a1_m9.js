const fs = require('fs');

const ja_a1_m9_items = [
    // Head & Face (1-15)
    { word: '体', reading: 'karada', meaning: 'Body' },
    { word: '頭', reading: 'atama', meaning: 'Head' },
    { word: '顔', reading: 'kao', meaning: 'Face' },
    { word: '髪', reading: 'kami', meaning: 'Hair' },
    { word: '目', reading: 'me', meaning: 'Eye' },
    { word: '耳', reading: 'mimi', meaning: 'Ear' },
    { word: '鼻', reading: 'hana', meaning: 'Nose' },
    { word: '口', reading: 'kuchi', meaning: 'Mouth' },
    { word: '歯', reading: 'ha', meaning: 'Tooth / Teeth' },
    { word: '唇', reading: 'kuchibiru', meaning: 'Lip' },
    { word: '舌', reading: 'shita', meaning: 'Tongue' },
    { word: '喉', reading: 'nodo', meaning: 'Throat' },
    { word: '首', reading: 'kubi', meaning: 'Neck' },
    { word: '眉毛', reading: 'mayuge', meaning: 'Eyebrow' },
    { word: '頬', reading: 'hoo / hoho', meaning: 'Cheek' },

    // Limbs & Lower Body (16-40)
    { word: '肩', reading: 'kata', meaning: 'Shoulder' },
    { word: '胸', reading: 'mune', meaning: 'Chest' },
    { word: '背中', reading: 'senaka', meaning: 'Back' },
    { word: '腰', reading: 'koshi', meaning: 'Waist / Lower back' },
    { word: 'お腹', reading: 'onaka', meaning: 'Stomach / Belly' },
    { word: 'お尻', reading: 'oshiri', meaning: 'Buttocks' },
    { word: '腕', reading: 'ude', meaning: 'Arm' },
    { word: '手', reading: 'te', meaning: 'Hand' },
    { word: '手首', reading: 'tekubi', meaning: 'Wrist' },
    { word: '指', reading: 'yubi', meaning: 'Finger / Toe' },
    { word: '爪', reading: 'tsume', meaning: 'Nail' },
    { word: '足', reading: 'ashi', meaning: 'Leg / Foot' },
    { word: '膝', reading: 'hiza', meaning: 'Knee' },
    { word: '足首', reading: 'ashikubi', meaning: 'Ankle' },
    { word: '筋肉', reading: 'kinniku', meaning: 'Muscle' },
    { word: '骨', reading: 'hone', meaning: 'Bone' },
    { word: '皮膚', reading: 'hifu', meaning: 'Skin' },
    { word: '肘', reading: 'hiji', meaning: 'Elbow' },
    { word: '踵', reading: 'kakato', meaning: 'Heel' },
    { word: '脇', reading: 'waki', meaning: 'Armpit' },
    { word: '親指', reading: 'oyayubi', meaning: 'Thumb' },
    { word: '人差し指', reading: 'hitosashiyubi', meaning: 'Index finger' },
    { word: '中指', reading: 'nakayubi', meaning: 'Middle finger' },
    { word: '薬指', reading: 'kusuriyubi', meaning: 'Ring finger' },
    { word: '小指', reading: 'koyubi', meaning: 'Little finger' },

    // Organs & Internal (41-60)
    { word: '心臓', reading: 'shinzou', meaning: 'Heart' },
    { word: '血液', reading: 'ketsueki', meaning: 'Blood' },
    { word: '脳', reading: 'nou', meaning: 'Brain' },
    { word: '胃', reading: 'i', meaning: 'Stomach (organ)' },
    { word: '肺', reading: 'hai', meaning: 'Lung' },
    { word: '肝臓', reading: 'kanzou', meaning: 'Liver' },
    { word: '腎臓', reading: 'jinzou', meaning: 'Kidney' },
    { word: '腸', reading: 'chou', meaning: 'Intestines' },
    { word: '神経', reading: 'shinkei', meaning: 'Nerve' },
    { word: '血管', reading: 'kekkan', meaning: 'Blood vessel' },
    { word: '呼吸', reading: 'kokyuu', meaning: 'Breathing' },
    { word: '消化', reading: 'shouka', meaning: 'Digestion' },
    { word: '汗', reading: 'ase', meaning: 'Sweat' },
    { word: '涙', reading: 'namida', meaning: 'Tear' },
    { word: '唾液', reading: 'daeki', meaning: 'Saliva' },
    { word: '脈', reading: 'myaku', meaning: 'Pulse' },
    { word: '体温', reading: 'taion', meaning: 'Body temperature' },
    { word: '血圧', reading: 'ketsuatsu', meaning: 'Blood pressure' },
    { word: '右側', reading: 'migigawa', meaning: 'Right side' },
    { word: '左側', reading: 'hidarigawa', meaning: 'Left side' },

    // Health & Sickness (61-84)
    { word: '健康', reading: 'kenkou', meaning: 'Health' },
    { word: '病気', reading: 'byouki', meaning: 'Illness / Sickness' },
    { word: '風邪', reading: 'kaze', meaning: 'Cold (illness)' },
    { word: '熱', reading: 'netsu', meaning: 'Fever' },
    { word: '咳', reading: 'seki', meaning: 'Cough' },
    { word: '頭痛', reading: 'zutsuu', meaning: 'Headache' },
    { word: '腹痛', reading: 'futsuu', meaning: 'Stomachache' },
    { word: '腰痛', reading: 'youtsuu', meaning: 'Lower back pain' },
    { word: '痛み', reading: 'itami', meaning: 'Pain' },
    { word: '怪我', reading: 'kega', meaning: 'Injury' },
    { word: '出血', reading: 'shukketsu', meaning: 'Bleeding' },
    { word: '骨折', reading: 'kossetsu', meaning: 'Bone fracture' },
    { word: '火傷', reading: 'yakedo', meaning: 'Burn' },
    { word: '痒い', reading: 'kayui', meaning: 'Itchy' },
    { word: 'アレルギー', reading: 'arerugii', meaning: 'Allergy' },
    { word: 'インフルエンザ', reading: 'infuruenza', meaning: 'Influenza' },
    { word: '花粉症', reading: 'kafunshou', meaning: 'Hay fever' },
    { word: '吐き気', reading: 'hakike', meaning: 'Nausea' },
    { word: '目眩', reading: 'mekamai', meaning: 'Dizziness' },
    { word: '腫れ', reading: 'hare', meaning: 'Swelling' },
    { word: '震え', reading: 'furue', meaning: 'Shivering / Trembling' },
    { word: '痺れ', reading: 'shibure', meaning: 'Numbness' },
    { word: '倦怠感', reading: 'kentaikan', meaning: 'Fatigue / Lassitude' },
    { word: '元気', reading: 'genki', meaning: 'Healthy / Fine' },

    // Medical Treatments & Tools (85-100)
    { word: '病院', reading: 'byouin', meaning: 'Hospital' },
    { word: 'クリニック', reading: 'kurinikku', meaning: 'Clinic' },
    { word: '医者', reading: 'isha', meaning: 'Doctor' },
    { word: '看護師', reading: 'kangoshi', meaning: 'Nurse' },
    { word: '患者', reading: 'kanja', meaning: 'Patient' },
    { word: '救急車', reading: 'kyuukyuusha', meaning: 'Ambulance' },
    { word: '薬', reading: 'kusuri', meaning: 'Medicine' },
    { word: '飲み薬', reading: 'nomigusuri', meaning: 'Oral medicine' },
    { word: '塗り薬', reading: 'nurigusuri', meaning: 'Ointment' },
    { word: '注射', reading: 'chuusha', meaning: 'Injection' },
    { word: '処方箋', reading: 'shohousen', meaning: 'Prescription' },
    { word: '手術', reading: 'shunjutsu', meaning: 'Surgery' },
    { word: '包帯', reading: 'houtai', meaning: 'Bandage' },
    { word: '絆創膏', reading: 'bansougou', meaning: 'Band-aid' },
    { word: '湿布', reading: 'shippu', meaning: 'Compress' },
    { word: '体温計', reading: 'taionkei', meaning: 'Thermometer' }
];

const ja_a1_m9_traps = [
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
ja_a1_m9_items.forEach(item => {
    if (seenWords.has(item.word)) {
        duplicates.push(item.word);
    }
    seenWords.add(item.word);
});

if (duplicates.length > 0) {
    console.error('❌ Duplicates found in Module 9:', duplicates);
    process.exit(1);
}

if (ja_a1_m9_items.length !== 100) {
    console.error('❌ Module 9 has ' + ja_a1_m9_items.length + ' items. Expected 100.');
    process.exit(1);
}

const moduleData = {
    id: 'ja_a1_m9',
    moduleId: 'ja_a1_m9',
    name: 'A1 Japanese - Module 9: Body Parts and Basic Health',
    theme: 'Body Parts and Basic Health',
    order: 9,
    count: 100,
    vocabularyItems: ja_a1_m9_items,
    liarGameData: { culturalTraps: ja_a1_m9_traps }
};

fs.writeFileSync('./firestore_data/ja_a1_m9.json', JSON.stringify(moduleData, null, 2));
console.log('✅ ja_a1_m9.json generated successfully.');
