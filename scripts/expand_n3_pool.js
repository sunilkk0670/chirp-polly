const fs = require('fs');
const path = require('path');

const additionalN3Words = [
    { word: "残響", reading: "zankyou", meaning: "Reverberation", example_sentence: "コンサートホールの残響に浸るうちに、音楽の深みを知りました。" },
    { word: "暫定", reading: "zantei", meaning: "Provisional", example_sentence: "暫定的な予算を決める反面、本予算の成立を急ぎます。" },
    { word: "参拝", reading: "sanpai", meaning: "Visit to a temple", example_sentence: "神社を参拝することによって、清々しい気持ちで新年を迎えました。" },
    { word: "山脈", reading: "sanmyaku", meaning: "Mountain range", example_sentence: "険しい山脈を越えるうちに、自分自身の肉体的な限界を感じました。" },
    { word: "残留", reading: "zanryuu", meaning: "Residue/Staying behind", example_sentence: "少数がこの場に残留する反面、大半のメンバーは移動を開始しました。" },
    { word: "視覚", reading: "shikaku", meaning: "Sense of sight", example_sentence: "視覚に訴えるデザインを採用することによって、直感的な操作が可能です。" },
    { word: "資格", reading: "shikaku", meaning: "Qualification", example_sentence: "資格を取得するうちに、これまでの実務経験が体系化されました。" },
    { word: "思考", reading: "shikou", meaning: "Thought/Thinking", example_sentence: "粘り強く思考を重ねる反面、時には直感に従うことも大切です。" },
    { word: "嗜好", reading: "shikou", meaning: "Taste/Preference", example_sentence: "嗜好が多様化することによって、商品開発はより複雑になっています。" },
    { word: "施行", reading: "shikou", meaning: "Execution/Enforcement", example_sentence: "新法が施行されるうちに、社会のルールが少しずつ変わっていきました。" },
    { word: "指示", reading: "shiji", meaning: "Instruction", example_sentence: "明確な指示を出すことによって、現場の混乱は解消されました。" },
    { word: "辞退", reading: "jitai", meaning: "Decline/Refusal", example_sentence: "賞を辞退する反面、その功績は誰もが認めるところです。" },
    { word: "事態", reading: "jitai", meaning: "Situation", example_sentence: "深刻な事態に陥るうちに、冷静な判断を失いそうになりました。" },
    { word: "始動", reading: "shidou", meaning: "Starting/Start-up", example_sentence: "プロジェクトが始動することによって、全社的な期待が高まっています。" },
    { word: "執着", reading: "shuuchaku", meaning: "Attachment/Persistence", example_sentence: "執着を手放すうちに、驚くほど心が軽やかになりました。" },
    { word: "収集", reading: "shuushuu", meaning: "Collection", example_sentence: "情報を収集する反面、その真偽を確かめる作業も怠りません。" },
    { word: "終息", reading: "shuusoku", meaning: "Resolution/Ceasing", example_sentence: "紛争が終息することによって、ようやく復興の兆しが見えてきました。" },
    { word: "収容", reading: "shuuyou", meaning: "Accommodation/Capacity", example_sentence: "避難者を収容するうちに、物資の不足が深刻な問題となりました。" },
    { word: "修復", reading: "shuufuku", meaning: "Repair/Restoration", example_sentence: "関係を修復する反面、かつての信頼を完全に取り戻すには時間がかかります。" },
    { word: "巡礼", reading: "junrei", meaning: "Pilgrimage", example_sentence: "聖地を巡礼することによって、信仰の重要性を再認識しました。" },
    { word: "準拠", reading: "junkyo", meaning: "Standard/Basis", example_sentence: "国際基準に準拠するうちに、輸出入の手続きが大幅に簡素化されました。" },
    { word: "序盤", reading: "joban", meaning: "Opening stage", example_sentence: "試合の序盤で躓く反面、後半の巻き返しに望みを託します。" },
    { word: "所望", reading: "shomou", meaning: "Desire/Request", example_sentence: "特産の料理を所望することによって、旅の醍醐味を満喫しました。" },
    { word: "所在", reading: "shozai", meaning: "Location/Position", example_sentence: "責任の所在を明らかにするうちに、組織の不透明な部分が見えてきました。" },
    { word: "消息", reading: "shousoku", meaning: "News/Whereabouts", example_sentence: "消息が途絶える反面、生存を信じる家族の願いは届きませんでした。" },
    { word: "承諾", reading: "shoudaku", meaning: "Consent/Acceptance", example_sentence: "条件を承諾することによって、契約は正式に成立しました。" },
    { word: "昇進", reading: "shoushin", meaning: "Promotion", example_sentence: "昇進を目指して励むうちに、仕事そのものの楽しさに目覚めました。" },
    { word: "消尽", reading: "shoujin", meaning: "Exhaustion/Consumption", example_sentence: "資源を消尽することを防ぐ反面、経済発展との両立が求められます。" },
    { word: "称賛", reading: "shousan", meaning: "Praise/Admiration", example_sentence: "称賛を浴びることによって、チームの結束力はさらに揺るぎないものとなりました。" },
    { word: "照合", reading: "shougou", meaning: "Collation/Comparison", example_sentence: "データを照合するうちに、わずかな誤差も見逃さない厳格さが身につきました。" },
    { word: "証拠", reading: "shouko", meaning: "Evidence/Proof", example_sentence: "確かな証拠を提示する反面、相手の反論にも丁寧に対応します。" },
    { word: "消耗", reading: "shoumo", meaning: "Exhaustion/Waste", example_sentence: "精神が消耗することによって、判断能力が著しく低下してしまいました。" },
    { word: "照耀", reading: "shouyou", meaning: "Shining/Glory", example_sentence: "夕日が海を照耀するうちに、世界の美しさを再発見しました。" },
    { word: "称揚", reading: "shouyou", meaning: "Praise/Exaltation", example_sentence: "功績を称揚する反面、その背後にある多くの犠牲も忘れてはなりません。" },
    { word: "所管", reading: "shokan", meaning: "Jurisdiction/Control", example_sentence: "省庁の所管を争ううちに、肝心の政策議論が停滞してしまいました。" },
    { word: "食感", reading: "shokkan", meaning: "Texture (food)", example_sentence: "独特の食感を楽しむことによって、料理への理解が深まりました。" },
    { word: "助長", reading: "jochou", meaning: "Promote/Encourage", example_sentence: "混乱を助長するうちに、事態は収拾がつかないほど悪化していきました。" },
    { word: "真偽", reading: "shingi", meaning: "Truth or falsehood", example_sentence: "情報の真偽を確かめる反面、素早い報道への圧力にも晒されています。" },
    { word: "審議", reading: "shingi", meaning: "Deliberation", example_sentence: "議案を審議することによって、より民主的な決定が可能になります。" },
    { word: "信仰", reading: "shinkou", meaning: "Faith/Belief", example_sentence: "信仰を深めるうちに、心の平安を得ることができました。" },
    { word: "振興", reading: "shinkou", meaning: "Promotion/Development", example_sentence: "観光を振興する反面、オーバーツーリズムの対策も急務です。" },
    { word: "新調", reading: "shinchou", meaning: "Making newly", example_sentence: "制服を新調することによって、身の引き締まる思いで初出勤を迎えました。" },
    { word: "心境", reading: "shinkyou", meaning: "State of mind", example_sentence: "複雑な心境を吐露するうちに、ようやく自分の本心に気づきました。" },
    { word: "進展", reading: "shinten", meaning: "Progress/Development", example_sentence: "事態が進展する反面、新たな課題が次々と浮上してきました。" },
    { word: "信仰", reading: "shinkou", meaning: "Faith", example_sentence: "信仰を全うすることによって、どんな困難も乗り越える力を得ました。" },
    { word: "陣容", reading: "jinyou", meaning: "Lineup/Formation", example_sentence: "陣容を整えるうちに、勝利への確信がチーム全体に広がりました。" },
    { word: "水準", reading: "suijun", meaning: "Standard/Level", example_sentence: "生活水準を維持する反面、将来のための貯蓄も欠かせません。" },
    { word: "推薦", reading: "suisen", meaning: "Recommendation", example_sentence: "候補を推薦することによって、優れた人材が広く世に出るきっかけとなります。" },
    { word: "推測", reading: "suisoku", meaning: "Guess/Conjecture", example_sentence: "原因を推測するうちに、いくつかの有力な手がかりが見つかりました。" },
    { word: "推敲", reading: "suikou", meaning: "Polishing (writing)", example_sentence: "文章を推敲する反面、あまりに時間をかけすぎて納期に遅れそうになりました。" },
    { word: "水平", reading: "suihei", meaning: "Horizontal/Level", example_sentence: "水平線を眺めることによって、地球の大きさを肌で感じました。" },
    { word: "清算", reading: "seisan", meaning: "Settlement/Liquidation", example_sentence: "過去を清算するうちに、本来の自分を取り戻すことができました。" },
    { word: "脆弱", reading: "zeijaku", meaning: "Vulnerability", example_sentence: "システムが脆弱である反面、使い勝手の良さは代えがたい魅力です。" },
    { word: "制裁", reading: "seisai", meaning: "Sanction/Punishment", example_sentence: "制裁を加えることによって、国際的なルールを遵守させようとしています。" },
    { word: "政策", reading: "seisaku", meaning: "Policy", example_sentence: "政策を策定するうちに、国民の期待に応える責任の重さを感じました。" },
    { word: "正常", reading: "seijou", meaning: "Normalcy", example_sentence: "機能が正常に戻る反面、原因の特定にはさらなる調査が必要です。" },
    { word: "清浄", reading: "seijou", meaning: "Purity/Cleanliness", example_sentence: "森の空気が清浄であるうちに、深く呼吸して心身をリフレッシュしました。" },
    { word: "静止", reading: "seishi", meaning: "Stillness/Repose", example_sentence: "静止画を眺めることによって、動画では気づかなかった細部が見えてきます。" },
    { word: "正当", reading: "seitou", meaning: "Proper/Justifiable", example_sentence: "正当な権利を主張するうちに、周囲の理解も少しずつ得られるようになりました。" },
    { word: "成熟", reading: "seijuku", meaning: "Maturity", example_sentence: "社会が成熟する反面、かつてのような勢いが失われているという指摘もあります。" },
    { word: "制御", reading: "seigyo", meaning: "Control", example_sentence: "感情を制御することによって、客観的な立場からアドバイスができます。" },
    { word: "聖域", reading: "seiiki", meaning: "Sanctuary", example_sentence: "聖域を保護するうちに、そこが多くの生命の揺りかごであることを知りました。" },
    { word: "勢力", reading: "seiryoku", meaning: "Influence/Power", example_sentence: "勢力を拡大する反面、内部の統率を保つことが難しくなっています。" },
    { word: "整列", reading: "seiretsu", meaning: "Queue/Line up", example_sentence: "整列して順番を待つうちに、周囲への配慮の大切さを学びました。" },
    { word: "制約", reading: "seiyaku", meaning: "Limitation/Constraint", example_sentence: "条件を制約することによって、よりクリエイティブな発想が生まれることもあります。" },
    { word: "晴朗", reading: "seirou", meaning: "Fair/Clear (weather)", example_sentence: "晴朗な秋空を仰ぐうちに、心の中の雲も晴れていくようでした。" },
    { word: "脆弱", reading: "zeijaku", meaning: "Frailty", example_sentence: "基盤が脆弱な反面、柔軟性に富んだ組織運営が私たちの強みです。" }
];

const poolPath = path.join('scripts', 'n3_pool.json');
const currentPool = JSON.parse(fs.readFileSync(poolPath, 'utf8') || '[]');
const updatedPool = [...currentPool, ...additionalN3Words];

// Remove duplicates within the pool itself
const uniquePool = [];
const seenWords = new Set();
updatedPool.forEach(item => {
    if (!seenWords.has(item.word)) {
        seenWords.add(item.word);
        uniquePool.push(item);
    }
});

fs.writeFileSync(poolPath, JSON.stringify(uniquePool, null, 4));
console.log('Final N3 Pool size (Unique):', uniquePool.length);
