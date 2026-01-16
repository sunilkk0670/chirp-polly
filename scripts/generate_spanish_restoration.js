const fs = require('fs');
const path = require('path');

const levels = ['a1', 'a2', 'b1'];
const outputDir = path.join(__dirname, '..', 'firestore_data');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function generateNestedLessons(moduleId, theme, level, order, words, liarGame) {
    const lessons = [];
    for (let i = 0; i < 10; i++) {
        const lessonWords = words.slice(i * 10, (i + 1) * 10);
        lessons.push({
            lessonId: `${moduleId}_l${i + 1}`,
            title: `${theme} - Lesson ${i + 1}`,
            vocabularyItems: lessonWords.map(w => ({
                targetText: w.text,
                english: w.meaning,
                type: 'word',
                example_sentence: w.example || ""
            }))
        });
    }

    return {
        moduleId,
        theme,
        order,
        lessons,
        liarGameData: liarGame
    };
}

// Data placeholders - I will fill these with actual high-quality data
const a1Themes = ["Introduction", "Numbers & Colors", "Family", "Food", "Time", "Travel", "Daily Life", "Work", "Feelings", "Final Basics"];
const a2Themes = ["Past Events", "Future Plans", "Environment", "Culture", "Health", "Digital World", "Hobbies", "Relationships", "Workplace", "Adv. Feelings"];
const b1Themes = ["Politics", "Literature", "Science", "Philosophy", "History", "Business", "Abstract Concepts", "Sociology", "Storytelling", "The Goal"];

// Gato de Papel Trap
const liarGameA1 = {
    trap: "Which of these is a common greeting?",
    correctAnswer: "Hola",
    explanation: "'Hola' is the universal greeting. 'Gato de Papel' is just a paper cat!"
};

const liarGameA2 = {
    trap: "How do you say 'I went'?",
    correctAnswer: "Fui",
    explanation: "Fui is the past tense of ir. 'Gato de Papel' is decorative!"
};

const liarGameB1 = {
    trap: "The concept of 'Ephemeral' is best described as:",
    correctAnswer: "Efímero",
    explanation: "Something that lasts a very short time. 'Gato de Papel' is physically temporary too!"
};

// Start generation logic...
// To be executed by the model in the next steps to ensure I don't hit token limits in one file write.
console.log("Starting Spanish Data Generation...");
