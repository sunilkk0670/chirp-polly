const fs = require('fs');
const path = require('path');

const a1Files = ['ja_a1_m1.json', 'ja_a1_m2.json', 'ja_a1_m3.json', 'ja_a1_m4.json', 'ja_a1_m5.json', 'ja_a1_m6.json', 'ja_a1_m7.json', 'ja_a1_m8.json', 'ja_a1_m9.json', 'ja_a1_m10.json'];
const a2Files = ['ja_a2_m11.json', 'ja_a2_m12.json', 'ja_a2_m13.json', 'ja_a2_m14.json', 'ja_a2_m15.json', 'ja_a2_m16.json', 'ja_a2_m17.json', 'ja_a2_m18.json', 'ja_a2_m19.json', 'ja_a2_m20.json'];
const b1FilesPrev = ['ja_b1_m01.json', 'ja_b1_m02.json', 'ja_b1_m03.json', 'ja_b1_m04.json', 'ja_b1_m05.json', 'ja_b1_m06.json'];
const b1FilesNew = ['ja_b1_m07.json', 'ja_b1_m08.json', 'ja_b1_m09.json', 'ja_b1_m10.json'];

const masterSet = new Set();

function addToMaster(file) {
    if (!fs.existsSync(path.join('firestore_data', file))) return;
    const data = JSON.parse(fs.readFileSync(path.join('firestore_data', file), 'utf8'));
    data.vocabularyItems.forEach(item => masterSet.add(item.word));
}

[...a1Files, ...a2Files, ...b1FilesPrev].forEach(f => addToMaster(f));

console.log('Initial Master Blacklist Size:', masterSet.size);

