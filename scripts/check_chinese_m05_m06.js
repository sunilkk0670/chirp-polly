const fs = require('fs');
const path = require('path');

// Load existing modules
const m01 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m01.json'), 'utf8'));
const m02 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m02.json'), 'utf8'));
const m03 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m03.json'), 'utf8'));
const m04 = JSON.parse(fs.readFileSync(path.join(__dirname, '../firestore_data/zh_a1_m04.json'), 'utf8'));

// Extract all existing words
const existingWords = new Set();

[m01, m02, m03, m04].forEach(module => {
    module.lessons.forEach(lesson => {
        lesson.vocabulary.forEach(item => {
            const word = item.word.replace(/^Liar Game: /, '');
            existingWords.add(word);
        });
    });
});

console.log(`\n📊 Total existing words in M01-M04: ${existingWords.size}\n`);

// Module 05 words (from user input)
const m05Words = [
    "家", "房子", "房间", "厨房", "卧室", "卫生间", "桌子", "椅子", "床", "电视",
    "电脑", "手机", "灯", "门", "窗户", "冰箱", "空调", "洗衣机", "上面", "下面",
    "里面", "外面", "前面", "后面", "左边", "右边", "中间", "旁边", "商店", "超市",
    "买东西", "多少钱", "块", "毛", "贵", "太贵了", "打折", "付钱", "刷卡", "现金",
    "找钱", "袋子", "试一下", "合适", "颜色", "红色", "蓝色", "黑色", "白色", "大号",
    "中号", "小号", "衣服", "裤子", "鞋子", "袜子", "帽子", "眼镜", "手表", "漂亮",
    "旧", "新", "脏", "干净", "坏了", "修理", "扔掉", "拿", "放", "搬家",
    "邻居", "环境", "安全", "安静", "吵", "方便", "附近", "电梯", "楼梯", "楼上",
    "楼下", "地下室", "院子", "花园", "停车", "车库", "钥匙", "锁", "打开", "关上",
    "帮助", "便宜", "东西", "卖", "谢谢", "客气", "没关系", "好", "Fine"
];

// Module 06 words (from user input)
const m06Words = [
    "旅游", "去", "来", "回", "出发", "到达", "坐", "开车", "走路", "公共汽车",
    "出租车", "地铁", "火车", "高铁", "飞机", "自行车", "船", "车站", "火车站", "飞机场",
    "票", "车票", "机票", "护照", "签证", "行李", "箱子", "地图", "宾馆", "饭店",
    "订", "找", "迷路", "向", "转", "直走", "路口", "红绿灯", "远", "近",
    "快", "慢", "危险", "安全", "挤", "准时", "晚点", "换车", "等车", "打车",
    "扫码", "骑", "单车", "走路", "堵车", "司机", "乘客", "座位", "靠窗", "过道",
    "登机口", "登机牌", "安检", "目的地", "行程", "参观", "导游", "名胜", "古迹", "风景",
    "漂亮", "拍照", "照相机", "有趣", "好玩", "累", "开心", "纪念品", "礼物", "明信片",
    "世界", "北京", "上海", "国外", "出发吧", "一路顺风", "打车", "东西", "马路", "准备",
    "明天见", "Fine"
];

console.log('🔍 Checking Module 05 for duplicates...\n');
const m05Duplicates = [];
m05Words.forEach(word => {
    const cleanWord = word.replace(/^Liar Game: /, '');
    if (existingWords.has(cleanWord)) {
        m05Duplicates.push(cleanWord);
    }
});

if (m05Duplicates.length > 0) {
    console.log(`❌ Found ${m05Duplicates.length} duplicates in M05:`);
    m05Duplicates.forEach(word => console.log(`   - ${word}`));
} else {
    console.log('✅ No duplicates found in M05');
}

console.log('\n🔍 Checking Module 06 for duplicates...\n');
const m06Duplicates = [];
m06Words.forEach(word => {
    const cleanWord = word.replace(/^Liar Game: /, '');
    if (existingWords.has(cleanWord)) {
        m06Duplicates.push(cleanWord);
    }
});

if (m06Duplicates.length > 0) {
    console.log(`❌ Found ${m06Duplicates.length} duplicates in M06:`);
    m06Duplicates.forEach(word => console.log(`   - ${word}`));
} else {
    console.log('✅ No duplicates found in M06');
}

console.log('\n🔍 Checking M05 vs M06 overlap...\n');
const m05Set = new Set(m05Words.map(w => w.replace(/^Liar Game: /, '')));
const m06Set = new Set(m06Words.map(w => w.replace(/^Liar Game: /, '')));
const m05m06Overlap = [];

m05Words.forEach(word => {
    const cleanWord = word.replace(/^Liar Game: /, '');
    if (m06Set.has(cleanWord)) {
        m05m06Overlap.push(cleanWord);
    }
});

if (m05m06Overlap.length > 0) {
    console.log(`❌ Found ${m05m06Overlap.length} overlapping words between M05 and M06:`);
    m05m06Overlap.forEach(word => console.log(`   - ${word}`));
} else {
    console.log('✅ No overlap between M05 and M06');
}

console.log(`\n📊 Summary:`);
console.log(`   M01-M04: ${existingWords.size} words`);
console.log(`   M05: ${m05Words.length} words (${m05Duplicates.length} duplicates)`);
console.log(`   M06: ${m06Words.length} words (${m06Duplicates.length} duplicates)`);
console.log(`   M05 ↔ M06 overlap: ${m05m06Overlap.length} words`);
console.log(`\n`);
