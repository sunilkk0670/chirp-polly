const fs = require('fs');
const path = require('path');

// Japanese A1 Module 1: Greetings & Basic Expressions
// Following Three-Column Rule: word, reading, meaning

const ja_a1_m1_items = [
    // Greetings (1-20)
    { word: "こんにちは", reading: "konnichiwa", meaning: "Hello / Good afternoon" },
    { word: "おはよう", reading: "ohayou", meaning: "Good morning (casual)" },
    { word: "おはようございます", reading: "ohayou gozaimasu", meaning: "Good morning (polite)" },
    { word: "こんばんは", reading: "konbanwa", meaning: "Good evening" },
    { word: "さようなら", reading: "sayounara", meaning: "Goodbye" },
    { word: "じゃあね", reading: "jaa ne", meaning: "See you (casual)" },
    { word: "またね", reading: "mata ne", meaning: "See you later" },
    { word: "おやすみなさい", reading: "oyasuminasai", meaning: "Good night" },
    { word: "おやすみ", reading: "oyasumi", meaning: "Good night (casual)" },
    { word: "ありがとう", reading: "arigatou", meaning: "Thank you (casual)" },
    { word: "ありがとうございます", reading: "arigatou gozaimasu", meaning: "Thank you (polite)" },
    { word: "どういたしまして", reading: "dou itashimashite", meaning: "You're welcome" },
    { word: "すみません", reading: "sumimasen", meaning: "Excuse me / Sorry" },
    { word: "ごめんなさい", reading: "gomen nasai", meaning: "I'm sorry" },
    { word: "ごめん", reading: "gomen", meaning: "Sorry (casual)" },
    { word: "お願いします", reading: "onegaishimasu", meaning: "Please" },
    { word: "はい", reading: "hai", meaning: "Yes" },
    { word: "いいえ", reading: "iie", meaning: "No" },
    { word: "はじめまして", reading: "hajimemashite", meaning: "Nice to meet you" },
    { word: "よろしくお願いします", reading: "yoroshiku onegaishimasu", meaning: "Please treat me well" },

    // Self-introduction (21-35)
    { word: "私", reading: "watashi", meaning: "I / Me" },
    { word: "僕", reading: "boku", meaning: "I / Me (male casual)" },
    { word: "あなた", reading: "anata", meaning: "You" },
    { word: "名前", reading: "namae", meaning: "Name" },
    { word: "何", reading: "nani", meaning: "What" },
    { word: "誰", reading: "dare", meaning: "Who" },
    { word: "どこ", reading: "doko", meaning: "Where" },
    { word: "いつ", reading: "itsu", meaning: "When" },
    { word: "なぜ", reading: "naze", meaning: "Why" },
    { word: "どう", reading: "dou", meaning: "How" },
    { word: "どれ", reading: "dore", meaning: "Which one" },
    { word: "これ", reading: "kore", meaning: "This" },
    { word: "それ", reading: "sore", meaning: "That (near you)" },
    { word: "あれ", reading: "are", meaning: "That (over there)" },
    { word: "ここ", reading: "koko", meaning: "Here" },

    // Basic Nouns (36-55)
    { word: "人", reading: "hito", meaning: "Person" },
    { word: "日本", reading: "nihon", meaning: "Japan" },
    { word: "日本人", reading: "nihonjin", meaning: "Japanese person" },
    { word: "日本語", reading: "nihongo", meaning: "Japanese language" },
    { word: "英語", reading: "eigo", meaning: "English language" },
    { word: "言葉", reading: "kotoba", meaning: "Word / Language" },
    { word: "学生", reading: "gakusei", meaning: "Student" },
    { word: "先生", reading: "sensei", meaning: "Teacher" },
    { word: "友達", reading: "tomodachi", meaning: "Friend" },
    { word: "家族", reading: "kazoku", meaning: "Family" },
    { word: "お父さん", reading: "otousan", meaning: "Father" },
    { word: "お母さん", reading: "okaasan", meaning: "Mother" },
    { word: "兄", reading: "ani", meaning: "Older brother" },
    { word: "姉", reading: "ane", meaning: "Older sister" },
    { word: "弟", reading: "otouto", meaning: "Younger brother" },
    { word: "妹", reading: "imouto", meaning: "Younger sister" },
    { word: "子供", reading: "kodomo", meaning: "Child" },
    { word: "男", reading: "otoko", meaning: "Man / Male" },
    { word: "女", reading: "onna", meaning: "Woman / Female" },
    { word: "男の子", reading: "otokonoko", meaning: "Boy" },

    // Places & Objects (56-75)
    { word: "女の子", reading: "onnanoko", meaning: "Girl" },
    { word: "家", reading: "ie/uchi", meaning: "House / Home" },
    { word: "学校", reading: "gakkou", meaning: "School" },
    { word: "会社", reading: "kaisha", meaning: "Company" },
    { word: "駅", reading: "eki", meaning: "Station" },
    { word: "電車", reading: "densha", meaning: "Train" },
    { word: "バス", reading: "basu", meaning: "Bus" },
    { word: "車", reading: "kuruma", meaning: "Car" },
    { word: "自転車", reading: "jitensha", meaning: "Bicycle" },
    { word: "本", reading: "hon", meaning: "Book" },
    { word: "新聞", reading: "shinbun", meaning: "Newspaper" },
    { word: "雑誌", reading: "zasshi", meaning: "Magazine" },
    { word: "テレビ", reading: "terebi", meaning: "Television" },
    { word: "電話", reading: "denwa", meaning: "Telephone" },
    { word: "携帯", reading: "keitai", meaning: "Mobile phone" },
    { word: "コンピューター", reading: "konpyuutaa", meaning: "Computer" },
    { word: "インターネット", reading: "intaanetto", meaning: "Internet" },
    { word: "写真", reading: "shashin", meaning: "Photo" },
    { word: "音楽", reading: "ongaku", meaning: "Music" },
    { word: "映画", reading: "eiga", meaning: "Movie" },

    // Basic Expressions & Verbs (76-100)
    { word: "お元気ですか", reading: "ogenki desu ka", meaning: "How are you?" },
    { word: "元気です", reading: "genki desu", meaning: "I'm fine" },
    { word: "元気", reading: "genki", meaning: "Healthy / Energetic" },
    { word: "分かります", reading: "wakarimasu", meaning: "I understand" },
    { word: "分かりません", reading: "wakarimasen", meaning: "I don't understand" },
    { word: "知っています", reading: "shitteimasu", meaning: "I know" },
    { word: "知りません", reading: "shirimasen", meaning: "I don't know" },
    { word: "できます", reading: "dekimasu", meaning: "I can do" },
    { word: "できません", reading: "dekimasen", meaning: "I can't do" },
    { word: "行きます", reading: "ikimasu", meaning: "To go" },
    { word: "来ます", reading: "kimasu", meaning: "To come" },
    { word: "帰ります", reading: "kaerimasu", meaning: "To return / Go home" },
    { word: "食べます", reading: "tabemasu", meaning: "To eat" },
    { word: "飲みます", reading: "nomimasu", meaning: "To drink" },
    { word: "見ます", reading: "mimasu", meaning: "To see / Watch" },
    { word: "聞きます", reading: "kikimasu", meaning: "To listen / Ask" },
    { word: "読みます", reading: "yomimasu", meaning: "To read" },
    { word: "書きます", reading: "kakimasu", meaning: "To write" },
    { word: "話します", reading: "hanashimasu", meaning: "To speak / Talk" },
    { word: "思います", reading: "omoimasu", meaning: "To think" },
    { word: "います", reading: "imasu", meaning: "To exist (animate)" },
    { word: "あります", reading: "arimasu", meaning: "To exist (inanimate)" },
    { word: "です", reading: "desu", meaning: "To be (polite)" },
    { word: "ではありません", reading: "dewa arimasen", meaning: "To not be (polite)" },
    { word: "好きです", reading: "suki desu", meaning: "To like" }
];

