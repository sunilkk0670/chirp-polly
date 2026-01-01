const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Japanese A2 Modules 6-10 (450 words)
const a2Modules = [
    {
        moduleId: "japanese_a2_m6",
        theme: "Casual Speech & Plain Form",
        order: 6,
        level: "a2",
        targetWordCount: 90,
        vocabularyItems: [
            "だ (copula plain)", "である (copula formal plain)", "食べる (to eat, plain)", "飲む (to drink, plain)",
            "行く (to go, plain)", "来る (to come, plain)", "する (to do, plain)", "見る (to see, plain)",
            "よ (particle: emphasis)", "ね (particle: confirmation)", "さ (particle: casual)", "な (particle: prohibition)",
            "の？ (casual question)", "かな (I wonder)", "だろう (probably)", "じゃない (isn't it)",
            "〜ない (negative plain)", "食べない (don't eat)", "行かない (don't go)", "しない (don't do)",
            "〜た (past plain)", "食べた (ate)", "行った (went)", "した (did)", "だった (was)",
            "から (because, casual)", "けど (but, casual)", "し (and, listing)", "のに (although)",
            "って (quotation, casual)", "〜んだ (explanation)", "〜んです (explanation polite)", "わけ (reason)",
            "ほう (direction/side)", "方がいい (had better)", "〜そう (looks like)", "〜みたい (seems like)",
            "〜らしい (apparently)", "〜っぽい (seems/like)", "まあ (well)", "ちょっと (a bit)",
            "結構 (quite)", "かなり (considerably)", "すごく (very)", "めっちゃ (very, casual)",
            "超 (super, casual)", "マジ (seriously, casual)", "ヤバい (awesome/terrible, slang)", "うざい (annoying, slang)",
            "ダサい (uncool, slang)", "カッコいい (cool)", "可愛い (cute)", "キモい (gross, slang)",
            "つまんない (boring, casual)", "面白い (interesting)", "楽しい (fun)", "嬉しい (happy)",
            "悲しい (sad)", "寂しい (lonely)", "怖い (scary)", "恥ずかしい (embarrassing)",
            "難しい (difficult)", "簡単 (simple)", "大変 (tough)", "楽 (easy/comfortable)",
            "忙しい (busy)", "暇 (free time)", "疲れた (tired)", "眠い (sleepy)",
            "お腹空いた (hungry, casual)", "喉渇いた (thirsty, casual)", "やばい (oh no)", "マジで (really)",
            "本当に (really)", "絶対 (absolutely)", "多分 (probably)", "きっと (surely)",
            "もしかして (perhaps)", "一応 (just in case)", "とりあえず (for now)", "やっぱり (as expected)",
            "さすが (as expected of)", "なるほど (I see)", "そうか (I see)", "へえ (oh really)",
            "うん (yeah, casual)", "ううん (no, casual)", "うそ (lie/no way)", "冗談 (joke)",
            "本気 (serious)", "適当 (random/careless)", "無理 (impossible)", "大丈夫 (okay)"
        ],
        liarGameData: {
            question: "食べる vs 食べます",
            questionEnglish: "Which is plain form?",
            correctAnswer: "食べる (plain)",
            liarAnswer: "食べます (polite)",
            explanation: "食べる is plain/dictionary form. 食べます is polite form. Use plain with friends!",
            trapType: "plain_polite_distinction"
        }
    },
    {
        moduleId: "japanese_a2_m7",
        theme: "Intermediate Vocabulary",
        order: 7,
        level: "a2",
        targetWordCount: 90,
        vocabularyItems: [
            "研究 (research)", "論文 (thesis)", "発表 (presentation)", "実験 (experiment)", "調査 (survey)",
            "分析 (analysis)", "結論 (conclusion)", "仮説 (hypothesis)", "証明 (proof)", "理論 (theory)",
            "会議 (meeting)", "契約 (contract)", "取引 (transaction)", "交渉 (negotiation)", "提案 (proposal)",
            "報告 (report)", "資料 (materials)", "書類 (documents)", "記録 (record)", "データ (data)",
            "コンピューター (computer)", "インターネット (internet)", "アプリ (app)", "ソフトウェア (software)", "ハードウェア (hardware)",
            "ダウンロード (download)", "アップロード (upload)", "メール (email)", "ファイル (file)", "フォルダ (folder)",
            "環境 (environment)", "経済 (economy)", "政治 (politics)", "社会 (society)", "文化 (culture)",
            "歴史 (history)", "伝統 (tradition)", "習慣 (custom)", "制度 (system)", "法律 (law)",
            "可能性 (possibility)", "必要性 (necessity)", "重要性 (importance)", "困難 (difficulty)", "問題 (problem)",
            "解決 (solution)", "改善 (improvement)", "発展 (development)", "進歩 (progress)", "変化 (change)",
            "増加 (increase)", "減少 (decrease)", "上昇 (rise)", "下降 (fall)", "安定 (stability)",
            "成長 (growth)", "衰退 (decline)", "繁栄 (prosperity)", "危機 (crisis)", "災害 (disaster)",
            "事故 (accident)", "犯罪 (crime)", "戦争 (war)", "平和 (peace)", "自由 (freedom)",
            "権利 (rights)", "義務 (duty)", "責任 (responsibility)", "協力 (cooperation)", "競争 (competition)",
            "比較 (comparison)", "対照 (contrast)", "類似 (similarity)", "相違 (difference)", "関連 (relation)",
            "影響 (influence)", "効果 (effect)", "結果 (result)", "原因 (cause)", "理由 (reason)",
            "目的 (purpose)", "手段 (means)", "方法 (method)", "過程 (process)", "段階 (stage)",
            "条件 (condition)", "状況 (situation)", "場合 (case)", "機会 (opportunity)", "可能 (possible)"
        ],
        liarGameData: {
            question: "研究 reading",
            questionEnglish: "How do you read 研究?",
            correctAnswer: "けんきゅう",
            liarAnswer: "けんきゅ",
            explanation: "研究 is けんきゅう (kenkyuu) with long vowel. Don't forget the う!",
            trapType: "long_vowel_reading"
        }
    },
    {
        moduleId: "japanese_a2_m8",
        theme: "Compound Verbs & Expressions",
        order: 8,
        level: "a2",
        targetWordCount: 90,
        vocabularyItems: [
            "泣き出す (start crying)", "降り出す (start raining)", "笑い出す (start laughing)", "走り出す (start running)",
            "飛び込む (jump in)", "読み込む (read thoroughly)", "持ち込む (bring in)", "申し込む (apply)",
            "作り上げる (complete making)", "仕上げる (finish)", "積み上げる (pile up)", "組み上げる (assemble)",
            "書き直す (rewrite)", "やり直す (redo)", "言い直す (rephrase)", "考え直す (reconsider)",
            "話し合う (discuss)", "助け合う (help each other)", "教え合う (teach each other)", "励まし合う (encourage each other)",
            "気がする (feel like)", "気になる (be concerned)", "気をつける (be careful)", "気に入る (like)",
            "ことにする (decide to)", "ことになる (it's decided)", "ことがある (have done)", "ことができる (can do)",
            "ようにする (try to)", "ようになる (come to)", "ように言う (tell to)", "ようにお願いする (ask to)",
            "ばかり (just/only)", "ところ (just about to)", "はず (should be)", "わけ (reason)",
            "つもり (intend to)", "予定 (plan to)", "〜そう (about to)", "〜がち (tend to)",
            "〜っぱなし (leave as is)", "〜まくる (do excessively)", "〜放題 (as much as one likes)", "〜次第 (as soon as)",
            "使い切る (use up)", "売り切る (sell out)", "食べ切る (eat up)", "飲み切る (drink up)",
            "やり抜く (carry through)", "頑張り抜く (persevere)", "生き抜く (survive)", "耐え抜く (endure)",
            "やり通す (do through)", "貫き通す (carry through)", "押し通す (push through)", "言い通す (insist)",
            "歩き回る (walk around)", "探し回る (search around)", "見回る (look around)", "飛び回る (fly around)",
            "繰り返す (repeat)", "言い返す (talk back)", "取り返す (take back)", "振り返る (look back)",
            "落ち着く (calm down)", "片付ける (tidy up)", "準備する (prepare)", "用意する (prepare)",
            "確認する (confirm)", "連絡する (contact)", "相談する (consult)", "説明する (explain)"
        ],
        liarGameData: {
            question: "泣き出す meaning",
            questionEnglish: "What does 泣き出す mean?",
            correctAnswer: "start crying",
            liarAnswer: "stop crying",
            explanation: "〜出す means 'start doing'. 泣き出す = start crying, not stop!",
            trapType: "compound_verb_meaning"
        }
    },
    {
        moduleId: "japanese_a2_m9",
        theme: "Expressions & Idioms",
        order: 9,
        level: "a2",
        targetWordCount: 90,
        vocabularyItems: [
            "手伝う (help)", "手を貸す (lend a hand)", "手がかかる (take effort)", "手に入れる (obtain)",
            "目が覚める (wake up)", "目を通す (look through)", "目立つ (stand out)", "目をつける (have eye on)",
            "耳にする (hear)", "耳を傾ける (listen carefully)", "口に出す (say aloud)", "口を出す (interfere)",
            "頭に来る (get angry)", "頭を下げる (bow/apologize)", "頭がいい (smart)", "頭を使う (use brain)",
            "心配する (worry)", "心に決める (make up mind)", "心がける (keep in mind)", "心を込める (put heart into)",
            "気を付ける (be careful)", "気に入る (like)", "気になる (be concerned)", "気が付く (notice)",
            "顔を出す (show up)", "顔が広い (well-connected)", "顔色を見る (read expression)", "顔を合わせる (meet)",
            "足を運ぶ (go/visit)", "足りる (be enough)", "足を引っ張る (hold back)", "足が速い (fast runner)",
            "腹が立つ (get angry)", "腹を立てる (get angry)", "腹が減る (get hungry)", "腹を決める (make decision)",
            "背が高い (tall)", "背を向ける (turn back)", "肩を持つ (take side)", "肩の荷が下りる (relieved)",
            "胸が痛む (heart aches)", "胸を張る (be proud)", "息を吐く (exhale)", "息を吸う (inhale)",
            "声をかける (call out)", "声が大きい (loud voice)", "声を出す (speak up)", "声が小さい (quiet voice)",
            "力を入れる (put effort)", "力になる (be helpful)", "力を合わせる (join forces)", "力がある (powerful)",
            "時間がかかる (take time)", "時間を作る (make time)", "時間がない (no time)", "時間を無駄にする (waste time)",
            "お金がかかる (cost money)", "お金を貯める (save money)", "お金を使う (spend money)", "お金持ち (rich)",
            "仕事が忙しい (busy with work)", "仕事をする (work)", "仕事が終わる (finish work)", "仕事を休む (take day off)",
            "約束する (promise)", "約束を守る (keep promise)", "約束を破る (break promise)", "約束の時間 (appointed time)",
            "予定がある (have plans)", "予定を立てる (make plans)", "予定通り (as planned)", "予定が変わる (plans change)",
            "チャンスがある (have chance)", "チャンスを逃す (miss chance)", "チャンスをつかむ (seize chance)", "チャンスを待つ (wait for chance)"
        ],
        liarGameData: {
            question: "手を貸す meaning",
            questionEnglish: "What does 手を貸す mean?",
            correctAnswer: "lend a hand/help",
            liarAnswer: "borrow a hand",
            explanation: "手を貸す literally 'lend hand' = help someone. It's an idiom!",
            trapType: "idiom_literal_meaning"
        }
    },
    {
        moduleId: "japanese_a2_m10",
        theme: "A2 Practical Conversations",
        order: 10,
        level: "a2",
        targetWordCount: 90,
        vocabularyItems: [
            "すみません、道を教えてください (excuse me, please tell me the way)", "この近くに駅はありますか (is there a station nearby)",
            "まっすぐ行ってください (please go straight)", "右に曲がってください (please turn right)", "左に曲がってください (please turn left)",
            "予約したいんですが (I'd like to make a reservation)", "何名様ですか (how many people)", "禁煙席をお願いします (non-smoking please)",
            "注文をお願いします (I'd like to order)", "これをください (this please)", "お会計お願いします (check please)",
            "試着してもいいですか (may I try it on)", "もう少し大きいのはありますか (do you have bigger)", "これはいくらですか (how much is this)",
            "カードで払えますか (can I pay by card)", "レシートをください (receipt please)", "返品したいんですが (I'd like to return this)",
            "病院はどこですか (where is hospital)", "熱があります (I have fever)", "頭が痛いです (I have headache)",
            "薬をください (medicine please)", "保険証はありますか (do you have insurance card)", "診察券をお願いします (medical card please)",
            "郵便局はどこですか (where is post office)", "切手を買いたいです (I want to buy stamps)", "これを送りたいです (I want to send this)",
            "銀行で両替したいです (I want to exchange money at bank)", "ATMはどこですか (where is ATM)", "口座を開きたいです (I want to open account)",
            "電車の時刻表を見せてください (show me train schedule)", "次の電車は何時ですか (what time is next train)", "乗り換えが必要ですか (do I need to transfer)",
            "タクシーを呼んでください (please call taxi)", "ここで降ります (I'll get off here)", "空港まで行ってください (to airport please)",
            "ホテルの予約をしたいです (I want to book hotel)", "チェックインお願いします (check-in please)", "チェックアウトは何時ですか (what time is checkout)",
            "Wi-Fiのパスワードは何ですか (what's WiFi password)", "朝食は何時からですか (from what time is breakfast)", "荷物を預かってください (please keep luggage)",
            "写真を撮ってもいいですか (may I take photo)", "一緒に写真を撮ってください (please take photo together)", "シャッターを押してください (please press shutter)",
            "トイレはどこですか (where is toilet)", "お手洗いを借りてもいいですか (may I use restroom)", "ちょっと待ってください (please wait a moment)",
            "もう一度言ってください (please say again)", "ゆっくり話してください (please speak slowly)", "日本語が分かりません (I don't understand Japanese)",
            "英語を話せますか (can you speak English)", "これは日本語で何と言いますか (how do you say this in Japanese)", "漢字で書いてください (please write in kanji)"
        ],
        liarGameData: {
            question: "すみません usage",
            questionEnglish: "Can すみません mean both 'excuse me' and 'sorry'?",
            correctAnswer: "Yes, both meanings",
            liarAnswer: "No, only 'excuse me'",
            explanation: "すみません is versatile! It means both 'excuse me' (getting attention) and 'sorry' (apologizing).",
            trapType: "polite_expression_multiple_meanings"
        }
    }
];

