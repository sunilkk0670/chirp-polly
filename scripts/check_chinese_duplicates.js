const fs = require('fs');
const path = require('path');

// Load existing modules
const m01 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m01.json'), 'utf8'));
const m02 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m02.json'), 'utf8'));

// Extract all words from M01 and M02
const existingWords = new Set();

m01.lessons.forEach(lesson => {
    lesson.vocabulary.forEach(item => {
        const word = item.word.replace(/^Liar Game: /, '');
        existingWords.add(word);
    });
});

m02.lessons.forEach(lesson => {
    lesson.vocabulary.forEach(item => {
        const word = item.word.replace(/^Liar Game: /, '');
        existingWords.add(word);
    });
});

console.log(`\n📊 Total existing words in M01 + M02: ${existingWords.size}\n`);

// Module 03 words (from user input)
const m03Words = [
    "现在", "点", "分", "刻", "半", "早上", "上午", "中午", "下午", "晚上",
    "时候", "起床", "洗脸", "刷牙", "洗澡", "穿衣服", "吃饭", "早饭", "午饭", "晚饭",
    "去学校", "去公司", "上班", "下班", "工作", "学习", "开会", "打电话", "发邮件", "上网",
    "回家", "做饭", "洗碗", "打扫", "休息", "看电视", "睡觉", "做梦", "每天", "常常",
    "有时候", "很少", "从不", "开始", "结束", "以前", "以后", "准备", "忙", "累",
    "跑步", "散步", "运动", "买菜", "超市", "水果", "蔬菜", "牛奶", "鸡蛋", "面包",
    "咖啡", "茶", "喝", "饿", "渴", "饱", "衣服", "洗衣服", "玩手机", "听音乐",
    "看报纸", "写信", "等", "找", "见朋友", "聊天", "帮忙", "出门", "进来", "坐",
    "站", "走", "开门", "关门", "用", "给", "要", "买东西", "卖东西", "贵",
    "便宜", "多少钱", "付钱", "打车", "点心", "东西", "快乐", "意思", "明白", "Fine"
];

// Module 04 words (from user input)
const m04Words = [
    "电影院", "饭馆", "咖啡馆", "图书馆", "公园", "商店", "书店", "银行", "医院", "火车站",
    "飞机场", "宾馆", "药店", "北京", "中国", "旅游", "去", "来", "回", "坐车",
    "坐火车", "坐飞机", "开车", "骑车", "走路", "爱好", "唱歌", "跳舞", "画画", "拍照",
    "玩儿", "电脑游戏", "旅游", "看电影", "听音乐", "买东西", "打球", "踢足球", "游泳", "爬山",
    "家", "房子", "房间", "厨房", "卧室", "卫生间", "桌子", "椅子", "床", "电视",
    "电脑", "手机", "灯", "门", "窗户", "上面", "下面", "里面", "外面", "前面",
    "后面", "左边", "右边", "中间", "旁边", "远", "近", "城市", "路", "街道",
    "地图", "漂亮", "干净", "脏", "安静", "热闹", "好玩儿", "有名", "这里", "那里",
    "怎么走", "找", "发现", "参观", "门票", "拍照", "行李", "护照", "签证", "出发",
    "到达", "天气", "下雨", "下雪", "大风", "便宜", "意思", "东西", "明天见", "Fine"
];

console.log('🔍 Checking Module 03 for duplicates...\n');
const m03Duplicates = [];
m03Words.forEach(word => {
    const cleanWord = word.replace(/^Liar Game: /, '');
    if (existingWords.has(cleanWord)) {
        m03Duplicates.push(cleanWord);
    }
});

if (m03Duplicates.length > 0) {
    console.log(`❌ Found ${m03Duplicates.length} duplicates in M03:`);
    m03Duplicates.forEach(word => console.log(`   - ${word}`));
} else {
    console.log('✅ No duplicates found in M03');
}

console.log('\n🔍 Checking Module 04 for duplicates...\n');
const m04Duplicates = [];
m04Words.forEach(word => {
    const cleanWord = word.replace(/^Liar Game: /, '');
    if (existingWords.has(cleanWord)) {
        m04Duplicates.push(cleanWord);
    }
});

if (m04Duplicates.length > 0) {
    console.log(`❌ Found ${m04Duplicates.length} duplicates in M04:`);
    m04Duplicates.forEach(word => console.log(`   - ${word}`));
} else {
    console.log('✅ No duplicates found in M04');
}

console.log('\n🔍 Checking M03 vs M04 overlap...\n');
const m03Set = new Set(m03Words.map(w => w.replace(/^Liar Game: /, '')));
const m04Set = new Set(m04Words.map(w => w.replace(/^Liar Game: /, '')));
const m03m04Overlap = [];

m03Words.forEach(word => {
    const cleanWord = word.replace(/^Liar Game: /, '');
    if (m04Set.has(cleanWord)) {
        m03m04Overlap.push(cleanWord);
    }
});

if (m03m04Overlap.length > 0) {
    console.log(`❌ Found ${m03m04Overlap.length} overlapping words between M03 and M04:`);
    m03m04Overlap.forEach(word => console.log(`   - ${word}`));
} else {
    console.log('✅ No overlap between M03 and M04');
}

console.log(`\n📊 Summary:`);
console.log(`   M01 + M02: ${existingWords.size} words`);
console.log(`   M03: ${m03Words.length} words (${m03Duplicates.length} duplicates)`);
console.log(`   M04: ${m04Words.length} words (${m04Duplicates.length} duplicates)`);
console.log(`   M03 ↔ M04 overlap: ${m03m04Overlap.length} words`);
console.log(`\n`);
