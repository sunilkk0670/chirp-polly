const fs = require('fs');
const path = require('path');

const m01Path = 'c:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ja_b1_m01.json';
const m02Path = 'c:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ja_b1_m02.json';

// Fix M01
let m01 = JSON.parse(fs.readFileSync(m01Path, 'utf8'));
// Replace the first "慈悲" (index 9)
m01.vocabularyItems[9].word = "畏敬";
m01.vocabularyItems[9].reading = "ikei";
m01.vocabularyItems[9].meaning = "Awe/Reverence";
m01.vocabularyItems[9].example_sentence = "大自然への畏敬の念を持つ反面、その過酷な側面にも向き合う必要があります。";
fs.writeFileSync(m01Path, JSON.stringify(m01, null, 4));

// Fix M02
let m02 = JSON.parse(fs.readFileSync(m02Path, 'utf8'));
// Replace "採用" (index 26) - A2
m02.vocabularyItems[26].word = "登用";
m02.vocabularyItems[26].reading = "touyou";
m02.vocabularyItems[26].meaning = "Appointment/Promotion";
m02.vocabularyItems[26].example_sentence = "優秀な人材を登用することによって、停滞していたプロジェクトに活気が戻りました。";
// Replace "実績" (index 44) - A2
m02.vocabularyItems[44].word = "経歴";
m02.vocabularyItems[44].reading = "keireki";
m02.vocabularyItems[44].meaning = "Career/History";
m02.vocabularyItems[44].example_sentence = "華々しい経歴を持つ反面、影での絶え間ない努力を忘れてはなりません。";
// Replace "考課" (index 7) - repeat of index 46
m02.vocabularyItems[7].word = "評点";
m02.vocabularyItems[7].reading = "hyouten";
m02.vocabularyItems[7].meaning = "Rating/Score";
m02.vocabularyItems[7].example_sentence = "個人の技能を評点化することによって、公平な評価基準を設けようとしています。";
fs.writeFileSync(m02Path, JSON.stringify(m02, null, 4));

console.log("Fixed B1 duplicates and overlaps.");
