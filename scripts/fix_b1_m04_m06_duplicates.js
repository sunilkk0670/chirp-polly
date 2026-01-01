const fs = require('fs');

// Load all modules
const m04 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m04.json', 'utf8'));
const m05 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m05.json', 'utf8'));
const m06 = JSON.parse(fs.readFileSync('firestore_data/ja_b1_m06.json', 'utf8'));

// Replacements for M04 (Media & Advertising)
const m04Replacements = {
    '謝罪': { word: '弁解', reading: 'benkai', meaning: 'Excuse/Justification', example_sentence: '不適切な行動を弁解する反面、責任逃れと受け取られるリスクもあります。' },
    '補償': { word: '填補', reading: 'tenpo', meaning: 'Compensation/Filling', example_sentence: '損失を填補することによって、信頼回復を図ります。' },
    '敬意': { word: '敬服', reading: 'keifuku', meaning: 'Admiration/Respect', example_sentence: '先輩の努力に敬服するうちに、自らも奮起しました。' },
    '平等': { word: '対等', reading: 'taitou', meaning: 'Equality/Parity', example_sentence: '対等な立場で交渉する反面、力関係の差は歴然としています。' },
    '偏見': { word: '色眼鏡', reading: 'iromegane', meaning: 'Prejudice/Bias', example_sentence: '色眼鏡で見ることなく、公平に評価することが大切です。' },
    '常識': { word: '定説', reading: 'teisetsu', meaning: 'Established theory', example_sentence: '定説を覆す発見によって、学界が騒然としました。' },
    '報道': { word: '報じる', reading: 'houjiru', meaning: 'To report', example_sentence: '事件を速報で報じることによって、社会の注目が集まりました。' },
    '賠償': { word: '償い', reading: 'tsugunai', meaning: 'Atonement/Compensation', example_sentence: '過ちの償いをするうちに、被害者との和解が進みました。' },
    '告発': { word: '訴追', reading: 'sotsui', meaning: 'Prosecution/Indictment', example_sentence: '不正を訴追することによって、組織の浄化を図ります。' },
    '固定観念': { word: '既成概念', reading: 'kiseigainen', meaning: 'Preconceived notion', example_sentence: '既成概念を打破するうちに、革新的なアイデアが生まれました。' }
};

// Replacements for M05 (Law & Justice)
const m05Replacements = {
    '契約': { word: '約定', reading: 'yakujou', meaning: 'Agreement/Contract', example_sentence: '約定を遵守することによって、商取引の信頼性が保たれます。' },
    '審判': { word: '裁定', reading: 'saitei', meaning: 'Ruling/Decision', example_sentence: '第三者による裁定を仰ぐうちに、紛争の解決策が見えてきました。' },
    '矯正': { word: '教化', reading: 'kyouka', meaning: 'Edification/Reformation', example_sentence: '受刑者を教化することによって、社会復帰を支援します。' },
    '倒産': { word: '破綻', reading: 'hatan', meaning: 'Bankruptcy/Collapse', example_sentence: '経営が破綻するうちに、多くの債権者が損失を被りました。' },
    '犯罪': { word: '犯行', reading: 'hankou', meaning: 'Criminal act', example_sentence: '犯行の動機を解明することによって、再発防止策を講じます。' },
    '裁判': { word: '公判', reading: 'kouhan', meaning: 'Public trial', example_sentence: '公判が開かれることによって、事件の詳細が明らかになります。' },
    '逮捕': { word: '検挙', reading: 'kenkyo', meaning: 'Arrest/Apprehension', example_sentence: '容疑者を検挙することによって、捜査が大きく前進しました。' },
    '容疑者': { word: '被疑者', reading: 'higisha', meaning: 'Suspect', example_sentence: '被疑者の権利を保護する反面、真実の究明も進めます。' },
    '判決': { word: '宣告', reading: 'senkoku', meaning: 'Sentence/Pronouncement', example_sentence: '刑を宣告されることによって、法的責任が確定します。' },
    '更生': { word: '改心', reading: 'kaishin', meaning: 'Reformation/Repentance', example_sentence: '罪を悔いて改心するうちに、新たな人生を歩み始めました。' },
    '仲裁': { word: '調整', reading: 'chousei', meaning: 'Mediation/Coordination', example_sentence: '利害を調整することによって、双方が納得できる解決策を見出します。' },
    '棄却': { word: '却下', reading: 'kyakka', meaning: 'Rejection/Dismissal', example_sentence: '申立てが却下される反面、別の法的手段を検討します。' }
};