// Liar Game Cultural Traps
const ja_a1_m1_traps = [
    {
        trap: "Japanese people bow at exactly 45 degrees for all greetings.",
        correctVersion: "Bow depth varies: casual nod (15°), formal greeting (30°), deep apology (45°+). Context determines the appropriate bow.",
        explanation: "Bowing culture is nuanced. A casual 'hello' between friends uses a slight nod, while business greetings use 30°. Deep bows are reserved for sincere apologies or showing deep respect."
    },
    {
        trap: "Saying 'arigatou' without 'gozaimasu' is always rude in Japan.",
        correctVersion: "'Arigatou' alone is perfectly fine with friends, family, and in casual situations. 'Gozaimasu' adds politeness for formal contexts.",
        explanation: "Japanese has distinct politeness levels. Using overly formal language with close friends can actually create distance. Context matters more than fixed rules."
    },
    {
        trap: "You must always address Japanese people with '-san' after their name.",
        correctVersion: "'-san' is the default polite suffix, but close friends often drop it. Using '-san' with your own name or when referring to yourself is incorrect.",
        explanation: "Honorific suffixes (-san, -chan, -kun, -sama) depend on relationship and context. Children and close friends often use first names alone."
    }
];

// Create the module
const module = {
    id: "ja_a1_m1",
    moduleId: "ja_a1_m1",
    name: "A1 Japanese - Module 1: Greetings & Basics",
    theme: "Greetings & Basic Expressions",
    order: 1,
    count: 100,
    vocabularyItems: ja_a1_m1_items,
    liarGameData: {
        culturalTraps: ja_a1_m1_traps
    }
};