const n3Pool = [
    { word: "恩恵", reading: "onkei", meaning: "Benefit/Blessing", example_sentence: "自然の恩恵を受ける反面、災害の脅威にも常に備えなければなりません。" },
    { word: "介入", reading: "kainyuu", meaning: "Intervention", example_sentence: "政府が介入することによって、市場の混乱を最小限に抑え込みました。" },
    { word: "介護", reading: "kaigo", meaning: "Nursing care", example_sentence: "介護を続けるうちに、精神的なゆとりの重要性を再認識しました。" },
    { word: "該当", reading: "gaitou", meaning: "Corresponding", example_sentence: "条件に該当する反面、提出書類の不備で受理されないケースもあります。" },
    { word: "改訂", reading: "kaitei", meaning: "Revision", example_sentence: "教科書を改訂することによって、最新の科学的知見を反映させます。" },
    { word: "格納", reading: "kakunou", meaning: "Storage/Housing", example_sentence: "機体を格納するうちに、機材の整理整頓の大切さを学びました。" },
    { word: "獲得", reading: "kakutoku", meaning: "Acquisition", example_sentence: "メダルを獲得する反面、そこに至るまでの過酷な練習は想像を絶します。" },
    { word: "喝采", reading: "kassai", meaning: "Applause/Cheers", example_sentence: "喝采を浴びることによって、これまでの努力が報われたと実感しました。" },
    { word: "合併", reading: "gappei", meaning: "Merger/Combination", example_sentence: "企業が合併するうちに、組織文化の融合が大きな課題となりました。" },
    { word: "滑走", reading: "kassou", meaning: "Gliding/Sliding", example_sentence: "氷上を滑走する反面、転倒による怪我のリスクも常に付きまといます。" },
    { word: "活性", reading: "kassei", meaning: "Activity/Activation", example_sentence: "地域を活性化することによって、若者の流出を食い止めることができます。" },
    { word: "過剰", reading: "kajou", meaning: "Excess", example_sentence: "過剰な包装を控えるうちに、環境への意識が自然と高まってきました。" },
    { word: "稼働", reading: "kadou", meaning: "Operation", example_sentence: "工場がフル稼働する反面、電力消費の増大が懸念材料となっています。" },
    { word: "箇条書き", reading: "kajougaki", meaning: "Itemized list", example_sentence: "要点を箇条書きにすることによって、情報の整理が格段に早くなります。" },
    { word: "果敢", reading: "kakan", meaning: "Brave/Resolute", example_sentence: "難局に果敢に挑むうちに、新たな可能性が少しずつ見えてきました。" },
    { word: "管轄", reading: "kankatsu", meaning: "Jurisdiction", example_sentence: "管轄を明確にする反面、縦割り行政の弊害も指摘されています。" },
    { word: "看過", reading: "kanka", meaning: "Pass over/Overlook", example_sentence: "重大なミスを看過することによって、取り返しのつかない事態を招きました。" },
    { word: "含蓄", reading: "ganchiku", meaning: "Significance/Implication", example_sentence: "含蓄のある言葉に触れるうちに、人生の深みについて考えさせられました。" },
    { word: "還元", reading: "kangen", meaning: "Resolution/Reduction/Return", example_sentence: "利益を社会に還元する反面、株主への配当とのバランスも重要です。" },
    { word: "慣行", reading: "kankou", meaning: "Customary practice", example_sentence: "商慣行を見直すことによって、取引の透明性を高めていきます。" },
    { word: "勧告", reading: "kankoku", meaning: "Advice/Counsel", example_sentence: "是正勧告を受けるうちに、社内体制の不備が次々と露呈しました。" },
    { word: "観測", reading: "kansoku", meaning: "Observation", example_sentence: "気象を観測する反面、予報が外れた際の社会的影響も考慮します。" },
    { word: "甘受", reading: "kanju", meaning: "Be resigned to", example_sentence: "厳しい条件を甘受することによって、交渉を辛うじて成立させました。" },
    { word: "勘案", reading: "kan'an", meaning: "Taking into consideration", example_sentence: "諸事情を勘案するうちに、当初の計画を大幅に変更することにしました。" },
    { word: "官僚", reading: "kanryou", meaning: "Bureaucracy", example_sentence: "官僚制度を刷新する反面、行政の継続性をどう担保するかが課題です。" },
    { word: "慣例", reading: "kanrei", meaning: "Custom/Precedent", example_sentence: "慣例に従うことによって、組織の秩序を維持しようとしてきました。" },
    { word: "寛容", reading: "kan'you", meaning: "Tolerance/Generosity", example_sentence: "他者に寛容であるうちに、心のゆとりが周囲にも伝わっていきました。" },
    { word: "既往", reading: "kiou", meaning: "Past history", example_sentence: "既往歴を確認することによって、最適な治療方針を決定します。" },
    { word: "危害", reading: "kigai", meaning: "Hazard/Harm", example_sentence: "危害を及ぼすうちに、社会的な制裁を受けることになりかねません。" },
    { word: "棄却", reading: "kikyaku", meaning: "Rejection/Dismissal", example_sentence: "請求を棄却する反面、判決理由には和解への含みも持たされました。" },
    { word: "規格", reading: "kikaku", meaning: "Standard/Norm", example_sentence: "世界規格を統一することによって、貿易の更なる活性化を図ります。" },
    { word: "技巧", reading: "gikou", meaning: "Technique/Finesse", example_sentence: "技巧を凝らすうちに、作品そのものが持つ純粋さが失われてしまいました。" },
    { word: "寄稿", reading: "kikou", meaning: "Contribution (to a magazine)", example_sentence: "雑誌に寄稿するうちに、自分の考えを整理する良い機会となりました。" },
    { word: "起点", reading: "kiten", meaning: "Starting point", example_sentence: "ここを起点とすることによって、新しい探検のルートが開かれました。" },
    { word: "機能", reading: "kinou", meaning: "Function", example_sentence: "新機能を搭載するうちに、操作が複雑になりすぎるという弊害が出ました。" },
    { word: "機微", reading: "kibi", meaning: "Subtleties", example_sentence: "人情の機微に触れる反面、社会の非情さも同時に学ぶことになりました。" },
    { word: "急務", reading: "kyuumu", meaning: "Urgent business", example_sentence: "対策が急務であるうちに、実行可能なプランを早急に策定します。" },
    { word: "窮状", reading: "kyuujou", meaning: "Distress/Plight", example_sentence: "被災者の窮状を訴える反面、支援物資の配分が滞っている現状もあります。" },
    { word: "驚異", reading: "kyouyi", meaning: "Wonder/Miracle", example_sentence: "生命の驚異を目の当たりにする反面、その脆さについても考えさせられます。" },
    { word: "郷里", reading: "kyouri", meaning: "Birthplace/Home town", example_sentence: "郷里を離れることによって、故郷の良さを改めて知ることになりました。" },
    { word: "享楽", reading: "kyouraku", meaning: "Enjoyment/Pleasure", example_sentence: "享楽に耽るうちに、本来の目的を忘れてしまうことは避けたい。" },
    { word: "境遇", reading: "kyouguu", meaning: "Environment/Circumstance", example_sentence: "過酷な境遇に耐える反面、持ち前の前向きさで希望を失いませんでした。" },
    { word: "強要", reading: "kyouyou", meaning: "Compulsion/Coercion", example_sentence: "意見を強要することによって、部下との信頼関係が完全に失われてしまいました。" },
    { word: "局面", reading: "kyokumen", meaning: "Phase/Situation", example_sentence: "新しい局面に差し掛かるうちに、当初の目標を再確認する必要が出てきました。" },
    { word: "虚偽", reading: "kyogi", meaning: "Falsehood/Fallacy", example_sentence: "虚偽の報告をする反面、いずれ露呈することへの不安も消えませんでした。" },
    { word: "挙行", reading: "kyokou", meaning: "Celebration/Performance", example_sentence: "式典を挙行することによって、正式に新しいプロジェクトがスタートしました。" },
    { word: "挙動", reading: "kyodou", meaning: "Behavior/Conduct", example_sentence: "不審な挙動を監視するうちに、背後に潜む大きな陰謀に気づきました。" },
    { word: "拒否", reading: "kyohi", meaning: "Refusal/Rejection", example_sentence: "要求を拒否する反面、話し合いの余地は残しておくという高度な交渉です。" },
    { word: "寄与", reading: "kiyo", meaning: "Contribution", example_sentence: "地域社会に寄与することによって、企業のブランド価値を向上させます。" },
    { word: "極致", reading: "kyokuchi", meaning: "Zenith/Climax", example_sentence: "美の極致を追求するうちに、人間業とは思えない芸術作品が誕生しました。" },
    { word: "督促", reading: "tokusoku", meaning: "Urge/Demand", example_sentence: "支払いを督促する反面、相手の事情にも配慮した柔軟な対応を心がけます。" },
    { word: "懸案", reading: "ken'an", meaning: "Pending issue", example_sentence: "長年の懸案を解決することによって、組織の飛躍的な成長が可能になりました。" },
    { word: "牽引", reading: "ken'in", meaning: "Traction/Driving force", example_sentence: "リーダーがチームを牽引するうちに、全員のやる気に火がつきました。" },
    { word: "健勝", reading: "kenshou", meaning: "Good health", example_sentence: "皆様のご健勝を祈ることによって、手紙を締めくくるのが礼儀です。" },
    { word: "現像", reading: "genzou", meaning: "Developing (photos)", example_sentence: "写真を現像するうちに、撮影時の感動が鮮やかに蘇ってきました。" },
    { word: "懸念", reading: "kenen", meaning: "Apprehension/Fear", example_sentence: "悪影響を懸念することによって、より安全性の高い代替案を模索します。" },
    { word: "解雇", reading: "kaiko", meaning: "Dismissal/Discharge", example_sentence: "不況により解雇されるうちに、自分自身のスキルを磨く必要性を痛感しました。" },
    { word: "厚情", reading: "koujou", meaning: "Courtesy/Kindness", example_sentence: "皆様のご厚情に感謝する反面、自らの未熟さを深く恥じるばかりです。" },
    { word: "構成", reading: "kousei", meaning: "Organization/Composition", example_sentence: "文章を構成するうちに、論理的な矛盾に気づくことがよくあります。" },
    { word: "更生", reading: "kousei", meaning: "Rehabilitation", example_sentence: "社会的に更生する反面、過去の過ちを完全に消し去ることは不可能です。" },
    { word: "更迭", reading: "koutetsu", meaning: "Change/Shuffle", example_sentence: "閣僚を更迭することによって、政権の刷新を図ろうとしています。" },
    { word: "強硬", reading: "kyoukou", meaning: "Firm/Strong/Rigid", example_sentence: "强硬な姿勢を崩さないうちに、事態は膠着状態に陥ってしまいました。" },
    { word: "公衆", reading: "koushuu", meaning: "Public", example_sentence: "公衆道徳を守る反面、個人の自由が過度に制限されることへの懸念もあります。" },
    { word: "更新", reading: "koushin", meaning: "Renewal/Update", example_sentence: "記録を更新することによって、スポーツ界に新たな歴史を刻みました。" },
    { word: "抗争", reading: "kousou", meaning: "Dispute/Strife", example_sentence: "内部抗争が激化するうちに、組織そのものの存立が危うくなりました。" },
    { word: "拘束", reading: "kousoku", meaning: "Restriction/Restraint", example_sentence: "行動を拘束する反面、それによって万が一の事故を防ぐという目的もあります。" },
    { word: "校閲", reading: "kouetsu", meaning: "Proofreading", example_sentence: "原稿を校閲するうちに、自分の知識不足を痛感させられる毎日です。" },
    { word: "公認", reading: "kounin", meaning: "Official recognition", example_sentence: "公認を得る反面、これからは厳しい成績が常に求められることになります。" },
    { word: "光背", reading: "kouhai", meaning: "Halo/Aura", example_sentence: "仏像の光背を眺めるうちに、安らかな心持ちになることができました。" },
    { word: "荒廃", reading: "kouhai", meaning: "Ruin/Decay", example_sentence: "街が荒廃することによって、治安の悪化が深刻な社会問題となっています。" },
    { word: "狡猾", reading: "koukatsu", meaning: "Cunning/Crafty", example_sentence: "狡猾な手段を用いるうちに、周囲の信頼を完全に失ってしまいました。" },
    { word: "降格", reading: "koukaku", meaning: "Demotion/Degradation", example_sentence: "二部リーグへ降格する反面、一から出直そうという結束力も生まれました。" },
    { word: "好況", reading: "koukyou", meaning: "Prosperity/Good times", example_sentence: "好況に沸くうちに、市場がバブル化しているという警鐘も鳴らされました。" },
    { word: "巧妙", reading: "koumyou", meaning: "Ingenious/Skilled", example_sentence: "巧妙な仕掛けを施すことによって、観客を最後まで飽きさせない演出です。" },
    { word: "功労", reading: "kourou", meaning: "Merit/Valuable service", example_sentence: "長年の功労を称える反面、後進の育成が滞っている現状も直視すべきです。" }
];

let poolIdx = 0;
function getNextFromPool() {
    while (poolIdx < n3Pool.length) {
        const candidate = n3Pool[poolIdx++];
        if (!masterSet.has(candidate.word)) {
            masterSet.add(candidate.word);
            return candidate;
        }
    }
    return null;
}

b1FilesNew.forEach(file => {
    const filePath = path.join('firestore_data', file);
    if (!fs.existsSync(filePath)) return;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const localSet = new Set();

    const fixedItems = data.vocabularyItems.map(item => {
        if (masterSet.has(item.word) || localSet.has(item.word)) {
            const replacement = getNextFromPool();
            if (replacement) {
                console.log(`Replacing duplicate "${item.word}" in ${file} with "${replacement.word}"`);
                return replacement;
            } else {
                return item;
            }
        } else {
            masterSet.add(item.word);
            localSet.add(item.word);
            return item;
        }
    });

    data.vocabularyItems = fixedItems;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
});

console.log('Final Master Blacklist Size:', masterSet.size);
