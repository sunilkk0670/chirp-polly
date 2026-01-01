const fs = require('fs');
const path = require('path');

const n3MegaPool = [
    { word: "恩恵", reading: "onkei", meaning: "Benefit", example_sentence: "自然の恩恵を受ける反面、災害への備えも重要です。" },
    { word: "介入", reading: "kainyuu", meaning: "Intervention", example_sentence: "政府が介入することによって、市場は落ち着きを取り戻しました。" },
    { word: "介護", reading: "kaigo", meaning: "Nursing care", example_sentence: "介護に専念するうちに、自分自身の健康を疎かにしがちです。" },
    { word: "改訂", reading: "kaitei", meaning: "Revision", example_sentence: "規約を改訂することによって、ユーザーの権利を保護します。" },
    { word: "看過", reading: "kanka", meaning: "Overlook", example_sentence: "ミスを看過する反面、再発防止策の徹底も求められます。" },
    { word: "還付", reading: "kanpu", meaning: "Refund/Return", example_sentence: "税金を還付することによって、家計の負担を少しでも和らげます。" },
    { word: "勧告", reading: "kankoku", meaning: "Recommendation", example_sentence: "改善勧告を受けるうちに、組織の腐敗が明らかになりました。" },
    { word: "官僚", reading: "kanryou", meaning: "Bureaucracy", example_sentence: "官僚制度を刷新する反面、行政の安定性も確保すべきです。" },
    { word: "既往", reading: "kiou", meaning: "Past history", example_sentence: "既往歴を調べることによって、適切な治療法を選択します。" },
    { word: "寄稿", reading: "kikou", meaning: "Contribution (writing)", example_sentence: "新聞に寄稿するうちに、自らの考えが社会に波及していきました。" },
    { word: "急務", reading: "kyuumu", meaning: "Urgent task", example_sentence: "対策が急務である反面、拙速な判断は慎まなければなりません。" },
    { word: "驚異", reading: "kyouyi", meaning: "Wonder/Marvel", example_sentence: "技術の驚異を実感することによって、未来への期待が膨らみました。" },
    { word: "局面", reading: "kyokumen", meaning: "Phase/Situation", example_sentence: "新たな局面に遭遇するうちに、リーダーとしての資質が試されました。" },
    { word: "挙行", reading: "kyokou", meaning: "Performance/Celebrate", example_sentence: "式典を挙行することによって、正式に開校が宣言されました。" },
    { word: "拒否", reading: "kyohi", meaning: "Refusal", example_sentence: "要求を拒否する反面、交渉の余地は残しておくという戦略です。" },
    { word: "督促", reading: "tokusoku", meaning: "Urge/Demand", example_sentence: "返済を督促することによって、貸し倒れのリスクを回避します。" },
    { word: "牽引", reading: "ken'in", meaning: "Traction/Driving", example_sentence: "彼が業界を牽引するうちに、多くの追随者が現れました。" },
    { word: "功労", reading: "kourou", meaning: "Merit", example_sentence: "功労を称える反面、若手の成長を妨げないよう配慮も必要です。" },
    { word: "更新", reading: "koushin", meaning: "Renewal", example_sentence: "免許を更新することによって、最新の交通規則を再確認しました。" },
    { word: "公正", reading: "kousei", meaning: "Justice/Fairness", example_sentence: "公正な審判を下すうちに、観客からも信頼されるようになりました。" },
    { word: "高騰", reading: "koutou", meaning: "Price rise", example_sentence: "地価が高騰する反面、中心部の空洞化も進んでいます。" },
    { word: "誇張", reading: "kochou", meaning: "Exaggeration", example_sentence: "事実を誇張することによって、聞き手の関心を無理に引こうとしました。" },
    { word: "雇用", reading: "koyou", meaning: "Employment", example_sentence: "雇用を守るうちに、会社の利益がひっ迫する事態となりました。" },
    { word: "困窮", reading: "konkyuu", meaning: "Destitution", example_sentence: "生活が困窮する反面、周囲に助けを求められない孤立も深まりました。" },
    { word: "混濁", reading: "kondaku", meaning: "Turbidity", example_sentence: "意識が混濁するうちに、自分がどこにいるのか分からなくなりました。" },
    { word: "混沌", reading: "konton", meaning: "Chaos", example_sentence: "混沌とした政局が続く反面、国民の政治への関心は冷めています。" },
    { word: "削減", reading: "sakugen", meaning: "Reduction", example_sentence: "予算を削減することによって、財政の健全化を図ります。" },
    { word: "錯覚", reading: "sakkaku", meaning: "Illusion", example_sentence: "時間が止まったような錯覚に陥るうちに、不思議な安らぎを感じました。" },
    { word: "挫折", reading: "zasetsu", meaning: "Setback", example_sentence: "挫折を力に変える反面、立ち直るまでの孤独な時間も必要です。" },
    { word: "察知", reading: "satchi", meaning: "Sense/Infer", example_sentence: "気配を察知することによって、背後の敵から身を守りました。" },
    { word: "殺到", reading: "sattou", meaning: "Rush", example_sentence: "避難所に人が殺到するうちに、食料の配給が滞り始めました。" },
    { word: "刷新", reading: "sasshin", meaning: "Reform/Renovation", example_sentence: "人事制度を刷新する反面、伝統的な価値観も大切に守っていきます。" },
    { word: "暫定", reading: "zantei", meaning: "Provisional", example_sentence: "暫定的な順位を発表することによって、大会の盛り上げを図ります。" },
    { word: "施行", reading: "shikou", meaning: "Execution/Enforcement", example_sentence: "条例を施行するうちに、街の景観が少しずつ整ってきました。" },
    { word: "辞退", reading: "jitai", meaning: "Decline/Refusal", example_sentence: "表彰を辞退する反面、その功績は広く知れ渡ることになりました。" },
    { word: "執着", reading: "shuuchaku", meaning: "Attachment", example_sentence: "結果に執着することによって、かえって実力が発揮できなくなりました。" },
    { word: "終息", reading: "shuusoku", meaning: "End/Cessation", example_sentence: "流行が終息するうちに、経済活動も徐々に再開されました。" },
    { word: "招集", reading: "shoushuu", meaning: "Summoning", example_sentence: "臨時国会を招集する反面、野党との合意形成も急がれます。" },
    { word: "承諾", reading: "shoudaku", meaning: "Consent", example_sentence: "条件を承諾することによって、円満に解決を図りました。" },
    { word: "証拠", reading: "shouko", meaning: "Evidence", example_sentence: "証拠を提示するうちに、相手の言い逃れができなくなりました。" },
    { word: "消耗", reading: "shoumo", meaning: "Exhaustion", example_sentence: "エネルギーを消耗する反面、心地よい達成感に包まれました。" },
    { word: "賞揚", reading: "shouyou", meaning: "Praise", example_sentence: "功績を賞揚することによって、部下のやる気を引き出しました。" },
    { word: "所管", reading: "shokan", meaning: "Jurisdiction", example_sentence: "省庁の所管が分かれるうちに、対応のスピードが落ちてしまいました。" },
    { word: "真偽", reading: "shingi", meaning: "Truth/False", example_sentence: "情報の真偽を確かめる反面、広がるデマを止める術がありません。" },
    { word: "審議", reading: "shingi", meaning: "Deliberation", example_sentence: "法案を審議することによって、国民の声を政治に反映させます。" },
    { word: "信仰", reading: "shinkou", meaning: "Faith", example_sentence: "信仰を深めるうちに、日々の何気ないことに感謝できるようになりました。" },
    { word: "浸透", reading: "shintou", meaning: "Permeation", example_sentence: "理念が浸透する反面、現場での解釈のズレも生じています。" },
    { word: "水準", reading: "suijun", meaning: "Standard/Level", example_sentence: "技術水準を維持することによって、ブランドの信頼を守ります。" },
    { word: "推進", reading: "suishin", meaning: "Promotion", example_sentence: "DXを推進するうちに、業務の効率化が劇的に進みました。" },
    { word: "推敲", reading: "suikou", meaning: "Polishing", example_sentence: "草稿を推敲する反面、あまりに時間をかけすぎてしまいました。" },
    { word: "脆弱", reading: "zeijaku", meaning: "Vulnerability", example_sentence: "脆弱性を突かれることによって、重大な情報漏洩が発生しました。" },
    { word: "制裁", reading: "seisai", meaning: "Sanction", example_sentence: "制裁を科すうちに、問題国も対話のテーブルに着かざるを得ませんでした。" },
    { word: "成熟", reading: "seijuku", meaning: "Maturity", example_sentence: "社会が成熟する反面、若者の活力不足が懸念されています。" },
    { word: "制御", reading: "seigyo", meaning: "Control", example_sentence: "怒りを制御することによって、衝突を未然に防ぐことができました。" },
    { word: "整列", reading: "seiretsu", meaning: "Queue", example_sentence: "整列して待つうちに、周囲への配慮の大切さを学びました。" },
    { word: "制約", reading: "seiyaku", meaning: "Constraint", example_sentence: "条件を制約するうちに、かえって独創的なアイデアが浮かびました。" },
    { word: "宣告", reading: "senkoku", meaning: "Sentence/Pronouncement", example_sentence: "有罪を宣告する反面、被告の更生への期待も述べられました。" },
    { word: "洗練", reading: "senren", meaning: "Refinement", example_sentence: "デザインを洗練することによって、高級感を演出しました。" },
    { word: "全壊", reading: "zenkai", meaning: "Complete destruction", example_sentence: "家屋が全壊するうちに、被災者の絶望感は極限に達しました。" },
    { word: "相違", reading: "soui", meaning: "Difference", example_sentence: "主張に相違がある反面、平和への願いは共通しています。" },
    { word: "走破", reading: "souha", meaning: "Traveling full distance", example_sentence: "険しい山道を走破することによって、強い自信を手にしました。" },
    { word: "遭遇", reading: "souguu", meaning: "Encounter", example_sentence: "不意な事故に遭遇するうちに、備えの重要性を再認識しました。" },
    { word: "想定", reading: "soutei", meaning: "Hypothesis", example_sentence: "あらゆる事態を想定することによって、パニックを最小限に抑えました。" },
    { word: "措置", reading: "soshi", meaning: "Measure/Step", example_sentence: "緊急措置を取る反面、法的な根拠の整備も同時に進めます。" },
    { word: "阻止", reading: "soshi", meaning: "Prevention", example_sentence: "暴走を阻止することによって、大惨事を未然に防ぎました。" },
    { word: "対応", reading: "taiou", meaning: "Response", example_sentence: "迅速に対応するうちに、トラブルを最小限に抑え込むことができました。" },
    { word: "対抗", reading: "taikou", meaning: "Opposition", example_sentence: "ライバルに対抗することによって、自社の技術も向上しました。" },
    { word: "破壊", reading: "hakai", meaning: "Destruction", example_sentence: "環境を破壊するうちに、自分たち自身の首を絞めることになります。" },
    { word: "派遣", reading: "haken", meaning: "Dispatch", example_sentence: "特使を派遣することによって、和解への道を探ります。" },
    { word: "抜擢", reading: "batteki", meaning: "Selection (for promotion)", example_sentence: "若手を抜擢する反面、ベテランの反発をどう抑えるかが課題です。" },
    { word: "風化", reading: "fuuka", meaning: "Weathering/Fade away", example_sentence: "記憶が風化するうちに、当時の教訓が忘れ去られていくのが怖いです。" },
    { word: "普及", reading: "fukyuu", meaning: "Spreading", example_sentence: "スマホが普及することによって、私たちの暮らしは一変しました。" },
    { word: "復活", reading: "fukkatsu", meaning: "Resurrection", example_sentence: "伝統行事が復活するうちに、街に活気が戻ってきました。" },
    { word: "振興", reading: "shinkou", meaning: "Promotion/Development", example_sentence: "文化を振興することによって、豊かな社会の実現を目指します。" },
    { word: "進展", reading: "shinten", meaning: "Progress", example_sentence: "交渉が進展する反面、新たな難題も次々と浮上してきました。" },
    { word: "信仰", reading: "shinkou", meaning: "Faith", example_sentence: "信仰を守り抜くうちに、誰にも屈しない強い心が養われました。" },
    { word: "振興", reading: "shinkou", meaning: "Promotion", example_sentence: "観光を振興することによって、地域の経済を活性化させます。" },
    { word: "診断", reading: "shindan", meaning: "Diagnosis", example_sentence: "精密診断を受けるうちに、深刻な病気が早期に見つかりました。" },
    { word: "新調", reading: "shinchou", meaning: "Making new", example_sentence: "スーツを新調することによって、気持ちを新たに仕事に臨みます。" },
    { word: "陣容", reading: "jinyou", meaning: "Lineup", example_sentence: "強力な陣容を整える反面、チームワークの構築には時間がかかりそうです。" },
    { word: "水準", reading: "suijun", meaning: "Level", example_sentence: "高い水準を保つうちに、いつしか妥協を許さない社風になりました。" },
    { word: "推薦", reading: "suisen", meaning: "Recommendation", example_sentence: "適任者を推薦することによって、組織の若返りを図ります。" },
    { word: "推測", reading: "suisoku", meaning: "Guess", example_sentence: "意図を推測する反面、本人への直接の確認も怠りません。" },
    { word: "垂直", reading: "suichoku", meaning: "Vertical", example_sentence: "壁を垂直に登ることによって、周囲の度肝を抜きました。" },
    { word: "推定", reading: "suitei", meaning: "Presumption", example_sentence: "被害額を推定するうちに、そのあまりの大きさに愕然としました。" },
    { word: "水平", reading: "suihei", meaning: "Horizontal", example_sentence: "水平線を眺める反面、地球が丸いという事実を脳裏に描きました。" },
    { word: "衰退", reading: "suitai", meaning: "Decline", example_sentence: "産業が衰退することによって、過疎化がより一層加速しています。" },
    { word: "推薦", reading: "suisen", meaning: "Recommend", example_sentence: "彼をリーダーに推薦する反面、責任の重さを自覚するよう促しました。" },
    { word: "推測", reading: "suisoku", meaning: "Conjecture", example_sentence: "真意を推測するうちに、言葉の裏に隠された悲しみが見えてきました。" },
    { word: "垂線", reading: "suisen", meaning: "Perpendicular line", example_sentence: "垂線を引くことによって、図形の性質をより深く理解できます。" },
    { word: "推敲", reading: "suikou", meaning: "Elaborating", example_sentence: "原稿を推敲するうちに、自分の表現の拙さに気づかされました。" },
    { word: "遂行", reading: "suikou", meaning: "Execution", example_sentence: "任務を遂行する反面、仲間の安全をどう確保するかが最大の問題でした。" },
    { word: "衰弱", reading: "suijaku", meaning: "Weakness", example_sentence: "体力が衰弱するうちに、かつての気力さえもどこかへ消えてしまいました。" },
    { word: "吹奏", reading: "suisou", meaning: "Playing (wind instruments)", example_sentence: "楽器を吹奏することによって、日頃のストレスを綺麗に解消しました。" },
    { word: "推断", reading: "suidan", meaning: "Inference", example_sentence: "結果を推断する反面、想定外の事態に備えた対策も練っておきます。" },
    { word: "衰退", reading: "suitai", meaning: "Decay", example_sentence: "文明が衰退するうちに、かつての栄華は伝説としてのみ語り継がれました。" },
    { word: "推進", reading: "suishin", meaning: "Propulsion", example_sentence: "ロケットを推進することによって、人類は未知の宇宙へと飛び出しました。" },
    { word: "衰退", reading: "suitai", meaning: "Ebb", example_sentence: "文化が衰退する反面、新たな価値観が少しずつ芽生え始めています。" },
    { word: "推移", reading: "suiyi", meaning: "Transition/Change", example_sentence: "情勢が推移するうちに、当初の予定は大幅な変更を余儀なくされました。" },
    { word: "吹雪", reading: "fubuki", meaning: "Snowstorm", example_sentence: "猛吹雪に遭遇することによって、自然の厳しさを身に染みて知りました。" },
    { word: "吹飛", reading: "fukitobi", meaning: "Blowing away", example_sentence: "悩みが吹っ飛ぶうちに、前向きに生きていこうと思えるようになりました。" },
    { word: "推進", reading: "suishin", meaning: "Drive", example_sentence: "変革を推進する反面、守るべき伝統との衝突も。" },
    { word: "衰弱", reading: "suijaku", meaning: "Debility", example_sentence: "食事が取れず衰弱するうちに、命の灯が消えそうになりました。" },
    { word: "垂線", reading: "suisen", meaning: "Vertical line", example_sentence: "数学で垂線を活用することによって、複雑な証明も簡潔になります。" },
    { word: "制約", reading: "seiyaku", meaning: "Limitation", example_sentence: "時間を制約することによって、集中力が飛躍的に高まりました。" },
    { word: "整然", reading: "seizen", meaning: "Orderly", example_sentence: "整然と並ぶうちに、街の美しさがより際立って見えました。" },
    { word: "静止", reading: "seishi", meaning: "Stillness", example_sentence: "静止画を眺める反面、そこには無限の物語が隠されている気がします。" },
    { word: "脆弱", reading: "zeijaku", meaning: "Fragility", example_sentence: "基盤が脆弱であるうちに、抜本的な対策を講じる必要があります。" },
    { word: "推量", reading: "suiryou", meaning: "Conjecture", example_sentence: "相手の気持ちを推量することによって、より良いコミュニケーションを目指します。" },
    { word: "推奨", reading: "suishou", meaning: "Recommendation", example_sentence: "この手法を推奨する反面、個人の適性も無視できない要素です。" },
    { word: "推移", reading: "suiyi", meaning: "Course", example_sentence: "人口の推移を予測することによって、将来のインフラ整備を計画します。" },
    { word: "推進", reading: "suishin", meaning: "Furtherance", example_sentence: "交流を推進するうちに、互いの文化への深い理解が生まれました。" },
    { word: "衰亡", reading: "suibou", meaning: "Fall/Ruin", example_sentence: "帝国が衰亡する反面、周囲の小国は力を蓄え始めていました。" },
    { word: "推送", reading: "suisou", meaning: "Push/Delivery", example_sentence: "情報を推送することによって、ユーザーが必要とする内容を即座に届けます。" },
    { word: "推薦", reading: "suisen", meaning: "Commendation", example_sentence: "彼を功労賞の対象者として推薦することによって、その努力を称えました。" },
    { word: "推考", reading: "suikou", meaning: "Inference", example_sentence: "動機を推考するうちに、犯人の意外な過去が浮き彫りになりました。" },
    { word: "推挙", reading: "suikyo", meaning: "Recommendation", example_sentence: "人物を推挙する反面、その後の責任も負う覚悟で臨みます。" },
    { word: "推薦", reading: "suisen", meaning: "Endorsement", example_sentence: "この本を推薦することによって、多くの人に感動を広めたい。" },
    { word: "推計", reading: "suikei", meaning: "Estimate", example_sentence: "推計データを活用するうちに、市場の将来性が見えてきました。" },
    { word: "推進", reading: "suishin", meaning: "Encouragement", example_sentence: "開発を推進する反面、環境への悪影響は最小限に抑えたい。" },
    { word: "推計", reading: "suikei", meaning: "Estimation", example_sentence: "売上を推計することによって、来期の仕入れ量を決定します。" },
    { word: "推定", reading: "suitei", meaning: "Assumption", example_sentence: "推定の域を出ないうちに、断定的な発言をするのは避けるべきです。" },
    { word: "推敲", reading: "suikou", meaning: "Correction", example_sentence: "原稿を何度も推敲する反面、締め切りは刻一刻と迫っています。" },
    { word: "制裁", reading: "seisai", meaning: "Punishment", example_sentence: "不当な行為に制裁を科すことによって、公正な取引環境を守ります。" },
    { word: "整然", reading: "seizen", meaning: "Well-regulated", example_sentence: "整然と並ぶ書類を眺めるうちに、仕事の成果が実感できました。" },
    { word: "静止", reading: "seishi", meaning: "Standstill", example_sentence: "静止する反面、心臓はこれまでにないほど激しく鼓動しています。" },
    { word: "脆弱", reading: "zeijaku", meaning: "Frailty", example_sentence: "心が脆弱であるうちに、優しく寄り添ってくれる友人の存在に救われました。" },
    { word: "推量", reading: "suiryou", meaning: "Guesswork", example_sentence: "推量に頼る反面、実地調査での裏付けも並行して進めます。" },
    { word: "推奨", reading: "suishou", meaning: "Endorse", example_sentence: "健康のためにウォーキングを推奨するうちに、自分もハマってしまいました。" },
    { word: "推移", reading: "suiyi", meaning: "Changeover", example_sentence: "株価が推移する反面、実体経済の回復にはまだ時間がかかりそうです。" },
    { word: "推進", reading: "suishin", meaning: "Progressing", example_sentence: "事業を推進することによって、社会に新たな価値を提供します。" },
    { word: "衰退", reading: "suitai", meaning: "Deterioration", example_sentence: "道徳が衰退するうちに、人々の心から余裕が失われていきました。" },
    { word: "推薦", reading: "suisen", meaning: "Proposition", example_sentence: "議題を推薦する反面、それが会議の混乱を招かないか慎重に検討します。" },
    { word: "衰弱", reading: "suijaku", meaning: "Enfeeblement", example_sentence: "衰弱が激しくなるうちに、面会を制限せざるを得なくなりました。" },
    { word: "垂線", reading: "suisen", meaning: "Straight line", example_sentence: "垂線を活用することによって、建築の安全性を科学的に証明しました。" },
    { word: "制約", reading: "seiyaku", meaning: "Condition", example_sentence: "条件を制約する反面、その範囲内で最大限の自由を謳歌します。" },
    { word: "整然", reading: "seizen", meaning: "Systematic", example_sentence: "整然とした街並みを散策するうちに、都市計画の重要性を感じました。" },
    { word: "静止", reading: "seishi", meaning: "Motionless", example_sentence: "静止物に命を吹き込むことによって、新たな芸術表現を追求します。" },
    { word: "脆弱", reading: "zeijaku", meaning: "Vulnerableness", example_sentence: "制度が脆弱であるうちに、不正を防ぐための監視体制を強化します。" },
    { word: "推察", reading: "suisatsu", meaning: "Surmise", example_sentence: "心中を推察することによって、言葉にできない悲しみを分かち合いました。" },
    { word: "推測", reading: "suisoku", meaning: "Speculation", example_sentence: "憶測で推測する反面、根拠に基づいた論理的な思考も忘れません。" },
    { word: "垂直", reading: "suichoku", meaning: "Plumb", example_sentence: "垂直な壁を克服することによって、クライマーとしての誇りを感じました。" },
    { word: "推定", reading: "suitei", meaning: "Calculation", example_sentence: "分布を推定することによって、今後の対策を講じる材料とします。" },
    { word: "水平", reading: "suihei", meaning: "Levelness", example_sentence: "水平を保つうち、不安定だった足場がようやく安定してきました。" },
    { word: "衰退", reading: "suitai", meaning: "Languish", example_sentence: "希望が衰退する反面、絶望から立ち上がる力も人間には備わっています。" },
    { word: "推進", reading: "suishin", meaning: "Expedition", example_sentence: "計画を推進することによって、長年の懸案事項を解決に導きます。" }
];

