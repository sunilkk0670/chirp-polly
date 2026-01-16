const fs = require('fs');
const path = require('path');

const filePath = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data/ko_a2_m02.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const words = data.lessons[0].vocabularyItems;

// Replacement map: old word -> new word data
const replacements = {
    '출근하다': {
        word: '근무하다',
        reading: 'Geunmu-hada',
        meaning: 'To work / To be on duty',
        example_sentence: '주 5일 근무하고 있습니다. (I work 5 days a week.)'
    },
    '퇴근하다': {
        word: '퇴사하다',
        reading: 'Toesa-hada',
        meaning: 'To resign / To leave a company',
        example_sentence: '더 나은 기회를 위해 퇴사하기로 결정했어요. (I decided to resign for a better opportunity.)'
    },
    '신입': {
        word: '신규',
        reading: 'Singyu',
        meaning: 'New / Newly hired',
        example_sentence: '신규 직원 오리엔테이션이 있어요. (There is a new employee orientation.)'
    },
    '휴가': {
        word: '휴직',
        reading: 'Hyujik',
        meaning: 'Leave of absence',
        example_sentence: '1년간 휴직을 신청했습니다. (I applied for a one-year leave of absence.)'
    },
    '마감': {
        word: '납기',
        reading: 'Napgi',
        meaning: 'Delivery deadline / Due date',
        example_sentence: '납기일을 맞추기 위해 노력하고 있어요. (I\'m working hard to meet the delivery deadline.)'
    },
    '목표': {
        word: '지표',
        reading: 'Jipyo',
        meaning: 'Indicator / Metric',
        example_sentence: '핵심 성과 지표를 설정했어요. (We set key performance indicators.)'
    },
    '경험': {
        word: '실무',
        reading: 'Silmu',
        meaning: 'Practical work / Hands-on experience',
        example_sentence: '실무 경험이 풍부한 지원자를 찾고 있어요. (We\'re looking for candidates with rich practical experience.)'
    },
    '고객': {
        word: '의뢰인',
        reading: 'Uiroein',
        meaning: 'Client / Customer (formal)',
        example_sentence: '의뢰인의 요구사항을 충족시켰어요. (We met the client\'s requirements.)'
    },
    '시장': {
        word: '업계',
        reading: 'Eopgye',
        meaning: 'Industry / Business sector',
        example_sentence: 'IT 업계에서 일하고 있어요. (I work in the IT industry.)'
    },
    '컴퓨터': {
        word: 'PC',
        reading: 'PC',
        meaning: 'Personal computer',
        example_sentence: 'PC를 재부팅해야 해요. (I need to reboot the PC.)'
    },
    '회사': {
        word: '법인',
        reading: 'Beobin',
        meaning: 'Corporation / Legal entity',
        example_sentence: '법인을 설립했습니다. (We established a corporation.)'
    }
};

// Replace conflicting words
let replacedCount = 0;
words.forEach((item, index) => {
    if (replacements[item.word]) {
        console.log(`Replacing word ${index + 1}: ${item.word} -> ${replacements[item.word].word}`);
        words[index] = replacements[item.word];
        replacedCount++;
    }
});

// Save the updated file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log(`\n✅ Replaced ${replacedCount} conflicting words`);
console.log(`Total words in module: ${words.length}`);