// Verification
console.log('═══════════════════════════════════════════════════════');
console.log('🇯🇵 JAPANESE A1 MODULE 1 VERIFICATION');
console.log('═══════════════════════════════════════════════════════\n');

// Check word count
console.log(`📊 Word Count: ${module.vocabularyItems.length}`);
if (module.vocabularyItems.length !== 100) {
    console.log(`❌ ERROR: Expected 100 words, got ${module.vocabularyItems.length}`);
} else {
    console.log('✅ Word count is correct (100)\n');
}

// Check for duplicates
const seen = new Set();
let duplicates = 0;
module.vocabularyItems.forEach((item, idx) => {
    if (seen.has(item.word)) {
        console.log(`❌ Duplicate: "${item.word}" at index ${idx}`);
        duplicates++;
    }
    seen.add(item.word);
});

if (duplicates === 0) {
    console.log('✅ No duplicates found\n');
} else {
    console.log(`❌ Found ${duplicates} duplicates\n`);
}

// Anti-Loop Audit (Word 1 vs Word 9)
console.log('🔍 Anti-Loop Audit:');
console.log(`   Word #1: ${module.vocabularyItems[0].word}`);
console.log(`   Word #9: ${module.vocabularyItems[8].word}`);
if (module.vocabularyItems[0].word === module.vocabularyItems[8].word) {
    console.log('❌ LOOP BUG DETECTED!');
} else {
    console.log('✅ No loop bug\n');
}

// Three-Column Verification
let missingFields = 0;
module.vocabularyItems.forEach((item, idx) => {
    if (!item.word || !item.reading || !item.meaning) {
        console.log(`❌ Missing field at index ${idx}`);
        missingFields++;
    }
});
if (missingFields === 0) {
    console.log('✅ All items have word, reading, and meaning\n');
}

// Liar Game Traps
console.log(`📜 Liar Game Traps: ${module.liarGameData.culturalTraps.length}`);
if (module.liarGameData.culturalTraps.length !== 3) {
    console.log('❌ Expected 3 traps');
} else {
    console.log('✅ Trap count is correct\n');
}

// Show proof tables
console.log('═══════════════════════════════════════════════════════');
console.log('📋 PROOF TABLE - Words 1-20');
console.log('═══════════════════════════════════════════════════════');
console.log('| # | Word | Reading | Meaning |');
console.log('|---|------|---------|---------|');
for (let i = 0; i < 20; i++) {
    const item = module.vocabularyItems[i];
    console.log(`| ${i + 1} | ${item.word} | ${item.reading} | ${item.meaning} |`);
}

console.log('\n═══════════════════════════════════════════════════════');
console.log('📋 PROOF TABLE - Words 80-100');
console.log('═══════════════════════════════════════════════════════');
console.log('| # | Word | Reading | Meaning |');
console.log('|---|------|---------|---------|');
for (let i = 79; i < 100; i++) {
    const item = module.vocabularyItems[i];
    console.log(`| ${i + 1} | ${item.word} | ${item.reading} | ${item.meaning} |`);
}

console.log('\n═══════════════════════════════════════════════════════');
console.log('🎮 LIAR GAME TRAPS');
console.log('═══════════════════════════════════════════════════════');
module.liarGameData.culturalTraps.forEach((trap, idx) => {
    console.log(`\nTrap ${idx + 1}:`);
    console.log(`   ❌ Myth: ${trap.trap}`);
    console.log(`   ✅ Truth: ${trap.correctVersion}`);
});

// Save to file
const outputPath = path.join(__dirname, '../firestore_data/ja_a1_m1.json');
fs.writeFileSync(outputPath, JSON.stringify(module, null, 2));
console.log(`\n\n✅ Module saved to: ${outputPath}`);
console.log('\n⏳ AWAITING USER APPROVAL BEFORE UPLOAD');
