const fs = require('fs');
const path = require('path');

const files = [
    'ko_a1_m01.json', 'ko_a1_m02.json', 'ko_a1_m03.json', 'ko_a1_m04.json', 'ko_a1_m05.json',
    'ko_a1_m06.json', 'ko_a1_m07.json', 'ko_a1_m08.json', 'ko_a1_m09.json', 'ko_a1_m10.json'
];

const dataDir = 'C:/Users/Sindhu/Desktop/chirp-polly/firestore_data';

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (data.title && !data.theme) {
            data.theme = data.title;
            // No delete here to be safe, or we can delete if we're sure
            // delete data.title; 
        }

        if (data.lessons && Array.isArray(data.lessons)) {
            data.lessons.forEach(lesson => {
                if (lesson.words) {
                    lesson.vocabularyItems = lesson.words;
                    delete lesson.words;
                }
            });
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`✅ Migrated ${file}`);
    } catch (e) {
        console.error(`❌ Failed to migrate ${file}:`, e.message);
    }
});

console.log('Migration complete.');