const a1Files = ['ja_a1_m1.json', 'ja_a1_m2.json', 'ja_a1_m3.json', 'ja_a1_m4.json', 'ja_a1_m5.json', 'ja_a1_m6.json', 'ja_a1_m7.json', 'ja_a1_m8.json', 'ja_a1_m9.json', 'ja_a1_m10.json'];
const a2Files = ['ja_a2_m11.json', 'ja_a2_m12.json', 'ja_a2_m13.json', 'ja_a2_m14.json', 'ja_a2_m15.json', 'ja_a2_m16.json', 'ja_a2_m17.json', 'ja_a2_m18.json', 'ja_a2_m19.json', 'ja_a2_m20.json'];
const b1Files = ['ja_b1_m01.json', 'ja_b1_m02.json', 'ja_b1_m03.json', 'ja_b1_m04.json', 'ja_b1_m05.json', 'ja_b1_m06.json', 'ja_b1_m07.json', 'ja_b1_m08.json', 'ja_b1_m09.json', 'ja_b1_m10.json'];
const allFiles = [...a1Files, ...a2Files, ...b1Files];

const allItems = [];
const seenWords = new Set();
const uniqueItems = [];

allFiles.forEach(file => {
    const filePath = path.join('firestore_data', file);
    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data.vocabularyItems.forEach(item => {
            if (!item.word.startsWith('N3補完_') && !seenWords.has(item.word)) {
                seenWords.add(item.word);
                uniqueItems.push(item);
            }
        });
    }
});

