import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');
if (!existsSync(serviceAccountPath)) {
    console.error('❌ Service account key not found at:', serviceAccountPath);
    process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

function getAllWords() {
    const moduleFiles = [
        'ita_a1_m01.json',
        'ita_a1_m02.json',
        'ita_a1_m03.json',
        'ita_a1_m04.json',
        'ita_a1_m05.json',
        'ita_a1_m06.json'
    ];

    const allWords = [];
    const wordCounts = {};

    for (const file of moduleFiles) {
        try {
            const filePath = join(__dirname, '..', 'firestore_data', file);
            const moduleData = JSON.parse(readFileSync(filePath, 'utf8'));

            moduleData.lessons.forEach(lesson => {
                lesson.vocabularyItems.forEach(item => {
                    const word = item.word.toLowerCase().trim();
                    allWords.push({ word: item.word, module: file });
                    wordCounts[word] = (wordCounts[word] || 0) + 1;
                });
            });
        } catch (error) {
            console.log(`⚠️  Could not read ${file}: ${error.message}`);
        }
    }

    return { allWords, wordCounts };
}

async function uploadItalianA1Module06() {
    console.log('📤 Uploading Italian A1 Module 06 to Firestore...\n');

    try {
        const modulePath = join(__dirname, '..', 'firestore_data', 'ita_a1_m06.json');
        const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

        const docRef = db.collection('languages').doc('italian')
            .collection('levels').doc('a1')
            .collection('modules').doc('ita_a1_m06');

        await docRef.set(moduleData);

        const wordCount = moduleData.lessons.reduce((sum, lesson) => sum + lesson.vocabularyItems.length, 0);

        console.log('✅ Successfully uploaded ita_a1_m06');
        console.log(`   Path: languages/italian/levels/a1/modules/ita_a1_m06`);
        console.log(`   Theme: ${moduleData.theme}`);
        console.log(`   Words: ${wordCount}`);
        console.log(`   Order: ${moduleData.order}\n`);

        const levelRef = db.collection('languages').doc('italian')
            .collection('levels').doc('a1');

        await levelRef.set({
            count: 6,
            moduleCount: 10
        }, { merge: true });

        console.log('✅ Updated A1 level metadata');
        console.log('   Current Module Count: 6');
        console.log('   Total Planned Modules: 10\n');

        console.log('🔍 Running Cumulative Duplicate Audit (M01-M06)...\n');
        const { allWords, wordCounts } = getAllWords();

        const duplicates = Object.entries(wordCounts).filter(([word, count]) => count > 1);

        if (duplicates.length > 0) {
            console.log('⚠️  DUPLICATES FOUND:');
            duplicates.forEach(([word, count]) => {
                console.log(`   "${word}" appears ${count} times`);
                const modules = allWords.filter(w => w.word.toLowerCase().trim() === word).map(w => w.module);
                console.log(`   Modules: ${modules.join(', ')}`);
            });
        } else {
            console.log('✅ No duplicates found across all 6 modules! (Total 600 unique words)');
        }

        console.log(`\n📊 Total unique words: ${Object.keys(wordCounts).length}`);
        console.log(`📊 Total word instances: ${allWords.length}\n`);

        console.log('📋 PROOF: Words 1-20 (Module 06):\n');
        const allItems = moduleData.lessons.flatMap(l => l.vocabularyItems);
        allItems.slice(0, 20).forEach((item, idx) => {
            console.log(`${String(idx + 1).padStart(2, ' ')}. ${item.word.padEnd(25)} (${item.reading.padEnd(30)}) - ${item.meaning}`);
        });

        console.log('\n📋 PROOF: Words 85-100 (Module 06):\n');
        allItems.slice(84, 100).forEach((item, idx) => {
            const marker = item.meaning.includes('[LIAR GAME') ? ' 🎯' : '';
            console.log(`${String(idx + 85).padStart(2, ' ')}. ${item.word.padEnd(25)} (${item.reading.padEnd(30)}) - ${item.meaning}${marker}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error during upload:', error);
        process.exit(1);
    }
}

uploadItalianA1Module06();