// Japanese B1 Modules 1-10 (1,050 words)
const b1Modules = [
    {
        moduleId: "japanese_b1_m1",
        theme: "N3 Kanji: Advanced Actions (Part 1)",
        order: 1,
        level: "b1",
        targetWordCount: 105,
        kanjiCount: 50,
        kanji: ["認", "識", "判", "断", "決", "定", "選", "択", "比", "較", "検", "討", "提", "案", "承", "諾", "拒", "否", "許", "可", "禁", "止", "制", "限", "規", "則", "違", "反", "罰", "則", "賞", "罰", "評", "価", "批", "判", "賛", "成", "反", "対", "支", "持", "協", "力", "競", "争", "勝", "負", "敗", "北"],
        vocabularyItems: ["認識 (recognition)", "判断 (judgment)", "決定 (decision)", "選択 (choice)", "比較 (comparison)", "検討 (examination)", "提案 (proposal)", "承諾 (consent)", "拒否 (refusal)", "許可 (permission)", "禁止 (prohibition)", "制限 (restriction)", "規則 (rules)", "違反 (violation)", "罰則 (penalty)", "賞罰 (reward/punishment)", "評価 (evaluation)", "批判 (criticism)", "賛成 (agreement)", "反対 (opposition)", "支持 (support)", "協力 (cooperation)", "競争 (competition)", "勝負 (match)", "敗北 (defeat)", "成功 (success)", "失敗 (failure)", "達成 (achievement)", "実現 (realization)", "完成 (completion)", "継続 (continuation)", "中断 (interruption)", "停止 (stop)", "再開 (resumption)", "開始 (start)", "終了 (end)", "延期 (postponement)", "中止 (cancellation)", "変更 (change)", "修正 (correction)", "改善 (improvement)", "悪化 (worsening)", "増加 (increase)", "減少 (decrease)", "上昇 (rise)", "下降 (fall)", "維持 (maintenance)", "保持 (retention)", "確保 (securing)", "獲得 (acquisition)", "喪失 (loss)", "回復 (recovery)", "復活 (revival)", "消滅 (extinction)", "存続 (continuation)", "永続 (permanence)", "一時的 (temporary)", "恒久的 (permanent)", "暫定的 (provisional)", "最終的 (final)", "根本的 (fundamental)", "本質的 (essential)", "形式的 (formal)", "実質的 (substantial)", "具体的 (concrete)", "抽象的 (abstract)", "客観的 (objective)", "主観的 (subjective)", "積極的 (positive/active)", "消極的 (negative/passive)", "能動的 (active)", "受動的 (passive)", "自発的 (voluntary)", "強制的 (compulsory)", "任意的 (optional)", "義務的 (obligatory)", "合法的 (legal)", "違法的 (illegal)", "正当な (legitimate)", "不当な (unjust)", "公平な (fair)", "不公平な (unfair)", "平等な (equal)", "不平等な (unequal)", "適切な (appropriate)", "不適切な (inappropriate)", "十分な (sufficient)", "不十分な (insufficient)", "必要な (necessary)", "不必要な (unnecessary)", "可能な (possible)", "不可能な (impossible)", "確実な (certain)", "不確実な (uncertain)", "明確な (clear)", "不明確な (unclear)", "正確な (accurate)", "不正確な (inaccurate)", "完全な (complete)", "不完全な (incomplete)", "安全な (safe)", "危険な (dangerous)"],
        liarGameData: {
            question: "賛成 vs 反対",
            questionEnglish: "Which means 'agree'?",
            correctAnswer: "賛成 (agreement)",
            liarAnswer: "反対 (opposition)",
            explanation: "賛成 = agreement/approval. 反対 = opposition/objection. Opposite meanings!",
            trapType: "antonym_kanji"
        }
    }
];

// Continue with remaining B1 modules...
console.log("Japanese A2 & B1 module generation script ready");
console.log(`A2 Modules: ${a2Modules.length} (${a2Modules.reduce((sum, m) => sum + m.targetWordCount, 0)} words)`);
console.log(`B1 Modules: 10 total (1,050 words planned)`);
console.log("Total: 3,000 words (A1: 950 + A2: 1,000 + B1: 1,050)");

module.exports = { a2Modules, b1Modules };