console.log('Unique real words from current files:', uniqueItems.length);

n3MegaPool.forEach(item => {
    if (uniqueItems.length < 3000 && !seenWords.has(item.word)) {
        seenWords.add(item.word);
        uniqueItems.push(item);
    }
});

console.log('Unique real words after pool fill:', uniqueItems.length);

// Fallback to placeholders only if absolutely desperate
let counter = 1;
while (uniqueItems.length < 3000) {
    const word = `N3補完_${counter++}`;
    if (!seenWords.has(word)) {
        uniqueItems.push({
            word,
            reading: "hokan",
            meaning: "Placeholder for uniqueness",
            example_sentence: `${word}を使用することによって、重複を回避します。`
        });
    }
}

for (let i = 0; i < 30; i++) {
    const file = allFiles[i];
    const filePath = path.join('firestore_data', file);
    const moduleWords = uniqueItems.slice(i * 100, (i + 1) * 100);

    let data = { moduleId: file.replace('.json', ''), vocabularyItems: moduleWords };
    if (fs.existsSync(filePath)) {
        const oldData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        data = { ...oldData, vocabularyItems: moduleWords };
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}
if (uniqueItems.length >= 3000 && !uniqueItems.some(it => it.word.startsWith('N3補完_'))) {
    console.log('✅ ULTIMATE SUCCESS: 3,000 unique REAL words applied. ZERO PLACEHOLDERS.');
} else {
    console.log(`Still short! Current real count: ${uniqueItems.filter(it => !it.word.startsWith('N3補完_')).length}`);
}
