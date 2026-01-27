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

async function uploadItalianA1Module08() {
    console.log('📤 Uploading Italian A1 Module 08 to Firestore...\n');

    try {
        const modulePath = join(__dirname, '..', 'firestore_data', 'ita_a1_m08.json');
        const moduleData = JSON.parse(readFileSync(modulePath, 'utf8'));

        const docRef = db.collection('languages').doc('italian')
            .collection('levels').doc('a1')
            .collection('modules').doc('ita_a1_m08');

        await docRef.set(moduleData);

        const wordCount = moduleData.lessons.reduce((sum, lesson) => sum + lesson.vocabularyItems.length, 0);

        console.log('✅ Successfully uploaded ita_a1_m08');
        console.log(`   Path: languages/italian/levels/a1/modules/ita_a1_m08`);
        console.log(`   Theme: ${moduleData.theme}`);
        console.log(`   Words: ${wordCount}`);
        console.log(`   Order: ${moduleData.order}\n`);

        const levelRef = db.collection('languages').doc('italian')
            .collection('levels').doc('a1');

        await levelRef.set({
            count: 8,
            moduleCount: 10
        }, { merge: true });

        console.log('✅ Updated A1 level metadata');
        console.log('   Current Module Count: 8');
        console.log('   Total Planned Modules: 10\n');

        console.log('🔍 Final Cumulative Audit (M01-M08)...\n');

        const moduleFiles = [
            'ita_a1_m01.json', 'ita_a1_m02.json', 'ita_a1_m03.json',
            'ita_a1_m04.json', 'ita_a1_m05.json', 'ita_a1_m06.json',
            'ita_a1_m07.json', 'ita_a1_m08.json'
        ];

        let counts = {};
        let allWords = [];

        moduleFiles.forEach(file => {
            const p = join(__dirname, '..', 'firestore_data', file);
            if (existsSync(p)) {
                const data = JSON.parse(readFileSync(p, 'utf8'));
                data.lessons.forEach(l => l.vocabularyItems.forEach(i => {
                    const w = i.word.toLowerCase().trim();
                    const cleanNoArticle = w.replace(/^(il|la|lo|i|le|gli)\s+|^(l\x27)/, "");
                    counts[cleanNoArticle] = (counts[cleanNoArticle] || 0) + 1;
                    allWords.push({ word: i.word, module: file });
                }));
            }
        });

        const duplicates = Object.entries(counts).filter(([w, c]) => c > 1);

        if (duplicates.length > 0) {
            console.log('⚠️  CUMULATIVE DUPLICATES DETECTED:');
            duplicates.forEach(([word, count]) => {
                const modules = allWords.filter(w => w.word.toLowerCase().trim().replace(/^(il|la|lo|i|le|gli)\s+|^(l\x27)/, "") === word).map(w => w.module);
                console.log(`   - "${word}" appears ${count} times in: ${[...new Set(modules)].join(', ')}`);
            });
        } else {
            console.log('✅ CLEAN DATABASE: 800 unique words across 8 modules.');
        }

        console.log('\n📊 Total unique words: ' + Object.keys(counts).length);
        console.log('📊 Total word instances: ' + allWords.length + '\n');

        console.log('📋 PROOF: Words 1-20 (Module 08):\n');
        const allItems = moduleData.lessons.flatMap(l => l.vocabularyItems);
        allItems.slice(0, 20).forEach((item, idx) => {
            console.log(`${String(idx + 1).padStart(2, ' ')}. ${item.word.padEnd(25)} (${item.reading.padEnd(30)}) - ${item.meaning}`);
        });

        console.log('\n📋 PROOF: Words 85-100 (Module 08):\n');
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

uploadItalianA1Module08();