// Replacements for M06 (Psychology)
const m06Replacements = {
    '妥協': { word: '折衷', reading: 'setchuu', meaning: 'Compromise/Eclecticism', example_sentence: '両案を折衷することによって、双方が受け入れられる案を作成しました。' },
    '執着': { word: '固執', reading: 'koshitsu', meaning: 'Adherence/Persistence', example_sentence: '過去の成功に固執するうちに、新たな可能性を見逃してしまいました。' },
    '倫理': { word: '道義', reading: 'dougi', meaning: 'Morality/Ethics', example_sentence: '道義的な責任を果たす反面、法的義務とは異なることもあります。' },
    '傲慢': { word: '高慢', reading: 'kouman', meaning: 'Pride/Arrogance', example_sentence: '高慢な態度を改めるうちに、周囲との関係が改善されました。' },
    '憐憫': { word: '哀憐', reading: 'airen', meaning: 'Pity/Compassion', example_sentence: '哀憐の情を抱く反面、相手の自立を妨げないよう配慮します。' },
    '悟り': { word: '会得', reading: 'etoku', meaning: 'Comprehension/Mastery', example_sentence: '技術を会得することによって、プロとしての自信が生まれました。' },
    '洞察': { word: '察知', reading: 'sacchi', meaning: 'Perception/Detection', example_sentence: '相手の本心を察知するうちに、適切な対応ができるようになりました。' },
    '調和': { word: '釣合', reading: 'tsuriai', meaning: 'Balance/Harmony', example_sentence: '全体の釣合を考える反面、個々の特性も尊重します。' },
    '衝突': { word: '抗争', reading: 'kousou', meaning: 'Conflict/Struggle', example_sentence: '派閥間の抗争が激化するうちに、組織全体が混乱しました。' },
    '覚醒': { word: '目覚め', reading: 'mezame', meaning: 'Awakening', example_sentence: '社会問題への目覚めを経験するうちに、行動を起こす決意をしました。' },
    '先入観': { word: '思い込み', reading: 'omoikomi', meaning: 'Assumption/Preconception', example_sentence: '思い込みを捨てるうちに、新たな視点が得られました。' },
    '自覚': { word: '自認', reading: 'jinin', meaning: 'Self-recognition', example_sentence: '自らの役割を自認することによって、責任感が芽生えました。' },
    '理解': { word: '把握', reading: 'haaku', meaning: 'Grasp/Understanding', example_sentence: '状況を正確に把握するうちに、適切な判断ができるようになりました。' },
    '没頭': { word: '傾注', reading: 'keichuu', meaning: 'Devotion/Concentration', example_sentence: '研究に全精力を傾注する反面、健康管理も怠ってはなりません。' },
    '好奇心': { word: '探究心', reading: 'tankyuushin', meaning: 'Inquisitiveness', example_sentence: '探究心を持ち続けることによって、新たな発見に繋がります。' },
    '譲歩': { word: '歩み寄り', reading: 'ayumiyori', meaning: 'Compromise/Concession', example_sentence: '双方が歩み寄ることによって、合意に達することができました。' },
    '差別': { word: '差異', reading: 'sai', meaning: 'Difference/Distinction', example_sentence: '個人差を認めつつ、不当な差異は是正すべきです。' },
    '蓄積': { word: '累積', reading: 'ruiseki', meaning: 'Accumulation/Buildup', example_sentence: '小さな不満が累積するうちに、大きな問題に発展しました。' },
    '拡散': { word: '伝播', reading: 'denpa', meaning: 'Propagation/Spread', example_sentence: '情報が瞬時に伝播することによって、社会への影響が拡大します。' },
    '摩擦': { word: '軋轢', reading: 'atsureki', meaning: 'Friction/Discord', example_sentence: '組織内の軋轢が生じる反面、それを乗り越えることで結束が強まります。' },
    '識別': { word: '判別', reading: 'hanbetsu', meaning: 'Discrimination/Distinction', example_sentence: '真偽を判別するうちに、批判的思考力が養われます。' }
};

// Apply replacements
Object.keys(m04Replacements).forEach(oldWord => {
    const idx = m04.vocabularyItems.findIndex(item => item.word === oldWord);
    if (idx !== -1) {
        m04.vocabularyItems[idx] = m04Replacements[oldWord];
        console.log(`M04: Replaced "${oldWord}" with "${m04Replacements[oldWord].word}"`);
    }
});

Object.keys(m05Replacements).forEach(oldWord => {
    const idx = m05.vocabularyItems.findIndex(item => item.word === oldWord);
    if (idx !== -1) {
        m05.vocabularyItems[idx] = m05Replacements[oldWord];
        console.log(`M05: Replaced "${oldWord}" with "${m05Replacements[oldWord].word}"`);
    }
});

Object.keys(m06Replacements).forEach(oldWord => {
    const idx = m06.vocabularyItems.findIndex(item => item.word === oldWord);
    if (idx !== -1) {
        m06.vocabularyItems[idx] = m06Replacements[oldWord];
        console.log(`M06: Replaced "${oldWord}" with "${m06Replacements[oldWord].word}"`);
    }
});

// Save updated files
fs.writeFileSync('firestore_data/ja_b1_m04.json', JSON.stringify(m04, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m05.json', JSON.stringify(m05, null, 4));
fs.writeFileSync('firestore_data/ja_b1_m06.json', JSON.stringify(m06, null, 4));

console.log('\n✅ All duplicates fixed!');
